import { useState } from "react";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import "./App.css";

function App() {
  const [refresh, setRefresh] = useState(false);

  const handleTodoAdded = () => {
    setRefresh((previous) => !previous);
  };

  return (
    <div className="app">

      <h1>Todo App</h1>

      <TodoForm
        onTodoAdded={handleTodoAdded}
      />

      <TodoList
        refresh={refresh}
      />

    </div>
  );
}

export default App;