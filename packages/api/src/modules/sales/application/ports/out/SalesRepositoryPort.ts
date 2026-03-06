import type { Bank } from "../../../domain/Bank";
import type { Invoice } from "../../../domain/Invoice";
import type {
  ProcessExtPaymentDTO,
  Payment,
  CreatePaymentDTO,
  UpdatePaymentDTO,
} from "../../../domain/Payment";

export interface SalesRepositoryPort {
  // INVOICE REPO
  findInvoiceByNumber(invoiceNumber: string): Promise<Invoice>;
  setInvoiceAsPaid(updatePaymentDto: UpdatePaymentDTO): Promise<number>;

  // PAYMENTS REPO
  getPaymentByTransactionId(transactionId: string): Promise<Payment | null>;
  createPayment(paymentDto: CreatePaymentDTO): Promise<number>;

  // BANKS REPO
  getBankById(bankId: number): Promise<Bank>;
}
