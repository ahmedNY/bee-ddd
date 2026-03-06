import "reflect-metadata";
import { injectable } from "inversify";
import { db } from "@bee-ddd/db";
import { todo } from "@bee-ddd/db/schema/todo";
import { eq } from "drizzle-orm";
import type { ITodoRepository } from "../domain/ITodoRepository";
import type { Todo, CreateTodoDTO, ToggleTodoDTO } from "../domain/Todo";

@injectable()
export class DrizzleTodoRepository implements ITodoRepository {
  public async findAll(): Promise<Todo[]> {
    return await db.select().from(todo);
  }

  public async create(data: CreateTodoDTO): Promise<void> {
    await db.insert(todo).values({ text: data.text });
  }

  public async toggle(data: ToggleTodoDTO): Promise<void> {
    await db
      .update(todo)
      .set({ completed: data.completed })
      .where(eq(todo.id, data.id));
  }

  public async delete(id: number): Promise<void> {
    await db.delete(todo).where(eq(todo.id, id));
  }
}
