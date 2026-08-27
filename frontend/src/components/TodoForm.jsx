import { useState } from "react";
import { addTodo } from "../services/todoService";

function TodoForm({ onTodoAdded }) {
  const [title, setTitle] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim()) {
      alert("Please enter a Todo");
      return;
    }

    try {
      await addTodo({
        title: title,
        completed: false,
      });

      setTitle("");

      onTodoAdded();
    } catch (error) {
      console.error("Error adding Todo:", error);
      alert("Failed to add Todo");
    }
  };

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter your todo"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <button type="submit">
        Add Todo
      </button>
    </form>
  );
}

export default TodoForm;