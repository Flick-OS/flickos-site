---
title: Classroom
description: "See, lock and help a class of FlickOS computers from the teacher's computer, on the school's own network."
draft: true
sidebar:
  order: 4
---

:::caution[Draft]
Written from flickos-classroom-view 1.0~test. Before publishing: check every
button name against the released windows, and add screenshots. The part
where FlickOS Manage hands out teachers to lab computers isn't built yet, so
this guide leaves it out.
:::

Classroom lets a teacher see the screens of a class of FlickOS computers
from their own computer. From there the teacher can lock them, send a
message, open a web page, help one student or show their own screen to
everyone.

It works between computers on the same network. Nothing goes through the
internet or FlickOS's servers: no screen, name or certificate ever leaves
the school's network.

There are two parts:

| Who | Installs | Gets |
|---|---|---|
| The teacher | `flickos-classroom-teacher` | The *Classroom* window, in the start menu |
| Each student's computer | `flickos-classroom-view` | *Settings > Classroom*, and nothing running until sharing is turned on |

Neither part comes with FlickOS. Install them in a terminal, with an
administrator's password:

```sh
sudo apt install flickos-classroom-teacher   # on the teacher's computer
sudo apt install flickos-classroom-view      # on each student's computer
```

Classroom doesn't work in the live session (from the USB stick before
installing).

## Two kinds of student computer

- **A student's own computer** (a laptop they bring, for example) shares
  nothing until the student turns sharing on, and only with the teachers
  the student pairs with. The student can turn it off at any time.
- **A school lab computer** is set up once by the school's administrator.
  Every account on it shares with the teachers the administrator paired,
  and students can't turn it off. See
  [For administrators: lab computers](#for-administrators-lab-computers).

## For teachers

### Adding students

1. Open **Classroom** from the start menu.
2. Choose **Add Students…**. The window shows a six-digit code.
3. Each student opens *Settings > Classroom*, turns on **Share this screen
   with a teacher**, chooses **Pair With a Teacher…** and types the code.
   On a lab computer, the administrator types it instead (once for each
   computer, not for each student).
4. Each student appears as a tile as soon as they have paired. Close the
   window when everyone is in.

The code never crosses the network: both computers prove they know it
without sending it. After three wrong tries, start again with a new code.

### The Classroom window

Each paired student is a tile with a small picture of their screen, updated
once or twice a second. Students who are here come first; students who are
absent, or whose sharing is off, are greyed at the end.

The actions act on the selected tiles, or on every student shown when none
is selected:

| Action | What it does |
|---|---|
| **Lock Screens…** | Locks the screens with a message you type, for when you want everyone's attention |
| **Unlock Screens** | Unlocks them. If your computer goes away, they unlock by themselves after 2 minutes |
| **Send Message…** | Shows your message on their screens |
| **Open Web Page…** | Opens a web page (`http` or `https`) on their computers |
| **Show My Screen** | Shows your screen on theirs, which are locked meanwhile. Press it again to stop. Closing the window stops it too |

For one selected student:

| Action | What it does |
|---|---|
| **View** | Opens their screen in a window, up close |
| **Control** | Opens their screen and lets your keyboard and mouse work on it, to help them. They see a strip at the top of their screen saying so, with a *Stop* button |

### Classes

If you teach more than one group, put them in classes. The list at the top
of the window shows one class at a time (or *All Students*), and only that
class's students are connected. The menu has:

- **New Class…**: a class with the students selected.
- **Rename Class…**, **Delete Class…**: deleting a class keeps its
  students paired, in *All Students* and their other classes.
- **Put Selected in a Class**, **Take Selected out of This Class**.

**Add Students…** adds the new students to the class shown.

### Attendance

The window shows *N of M here* for the class shown. Attendance is kept only
when you ask for it:

- **Copy Attendance**: copies the names, here or absent, and the time, to
  paste into a document or a message.
- **Save Attendance…**: saves the same as a spreadsheet file (CSV) where
  you choose.

### Removing students

Select their tiles and choose **Forget…**. Their screens no longer show
in your window until they pair again.

### More than one teacher

A student's computer can be paired with up to 16 teachers, but only one is
connected at a time. When a second teacher opens Classroom, they take the
class over, unless the first teacher has the screens locked, is showing
their screen, or is viewing or controlling a student. In that case the
second teacher has to wait. A teacher whose class was taken over
double-clicks a tile to connect again.

## For students

### Turning sharing on and off

Open *Settings > Classroom* and turn on **Share this screen with a
teacher**. Turn it off the same way. While it is off, nothing of Classroom
runs on your computer.

To pair with a teacher, choose **Pair With a Teacher…** and type the code
the teacher's computer shows. Your screen is shared only with the teachers
you paired with, and only while you're on the same network as them.

### How you can tell

- **An icon in the panel** shows whenever sharing is on. It can't be
  hidden. It turns red while a teacher is looking at your screen, and its
  tooltip names the teacher.
- **A strip at the top of the screen** shows for as long as a teacher views
  or controls your screen, with the teacher's name and a **Stop** button.
- A class lock, or the teacher's screen shown on yours, says so on the
  screen.
- The first time sharing starts, a notice tells you what a teacher can do.

### Forgetting a teacher

*Settings > Classroom > Teachers* lists the teachers you paired with. Choose
**Forget…** next to one, and their computer can no longer see or lock
your screen until you pair again.

### Letting the teacher through the firewall

If your firewall is on, the teacher's computer can't reach yours until you
turn on **Let the teacher's computer through the firewall** in *Settings >
Classroom*. It lets the teacher's computer in from school and home networks
only, and needs an administrator's password.

## For administrators: lab computers

On a computer the school owns, set it up once so that every account shares,
whoever logs in:

1. Install `flickos-classroom-view`.
2. In *Settings > Classroom*, turn on **This is a lab computer** (needs an
   administrator's password).
3. Choose **Pair This Computer With a Teacher…** and type the code the
   teacher's computer shows under **Add Students**. Repeat for each teacher
   who will use the room.
4. If the firewall is on, turn on **Let the teacher's computer through the
   firewall**.

After that:

- Every account on the computer shares its screen with the paired teachers,
  and can't turn it off. The first time an account logs in, a notice tells
  them.
- The teacher's tile names the account logged in. With no one logged in,
  the tile says *Nobody logged in*.
- On a lab computer, a student's **Stop** ends control, but not a view.
- To remove a teacher, use **Forget…** next to their name in *Teachers*
  (needs an administrator's password). Turning off **This is a lab
  computer** stops the sharing for every account.

## What a teacher can see

A paired teacher's computer gets the small pictures of the screen while the
teacher's window shows the student's class, the screen itself while the
teacher views or controls it (with the strip shown), the account's full name,
the computer's name, and whether the screen is locked.

The teacher's computer can do only the actions listed above. It can't run
commands, read or send files, or record anything, and no screen is ever
saved on either computer. Attendance is kept only when the teacher copies or
saves it.

While sharing is on, anyone on the same network can see that the computer is
there, with the account's full name (the computer's name on a lab computer),
so that teachers' computers can find it.

Everything, field by field, including what is kept on each computer:
`/usr/share/doc/flickos-classroom-view/PRIVACY.md`.

## When something doesn't work

**A student doesn't appear, or is greyed out.**
- Check that the student's sharing is on: the panel icon shows.
- Both computers must be on the same network. Some Wi-Fi networks (often
  guest networks) keep computers from seeing each other: use the school's
  own network, or a cable.
- If the student's firewall is on, turn on **Let the teacher's computer
  through the firewall** on their computer.
- If the student paired with another teacher, that teacher may be connected
  now: only one teacher at a time.

**Pairing fails.** The code is six digits and works only while the teacher's
**Add Students** window is open. After three wrong tries, close it and
choose **Add Students…** again for a new code.

**A screen stays locked.** Choose **Unlock Screens**. If the teacher's
computer is gone (closed, asleep or off the network), the lock lets go by
itself after 2 minutes.
