import TodoItem from "./TodoItem";

function TodoList({ todos, onToggle, onDelete, onEdit }) {
  if (todos.length === 0) {
    return <p className="status">No todos yet. Add your first task.</p>;
  }

  return (
    <ul className="todo-list">
      {todos.map((todo) => (
        <TodoItem
          key={todo._id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </ul>
  );
}

export default TodoList;
