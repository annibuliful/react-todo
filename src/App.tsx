import logo from "./logo.svg";
import "./App.css";
import React, { ChangeEvent } from "react";
import { ComponentA, ComponentB } from "./Test-Store";

type IStatus = "DONE" | "IN-PROGRESS" | "CANCEL";

interface ITodo {
  name: string;
  status: IStatus;
  id: number;
}
interface IState {
  todo: ITodo[];
  todoName: string;
}

interface IProps {}

const TODO_API = "http://localhost:4000/todos";

class App extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      todo: [],
      todoName: "",
    };
  }

  componentDidMount() {
    this.getAllTodos();
  }

  getAllTodos = async () => {
    const response = await fetch(TODO_API);

    const result = await response.json();
    this.setState({
      ...this.state,
      todo: result ?? [],
    });
  };

  addTodo = async () => {
    const temp: ITodo[] = [
      ...this.state.todo,
      {
        id: this.state.todo.length + 1,
        name: this.state.todoName,
        status: "IN-PROGRESS",
      },
    ];

    await fetch(TODO_API, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: this.state.todoName,
        status: "IN-PRGRESS",
        id: this.state.todo.length + 1,
      }),
    });

    this.setState({
      todo: temp,
      todoName: "",
    });
  };

  onChangeName = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({
      ...this.state,
      todoName: e.target.value,
    });
  };

  onDeleteTodo = async (id: number) => {
    this.setState((prev) => ({
      ...prev,
      todo: prev.todo.filter((todo) => todo.id !== id),
    }));
    await fetch(`${TODO_API}/${id}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
      },
    });
  };

  render() {
    return (
      <div>
        {/* <input value={this.state.todoName} onChange={this.onChangeName} />
        <button onClick={this.addTodo}>add new todo</button>
        {this.state.todo.map((todo, index) => (
          <div
            key={todo.name}
            onClick={() => {
              this.onDeleteTodo(index);
            }}
          >
            {todo.name}: {todo.status}
          </div>
        ))} */}

        <ComponentA />
        <ComponentB />
      </div>
    );
  }
}

export default App;
