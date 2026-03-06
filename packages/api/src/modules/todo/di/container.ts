import "reflect-metadata";
import { Container } from "inversify";
import { TYPES } from "./types";
import type { ITodoRepository } from "../domain/ITodoRepository";
import { DrizzleTodoRepository } from "../infrastructure/DrizzleTodoRepository";
import { TodoService } from "../application/TodoService";

const container = new Container();

container.bind<ITodoRepository>(TYPES.TodoRepository).to(DrizzleTodoRepository);
container.bind<TodoService>(TYPES.TodoService).to(TodoService);

export { container };
