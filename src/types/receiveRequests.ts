import { AnyCurrency } from "./common";

export type ReceiveRequest = {
  receiveRequestId: string;
  created: Date; // TODO: Verify that this is the actual type returned by the API.
  targetCurrency?: AnyCurrency;
  bolt11?: {
    invoice: string;
    requestedAmount?: {
      amount: string;
      currency: AnyCurrency;
    };
    btcAmount?: string;
    description?: string;
    descriptionHash?: string;
    paymentHash: string;
    expires: Date; // TODO: Verify that this is the actual type returned by the API.
  };
  onchain?: {
    address: string;
    addressUri: string;
    requestedAmount?: {
      amount: string;
      currency: AnyCurrency;
    };
    btcAmount?: string;
  };
};

export type Receive = {
  receiveId: string;
  receiveRequestId: string;
  type: "LIGHTNING" | "ONCHAIN" | "P2P";
  state: "PENDING" | "COMPLETED";
  amountReceived: {
    amount: string;
    currency: AnyCurrency;
  };
  amountCredited?: {
    amount: string;
    currency: AnyCurrency;
  };
  conversionRate?: {
    amount: string;
    sourceCurrency: AnyCurrency;
    targetCurrency: AnyCurrency;
  };
  created: Date; // TODO: Verify that this is the actual type returned by the API.
  completed?: Date; // TODO: Verify that this is the actual type returned by the API.
  onchain?: {
    address: string;
    transactionId: string;
    blockHeight?: number;
    numberOfConfirmations?: number;
  };
  lightning?: {
    invoice: string;
    preimage: string;
    description?: string;
    descriptionHash?: string;
    paymentHash: string;
  };
  p2p?: {
    payerAccountId: string;
  };
};

export type CreateReceiveRequestRequest = {
  bolt11?: {
    amount?: {
      amount: string;
      currency: AnyCurrency;
    };
    description?: string;
    descriptionHash?: string;
    expiryInSeconds?: number;
  };
  onchain?: {
    amount?: {
      amount: string;
      currency: AnyCurrency;
    };
  };
  targetCurrency?: AnyCurrency;
};
