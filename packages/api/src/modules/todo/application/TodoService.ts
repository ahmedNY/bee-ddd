import "reflect-metadata";
import { inject, injectable } from "inversify";
import type { ITodoRepository } from "../domain/ITodoRepository";
import type { Todo, CreateTodoDTO, ToggleTodoDTO } from "../domain/Todo";
import { TYPES } from "../di/types";

@injectable()
export class TodoService {
  constructor(
    @inject(TYPES.TodoRepository)
    private readonly todoRepository: ITodoRepository,
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
