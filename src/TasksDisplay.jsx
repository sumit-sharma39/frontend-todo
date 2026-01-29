import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Display.css";
import { Dashboard } from "./dashboard";

export function TasksDisplay() {
    const [tasks, setTasks] = useState([]);
    const navigate = useNavigate();

    const data = JSON.parse(localStorage.getItem("user"));
    const userId = data?.user?.user_id;
    // gets tasks
    useEffect(() => {
        async function getData() {
        try {
            const res = await axios.get(`https://backend-todo-1-z9rj.onrender.com/data/${userId}`);
            setTasks(res.data.data);
        } catch (err) {
            console.error("Fetch error:", err);
        }
        }
        getData();
    }, [userId]);

    // delete task
    const deleteTask = async (id) => {
        if (!window.confirm("Delete this task?")) return;

        try {
        await axios.delete(`https://backend-todo-1-z9rj.onrender.com/Delete`,{data: { ids: [id] }});
        setTasks((prev) => prev.filter((task) => task.id !== id));
        } catch (err) {
        console.error("Delete error:", err);
        }
    };

    // Edit page. 
    const editTask = (id) => { //(id)
        navigate(`/Edit/${id}`);
    };

    const formatDate = (date) => {
        if (!date) return "";
        return new Date(date).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        });
    };

    return (
        <>
        <Dashboard/>
        <div className="TodoGrid">
        {tasks.map((task) => (
            <div
                key={task.id}
                className={`TodoCard ${task.completed ? "completed-task" : ""}`}
                onClick={() => navigate(`/Task/${task.id}`)}
                style={{ cursor: "pointer" }}
            >

            {/* title */}
            <h3 className="task-title">{task.title}</h3>

            {/* deadline */}
            {task.deadline && (
                <p className="task-deadline">
                Deadline: <strong>{formatDate(task.deadline)}</strong>
                </p>
            )}

            {/* buttons of delete and edit. */}
            <div className="task-actions">
                {!task.completed && (
                    <button
                        className="edit-btn"
                        onClick={(e) => {
                        e.stopPropagation(); 
                        editTask(task.id);

                        }}
                    >
                        Edit
                    </button>
                    )}

                <button
                className="delete-btn"
                onClick={(e) => {
                    e.stopPropagation(); 
                    deleteTask(task.id);
                }}
                >
                Delete
                </button>
            </div>
            </div>
        ))}
        </div>

        </>
    );
}
