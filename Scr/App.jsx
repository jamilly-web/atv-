import { useState } from "react";
import "./App.css";

function App() {
  const [task, setTask] = useState("");
  const [list, setList] = useState([]);

  const handleAdd = () => {
    if (task.trim() === "") return;

    const newTask = {
      id: Date.now(),
      text: task,
      done: false,
    };

    setList([...list, newTask]);
    setTask("");
  };

  const handleToggle = (id) => {
    setList(
      list.map((item) =>
        item.id === id ? { ...item, done: !item.done } : item
      )
    );
  };

  const handleDelete = (id) => {
    setList(list.filter((item) => item.id !== id));
  };

  return (
    <div className="container">
      <h1>Minha TODO</h1>

      <div className="input-area">
        <input
          type="text"
          placeholder="Digite uma tarefa..."
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />

        <button onClick={handleAdd}>Adicionar</button>
      </div>

      <ul>
        {list.map((item) => (
          <li key={item.id}>
            <input
              type="checkbox"
              checked={item.done}
              onChange={() => handleToggle(item.id)}
            />

            <span className={`task-text ${item.done ? "done" : ""}`}>
              {item.text}
            </span>

            <button className="delete-btn" onClick={() => handleDelete(item.id)}>
              Excluir
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
