# FlickOS website

Marketing site and documentation for [FlickOS](https://github.com/Flick-OS/flickos), built with [Astro](https://astro.build/), [Starlight](https://starlight.astro.build/), and Tailwind CSS v4.

- **Site:** https://flickos.net
- **Product repo:** sibling checkout at `../flickos` (not a submodule)

## Develop

Requires Node.js 22.12+.

```sh
npm install
npm run sync-docs   # vendors ../flickos/docs into src/content/docs/docs
npm run sync-learn  # vendors the four core tutorials into src/content/docs/learn
npm run dev
```

```sh
npm run build
npm run preview
```

Set `FLICKOS_DOCS_PATH` if the product repo is not at `../flickos`. Set `FLICKOS_TUTORIALS_PATH` if the tutorials repo is not at `../../flickos-tutorials`.

## The store

`/apps/` and `/apps/terms/` sell the paid FlickOS apps (the product repo's `docs/design/flickos-store.md`). The store is **not open**: `src/config/store.ts` has `open = false`, so those routes build nothing and no link to them appears anywhere on the site.

To see them:

```sh
PUBLIC_STORE_PREVIEW=true npm run dev
```

The same variable works on Vercel, but set it **only in the Preview environment** — preview deployments sit behind Vercel's login, so nobody else can reach them. Never set it in Production. While the store is closed, both pages also carry `noindex` and stay out of the sitemap.

To open the store: fill in the checkout links and set each app's status in `src/data/apps.ts`, replace the draft terms, then set `open` to `true` in `src/config/store.ts`.

## Deploy

Static output (`dist/`). Vercel detects Astro automatically — no adapter required.
