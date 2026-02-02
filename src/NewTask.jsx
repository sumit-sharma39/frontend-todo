import "./index.css";
import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

export function NewTask({ setTasks }) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [bullet, setBullet] = useState("");
    const [points, setPoints] = useState([]);
    const [date, setDate] = useState("");
    const [image, setImage] = useState(null);

    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem("user"));
    const user_id = user?.user_id;

    async function save() {
        if (!user_id) return;

        try {
        const result = await axios.post(
            "https://backend-todo-1-z9rj.onrender.com/Add",
            {
            title,
            description,
            points,
            date,
            completed: false
            },
            {
            headers: {
                "user-id": user_id
            }
            }
        );

        const savedTask = result.data;

        let uploadedImage = [];

        if (image) {
            const formData = new FormData();
            formData.append("image_url", image);

            const response = await axios.post(
            `https://backend-todo-1-z9rj.onrender.com/UploadImage/${savedTask.id}`,
            formData
            );

            uploadedImage = response.data.image || [];
        }

        setTasks(prev => [...prev, { ...savedTask, image: uploadedImage }]);
        navigate("/home");
        } catch (err) {
        console.error(err);
        }
    }

    function addPoint() {
        const pt = bullet.trim();
        if (!pt) return;
        setPoints(prev => [...prev, pt]);
        setBullet("");
    }

    return (
        <>
        <Link to="/home"><button className="back-btn">Back</button></Link>

        <div className="Div-add">
            <h5>New task</h5>

            <p>Title:</p>
            <input value={title} onChange={e => setTitle(e.target.value)} />

            <p>Description:</p>
            <input value={description} onChange={e => setDescription(e.target.value)} />

            <p>Tasks:</p>
            <input value={bullet} onChange={e => setBullet(e.target.value)} />
            <button onClick={addPoint}>Add</button>

            {points.length > 0 && (
            <ul>
                {points.map((p, i) => <li key={i}>{p}</li>)}
            </ul>
            )}

            <p>Deadline</p>
            <input type="date" value={date} onChange={e => setDate(e.target.value)} />

            <p>Images:</p>
            <input
            type="file"
            accept="image/*"
            onChange={e => setImage(e.target.files?.[0] || null)}
            />

            {image && <img src={URL.createObjectURL(image)} width={100} />}

            <button onClick={save}>Submit</button>
        </div>
        </>
    );
}
