import { Todo } from "@/src/domain";
import { FC, use } from "react";
import s from "./TodosList.module.scss";
import { EssentialsContext } from "@/src/contexts/EssentialsContext";
import { Item } from "./Item";

type TodosListProps = {
  items: Todo[];
  onChange: () => any;
};

export const TodosList: FC<TodosListProps> = ({ items, onChange }) => {
  const { todoService } = use(EssentialsContext);

  const handleCompleteClick = (item: Todo) => async () => {
    await todoService.update(item, { isComplete: true });
    onChange();
  };

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
          onCompleteClick={handleCompleteClick(item)}
        />
      ))}
    </ul>
  );
};
