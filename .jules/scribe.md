# Scribe's Journal

## 2025-02-28 - Missing Capacitor Patch
Insight: The `patches/@capacitor__cli.patch` file referenced in `package.json` was missing from the repository, causing `pnpm install` to fail immediately.
Rule: Do not define `patchedDependencies` in `package.json` unless the corresponding patch file exists in the `patches/` directory. Configuration must match the filesystem state.
