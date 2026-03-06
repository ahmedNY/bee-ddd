export interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

export type CreateTodoDTO = {
  text: string;
};

export type ToggleTodoDTO = {
  id: number;
  completed: boolean;
};
