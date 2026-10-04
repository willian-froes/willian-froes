import {
  copyFileSync,
  existsSync,
  readFileSync,
  unlinkSync,
  writeFileSync,
} from 'node:fs';
import { execFileSync } from 'node:child_process';
import { join } from 'node:path';

const svgPath = join('profile-3d-contrib', 'profile-gitblock.svg');
function localGithubToken() {
  try {
    return execFileSync('gh', ['auth', 'token'], {
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore'],
    }).trim();
  } catch {
    return '';
  }
}

const token = process.env.GITHUB_TOKEN || localGithubToken();
const origin = execFileSync('git', ['config', '--get', 'remote.origin.url'], {
  encoding: 'utf8',
}).trim();
const repositoryOwner = origin.match(/github\.com[:/]([^/]+)\//i)?.[1];
const username = process.env.GITHUB_ACTIONS
  ? process.env.USERNAME
  : repositoryOwner || process.env.USERNAME;
const year = process.env.YEAR?.trim();

if (!existsSync(svgPath)) {
  throw new Error(`Generated GitBlock SVG not found: ${svgPath}`);
}
if (!token || !username) {
  throw new Error('GITHUB_TOKEN and USERNAME are required to color blocks by language.');
}
if (year && !/^\d{4}$/.test(year)) {
  throw new Error(`YEAR must be a four-digit year, got: ${year}`);
}

function removeGroup(markup, marker) {
  const start = markup.indexOf(marker);
  if (start < 0) return markup;

  const groupStart = markup.indexOf('<g', start);
  const tags = /<\/?g\b[^>]*>/g;
  tags.lastIndex = groupStart;
  let depth = 0;
  let match;

  while ((match = tags.exec(markup))) {
    if (match[0].startsWith('</')) depth--;
    else depth++;
    if (depth === 0) {
      return markup.slice(0, groupStart) + markup.slice(tags.lastIndex);
    }
  }

  throw new Error(`Could not find the end of SVG group: ${marker}`);
}

function removeContainingGroup(markup, marker) {
  const target = markup.indexOf(marker);
  if (target < 0) return markup;

  const tags = /<\/?g\b[^>]*>/g;
  const stack = [];
  let match;

  while ((match = tags.exec(markup)) && match.index <= target) {
    if (match[0].startsWith('</')) stack.pop();
    else stack.push(match.index);
  }

  const groupStart = stack.at(-1);
  if (groupStart === undefined) {
    throw new Error(`Could not find the SVG group containing: ${marker}`);
  }

  tags.lastIndex = groupStart;
  let depth = 0;
  while ((match = tags.exec(markup))) {
    if (match[0].startsWith('</')) depth--;
    else depth++;
    if (depth === 0) {
      return markup.slice(0, groupStart) + markup.slice(tags.lastIndex);
    }
  }

  throw new Error(`Could not find the end of SVG group containing: ${marker}`);
}

function dateOnly(date) {
  return date.toISOString().slice(0, 10);
}

function createDateRange() {
  if (year) {
    return {
      from: new Date(`${year}-01-01T00:00:00.000Z`),
      to: new Date(`${year}-12-31T00:00:00.000Z`),
    };
  }

  const to = new Date();
  const today = new Date(Date.UTC(to.getUTCFullYear(), to.getUTCMonth(), to.getUTCDate()));
  const from = new Date(today);
  from.setUTCDate(from.getUTCDate() - 364);
  return { from, to: today };
}

function monthRanges(from, to) {
  const ranges = [];
  const cursor = new Date(from);

  while (cursor <= to) {
    const endOfMonth = new Date(
      Date.UTC(cursor.getUTCFullYear(), cursor.getUTCMonth() + 1, 0),
    );
    const end = endOfMonth < to ? endOfMonth : to;
    ranges.push({ from: new Date(cursor), to: new Date(end) });
    cursor.setUTCDate(end.getUTCDate() + 1);
  }

  return ranges;
}

async function graphql(query, variables) {
  const response = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query, variables }),
  });
  const result = await response.json();
  if (!response.ok || result.errors?.length) {
    const messages = result.errors?.map((error) => error.message).join('; ');
    throw new Error(`GitHub GraphQL request failed: ${messages || response.statusText}`);
  }
  return result.data.user.contributionsCollection;
}

const calendarQuery = `
  query($login: String!, $from: DateTime!, $to: DateTime!) {
    user(login: $login) {
      contributionsCollection(from: $from, to: $to) {
        contributionCalendar {
          weeks { contributionDays { date contributionCount } }
        }
      }
    }
  }
`;

const languageQuery = `
  query($login: String!, $from: DateTime!, $to: DateTime!) {
    user(login: $login) {
      contributionsCollection(from: $from, to: $to) {
        commitContributionsByRepository(maxRepositories: 100) {
          repository { primaryLanguage { name color } }
          contributions(first: 100) {
            nodes { occurredAt commitCount }
          }
        }
      }
    }
  }
`;

const range = createDateRange();
const dateVariables = (from, to) => ({
  login: username,
  from: `${dateOnly(from)}T00:00:00Z`,
  to: `${dateOnly(to)}T23:59:59Z`,
});

const calendarCollection = await graphql(
  calendarQuery,
  dateVariables(range.from, range.to),
);
const calendarDays = calendarCollection.contributionCalendar.weeks.flatMap(
  (week) => week.contributionDays,
);
const languageCountsByDay = new Map();
const languageTotals = new Map();
const languageColors = new Map();

for (const month of monthRanges(range.from, range.to)) {
  const collection = await graphql(languageQuery, dateVariables(month.from, month.to));
  for (const repositoryContribution of collection.commitContributionsByRepository) {
    const language = repositoryContribution.repository.primaryLanguage;
    if (!language?.name) continue;
    if (!languageColors.has(language.name) && language.color) {
      languageColors.set(language.name, language.color);
    }

    for (const contribution of repositoryContribution.contributions.nodes) {
      const day = contribution.occurredAt.slice(0, 10);
      const count = contribution.commitCount;
      const byLanguage = languageCountsByDay.get(day) || new Map();
      byLanguage.set(language.name, (byLanguage.get(language.name) || 0) + count);
      languageCountsByDay.set(day, byLanguage);
      languageTotals.set(language.name, (languageTotals.get(language.name) || 0) + count);
    }
  }
}

const topLanguages = [...languageTotals.entries()]
  .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
  .map(([name]) => name);
const displayedLanguages = new Set(topLanguages);
const colors = new Map(
  topLanguages.map((name) => [name, languageColors.get(name) || '#8b949e']),
);
const fallbackColor = '#8b949e';
const displayLanguageByDay = calendarDays.map((day) => {
  if (!day.contributionCount) return { type: 'ground' };

  const dailyLanguages = [...(languageCountsByDay.get(day.date) || new Map()).entries()]
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));
  // The contribution calendar also counts issues, pull requests, reviews, and
  // other activity that cannot be assigned to a programming language. Leave
  // those days as ground so every raised block has a language in the legend.
  if (!dailyLanguages.length) return { type: 'ground' };

  const [dominantLanguage] = dailyLanguages[0];
  if (!displayedLanguages.has(dominantLanguage)) {
    return { type: 'ground' };
  }
  return {
    type: 'language',
    color: colors.get(dominantLanguage),
  };
});

let svg = readFileSync(svgPath, 'utf8');
// Keep the 3D calendar and remove the language pie and contribution radar.
svg = removeGroup(svg, '<g transform="translate(40, 520)">');
svg = removeGroup(svg, '<g transform="translate(980, 284.5)">');
for (const label of ['Contribution levels', 'Contribution languages']) {
  const marker = `<g aria-label="${label}"`;
  while (svg.includes(marker)) svg = removeGroup(svg, marker);
}
const contributionSummary = '>contributions</text>';
if (svg.includes(contributionSummary)) {
  // The generator places the date in the same group as the contribution total.
  // Removing the group keeps the graph focused on the language blocks.
  svg = removeContainingGroup(svg, contributionSummary);
}
svg = svg.replace(
  /<text style="font-size: 16px;" x="1260" y="20"[^>]*>[^<]*<\/text>/g,
  '',
);
svg = svg.replace(/\.fill-bg\s*\{\s*fill:\s*[^;]+;/, '.fill-bg { fill: transparent;');
svg = svg.replace(/\.stroke-bg\s*\{\s*stroke:\s*[^;]+;/, '.stroke-bg { stroke: transparent;');
const darkStyles =
  '@media (prefers-color-scheme: dark) { .fill-fg, .fill-strong { fill: #f0f0f0; } .fill-weak { fill: #c7c7c7; } .stroke-fg { stroke: #f0f0f0; } }';
if (!svg.includes(darkStyles)) {
  svg = svg.replace('</style>', `${darkStyles}</style>`);
}
const groundStyles = `
.ground-top { fill: #57606a; fill-opacity: 0.14; }
.ground-left { fill: #57606a; fill-opacity: 0.11; }
.ground-right { fill: #57606a; fill-opacity: 0.09; }
@media (prefers-color-scheme: dark) {
  .ground-top { fill: #c9d1d9; fill-opacity: 0.12; }
  .ground-left { fill: #c9d1d9; fill-opacity: 0.09; }
  .ground-right { fill: #c9d1d9; fill-opacity: 0.07; }
}`;
if (!svg.includes('.ground-top {')) {
  svg = svg.replace('</style>', `${groundStyles}</style>`);
}

function shade(hexColor, factor) {
  if (hexColor === 'transparent') return hexColor;
  const hex = hexColor.match(/^#([\da-f]{6})$/i)?.[1];
  if (!hex) return fallbackColor;
  const channels = hex.match(/[\da-f]{2}/gi).map((part) => parseInt(part, 16));
  return `#${channels
    .map((channel) => Math.round(channel * factor).toString(16).padStart(2, '0'))
    .join('')}`;
}

const blockPatternDefinitions = [];
const blockPatternsByColor = new Map();
const blockFaces = [
  ['top', 1],
  ['left', 0.84],
  ['right', 0.7],
];

function blockPatterns(color) {
  const normalizedColor = color.toLowerCase();
  const existing = blockPatternsByColor.get(normalizedColor);
  if (existing) return existing;

  const index = blockPatternsByColor.size;
  const patterns = {};
  for (const [face, factor] of blockFaces) {
    const sourcePattern = svg.match(
      new RegExp(`<pattern id="pattern_0_${face}"[\\s\\S]*?</pattern>`),
    )?.[0];
    if (!sourcePattern) {
      throw new Error(`Could not find the GitBlock pattern for its ${face} face.`);
    }

    const id = `language-${index}-${face}`;
    const foreground = shade(shade(color, 0.48), factor);
    const pattern = sourcePattern
      .replace(`id="pattern_0_${face}"`, `id="${id}"`)
      .replace(`class="cont-${face}-bg-0"`, `style="fill:${shade(color, factor)}"`)
      .replace(`class="cont-${face}-fg-0"`, `style="fill:${foreground}"`);
    blockPatternDefinitions.push(pattern);
    patterns[face] = id;
  }

  blockPatternsByColor.set(normalizedColor, patterns);
  return patterns;
}

function originalGroundPatterns() {
  const patterns = {};

  for (const [face] of blockFaces) {
    const sourcePattern = svg.match(
      new RegExp(`<pattern id="pattern_0_${face}"[\\s\\S]*?</pattern>`),
    )?.[0];
    if (!sourcePattern) {
      throw new Error(`Could not find the original GitBlock ground pattern for its ${face} face.`);
    }

    const id = `ground-${face}`;
    blockPatternDefinitions.push(
      sourcePattern
        .replace(`id="pattern_0_${face}"`, `id="${id}"`)
        .replace(`class="cont-${face}-bg-0"`, `class="ground-${face}"`)
        .replace(`class="cont-${face}-fg-0"`, `class="ground-${face}"`),
    );
    patterns[face] = id;
  }

  return patterns;
}

const groundPatterns = originalGroundPatterns();
let barIndex = 0;
let graphTop = Infinity;
svg = svg.replace(
  /<g transform="translate\((-?[\d.]+) (-?[\d.]+)\)">([\s\S]*?)<\/g>/g,
  (bar, x, y, content) => {
    const rects = [...content.matchAll(/<rect\b[^>]*(?:\/>|>[\s\S]*?<\/rect>)/g)];
    if (rects.length !== 3) return bar;
    const day = displayLanguageByDay[barIndex++];
    if (!day) throw new Error('More 3D blocks were generated than contribution days returned by GraphQL.');
    // The top face extends roughly 11 px above the group's translation point.
    graphTop = Math.min(graphTop, Number(y) - 11);
    const patterns = day.type === 'ground' ? groundPatterns : blockPatterns(day.color);
    const faceFills = blockFaces.map(([face]) => `url(#${patterns[face]})`);
    let faceIndex = 0;
    const coloredContent = content.replace(
      /<rect\b[^>]*(?:\/>|>[\s\S]*?<\/rect>)/g,
      (rect) => {
        const fill = faceFills[faceIndex++];
        const openingTag = rect.match(/<rect\b[^>]*>/)[0];
        const withoutFill = openingTag
          .replace(/\sfill="[^"]*"/, '')
          .replace(/\sstyle="[^"]*"/g, '');
        return `${withoutFill.replace(/>$/, ` style="fill:${fill}">`)}${rect.slice(openingTag.length)}`;
      },
    );
    return `<g transform="translate(${x} ${y})">${coloredContent}</g>`;
  },
);

if (barIndex !== displayLanguageByDay.length) {
  throw new Error(
    `Expected ${displayLanguageByDay.length} calendar blocks but found ${barIndex}.`,
  );
}
if (!Number.isFinite(graphTop)) {
  throw new Error('Could not determine the top edge of the GitBlock calendar.');
}

svg = svg.replace('</defs>', `${blockPatternDefinitions.join('')}</defs>`);

const legendItems = topLanguages.map((name) => ({ name, color: colors.get(name) }));

function legendBlock(color) {
  const left = shade(color, 0.84);
  const right = shade(color, 0.7);
  const stud = shade(color, 0.62);
  return `<path d="M1 5 10 0 19 5 10 10Z" fill="${color}"/><path d="M1 5 10 10V19L1 14Z" fill="${left}"/><path d="M10 10 19 5V14L10 19Z" fill="${right}"/><ellipse cx="7" cy="5" rx="2" ry="1" fill="${stud}"/><ellipse cx="13" cy="5" rx="2" ry="1" fill="${stud}"/>`;
}

const legend = `<g aria-label="Contribution languages" transform="translate(40, 865)">${legendItems
  .map((item, index) => {
    const x = (index % 4) * 300;
    const y = Math.floor(index / 4) * 28;
    const label = item.name.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
    return `<g transform="translate(${x}, ${y})">${legendBlock(item.color)}<text x="27" y="14" class="fill-fg" font-size="16">${label}</text></g>`;
  })
  .join('')}</g>`;

const contentHeight = 865 + Math.ceil(legendItems.length / 4) * 28 + 20;
const crop = {
  left: 24,
  top: Math.max(0, Math.floor(graphTop - 16)),
  right: 24,
  bottom: 12,
};
const outputWidth = 1280 - crop.left - crop.right;
const outputHeight = contentHeight - crop.top - crop.bottom;
svg = svg.replace(
  /width="\d+" height="\d+" viewBox="[^"]+"/,
  `width="${outputWidth}" height="${outputHeight}" viewBox="${crop.left} ${crop.top} ${outputWidth} ${outputHeight}"`,
);
svg = svg.replace('</svg>', `${legend}</svg>`);
writeFileSync(svgPath, svg);

if (year) {
  const outputDirectory = 'profile-3d-contrib';
  copyFileSync(svgPath, join(outputDirectory, `profile-gitblock-${year}.svg`));
  for (const file of [
    'profile-green-animate.svg',
    'profile-green.svg',
    'profile-season-animate.svg',
    'profile-season.svg',
    'profile-south-season-animate.svg',
    'profile-south-season.svg',
    'profile-night-view.svg',
    'profile-night-green.svg',
    'profile-night-rainbow.svg',
  ]) {
    const generatedFile = join(outputDirectory, file);
    if (existsSync(generatedFile)) unlinkSync(generatedFile);
  }
}
