
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import { NewTask } from "./NewTask";
import { useState } from 'react';
import {TasksDisplay} from "./TasksDisplay"
import { TaskDisplay } from "./Task-Display";
import { EditTask } from "./Edittask";
function App() {
  const [tasks, setTasks] = useState([]);
  return (
    <Router>
      <Routes>
        <Route path='/' element={<TasksDisplay task={tasks} setTasks={setTasks} />} />
        <Route path='/Add' element={<NewTask setTasks={setTasks}/>} />
        <Route path="/Task/:id" element={<TaskDisplay />} />
        <Route path="/Edit/:id" element={<EditTask/>} />
      </Routes>
    </Router>
  )
}

export default App
