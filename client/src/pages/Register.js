import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleRegister = async () => {
        try {
            await axios.post("http://localhost:5000/api/auth/register", {
                username,
                email,
                password,
            });
            alert("Registration successful!");
            navigate("/login");
        } catch (err) {
            alert("Registration failed!");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#2a0845] via-[#6441a5] to-[#ff5e62]">
            <div className="bg-[#23283a]/90 backdrop-blur-md p-10 rounded-2xl shadow-2xl w-full max-w-md space-y-8 border border-white/10">
                <div className="flex flex-col items-center mb-2">
                    <span className="flex items-center gap-2 text-3xl font-extrabold text-white tracking-tight mb-2">
                        <svg className="w-8 h-8 text-purple-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M16 18l6-6-6-6M8 6l-6 6 6 6" /></svg>
                        CodeShare
                    </span>
                    <span className="text-lg text-white/80 font-semibold">Create your account</span>
                </div>
                <div className="space-y-5">
                    <input
                        type="text"
                        className="w-full bg-[#181c27] text-white border border-white/20 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 placeholder-gray-400"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <input
                        type="email"
                        className="w-full bg-[#181c27] text-white border border-white/20 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 placeholder-gray-400"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        className="w-full bg-[#181c27] text-white border border-white/20 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 placeholder-gray-400"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button
                        onClick={handleRegister}
                        className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-3 rounded-xl shadow-md hover:scale-105 transition-transform"
                    >
                        Register
                    </button>
                </div>
                <p className="text-center text-white/80">
                    Already have an account?{' '}
                    <span
                        className="text-purple-400 cursor-pointer hover:underline"
                        onClick={() => navigate("/login")}
                    >
                        Login
                    </span>
                </p>
            </div>
        </div>
    );
};

export default Register;
