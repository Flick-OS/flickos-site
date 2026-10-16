# Design: Sponsor readiness

Status: Draft · 2026-10-15

## Context

Before we contact sponsors, the site should answer six questions at a glance:

1. What problem does FlickOS solve?
2. Who is it for?
3. What makes it different?
4. How active is development?
5. How can a sponsor help?
6. What does a sponsor get, or help accomplish?

The site already answers 1 and 3:

- **Problem:** "Familiar, light, and hard to break" (the homepage hero).
- **Difference:** History, an undo list for every settings change (since 2.1), plus restore points that roll back an update that breaks boot (since 2.2). The homepage says "As far as we know, no other Linux desktop has an undo list for its own settings." That claim is concrete and checkable, and it's our strongest card. Restore points are not unique: openSUSE has rolled back from the boot menu with snapper for years, Mint has Timeshift, and Silverblue and NixOS roll back by design. Present them as a bar we also clear, never as something only we do.
- **Metrics:** downloads come live from SourceForge (`src/data/downloads.ts`), and the donor list (`src/data/donors.ts`) is empty rather than filled with examples. Keep it that way: we don't invent metrics.

This doc covers 2, 4, 5 and 6, the "old computers" angle, and what an organisation will check before sponsoring (privacy and licensing).

## Goals

- A visitor can tell who FlickOS is for, how active it is, and how to sponsor it without leaving the homepage, download page or donate page.
- Every claim on the site can be checked: dated releases, hardware we actually tested, costs we actually pay.

## Non-goals

- The one-page sponsorship proposal. It reuses the copy from this doc, so we write it after these changes ship.
- Support contracts or "priority bug fixes" for sponsors. These turn into unpaid on-call work.
- A branded FlickOS variant as a sponsor perk. A variant comes with a client apt suite, testing before every update reaches it, and a handover; whoever runs the suite "has root on those machines every day, forever" (`BUILD_A_VARIANT.md`). That is paid work, offered separately (see "Custom builds").
- Leading with "runs on old computers" (see gap 2).

## Proposal

### Gap 1: Who it's for

**Change:** add one line under the hero lede in `src/pages/index.astro`, above the download buttons.

**Draft:**

> For people who want their computer to just work, and for the person they call when it doesn't.

This covers both groups the features serve. Undo and rollback help the user, and they also cut down calls to whoever does their tech support.

**Proposed:** keep this two-group line on the homepage. Lead the sponsor section and the proposal with the second group: people who look after other people's computers (family tech support, small offices, library volunteers). History and restore points serve that group today.

**Not chosen as the lead:**

- *People leaving Windows 10.* Redmond is the default layout, and the timing is now: Windows 10's consumer Extended Security Updates ended on 13 Oct 2026. Use it for a news post or a line on the download page, not as FlickOS's identity, because the hook expires.
- *Schools and libraries as institutions.* The strongest sponsor angle, because organisations fund organisations, but schools expect things FlickOS doesn't have yet: managing many computers at once, and translations (FlickOS's own apps are English only; none uses gettext). Don't claim this audience. Offer translations under "Sponsor a feature" (gap 5) instead, which is how this audience can open the door themselves.

### Gap 2: Old hardware

**Decision:** don't make old hardware the pitch. Many distros claim it, while an undo list for settings is ours alone. People will still ask, so state the requirements plainly.

**Change:** add a requirements block to `src/pages/download.astro`:

> **Runs on:** 64-bit PCs (BIOS or UEFI) · 1 GB RAM minimum, 2 GB or more for web browsing · 10 GB disk minimum, 20 GB recommended · uses about 500 MB of memory after login · developed and tested on a 2014 ASUS R556L laptop

"Developed on a 2014 laptop" also backs "light" better than any adjective, so the line can be reused in the sponsor proposal.

Rules:

- Only list machines that have actually booted FlickOS.
- The minimums must match what the installer checks. The installer's `welcome.conf` (in flickos-installer) requires 10 GB of disk (`requiredStorage`) and 1 GB of RAM (`requiredRam`). If a figure on the page changes, the installer changes first. A visitor must never read one number while Calamares enforces another.
- **Disk:** 10 GB minimum is the installer's figure. 20 GB is recommended because the installed system takes about 3.6 GB (the 2.2 build's `chroot/`), and restore points stop being made when free space falls below 2 GB or 10% of the disk, whichever is more (flickos-recovery's `MIN_FREE`, `MIN_FREE_SHARE`). On a 10 GB disk they would soon stop, a few updates in.
- **RAM:** every figure comes from a measurement:
  - *About 500 MB after login:* idle on the ASUS R556L, the maintainer's development machine (2026-10-15).
  - *1 GB minimum:* the installer's check. With the desktop at about 500 MB idle, it fits; a browser in 1 GB is untested, so the page doesn't promise one.
  - *2 GB or more for web browsing:* the Firefox memory work (`docs/design/flickos-firefox.md` in the FlickOS repo) ran Firefox in a 2 GB VM and opened tabs one by one: about 18 tabs before memory ran out, 21 with Settings' Firefox memory option on.
  - No "recommended 4 GB": nothing measured it. Add it only after a test.
- The 2.2 release post mentions "an older laptop" (initramfs unpacks in 0.6 s instead of 2.7 s). If that was the R556L, name it there too.

### Gap 3: How active development is

**Change:** add a release history, either as a `/releases/` page linked from News or as a timeline at the top of the news index.

| Date        | Release                                                              |
|-------------|----------------------------------------------------------------------|
| 9 Mar 2023  | **1.0**, based on Ubuntu 20.04 / LXLE                                |
| 1 May 2023  | **1.1**                                                              |
| 21 Sep 2026 | **2.0**: rebuilt on Debian 13, Wayland (labwc), three layouts        |
| 1 Oct 2026  | **2.1**: login screen, start menu, welcome window, Settings, History |
| 7 Oct 2026  | Notes, Write and Phone Screen apps                                   |
| 13 Oct 2026 | **2.2**: restore points, the Software app                            |

Dates are when the ISO went up on SourceForge (checked 2026-10-15), since that's when people could get it. Git tags don't match: `v2.0` is dated 19 Sep, and `v2.1` points at a commit from 8 Oct, a week after the 2.1 ISO went up. The 7 Oct row is the news post. Contents come from the news posts, and for 2.1 from its release notes (`RELEASE_NOTES.md` at commit `13c9cf0`; there is no news post yet).

Add a link to GitHub, not a commit count, which goes stale. The FlickOS repo is public at `github.com/Flick-OS/flickos`. For the same reason, 2.1's release notes are linked through the README in its SourceForge folder, and the privacy block can't link `PRIVACY.md`. For reference, the FlickOS repo had 194 commits between mid-July and mid-October 2026.

The download counter already shows real interest: in the week to 2026-10-15, SourceForge counted 427 downloads of 2.1. Show the live figure (`src/data/downloads.ts`), never a copied number.

### Gap 4: How a sponsor can help

**Change:** rewrite the intro of `src/pages/donate/[...path].astro`.

The current line, "we believe it can be funded entirely by its community," tells companies they aren't wanted. Replace it with:

> FlickOS is free and GPL-licensed. It's built by one developer and funded by the people who use it and the organisations that sponsor it.

"One developer" is the honest answer: every commit in the FlickOS repo is from one author. It also works for us, because a sponsor's money goes straight into development hours.

Then replace "hosting, test hardware, and the hours" with concrete costs:

> **What funding pays for**
>
> - **[TBD] $/month**: **[TBD]** hours of development a month
> - **[TBD] $**: test hardware: an NVIDIA desktop, Bluetooth devices, an older laptop
> - **[TBD] $/year**: the flickos domain (see gap 5's contact)

No hosting line. SourceForge and GitHub Pages are free, and the Cloudflare Workers (countme, store) probably fit the free tier (**[TBD: check the Cloudflare account's billing]**). A sponsor who notices a cost we don't pay will trust everything else less. List the domain only once we pay for it.

### Gap 5: What a sponsor gets

**Change:** add a Sponsors section to the donate page. Move it to its own `/sponsor/` page if it grows. Wire it through `src/config/donate.ts` like the other donate content.

Two tiers, so we don't take on obligations we can't keep:

> **Sponsor** · from **[TBD] $/month**
> Your logo and link on the FlickOS site, and your name in every release post.
>
> **Sponsor a feature** · one-time
> Pay for one item from the roadmap. It ships with your name in its release post.
> We decide the scope, and there's no delivery date. It ships when it's ready.
>
> *Current roadmap:*
>
> - **Translations:** FlickOS's own apps in your language.
> - **Bluetooth in Quick Settings:** turn it on, connect a device.
> - **Drives in Quick Settings:** see and eject a USB drive you plugged in.
> - **A window list per desktop:** Traditional's window list shows only the current desktop's windows. This needs a change in labwc itself, so the work goes upstream.
>
> Need FlickOS with your own apps, defaults and branding for your organisation? Write to us.
>
> Contact: **sponsor@[TBD: domain]**

Leave the sponsor logo list empty until a real sponsor signs on, same as the donor list.

Why these roadmap items: each is already planned or blocked, so none is made up for sponsors. Translations open the door to schools and to non-English countries (gap 1). Bluetooth is blocked on testing with real hardware (flickos-menu's Quick Settings). Drives is in `TODO.md`. The window list needs labwc to publish a window's desktop (`TODO.md`), and sponsored upstream work looks good on a sponsor's page. Left out: store phase 3 (paid apps), which earns money for the project and isn't something a sponsor pays for.

Contact: not a personal address. The site is still on `vercel.app`, and sponsors trust a project with its own domain more. Buy the domain before contacting sponsors, and forward `sponsor@` to the maintainer's inbox (Cloudflare Email Routing is free).

Two cautions:

- A sponsor who paid for a roadmap item will ask when it ships. The tier has to say up front who decides the scope and whether there's a date. Otherwise the promise we avoided in the non-goals comes back through this tier.
- Naming the sponsor in an app's About page changes package content. Check that against the HIG before offering it. Until then, offer only the release post.

### Custom builds: a paid service, not a tier

An organisation can pay for a FlickOS variant: its own apps, its own defaults, and its name and wallpaper on the desktop. It's the one thing FlickOS can give an organisation that's worth more than a logo, and it suits the organisations that would sponsor at all. `BUILD_A_VARIANT.md` and `docs/10-custom-builds.md` in the FlickOS repo are the playbook; their worked example is a school district.

**On the site:** only the one line under the sponsor tiers (gap 5), going to the same contact. No price list, no page of its own, until the first one has been built and has survived an upgrade.

**Price:** a one-time build fee, plus a monthly fee for the client apt suite. The suite is what the client actually pays for: "updates they control" (`docs/10`), for example Debian's security updates at once, FlickOS's changes after testing on a spare laptop, nothing during term. The monthly fee is regular income, which sponsorship rarely is.

**Scope, at first:** docs/10's layers 1 and 2: a meta-package with the client's apps, their defaults, and their wallpaper and name on the desktop (the Northfield example). Not a full rebrand (layer 3: their name in the boot menu, installer, `os-release`). Today a rebrand means forking the build repo, because `auto/config` and `build-iso.sh` hardcode the product name. Replacing flickos-branding needs `Provides`/`Conflicts`/`Replaces`, which docs/10 says has never been tried. Offer a rebrand only after docs/10's "Making variants cheaper" items 2 and 3 are done.

**Before the first paid variant, not the second:** the site config directory (docs/10's "Making variants cheaper" item 1, `BUILD_A_VARIANT.md` section 5). Without it a variant can't change a single desktop default: the layout, the style, the idle times or the touchpad, the first things a client asks for. Checked on 2026-10-15: `flickos-session` adds only `/etc/xdg/flickos-live` to `XDG_CONFIG_DIRS`, and `flickos-layout` still reads the hardcoded `/etc/xdg/flickos/layouts.conf` (`SYSTEM_CONF`). `BUILD_A_VARIANT.md` says "before the second client"; that assumes the first can live with hand-edited conffiles, which sixty machines can't.

**In every agreement:**

- Changes that make FlickOS itself better, like the site config directory, go into FlickOS for everyone. The client pays for their own variant and its updates, not for exclusive features.
- What happens if we stop: it's Debian underneath, everything is GPL-3.0-or-later, and the ISO rebuilds from the variant's repository (docs/10's handover checklist). Put it in writing before the client asks.
- Who holds the client suite's signing key.

### Gap 6: What it sends, and what's free

The schools and libraries audience will ask two things before anything else:

- **What does it send?** flickos-countme sends an anonymous weekly count and is on unless turned off (opt-out). `PRIVACY.md` in the FlickOS repo says what is sent and kept, but the site has no page for it.
- **Is it all free software?** No, and the site must not say it is. FlickOS's own work is GPL, but the ISO also carries non-free parts from Debian: the firmware packages (`--archive-areas` includes `non-free-firmware`, as Debian's own images do) and, from `non-free` and `contrib`, `firmware-b43-installer`, `firmware-b43legacy-installer`, `b43-fwcutter`, `libsbig4t64` and `libfishcamp1t64` (checked against the 2.2 build's `flickos-amd64.packages`). Notes, Write and Phone Screen are proprietary (free of charge until the store opens) and come from the same apt repo. They are never in the ISO.

**Change:** add a short "Privacy and licensing" block to the download page: what is sent, how to turn it off (Settings → Privacy), links to `PRIVACY.md` and the public counts, and that FlickOS's own work is GPL, the ISO has some non-free parts from Debian (mainly firmware), and Notes, Write and Phone Screen are not free software. Saying this ourselves costs less than a sponsor finding it out.

Worth a look separately: `libsbig4t64` and `libfishcamp1t64` are drivers for astronomy cameras, which FlickOS has no use for. Some other package pulls them in. Finding out which could drop two non-free packages from the ISO.

## Open questions

Proposed answers are in the gaps. Still open:

1. ~~Audience.~~ Proposed: the two-group line on the homepage, people who look after others' computers as the sponsor lead (gap 1). Needs the maintainer's yes.
2. ~~Requirements.~~ Answered: about 500 MB idle on a 2014 ASUS R556L; 1 GB minimum, 2 GB for browsing; 10 GB disk minimum, 20 GB recommended (gap 2).
3. ~~The 2.1 release date.~~ Answered: 1 Oct 2026 (SourceForge).
4. ~~One developer or a team?~~ Answered: one developer. Still open: the funding figures (hours and rate, test hardware).
5. ~~Roadmap items.~~ Proposed: translations, Bluetooth, drives, per-desktop window list (gap 5). Needs the maintainer's yes. YES.
6. The domain to buy, which gives the contact address `sponsor@`.

## Plan

| Step | Change                                  | Blocked on                    |
|------|-----------------------------------------|-------------------------------|
| 1    | Homepage audience line (gap 1)          | Q1 (yes)                      |
| 2    | Release history page (gap 3)            | Drafted: `/releases/`         |
| 3    | Donate page intro and costs (gap 4)     | Q4 (figures)                  |
| 4    | Download page requirements (gap 2)      | Drafted                       |
| 5    | Sponsors section (gap 5)                | Q4 (figures), Q5 (yes), Q6    |
| 6    | Privacy and licensing block (gap 6)     | Drafted                       |
| 7    | One-page sponsorship proposal           | Steps 1–6                     |

Custom builds are not in this plan: the only site change is the line in step 5. The site config directory is FlickOS work (flickos-session, flickos-layout, flick-tiler, flickos-control), to be done before a first variant is sold.
