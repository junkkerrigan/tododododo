import { Todo } from "@/src/domain";
import { FC } from "react";
import s from "./TodosList.module.scss";
import { Item } from "./Item/Item";

type TodosListProps = {
  items: Todo[];
  onItemChange: (id: string, update: Partial<Todo>) => any;
};

export const TodosList: FC<TodosListProps> = ({ items, onItemChange }) => {
  return (
    <ul className={s.list}>
      {items.length === 0 && (
        <p className={s.emptyMessage}>
          Looks like everything is done
          <span className={s.emoji}>🎉</span>
          <br />
          Kick back and relax (or create a new todo!)
        </p>
      )}
      {items.map((item) => (
        <Item
          key={item.id}
          item={item}
          onChange={(update) => onItemChange(item.id, update)}
        />
      ))}
    </ul>
  );
};
