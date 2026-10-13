export interface Feature {
	title: string;
	body: string;
	href?: string;
	linkLabel?: string;
}

/** Shown on the home page under "Built for everyday use". */
export const highlights: Feature[] = [
	{
		title: 'Three live layouts',
		body: 'Redmond, Cupertino, and Traditional — switch from Settings without logging out. Traditional has four desktops.',
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
		title: 'Restore points',
		body: 'Before every software change, FlickOS saves the system as a restore point. Put one back from Settings → Restore Points or from the boot menu, and if the computer fails to start twice after an update, it goes back to the last one that worked by itself. On new installs of 2.2 (btrfs, the installer\'s default).',
		href: '/#restore',
		linkLabel: 'How restore points work',
	},
	{
		title: 'Software',
		body: 'Find, install and remove apps, not packages: icons, descriptions, screenshots, and the space an app needs before you install it. Apps come from Debian (the default), FlickOS, the FlickOS community repository and Flathub, and the front page has a Made for FlickOS shelf. Removing anything the desktop needs is refused, and apps from Flathub update with the automatic updates.',
	},
	{
		title: 'Community repository',
		body: 'Other developers can publish apps for FlickOS. Each one is built from its public source code, checked and reviewed before it is published, and its page in Software says so. Automatic updates install community apps\' updates too.',
		href: '/learn/publish/',
		linkLabel: 'Publish your app for FlickOS',
	},
	{
		title: 'One Settings window',
		body: 'All Settings covers layout, displays and night light, input, language and region, default and startup apps, notifications, power and idle, memory, date and time, updates, phone, privacy, login, user accounts, firewall, tiling, shortcuts, animations, and history. Type to search any setting.',
	},
	{
		title: 'Start menu',
		body: 'Tap Super or click the apps button: a classic menu in Redmond, categories in Traditional, a full-screen app grid in Cupertino. In the grid, clicking an app that is already open brings its window forward. Log Out, Restart and Shut Down take a second click, so a stray one does nothing. Prefer the plain app launcher? Switch back in Settings → Desktop Layout & Style.',
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
		title: 'Hold Super for shortcuts',
		body: 'Press and hold Super for about 0.7s to see the shortcut sheet; let go to close. Also under Settings → Keyboard Shortcuts.',
	},
	{
		title: 'Arc look, FlickOS logo',
		body: 'GTK, panel, terminal, launcher and notifications share the Arc palette, with a Light style too. The boot menus, splash screen, installer and wallpapers carry FlickOS\'s amber halo logo, and installed systems get a FlickOS boot menu theme. On the desktop only the start button\'s logo is amber.',
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
		body: 'Boot the live session, explore, then install with Calamares from the desktop menu. It uses btrfs by default, for restore points, and a 10 GB disk is enough. At first login a welcome window points you to layouts, Settings, Wi-Fi, and shortcuts.',
	},
];
