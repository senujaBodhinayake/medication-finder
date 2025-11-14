
import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from 'react-hot-toast';
import "./Login.css";
const Login = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("patient");
    const [isRegister, setIsRegister] = useState(false);
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const endpoint = isRegister ? "register" : "login";

        const payload = isRegister
            ? { name, email, password, role }
            : { email, password };

        console.log("Submitting payload:", payload);

        try {
            const res = await axios.post(`http://localhost:5000/api/auth/${endpoint}`, payload);
            localStorage.setItem("token", res.data.token);
            toast.success(`Successfully ${isRegister ? "registered" : "logged in"}`);
            setMessage('')

            
        } catch (err) {
            console.error(err);
            setMessage(err.response?.data?.msg || "An error occurred");
            toast.error(message);
        } 
        
    };
    return (
        
            <div className="auth-container">
      <Toaster />
      <div className="card">
        <h1 className="title">{isRegister ? "Register" : "Login"}</h1>
        <form onSubmit={handleSubmit}>
          {isRegister && (
            <>
              <div className="form-control">
                <label>Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <div className="form-control">
                <label>Role</label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="select"
                >
                  <option value="patient">Patient</option>
                  <option value="pharmacy">Pharmacy</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
            </>
          )}

          <div className="form-control">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-control">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn">
            {isRegister ? "Register" : "Login"}
          </button>
        </form>

        {message && <div className="alert">{message}</div>}

        <div className="switch">
          <button onClick={() => setIsRegister(!isRegister)} className="link">
            {isRegister
              ? "Already have an account? Login"
              : "Need an account? Register"}
          </button>
        </div>
      </div>
    </div>
  


    );
};

export default Login;
