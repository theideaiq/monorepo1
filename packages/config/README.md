# Shared Configuration

This package contains shared configuration files and constants for the monorepo.

## Contents

- **TypeScript**: Shared `tsconfig.json` used as a base for other packages.
- **Biome**: Shared `biome.json` for linting and formatting rules.
- **Navigation**: Shared navigation constants for Web and Admin apps (`src/navigation.ts`).

## Usage

### TypeScript
```json
// tsconfig.json
{
  "extends": "@repo/config/tsconfig.json"
}
```

### Biome
```json
// biome.json
{
  "extends": ["@repo/config/biome.json"]
}
```

### Navigation Constants
Import shared navigation structure to keep links consistent.

```ts
import { webNavigation } from '@repo/config/navigation';

// Use in Next.js Navbar
```
