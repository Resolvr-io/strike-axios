import type { AnyCurrency } from "./common";

export type CreateBankPaymentMethodRequest = {
  transferType: "ACH" | "US_DOMESTIC_WIRE" | "SEPA" | "FPS";
  accountNumber: string;
  routingNumber?: string;
  accountType?: "CHECKING" | "SAVINGS";
  bankName?: string;
  bankAddress?: Address;
  beneficiaries: Beneficiary[];
};

export type BankPaymentMethod = {
  id: string;
  state: "PENDING" | "READY" | "SUSPENDED" | "INVALID" | "INACTIVE";
  supportedActions: ("DEPOSIT" | "WITHDRAWAL")[];
  created: Date; // TODO: Verify that this is the actual type returned by the API.
  transferType: "ACH" | "US_DOMESTIC_WIRE" | "SEPA" | "FPS";
  accountNumber: string;
  routingNumber: string;
  referenceCode?: string;
  accountType?: "CHECKING" | "SAVINGS";
  bankName?: string;
  bankAddress?: Address;
  currency: AnyCurrency;
  beneficiaries: Beneficiary[];
};

type Address = {
  country: string;
  state?: string;
  city: string;
  postCode: string;
  line1: string;
};

type Beneficiary = IndividualBeneficiary | CompanyBeneficiary;

type IndividualBeneficiary = {
  dateOfBirth?: Date; // TODO: Verify that this is the actual type returned by the API.
  type: "INDIVIDUAL";
  name: string;
  address?: Address;
};

type CompanyBeneficiary = {
  email?: string;
  phoneNumber?: string;
  url?: string;
  type: "COMPANY";
  name: string;
  address?: Address;
};
