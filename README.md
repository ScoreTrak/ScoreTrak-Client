# ScoreTrak Web App

The react web application for ScoreTrak, a scoring engine built in go.

## Installation

Clone the repository.

```bash
git clone https://github.com/ScoreTrak/client
```

## Usage

Setup Buf Registry

```bash
npm config set @buf:registry https://buf.build/gen/npm/v1

```

For more information on the buf registry for Scoretrak, go to [scoretrakapis](https://buf.build/scoretrak/scoretrakapis/assets/main).

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

VITE_API_SERVER_URL=http://scoretrak.dev.example.com:30080
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
