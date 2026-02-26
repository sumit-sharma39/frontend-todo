import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./forgot.css";

export function ResetPassword() {
    const { token } = useParams();
    const navigate = useNavigate();

    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        setMessage("");
        setError("");

        try {
        const res = await axios.post(
            `http://localhost:5000/reset-password/${token}`,
            { password }
        );

        setMessage(res.data.message);

        // Redirect to login after 2 seconds
        setTimeout(() => {
            navigate("/");
        }, 2000);

        } catch (err) {
        setError(
            err.response?.data?.error || "Something went wrong"
        );
        }
    };

    return (
        <div className="auth-container">
        <div className="auth-card">
            <form onSubmit={handleSubmit}>
            <h2 className="auth-title">Reset Password</h2>

            <input
                type="password"
                className="auth-input"
                placeholder="Enter new password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />

            <button type="submit" className="auth-button">
                Reset Password
            </button>

            {message && <p className="auth-message">{message}</p>}
            {error && <p className="auth-error">{error}</p>}
            </form>
        </div>
        </div>
    );
}