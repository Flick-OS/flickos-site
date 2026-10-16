#!/usr/bin/env node
/**
 * Vendor the four core FlickOS tutorials into src/content/docs/learn/.
 *
 * Source of truth: the flickos-tutorials repository (default: ../../flickos-tutorials).
 * Answer keys stay in that repo; these pages link to them.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const SRC =
	process.env.FLICKOS_TUTORIALS_PATH ?? path.resolve(ROOT, '../../flickos-tutorials');
const DEST = path.join(ROOT, 'src/content/docs/learn');
const TUTORIALS = 'https://github.com/dvbondoy/flickos-tutorials';
const FLICKOS = 'https://github.com/Flick-OS/flickos';

const GUIDES = [
	{
		src: 'flickos-deb-tutorial/README.md',
		dest: 'deb.md',
		title: 'Building a .deb',
		order: 1,
		tree: 'flickos-deb-tutorial',
	},
	{
		src: 'flickos-code-tutorial/README.md',
		dest: 'code.md',
		title: 'Writing a program',
		order: 2,
		tree: 'flickos-code-tutorial',
	},
	{
		src: 'flickos-ship-tutorial/README.md',
		dest: 'ship.md',
		title: 'Shipping a package',
		order: 3,
		tree: 'flickos-ship-tutorial',
	},
	{
		src: 'flickos-repo-tutorial/README.md',
		dest: 'repo.md',
		title: 'Into the repository',
		order: 4,
		tree: 'flickos-repo-tutorial',
	},
];

const GUIDE_LINKS = {
	'flickos-deb-tutorial': '/learn/deb/',
	'flickos-code-tutorial': '/learn/code/',
	'flickos-ship-tutorial': '/learn/ship/',
	'flickos-repo-tutorial': '/learn/repo/',
	'flickos-headless-labwc': `${TUTORIALS}/tree/main/flickos-headless-labwc`,
	'flickos-snip-spike': `${TUTORIALS}/tree/main/flickos-snip-spike`,
	'flickos-spike-kit': `${TUTORIALS}/tree/main/flickos-spike-kit`,
	'flickos-phone-spike': `${TUTORIALS}/tree/main/flickos-phone-spike`,
};

function yamlEscape(s) {
	if (/[:#{}[\],&*?|>!%@`$]/.test(s) || s.includes("'") || s.includes('"')) {
		return JSON.stringify(s);
	}
	return s;
}

function plainText(md) {
	const code = [];
	return md
		.replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
		.replace(/`([^`]*)`/g, (_, text) => `\0${code.push(text) - 1}\0`)
		.replace(/\*\*/g, '')
		.replace(/\*(\S(?:[^*]*\S)?)\*/g, '$1')
		.replace(/\0(\d+)\0/g, (_, i) => code[i])
		.replace(/\s+/g, ' ')
		.trim();
}

function descriptionFrom(body) {
	const buf = [];
	for (const line of body.split('\n')) {
		if (
			line.startsWith('#') ||
			line.startsWith('```') ||
			line.startsWith('|') ||
			line.startsWith('>') ||
			line.startsWith('- ')
		) {
			if (buf.length) break;
			continue;
		}
		if (line.trim() === '') {
			if (buf.length) break;
			continue;
		}
		buf.push(line.trim());
	}
	let desc = plainText(buf.join(' ')) || 'A FlickOS tutorial.';
	if (desc.length > 160) desc = desc.slice(0, 157).replace(/\s+\S*$/, '') + '…';
	return desc;
}

function linkify(prose) {
	let out = prose.replace(
		/the HIG \(`\$FLICKOS\/docs\/hig\/`\)/g,
		'the [Human Interface Guidelines](/docs/hig/)',
	);
	out = out.replace(/`\$FLICKOS\/docs\/hig\/`/g, '[Human Interface Guidelines](/docs/hig/)');
	out = out.replace(/`\$TUTORIALS\/(flickos-[a-z0-9-]+)`/g, (full, name) => {
		const href = GUIDE_LINKS[name];
		return href ? `[${name}](${href})` : full;
	});
	out = out.replace(
		/`docs\/hig\/([a-z0-9-]+)\.md`/g,
		(_, name) => `[${name}](/docs/hig/${name}/)`,
	);
	out = out.replace(
		/`docs\/(\d{2}-[a-z0-9-]+)\.md`/g,
		(_, name) => `[${name}](/docs/${name}/)`,
	);
	out = out.replace(
		/`docs\/design\/([a-z0-9.-]+)\.md`/g,
		(_, name) => `[${name}](${FLICKOS}/blob/main/docs/design/${name}.md)`,
	);
	out = out.replace(/`(flickos-[a-z0-9-]+)`/g, (full, name) => {
		const href = GUIDE_LINKS[name];
		return href ? `[${name}](${href})` : full;
	});
	return out;
}

function mapOutsideCode(markdown, fn) {
	return markdown
		.split('```')
		.map((part, i) => (i % 2 === 0 ? fn(part) : part))
		.join('```');
}

function processGuide(guide) {
	const raw = fs.readFileSync(path.join(SRC, guide.src), 'utf8');
	const lines = raw.split('\n');
	if (!lines[0].startsWith('# ')) {
		throw new Error(`${guide.src}: expected an H1`);
	}
	let body = lines.slice(1).join('\n').replace(/^\n/, '');
	const description = descriptionFrom(body)
		.replaceAll('$TUTORIALS/flickos-deb-tutorial', 'the deb tutorial')
		.replaceAll('$TUTORIALS/flickos-code-tutorial', 'the code tutorial')
		.replaceAll('$TUTORIALS/flickos-ship-tutorial', 'the shipping tutorial')
		.replaceAll('$TUTORIALS/flickos-repo-tutorial', 'the repository tutorial')
		.replaceAll('$FLICKOS/docs/hig/', 'the HIG');
	const filesLine = `The answer key and the other files for this guide are in [${guide.tree}](${TUTORIALS}/tree/main/${guide.tree}).\n`;
	if (!body.includes(filesLine.trim())) {
		body = body.replace(/^(> .*\n)\n/, `$1\n${filesLine}\n`);
	}
	body = mapOutsideCode(body, linkify).replace(/\s+$/, '') + '\n';
	const frontmatter = [
		'---',
		`title: ${yamlEscape(guide.title)}`,
		`description: ${JSON.stringify(description)}`,
		'sidebar:',
		`  order: ${guide.order}`,
		'---',
		'',
	].join('\n');
	return frontmatter + body;
}

function main() {
	if (!fs.existsSync(SRC)) {
		console.error(`Tutorials not found: ${SRC}`);
		console.error('Set FLICKOS_TUTORIALS_PATH to the flickos-tutorials checkout.');
		process.exit(1);
	}
	fs.mkdirSync(DEST, { recursive: true });
	for (const guide of GUIDES) {
		const out = processGuide(guide);
		fs.writeFileSync(path.join(DEST, guide.dest), out);
		console.log(`wrote learn/${guide.dest}`);
	}
}

main();
