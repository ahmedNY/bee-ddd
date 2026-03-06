import z from "zod";

import { publicProcedure } from "../index";
import { container } from "../modules/todo/di/container";
import { TYPES } from "../modules/todo/di/types";
import type { TodoService } from "../modules/todo/application/TodoService";

const todoService = container.get<TodoService>(TYPES.TodoService);

export const todoRouter = {
  getAll: publicProcedure.handler(async () => {
    return await todoService.getAllTodos();
  }),

  create: publicProcedure
    .input(z.object({ text: z.string().min(1) }))
    .handler(async ({ input }) => {
      return await todoService.createTodo({ text: input.text });
    }),

  toggle: publicProcedure
    .input(z.object({ id: z.number(), completed: z.boolean() }))
    .handler(async ({ input }) => {
      return await todoService.toggleTodo({
        id: input.id,
        completed: input.completed,
      });
    }),

  delete: publicProcedure
    .input(z.object({ id: z.number() }))
    .handler(async ({ input }) => {
      return await todoService.deleteTodo(input.id);
    }),
};
