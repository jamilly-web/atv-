import React, { useState, useEffect } from "react";

function App() {
  const [tasks, setTasks] = useState(() => {
    return JSON.parse(localStorage.getItem("tasks")) || [];
  });
  const [input, setInput] = useState("");

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (input.trim() !== "") {
      setTasks([...tasks, { text: input, done: false }]);
      setInput("");
    }
  };

  const toggleTask = (index) => {
    const newTasks = [...tasks];
    newTasks[index].done = !newTasks[index].done;
    setTasks(newTasks);
  };

  const deleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  return (
    <div className="app">
      <h1>Minha TODO</h1>
      <div className="input-container">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Adicionar tarefa..."
        />
        <button onClick={addTask}>Adicionar</button>
      </div>
      <ul>
        {tasks.map((task, index) => (
          <li key={index} className={task.done ? "done" : ""}>
            <span onClick={() => toggleTask(index)}>{task.text}</span>
            <button onClick={() => deleteTask(index)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
