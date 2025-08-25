import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState(""); // for input
  const [editingId, setEditingId] = useState(null); // track editing task
  const [editingText, setEditingText] = useState(""); // track edited text

  // Fetch tasks from backend
  useEffect(() => {
    axios.get("http://localhost:5000/tasks").then((res) => setTasks(res.data));
  }, []);

  // Add new task
  const addTask = async () => {
    if (!newTask.trim()) return;
    const res = await axios.post("http://localhost:5000/tasks", { title: newTask });
    setTasks([...tasks, res.data]);
    setNewTask("");
  };

  // Delete task
  const deleteTask = async (id) => {
    await axios.delete(`http://localhost:5000/tasks/${id}`);
    setTasks(tasks.filter((t) => t.id !== id));
  };

  // Start editing
  const startEdit = (task) => {
    setEditingId(task.id);
    setEditingText(task.title);
  };

  // Save edit
  const saveEdit = async (id) => {
    const res = await axios.put(`http://localhost:5000/tasks/${id}`, { title: editingText });
    setTasks(tasks.map((t) => (t.id === id ? res.data : t)));
    setEditingId(null);
    setEditingText("");
  };

  return (
    <div style={{ margin: "20px" }}>
      <h1>Todo App</h1>

      {/* Input for adding task */}
      <input
        type="text"
        placeholder="Enter task..."
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
      />
      <button onClick={addTask}>Add Task</button>

      <ul>
        {tasks.map((t) => (
          <li key={t.id}>
            {editingId === t.id ? (
              <>
                <input
                  type="text"
                  value={editingText}
                  onChange={(e) => setEditingText(e.target.value)}
                />
                <button onClick={() => saveEdit(t.id)}>Save</button>
                <button onClick={() => setEditingId(null)}>Cancel</button>
              </>
            ) : (
              <>
                {t.title}
                <button onClick={() => startEdit(t)}>Edit</button>
                <button onClick={() => deleteTask(t.id)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
