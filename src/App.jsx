
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import { NewTask } from "./NewTask";
import { useState } from 'react';
import {TasksDisplay} from "./TasksDisplay"
import { TaskDisplay } from "./Task-Display";
import { EditTask } from "./Edittask";
import { Login } from "./Login"
import { Register } from "./register";
import { ForgotPassword } from "./forgotpas";
import { ResetPassword } from "./resetpassword";

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
