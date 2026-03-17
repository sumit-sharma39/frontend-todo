import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

export function Dashboard() {

    const navigate = useNavigate();

    const logout = async () => {
        await axios.post(
        "https://backend-todo-1-z9rj.onrender.com/logout",
        {},
        { withCredentials: true }
        );

        navigate("/");
    };

    return (
        <div className="Dashboard">
        <h1>To-do list</h1>

        <div className="dashboard-buttons">

            <Link to="/Add" className="edit-btn link-add">
            Add
            </Link>

            <button onClick={logout} className="edit-btn link-add">
            Logout
            </button>

        </div>
        </div>
    );
}