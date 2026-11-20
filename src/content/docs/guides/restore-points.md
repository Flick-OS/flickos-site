---
title: Restore Points
description: "Put FlickOS back to how it was before an update or an install, from Settings or from the boot menu, even when it won't start."
draft: true
sidebar:
  order: 1
---

:::caution[Draft]
Written from flickos-recovery 1.7 and flickos-control 1.84. Before
publishing: check the boot menu's words and the notification on a real
computer, and add screenshots of the *Restore Points* page and the boot
menu's *Restore points* submenu.
:::

Before every software change, FlickOS saves the system as a restore point.
If an update or a new app breaks something, you can put the system back to
how it was before it: the software, system settings, passwords, accounts and
Wi-Fi networks. Your own files stay as they are.

If the computer fails to start twice in a row, FlickOS goes back to the
last restore point that worked, by itself.

## Do I have restore points?

Restore points need the disk layout the installer has set up since FlickOS
2.2, when you keep its default, btrfs. Open *Settings*: if it has a
**Restore Points** page, you have them.

If you installed FlickOS 2.0 or 2.1, or chose ext4 when installing, there is
no *Restore Points* page and nothing of it runs. Upgrading doesn't add them:
they need a new install.

## A restore point is not a backup

Restore points are on the same disk as the system. They don't save your own
files, and a broken or stolen disk takes them with it. Keep copies of your
files somewhere else too.

## When restore points are made

- **Before every software change:** updates, automatic updates, and
  installing or removing apps, whichever program does it (Software,
  Tool Kits, a terminal). One change makes one restore point.
- **When you ask:** *Settings > Restore Points*, **Make a Restore Point
  Now**, before you try something risky.

Each one is named for what it was taken before, such as "Before installing
updates, 20 November 14:05".

The newest 5 are kept, and older ones are deleted as new ones are made.
None is made while the disk is nearly full (less than 2 GB, or 10 % of the
disk, free): the *Restore Points* page says so.

## Putting the system back

When FlickOS starts but something is wrong:

1. Open *Settings > Restore Points*.
2. Find the restore point from before the change that broke something, and
   choose **Put Back…**.
3. FlickOS shows which software changes are undone. Choose **Put Back** and
   type an administrator's password.
4. Restart the computer.

The system as it was is kept as a restore point too, so putting back can be
undone the same way. Until you restart, software can't be installed or
removed.

*Settings > History* lists restore points too, each with **Put Back**.

## When FlickOS won't start

### By itself

If two starts in a row don't reach the login screen, the next start uses the
newest restore point that worked. Nothing on the disk changes yet. Once you
log in, a notification says FlickOS started from a restore point and why.
Click it, or open *Settings > Restore Points*, and choose:

- **Keep…** to make the restore point the system for good. The broken system
  is kept as a restore point, so this can be undone too.
- **Try Again** to start the system as it is again. Choose this when the
  failed starts had another cause, a power cut for example.

Until you choose, every start uses the restore point. Nothing you change
meanwhile is kept, apps you install included, so choose before you go on
working.

If starts from the restore point fail too, FlickOS stops trying by itself:
the boot menu waits with the restore point chosen, for you to pick.

### From the boot menu

The boot menu shows for 5 seconds at every start.

1. Choose **Restore points** in the boot menu.
2. Pick one. They are listed newest first, by what they were taken before.
3. FlickOS starts from it. Nothing on the disk changes, and nothing you
   change is kept.
4. If it works, open *Settings > Restore Points* and choose **Keep…**, then
   restart. If not, restart and pick another.

## Settings

*Settings > Restore Points* also has:

| Setting | What it does |
|---|---|
| **Take a restore point before software changes** | On by default. Off: no restore points are made, and nothing of it runs |
| **Start a restore point by itself after failed starts** | On by default. Off: after 2 failed starts the boot menu waits with the restore point chosen instead |
| **Disk space** | How much of the disk is free, and the least a restore point needs. **Delete All…** next to it deletes every restore point, to free the space they hold |

Changing them needs an administrator's password. *Settings > History*
records each change.

## From a terminal

| Command | What it does |
|---|---|
| `flickos-recovery list` | The restore points |
| `flickos-recovery plan NAME` | What putting NAME back would undo |
| `sudo flickos-recovery create "REASON"` | Makes a restore point now |
| `sudo flickos-recovery restore NAME` | Puts NAME back, at the next restart |
| `sudo flickos-recovery start keep` | Keeps the restore point the computer started from |
| `sudo flickos-recovery start try-again` | Starts the system as it is again |

## What goes back, and what doesn't

| Goes back | Stays as it is |
|---|---|
| Apps and updates | Your files, in your home folder |
| System settings | Your own settings (desktop layout, style, and the rest in your account) |
| Passwords and accounts | The system's logs |
| Wi-Fi networks | |

## When something doesn't work

**There is no Restore Points page.** The computer doesn't have FlickOS's
btrfs layout: see [Do I have restore points?](#do-i-have-restore-points).

**No restore point was made before an update.** The disk was nearly full,
or restore points are turned off. The *Restore Points* page says which.

**Software can't be installed.** A restore point was put back and the
computer hasn't restarted yet. Restart, then install.

**What I changed is gone after a restart.** The computer was running from a
restore point, where nothing is kept. Choose **Keep…** or **Try Again** in
*Settings > Restore Points* first.
