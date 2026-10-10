const fs = require('node:fs/promises');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const token = process.env.GH_TOKEN;
const login = process.env.PROFILE_LOGIN || process.env.GITHUB_REPOSITORY_OWNER;
if (!token || !/^[a-z\d-]+$/i.test(login || '')) throw new Error('Configure GH_TOKEN e PROFILE_LOGIN.');
async function graphql(query, variables) {
  for (let attempt = 0; attempt < 4; attempt++) {
    const response = await fetch('https://api.github.com/graphql', {
      method: 'POST', headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ query, variables }), signal: AbortSignal.timeout(60000),
    });
    if (response.status >= 500 && attempt < 3) {
      await new Promise(resolve => setTimeout(resolve, 1000 * 2 ** attempt)); continue;
    }
    const result = await response.json();
    if (!response.ok || result.errors) throw new Error(`GraphQL: ${JSON.stringify(result.errors || { status: response.status })}`);
    return result.data;
  }
}
const SEARCH = `query($q:String!,$cursor:String){search(query:$q,type:ISSUE,first:100,after:$cursor){issueCount pageInfo{hasNextPage endCursor} nodes{... on PullRequest{id}}}}`;
const REVIEWS = `query($id:ID!,$cursor:String){node(id:$id){... on PullRequest{reviews(first:100,after:$cursor){nodes{author{login} state} pageInfo{hasNextPage endCursor}}}}}`;
async function main() {
  const merged = await graphql(`query($q:String!){search(query:$q,type:ISSUE,first:1){issueCount}}`, { q: `is:pr author:${login} is:merged` });
  const ids = new Set();
  // Search returns at most 1,000 results: partition by creation date when needed.
  async function collect(from, to) {
    const q = `is:pr reviewed-by:${login} created:${from}..${to}`;
    let cursor = null;
    let data = (await graphql(SEARCH, { q, cursor })).search;
    if (data.issueCount > 1000) {
      if (from === to) throw new Error('Mais de 1.000 PRs revisados criados no mesmo dia; contagem interrompida.');
      const start = Date.parse(from), end = Date.parse(to);
      const mid = new Date(start + Math.floor((end-start)/86400000/2)*86400000).toISOString().slice(0,10);
      const next = new Date(Date.parse(mid)+86400000).toISOString().slice(0,10);
      await collect(from, mid); await collect(next, to); return;
    }
    while (true) {
      for (const node of data.nodes) if (node.id) ids.add(node.id);
      if (!data.pageInfo.hasNextPage) break;
      cursor = data.pageInfo.endCursor;
      data = (await graphql(SEARCH, { q, cursor })).search;
    }
  }
  await collect('2008-01-01', new Date().toISOString().slice(0,10));
  let approved = 0, changes = 0;
  for (const id of ids) {
    let cursor = null;
    do {
      const data = (await graphql(REVIEWS, { id, cursor })).node;
      if (!data?.reviews) throw new Error('PR inacessível durante a coleta; arquivo não atualizado.');
      for (const review of data.reviews.nodes) {
        if (review.author?.login.toLowerCase() !== login.toLowerCase()) continue;
        if (review.state === 'APPROVED') approved++;
        if (review.state === 'CHANGES_REQUESTED') changes++;
      }
      cursor = data.reviews.pageInfo.hasNextPage ? data.reviews.pageInfo.endCursor : null;
    } while (cursor);
  }
  const values = { MERGED_PRS: merged.search.issueCount, APPROVED_REVIEWS: approved, CHANGES_REQUESTED_REVIEWS: changes };
  let svg = await fs.readFile(path.join(root, 'templates/profile.svg'), 'utf8');
  for (const [key, value] of Object.entries(values)) {
    if (!svg.includes(`{{${key}}}`)) throw new Error(`Placeholder ausente: ${key}`);
    svg = svg.replaceAll(`{{${key}}}`, String(value));
  }
  await fs.mkdir(path.join(root, 'assets'), { recursive: true });
  const output = path.join(root, 'assets/profile.svg');
  await fs.writeFile(`${output}.tmp`, svg);
  await fs.rename(`${output}.tmp`, output);
  console.log(values);
}
main().catch(error => { console.error(error.message); process.exitCode = 1; });
