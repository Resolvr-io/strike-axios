export type FiatCurrency = "USD" | "EUR" | "GBP";
export type AnyCurrency = FiatCurrency | "BTC" | "USDT";

export type Amount<T extends string> = {
  amount: string;
  currency: T;
};
