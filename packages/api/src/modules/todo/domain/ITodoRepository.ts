import type { Todo, CreateTodoDTO, ToggleTodoDTO } from "./Todo";

export interface ITodoRepository {
  findAll(): Promise<Todo[]>;
  create(data: CreateTodoDTO): Promise<void>;
  toggle(data: ToggleTodoDTO): Promise<void>;
  delete(id: number): Promise<void>;
}
