export interface Payment {
  invoiceId: number;
  amount: number;
  date: string;
  method: "cash" | "bank_transfer" | "check" | "other";
  reference: string;
  notes: string;
  bankId: string;
}

export type ProcessExtPaymentDTO = {
  invoiceNumber: string;
  amount: number;
  transactionId: string;
  bankId: number;
};

export type CreatePaymentDTO = {
  invoiceId: number;
  amount: number;
  date: Date;
  method: string;
  bankId: number;
  reference: string;
  notes: string;
};

export type UpdatePaymentDTO = {
  status: string;
  balance: number;
};
