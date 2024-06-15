"use client";

import { use, useState, type FC } from "react";
import s from "./Form.module.scss";
import { Todo } from "@/src/domain";
import { EssentialsContext } from "@/src/contexts/EssentialsContext";

type FormProps = {
  onSuccessfulSubmit: (newTodo: Todo) => void;
  onDismiss: () => void;
};
export const Form: FC<FormProps> = ({ onSuccessfulSubmit, onDismiss }) => {
  const { todoService } = use(EssentialsContext);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async () => {
    const { todo } = await todoService.create({
      title,
      description,
    });

    onSuccessfulSubmit(todo);
    // TODO: show success confirmation
  };

  return (
    <div className={s.container}>
      <h2 className={s.title}>Create a new tododododo</h2>
      <form className={s.form} onSubmit={(e) => e.preventDefault()}>
        <label>
          Title:
          <input
            placeholder="Water the plants"
            className={s.input}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>
        <label>
          Description:
          <input
            className={s.input}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>
        <div className={s.buttonsContainer}>
          <button
            type="submit"
            className={s.createButton}
            onClick={handleSubmit}
          >
            Create
          </button>
          <button type="button" onClick={onDismiss}>
            Dismiss
          </button>
        </div>
      </form>
    </div>
  );
};
