import "reflect-metadata";
import { Container } from "inversify";
import { TYPES } from "./types";
import type { SalesRepositoryPort } from "../application/ports/out/SalesRepositoryPort";
import { MockSalesRepository } from "../infrastructure/adapters/out/persistence/DrizzleTodoRepository";
import type { PaymentsUseCase } from "../application/ports/in/PaymentsUseCase";
import { PaymentsService } from "../application/use-cases/PaymentsService";

const container = new Container();

container
  .bind<SalesRepositoryPort>(TYPES.SalesRepositoryPort)
  .to(MockSalesRepository);
container.bind<PaymentsUseCase>(TYPES.PaymentsUseCase).to(PaymentsService);

export { container };
