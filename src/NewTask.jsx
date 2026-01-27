import "./index.css"
import { useState } from "react"
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
export function NewTask({ setTasks }){

    const backendUrl = import.meta.env.VITE_BACKEND_URL; //backend server link 

    const [title , setTitle] = useState("");
    const [description , setDescription] = useState("");
    const [bullet , setbullet] = useState("");
    const [Points , setPoints] = useState([]);
    const [date , setdate] = useState("");
    const [image , setimage] = useState(null);
    const navigate = useNavigate();

    async function save() {
        try {
            // const result =await axios.post("http://localhost:8000/Add",
            const result =await axios.post(`https://backend-todo-1-z9rj.onrender.com/Add`, 
                {
                    title , description, Points, date , completed:false
                });
            console.log("result=", result);

            const savedTask = result.data;
            
            let uploadedImage = [];
            if (image) {
            const formData = new FormData();

            formData.append("image_url", image);
            console.log("savedtask id check: " , savedTask.id);
            console.log("check the image" , image);

            const Response = await axios.post(
                `https://backend-todo-1-z9rj.onrender.com/UploadImage/${savedTask.id}`,
                // `http://localhost:8000/UploadImage/${savedTask.id}`,
                formData
            );
            console.log("formData is: " , formData);

                uploadedImage = Response.data.image || [];
            }
            setTasks((prev) => [
                ...prev,
                { ...savedTask, image: uploadedImage },
            ]);

            navigate("/");
            } catch (err) {
            console.error("Error saving task:", err);
            }
    }

    function AddPoint() {
        const pt=bullet.trim();
        if(!pt) return;
        setPoints( (previous) => [...previous , pt]);
        setbullet("");
    }

    return (
        <>
            <Link to="/"> <button className="back-btn"> Back </button> </Link>
            <div className="Div-add">
                <h5>New task</h5>

                <p>Title:</p> 
                <input placeholder="Title" value={title} onChange={(event) => setTitle(event.target.value)} />

                <p>description:</p>
                <input placeholder="Description" value={description} onChange={(event) => setDescription(event.target.value) }/>

                <p>Tasks:</p>
                <input placeholder="Point" value={bullet} onChange={(event) => setbullet(event.target.value) }/ > 
                <button onClick={AddPoint} >Add</button>

                {Points.length>0 && (<ul>
                    {Points.map((P, index) => (
                    <li key={index}>{P}</li>
                    ))}
                </ul>
                )}

                <p>Deadline</p>
                <input type="date" min="2026-01-01" value={date} onChange={(event) => setdate(event.target.value) }></input>

                <p>Images:</p>
                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                        setimage(file);
                        }
                    }}
                />
                {image && (
                <div>
                    <img
                    src={URL.createObjectURL(image)}
                    alt="preview"
                    width={100}
                    />
                </div>
                )}
                

                <br/>

                <button type="submit" onClick={save}>Submit</button>

            </div>

        </>
    )
}
