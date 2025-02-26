export const FIAT_CURRENCIES = ["USD", "EUR", "GBP"] as const;
export const ALL_CURRENCIES = [...FIAT_CURRENCIES, "BTC", "USDT"] as const;

export type FiatCurrency = (typeof FIAT_CURRENCIES)[number];
export type AnyCurrency = (typeof ALL_CURRENCIES)[number];

export type Amount<T extends string> = {
  amount: string;
  currency: T;
};

export const isFiatCurrency = (value: string): value is FiatCurrency => {
  return value in FIAT_CURRENCIES;
};

export const isAnyCurrency = (value: string): value is AnyCurrency => {
  return value in ALL_CURRENCIES;
};
