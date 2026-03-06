import "reflect-metadata";
import { inject, injectable } from "inversify";
import type { TodoRepositoryPort } from "../ports/out/TodoRepositoryPort";
import type { Todo, CreateTodoDTO, ToggleTodoDTO } from "../../domain/Todo";
import { TYPES } from "../../di/types";
import type { TodoUseCase } from "../ports/in/TodoUseCase";

@injectable()
export class TodoService implements TodoUseCase {
  constructor(
    @inject(TYPES.TodoRepositoryPort)
    private readonly todoRepository: TodoRepositoryPort,
  ) {}

  public async getAllTodos(): Promise<Todo[]> {
    return this.todoRepository.findAll();
  }

  public async createTodo(data: CreateTodoDTO): Promise<void> {
    return this.todoRepository.create(data);
  }

  public async toggleTodo(data: ToggleTodoDTO): Promise<void> {
    return this.todoRepository.toggle(data);
  }

  public async deleteTodo(id: number): Promise<void> {
    return this.todoRepository.delete(id);
  }
}
