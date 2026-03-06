import type { Todo, CreateTodoDTO, ToggleTodoDTO } from "../../../domain/Todo";

export interface TodoUseCase {
  getAllTodos(): Promise<Todo[]>;
  createTodo(data: CreateTodoDTO): Promise<void>;
  toggleTodo(data: ToggleTodoDTO): Promise<void>;
  deleteTodo(id: number): Promise<void>;
}
