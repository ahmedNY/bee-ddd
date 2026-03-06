import "reflect-metadata";
import { inject, injectable } from "inversify";
import type { ProcessExtPaymentDTO } from "../../domain/Payment";
import { TYPES } from "../../di/types";
import type { PaymentsUseCase } from "../ports/in/PaymentsUseCase";
import type { SalesRepositoryPort } from "../ports/out/SalesRepositoryPort";

@injectable()
export class PaymentsService implements PaymentsUseCase {
  constructor(
    @inject(TYPES.SalesRepositoryPort)
    private readonly salesRepository: SalesRepositoryPort,
  ) {}

  async processExtPayment(args: ProcessExtPaymentDTO): Promise<void> {
    // 1. Find Invoice by Number
    const invoice = await this.salesRepository.findInvoiceByNumber(
      args.invoiceNumber,
    );

    if (!invoice) throw new Error("Invoice not found");

    // 2. Check Valid Status
    if (invoice.status === "paid" || invoice.status === "voided") {
      throw new Error("Invoice is already paid or voided");
    }

    // 3. Check Duplicate Transaction
    const existingPayment =
      await this.salesRepository.getPaymentByTransactionId(args.transactionId);

    if (existingPayment) {
      throw new Error("Duplicate transaction ID");
    }

    // 4. Verify Amount
    if (args.amount <= 0) {
      throw new Error("Invalid amount");
    }

    if (args.amount < invoice.balance) {
      throw new Error(
        `Insufficient amount. Due: ${invoice.balance}, Received: ${args.amount}`,
      );
    } else if (args.amount > invoice.balance) {
      // TODO: extra amount should be deposited  to customer account
    }

    // Validate bank
    const bank = await this.salesRepository.getBankById(args.bankId);

    if (!bank) throw new Error("Bank not found");

    // 5. Create Payment
    await this.salesRepository.createPayment({
      invoiceId: invoice.id,
      amount: args.amount,
      date: new Date(),
      method: "bank_transfer",
      bankId: bank.id,
      reference: args.transactionId,
      notes: `${bank.bankName} Payment Integration`,
    });

    // 6. Update Invoice
    await this.salesRepository.setInvoiceAsPaid({ status: "paid", balance: 0 });

    // TODO: add logs
  }
}
