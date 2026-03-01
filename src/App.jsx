import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";

import { NewTask } from "./NewTask";
import { TasksDisplay } from "./TasksDisplay";
import { TaskDisplay } from "./Task-Display";
import { EditTask } from "./Edittask";
import { Login } from "./Login";
import { Register } from "./register";
import { ForgotPassword } from "./forgotpas";
import { ResetPassword } from "./resetpassword";

function App() {
  const [tasks, setTasks] = useState([]);

  // ✅ Global Dark Mode State
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  // ✅ Apply theme globally
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.body.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Login />} />

        <Route
          path="/home"
          element={
            <TasksDisplay
              task={tasks}
              setTasks={setTasks}
              darkMode={darkMode}
              setDarkMode={setDarkMode}
            />
          }
        />

        <Route
          path="/Add"
          element={<NewTask setTasks={setTasks} />}
        />

        <Route path="/Task/:id" element={<TaskDisplay />} />
        <Route path="/Edit/:id" element={<EditTask />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Routes>
    </Router>
  );
}

export default App;