const ChainId = {
  MAINNET: 1,
  RINKEBY: 4,
  ROPSTEN: 3,
  GÖRLI: 0,
  KOVAN: 0
};

export const DEFAULT_TOKEN_LIST_URL = 'https://www.coingecko.com/tokens_list/uniswap/defi_100/v_0_0_0.json';
export const ROUTER_ADDRESS = '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D';
export const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000';

export const LUCK = {
  [ChainId.MAINNET]: '',
  [ChainId.RINKEBY]: '',
  [ChainId.ROPSTEN]: '',
  [ChainId.GÖRLI]: '',
  [ChainId.KOVAN]: ''
};

export interface WalletInfo {
  connector?: string;
  name: string;
  iconName: string;
  description: string;
  href: string | null;
  color: string;
  primary?: true;
  mobile?: true;
  mobileOnly?: true;
}

export const SUPPORTED_WALLETS: { [key: string]: WalletInfo } = {
  METAMASK: {
    connector: '',
    name: 'MetaMask',
    iconName: 'metamask.png',
    description: 'Easy-to-use browser extension.',
    href: null,
    color: '#E8831D'
  },
  COINBASE_LINK: {
    name: 'Open in Coinbase Wallet',
    iconName: 'coinbaseWalletIcon.svg',
    description: 'Open in Coinbase Wallet app.',
    href: 'https://go.cb-w.com/mtUDhEZPy1',
    color: '#315CF5',
    mobile: true,
    mobileOnly: true
  }
};
