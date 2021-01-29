export const UNSUPPORTED_LIST_URLS: string[] = [];

const COMPOUND_LIST = 'https://raw.githubusercontent.com/compound-finance/token-list/master/compound.tokenlist.json';
const UMA_LIST = 'https://umaproject.org/uma.tokenlist.json';
const SET_LIST = 'https://raw.githubusercontent.com/SetProtocol/uniswap-tokenlist/main/set.tokenlist.json';
const OPYN_LIST = 'https://raw.githubusercontent.com/opynfinance/opyn-tokenlist/master/opyn-v1.tokenlist.json';
const ROLL_LIST = 'https://app.tryroll.com/tokens.json';
const COINGECKO_LIST = 'https://tokens.coingecko.com/uniswap/all.json';
const GEMINI_LIST = 'https://www.gemini.com/uniswap/manifest.json';

export const DEFAULT_LIST_OF_LISTS: string[] = [
  COMPOUND_LIST,
  UMA_LIST,
  SET_LIST,
  OPYN_LIST,
  ROLL_LIST,
  COINGECKO_LIST,
  GEMINI_LIST,
  ...UNSUPPORTED_LIST_URLS // need to load unsupported tokens as well
];

export const DEFAULT_ACTIVE_LIST_URLS: string[] = [GEMINI_LIST];
