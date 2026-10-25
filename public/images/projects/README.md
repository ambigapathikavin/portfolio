# Project card photos

One locally hosted photo per project case study: `project-01.jpg` …
`project-19.jpg`. Images are downloaded from Openverse-indexed Flickr sources
under CC BY 2.0 or CC0 licenses. The source and license links are shown on
each project card. Photos are locally hosted and cropped to fit the card
layout.

## How these are wired

`src/data/portfolioData.ts` → each project's `imageUrl` field:

```ts
imageUrl: 'images/projects/project-01.jpg',
```

These paths are resolved at runtime through `publicAsset()`
(`src/utils/assets.ts`), which prefixes the deployment base path. That is why
the value must **not** start with `/` — a leading slash resolves to the domain
root and breaks on GitHub Pages (`user.github.io/portfolio/`).

## Replacing a photo with your own project screenshot

1. Drop your file into this folder.
2. Update that project's `imageUrl` in `src/data/portfolioData.ts`.
3. Update or remove its `imageAttribution` entry in the same project record.

Use a landscape image around 1200 × 675 (16:9) so it fills the project card
without excessive cropping. Recommended size under 200 KB.

If `imageUrl` ever points at a file that does not exist, the card renders a
tinted fallback tile with the project title instead of a broken-image icon —
so a stale filename degrades gracefully rather than looking broken.

## The other image folder

`public/images/tomato/` holds the six leaf-disease photos used by the
Crop Foliar Disease Diagnostic simulator (project-17). Those paths are listed in
`src/components/AdditionalProjectDashboards.tsx` in the `localPhoto` fields.