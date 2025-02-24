import type { Amount, FiatCurrency } from "./common";

export type CreatePayoutRequest = {
  paymentMethodId: string;
  originatorId?: string;
  amount: string;
  reference?: string;
};

export type Payout = {
  id: string;
  state: "NEW" | "INITIATED" | "COMPLETED" | "FAILED" | "REVERSED";
  created: Date; // TODO: Verify that this is the actual type returned by the API.
  paymentMethodId: string;
  originatorId?: string;
  amount: Amount<FiatCurrency>;
  fee?: Amount<FiatCurrency>;
  reference?: string;
  initiated?: Date; // TODO: Verify that this is the actual type returned by the API.
  completed?: Date; // TODO: Verify that this is the actual type returned by the API.
};
