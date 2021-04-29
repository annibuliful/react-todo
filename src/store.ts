import { createStoreon, StoreonModule } from "storeon";
import { useStoreon } from "storeon/react"; // or storeon/preact
import { storeonDevtools } from "storeon/devtools";
type IStatus = "DONE" | "IN-PROGRESS" | "CANCEL";

interface ITodo {
  name: string;
  status: IStatus;
  id: string;
}

// State structure
interface State {
  todo: ITodo[];
}

// Events declaration: map of event names to type of event data
interface Events {
  addTodo: ITodo;
  removeTodo: string;
}

const counterModule: StoreonModule<State, Events> = (store) => {
  store.on("@init", () => ({ todo: [] }));
  store.on("addTodo", (state, newTodo) => ({
    ...state,
    todo: [...state.todo, newTodo],
  }));
  store.on("removeTodo", (state, id) => ({
    ...state,
    todo: state.todo.filter((todo) => todo.id !== id),
  }));
};

export const store = createStoreon<State, Events>([
  counterModule,
  process.env.NODE_ENV !== "production" && storeonDevtools,
]);

export const useStore = (keys: keyof State) => useStoreon<State, Events>(keys);
