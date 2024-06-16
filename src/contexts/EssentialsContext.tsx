"use client";

import { FC, ReactNode, createContext } from "react";
import { TodoService } from "../api/TodoService";
import { AudioRecorder } from "../infra/AudioRecorder";

export type Essentials = {
  todoService: TodoService;
  audioRecorder: AudioRecorder;
};
const defaultValue: Essentials = {
  todoService: new TodoService(),
  audioRecorder: new AudioRecorder(),
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
