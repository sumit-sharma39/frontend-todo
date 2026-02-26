import { useState } from "react";
import axios from "axios";
import "./forgot.css";

export function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
        await axios.post(
            "http://localhost:8000/forgot-password",
            { email }
        );

        setMessage("If account exists, reset link has been sent.");
        } catch (err) {
        console.log(err);
        setMessage("Something went wrong.");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
        <h2>Forgot Password</h2>
        <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
        />
        <button type="submit">Send Reset Link</button>
        <p>{message}</p>
        </form>
    );
}