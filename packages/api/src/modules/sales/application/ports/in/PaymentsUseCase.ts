import type { ProcessExtPaymentDTO } from "../../../domain/Payment";

export interface PaymentsUseCase {
  processExtPayment(data: ProcessExtPaymentDTO): Promise<void>;
}
