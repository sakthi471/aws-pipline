import { useState } from "react";

function TodoItem({ todo, onToggle, onDelete, onEdit }) {
  const [editing, setEditing] = useState(false);
  const [draftTitle, setDraftTitle] = useState(todo.title);

  const saveEdit = async () => {
    const trimmed = draftTitle.trim();
    if (!trimmed || trimmed === todo.title) {
      setEditing(false);
      setDraftTitle(todo.title);
      return;
    }

    await onEdit(todo._id, trimmed);
    setEditing(false);
  };

  const handleKeyDown = async (event) => {
    if (event.key === "Enter") {
      await saveEdit();
    }

    if (event.key === "Escape") {
      setEditing(false);
      setDraftTitle(todo.title);
    }
  };

  return (
    <li className={`todo-item ${todo.completed ? "done" : ""}`}>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo)}
        aria-label={`Mark ${todo.title} as ${todo.completed ? "incomplete" : "complete"}`}
      />

      {editing ? (
        <input
          className="edit-input"
          type="text"
          value={draftTitle}
          onChange={(event) => setDraftTitle(event.target.value)}
          onBlur={saveEdit}
          onKeyDown={handleKeyDown}
          autoFocus
        />
      ) : (
        <span className="title" onDoubleClick={() => setEditing(true)}>
          {todo.title}
        </span>
      )}

      <div className="item-actions">
        <button type="button" onClick={() => setEditing((prev) => !prev)}>
          {editing ? "Cancel" : "Edit"}
        </button>
        <button
          type="button"
          className="danger"
          onClick={() => onDelete(todo._id)}
        >
          Delete
        </button>
      </div>
    </li>
  );
}

export default TodoItem;
