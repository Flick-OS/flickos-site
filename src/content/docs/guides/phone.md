---
title: Phone
description: "Send pages, photos, files and text between your Android phone and FlickOS, ring a lost phone, and see its notifications and calls, with the KDE Connect app."
sidebar:
  order: 2
---

Share a page, a photo or some text on your phone, choose your computer, and
it arrives on FlickOS. Files, pages and text go the other way too. You can
also ring your phone when you can't find it, browse its files, and, if you
want, see its notifications and calls on the computer.

The phone needs the **KDE Connect** app, from F-Droid or Google Play. It
works between a phone and a computer on the same network: nothing goes
through the internet.

FlickOS is made for Android phones. KDE Connect's iPhone app does less, and
FlickOS hasn't been tested with it.

## Turning it on and pairing a phone

The phone connection is off until you turn it on, and nothing of it runs
while it is off.

1. Open *Settings > Phone* and turn on **Use your phone with this
   computer**.
2. If your firewall is on, turn on **Let phones through the firewall**. It
   lets phones in from home and office networks only, and needs an
   administrator's password.
3. Choose **Add Phone…**.
4. On the phone: install the KDE Connect app, connect to the same network as
   the computer, open the app, choose your computer and tap **Pair**.
5. Both screens show a key. If they are the same, choose **Pair** on the
   computer.

Pairing works only while the *Add Phone* window is open, so nobody can pair
with your computer behind your back. The network you paired on is added to
the networks where phones can connect.

**Name on the phone** sets what the app calls your computer.

## From the phone to the computer

On the phone, tap **Share** in any app, choose **KDE Connect**, then your
computer.

- **A page** arrives as a notification. Click it to open the page.
- **A file or a photo** goes into your *Downloads* folder, with a
  notification. Click it to open the file.
- **Text** arrives as a notification, with a way to copy it.

The last things the phone sent stay in the phone popup and the *Phone*
window for a week.

## From the computer to the phone

While the phone connection is on, a **phone button** shows in the panel. It
is dimmed while no phone is connected, and its tooltip shows the phone's
battery. Click it for the phone popup:

| Action | What it does |
|---|---|
| **Send Files…** | Choose files to send to the phone |
| **Send Text…** | Type some text to send |
| **Send Clipboard** | Sends what you copied: a web address opens as a page on the phone, anything else goes onto its clipboard |
| **Send Screenshot** | Takes a screenshot and sends it |
| **Ring Phone** | Rings the phone, to find it |
| **Browse Files** | Opens the folders the phone shares in the file manager |

The popup also shows what the phone is playing, with controls, the newest
things it sent, **Open Phone** (the *Phone* window, which has all of this
too) and **Phone Settings**.

Elsewhere:

- In the file manager, right-click files and choose **Send to Phone**.
- After a screenshot, the screenshot tool offers **Send to Phone**.

## Optional: notifications, calls, media and commands

Each of these is off until you turn it on in *Settings > Phone*.

| Setting | What it does |
|---|---|
| **Show the phone's notifications** | The phone's notifications show on the computer, only from the apps you allow. An app appears in the list after the phone has sent a notification from it. Nothing is shown while the screen is locked |
| **Show the phone's calls** | When the phone rings, a notification names the caller. Click it to mute the ringer. What is playing on the computer pauses until the call ends. Nothing is shown while the screen is locked |
| **Control what's playing from the phone** | What's playing on the computer shows in the phone's app, with its name and picture. The phone can play, pause, skip and change the volume |
| **Commands** | Commands the phone can run on the computer, such as locking the screen or putting it to sleep. Choose **Add Command…**, give it a name and the command. The phone sees only the name. A command runs as you, and nothing runs while the screen is locked |

## Networks

Phones can connect only while the computer is on one of the networks listed
under **Networks**. The network you pair on is added. To add the one you are
on now, choose **Use on This Network**. To take one out, choose **Forget**
next to it.

## Forgetting a phone

In *Settings > Phone*, under **Phones**, choose **Forget** next to it. It
then has to pair again before it can send anything.

## From a terminal

| Command | What it does |
|---|---|
| `flickos-phone send FILE` | Sends a file, or a web address |
| `flickos-phone send --text "TEXT"` | Sends text |
| `flickos-phone send --clipboard` | Sends the clipboard |
| `flickos-phone ring` | Rings the phone |
| `flickos-phone devices` | The paired phones |

To do something when the phone comes or goes, such as turning on Do Not
Disturb while it is near, see [Hooks](/guides/hooks/).

## When something doesn't work

**The phone doesn't see the computer.**
- Check that both are on the same network, and that it is one of the
  computer's *Networks*.
- If the firewall is on, turn on **Let phones through the firewall**.
- Some Wi-Fi networks (often guest networks) keep devices from seeing each
  other. Use your own network.

**Pairing stops.** Keep the *Add Phone* window open on the computer and the
KDE Connect app open on the phone until both say they are paired.

**Send to Phone in the file manager says the connection is off.** Turn it on
in *Settings > Phone*. The file manager always shows the item, even while
it's off.

**Browse Files shows nothing.** In the KDE Connect app on the phone, check
which folders it shares with the computer.
