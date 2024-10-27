import { useState, useEffect } from "react";

const TodoItem = ({
  id,
  title,
  status,
  date,
  onDelete,
  onChangeStatus,
  onSaveEdit,
  isEditing,
  startEditing,
}) => {
  const [editTitle, setEditTitle] = useState(title);

  useEffect(() => setEditTitle(title), [title]); // to reflect the changes when {title} prop changes

  const handleSaveEdit = () => {
    onSaveEdit(id, editTitle);
  };

  return (
    <div className="todo-items" onDoubleClick={() => startEditing(id)}>
      <input
        type="checkbox"
        checked={status === "completed"}
        onChange={(e) => onChangeStatus(id, e.target.checked)}
      />
      {isEditing ? (
        <div className="editing-container">
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            autoFocus
          />
          <button onClick={handleSaveEdit} className="edit-save_button">
            Save
          </button>
        </div>
      ) : (
        <h3 className="todo-title">{title}</h3>
      )}

      <div className="todo-details">
        <span className="status-badge">{status}</span>
        <span className="todo-date">{date}</span>
      </div>
      <button onClick={() => onDelete(id)} className="delete-btn">
        Delete
      </button>
    </div>
  );
};

export default TodoItem;
