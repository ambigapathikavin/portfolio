# Project card images

One image per project case study: `project-01.jpg` … `project-19.jpg`
(1200 × 675, ~85 KB each).

## How these are wired

`src/data/portfolioData.ts` → each project's `imageUrl` field:

```ts
imageUrl: 'images/projects/project-01.jpg',
```

These paths are resolved at runtime through `publicAsset()`
(`src/utils/assets.ts`), which prefixes the deployment base path. That is why
the value must **not** start with `/` — a leading slash resolves to the domain
root and breaks on GitHub Pages (`user.github.io/portfolio/`).

## Replacing an image with your own screenshot

1. Drop your file into this folder.
2. Update that project's `imageUrl` in `src/data/portfolioData.ts`.

Use a landscape image around 1200 × 675 (16:9) so it fills the card and the
case-study banner without cropping. Recommended size under 200 KB.

If `imageUrl` ever points at a file that does not exist, the card renders a
tinted fallback tile with the project title instead of a broken-image icon —
so a stale filename degrades gracefully rather than looking broken.

## Regenerating the placeholder cards

The current images are generated placeholders, styled with each project's own
`accentColor`, `category` and `technology` list. They are deliberately neutral
so nothing looks stock-photographed. Swap in your real dashboard screenshots as
soon as you have them — that is the single biggest upgrade a reviewer will
notice.

## The other image folder

`public/images/tomato/` holds the six leaf-disease photos used by the
Crop Foliar Disease Diagnostic simulator (project-17). Those paths are listed in
`src/components/AdditionalProjectDashboards.tsx` in the `localPhoto` fields.