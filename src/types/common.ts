export const FIAT_CURRENCIES = ["USD", "EUR", "GBP"] as const;
export const ALL_CURRENCIES = [...FIAT_CURRENCIES, "BTC", "USDT"] as const;

export type FiatCurrency = (typeof FIAT_CURRENCIES)[number];
export type AnyCurrency = (typeof ALL_CURRENCIES)[number];

export type Amount<T extends string> = {
  amount: string;
  currency: T;
};
