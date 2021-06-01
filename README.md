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

Set Environment variables

```bash
export REACT_APP_SCORETRAK_SERVER_URL=<ip_address_of_envoy_proxy>:<port>
```

### Development

Start the application

```bash
npm run start
```

Test the application

```bash
npm run test
```

### Production

Build the application

```bash
npm run build
```

Serve generated static files

```bash
npm install --global serve
serve -s build
```
