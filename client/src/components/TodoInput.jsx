import { useState } from "react";

function TodoInput({ onAdd, submitting }) {
  const [title, setTitle] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const trimmed = title.trim();
    if (!trimmed) {
      return;
    }

    await onAdd(trimmed);
    setTitle("");
  };

  return (
    <form className="todo-input" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Add a todo..."
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        disabled={submitting}
      />
      <button type="submit" disabled={submitting}>
        {submitting ? "Adding..." : "Add"}
      </button>
    </form>
  );
}

export default TodoInput;
