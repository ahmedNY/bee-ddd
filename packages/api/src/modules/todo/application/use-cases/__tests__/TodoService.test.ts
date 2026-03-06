import { describe, it, expect, vi, beforeEach } from "vitest";
import { TodoService } from "../TodoService";
import type { TodoRepositoryPort } from "../../ports/out/TodoRepositoryPort";
import type { Todo, CreateTodoDTO, ToggleTodoDTO } from "../../../../domain/Todo";

describe("TodoService", () => {
  let mockRepository: TodoRepositoryPort;
  let todoService: TodoService;

  beforeEach(() => {
    mockRepository = {
      findAll: vi.fn(),
      create: vi.fn(),
      toggle: vi.fn(),
      delete: vi.fn(),
    };
    // Bypass DI container — inject mock directly into constructor
    todoService = new TodoService(mockRepository);
  });

  describe("getAllTodos()", () => {
    it("returns all todos from the repository", async () => {
      const fakeTodos: Todo[] = [
        { id: 1, text: "Buy groceries", completed: false },
        { id: 2, text: "Walk the dog", completed: true },
      ];
      vi.mocked(mockRepository.findAll).mockResolvedValue(fakeTodos);

      const result = await todoService.getAllTodos();

      expect(result).toEqual(fakeTodos);
      expect(mockRepository.findAll).toHaveBeenCalledOnce();
    });

    it("returns an empty array when there are no todos", async () => {
      vi.mocked(mockRepository.findAll).mockResolvedValue([]);

      const result = await todoService.getAllTodos();

      expect(result).toEqual([]);
    });
  });

  describe("createTodo()", () => {
    it("delegates to repository with provided DTO", async () => {
      const dto: CreateTodoDTO = { text: "Learn Vitest" };
      vi.mocked(mockRepository.create).mockResolvedValue(undefined);

      await todoService.createTodo(dto);

      expect(mockRepository.create).toHaveBeenCalledOnce();
      expect(mockRepository.create).toHaveBeenCalledWith(dto);
    });

    it("propagates repository errors", async () => {
      vi.mocked(mockRepository.create).mockRejectedValue(new Error("DB write failed"));

      await expect(todoService.createTodo({ text: "fail" })).rejects.toThrow("DB write failed");
    });
  });

  describe("toggleTodo()", () => {
    it("delegates to repository with provided DTO", async () => {
      const dto: ToggleTodoDTO = { id: 1, completed: true };
      vi.mocked(mockRepository.toggle).mockResolvedValue(undefined);

      await todoService.toggleTodo(dto);

      expect(mockRepository.toggle).toHaveBeenCalledWith(dto);
    });
  });

  describe("deleteTodo()", () => {
    it("delegates to repository with the correct id", async () => {
      vi.mocked(mockRepository.delete).mockResolvedValue(undefined);

      await todoService.deleteTodo(42);

      expect(mockRepository.delete).toHaveBeenCalledWith(42);
    });
  });
});
