// The apps sold through the FlickOS store. Wiring and the hidden-until-open flag live in src/config/store.ts.
// Prices are the ones proposed in the store design's ADR-005 and are not decided yet.

import type { ImageMetadata } from 'astro';
import notesShot from '../assets/apps/notes.png';
import trailShot from '../assets/apps/trail.png';
import writeShot from '../assets/apps/write.png';
import phoneScreenShot from '../assets/apps/phone-screen.png';

export interface StoreApp {
	id: string;
	/** The app's name, as the desktop shows it. */
	name: string;
	/** The apt package the key unlocks. */
	package: string;
	price: number;
	tagline: string;
	points: string[];
	/** What the app needs besides FlickOS itself. Left out when it needs nothing. */
	requires?: string;
	/** 'soon' until the app is published to the store; then 'on-sale' with a checkout link. */
	status: 'on-sale' | 'soon';
	/** The payment company's checkout address. The Buy button appears once this is filled in. */
	checkoutUrl?: string;
	/** Left out until there is a picture. A portrait shot is shown narrower than a window. */
	shot?: ImageMetadata;
	shotAlt?: string;
}

/** "Notes, Trail and Write" — stays grammatical for any length of list. */
export function joinNames(items: string[]) {
	if (items.length <= 1) return items[0] ?? '';
	return `${items.slice(0, -1).join(', ')} and ${items[items.length - 1]}`;
}

/** In the order they go on sale. Add an app here and the store page picks it up. */
export const apps: StoreApp[] = [
	{
		id: 'notes',
		name: 'Notes',
		package: 'flickos-notes',
		price: 12,
		tagline:
			'Notes as plain Markdown files, with tags, search and checklists — and one click sends a note to your phone.',
		points: [
			'Every note is a Markdown file in a folder you can see. Any editor, backup or sync tool can read them, and they outlive the app.',
			'Tag a note by writing #work in it. Search covers every note’s words and tags.',
			'Checklists in any note: tick an item with a click on the computer, or a tap on the phone.',
			'Continue on Phone opens the note in the free Android app, with the cursor where you left it.',
			'It saves by itself. There is no Save button, and nothing runs while the window is closed.',
		],
		requires: 'Continue on Phone needs an Android phone paired in Settings → Phone. The Android app is free.',
		status: 'soon',
		shot: notesShot,
		shotAlt: 'Notes open on a Saturday checklist, with bread and coffee ticked and the tag #home.',
	},
	{
		id: 'trail',
		name: 'Trail',
		package: 'flickos-trail',
		price: 12,
		tagline:
			'A searchable memory of what you did: the commands you ran, the text you copied, and the text on screen when you asked for it.',
		points: [
			'Records shell commands with their folder, exit code and how long they took.',
			'Keeps the text you copy, and reads the text on screen when you press the key for it.',
			'Secrets are removed before anything is stored, and everything stays in one file in your home folder.',
			'Find it again from a popup on Super+S, or from the terminal.',
			'Nothing leaves the computer, and nothing runs in the background except the watcher that waits for a copy.',
		],
		status: 'soon',
		shot: trailShot,
		shotAlt: 'Trail’s settings, with recording on for terminal commands and copied text, and how long each is kept.',
	},
	{
		id: 'write',
		name: 'Write',
		package: 'flickos-write',
		price: 19,
		tagline:
			'A full screen with nothing but the text, chapters as plain Markdown, and a word count against a daily goal.',
		points: [
			'A writing session fills the screen and holds notifications until you end it.',
			'Typewriter scrolling keeps the line you are writing in the middle of the screen. Focus dims everything but the sentence you are on.',
			'Word counts for the chapter, for the project, and for today against a goal you set.',
			'Continue on Phone sends a chapter to the free Android app — and brings back what you wrote there.',
			'Export a project as one document: ODT, DOCX, PDF or EPUB.',
		],
		requires: 'Continue on Phone needs an Android phone paired in Settings → Phone. The Android app is free.',
		status: 'soon',
		shot: writeShot,
		shotAlt: 'Write open on the chapter The light in the kitchen, 484 words.',
	},
	{
		id: 'phone-screen',
		name: 'Phone Screen',
		package: 'flickos-phone-screen',
		price: 9,
		tagline:
			'Your phone’s screen in a window on the computer, used with the computer’s mouse and keyboard.',
		points: [
			'Pair once by typing the six digits the phone shows. No cable and no adb commands.',
			'Show Phone Screen joins the phone menu on the panel once the phone is paired.',
			'The window walks you through the phone’s side the first time, and whenever Android has turned Wireless debugging off.',
			'Nothing runs while the window is closed.',
		],
		requires:
			'Needs an Android phone running Android 11 or newer, paired in Settings → Phone. The picture comes from scrcpy, which is free software; what you pay for is the setup around it.',
		status: 'soon',
		shot: phoneScreenShot,
		shotAlt: 'Maps open on Berlin, shown in the Phone Screen window.',
	},
];

export const onSale = apps.filter((app) => app.status === 'on-sale' && app.checkoutUrl);
