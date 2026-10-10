const fs = require('node:fs/promises');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const username = process.env.GITHUB_USERNAME || 'willian-froes';
const dataPath = path.join(root, 'data', 'github-stats.json');
const assetPath = path.join(root, 'assets');
const colors = ['#38bdf8', '#4ade80', '#93c5fd', '#facc15', '#a78bfa', '#fb7185'];

const escapeXml = (value) => String(value).replace(/[<>&"']/g, (char) => ({
  '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;', "'": '&apos;',
}[char]));

function panel(content, height = 360) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="440" height="${height}" viewBox="0 0 440 ${height}" fill="none">
  <style>
    text { font-family: 'JetBrains Mono', 'Fira Code', Consolas, monospace; }
    .muted { fill: #8b949e; } .main { fill: #c9d1d9; }
    .blue { fill: #79c8ff; } .green { fill: #4ade80; }
  </style>
  <rect x="1" y="1" width="438" height="${height - 2}" rx="12" fill="#0d1117" stroke="#21262d"/>
  ${content}
</svg>`;
}

function renderActivity(data) {
  const year = new Date().getUTCFullYear();
  const stats = [
    ['Commits', data.contributions.commits, colors[0]],
    ['Pull requests', data.contributions.pullRequests, colors[1]],
    ['Code reviews', data.contributions.reviews, colors[2]],
    ['Issues', data.contributions.issues, colors[3]],
  ];
  const max = Math.max(1, ...stats.map(([, value]) => value));
  const rows = stats.map(([label, value, color], index) => {
    const y = 112 + index * 55;
    const barWidth = Math.max(value ? 12 : 0, Math.round((value / max) * 350));
    return `<text x="24" y="${y}" class="main" font-size="14">${label}</text>
      <text x="416" y="${y}" text-anchor="end" fill="${color}" font-size="14" font-weight="700">${value.toLocaleString('en-US')}</text>
      <rect x="24" y="${y + 10}" width="392" height="8" rx="4" fill="#21262d"/>
      <rect x="24" y="${y + 10}" width="${barWidth}" height="8" rx="4" fill="${color}"/>`;
  }).join('\n');

  return panel(`<text x="24" y="37" class="muted" font-size="12" letter-spacing="1.1">ATIVIDADE · ${year}</text>
    <text x="24" y="77" class="blue" font-size="30" font-weight="700">${data.contributions.total.toLocaleString('en-US')}</text>
    <text x="24" y="96" class="muted" font-size="11">contribuições no ano</text>
    ${rows}
    <text x="24" y="338" class="muted" font-size="11">Dados públicos · GitHub GraphQL API</text>`);
}

function renderLanguages(data) {
  const entries = data.repositories.languages.slice(0, 5);
  const total = entries.reduce((sum, item) => sum + item.count, 0);
  const rows = entries.map((item, index) => {
    const y = 84 + index * 48;
    const percent = total ? Math.round((item.count / total) * 100) : 0;
    const barWidth = Math.round((item.count / Math.max(1, ...entries.map((entry) => entry.count))) * 310);
    const color = colors[index % colors.length];
    return `<circle cx="29" cy="${y - 5}" r="4" fill="${color}"/>
      <text x="43" y="${y}" class="main" font-size="13">${escapeXml(item.name)}</text>
      <text x="416" y="${y}" text-anchor="end" fill="${color}" font-size="13" font-weight="700">${item.count} repos · ${percent}%</text>
      <rect x="24" y="${y + 9}" width="392" height="6" rx="3" fill="#21262d"/>
      <rect x="24" y="${y + 9}" width="${barWidth}" height="6" rx="3" fill="${color}"/>`;
  }).join('\n');
  const height = Math.max(310, 112 + entries.length * 48);
  return panel(`<text x="24" y="37" class="muted" font-size="12" letter-spacing="1.1">LINGUAGENS DOS REPOSITÓRIOS</text>
    <text x="24" y="62" class="muted" font-size="11">Linguagem principal · repositórios públicos próprios</text>
    ${rows || '<text x="24" y="110" class="muted" font-size="13">Sem dados de linguagem disponíveis</text>'}
    <text x="24" y="${height - 22}" class="muted" font-size="11">${data.repositories.count} repositórios públicos · atualizado ${escapeXml(data.updatedAt)}</text>`, height);
}

async function fetchGitHubStats() {
  const token = process.env.GITHUB_TOKEN;
  if (!token) throw new Error('Defina GITHUB_TOKEN para consultar a API GraphQL.');
  const year = new Date().getUTCFullYear();
  const query = `query($login:String!, $from:DateTime!, $to:DateTime!) {
    user(login:$login) {
      contributionsCollection(from:$from, to:$to) {
        contributionCalendar { totalContributions }
        totalCommitContributions
        totalPullRequestContributions
        totalPullRequestReviewContributions
        totalIssueContributions
      }
      repositories(first:100, ownerAffiliations:OWNER, privacy:PUBLIC, isFork:false, orderBy:{field:UPDATED_AT,direction:DESC}) {
        totalCount
        nodes { primaryLanguage { name } }
      }
    }
  }`;
  const response = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query,
      variables: {
        login: username,
        from: `${year}-01-01T00:00:00Z`,
        to: `${year}-12-31T23:59:59Z`,
      },
    }),
  });
  if (!response.ok) throw new Error(`GitHub GraphQL respondeu HTTP ${response.status}`);
  const body = await response.json();
  if (body.errors?.length) throw new Error(body.errors.map((error) => error.message).join('; '));
  if (!body.data?.user) throw new Error(`Usuário GitHub não encontrado: ${username}`);
  const user = body.data.user;
  const contribution = user.contributionsCollection;
  const languageCounts = new Map();
  for (const repo of user.repositories.nodes) {
    const language = repo.primaryLanguage?.name || 'Outras';
    languageCounts.set(language, (languageCounts.get(language) || 0) + 1);
  }
  return {
    username,
    year,
    updatedAt: new Date().toISOString().slice(0, 10),
    contributions: {
      total: contribution.contributionCalendar.totalContributions,
      commits: contribution.totalCommitContributions,
      pullRequests: contribution.totalPullRequestContributions,
      reviews: contribution.totalPullRequestReviewContributions,
      issues: contribution.totalIssueContributions,
    },
    repositories: {
      count: user.repositories.totalCount,
      languages: [...languageCounts.entries()]
        .map(([name, count]) => ({ name, count }))
        .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name)),
    },
  };
}

async function main() {
  let data;
  if (process.argv.includes('--render-only')) {
    data = JSON.parse(await fs.readFile(dataPath, 'utf8'));
  } else {
    data = await fetchGitHubStats();
    await fs.mkdir(path.dirname(dataPath), { recursive: true });
    await fs.writeFile(dataPath, `${JSON.stringify(data, null, 2)}\n`);
  }
  await fs.mkdir(assetPath, { recursive: true });
  await fs.writeFile(path.join(assetPath, 'github-activity.svg'), renderActivity(data));
  await fs.writeFile(path.join(assetPath, 'github-languages.svg'), renderLanguages(data));
  console.log(`SVGs do GitHub gerados para @${data.username}.`);
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
