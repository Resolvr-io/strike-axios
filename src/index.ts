import axios, { AxiosInstance } from "axios";

import type {
  BankPaymentMethod,
  CreateBankPaymentMethodRequest,
} from "./types/bankPaymentMethods";
import {
  FIAT_CURRENCIES,
  ALL_CURRENCIES,
  FiatCurrency,
  AnyCurrency,
  Amount,
  isFiatCurrency,
  isAnyCurrency,
  tryToFiatCurrency,
  tryToAnyCurrency,
  PaginationList,
} from "./types/common";
import type { Invoice, IssueInvoiceRequest } from "./types/invoices";
import type { CreatePayoutRequest, Payout } from "./types/payouts";
import {
  CreateReceiveRequestRequest,
  Receive,
  ReceiveRequest,
} from "./types/receiveRequests";

export type { BankPaymentMethod, CreateBankPaymentMethodRequest };
export type {
  FIAT_CURRENCIES,
  ALL_CURRENCIES,
  FiatCurrency,
  AnyCurrency,
  Amount,
  isFiatCurrency,
  isAnyCurrency,
  tryToFiatCurrency,
  tryToAnyCurrency,
  PaginationList,
};
export type { Invoice, IssueInvoiceRequest };
export type { CreatePayoutRequest, Payout };
export type { CreateReceiveRequestRequest, Receive, ReceiveRequest };

export class StrikeAxios {
  private axiosInstance: AxiosInstance;

  constructor(strikeApiKey: string) {
    this.axiosInstance = axios.create({
      baseURL: "https://api.strike.me/v1/",
      timeout: 10000,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${strikeApiKey}`,
      },
    });
  }

  public async issueInvoice(request: IssueInvoiceRequest): Promise<Invoice> {
    return (await this.axiosInstance.post<Invoice>("invoices", request)).data;
  }

  public async findInvoiceById(
    invoiceId: string,
  ): Promise<Invoice | undefined> {
    const response = await this.axiosInstance.get<Invoice>(
      `invoices/${invoiceId}`,
      {
        // If the status is 404, don't throw an error. We'll return undefined instead.
        validateStatus: (status) => {
          return (status >= 200 && status < 300) || status === 404;
        },
      },
    );

    if (response.status === 404) {
      return undefined;
    } else {
      return response.data;
    }
  }

  public async cancelUnpaidInvoice(invoiceId: string): Promise<Invoice> {
    return (
      await this.axiosInstance.patch<Invoice>(`invoices/${invoiceId}/cancel`)
    ).data;
  }

  public async getBankPaymentMethodById(
    bankPaymentMethodId: string,
  ): Promise<BankPaymentMethod | undefined> {
    const response = await this.axiosInstance.get<BankPaymentMethod>(
      `payment-methods/bank/${bankPaymentMethodId}`,
      {
        // If the status is 404, don't throw an error. We'll return undefined instead.
        validateStatus: (status) => {
          return (status >= 200 && status < 300) || status === 404;
        },
      },
    );

    if (response.status === 404) {
      return undefined;
    } else {
      return response.data;
    }
  }

  public async deleteBankPaymentMethod(
    bankPaymentMethodId: string,
  ): Promise<void> {
    await this.axiosInstance.delete(
      `payment-methods/bank/${bankPaymentMethodId}`,
    );
  }

  public async createBankPaymentMethod(
    request: CreateBankPaymentMethodRequest,
  ): Promise<BankPaymentMethod> {
    return (
      await this.axiosInstance.post<BankPaymentMethod>(
        "payment-methods/bank",
        request,
      )
    ).data;
  }

  public async createPayout(request: CreatePayoutRequest): Promise<Payout> {
    return (await this.axiosInstance.post<Payout>("payouts", request)).data;
  }

  public async findPayoutById(payoutId: string): Promise<Payout | undefined> {
    const response = await this.axiosInstance.get<Payout>(
      `payouts/${payoutId}`,
      {
        // If the status is 404, don't throw an error. We'll return undefined instead.
        validateStatus: (status) => {
          return (status >= 200 && status < 300) || status === 404;
        },
      },
    );

    if (response.status === 404) {
      return undefined;
    } else {
      return response.data;
    }
  }

  public async initiatePayout(payoutId: string): Promise<Payout> {
    return (
      await this.axiosInstance.patch<Payout>(`payouts/${payoutId}/initiate`)
    ).data;
  }

  public async findReceiveRequestById(
    receiveRequestId: string,
  ): Promise<ReceiveRequest | undefined> {
    const response = await this.axiosInstance.get<ReceiveRequest>(
      `receive-requests/${receiveRequestId}`,
      {
        // If the status is 404, don't throw an error. We'll return undefined instead.
        validateStatus: (status) => {
          return (status >= 200 && status < 300) || status === 404;
        },
      },
    );

    if (response.status === 404) {
      return undefined;
    } else {
      return response.data;
    }
  }

  public async createReceiveRequest(
    request: CreateReceiveRequestRequest,
  ): Promise<ReceiveRequest> {
    return (
      await this.axiosInstance.post<ReceiveRequest>("receive-requests", request)
    ).data;
  }

  // TODO: Add support for query parameters.
  public async getReceivesForReceiveRequest(
    receiveRequestId: string,
  ): Promise<PaginationList<Receive> | undefined> {
    const response = await this.axiosInstance.get<PaginationList<Receive>>(
      `receive-requests/${receiveRequestId}/receives`,
      {
        // If the status is 404, don't throw an error. We'll return undefined instead.
        validateStatus: (status) => {
          return (status >= 200 && status < 300) || status === 404;
        },
      },
    );

    if (response.status === 404) {
      return undefined;
    } else {
      return response.data;
    }
  }
}
