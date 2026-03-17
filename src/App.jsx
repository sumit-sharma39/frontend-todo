
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import { NewTask } from "./pages/NewTask";
import { useState } from 'react';
import {TasksDisplay} from "./pages/TasksDisplay"
import { TaskDisplay } from "./pages/Task-Display";
import { EditTask } from "./pages/Edittask";
import { Login } from "./pages/Login"
import { Register } from "./pages/register";
import { ForgotPassword } from "./pages/forgotpas";
import { ResetPassword } from "./pages/resetpassword";

function App() {
  const [tasks, setTasks] = useState([]);
  return (
    <Router>
      <Routes>
        <Route path="/register" element={ <Register/>} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />  
        <Route path="/login" element={<Login/>}/>
        <Route path="/" element={<Login/>}/>
        <Route path='/home' element={<TasksDisplay task={tasks} setTasks={setTasks} />} />
        <Route path='/Add' element={<NewTask setTasks={setTasks}/>} />
        <Route path="/Task/:id" element={<TaskDisplay />} />
        <Route path="/Edit/:id" element={<EditTask/>} />
        <Route path="/forgot-password" element={<ForgotPassword/>} />
      </Routes>
    </Router>
  )
}

export default App
