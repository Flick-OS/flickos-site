---
title: Tool Kits
description: "Install the apps and tools for one kind of work in one step: programming, studying, teaching children, or security testing."
draft: true
sidebar:
  order: 2
---

:::caution[Draft]
Written from flickos-kits 1.4 and the kits as released on 2026-11-19.
Before publishing: check the button names on a real screen, and add
screenshots of the Tool Kits window and an environment's row.
:::

A tool kit installs everything for one kind of work in one step: the
apps for studying, the tools for writing Python, or the tools for testing a
network. Every kit comes from Debian's own packages, and it is removed as
easily as it is installed.

A kit doesn't run anything by itself. Its apps and tools start only when
you start them.

## Where to find them

Open **Tool Kits** from the start menu, or from its tile in *Settings*,
under *More Settings*. The
Welcome window's *Tools for your work* card opens it too.

Kits are also in **Software**: the developer kits on the *Developer Tools*
shelf of its front page, Study and Young Learners under *Education*, and
the security kits under *Security Tools*. An installed kit's page in
Software has **Set Up…**, which opens Tool Kits.

## The kits

**What do you develop?**

| Kit | What it installs |
|---|---|
| Developer Basics | Git, a compiler, a debugger and the everyday command-line tools. Every other developer kit includes it |
| Python | Virtual environments, pip and pipx |
| Node.js and npm | Node.js and npm, for web and JavaScript projects |
| C and C++ | CMake, Meson, Ninja, Clang and Valgrind |
| Containers | Podman and Distrobox, without a daemon running. Needed for [environments](#environments) |

**For learning and teaching**

| Kit | What it installs |
|---|---|
| Young Learners | GCompris, Kalzium (chemistry), KGeography, KTurtle (first steps in programming) and KmPlot (graphs) |
| Study | Xournal++ (handwritten notes, and writing on PDFs), LabPlot (graphs and data), KWordQuiz (flashcards) and Artha (an English dictionary that works offline) |

**Security work**

| Kit | What it installs |
|---|---|
| Network Analysis | Wireshark, Nmap and the tools for looking at a network |
| Web Testing | Fuzzers, sqlmap and TLS checks, for testing web apps |
| Passwords | John the Ripper, hashcat and Hydra, for testing passwords |
| Forensics | The Sleuth Kit, Autopsy and tools for disk images |
| Reverse Engineering | Debuggers, tracers and hex editors |
| Wireless Testing | Aircrack-ng and the tools for testing Wi-Fi networks |

The security list is folded until you open it or install one of its kits.

## Installing and removing a kit

Turn on the kit's switch. Tool Kits shows what will be installed and how
much is downloaded, then asks for an administrator's password. Turn the
switch off to remove the kit; it says first what else goes with it. Your
own files and projects are never touched.

Kits update with the rest of FlickOS, and *Settings > History* lists each
install and removal.

In the live session (from the USB stick before installing) you can try a
kit, but it is gone when you restart.

## Set up

Once a kit is installed, the *Set up* section shows the steps that fit it.
Each step shows only when its program is on the computer.

| Step | What it does |
|---|---|
| **Your name and email for git** | Git puts them on every commit you make |
| **SSH key** | Makes a key to sign in to GitHub and other code hosts. You type its passphrase in a terminal; **Copy Public Key** copies it to paste where the code host asks for it |
| **Rust** | Installs Rust's compiler and tools from rust-lang.org, about 600 MB in your home folder |
| **Devices on this network** | Lets a phone or another computer on your home or office network reach a server you run. Type ports like `8000/tcp`, from 1024 up. Only from home and office networks; needs an administrator's password |
| **Container networks with DHCP** | Lets containers get addresses from your router. Almost nobody needs this |

The security kits add two more:

| Step | What it does |
|---|---|
| **Capture packets without administrator rights** | Lets your account record network traffic with Wireshark without `sudo`. That means all traffic on this computer, including other accounts'. Applies when you log in again |
| **Wireless adapter for testing** | Choose a second Wi-Fi adapter for monitor mode. FlickOS then leaves it alone and won't connect to networks with it. Start monitor mode with `sudo airmon-ng start DEVICE`, never with `check kill`, which would stop your other Wi-Fi too |

## Environments

Some tools aren't in Debian, or you want a newer version than Debian has.
An environment is a container with another system's packages in it: Debian
testing for the developer kits, Kali Linux for the security kits. Its
programs run as you, in your own home folder. An environment is for other
software, not for keeping anything apart.

Environments need the **Containers** kit. Without it, the section offers
**Install Containers Kit…**.

### Making one

1. Choose **New Environment…** and pick the kits it is for. For the
   security kits you can also choose **Add Kali's whole list for these
   kits** (several gigabytes for each kit), and Kali's Metasploit and
   Exploit-DB (about 2.4 GB).
2. A terminal opens. It downloads the system's image, says how many
   packages, how much to download and how much disk they take, and asks
   before installing anything. Answer there, then come back to Tool Kits.

### Using one

Each environment is a row, with its kits, whether it is running, and when it
was last updated.

- **Open Terminal** opens a terminal inside it.
- **Make a Command Available…** lets you run one of its commands like any
  other, from your own terminal. Choose **Also add it to the menu** for an
  app with a window (Burp Suite, ZAP, Ghidra): its menu entry says which
  environment it comes from.
- **Update…** updates everything in it. Automatic updates don't reach an
  environment, so update it from here now and then.
- **Stop** stops it. It starts again when you open it.
- **Start Database** (with Kali's Metasploit) starts the database
  Metasploit uses. It stops again when the environment stops.
- **Remove…** deletes the environment, everything installed in it, the
  commands and menu entries it made available, and its image when nothing
  else uses it. Your own files are not touched.

An environment runs without administrator rights. Tools that need them, such
as `sudo nmap -sS` or monitor mode, run from the security kits on the
computer itself, not in an environment.

## Newer versions

Debian's versions are tested and stay the same for the life of a FlickOS
release. When you need newer ones, *Newer versions* offers two ways:

- **For your account only, with mise.** Choose **Install…** next to mise.
  Then each tool of your kits that mise offers (Node.js, Bun, Deno, uv and
  CMake; nuclei, ffuf, sqlmap and others with the security kits) has a row
  saying which version you use and how the download is checked. **Use the
  Latest** gets the newest release; **Keep This Version** stays on the one
  you have; **Back to the Computer's Version** returns to Debian's. **Update
  All** updates your versions. They get no restore points, History or
  automatic updates. The first time, programs use them from your next
  login.
- **For the whole computer, from the maker's repository.** With the
  security kits, Metasploit Framework can come from Rapid7's own
  repository. Tool Kits says what is downloaded and that the package's
  scripts run as administrator when it is installed and updated, as any
  package's do. Automatic updates keep it current.

**Remove mise…** puts your tools back to the computer's versions first, then
removes it.

## Using the security kits

Use these tools only on computers and networks you own or have permission to
test.

## When something doesn't work

**A command isn't found after installing.** Open a new terminal. A version
from mise is found from your next login.

**Wireshark can't capture.** Turn on *Capture packets without administrator
rights* in *Set up*, then log out and in again. Until then,
`sg wireshark -c wireshark` starts it with the new rights.

**A different version of a tool runs than Tool Kits says.** Something in
your shell's startup files (nvm, for example, or a copy in `~/.local/bin`)
comes first. Run `flickos-kits doctor` in a terminal: it says which copy
comes first.

**An environment's command stopped working.** Choose **Update…** on its
row. If the environment was removed, its commands and menu entries went with
it: make them available again from a new one.
