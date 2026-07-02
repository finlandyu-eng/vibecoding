const fs = require('fs/promises');
const path = require('path');

const root = path.resolve(__dirname, '..');
const gamesDir = path.join(root, 'Games');

async function exists(filePath) {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

function cleanText(text) {
  return text.replace(/\s+/g, ' ').trim();
}

async function readHtmlMetadata(filePath) {
  const content = await fs.readFile(filePath, 'utf8');
  const titleMatch = content.match(/<title>([^<]+)<\/title>/i);
  const descriptionMatch = content.match(/<meta\s+name=["']description["']\s+content=["']([^"']+)["']/i);
  const h1Match = content.match(/<h1[^>]*>([^<]+)<\/h1>/i);
  return {
    title: titleMatch ? cleanText(titleMatch[1]) : undefined,
    description: descriptionMatch ? cleanText(descriptionMatch[1]) : undefined,
    heading: h1Match ? cleanText(h1Match[1]) : undefined
  };
}

function guessTags(title, path) {
  const tagMap = [
    { match: /chess/i, tags: ['chess', 'game', 'strategy'], prefix: 'https://source.unsplash.com/featured/800x600/?pink,chess,board' },
    { match: /pokemon/i, tags: ['pokemon', 'battle', 'starter'], prefix: 'https://source.unsplash.com/featured/800x600/?pokemon,game,starter' },
    { match: /painting|art|puzzle/i, tags: ['art', 'puzzle', 'painting'], prefix: 'https://source.unsplash.com/featured/800x600/?van-gogh,art,painting' },
    { match: /24 points|24points/i, tags: ['math', 'puzzle', 'numbers'], prefix: 'https://source.unsplash.com/featured/800x600/?math,game,puzzle' },
    { match: /web1/i, tags: ['web design', 'layout', 'animation'], prefix: 'https://source.unsplash.com/featured/800x600/?pastel,pink,flowers' },
    { match: /web2/i, tags: ['web design', 'layout', 'modern'], prefix: 'https://source.unsplash.com/featured/800x600/?pastel,architecture' }
  ];

  const matched = tagMap.find(item => item.match.test(title) || item.match.test(path));
  return matched || { tags: ['project', 'game', 'fun'], prefix: 'https://source.unsplash.com/featured/800x600/?project,game' };
}

async function buildProjectEntry(title, description, targetPath, openText) {
  const guess = guessTags(title, targetPath);
  return {
    title,
    description: description || openText || `Open ${title}.`,
    path: targetPath,
    openText,
    tags: guess.tags,
    imagePrefix: guess.prefix
  };
}

async function collectRootProjects() {
  const rootDirs = ['web1', 'web2'];
  const projects = [];

  for (const dir of rootDirs) {
    const indexPath = path.join(root, dir, 'index.html');
    if (await exists(indexPath)) {
      const metadata = await readHtmlMetadata(indexPath);
      const title = metadata.title || `${dir}`;
      const description = metadata.description || `Open ${title} from the workspace index.`;
      const openText = `Open ${dir}`;
      projects.push(await buildProjectEntry(title, description, `${dir}/index.html`, openText));
    }
  }

  return projects;
}

async function collectGameProjects() {
  const found = [];
  const entries = await fs.readdir(gamesDir, { withFileTypes: true });

  for (const entry of entries) {
    if (!entry.isDirectory()) continue;
    const gamePath = path.join(gamesDir, entry.name);
    const indexPath = path.join(gamePath, 'index.html');
    if (await exists(indexPath)) {
      const metadata = await readHtmlMetadata(indexPath);
      const title = metadata.title || metadata.heading || entry.name;
      const description = metadata.description || metadata.heading || `Open ${title}.`;
      found.push(await buildProjectEntry(title, description, path.relative(root, indexPath).replace(/\\/g, '/'), 'Open game'));
      continue;
    }

    const htmlFiles = (await fs.readdir(gamePath)).filter(name => name.toLowerCase().endsWith('.html'));
    if (htmlFiles.length > 0) {
      const candidate = htmlFiles.find(name => /index\.html$/i.test(name)) || htmlFiles[0];
      const filePath = path.join(gamePath, candidate);
      const metadata = await readHtmlMetadata(filePath);
      const title = metadata.title || metadata.heading || `${entry.name}`;
      const description = metadata.description || metadata.heading || `Open ${title}.`;
      found.push(await buildProjectEntry(title, description, path.relative(root, filePath).replace(/\\/g, '/'), 'Open game'));
    }
  }

  return found;
}

async function main() {
  const projects = [
    ...(await collectRootProjects()),
    ...(await collectGameProjects())
  ];

  const outputPath = path.join(root, 'projects.json');
  await fs.writeFile(outputPath, JSON.stringify(projects, null, 2) + '\n', 'utf8');
  console.log(`Wrote ${projects.length} projects to ${outputPath}`);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
