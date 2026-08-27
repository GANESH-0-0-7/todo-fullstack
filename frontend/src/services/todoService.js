const API_URL = "http://localhost:8080";

export const getAllTodos = async () => {
  const response = await fetch(`${API_URL}/getAllTodos`);

  if (!response.ok) {
    throw new Error("Failed to fetch todos");
  }

  return response.json();
};

export const getTodoById = async (id) => {
  const response = await fetch(`${API_URL}/getTodo/${id}`);

  if (!response.ok) {
    throw new Error("Todo not found");
  }

  return response.json();
};

export const addTodo = async (todo) => {
  const response = await fetch(`${API_URL}/addTodo`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(todo),
  });

  if (!response.ok) {
    throw new Error("Failed to add todo");
  }
};

export const updateTodo = async (id, todo) => {
  const response = await fetch(`${API_URL}/updateTodo/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(todo),
  });

  if (!response.ok) {
    throw new Error("Failed to update todo");
  }

  return response.json();
};

export const deleteTodo = async (id) => {
  const response = await fetch(`${API_URL}/deleteTodo/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete todo");
  }
};