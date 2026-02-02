import { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./auth.css";

export function Register() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");



    const savedetails = async (e) => {
        e.preventDefault();


        const payload = { email, password };
        console.log("register payload =", payload);

        try {
        const r = await axios.post(
            "https://backend-todo-1-z9rj.onrender.com/Register",
            payload
        );

        if (r.status === 200 || r.status === 201) {
            localStorage.setItem("user", JSON.stringify(r.data));
            navigate("/home");
        }
        } catch (error) {
        if (error.response?.status === 409) {
            alert("User already exists. Please login.");
            navigate("/login");
        } else {
            alert("Registration failed");
        }
        }
    };

    const handleGoogleReg = async (credentialResponse) => {
        try {
        const token = credentialResponse.credential;

        const response = await axios.post(
            "https://backend-todo-1-z9rj.onrender.com/Gregister",
            { token }
        );

        // ✅ backend returns { user_id, email }
        localStorage.setItem("user", JSON.stringify(response.data));
        navigate("/home");

        } catch (err) {
        console.error("Google Registration failed", err);
        alert("Google Registration failed");
        }
    };

    return (
        <div className="register-container">
        <form className="register-form" onSubmit={savedetails}>
            <h2 className="register-title">Register</h2>

            <label className="register-label">Email:</label>
            <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="register-input"
            required
            />

            <label className="register-label">Password:</label>
            <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="register-input"
            required
            />

            <button type="submit" className="register-button">
            Register
            </button>

            <div className="google-section">
            <p className="or-text">or</p>
            <GoogleLogin
                onSuccess={handleGoogleReg}
                onError={() => alert("Google Sign In Failed")}
            />
            </div>

            <button className="login-button" type="button">
            <Link
                to="/login"
                style={{ color: "black", textDecoration: "none" }}
            >
                Login
            </Link>
            </button>
        </form>
        </div>
    );
}
