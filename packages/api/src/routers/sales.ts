import z from "zod";

import { publicProcedure } from "../index";
import { container } from "../modules/sales/di/container";
import { TYPES } from "../modules/sales/di/types";
import type { PaymentsUseCase } from "../modules/sales/application/ports/in/PaymentsUseCase";

const paymentsUseCase = container.get<PaymentsUseCase>(TYPES.PaymentsUseCase);

export const salesRouter = {
  makePayment: publicProcedure
    .input(
      z.object({
        invoiceNumber: z.string(),
        amount: z.number(),
        transactionId: z.string(),
        bankId: z.number(),
      }),
    )
    .handler(async ({ input }) => {
      return await paymentsUseCase.processExtPayment(input);
    }),
};
