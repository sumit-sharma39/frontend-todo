import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import "./Display.css";

export function TaskDisplay() {

    

    const { id } = useParams();
    const [task, setTask] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchTask = async () => {
        try {
            // const res = await axios.get(`http://localhost:8000/Task/${id}`);
            const res = await axios.get(`https://backend-todo-1-z9rj.onrender.com/Task/${id}`);
            setTask(res.data.data[0]);
            console.log("Data received: " , res.data);
            setLoading(false);
        } catch (err) {
            console.error(err);
            setError("Failed to fetch task details.");
            setLoading(false);
        }
        };

        fetchTask();
    }, [id ]);

            const markAsCompleted = async () => {
        try {
            await axios.put(`https://backend-todo-1-z9rj.onrender.com/Completed/${id}`);

            setTask((prev) =>
            prev ? { ...prev, completed: true } : prev
            );
        } catch (err) {
            console.error(err);
            alert("Failed to mark task as completed");
        }
        };


    if (loading) return <p>Loading task...</p>;
    if (error) return <p>{error}</p>;
    if (!task) return <p>Task not found.</p>;

    return (
        <div className="task-detail-container">
        <Link to="/home">
            <button className="back-btn">Back</button>
        </Link>

        <h2>{task.title}</h2>
        <p><strong>Description:</strong> {task.description || "No description"}</p>

        {task.bullets && task.bullets.length > 0 && (
        <>
            <h4>Bullet Points:</h4>
            <ul>
            {task.bullets.map((p, index) => (
                <li key={index}>{p}</li>
            ))}
            </ul>
        </>
        )}

        {task.deadline && (
        <p>
            <strong>Deadline:</strong>{" "}
            {new Date(task.deadline).toLocaleDateString("en-IN")}
        </p>
        )}

        {task.image_url && task.image_url.length > 0 && (
        <div className="task-images">
            {task.image_url && (
                <img src={task.image_url} alt="task" width={400} />
            )}
        </div>
        )}
         {/* task commplition button   */}
        {!task.completed && (
        <button className="complete-btn" onClick={markAsCompleted}>
            Mark as Completed
        </button>
        )}

        {task.completed && (
        <p style={{ color: "green", fontWeight: "bold" }}>
            ✅ Task Completed
        </p>
        )}
        </div>
    );
}
