import "reflect-metadata";
import { injectable } from "inversify";

import type {
  CreatePaymentDTO,
  Payment,
  UpdatePaymentDTO,
} from "../../../../domain/Payment";
import type { SalesRepositoryPort } from "../../../../application/ports/out/SalesRepositoryPort";
import type { Bank } from "../../../../domain/Bank";
import type { Invoice } from "../../../../domain/Invoice";

@injectable()
export class MockSalesRepository implements SalesRepositoryPort {
  findInvoiceByNumber(invoiceNumber: string): Promise<Invoice> {
    return Promise.resolve({
      id: 1,
      balance: 100,
      status: "paid",
    });
  }
  setInvoiceAsPaid(updatePaymentDto: UpdatePaymentDTO): Promise<number> {
    return Promise.resolve(10);
  }

  getPaymentByTransactionId(transactionId: string): Promise<Payment | null> {
    return Promise.resolve(null);
  }

  createPayment(paymentDto: CreatePaymentDTO): Promise<number> {
    return Promise.resolve(333);
  }
  getBankById(bankId: number): Promise<Bank> {
    return Promise.resolve({ bankName: "Bank Test", id: 3 });
  }
}
