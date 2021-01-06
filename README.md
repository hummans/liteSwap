# Luckyswap

[![Styled With Prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://prettier.io/)

An open source decentralized exchange of Ethereum tokens

<!-- - Website: []() -->
<!-- - Interface: []() -->
<!-- - Docs: []() -->

## Development

### Install Dependencies

```bash
yarn install
```

or

```bash
npm install
```

### Run

```bash
yarn start
```

or

```bash
npm start
```

### Configuring the environment (optional)

To have the interface default to a different network when a wallet is not connected:

1. Make a copy of `.env` named `.env.local`
2. Change `REACT_APP_NETWORK_ID` to `"{YOUR_NETWORK_ID}"`
3. Change `REACT_APP_NETWORK_URL` to e.g. `"https://{YOUR_NETWORK_ID}.infura.io/v3/{YOUR_INFURA_KEY}"`

## Contributions

**Open all pull requests against the `master` branch.**
CI checks will run against all PRs.
