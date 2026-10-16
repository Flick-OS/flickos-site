---
title: Publish your app for FlickOS
description: "Your own app in the Software window of every FlickOS computer: the package, the rules it must pass, the pull request, the review, and updates."
sidebar:
  order: 5
---
The other guides teach how FlickOS's own packages are made. This one is for
**your** app: a program you wrote and keep in your own public repository,
which FlickOS's users then find in **Software**, install with one click and
keep up to date with their automatic updates.

FlickOS calls these **community apps**. They are ordinary `.deb` packages in
FlickOS's apt repository, in a distribution of their own,
`trixie-community`. You never upload a package: you point FlickOS at a tagged
commit of your public source, FlickOS's CI builds it and checks it, the
maintainer reads it, and only then is it signed and published.

- **What you need:** a program that runs on Debian 13 (trixie) and a public
  git repository (GitHub, Codeberg, GitLab…). The example here is **Tally**, a
  small GTK 3 counter in one Python file.
- **What it costs:** nothing. FlickOS takes no share of anything.
- **Before this guide:** [Building a .deb](/learn/deb/) teaches every file in
  `debian/`. This guide only says what is different for a community app.
- **A style, not an app?** It is published the same way. Step 12 says what
  is different.

## Contents

1. [What you get, and what you agree to](#1-what-you-get-and-what-you-agree-to)
2. [Pick a name](#2-pick-a-name)
3. [The rules](#3-the-rules)
4. [The desktop file](#4-the-desktop-file)
5. [The metainfo file](#5-the-metainfo-file)
6. [debian/](#6-debian)
7. [Build and check it yourself](#7-build-and-check-it-yourself)
8. [Tag and open the pull request](#8-tag-and-open-the-pull-request)
9. [The review](#9-the-review)
10. [Updates](#10-updates)
11. [The Made for FlickOS shelf](#11-the-made-for-flickos-shelf)
12. [A style instead of an app](#12-a-style-instead-of-an-app)
13. [Flathub instead, or as well?](#13-flathub-instead-or-as-well)
14. [Traps](#14-traps)
15. [Cheat sheet](#15-cheat-sheet)

---

## 1. What you get, and what you agree to

**You get:**
- Your app in Software on every FlickOS computer, searchable, with your
  icon, description and screenshots, next to Debian's and Flathub's apps.
- Installs that need no runtime: your package uses the system's Python, GTK
  and libraries, so it costs a few hundred kB, not the hundreds of MB a
  first Flatpak app brings.
- Updates that arrive by themselves: FlickOS's automatic updates install new
  versions of community apps like Debian's.
- A chance at the **Made for FlickOS** shelf on Software's front page.

**You agree to:**
- **Public source.** Every version is built from a tagged commit in your
  public repository. Its license must let FlickOS redistribute the package.
- **A review of every version.** The maintainer reads your first version
  whole and every later one by what changed. It can take days.
- **The rules in step 3**, checked by a script on every build.
- **Withdrawal** if a version turns bad: FlickOS replaces it with an empty
  package on every computer that has it, through the automatic updates.

Paid apps will be possible later: you sell a key on your own checkout and
Software shows the price with a **Buy…** button. The terms will be on this
site before that opens.

## 2. Pick a name

The package's name is the name of your app in apt, in the repository's list
and in the program you install (`/usr/bin/NAME`). It must:

- be a valid Debian package name: lowercase letters, digits, `+`, `-`, `.`;
- **not be a package Debian or FlickOS already has**. Check with
  `apt-cache policy NAME` on a FlickOS computer: it must print nothing;
- **not start with `flickos-` or `flick-`**: those are FlickOS's own.

Tally's name is `tally`.

## 3. The rules

These are what CI checks on every build (`repo/community/check.py` in the
FlickOS repository). Each one exists for the same reason: **installing your
app must not be able to run your code as root, overwrite another package's
file or remove anything.** apt installs packages as root, so a package that
breaks one of these could do anything to the computer before you ever start
your app.

| Rule | What it means | Why |
|---|---|---|
| No maintainer scripts | no `preinst`, `postinst`, `prerm`, `postrm`, `config`, `triggers` | they run as root at install time |
| No fields that act on other packages | no `Pre-Depends`, `Conflicts`, `Breaks`, `Replaces`, `Provides`, `Enhances` | they remove or replace someone else's package |
| Dependencies from Debian or FlickOS | `Depends`, `Recommends`, `Suggests` name packages apt gets from Debian's or FlickOS's repository | nothing reaches the computer that nobody reviewed |
| Its own name | not Debian's or FlickOS's, no FlickOS prefix | step 2 |
| Architecture `all` or `amd64` | FlickOS runs on 64-bit PCs only | |
| Files only in its own paths | see the list below | no autostart, systemd unit, D-Bus service, polkit action, udev rule or sudoers file |
| Nothing setuid or setgid, no device files | | they run as root, or reach hardware |
| No link that leaves those paths | a link to `/etc` would let a file land anywhere | |
| A metainfo file without errors | `/usr/share/metainfo/ID.metainfo.xml`, `appstreamcli validate` | it is what makes the package an app in Software (step 5) |
| Its own names | desktop files, icons and the metainfo file are named after the package or its metainfo ID (`NAME`, `NAME-…`, `ID`, `ID-…`) | it can't pass for another app in the menu or the icon theme |
| Desktop files run your program | `Exec` and `TryExec` name one of your own programs; no `DBusActivatable` | a menu entry can't start something else |
| No claims on sensitive types | `MimeType` doesn't name `x-scheme-handler/http(s)`, `mailto`, `file`, `inode/directory`, `text/html`, scripts or programs, or a wildcard like `image/*` | your app isn't offered as the browser, mail program or file manager |
| lintian without errors | Debian's own package checker | |

And for your source, before anything is built:

| Rule | What it means | Why |
|---|---|---|
| Everything is in your repository | no git submodules | the reviewer reads what is built |
| Everything is readable | no binary files except pictures and fonts: no `.so`, `.pyc`, `.jar` or archives | compiled code is built from source in CI |
| No links out of the tree | no symbolic link to `/etc/…` or `../..` | |
| The build is offline | your `debian/rules` runs without network | it can't download code nobody reviewed |

**Your own paths** (NAME is your package's name):

```
/usr/bin/NAME  /usr/bin/NAME-*          the programs you run
/usr/share/NAME/  /usr/lib/NAME/  /usr/libexec/NAME/
/usr/share/applications/*.desktop       menu entries
/usr/share/metainfo/*.metainfo.xml      what Software shows
/usr/share/icons/hicolor/…              icons
/usr/share/man/man1/NAME.1.gz  NAME-*.1.gz
/usr/share/doc/NAME/
/etc/xdg/NAME/  /etc/xdg/flickos/NAME.conf   settings defaults
/usr/share/flickos/addons/NAME/          a FlickOS add-on (keys, a panel button)
```

A Python app keeps its modules in `/usr/share/NAME/`, not in
`/usr/lib/python3/dist-packages/`. A compiled program goes to `/usr/bin/NAME`
or `/usr/lib/NAME/`.

Your app still runs as its user without a sandbox, like most Flathub apps
that may read the home folder. The rules protect the install, and the review
protects the rest.

## 4. The desktop file

`tally.desktop`, installed to `/usr/share/applications/`, puts the app in the
menu. Software takes its icon and categories from here when the metainfo has
none:

```ini
[Desktop Entry]
Type=Application
Name=Tally
Comment=Count things
Exec=tally
Icon=accessories-calculator
Categories=Utility;
Keywords=count;counter;clicker;
```

- **Icon:** a name from the icon theme (`accessories-calculator` is in every
  theme FlickOS ships), or your own icon installed as
  `/usr/share/icons/hicolor/scalable/apps/ID.svg` with `Icon=ID`.
- **Name it after your app:** `NAME.desktop` or `ID.desktop`, and `Exec`
  runs your own program (`tally`, or `/usr/lib/NAME/…`), not `sh -c`.
- **Categories:** one of freedesktop's main ones decides Software's category:
  `AudioVideo`, `Development`, `Education`, `Game`, `Graphics`, `Network`,
  `Office`, `Science`, `System`, `Utility`.

## 5. The metainfo file

The metainfo file is what Software shows: the name, the one-line summary, the
description, screenshots, who made it, the license and the versions. Without
one your package installs with apt but is not an app in Software, and CI
refuses it.

`io.github.example.Tally.metainfo.xml`, installed to `/usr/share/metainfo/`:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<component type="desktop-application">
  <id>io.github.example.Tally</id>
  <metadata_license>CC0-1.0</metadata_license>
  <project_license>GPL-3.0-or-later</project_license>
  <name>Tally</name>
  <summary>Count things</summary>
  <developer id="io.github.example"><name>Example Developer</name></developer>
  <description>
    <p>Tally counts things: people at the door, laps, push-ups. Click the plus button or press Space to add one, and the count is still there the next time you open it.</p>
  </description>
  <launchable type="desktop-id">tally.desktop</launchable>
  <url type="homepage">https://github.com/example/tally</url>
  <screenshots>
    <screenshot type="default">
      <caption>Counting</caption>
      <image>https://raw.githubusercontent.com/example/tally/v1.0/screenshot.png</image>
    </screenshot>
  </screenshots>
  <content_rating type="oars-1.1"/>
  <releases>
    <release version="1.0" date="2026-10-09"/>
  </releases>
</component>
```

- **`id`** is reverse DNS of something you control: your domain, or
  `io.github.USER.App` for a GitHub account. It never changes.
- **`launchable`** names your desktop file: that is how Software's **Open**
  button and the menu find the app.
- **Screenshots** are full `https://` addresses, best from a tag (so an
  update can't change an old version's pictures). Take them on FlickOS, at
  about 1000 × 680, in the dark style.
- **`releases`**: add a line for each version, newest first.

Check it:

```sh
appstreamcli validate --no-net io.github.example.Tally.metainfo.xml
```

Lines starting with `E:` are errors and fail CI. `W:` and `I:` are advice.

## 6. debian/

Exactly as in [Building a .deb](/learn/deb/), with three differences:

**debian/control** names only dependencies from Debian or FlickOS, and none
of the forbidden fields:

```
Source: tally
Section: utils
Priority: optional
Maintainer: Example Developer <dev@example.org>
Build-Depends: debhelper-compat (= 13)
Standards-Version: 4.7.0
Rules-Requires-Root: no
Homepage: https://github.com/example/tally

Package: tally
Architecture: all
Depends: python3, python3-gi, gir1.2-gtk-3.0, ${misc:Depends}
Description: count things with one click
 Tally counts things: people at the door, laps, push-ups. Click the plus
 button or press Space to add one; the count is kept between runs.
```

**One source, one package.** The source must build exactly one `.deb`, named
like the app.

**No maintainer scripts.** Don't write `debian/postinst` and friends. Some
debhelper steps write them for you (a systemd unit, an init script): you
can't ship those files anyway, but look at what your build made:

```sh
dpkg-deb --ctrl-tarfile ../tally_1.0_all.deb | tar -t
```

Only `./control`, `./md5sums` and, with files in `/etc`, `./conffiles` may be
there.

`debian/install` puts each file in its own path:

```
tally                                   usr/bin/
tally.desktop                           usr/share/applications/
io.github.example.Tally.metainfo.xml    usr/share/metainfo/
```

## 7. Build and check it yourself

Build it, then run the same checks CI runs, on a FlickOS computer (its apt
knows Debian's and FlickOS's repositories, which the dependency rule asks):

```sh
sudo apt install appstream lintian       # what the checks use, besides dpkg and apt
dpkg-buildpackage -us -uc -b
git clone https://github.com/Flick-OS/flickos.git ~/FlickOS
~/FlickOS/repo/community/check.py ../tally_1.0_all.deb
```

```
tally	pass	tally_1.0_all.deb
```

A failure says which rule and which file:

```
tally	FAIL	tally_1.0_all.deb
  files: etc/xdg/autostart/tally.desktop is outside the package's own paths
```

Then install it and use it the way a user would:

```sh
sudo apt install ../tally_1.0_all.deb
tally
sudo apt remove tally
```

## 8. Tag and open the pull request

Commit everything, tag the version, push both:

```sh
git tag v1.0
git push origin main v1.0
git rev-parse 'v1.0^{commit}'        # the full commit, 40 characters
```

Fork [FlickOS](https://github.com/Flick-OS/flickos) and add one file,
`repo/community/apps/NAME`:

```
git = https://github.com/example/tally.git
tag = v1.0
commit = 76f57d5b15ff86fa83793b36f52dec1abae4ccb5
version = 1.0
```

- `commit` is what the tag points at. **The commit, not the tag, is what is
  built:** if the tag moves after the review, CI refuses it.
- `version` is the one in `debian/changelog`.

Open a pull request with that file alone. Say in its description what the
app does and who it is for, and whether AI tools wrote part of it. That
doesn't count against it here: it tells the reviewer what to look for.

## 9. The review

On the pull request, CI (*Community apps*) clones your repository, checks
that the tag points at the commit and that the source is readable, builds it
without network in a clean Debian 13 container, runs the checks and writes
the result on the run's summary page:

```
## tally
Checks passed.

A new app: review all of it.
 debian/changelog | 5 +++++
 …
 tally            | 90 ++++++++++++
```

A red run says why: a failed rule, a build error, a version that doesn't
match. Fix it, tag a new version, and change the file in the same pull
request.

The page also lists **things to look at**: what your menu entries say, and
lines that reach the network, run commands, decode data, write files that
start programs, use `sudo` or read other programs' files such as `~/.ssh` or
a browser profile. That isn't a failure. Many apps do some of it for good
reasons; say in the pull request what each one is for, and the review goes
faster.

Then the maintainer reads your source, all of it the first time, and tries
the package CI built. Questions come as comments on the pull request. When it
is merged, CI builds it once more on `main`, and the maintainer signs that
build into the repository. FlickOS computers find it in Software once they
have fetched the new package lists: within a day where automatic updates
are on, or when the user runs an update.

## 10. Updates

A new version is the same steps with a new tag:

1. Change the code, add a line to the metainfo's `releases`, and
   `dch -i -D trixie "What changed."` (never by hand).
2. Tag `v1.1`, push it.
3. A pull request that changes `tag`, `commit` and `version` in your app's
   file.

This time CI prints **what changed since the published commit**, and that
is what the maintainer reads. Small, focused versions are reviewed faster. A
version whose published commit isn't one of its ancestors (rewritten
history) is marked and reviewed whole.

Once published, FlickOS computers with automatic updates on install it by
themselves.

## 11. The Made for FlickOS shelf

Software's front page has a **Made for FlickOS** shelf. To be considered,
open an issue on the FlickOS repository once your app is published. The
maintainer checks that it:

- works on FlickOS's desktop (labwc),
- follows the dark and the light style,
- has screenshots,
- runs well on a computer with 2 GB of memory,
- sends nothing anywhere without asking the user first.

The shelf is a list on FlickOS's server, so it changes without a new version
of anything.

## 12. A style instead of an app

A **style** recolors the FlickOS desktop: the panel, the terminal, the
launcher and the notifications, the GTK and icon themes it names, the title
bars and a wallpaper ([Make FlickOS yours](/learn/yours/) shows how to make
one). Published as a community package, it shows in *Software → Styles*,
where people can **Try** it until they log out, or **Use** it. Everything
above holds, with these differences. The example is **Dusk**: Dark with an
orange accent and its own title bars.

**Its name is the style's.** The package's name is also the style's id
(the folder name), so it must be lowercase letters, digits and `-` only, and
it can't be `dark`, `light` or `seven`, which are FlickOS's own.

**Only a style's files**, in two folders named after the package:

```
/usr/share/flickos/styles/dusk/       style.ini, waybar-colors.css, foot.ini,
                                      fuzzel.ini, mako.conf, wallpaper.png or .jpg
/usr/share/themes/dusk/labwc/         themerc and the title bar buttons
                                      (.svg, .png, .xbm): optional
```

Leave out any file your style doesn't change: with `Inherits=dark` it
takes the rest from Dark, and keeps getting FlickOS's updates to it.
`flickos-layout export` is a good start: the archive it writes holds your
style's folder, folded into one. A GTK or icon theme can't be in the
package. Name one Debian has, and put its package in `Depends`
(`greybird-gtk-theme`, `papirus-icon-theme`…).

Name the window theme in `style.ini` by the package's name:

```ini
[Style]
Name=Dusk
Comment=Dark with an orange accent
Inherits=dark
Waybar=waybar-colors.css
Fuzzel=fuzzel.ini
LabwcTheme=dusk
```

**The metainfo file is an add-on**, not an app. It extends the layout
chooser and names the style's folder, which is how Software knows it's a
style:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<component type="addon">
  <id>io.github.example.styles.Dusk</id>
  <extends>flickos-layout.desktop</extends>
  <name>Dusk</name>
  <summary>Dark with an orange accent</summary>
  <description><p>FlickOS's Dark style with an orange accent and orange title bars.</p></description>
  <icon type="stock">preferences-desktop-theme</icon>
  <url type="homepage">https://github.com/example/dusk</url>
  <developer id="io.github.example"><name>Example Developer</name></developer>
  <metadata_license>CC0-1.0</metadata_license>
  <project_license>GPL-3.0-or-later</project_license>
  <screenshots>
    <screenshot type="default">
      <image>https://raw.githubusercontent.com/example/dusk/v1.0/screenshot.png</image>
    </screenshot>
  </screenshots>
  <custom><value key="FlickOS::style">dusk</value></custom>
</component>
```

There is no desktop file and no `launchable`. Add a screenshot of the
whole desktop with your style in use: it is what people choose by, and the
reviewer looks at it.

**debian/** is as in step 6. `Depends` names `flickos-layouts (>= 1.53)`
and the Debian packages of any themes you name:

```
Package: dusk
Architecture: all
Depends: flickos-layouts (>= 1.53), ${misc:Depends}
Description: orange style for FlickOS
 FlickOS's Dark style with an orange accent and orange title bars.
```

```
styles/dusk/*                          usr/share/flickos/styles/dusk/
theme/*                                usr/share/themes/dusk/labwc/
io.github.example.styles.Dusk.metainfo.xml   usr/share/metainfo/
```

**`check` must print nothing.** check.py runs FlickOS's own `flickos-layout
check` on your style. A warning that you can ignore on your own desktop
fails here: people install your style without seeing it first. Most often
that's contrast (text too faint on its background, step 4 of
[Make FlickOS yours](/learn/yours/#4-check)) or a theme that isn't
installed. Check it before you open the pull request:

```sh
~/FlickOS/repo/community/check.py ../dusk_1.0_all.deb
```

```
dusk	pass	dusk_1.0_all.deb
```

A style that fails says why, with the file:

```
dusk	FAIL	dusk_1.0_all.deb
  style: usr/share/flickos/styles/dusk/waybar-colors.css: warning: selected_fg_color on selected_bg_color is 2.8:1, below 3:1: hard to read (HIG A11Y-6)
```

Run it on a FlickOS computer that has your themes installed: CI installs
them from your `Depends` first.

## 13. Flathub instead, or as well?

Software shows Flathub's apps too, so an app on Flathub reaches FlickOS's
users either way. Flathub is worth it when your app has a history and wants
every Linux distribution. Two of its rules (checked October 2026) matter for
a new app:

- **New apps are generally refused** without "a meaningful history of
  development", real-world use and tagged versions.
- **AI:** generated code in the app must be disclosed, the manifest must not
  be AI-written, AI tools must not open or write the submission, and
  reviewers may refuse an app for how much was generated.

The community repository has neither rule, and its packages need no runtime.
Many apps can start here and go to Flathub later.

## 14. Traps

- **A moved tag.** Never move or delete a tag that is in a pull request or
  published. Make a new one.
- **Downloading during the build.** `pip install`, `npm install` or `curl`
  in `debian/rules` fails: the build has no network. Use Debian's packages as
  `Build-Depends`, or put the code in your repository.
- **Prebuilt files in the repository.** A `.so`, `.pyc`, `.jar` or a zip
  stops the build: everything that runs is built from source. Pictures and
  fonts are fine. Minified code isn't refused, but the reviewer can't read
  it and will ask for the source it came from.
- **A dependency from elsewhere.** A package only your PPA or a vendor's
  repository has fails the dependency rule. Bundle it in `/usr/lib/NAME/`, if
  its license allows, or ask for it in Debian.
- **Python modules in dist-packages.** Put them in `/usr/share/NAME/` and add
  that folder to `sys.path` in your program.
- **Autostart.** `/etc/xdg/autostart/` is not your path. Offer a setting in
  your app that writes `~/.config/autostart/NAME.desktop` for that user
  instead, with the user's consent.
- **The screenshot from `main`.** An address on a branch changes under
  published versions. Use the tag's.
- **A metainfo `id` that changes.** It is how Software knows your app. Pick
  it once.
- **Building on a computer with other repositories.** The dependency rule
  asks your apt. Check on a FlickOS computer or a clean trixie, as CI does.

## 15. Cheat sheet

```sh
appstreamcli validate --no-net ID.metainfo.xml          # E: lines must be gone
dpkg-buildpackage -us -uc -b                            # one .deb, named like the app
dpkg-deb --ctrl-tarfile ../NAME_VER_all.deb | tar -t    # control, md5sums (conffiles)
~/FlickOS/repo/community/check.py ../NAME_VER_all.deb   # what CI checks
git tag vVER && git push origin main vVER
git rev-parse 'vVER^{commit}'                           # for the app's file
```

`repo/community/apps/NAME`:

```
git = https://…/NAME.git
tag = vVER
commit = FULL-40-CHARACTER-COMMIT
version = VER
```
