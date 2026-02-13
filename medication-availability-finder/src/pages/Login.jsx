
// import React, {useState} from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import toast, { Toaster } from 'react-hot-toast';
// import "./Login.css";
// const Login = () => {
//     const [name, setName] = useState("");
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//     const [role, setRole] = useState("patient");
//     const [isRegister, setIsRegister] = useState(false);
//     const [message, setMessage] = useState("");
//     const navigate = useNavigate();

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         const endpoint = isRegister ? "register" : "login";

//         const payload = isRegister
//             ? { name, email, password, role }
//             : { email, password };

//         console.log("Submitting payload:", payload);

//         try {
//             const res = await axios.post(`http://localhost:5000/api/auth/${endpoint}`, payload);
//             localStorage.setItem("token", res.data.token);
//             toast.success(`Successfully ${isRegister ? "registered" : "logged in"}`);
//             setMessage('')
//             navigate("/home");

            
//         } catch (err) {
//             console.error(err);
//             setMessage(err.response?.data?.msg || "An error occurred");
//             toast.error(message);
//         } 
        
//     };
//     return (
        
//             <div className="auth-container">
//       <Toaster />
//       <div className="card">
//         <h1 className="title">{isRegister ? "Register" : "Login"}</h1>
//         <form onSubmit={handleSubmit}>
//           {isRegister && (
//             <>
//               <div className="form-control">
//                 <label>Name</label>
//                 <input
//                   type="text"
//                   value={name}
//                   onChange={(e) => setName(e.target.value)}
//                   required
//                 />
//               </div>

//               <div className="form-control">
//                 <label>Role</label>
//                 <select
//                   value={role}
//                   onChange={(e) => setRole(e.target.value)}
//                   className="select"
//                 >
//                   <option value="patient">Patient</option>
//                   <option value="pharmacy">Pharmacy</option>
//                   <option value="admin">Admin</option>
//                 </select>
//               </div>
//             </>
//           )}

//           <div className="form-control">
//             <label>Email</label>
//             <input
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//             />
//           </div>

//           <div className="form-control">
//             <label>Password</label>
//             <input
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//             />
//           </div>

//           <button type="submit" className="btn">
//             {isRegister ? "Register" : "Login"}
//           </button>
//         </form>

//         {message && <div className="alert">{message}</div>}

//         <div className="switch">
//           <button onClick={() => setIsRegister(!isRegister)} className="link">
//             {isRegister
//               ? "Already have an account? Login"
//               : "Need an account? Register"}
//           </button>
//         </div>
//       </div>
//     </div>
  


//     );
// };

// export default Login;
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { Activity, Mail, Lock, User } from "lucide-react";

const Login = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("patient");
  const [isRegister, setIsRegister] = useState(false);
  const API_BASE = import.meta.env.VITE_API_URL;


  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const endpoint = isRegister ? "register" : "login";
    const payload = isRegister
      ? { name, email, password, role }
      : { email, password };

    try {
      const res = await axios.post(`${API_BASE}/api/auth/${endpoint}`, payload
      );

      localStorage.setItem("token", res.data.token);
      toast.success(
        `Successfully ${isRegister ? "registered" : "logged in"}`
      );

      navigate("/home");
    } catch (err) {
      const errorMsg = err.response?.data?.msg || "Something went wrong";
      toast.error(errorMsg);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 to-teal-100 px-4">
      <Toaster position="top-right" />

      <div className="w-full max-w-md bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-8 border border-border">
        {/* Logo */}
        <div className="flex flex-col items-center mb-6">
          <Activity size={36} className="text-emerald-600 mb-2" />
          <h1 className="text-2xl font-bold text-gray-800">
            Senuja
          </h1>
          <p className="text-sm text-gray-500">
            {isRegister
              ? "Create your account"
              : "Sign in to continue"}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {isRegister && (
            <div>
              <label className="text-sm text-gray-600">Name</label>
              <div className="relative">
                <User className="absolute left-3 top-3 text-gray-400" size={18} />
                <input
                  type="text"
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
            </div>
          )}

          <div>
            <label className="text-sm text-gray-600">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 text-gray-400" size={18} />
              <input
                type="email"
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div>
            <label className="text-sm text-gray-600">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 text-gray-400" size={18} />
              <input
                type="password"
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          {isRegister && (
            <div>
              <label className="text-sm text-gray-600">Role</label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              >
                <option value="patient">Patient</option>
                <option value="pharmacy">Pharmacy</option>
                <option value="admin">Admin</option>
              </select>
            </div>
          )}

          <button
            type="submit"
            className="w-full py-2 rounded-lg bg-emerald-600 text-white font-semibold hover:bg-emerald-700 transition"
          >
            {isRegister ? "Create Account" : "Login"}
          </button>
        </form>

        {/* Switch */}
        <div className="text-center mt-6">
          <button
            onClick={() => setIsRegister(!isRegister)}
            className="text-sm text-emerald-600 hover:underline"
          >
            {isRegister
              ? "Already have an account? Login"
              : "Don’t have an account? Register"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
