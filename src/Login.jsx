import "./auth.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";

export function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleGoogleLogin = async (credentialResponse) => {
        try {
        const token = credentialResponse.credential;

        const r = await axios.post(
            "http://localhost:8000/GoogleLogin",
            { token },
            { withCredentials: true }
        );

        localStorage.setItem("user", JSON.stringify({ user_id: r.data.user_id }));
        navigate("/home");
        } catch {
        alert("Google login failed");
        }
    };

    const checkdetails = async (e) => {
        e.preventDefault();

        try {
        const r = await axios.post(
            "http://localhost:8000/Login",
            { email, password },
            { withCredentials: true }
        );

        localStorage.setItem("user", JSON.stringify({ user_id: r.data.user_id }));
        navigate("/home");
        } catch (err) {
        if (err.response?.status === 401) alert("Invalid credentials");
        else if (err.response?.status === 404) navigate("/register");
        else alert("Login failed");
        }
    };

    return (
        <div className="login-container">
        <form className="login-form" onSubmit={checkdetails}>
            <h2 className="login-title">Login</h2>

            <label className="login-label">Email:</label>
            <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="login-input"
            required
            />

            <label className="login-label">Password:</label>
            <input
            type="password"
            pattern="^(?=.*[A-Z])(?=.*[^A-Za-z0-9]).{8,25}$"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="login-input"
            required
            />

            <button type="submit" className="login-button">Login</button>

            <div className="google-section">
            <p className="or-text">or</p>
            <GoogleLogin
                onSuccess={handleGoogleLogin}
                onError={() => alert("Google Sign In Failed")}
            />
            </div>

            <p className="login-text">
            Don't have an account?
            <Link to="/Register" className="register-link"> Register</Link>
             <br/>
           <Link to="/forgot-password"> Forgot password  </Link>
            </p>
        </form>
        </div>
    );
}
