---
name: bump-tldraw
description: Bump tldraw to the latest version, fix any breaking changes, verify the build, and create a PR.
disable-model-invocation: true
user-invocable: true
argument-hint: [version]
---

# Bump tldraw dependency

Bump the `tldraw` package to a new version, fix any resulting type errors or breaking changes, and open a pull request.

The target version is `$ARGUMENTS`. If no version argument is provided, use `latest`.

## Steps

### 1. Set up a branch

Create a new git branch from the current branch named `bump-tldraw/<version>` (e.g., `bump-tldraw/4.5.0`).

### 2. Bump the version

Update `tldraw` in `package.json` to the target version (use exact version, e.g. `"tldraw": "^<version>"`), then run `yarn install`. Confirm the resolved version with `yarn list --pattern tldraw --depth=0`.

### 3. Type check

Run `npx tsc --noEmit`. If there are type errors:

- **Analyze each error** — read the affected files and the tldraw type definitions to understand what changed.
- **Common tldraw upgrade patterns to check for:**
  - Custom shape type registration via `declare module '@tldraw/tlschema'` and `TLGlobalShapePropsMap` (see `app/PreviewShape/PreviewShape.tsx` and `app/Slides/SlideShapeUtil.tsx` for existing examples)
  - Renamed or removed exports — search the tldraw dist `.d.ts` files for replacements
  - Changed generic constraints on `ShapeUtil`, `BaseBoxShapeUtil`, `BaseBoxShapeTool`
  - React types compatibility (tldraw may require newer `@types/react`)
- **Fix each error**, re-run `npx tsc --noEmit`, and repeat until clean.

### 4. Build check

Run `yarn build`. If the build fails due to issues **other than** pre-existing problems (like missing `zod` peer dependency), investigate and fix. The `zod` peer dependency warning from `@ai-sdk/*` packages is a known pre-existing issue and can be ignored.

### 5. Commit and create PR

Stage only the files you changed (typically `package.json`, `yarn.lock`, and any source files with type fixes). Create a commit with a message like:

```
Bump tldraw to <version>
```

Push the branch and create a pull request with:
- **Title:** `Bump tldraw to <version>`
- **Body:** Summary of what was updated, any breaking changes found and how they were fixed, and confirmation that typecheck and build pass.
