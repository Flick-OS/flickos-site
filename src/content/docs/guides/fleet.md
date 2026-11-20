---
title: FlickOS Manage
description: "Set up and keep track of many FlickOS computers from one web page: schools, offices, cafés and refurbishers."
draft: true
sidebar:
  order: 4
---

:::caution[Draft]
Written from flickos-fleet 1.1 and the dashboard as built in fleet phase 3.
Before publishing: the service is in its free pilot, not for sale. Signing
up, prices and the terms are phase 4, and the address `fleet.flickos.org`
isn't live yet (the pilot uses the workers.dev address with `join
--server`). Check the dashboard's page names, and add screenshots.
:::

FlickOS Manage is FlickOS's service for organizations that look after many
computers: schools, offices, charities, internet cafés and the people who
refurbish and sell old computers. From one web page you choose how your
computers are set up, keep them that way, and see how each one is doing.

FlickOS itself stays free, and so does everything the service does to a
computer: it uses FlickOS's own settings, the same ones a person at the
computer could change. What you get is doing it for 200 computers from one
page.

## How it works

- **The dashboard** is a web page where your organization's admins sign in,
  choose the settings and see the computers.
- **The agent**, `flickos-fleet`, is a small free program on each computer.
  About every 30 minutes it asks the service whether anything changed,
  applies the new settings and reports how the computer is doing.

The agent never listens on the network, and it can't run commands it is
sent. It can change only the settings in its own list (see
[What you can set](#what-you-can-set)). A stolen password or a broken
server could change those settings and install apps from the sources the
computer already has, and nothing more.

## Getting started

### 1. Sign in to the dashboard

Go to `https://fleet.flickos.org` and type your email address. If it is one
of your organization's admins, you get an email with a sign-in link, valid
for 15 minutes and for one use. There's no password to remember.

### 2. Make a join code

On the dashboard, under **Join codes**, make a code and choose how many
computers may use it. A code works for 7 days. It is shown only once, so
copy it then. You can revoke it before it runs out.

### 3. Join each computer

Install the agent on the computer, with an administrator's password:

```sh
sudo apt install flickos-fleet
```

Then join, in either of two ways:

- **In Settings:** *Settings > About*, **Join an Organization…**, type the
  code. Settings shows your organization's name and asks before joining.
- **In a terminal:**

  ```sh
  sudo flickos-fleet join CODE
  ```

  It shows "This computer will be managed by *your organization*. Its
  settings, apps and updates will be set from *your organization*'s
  dashboard." and asks before going on.

The computer appears on the dashboard within a minute, with its details,
and your organization's settings are applied.

## What you can set

The **Policy** page is one form for all your computers. Each save makes a
new version, and the history lets you go back to an earlier one (**Use this
version again**). Computers get a new version at their next check-in,
within about 35 minutes.

| Area | What you choose |
|---|---|
| The desktop | Desktop layout, style, clock, clicks, start menu style, Quick Settings, pinned apps, tiling and its gap |
| Settings | Idle and lock times, mouse and touchpad, keyboard, zoom, night light, History |
| Welcome | Whether the Welcome window shows, and its links |
| Updates | Automatic updates, what they install, and restarting after them |
| Firewall | On or off, phones, and ports for the local network |
| Power | Power settings |
| Time | Time zone and network time |
| Apps | Apps to install and to remove, from the sources the computer already has |
| Other | Firefox's memory saving, the weekly anonymous count, containers |

**Desktop settings are defaults.** The desktop and Settings rows above set
what every account starts with, but each person can still make their own
choice on their account, and their choice wins. Updates, firewall, power,
time and apps are set for the whole computer.

**Apps have limits.** The agent never removes FlickOS's own desktop or the
agent itself. It doesn't install an app if that would remove anything,
and doesn't remove one if that would take other apps with it; the
dashboard shows why.

Users' accounts and passwords, screens and anything in a person's home
folder can't be set.

## Seeing your computers

The **Computers** page lists every computer, when it last checked in, and
any setting that couldn't be applied, with the reason. Open a computer to
see its maker and model, processor, memory, disk, battery wear, updates
waiting, and the FlickOS packages installed.

A computer that's offline keeps the settings it last had. Nothing is undone
because it couldn't reach the service.

## Admins

Under **Admins**, an admin can add and remove other admins by their email
address. The last admin can't be removed.

## What the people at the computer see

A managed computer says so:

- *Settings > About* shows **Organization** with your organization's name,
  **What Is Sent** (the full list of what the computer sends), and
  **Leave…**.
- Anyone can run `flickos-fleet status` in a terminal to see who manages the
  computer, its last check-in, the policy version and anything that failed.

Nothing else in the desktop changes.

## What is sent

About every 30 minutes, the computer sends the versions of FlickOS and of
the agent, how long it has been on, its free disk space, the policy version
it applied and anything that failed. Once a day it also sends its name,
maker and model, processor, memory, disk size, battery wear, its updates and
the FlickOS packages installed.

**Never sent:** user names, files, what is typed, websites, apps used, Wi-Fi
names, location, screenshots or the serial number.

Your organization decides what happens to this data; FlickOS runs the
service for you. When your subscription ends, your data is deleted after 90
days. Everything, field by field: *What Is Sent* in *Settings > About*, or
`/usr/share/doc/flickos-fleet/PRIVACY.md`.

## Taking a computer out

Either way, the seat is free again:

- **On the dashboard:** open the computer and choose **Remove**. It leaves
  at its next check-in.
- **On the computer:** *Settings > About*, **Leave…**, or
  `sudo flickos-fleet leave`. This always works, even without the service.

When a computer leaves, the desktop defaults you set go back to FlickOS's
own, and it stops checking in. System settings (updates, firewall, power,
time) and the apps installed stay as they are.

Whoever knows a computer's administrator password can take it out. If you
don't want people to leave, keep that password to yourselves.

## Trying a policy on one computer

To see what a policy would change before sending it to every computer, save
it as a file and run:

```sh
flickos-fleet check policy.json --dry-run
```

It prints what would change and changes nothing. Without `--dry-run`, and
with `sudo`, it applies the file on that computer only, without the service.

## When something doesn't work

**A setting shows as failed.** The dashboard and `flickos-fleet status` give
the reason, in the words of the program that owns the setting: usually a
value that computer doesn't have (a layout that isn't installed, for
example) or an app that isn't in its sources.

**A computer stopped checking in.** Check that it is on and connected, then
run `flickos-fleet status` on it to see its last check-in. To check in at
once instead of waiting: `sudo flickos-fleet run --now`.

**A join code doesn't work.** It may have run out (7 days), used up its
computers, or been revoked: make a new one. Joining also needs a free seat
in your subscription.
