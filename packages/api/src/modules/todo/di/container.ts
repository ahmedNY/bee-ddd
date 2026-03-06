import "reflect-metadata";
import { Container } from "inversify";
import { TYPES } from "./types";
import type { TodoRepositoryPort } from "../application/ports/out/TodoRepositoryPort";
import { DrizzleTodoRepository } from "../infrastructure/adapters/out/persistence/DrizzleTodoRepository";
import { TodoService } from "../application/use-cases/TodoService";
import type { TodoUseCase } from "../application/ports/in/TodoUseCase";

const container = new Container();

container.bind<TodoRepositoryPort>(TYPES.TodoRepositoryPort).to(DrizzleTodoRepository);
container.bind<TodoUseCase>(TYPES.TodoUseCase).to(TodoService);

export { container };
