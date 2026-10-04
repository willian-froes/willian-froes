import { copyFileSync, existsSync, readFileSync, unlinkSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const svgPath = join('profile-3d-contrib', 'profile-gitblock.svg');
if (!existsSync(svgPath)) {
  throw new Error(`Generated GitBlock SVG not found: ${svgPath}`);
}

let svg = readFileSync(svgPath, 'utf8');

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

// The built-in GitBlock includes a language pie and a contribution radar.
// Keep the calendar and replace those panels with a legend for its block colors.
svg = removeGroup(svg, '<g transform="translate(40, 520)">');
svg = removeGroup(svg, '<g transform="translate(980, 284.5)">');

const palette = ['transparent', '#d8e887', '#8cc569', '#47a042', '#1d6a23'];
const rgb = (hex) => hex.match(/[\da-f]{2}/gi).map((part) => parseInt(part, 16));
const shade = (hex, factor) =>
  `#${rgb(hex).map((channel) => Math.round(channel * factor).toString(16).padStart(2, '0')).join('')}`;

const rules = [];
for (let level = 0; level < palette.length; level++) {
  if (level === 0) {
    for (const panel of ['top', 'left', 'right']) {
      rules.push(`.cont-${panel}-bg-${level} { fill: transparent; }`);
    }
    continue;
  }

  const color = palette[level];
  const detail = shade(color, 0.48);
  for (const [panel, factor] of [['top', 1], ['left', 0.84], ['right', 0.7]]) {
    rules.push(`.cont-${panel}-bg-${level} { fill: ${shade(color, factor)}; }`);
    rules.push(`.cont-${panel}-fg-${level} { fill: ${shade(detail, factor)}; }`);
  }
}
rules.push(
  '@media (prefers-color-scheme: dark) { .fill-fg, .fill-strong { fill: #f0f0f0; } .fill-weak { fill: #c7c7c7; } .stroke-fg { stroke: #f0f0f0; } }',
);
svg = svg.replace('</style>', `${rules.join('\n')}</style>`);
svg = svg.replace(/\.fill-bg\s*\{\s*fill:\s*[^;]+;/, '.fill-bg { fill: transparent;');
svg = svg.replace(/\.stroke-bg\s*\{\s*stroke:\s*[^;]+;/, '.stroke-bg { stroke: transparent;');

const labels = ['None', 'Low', 'Medium', 'High', 'Very high'];
const legend = `<g aria-label="Contribution levels" transform="translate(40, 34)">${labels
  .map((label, level) => {
    const x = level * 122;
    const swatch = palette[level];
    return `<g transform="translate(${x}, 0)"><rect width="16" height="16" rx="2" fill="${swatch}" stroke="#888"/><text x="23" y="13" class="fill-fg" font-size="16">${label}</text></g>`;
  })
  .join('')}</g>`;
svg = svg.replace('</svg>', `${legend}</svg>`);
writeFileSync(svgPath, svg);

const year = process.env.YEAR?.trim();
if (year) {
  if (!/^\d{4}$/.test(year)) {
    throw new Error(`YEAR must be a four-digit year, got: ${year}`);
  }
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
