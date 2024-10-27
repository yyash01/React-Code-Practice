import { useRef, useState, useEffect } from "react";
import TodoItem from "./TodoItem";

const Todo = () => {
  const [todos, setTodos] = useState(
    JSON.parse(localStorage.getItem("todos")) || []
  );
  const [editTodo, setEditTodo] = useState(null); //{id} of the current editing Todo_item
  const itemTitle = useRef("");
  const itemStatus = useRef("");

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodoItem = () => {
    const title = itemTitle.current.value.trim(); // there should be no extra spaces - to handle white spaces inputs
    const status = itemStatus.current.value.trim();

    if (!title) {
      alert("title is empty");
      return;
    }

    if (!status) {
      alert("status is empty");
      return;
    }

    //now inside the addtodoItem function we will update the todos List
    //I will push a new object i.e the current todoItem inside the todos List.
    //so to update the array as a new state -> we create a new array and add the new item into it
    const newTodos = [
      ...todos, //spreaded all the elements of the todo Array
      {
        title: itemTitle.current.value,
        status: itemStatus.current.value,
        date: new Date().toDateString(),
      },
    ];
    console.log(newTodos);
    setTodos(newTodos);

    //clear the input field
    itemTitle.current.value = "";
    itemStatus.current.value = "";
  };

  const handleDelete = (index) => {
    //now we will use filter = it basically return elements that follow that condition in the callback function
    const updatedTodos = todos.filter((_, i) => i !== index);
    setEditTodo(null);
    setTodos(updatedTodos);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      addTodoItem();
    }
  };

  //toggleStatus : We have to change the status of todo_item having i = index
  const toggleStatus = (index, currStatus) => {
    //if status = false : status of todo_item is = pending
    //if status =  true : status of todo_item is = completed

    const updatedTodo = todos.map((todo, i) => {
      if (i === index) {
        //this is the todo_item whose status is to be updated

        //DOUBT : i am having the doubt that - kya mujhe ek nya object bnana pdega inside the array of object as state ?
        //ANSWER : bna lo to remain at safer side - Because in React we cannot directly make changes to the existing state
        return {
          ...todo, //spread old properties
          status: currStatus ? "completed" : "pending", //override status property
        };
      }
      return todo;
    });

    setTodos(updatedTodo);
  };

  //editing the TodoItem
  const startEditing = (indexOfTodo) => {
    setEditTodo(indexOfTodo);
  };

  const saveTodoEdit = (index, editedTitle) => {
    //check editedTitle Valid or not
    if (!editedTitle.trim()) {
      alert("Title Cannot be Empty");
      return;
    }
    const updatedTodos = todos.map((todo, i) => {
      if (i === index) {
        return {
          ...todo,
          title: editedTitle.trim(),
        };
      }
      return todo;
    });
    setEditTodo(null); //if we have successfully edited the todo Remove it from current Edit Todo_item
    setTodos(updatedTodos);
  };

  return (
    <div className="todo">
      <div className="todo-input">
        <label title="add the title of task">Title</label>
        <input
          type="text"
          placeholder="add the title"
          ref={itemTitle}
          onKeyDown={handleKeyDown}
        />
        <label title="add the status of task">Status</label>
        <select className="options" ref={itemStatus} onKeyDown={handleKeyDown}>
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
        </select>
        <button className="btn" onClick={addTodoItem}>
          Add Item
        </button>
      </div>
      {todos.length > 0 ? (
        <div className="todo-list-container">
          {todos.map((todo, index) => {
            return (
              <TodoItem
                key={index}
                id={index}
                {...todo}
                onDelete={handleDelete}
                onChangeStatus={toggleStatus}
                onSaveEdit={saveTodoEdit}
                isEditing={editTodo === index} //check is this todo is in Editing state or not.
                startEditing={startEditing}
              />
            );
          })}
        </div>
      ) : (
        <div className="todo-list-container">No todos Available</div>
      )}
    </div>
  );
};

export default Todo;
