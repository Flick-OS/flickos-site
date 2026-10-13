---
title: Make FlickOS yours
description: "Change how your FlickOS desktop looks: layouts and styles, your own style with your colors, one key or setting at a time, panel buttons, and sharing what you made."
sidebar:
  order: 6
---
This guide is for people who use FlickOS and want it to look like
**theirs**: other colors, another theme, a key of your own, a button on the
panel. You need a terminal and a text editor, nothing more. You don't need
root, apart from installing a theme from Debian. Nothing here can break
FlickOS: every step says how to undo it, and one button puts FlickOS's own
look back.

FlickOS keeps everything you change in your home folder and never copies
its own files there. That way FlickOS's updates still reach you, for
everything you didn't change.

- **Before this guide:** nothing. Start at step 1 and stop wherever you're
  happy.
- **The details:** [Customizing FlickOS](/docs/09-customizing/) is the
  reference this guide is drawn from. It is written for people who build
  FlickOS, so it goes further than you'll need.

## Contents

1. [Without a file](#1-without-a-file)
2. [Your first style](#2-your-first-style)
3. [What a style holds](#3-what-a-style-holds)
4. [check](#4-check)
5. [One key, one setting](#5-one-key-one-setting)
6. [Your terminal and launcher](#6-your-terminal-and-launcher)
7. [A panel button](#7-a-panel-button)
8. [When something looks wrong](#8-when-something-looks-wrong)
9. [Share it](#9-share-it)
10. [Cheat sheet](#10-cheat-sheet)

---

## 1. Without a file

Try these before you write anything. They might be all you want.

**Layout and style.** *Settings → Desktop Layout & Style* (or
`flickos-layout pick`). A **layout** is where things are: the panel, the
start menu, the dock, the window buttons. **Redmond** has one panel at the
bottom, **Cupertino** a top bar and a dock, and **Traditional** two panels.
A **style** is how things look: the colors and themes. FlickOS ships
**Dark** and **Light**. You can mix any layout with any style.

**More styles.** *Software → Styles* lists the styles you can install. The
first is **Seven**: light windows, see-through sky blue title bars and a
see-through dark blue panel. Once a style is installed, its page has two
buttons. **Try** shows it until you log out. **Use** keeps it.

**Wallpaper.** *Settings → Wallpaper* lets you pick any picture. Your
choice stays when you change the style. A style's own wallpaper only shows
while you haven't picked one.

**GTK theme, icons, cursor, fonts.** *Settings → Appearance* (nwg-look).
FlickOS's styles leave alone a theme you picked there: change the style
and your windows keep your theme. To let styles choose the theme again:

```sh
gsettings reset org.gnome.desktop.interface gtk-theme
gsettings reset org.gnome.desktop.interface icon-theme
flickos-layout style set dark     # or whichever style you use
```

**Undo:** *Settings → Desktop Layout & Style → Back to FlickOS's Look*,
or *Settings → History*, which lists every change with an *Undo* button.

---

## 2. Your first style

A style of your own lives in `~/.local/share/flickos/styles/`, one folder
per style. You never start from nothing. Your style **inherits** from one of
FlickOS's and holds only what you change. Everything else stays FlickOS's,
updates included.

The example here is Dark with an orange accent.

**Make it:**

```sh
flickos-layout style new dark-orange --from dark --name "Dark Orange"
```

It prints the new folder: `~/.local/share/flickos/styles/dark-orange`.
In it are five files, each with every setting the style could change,
commented out and showing Dark's value:

```css
/* @define-color wm_bg #2f343f; */
/* @define-color bg_color #383c4a; */
/* @define-color base_color #404552; */
/* @define-color fg_color #d3dae3; */
/* @define-color selected_bg_color #5294e2; */
…
```

To change a color, take away the comment marks around its line and change
the value. Leave the other lines alone.

**See each save at once.** Open a terminal on the desktop and leave this
running while you edit:

```sh
flickos-layout watch
```

Then use the style:

```sh
flickos-layout style set dark-orange
```

Your style is now also in *Settings → Desktop Layout & Style*, marked
*Yours*. *Open Folder* on that page opens your styles folder.

**The accent.** In `waybar-colors.css`, Dark's accent is blue,
`#5294e2`. Make it orange:

```css
@define-color selected_bg_color #f27835;
```

`watch` saves you a step: it checks the file, then repaints the panel. This
time it also warns:

```
…/dark-orange/waybar-colors.css: warning: selected_fg_color on selected_bg_color is 2.8:1, below 3:1: hard to read (HIG A11Y-6)
```

The accent has white text on it (`selected_fg_color`), and white on that
orange is too faint to read easily. Pick a deeper orange:

```css
@define-color selected_bg_color #d9600b;
```

The warning goes away. Do the same in `fuzzel.ini`, the launcher's colors,
so that its selected line matches:

```ini
selection=d9600bff
```

(fuzzel's colors have two more digits at the end: how see-through they
are, `ff` for solid.)

**Undo:** `flickos-layout style set default` brings FlickOS's style back.
Your folder stays until you delete it.

---

## 3. What a style holds

### `style.ini`

| Key | What it does |
|---|---|
| `Name=` | The name in Settings |
| `Comment=` | The line under it |
| `Inherits=` | The style it starts from: `dark`, `light`, `seven`, or another of yours |
| `GtkTheme=` | The theme of windows and their controls |
| `IconTheme=` | The icons |
| `LabwcTheme=` | Title bars and window borders |
| `ColorScheme=` | `prefer-dark` or `default`, for apps that follow it |
| `Wallpaper=` | A PNG or JPEG **in the style's folder** |
| `Packages=` | The Debian packages its themes come from, `;` between them |

### The panel's colors (`waybar-colors.css`)

| Color | Where you see it |
|---|---|
| `wm_bg` | The panel's background (drawn slightly see-through) |
| `fg_color` | The panel's text and icons |
| `base_color` | A panel button under the pointer |
| `bg_color` | Tooltips |
| `borders` | Tooltips' borders |
| `selected_bg_color` | The accent: the window you're in on the taskbar, the start button under the pointer |
| `selected_fg_color` | Text on the accent |
| `warning_color` | A low battery |
| `error_color` | A very low battery, muted sound, a recording |
| `brand_color` | The ring and dot of the start button's logo |

A color may be see-through too: `rgba(14, 42, 76, 0.82)`, or `#rrggbbaa`.

### The other three

`foot.ini` holds the terminal's colors: the background, the text, and the
sixteen colors programs print in. `fuzzel.ini` holds the launcher's colors
and its icon theme. `mako.conf` holds the notifications' colors.

### Only colors

These files may hold **only** the colors that Dark's own files set. Nothing
else is allowed: no fonts, no `include=` lines, no commands. That is on
purpose. A terminal's config could otherwise name a program to run, and
someone else's style must never be able to do that on your computer. So a
style is safe to download (step 9).

### A theme from Debian

Debian has many GTK and icon themes. Install one, then name it:

```sh
sudo apt install greybird-gtk-theme
```

```ini
GtkTheme=Greybird
Packages=greybird-gtk-theme
```

`Packages=` tells anyone you share the style with what to install. Without
the theme, FlickOS doesn't break: it uses the parent style's theme and
`check` says what's missing. Mind the size before you install: some icon
themes are huge (`papirus-icon-theme` takes 187 MB).

FlickOS's own title bar themes are `FlickOS-Arc-Dark`, `FlickOS-Arc` and
(with Seven installed) `Seven`. Any labwc theme in `/usr/share/themes` or
`~/.local/share/themes` works too.

---

## 4. check

`flickos-layout check` reads your files and changes nothing. It prints
nothing when all is well.

```sh
flickos-layout check dark-orange   # one style
flickos-layout check               # all of yours, plus your labwc files and add-ons
```

Each line names a file, often a line number, and what's wrong:

- **error**: FlickOS won't use it. `style set` refuses a style with an
  error, and so does `watch`. You keep your previous style meanwhile.
- **warning**: it works, but something's off. A theme isn't installed,
  or text is hard to read.

For example, a foot line that isn't a color:

```
…/dark-orange/foot.ini:24: error: shell in [colors] isn't one of the style's keys for foot; only colors may be here
```

**Contrast.** The warnings about contrast compare a text color with what's
behind it, and say how far apart they are, as a ratio. Ordinary text needs
4.5:1, the accent's 3:1. Below that, people with weaker eyes, or anyone in
sunlight, struggle to read it. It's your desktop, so these stay warnings,
but a style you share should pass.

---

## 5. One key, one setting

FlickOS's window manager is **labwc**. Your own files in
`~/.config/labwc/` are **added to** FlickOS's, so a file with one key holds
one key. You keep every FlickOS key, the layout's window buttons, tiling and
Settings' mouse and keyboard options.

Make `~/.config/labwc/rc.xml`:

```xml
<?xml version="1.0"?>
<labwc_config>
  <core>
    <gap>8</gap>
  </core>
  <keyboard>
    <keybind key="W-n">
      <action name="Execute" command="firefox-esr --private-window" />
    </keybind>
    <keybind key="W-t">
      <action name="None" />
    </keybind>
  </keyboard>
</labwc_config>
```

That leaves 8 pixels between windows, makes Super+N open a private browser
window, and turns off Super+T (tiling's key). `watch` reloads labwc when you
save. Without it, run `labwc --reconfigure`.

| You write | What happens |
|---|---|
| A key FlickOS doesn't use | Added |
| A key FlickOS uses | Yours replaces FlickOS's |
| A key with `<action name="None" />` | FlickOS's key is gone |
| `<core>`, `<theme>`, `<margin>` settings | Set over FlickOS's |
| `<windowRules>` | Added to FlickOS's |

Hold Super to see every key, yours too.

**When your file replaces FlickOS's instead.** In four cases, adding your
file to FlickOS's would break FlickOS. labwc then uses your file
**instead** of FlickOS's, as it did before FlickOS added files together.
You lose FlickOS's keys, window buttons and tiling until you fix it:

| Don't | Because | Do |
|---|---|---|
| Copy FlickOS's whole `rc.xml` | Keys you deleted from the copy would come back | Keep only your own lines |
| Write `<default />` | labwc's own keys come back over FlickOS's | Delete the line |
| Name a menu `root-menu` (or another FlickOS menu) in `menu.xml` | labwc keeps FlickOS's | Give your menus their own ids |
| Make `~/.config/labwc/autostart` | Programs would start twice | Use *Settings → Startup Applications* |

These are decided when you log in. `flickos-layout doctor` says when one
applies and what to change. `flickos-layout explain labwc` says which files
labwc reads.

labwc's own example files on the web are written for a labwc without
FlickOS. Copy single lines from them, never whole files.

**Undo:** delete your file and run `labwc --reconfigure`.

---

## 6. Your terminal and launcher

If you write your own `~/.config/foot/foot.ini`, foot reads **only** yours.
FlickOS's font, padding and colors are gone, and changing the style no longer
changes your terminal. Two lines at the top bring them back:

```ini
include=/etc/xdg/flickos/foot/foot.ini
include=/run/user/1000/flickos/style/foot.ini

[main]
font=monospace:size=13
```

The first line is FlickOS's settings. The second is the colors of whichever
style you use. Then your own lines win. **Replace `1000` with your own user
number**, which `id -u` prints: foot and fuzzel take no variables there.

The launcher works the same way, in `~/.config/fuzzel/fuzzel.ini`:

```ini
include=/etc/xdg/flickos/fuzzel/fuzzel.ini
include=/run/user/1000/flickos/style/fuzzel.ini
```

There is no such line for notifications (mako). If a file it includes is
missing, mako doesn't start at all. So don't write your own mako config;
change its colors in your style instead.

---

## 7. A panel button

An **add-on** puts something on the panel without changing FlickOS's
panel. Each add-on is a folder in `~/.config/flickos/addons/`, named in
lowercase letters, digits, `-` and `_`.

`~/.config/flickos/addons/notes/waybar.jsonc`:

```jsonc
{
    // A panel button that opens a notes file in the terminal.
    "custom/notes": {
        "format": "✎",
        "tooltip-format": "My notes",
        "on-click": "foot nano ~/notes.txt"
    }
}
```

The button sits near the right end, in every layout. `watch` adds it when
you save. Without it, run `flickos-layout reload-panel`. The panel program is
waybar, and the [waybar wiki](https://github.com/Alexays/Waybar/wiki/Module:-Custom)
lists everything a `custom/` button can do. Only `custom/` buttons are
allowed here.

An add-on folder can hold two more files:

- **`style.css`**: CSS for your button. Use the style's color names
  (`@fg_color`, `@selected_bg_color`) instead of values, so the button
  follows the style:

  ```css
  #custom-notes:hover { color: @selected_bg_color; }
  ```

- **`labwc.xml`**: keys and window rules that belong with the button, each
  key with a `description="…"` for the shortcut sheet.

`flickos-layout addons` lists your add-ons. If one doesn't show, run
`flickos-layout check`.

**Undo:** delete the folder, then `flickos-layout reload-panel`.

---

## 8. When something looks wrong

**Which file wins?** `flickos-layout explain` lists, for each program, the
files it reads in order and whose each one is:

```
$ flickos-layout explain panel
panel     /run/user/1000/flickos/waybar/config.jsonc (generated for the Redmond layout)
          CSS /run/user/1000/flickos/waybar/style.css, imports in order:
            /usr/share/flickos/styles/dark/waybar-colors.css (Dark style's colors)
            /usr/share/flickos/layouts/redmond/style.css (the Redmond layout)
```

Try `explain labwc`, `explain gtk`, `explain wallpaper`, `explain foot`.

**Is it me or FlickOS?** Log out. On the login screen, pick
**flickos-session-plain** under the usual session. It starts FlickOS
without your styles, add-ons and labwc files. **Nothing of yours is
changed.** If the problem is gone there, it's something in your files.
Log in normally again and run `flickos-layout check`.

**Get FlickOS's look back.** *Settings → Desktop Layout & Style → Back to
FlickOS's Look*. To go back to how things were at a moment, open *Settings →
History* and use *Put Back as It Was…*.

**Reporting a bug?** Paste what *Settings → About → Copy System Info*
gives you. It names your style and its parent, so whoever reads the
report knows.

---

## 9. Share it

### Export

```sh
flickos-layout export dark-orange
```

It writes `dark-orange.tar.gz` into the folder you're in. It holds your
style's settings and colors, and its wallpaper if it has one, never more.
If your style inherits from another style of yours, both are folded into
one, so it works on any FlickOS computer.

### Import

```sh
flickos-layout import ~/Downloads/dark-orange.tar.gz
```

Before it keeps anything, import checks the file:

- It holds **one** folder with a style's own files, of limited size, and
  nothing else.
- `check` finds no errors in it.
- Its name isn't one of FlickOS's styles, or one of yours. Add `--replace`
  to replace yours.

Anything wrong and **nothing is kept**. If it only has warnings (a theme
you don't have, faint text), import names them and asks whether to keep
it. A style holds only colors, theme names and a picture, so importing one
never runs anything.

### Try before you keep

```sh
flickos-layout try dark-orange    # until you log out
flickos-layout style set dark-orange   # keep it
flickos-layout try --end          # or go back now
```

While you try, *Settings → Desktop Layout & Style* has *Keep* and *End*.
Logging out always ends a try.

### The showcase

Show your desktop in **#showcase** on
[FlickOS's Discord](https://discord.gg/vFj3VxYwC):

- one post per desktop, with a screenshot (Print, or Super+Shift+S);
- if it's your own style, the file from `flickos-layout export`, so
  others can import it;
- which layout and themes you used.

Every month one post is picked and shown here.

### In Software

To put your style in *Software → Styles*, where anyone can install it, try
it and get your updates, publish it as a package:
[A style instead of an app](/learn/publish/#12-a-style-instead-of-an-app).
It takes a public git repository and a few files around your style. Your
style must pass `check` with no warning at all, since people install it
without seeing it first.

---

## 10. Cheat sheet

| To | Run |
|---|---|
| Make a style | `flickos-layout style new ID --from dark --name "Name"` |
| See each save | `flickos-layout watch` (leave it open) |
| Use a style | `flickos-layout style set ID` |
| FlickOS's style again | `flickos-layout style set default` |
| List styles | `flickos-layout style list` |
| Check your files | `flickos-layout check [ID]` |
| What's wrong with my setup | `flickos-layout doctor` |
| Which file wins | `flickos-layout explain [labwc\|panel\|gtk\|foot\|…]` |
| Reload labwc | `labwc --reconfigure` |
| Reload the panel | `flickos-layout reload-panel` |
| List add-ons | `flickos-layout addons` |
| Share a style | `flickos-layout export ID` |
| Take a shared style | `flickos-layout import FILE` |
| Try one until logout | `flickos-layout try ID`, `flickos-layout try --end` |

| Where | What |
|---|---|
| `~/.local/share/flickos/styles/ID/` | Your styles |
| `~/.config/labwc/rc.xml` | Your keys and window settings |
| `~/.config/flickos/addons/NAME/` | Your panel buttons |
| `~/.config/foot/foot.ini`, `~/.config/fuzzel/fuzzel.ini` | Your terminal and launcher, with the two `include=` lines |
