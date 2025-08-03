import { useState } from "react";
import styles from "./Task.module.css";
function TaskApp() {
  const [tasks, setTask] = useState([]);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [filter, setFilter] = useState(null);

  const addTask = () => {
    if (!title.trim() || !desc.trim()) return;
    const newTask = { title: title, desc: desc, completed: false };
    setTask((t) => [...t, newTask]);
    setTitle("");
    setDesc("");
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleDescChange = (e) => {
    setDesc(e.target.value);
  };

  const toggleCompleted = (index) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, completed: !task.completed } : task
    );
    setTask(updatedTasks);
  };

  const deleteTask = (i) => {
    const newTask = tasks.filter((_, index) => i !== index);
    setTask(newTask);
  };

  const renderFilter = (value) => {
    setFilter(value);
  };

  const clearFilter = () => {
    setFilter(null);
  };

  const clearCompletedTasks = () => {
    const newTasks = tasks.filter((t) => t.completed === false);
    setTask(newTasks);
  };

  const moveTaskUp = (index) => {
    if (index === 0) return;
    var upTasks = [...tasks];
    [upTasks[index], upTasks[index - 1]] = [upTasks[index - 1], upTasks[index]];
    setTask(upTasks);
  };

  const moveTaskDown = (index) => {
    if (index === tasks.length - 1) return;
    var upTasks = [...tasks];
    [upTasks[index], upTasks[index + 1]] = [upTasks[index + 1], upTasks[index]];
    setTask(upTasks);
  };
  return (
    <>
      <header className={styles.header}>
        <h3>AHNY'S CHORE MANAGER</h3>
      </header>

      <main>
        <h4>MY TASKS</h4>
        <section className={styles.taskFilter}>
          <div className={styles.filterControls}>
            <h5>Filter by status: </h5>
            <label>
              <input
                type="radio"
                name="status"
                checked={filter === true}
                onChange={() => renderFilter(true)}
              />
              Completed
            </label>
            <br />
            <label>
              <input
                type="radio"
                name="status"
                checked={filter === false}
                onChange={() => renderFilter(false)}
              />
              Not Completed
            </label>
            <button onClick={clearFilter}>Clear Filter</button>
          </div>

          <div className={styles.taskSummary}>
            <p>
              Completed Tasks left:{" "}
              {tasks.filter((t) => t.completed === true).length}
            </p>
            <p>
              Pending Tasks left:{" "}
              {tasks.filter((t) => t.completed === false).length}
            </p>
            <button onClick={clearCompletedTasks}>Clear Completed Tasks</button>
          </div>
        </section>

        <section className={styles.taskList}>
          <ol>
            {tasks
              .filter((task) => filter === null || task.completed === filter)
              .map((task, index) => (
                <li key={index} className={styles.taskItem}>
                  <div className={styles.taskContent}>
                    {task.title}: {task.desc}
                  </div>
                  <div className={styles.taskButtons}>
                    <button onClick={() => moveTaskUp(index)}>⬆️</button>
                    <button onClick={() => moveTaskDown(index)}>⬇️</button>
                    <button onClick={() => toggleCompleted(index)}>
                      {task.completed ? "☑️" : "✖️"}
                    </button>
                    <button onClick={() => deleteTask(index)}>🗑️</button>
                  </div>
                </li>
              ))}
          </ol>
        </section>

        <section className={styles.taskInput}>
          <label>Task Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => handleTitleChange(e)}
          />
          <label>Task Description</label>
          <input
            type="text"
            value={desc}
            onChange={(e) => handleDescChange(e)}
          />
          <button onClick={addTask}>Submit</button>
        </section>
      </main>
    </>
  );
}

export default TaskApp;
