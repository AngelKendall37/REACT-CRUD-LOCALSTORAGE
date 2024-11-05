import React, { useState, useEffect } from "react";
import "./TodoApp.css";

const TodoApp = () => {
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState("");
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(storedTasks);
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleSaveTask = () => {
    if (taskInput.trim()) {
      if (editIndex !== null) {
        const updatedTasks = [...tasks];
        updatedTasks[editIndex] = taskInput;
        setTasks(updatedTasks);
        setEditIndex(null);
      } else {
        setTasks([...tasks, taskInput]);
      }
      setTaskInput("");
    }
  };

  const handleEditTask = (index) => {
    setTaskInput(tasks[index]);
    setEditIndex(index);
  };

  const handleDeleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  return (
    <div className="container">
      <h1>Gestor de Tareas</h1>
      <input
        type="text"
        placeholder="Añade una nueva tarea"
        value={taskInput}
        onChange={(e) => setTaskInput(e.target.value)}
      />
      <button className="save" onClick={handleSaveTask}>
        {editIndex !== null ? "Actualizar" : "Guardar"}
      </button>
      <ul>
        {tasks.map((task, index) => (
          <li key={index}>
            {task}
            <button className="edit" onClick={() => handleEditTask(index)}>
              Editar
            </button>
            <button className="delete" onClick={() => handleDeleteTask(index)}>
              Eliminar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoApp;
