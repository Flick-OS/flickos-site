---
title: Hooks
description: "Run your own programs when something happens on your desktop: when it locks, wakes, a screen comes or goes, your phone connects, a setting changes or a screenshot is saved."
draft: true
sidebar:
  order: 3
---

:::caution[Draft]
Written from flickos-hooks 1.1. Before publishing: try the phone examples
with a real phone (the phone events haven't been tried with one yet), and
run every example on a released FlickOS. Only the event names and their
values are promised to stay; the other FlickOS commands used in the examples
aren't on a public list yet.
:::

A hook is a program of your own that FlickOS runs when something happens:
pause the music when you lock the screen, copy each screenshot to your
server, turn on Do Not Disturb while your phone is near. Put an executable
file in a folder, and it runs when the event happens.

A hook can be written in any language: a shell script, Python, or a program
you built. With no hooks, nothing runs and nothing is added to your login.

## Your first hook

This one pauses whatever is playing when you lock the screen.

1. Make the folder for the event, `locked`:

   ```sh
   mkdir -p ~/.config/flickos/hooks/locked.d
   ```

2. Make a file in it, `~/.config/flickos/hooks/locked.d/pause-music`, with:

   ```sh
   #!/bin/sh
   playerctl pause
   ```

3. Make it executable:

   ```sh
   chmod +x ~/.config/flickos/hooks/locked.d/pause-music
   ```

4. Try it without locking:

   ```sh
   flickos-hooks test locked
   ```

Now play some music and press Super+L.

## The events

Each event has a folder, `~/.config/flickos/hooks/EVENT.d/`. Some events
give the hook values, as environment variables.

| Event | When | Values |
|---|---|---|
| `locked` | The lock screen came up | none |
| `unlocked` | You unlocked the screen | none |
| `woke` | The computer woke from sleep. The screen is usually still locked | none |
| `screens` | A screen was plugged in or unplugged, or turned off or on, and the screens settled. Moving one changes nothing | none |
| `phone-connected` | A paired phone can be reached | `FLICKOS_PHONE_ID`, `FLICKOS_PHONE_NAME` |
| `phone-disconnected` | A paired phone went away | `FLICKOS_PHONE_ID` |
| `changed` | A setting changed and is already in use | `FLICKOS_OWNER`, `FLICKOS_KEY`, `FLICKOS_OLD`, `FLICKOS_NEW` (see [The changed event](#the-changed-event)) |
| `screenshot` | A screenshot was saved to a file | `FLICKOS_FILE` |
| `recording` | A screen recording was saved to a file | `FLICKOS_FILE` |

Every hook also gets `FLICKOS_EVENT`, the event's name, so one program can
serve several events. `flickos-hooks events` prints this list.

These names stay: a new FlickOS version may add events and values, but
never renames or removes one.

## What a hook can count on

- **It runs in your session,** as you, in your home folder, with your
  session's environment: your `PATH`, the screen and the session bus, so
  `notify-send`, `wl-copy` and `playerctl` work.
- **Values are data.** Always quote them (`"$FLICKOS_FILE"`): a file name or
  a phone's name can have spaces, or worse.
- **One after another.** An event's hooks run in the order of their names,
  each one after the last has finished. Name them `10-first`, `20-second` to
  choose the order.
- **30 seconds each.** A hook that runs longer is stopped. To start
  something that keeps running, start it with `setsid -f`.
- **Nothing in, output to a log.** A hook gets no input, and what it prints
  goes to the log (`flickos-hooks log`).
- **What a hook changes doesn't call the hooks again.** A hook that changes a
  setting doesn't fire `changed`, so two hooks can't set each other off.
- **Bursts stop themselves.** An event that happens more than 20 times in a
  minute is dropped for the rest of that minute, with one line in the log.

Hidden files, and files ending in `~`, `.bak` or `.dpkg-` something, are left
alone. A `.sh` ending is fine.

## Checking your hooks

| Command | What it shows |
|---|---|
| `flickos-hooks list` | Every hook, with its event and whether it is `ready`, `not executable` or `ignored`. A folder with a misspelled name shows as `no such event` |
| `flickos-hooks test EVENT` | Runs the event's hooks now, with their output in your terminal. Give values like this: `flickos-hooks test screenshot FILE=$HOME/Pictures/test.png` |
| `flickos-hooks log` | What ran this session, its output, and how it ended |

## Examples

**Keep a copy of every screenshot** in a synced folder
(`screenshot.d/keep-a-copy`):

```sh
#!/bin/sh
cp -- "$FLICKOS_FILE" ~/Nextcloud/Screenshots/
```

**Do Not Disturb while your phone is near**, since it alerts you anyway
(`phone-connected.d/quiet` and `phone-disconnected.d/quiet`):

```sh
#!/bin/sh
# phone-connected.d/quiet
flickos-control set notifications.do-not-disturb yes
```

```sh
#!/bin/sh
# phone-disconnected.d/quiet
flickos-control set notifications.do-not-disturb no
```

**Your own tools follow the style** when you switch between Light and Dark
(`changed.d/my-colors`):

```sh
#!/bin/sh
[ "$FLICKOS_KEY" = style ] || exit 0
~/bin/recolor-my-tools "$(flickos-layout style current)"
```

**Say when a screen is plugged in** (`screens.d/show-screens`). The event
gives no values: the hook asks for the screens itself.

```sh
#!/bin/sh
notify-send "Screens" "$(wlr-randr | grep -c '^[^ ]') connected"
```

## The changed event

`changed` covers every setting FlickOS records in *Settings > History*:
style, desktop layout, tiling, Do Not Disturb, night light, keyboard and the
rest, with the same names History uses:

| Value | What it is | Example |
|---|---|---|
| `FLICKOS_OWNER` | The program that owns the setting | `flickos-layout`, `flickos-control`, `flick-tiler` |
| `FLICKOS_KEY` | The setting | `style`, `notifications.do-not-disturb` |
| `FLICKOS_OLD`, `FLICKOS_NEW` | Its value before and after, as History records them | `dark`, `light` |

It fires whether History is on or off, and only once the change is in use,
so a hook can read the new state straight away.

A setting put back to its default reads `default` in `FLICKOS_NEW`, not the
value that default turns into. When your hook needs the value in use, ask
for it, as the style example does.

To learn the keys, put this in `changed.d/show-all` for a while, change a
few settings, then run `flickos-hooks log`:

```sh
#!/bin/sh
echo "$FLICKOS_OWNER $FLICKOS_KEY: $FLICKOS_OLD -> $FLICKOS_NEW"
```

## Ideas

| Event | Ideas |
|---|---|
| `locked`, `unlocked` | Pause the music and start it again. Mute the microphone. Set a chat app to "away" and back. Note when work started and stopped |
| `woke` | Reconnect a VPN, or mount a network drive again. Sync mail or notes while the screen is still locked |
| `screens` | When docked, start your work apps; when undocked, go back to the laptop's setup. With a projector, Do Not Disturb during a talk |
| `phone-connected`, `phone-disconnected` | Back up the phone's photos when it comes home. Lock when it leaves, as a rough "walk away" lock: a phone also drops off when its Wi-Fi blips |
| `changed` | Change the wallpaper with the style. Keep a git record of your settings. Pause a noisy background job during Do Not Disturb |
| `screenshot`, `recording` | Upload it and put the link on the clipboard (`wl-copy`). Shrink it or add a border. Sort by date or project. Turn a recording into a GIF for a bug report |

## What hooks can't do

- **Battery and network.** "Dim on battery" and "VPN on café Wi-Fi" aren't
  events yet: nothing in FlickOS watches them today.
- **Before sleep or shutdown.** A hook that delays sleep would delay it for
  everyone, and at shutdown nothing is left running to start one.
- **Private things.** There are no events for notifications, the clipboard,
  what you type, phone messages or wrong passwords, on purpose.
- **Run as administrator.** Hooks run as you. There is no folder for the
  whole computer, and packages can't add hooks.
- **The login screen.** Hooks start with your session.

## Turning a hook off

- **Just for now:** `chmod -x` the file. `flickos-hooks list` shows it as
  `not executable`.
- **For good:** delete the file.
- **When a hook breaks your desktop:** log out and pick **FlickOS (Plain
  Session)** in the login screen's session menu. Hooks never run there.
  Fix or remove the hook, then log in as usual.
