import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { GoogleLogin } from "@react-oauth/google";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./auth.css";

// start  of the function 
export function Register() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const user_id = uuidv4();


    const savedetails = async (e) => {
        e.preventDefault(); 

        const payload = { user_id , email, password };
        console.log("register payload =", payload);


    // <<-------- normal registration ------------->>
        try {
        const r = await axios.post(`https://backend-todo-1-z9rj.onrender.com/Register`, payload); // add the backend link
        console.log("registered data =", r); // checking response
        if (r.status === 200 || r.status === 201) {
            alert("Registration successful");
            localStorage.setItem("user", JSON.stringify(r.data));
            navigate("/home"); // navigating to the home page
        }
        } 
        
        catch (error) {
        if (error.response) {
            if (error.response.status === 409) {
            alert("User already exists. Please login.");
            navigate("/Login");
            } else {
            alert("Registration failed");
            }  } 

        else {
            alert("Server not reachable");
            console.error(error);
        }
    }
    };

    //<<-------- google authentication ------------->>
    const handleGoogleReg = async (credentialResponse) => {
        try {
        const token = credentialResponse.credential;
        const response = await axios.post(`https://backend-todo-1-z9rj.onrender.com/Gregister`, { token }); //backend link
            console.log("response.data is: " , response.data);
        if (response.status === 200) {
            localStorage.setItem("user", JSON.stringify(response.data));
            navigate("/home"); //check the navigation.
        }
        } catch (err) {
        console.error("Google Registration failed", err);
        alert("Google Registration failed");
        }
    };

    // html form  code + returning  
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
            <Link style={{"color":"black" , "text-decoration" : "none"}} to="/login" className="login-link">
                Login
            </Link>
            </button>
        </form>
        </div>
    );
}