import { Todo } from "../domain";
import { omitFalsy } from "../utils/omitFalsy";

export class TodoService {
  async list(criteria?: Partial<Todo>) {
    const url = createListRequestUrl(criteria);
    const response = await fetch(url);
    const { todos } = await response.json();

    return todos;
  }
  async create(params: Partial<Todo>) {
    const body = JSON.stringify(params);
    const response = await fetch("/api/todos", { method: "POST", body });
    const { todo } = await response.json();

    return todo;
  }

  async update(id: string, update: Partial<Todo>) {
    const body = JSON.stringify({ update });

    const response = await fetch(`/api/todos/${id}`, {
      method: "PATCH",
      body,
    });
    const { todo } = await response.json();

    return todo;
  }
}

const createListRequestUrl = (criteria?: Partial<Todo>) => {
  const url = new URL("/api/todos", window.location.origin);
  const searchParams = new URLSearchParams(omitFalsy(criteria ?? {}));
  url.search = searchParams.toString();

  return url.href;
};
