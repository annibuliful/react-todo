import { nanoid } from "nanoid";
import { useStore } from "./store";

export const ComponentA = () => {
  const { dispatch, todo } = useStore("todo");

  const onAddNewTodo = () => {
    dispatch("addTodo", {
      name: nanoid(),
      status: "IN-PROGRESS",
      id: nanoid(),
    });
  };
  return (
    <div>
      <button onClick={onAddNewTodo}>Add new</button>
    </div>
  );
};

export const ComponentB = () => {
  const { todo } = useStore("todo");

  return (
    <div>
      {todo.map((todo, index) => (
        <div key={todo.name}>
          {todo.name}: {todo.status}
        </div>
      ))}
    </div>
  );
};
