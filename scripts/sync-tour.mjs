#!/usr/bin/env node
/**
 * Copy the FlickOS 3.0 tour that the product repo's tools/make-tour.py
 * captured (its tour/ folder, on the forky branch) into the site:
 *
 * - the pictures and clips (*.webp, *.webm, *.mp4) into public/tour/, as they
 *   are (already compressed; Astro doesn't process video)
 * - tour.json into src/data/tour.json, which src/pages/tour.astro reads
 *
 * public/tour/ is emptied first, so a step the new capture dropped goes too.
 * The contact sheet and the VM folder stay behind. Set FLICKOS_TOUR_PATH if
 * the capture isn't at ../FlickOS-forky/tour.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const SRC = process.env.FLICKOS_TOUR_PATH ?? path.resolve(ROOT, '../FlickOS-forky/tour');
const MEDIA = path.join(ROOT, 'public/tour');
const DATA = path.join(ROOT, 'src/data/tour.json');
const KEEP = /\.(webp|webm|mp4)$/;

const json = path.join(SRC, 'tour.json');
if (!fs.existsSync(json)) {
	console.error(`sync-tour: no ${json}; run tools/make-tour.py in the product repo first`);
	process.exit(1);
}
const tour = JSON.parse(fs.readFileSync(json, 'utf8'));
if (tour.v !== 1 || !Array.isArray(tour.steps)) {
	console.error(`sync-tour: ${json} is not a version 1 tour`);
	process.exit(1);
}

// Every file the steps name must be there, before anything is replaced.
const named = tour.steps.flatMap((s) =>
	[s.picture, s.poster, s.clip?.webm, s.clip?.mp4].filter(Boolean),
);
const missing = named.filter((f) => !fs.existsSync(path.join(SRC, f)));
if (missing.length) {
	console.error(`sync-tour: tour.json names files that aren't there: ${missing.join(', ')}`);
	process.exit(1);
}

fs.rmSync(MEDIA, { recursive: true, force: true });
fs.mkdirSync(MEDIA, { recursive: true });
let bytes = 0;
for (const name of fs.readdirSync(SRC).filter((f) => KEEP.test(f)).sort()) {
	fs.copyFileSync(path.join(SRC, name), path.join(MEDIA, name));
	bytes += fs.statSync(path.join(MEDIA, name)).size;
}
fs.writeFileSync(DATA, JSON.stringify(tour, null, '\t') + '\n');
console.log(
	`sync-tour: ${tour.steps.length} steps of FlickOS ${tour.version} (${tour.date}), ` +
		`${(bytes / 1e6).toFixed(1)} MB in public/tour/`,
);
