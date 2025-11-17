import React, { useState, useEffect } from "react";

function App() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");

  const API_URL = "http://localhost:3000/api/tasks";

  // Carregar tarefas do backend
  const fetchTasks = async () => {
    const res = await fetch(API_URL);
    const data = await res.json();
    setTasks(data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const addTask = async () => {
    if (input.trim() === "") return;
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: input }),
    });
    const newTask = await res.json();
    setTasks([...tasks, newTask]);
    setInput("");
  };

  const toggleTask = async (id) => {
    const res = await fetch(`${API_URL}/${id}`, { method: "PUT" });
    const updatedTask = await res.json();
    setTasks(tasks.map(t => (t.id === id ? updatedTask : t)));
  };

  const deleteTask = async (id) => {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    setTasks(tasks.filter(t => t.id !== id));
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
        {tasks.map((task) => (
          <li key={task.id} className={task.done ? "done" : ""}>
            <span onClick={() => toggleTask(task.id)}>{task.text}</span>
            <button onClick={() => deleteTask(task.id)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
