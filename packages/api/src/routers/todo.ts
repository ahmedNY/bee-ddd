import z from "zod";

import { publicProcedure } from "../index";
import { container } from "../modules/todo/di/container";
import { TYPES } from "../modules/todo/di/types";
import type { TodoUseCase } from "../modules/todo/application/ports/in/TodoUseCase";

const todoUseCase = container.get<TodoUseCase>(TYPES.TodoUseCase);

export const todoRouter = {
  getAll: publicProcedure.handler(async () => {
    return await todoUseCase.getAllTodos();
  }),

  create: publicProcedure
    .input(z.object({ text: z.string().min(1) }))
    .handler(async ({ input }) => {
      return await todoUseCase.createTodo({ text: input.text });
    }),

  toggle: publicProcedure
    .input(z.object({ id: z.number(), completed: z.boolean() }))
    .handler(async ({ input }) => {
      return await todoUseCase.toggleTodo({
        id: input.id,
        completed: input.completed,
      });
    }),

  delete: publicProcedure
    .input(z.object({ id: z.number() }))
    .handler(async ({ input }) => {
      return await todoUseCase.deleteTodo(input.id);
    }),
};
