export interface Feature {
	title: string;
	body: string;
	href?: string;
	linkLabel?: string;
}

/** Shown on the home page under "Built for everyday use". */
export const highlights: Feature[] = [
	{
		title: 'Four live layouts',
		body: 'Redmond, Redmond+, Cupertino, and Traditional — switch from Settings without logging out. Window buttons go on the left, the right or both sides, and Traditional has four desktops.',
	},
	{
		title: 'Optional tiling',
		body: 'flick-tiler is off by default. Super+T toggles it; Super+M cycles arrangements.',
		href: '/screenshots/#tiling',
		linkLabel: 'See tiling screenshots',
	},
	{
		title: 'History: undo and redo',
		body: 'Settings → History lists every change to the desktop and installed software, newest first, each with Undo — and an undo can be undone too. Put Back as It Was… returns your settings to an earlier day.',
		href: '/#undo',
		linkLabel: 'How undo works',
	},
];

/** Everything else, on the Features page. */
export const features: Feature[] = [
	{
		title: 'Coming from Windows',
		body: 'Bring Files from Windows copies your files and browser bookmarks from the Windows disk, even from the live session before you install. Double-click a Windows program and a window says what to use instead, from a list of 161 programs. Websites like WhatsApp or Outlook get windows of their own, with a taskbar button.',
		href: '/coming-from-windows/',
		linkLabel: 'The switching guide',
	},
	{
		title: 'Tool Kits',
		body: 'One switch for each kind of work: programming (Python, web, C and C++, containers), studying, apps for young learners, and security testing. Each kit installs its apps and tools through Software and removes them again, with setup steps such as your name for Git or an SSH key, and containers with a kit\'s tools inside that leave your system as it is.',
		href: '/guides/tool-kits/',
		linkLabel: 'The Tool Kits guide',
	},
	{
		title: 'Restore points',
		body: 'Before every software change, FlickOS saves the system as a restore point. Put one back from Settings → Restore Points or from the boot menu, and if the computer fails to start twice after an update, it goes back to the last one that worked by itself. On new installs since 2.2 (btrfs, the installer\'s default).',
		href: '/#restore',
		linkLabel: 'How restore points work',
	},
	{
		title: 'Software',
		body: 'Find, install and remove apps, not packages: icons, descriptions, screenshots, and the space an app needs before you install it. Apps come from Debian (the default), FlickOS, the FlickOS community repository and Flathub, and the front page has a Made for FlickOS shelf. Removing anything the desktop needs is refused, and apps from Flathub update with the automatic updates. Double-click a .deb or Flatpak file and Software shows what it is and what it may reach before installing it.',
	},
	{
		title: 'Community repository',
		body: 'Other developers can publish apps for FlickOS. Each one is built from its public source code, checked and reviewed before it is published, and its page in Software says so. Automatic updates install community apps\' updates too.',
		href: '/learn/publish/',
		linkLabel: 'Publish your app for FlickOS',
	},
	{
		title: 'One Settings window',
		body: 'All Settings covers layout, displays and night light, input, language and region, default and startup apps, notifications, power and idle, memory, date and time, updates, phone, media controls, weather, privacy, the login screen, user accounts, firewall, tiling, shortcuts, animations, and history. Type to search any setting.',
	},
	{
		title: 'Start menu',
		body: 'Tap Super or click the apps button: a classic menu in Redmond, categories in Traditional, a full-screen app grid in Cupertino. In the grid, clicking an app that is already open brings its window forward. Log Out, Restart and Shut Down take a second click, so a stray one does nothing. Or choose Prompt: type to find apps, folders and files, work out sums, or run a command, with every app as a tile underneath. Prefer the plain app launcher? Switch back in Settings → Desktop Layout & Style.',
	},
	{
		title: 'Login and lock screens',
		body: 'FlickOS has its own of both, with your picture from Settings → Users, and the login screen\'s background, language and place on the screen in Settings → Login Screen. Pick your name from a list instead of typing it, and show the password as you type. When the screen locks by itself, a key or a mouse move within a few seconds unlocks it again, and the volume and media keys work while it is locked.',
	},
	{
		title: 'Media controls and weather',
		body: 'Both off by default. Previous, play or pause, next and what is playing in the panel, with a sound spectrum if you want one, and the weather for a place you choose. Turn them on in Settings → Media Controls and Settings → Weather.',
	},
	{
		title: 'Screenshots and recording',
		body: 'Print captures an area on a frozen screen. Super+Shift+S opens a bar for a photo or a video, with a delay if you want one. The same bar can copy the text on screen when tesseract is installed. Super+Shift+R starts or stops a recording. Draw on a screenshot from its notification.',
	},
	{
		title: 'Phone',
		body: 'Off by default. Pair an Android phone with the KDE Connect app in Settings → Phone to send pages, text, files, and the clipboard both ways. The file manager gets Send to Phone, and Browse Phone opens the folders the phone offers. Calls, what the phone plays, control of media on this computer, and named commands stay off until you turn each one on.',
	},
	{
		title: 'Quick Settings',
		body: 'Off by default. Turn it on in Settings → Desktop Layout & Style, then click the volume or battery icon for Wi-Fi, Do Not Disturb, night light, tiling, the phone, volume, brightness, and the power buttons.',
	},
	{
		title: 'Hooks',
		body: 'Run your own programs when the screen locks or unlocks, the computer wakes, a screen comes or goes, your phone connects, a setting changes, or a screenshot is saved. Nothing runs until you add one.',
		href: '/guides/hooks/',
		linkLabel: 'The Hooks guide',
	},
	{
		title: 'Classroom',
		body: 'For schools, installed only if you add it: a teacher sees every student\'s screen, locks the class, sends a message or a web page, helps one student or shows their own screen, on the school\'s own network with no server. Nothing is shared until sharing is turned on in Settings → Classroom.',
	},
	{
		title: 'Hold Super for shortcuts',
		body: 'Press and hold Super for about 0.7s to see the shortcut sheet; let go to close. Also under Settings → Keyboard Shortcuts.',
	},
	{
		title: 'Make it yours',
		body: 'Seven more styles in Software → Styles, each with its own look and layout: Try one until you log out, or Use it. Or start from any FlickOS style or layout and change only what you want. FlickOS checks your files first, so a mistake can\'t leave you without a panel.',
		href: '/learn/yours/',
		linkLabel: 'Make FlickOS yours',
	},
	{
		title: 'Arc look, FlickOS logo',
		body: 'FlickOS\'s own GTK themes give windows, title bars, panels and menus one look and the same corners, and the terminal, launcher and notifications share the Arc palette, with a Light style too. Inter is the system font, and a soft shadow shows which window is in front. The boot menus, splash screen and installer carry FlickOS\'s amber halo logo, and installed systems get a FlickOS boot menu theme. On the desktop only the start button\'s logo is amber.',
	},
	{
		title: 'Firefox on less memory',
		body: 'Settings → Memory shows how much memory the computer has and uses. Turn on Firefox: use less memory to save about 130 MB with 9 tabs open on a 2 GB machine — recommended on computers with 3 GB or less.',
	},
	{
		title: 'Ready to use',
		body: 'Firefox ESR with uBlock Origin and vertical tabs, Thunar, LibreOffice, VLC, Software, PipeWire, NetworkManager, Flatpak, firewall on by default.',
	},
	{
		title: 'Updates that stick',
		body: 'FlickOS packages update via the apt repository alongside normal Debian security updates. Choose what installs automatically in Settings → Updates, or update by hand from Software Updates.',
	},
	{
		title: 'Install when ready',
		body: 'Boot the live session, explore, then install with Calamares from the desktop menu. It can install next to Windows or replace it, uses btrfs by default, for restore points, and a 10 GB disk is enough. Secure Boot can stay on. At first login a welcome window points you to layouts, Settings, Wi-Fi, and shortcuts.',
	},
];
