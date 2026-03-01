import { Link } from "react-router-dom";
import "./main.css";

export function Dashboard({ darkMode, setDarkMode }) {
    return (
        <div className="Dashboard">
        <h1>To-do list</h1>

        <div className="dashboard-buttons">
            <Link to="/Add" className="edit-btn link-add">
            Add
            </Link>

            <Link to="/" className="edit-btn link-add">
            Logout
            </Link>

            <button
            className="edit-btn"
            onClick={() => setDarkMode(!darkMode)}
            >
            {darkMode ? "Light Mode" : "Dark Mode"}
            </button>
        </div>
        </div>
    );
}