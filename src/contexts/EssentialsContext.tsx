"use client";

import { FC, ReactNode, createContext } from "react";
import { TodoService } from "../api/TodoService";

export type Essentials = {
  todoService: TodoService;
};
const defaultValue: Essentials = {
  todoService: new TodoService(),
};

export const EssentialsContext = createContext<Essentials>(defaultValue);

export const EssentialsContextProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  return (
    <EssentialsContext.Provider value={defaultValue}>
      {children}
    </EssentialsContext.Provider>
  );
};
