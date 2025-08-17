import { useState, useEffect } from "react";
import axios from "axios";
import styles from "./Task.module.css";

function TaskApp() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [filter, setFilter] = useState(null);

  // Username: ask once, then save in localStorage
  const [username] = useState(() => {
    let stored = localStorage.getItem("username");
    if (!stored) {
      stored = prompt("Enter your username:") || `guest-${Date.now()}`;
      localStorage.setItem("username", stored);
    }
    return stored;
  });

  // Load tasks from backend
  useEffect(() => {
    axios.get(`/api/tasks/${username}`).then((res) => setTasks(res.data));
  }, [username]);

  const addTask = async () => {
    if (!title.trim() || !desc.trim()) return;
    const res = await axios.post(`/api/tasks/${username}`, {
      title,
      desc,
    });
    setTasks((t) => [...t, res.data]);
    setTitle("");
    setDesc("");
  };

  const toggleCompleted = async (id, completed) => {
    const res = await axios.put(`/api/tasks/${username}/${id}`, {
      completed: !completed,
    });
    setTasks((t) => t.map((task) => (task.id === id ? res.data : task)));
  };

  const deleteTask = async (id) => {
    await axios.delete(`/api/tasks/${username}/${id}`);
    setTasks((t) => t.filter((task) => task.id !== id));
  };

  const renderFilter = (value) => setFilter(value);
  const clearFilter = () => setFilter(null);
  const clearCompletedTasks = () => {
    tasks.filter((t) => t.completed === true).forEach((t) => deleteTask(t.id));
  };

  const moveTaskUp = (index) => {
    if (index === 0) return;
    const reordered = [...tasks];
    [reordered[index], reordered[index - 1]] = [
      reordered[index - 1],
      reordered[index],
    ];
    setTasks(reordered);
  };

  const moveTaskDown = (index) => {
    if (index === tasks.length - 1) return;
    const reordered = [...tasks];
    [reordered[index], reordered[index + 1]] = [
      reordered[index + 1],
      reordered[index],
    ];
    setTasks(reordered);
  };

  return (
    <>
      <header className={styles.header}>
        <h3>AHNY'S CHORE MANAGER</h3>
        <small>Logged in as: {username}</small>
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
            <p>Completed Tasks: {tasks.filter((t) => t.completed).length}</p>
            <p>Pending Tasks: {tasks.filter((t) => !t.completed).length}</p>
            <button onClick={clearCompletedTasks}>Clear Completed Tasks</button>
          </div>
        </section>

        <section className={styles.taskList}>
          <ol>
            {tasks
              .filter((task) => filter === null || task.completed === filter)
              .map((task, index) => (
                <li key={task.id} className={styles.taskItem}>
                  <div className={styles.taskContent}>
                    {task.title}: {task.description}
                  </div>
                  <div className={styles.taskButtons}>
                    <button onClick={() => moveTaskUp(index)}>⬆️</button>
                    <button onClick={() => moveTaskDown(index)}>⬇️</button>
                    <button
                      onClick={() => toggleCompleted(task.id, task.completed)}
                    >
                      {task.completed ? "☑️" : "✖️"}
                    </button>
                    <button onClick={() => deleteTask(task.id)}>🗑️</button>
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
            onChange={(e) => setTitle(e.target.value)}
          />
          <label>Task Description</label>
          <input
            type="text"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
          <button onClick={addTask}>Submit</button>
        </section>
      </main>
    </>
  );
}

export default TaskApp;
