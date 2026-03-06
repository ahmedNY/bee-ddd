import type { Todo, CreateTodoDTO, ToggleTodoDTO } from "../../../domain/Todo";

export interface TodoRepositoryPort {
  findAll(): Promise<Todo[]>;
  create(data: CreateTodoDTO): Promise<void>;
  toggle(data: ToggleTodoDTO): Promise<void>;
  delete(id: number): Promise<void>;
}
