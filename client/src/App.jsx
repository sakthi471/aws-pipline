import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";
import "./App.css";

function App() {
  const apiUrl = useMemo(
    () => import.meta.env.VITE_API_URL || "http://localhost:5000/api",
    [],
  );

  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const fetchTodos = async () => {
    try {
      setLoading(true);
      setError("");
      const response = await axios.get(`${apiUrl}/todos`);
      setTodos(response.data);
    } catch (err) {
      setError(err.response?.data?.message || "Unable to load todos.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const addTodo = async (title) => {
    try {
      setSubmitting(true);
      setError("");
      const response = await axios.post(`${apiUrl}/todos`, { title });
      setTodos((prev) => [response.data, ...prev]);
    } catch (err) {
      setError(err.response?.data?.message || "Unable to add todo.");
    } finally {
      setSubmitting(false);
    }
  };

  const toggleTodo = async (todo) => {
    try {
      setError("");
      const response = await axios.put(`${apiUrl}/todos/${todo._id}`, {
        completed: !todo.completed,
      });
      setTodos((prev) =>
        prev.map((item) => (item._id === todo._id ? response.data : item)),
      );
    } catch (err) {
      setError(err.response?.data?.message || "Unable to update todo.");
    }
  };

  const deleteTodo = async (id) => {
    try {
      setError("");
      await axios.delete(`${apiUrl}/todos/${id}`);
      setTodos((prev) => prev.filter((todo) => todo._id !== id));
    } catch (err) {
      setError(err.response?.data?.message || "Unable to delete todo.");
    }
  };

  const editTodo = async (id, title) => {
    try {
      setError("");
      const response = await axios.put(`${apiUrl}/todos/${id}`, { title });
      setTodos((prev) =>
        prev.map((item) => (item._id === id ? response.data : item)),
      );
    } catch (err) {
      setError(err.response?.data?.message || "Unable to edit todo.");
    }
  };

  return (
    <main className="app-shell">
      <section className="todo-card">
        <h1>Todo App</h1>
        <p className="subtitle">
          Track tasks with a React + Express + MongoDB stack.
        </p>

        <TodoInput onAdd={addTodo} submitting={submitting} />

        {error && <p className="status error">{error}</p>}
        {loading ? (
          <p className="status">Loading todos...</p>
        ) : (
          <TodoList
            todos={todos}
            onToggle={toggleTodo}
            onDelete={deleteTodo}
            onEdit={editTodo}
          />
        )}
      </section>
    </main>
  );
}

export default App;
