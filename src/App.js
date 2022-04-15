import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";

function App() {
  const [todoTitle, setTodoTitle] = useState("");
  const [todoList, setTodoList] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editableTodo, setEditableTodo] = useState(null);
  const createTodoHandler = () => {
    if (todoTitle) {
      const newTodo = {
        id: Date.now(),
        title: todoTitle,
        isComplete: false,
      };

      setTodoList([...todoList, newTodo]);
      setTodoTitle("");
    } else {
      alert("Please Enter a valid Title");
    }
  };
  const deleteTodoHandler = (id) => {
    const newTodoList = todoList.filter((item) => item.id !== id);
    setTodoList(newTodoList);
  };
  const editTodoHandler = (id) => {
    const todoToBeEdited = todoList.find((item) => item.id === id);
    setEditMode(true);
    setEditableTodo(todoToBeEdited);
    setTodoTitle(todoToBeEdited.title);
  };
  const updateTodoHandler = () => {
    setTodoList(todoList.map((todo) => {
        if (todo.id === editableTodo.id) {
          todo.title = todoTitle;
        console.log(todo.title);
        }
        return todo; 
      })
    );
    setEditMode(false);
    setTodoTitle("")
    setEditableTodo(null)  
  };

  return (
    <div className="App">
      <div class="todo">
        <input type="text" value={todoTitle} onChange={(event) => setTodoTitle(event.target.value)}></input>
        <button
          onClick={() => {
            editMode ? updateTodoHandler() : createTodoHandler()
          }}
        >
          {editMode ? "Update Todo" : "Add Todo"}
        </button>
        <ul class="todo-list">
          {todoList.map((todo) => (
            <span>
              <li>
                {todo.title}
                <button onClick={() => editTodoHandler(todo.id)}>Edit</button>
                <button onClick={() => deleteTodoHandler(todo.id)}>Delete</button>
              </li>
            </span>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
