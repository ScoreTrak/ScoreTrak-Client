# ScoreTrak JS Mono Repo

The monorepo for ScoreTrak client packages using [pnpm](https://pnpm.io) as the package manager.

### Apps and Packages

- `apps/client`: the scoretrak react js client app
- `packages/scoretrak-scoretrakapis`: the generated protobuf files for the react js client app.

## Installation

Clone the repository.

```bash
git clone https://github.com/scoretrak/client
```

## Usage

Install Dependencies

```bash
pnpm install
```

### Development

Start the application

```bash
pnpm run start
```

Test the application

```bash
pnpm run test
```

### Production

Build the application

```bash
pnpm run build
```

Serve generated static files

```bash
pnpm install --global serve
serve -s build
```

## Useful Links

Learn more about the power of Turborepo:

- [Pipelines](https://turborepo.org/docs/features/pipelines)
- [Caching](https://turborepo.org/docs/features/caching)
- [Remote Caching (Beta)](https://turborepo.org/docs/features/remote-caching)
- [Scoped Tasks](https://turborepo.org/docs/features/scopes)
- [Configuration Options](https://turborepo.org/docs/reference/configuration)
- [CLI Usage](https://turborepo.org/docs/reference/command-line-reference)
