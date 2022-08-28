# ScoreTrak Web App

The react web application for ScoreTrak, a scoring engine built in go.

## Installation

Clone the repository.

```bash
git clone https://github.com/ScoreTrak/client
```

## Usage

Install Dependencies

```bash
npm install
```

Set your dev environment values (https://vitejs.dev/guide/env-and-mode.html)

### Development

Start the application

```bash
npm run start
```

```shell
# .env.development

ST_API_SERVER_URL=http://scoretrak.dev.example.com:30080
```

### Production

Build the application

```bash
npm run build
```

Serve generated static files

```bash
npm run serve
```
