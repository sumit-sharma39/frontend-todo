import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Edit.css"

export function EditTask() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [original, setOriginal] = useState(null);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [bullets, setBullets] = useState("");
    const [deadline, setDeadline] = useState("");

    useEffect(() => {
        async function fetchTask() {
        try {
            // const res = await axios.get(`http://localhost:8000/Task/${id}`);
            const res = await axios.get(`http://localhost:8000/Task/${id}`,
            { withCredentials: true }
        );
            const task = res.data;

            setOriginal(task);
            setTitle(task.title || "");
            setDescription(task.description || "");
            setBullets((task.bullets || []).join(", "));
            setDeadline(task.deadline ? task.deadline.slice(0, 10) : "");

        } catch (err) {
            console.error(err);
            alert("Failed to load task");
        }
        }
        fetchTask();
    }, [id ]);

    const saveEdits = async () => {
        if (!original) return;

        const payload = {};

        if (title !== original.title) payload.title = title;
        if (description !== original.description)
        payload.description = description;

        const bulletsArray = bullets
        .split(",")
        .map((b) => b.trim())
        .filter(Boolean);

        if (
        JSON.stringify(bulletsArray) !==
        JSON.stringify(original.bullets || [])
        ) {
        payload.bullets = bulletsArray;
        }

        if (deadline !== (original.deadline || "")) {
        payload.deadline = deadline || null;
        }

        if (Object.keys(payload).length === 0) {
        alert("Nothing changed");
        return;
        }

        try {
        // await axios.patch(`http://localhost:8000/UpdateTask/${id}`, payload);
        await axios.patch(`http://localhost:8000/UpdateTask/${id}`, payload,
            { withCredentials: true }
        );
        navigate(`/Task/${id}`);
        } catch (err) {
        console.error(err);
        alert("Update failed");
        }



    };

    return (
    <div class="edit-task-page">
    <div className="edit-task-container">
        <h2>Edit Task</h2>

        <label>Title</label>
        <input value={title} onChange={(e) => setTitle(e.target.value)} />

        <label>Description</label>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} />

        <label>Bullets (use commas for new point)</label>
        <input value={bullets} onChange={(e) => setBullets(e.target.value)} />

        <label>Deadline</label>
        <input type="date" value={deadline} onChange={(e) => setDeadline(e.target.value)} />

        <div style={{ marginTop: "10px" }}>
        <button onClick={saveEdits}>Save</button>
        <button onClick={() => navigate(-1)}>Cancel</button>
        </div>
    </div>
    </div>
    );

} 