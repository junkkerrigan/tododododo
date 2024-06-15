"use client";

import { Form } from "@/src/components/Form/Form";
import { FC, use, useState } from "react";
import s from "./App.module.scss";
import { TodosList } from "@/src/components/TodosList/TodosList";
import { Todo } from "@/src/domain";
import { EssentialsContext } from "@/src/contexts/EssentialsContext";

type AppProps = {
  todos: Todo[];
};
export const App: FC<AppProps> = (props) => {
  const { todoService } = use(EssentialsContext);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [todos, setTodos] = useState<Todo[]>(props.todos);

  const refreshTodos = async () => {
    const freshTodos = await todoService.list();
    setTodos(freshTodos);
  };
  const handleFormSubmit = (newTodo: Todo) => {
    setIsFormOpen(false);
    refreshTodos();
  };

  const relevantTodos = todos.filter(({ isComplete }) => !isComplete);

  return (
    <div className={s.container}>
      <div className={s.header}>
        <h1 className={s.title}>TODODODODO</h1>
        <button className={s.addButton} onClick={() => setIsFormOpen(true)}>
          +
        </button>
      </div>

      <TodosList items={relevantTodos} onChange={refreshTodos} />
      {isFormOpen && (
        <Form
          onSuccessfulSubmit={handleFormSubmit}
          onDismiss={() => setIsFormOpen(false)}
        />
      )}
    </div>
  );
};
