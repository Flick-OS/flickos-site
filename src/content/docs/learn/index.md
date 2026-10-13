---
title: From idea to release
description: The thirteen stages a FlickOS feature goes through, and the tutorials that teach each one.
sidebar:
  order: 0
---

A FlickOS feature goes through thirteen stages, in four phases. The tutorials teach those stages by building one example, **flickos-hello**, from an empty folder to a package in the repository.

The [Human Interface Guidelines](/docs/hig/) are the rules. This page is the same work, done once, in order.

Set two variables before you start. `TUTORIALS` is a clone of the [tutorials repository](https://github.com/dvbondoy/flickos-tutorials), where the answer keys and scripts live. `FLICKOS` is a clone of [FlickOS](https://github.com/dvbondoy/FlickOS).

```sh
export TUTORIALS="$HOME/flickos-tutorials"
export FLICKOS="$HOME/FlickOS"
```

## Two orders

**Learning order.** Follow the guides in this order. Each one leaves the package the next one expects.

1. [Building a .deb](/learn/deb/)
2. [Writing a program](/learn/code/)
3. [Headless labwc](https://github.com/dvbondoy/flickos-tutorials/tree/main/flickos-headless-labwc), for repeatable window tests
4. [Shipping a package](/learn/ship/)
5. [Into the repository](/learn/repo/)

**Your own app.** An app you keep in your own repository doesn't go into FlickOS: it goes into the community repository, and Software shows it on every FlickOS computer. [Publish your app for FlickOS](/learn/publish/) is that path, after [Building a .deb](/learn/deb/).

**Your own desktop.** Not building anything, only changing how FlickOS looks? [Make FlickOS yours](/learn/yours/) is for you: styles, keys, panel buttons and sharing, with a text editor and no packages.

**Shipping order.** When the feature is a real one, do the stages below. The repository guide is split: the design doc is early, and wiring the package in is late. Releasing an ISO is explained in the shipping guide and not practised there.

## Think

Decide what to build before building it.

### 1. Idea and questions

Write down what the feature is for, and the questions whose answers could kill or reshape it. Each question says why it matters.

- **Taught in:** [flickos-snip-spike](https://github.com/dvbondoy/flickos-tutorials/tree/main/flickos-snip-spike) §0–1, [flickos-spike-kit](https://github.com/dvbondoy/flickos-tutorials/tree/main/flickos-spike-kit) process 1–2
- **Tools:** `results.md`
- **Done when:** every question says what in the design changes with its answer, and the riskiest one is first.

### 2. Spike (phase 0)

Prove the risky parts on a real machine and measure what they cost, with as little code as possible.

- **Taught in:** [flickos-snip-spike](https://github.com/dvbondoy/flickos-tutorials/tree/main/flickos-snip-spike) §2–11, [flickos-spike-kit](https://github.com/dvbondoy/flickos-tutorials/tree/main/flickos-spike-kit) process 3–10, [flickos-phone-spike](https://github.com/dvbondoy/flickos-tutorials/tree/main/flickos-phone-spike) §0–10
- **Tools:** `check-machine.sh`, `try-unpacked.sh`, `run-measured.sh`, `tools/package-cost.py`, `tools/measure.py`
- **Done when:** every question is answered with a measurement or a no, decided in one sentence with its numbers, and cleaned up.

### 3. Design doc

`docs/design/NAME.md`: the problem, goals and non-goals, one ADR per decision with the alternatives that were rejected, phases, and risks.

- **Taught in:** [Into the repository](/learn/repo/) §2 and §4, [flickos-spike-kit](https://github.com/dvbondoy/flickos-tutorials/tree/main/flickos-spike-kit) process 11, [flickos-snip-spike](https://github.com/dvbondoy/flickos-tutorials/tree/main/flickos-snip-spike) §12
- **Tools:** `docs/design/flickos-menu.md`, `git commit`
- **Done when:** the status is Proposed, phase 0's results are in the doc, and the doc is committed on its own.

### 4. HIG review of the design

Go through the checklist's Must rules and settle each one in the design, while it is still a paragraph to change.

- **Taught in:** [Into the repository](/learn/repo/) §3
- **Tools:** [checklist](/docs/hig/checklist/)
- **Done when:** every Must rule either passes or has an ADR, and a doc that disagrees with a decision is changed in the same commit.

## Build

The program, its package, and proof that it works.

### 5. Code and unit tests

One Python file. The docstring and the tables come first, the command line comes before any window, GTK loads late, and the tests use faked paths.

- **Taught in:** [Writing a program](/learn/code/) §0–10
- **Tools:** `python3 -B -m unittest`, `leak-check.py`, `first-frame.py`
- **Done when:** the tests pass, leak-check touches nothing, commands return in under 200 ms, and a window opens in under 1 s.

### 6. The package

`debian/` with control (a comment on every dependency), changelog, copyright, install, rules, and source/format.

- **Taught in:** [Building a .deb](/learn/deb/) §0–21, [Writing a program](/learn/code/) §11
- **Tools:** `dch -i -D trixie`, `build-and-check.sh`, `lintian`
- **Done when:** it builds from a copy, the tests run inside the build, and lintian reports no errors.

### 7. Test at four levels

Your own desktop for how it feels. The headless harness for repeatable runs and a first login. The live ISO in QEMU for a clean system. The boot test for CI.

- **Taught in:** [flickos-headless-labwc](https://github.com/dvbondoy/flickos-tutorials/tree/main/flickos-headless-labwc) §0–9, [Shipping a package](/learn/ship/) §2–3, [Into the repository](/learn/repo/) §8 and §10
- **Tools:** `start.sh`, `run.sh`, `shot.sh`, `tools/test-iso.sh`, `tools/boot-test.py`, `vm-run.py`, `try-checks.py`
- **Done when:** it works in the live ISO, and its boot-test check passes there and fails against the old version.

## Integrate

Everything else in the repo that has to know about it.

### 8. Wire it in

`flickos-desktop`'s Depends or Recommends, `REQUIRED` when it is a must-have, Settings (a tile or a row), History, autostart, both menus, and the boot-test `CHECKS`.

- **Taught in:** [Into the repository](/learn/repo/) §5–9
- **Tools:** `check-wiring.py`, `packages/build.sh`, `tools/check-menus.py`, `tools/check-palette.py`
- **Done when:** `check-wiring.py` has no `MISSING` lines, and `packages/build.sh` exits 0.

### 9. Document it

A section in the packages doc, a row and a tree line in the overview, a paragraph in `CLAUDE.md`, and the design doc accepted with its measurements.

- **Taught in:** [Into the repository](/learn/repo/) §11
- **Tools:** `check-wiring.py`
- **Done when:** someone who reads only `CLAUDE.md` would not undo one of your decisions by mistake.

### 10. Commit and push

One commit per phase, with one bullet per package version, then push. CI builds the ISO and runs the full boot test.

- **Taught in:** [Into the repository](/learn/repo/) §12 and §15
- **Tools:** `git status`, `git diff --cached`, `git commit`
- **Done when:** CI is green, and its screenshots of your window look right.

## Ship

From the repo to installed systems and the next ISO.

### 11. Upgrade test

An installed system that has the published version upgrades to yours through apt, from a local test repo.

- **Taught in:** [Shipping a package](/learn/ship/) §4–12
- **Tools:** `local-repo.sh`, `vm-run.py`, `upgrade-test.txt`, `qemu-img snapshot`
- **Done when:** conffiles, Breaks, and a new Depends behave, and nothing is kept back that should have upgraded.

### 12. Publish

Add the new versions to the signed apt repo and push it to GitHub Pages, so installed systems receive them.

- **Taught in:** [Shipping a package](/learn/ship/) §5 and §13
- **Tools:** `repo/publish.sh`, `repo/upload.sh`
- **Done when:** the published `InRelease` lists the new versions, and a VM pointed at the real repo upgrades to them.

### 13. Release the ISO

This stage is explained, and not practised, in the shipping guide. Bump `FLICKOS_VERSION`, build with `--purge`, and tag `vX.Y`. CI builds again and uploads to SourceForge.

- **Taught in:** [Shipping a package](/learn/ship/) §14
- **Tools:** `tools/release.sh X.Y`, `tools/build-iso.sh --purge`, `git tag -a vX.Y`
- **Done when:** the GitHub release has `SHA256SUMS` and the ISO is on SourceForge.

## Decisions along the way

Each one is made in a design-doc ADR, with its reason.

| Decision | How to decide | Rule | Shown in |
|---|---|---|---|
| Does it need a spike? | Only when a question cannot be answered from the repo or from Debian. When every part already works in another FlickOS program, write "no spike" and why. | — | snip spike §0, [repository guide](/learn/repo/) §2 |
| Its own package, or part of one? | Each setting has one owner. A view (Settings, Welcome) runs owners. It never becomes one. | SET-1 | [repository guide](/learn/repo/) §2 (ADR-001) |
| On or off by default? | Off. Nothing runs, is generated, or is bound while it is off. Only an ADR that states the cost makes it the default. | INT-9 | [writing guide](/learn/code/) §0 |
| Depends or Recommends? | Depends: the desktop breaks without it, and installed systems must receive it. Recommends: an app people may remove, for new installs only. Try `apt-get -s remove PKG`. | PKG-4 | [repository guide](/learn/repo/) §3 |
| Which other packages change? | A setting needs a Settings row or tile (`flickos-control`), History (`flickos-control`), maybe autostart (`flickos-settings`), both menus, and a bump of `flickos-desktop`. | INT-4, SET-4, PKG-3 | [repository guide](/learn/repo/) §6–7 |
| A daemon? | Only when a measured time budget needs one. Signal it with `pkill`, and do nothing while the feature is off. | PERF-6 | — |
| Which version number? | `dch -i` for a change. `dch -v 2.0` when a stored value changes meaning. | PKG-3 | [writing guide](/learn/code/) §11 |
| Publish now? | When the phase is complete for users. Code can sit in the repo until then. | INT-4 | [repository guide](/learn/repo/) §15 |

## Gates you never skip

- **A new version for every content change.** `dch -i -D trixie "…"`, never by hand, never `UNRELEASED`. Check `repo/public/pool` first: a published version is frozen.
- **Tests never touch the host.** Fake every path the program uses. Run `leak-check.py` whenever it reads or writes somewhere new.
- **Cross-package tests run in the tree.** `packages/build.sh` builds packages alone and skips those tests. Run the tests in `packages/NAME` after changing either side.
- **Kill by PID on your own desktop.** The computer you are working on is a live FlickOS session. `pkill -x` by name hits your own programs.
- **Boot-test checks run in the VM.** They change settings and close programs by name. Make sure each new check fails against the old version.
- **Upgrade test before publishing.** Old version to new, through apt: conffiles, Breaks, a new Depends, and nothing kept back by surprise.
- **Recommends never reach existing installs.** A new Recommends is for new installs only. Anything installed systems must get is a Depends.
- **Read `git status` before committing.** Anything you did not mean to change shows up there: build output, `__pycache__`, an experiment.
