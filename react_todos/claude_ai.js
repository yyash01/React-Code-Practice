import React, { useState } from "react";
import { Trash2, CheckCircle, Circle, Check, X } from "lucide-react";

const TodoList = () => {
  const [todos, setTodos] = useState([
    {
      title: "Complete React Project",
      status: "pending",
      date: "2024-10-24",
    },
    {
      title: "Review Code Changes",
      status: "completed",
      date: "2024-10-23",
    },
    {
      title: "Update Documentation",
      status: "pending",
      date: "2024-10-25",
    },
    {
      title: "Team Meeting",
      status: "completed",
      date: "2024-10-22",
    },
  ]);

  const [editingIndex, setEditingIndex] = useState(null);
  const [editedTitle, setEditedTitle] = useState("");
  const [editedStatus, setEditedStatus] = useState("");

  const handleDelete = (index) => {
    setTodos(todos.filter((_, i) => i !== index));
  };

  const toggleStatus = (index) => {
    if (editingIndex !== null) return; // Prevent status toggle while editing
    setTodos(
      todos.map((todo, i) => {
        if (i === index) {
          return {
            ...todo,
            status: todo.status === "completed" ? "pending" : "completed",
          };
        }
        return todo;
      })
    );
  };

  const startEditing = (index) => {
    setEditingIndex(index);
    setEditedTitle(todos[index].title);
    setEditedStatus(todos[index].status);
  };

  const saveEdit = () => {
    setTodos(
      todos.map((todo, index) => {
        if (index === editingIndex) {
          return {
            ...todo,
            title: editedTitle,
            status: editedStatus,
          };
        }
        return todo;
      })
    );
    setEditingIndex(null);
  };

  const cancelEdit = () => {
    setEditingIndex(null);
  };

  return (
    <div className="todo-list-container">
      <h2 className="todo-header">My Todo List</h2>
      {todos.map((todo, index) => (
        <div
          key={index}
          className={`todo-item ${
            todo.status === "completed" ? "completed-item" : ""
          }`}
          onDoubleClick={() => startEditing(index)}
        >
          {editingIndex === index ? (
            // Editing Mode
            <div className="editing-container">
              <input
                type="text"
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
                className="edit-input"
                autoFocus
              />
              <select
                value={editedStatus}
                onChange={(e) => setEditedStatus(e.target.value)}
                className="status-select"
              >
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
              </select>
              <div className="edit-buttons">
                <button onClick={saveEdit} className="save-button">
                  <Check size={20} />
                </button>
                <button onClick={cancelEdit} className="cancel-button">
                  <X size={20} />
                </button>
              </div>
            </div>
          ) : (
            // Display Mode
            <>
              <div className="checkbox-wrapper">
                <button
                  className="checkbox-button"
                  onClick={() => toggleStatus(index)}
                >
                  {todo.status === "completed" ? (
                    <CheckCircle size={24} className="check-icon checked" />
                  ) : (
                    <Circle size={24} className="check-icon" />
                  )}
                </button>
              </div>

              <div className="todo-content">
                <h3 className="todo-title">{todo.title}</h3>
                <div className="todo-details">
                  <span
                    className={`status-badge ${
                      todo.status === "completed" ? "completed" : "pending"
                    }`}
                  >
                    {todo.status}
                  </span>
                  <span className="todo-date">{todo.date}</span>
                </div>
              </div>

              <button
                className="delete-button"
                onClick={() => handleDelete(index)}
              >
                <Trash2 size={20} />
              </button>
            </>
          )}
        </div>
      ))}

      <style>{`
        .todo-list-container {
          width: 100%;
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
        }

        .todo-header {
          font-size: 24px;
          color: #333;
          margin-bottom: 20px;
          text-align: center;
          font-weight: 600;
        }

        .todo-item {
          background: white;
          border-radius: 8px;
          padding: 16px;
          margin-bottom: 16px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          display: flex;
          justify-content: space-between;
          align-items: center;
          transition: all 0.3s ease;
          cursor: pointer;
        }

        .completed-item {
          background-color: #f8f9fa;
        }

        .completed-item .todo-title {
          text-decoration: line-through;
          color: #6c757d;
        }

        .editing-container {
          display: flex;
          gap: 12px;
          width: 100%;
          align-items: center;
        }

        .edit-input {
          flex: 1;
          padding: 8px 12px;
          border: 2px solid #007bff;
          border-radius: 4px;
          font-size: 16px;
        }

        .status-select {
          padding: 8px 12px;
          border: 2px solid #007bff;
          border-radius: 4px;
          background: white;
          cursor: pointer;
        }

        .edit-buttons {
          display: flex;
          gap: 8px;
        }

        .save-button, .cancel-button {
          padding: 8px;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .save-button {
          background-color: #28a745;
          color: white;
        }

        .save-button:hover {
          background-color: #218838;
        }

        .cancel-button {
          background-color: #dc3545;
          color: white;
        }

        .cancel-button:hover {
          background-color: #c82333;
        }

        .checkbox-wrapper {
          margin-right: 16px;
        }

        .checkbox-button {
          background: none;
          border: none;
          padding: 0;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.2s ease;
        }

        .checkbox-button:hover {
          transform: scale(1.1);
        }

        .check-icon {
          color: #6c757d;
        }

        .check-icon.checked {
          color: #28a745;
        }

        .todo-content {
          flex: 1;
        }

        .todo-title {
          margin: 0 0 8px 0;
          font-size: 18px;
          color: #333;
          font-weight: 600;
        }

        .todo-details {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .status-badge {
          padding: 4px 8px;
          border-radius: 4px;
          font-size: 14px;
          font-weight: 500;
        }

        .status-badge.completed {
          background-color: #e6f4ea;
          color: #1e7e34;
        }

        .status-badge.pending {
          background-color: #fff3e0;
          color: #f57c00;
        }

        .todo-date {
          font-size: 14px;
          color: #666;
        }

        .delete-button {
          background: none;
          border: none;
          color: #dc3545;
          cursor: pointer;
          padding: 8px;
          border-radius: 4px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
        }

        .delete-button:hover {
          background-color: #ffebee;
          color: #c62828;
        }

        .delete-button:focus {
          outline: none;
          box-shadow: 0 0 0 2px rgba(220, 53, 69, 0.2);
        }
      `}</style>
    </div>
  );
};

export default TodoList;
