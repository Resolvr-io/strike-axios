export const FIAT_CURRENCIES = ["USD", "EUR", "GBP"] as const;
export const ALL_CURRENCIES = [...FIAT_CURRENCIES, "BTC", "USDT"] as const;

export type FiatCurrency = (typeof FIAT_CURRENCIES)[number];
export type AnyCurrency = (typeof ALL_CURRENCIES)[number];

export type Amount<T extends string> = {
  amount: string;
  currency: T;
};

export const tryToFiatCurrency = (value: string): FiatCurrency | undefined => {
  if ((FIAT_CURRENCIES as readonly string[]).indexOf(value) !== -1) {
    return value as FiatCurrency;
  }
};

export const tryToAnyCurrency = (value: string): AnyCurrency | undefined => {
  if ((ALL_CURRENCIES as readonly string[]).indexOf(value) !== -1) {
    return value as AnyCurrency;
  }
};
