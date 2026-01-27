import { Link } from "react-router-dom";
import "./main.css"
export function Dashboard() {
    return(
        <div className="Dashboard">
            <h1>To-do list</h1>

            <div className="dashboard-buttons">
                
                <Link to="/Add" className="edit-btn link-add">
                    Add
                </Link>
            </div>
        </div>
    )
}