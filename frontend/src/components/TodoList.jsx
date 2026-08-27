import { useEffect, useState } from "react";

import {
  getAllTodos,
  deleteTodo,
  updateTodo,
} from "../services/todoService";

function TodoList({ refresh }) {

  const [todos, setTodos] = useState([]);

  // Stores which Todo is currently being edited
  const [editingId, setEditingId] = useState(null);

  // Stores the edited title
  const [editTitle, setEditTitle] = useState("");


  // Get all todos
  useEffect(() => {
    loadTodos();
  }, [refresh]);


  const loadTodos = async () => {
    try {

      const data = await getAllTodos();

      setTodos(data);

    } catch (error) {

      console.error("Error loading todos:", error);

    }
  };


  // -------------------------
  // DELETE
  // -------------------------

  const handleDelete = async (id) => {

    try {

      await deleteTodo(id);

      setTodos((previousTodos) =>
        previousTodos.filter((todo) => todo.id !== id)
      );

    } catch (error) {

      console.error("Error deleting Todo:", error);

      alert("Failed to delete Todo");

    }
  };


  // -------------------------
  // COMPLETE / INCOMPLETE
  // -------------------------

  const handleComplete = async (todo) => {

    try {

      const updatedTodo = {
        title: todo.title,
        completed: !todo.completed,
      };

      const result = await updateTodo(
        todo.id,
        updatedTodo
      );

      setTodos((previousTodos) =>
        previousTodos.map((item) =>
          item.id === todo.id ? result : item
        )
      );

    } catch (error) {

      console.error("Error updating Todo:", error);

      alert("Failed to update Todo");

    }
  };


  // -------------------------
  // START EDIT
  // -------------------------

  const handleEdit = (todo) => {

    setEditingId(todo.id);

    setEditTitle(todo.title);

  };


  // -------------------------
  // CANCEL EDIT
  // -------------------------

  const handleCancel = () => {

    setEditingId(null);

    setEditTitle("");

  };


  // -------------------------
  // SAVE EDIT
  // -------------------------

  const handleSave = async (todo) => {

    if (!editTitle.trim()) {

      alert("Title cannot be empty");

      return;
    }

    try {

      const updatedTodo = {
        title: editTitle,
        completed: todo.completed,
      };

      const result = await updateTodo(
        todo.id,
        updatedTodo
      );

      setTodos((previousTodos) =>
        previousTodos.map((item) =>
          item.id === todo.id ? result : item
        )
      );

      setEditingId(null);

      setEditTitle("");

    } catch (error) {

      console.error("Error editing Todo:", error);

      alert("Failed to edit Todo");

    }
  };


  return (
    <div className="todo-list">

      <h2>My Todos</h2>


      {todos.length === 0 ? (

        <p>No Todos found.</p>

      ) : (

        todos.map((todo) => (

          <div
            className="todo-item"
            key={todo.id}
          >

            {editingId === todo.id ? (

              // =========================
              // EDIT MODE
              // =========================

              <div>

                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) =>
                    setEditTitle(e.target.value)
                  }
                />

                <button
                  onClick={() => handleSave(todo)}
                >
                  Save
                </button>

                <button
                  onClick={handleCancel}
                >
                  Cancel
                </button>

              </div>

            ) : (

              // =========================
              // NORMAL MODE
              // =========================

              <>

                <div>

                  <h3>{todo.title}</h3>

                  <p>
                    Status:{" "}
                    {todo.completed
                      ? "Completed"
                      : "Not Completed"}
                  </p>

                </div>


                <div className="todo-buttons">

                  <button
                    onClick={() =>
                      handleComplete(todo)
                    }
                  >
                    {todo.completed
                      ? "Mark Incomplete"
                      : "Complete"}
                  </button>


                  <button
                    onClick={() =>
                      handleEdit(todo)
                    }
                  >
                    Edit
                  </button>


                  <button
                    onClick={() =>
                      handleDelete(todo.id)
                    }
                  >
                    Delete
                  </button>

                </div>

              </>

            )}

          </div>

        ))

      )}

    </div>
  );
}

export default TodoList;