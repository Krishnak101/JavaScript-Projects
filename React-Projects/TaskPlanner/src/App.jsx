import React, { useState, useEffect } from "react";
import "./App.css";
import TaskForm from "./components/TaskForm";
import TaskColumn from "./components/TaskColumn";
import TodoIcon from "./assets/target.jpg";
import DoingIcon from "./assets/arrows.png";
import DoneIcon from "./assets/checkMark.jpg";

const oldStorage = localStorage.getItem("tasks");
const App = () => {
  const [tasks, setTasks] = useState(() => {
    try {
      return oldStorage ? JSON.parse(oldStorage) : [];
    } catch (e) {
      console.error("Error with storage: ", oldStorage, "/n error: ", e);
      return [];
    }
  });
  const [activeCard, setActiveCard] = useState(null);
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleDelete = (taskIndex) => {
    const finalTasks = tasks.filter((task, index) => index != taskIndex);
    setTasks(finalTasks);
  };

  const onDrop = (status, position) => {
    const movedTask = tasks[activeCard];
    const updatedTasks = tasks.filter((task, index) => index != activeCard);
    updatedTasks.splice(position, 0, { ...movedTask, status: status });
    setTasks(updatedTasks);
  };
  return (
    <div>
      <TaskForm setTasks={setTasks} />
      <main className="main_app">
        <TaskColumn
          imageLogo={TodoIcon}
          taskStatus="To Do"
          tasks={tasks}
          status="todo"
          handleDelete={handleDelete}
          setActiveCard={setActiveCard}
          onDrop={onDrop}
        ></TaskColumn>
        <TaskColumn
          imageLogo={DoingIcon}
          taskStatus="Doing"
          tasks={tasks}
          status="doing"
          handleDelete={handleDelete}
          setActiveCard={setActiveCard}
          onDrop={onDrop}
        ></TaskColumn>
        <TaskColumn
          imageLogo={DoneIcon}
          taskStatus="Done"
          tasks={tasks}
          status="done"
          handleDelete={handleDelete}
          setActiveCard={setActiveCard}
          onDrop={onDrop}
        ></TaskColumn>
      </main>
    </div>
  );
};

export default App;
