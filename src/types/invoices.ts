import type { Amount, AnyCurrency } from "./common";

export type IssueInvoiceRequest = {
  correlationId?: string;
  description?: string;
  amount: Amount<AnyCurrency>;
};

export type Invoice = {
  invoiceId: string;
  amount: Amount<AnyCurrency>;
  state: "UNPAID" | "PENDING" | "PAID" | "CANCELLED";
  created: Date; // TODO: Verify that this is the actual type returned by the API.
  correlationId?: string;
  description?: string;
  issuerId: string;
  receiverId: string;
  payerId?: string;
};
