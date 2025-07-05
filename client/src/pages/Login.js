import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        // Handle Google OAuth redirect
        const params = new URLSearchParams(window.location.search);
        const token = params.get("token");
        if (token) {
            localStorage.setItem("token", token);
            navigate("/");
        }
    }, [navigate]);

    const handleLogin = async () => {
        try {
            const res = await axios.post("http://localhost:5000/api/auth/login", {
                email,
                password,
            });
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("user", JSON.stringify(res.data.user));
            navigate("/");
        } catch (err) {
            alert("Login failed!");
        }
    };

    const handleGoogleRedirect = () => {
        window.location.href = "http://localhost:5000/api/auth/google";
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#2a0845] via-[#6441a5] to-[#ff5e62]">
            <div className="bg-[#23283a]/90 backdrop-blur-md p-10 rounded-2xl shadow-2xl w-full max-w-md space-y-8 border border-white/10">
                <div className="flex flex-col items-center mb-2">
                    <span className="flex items-center gap-2 text-3xl font-extrabold text-white tracking-tight mb-2">
                        <svg className="w-8 h-8 text-purple-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M16 18l6-6-6-6M8 6l-6 6 6 6" /></svg>
                        CodeShare
                    </span>
                    <span className="text-lg text-white/80 font-semibold">Sign in to your account</span>
                </div>
                <div className="space-y-5">
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
                    <button onClick={handleLogin} className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-3 rounded-xl shadow-md hover:scale-105 transition-transform">
                        Login
                    </button>
                </div>
                <div className="flex items-center my-2">
                    <div className="flex-grow border-t border-white/20"></div>
                    <span className="mx-3 text-gray-400 font-medium">or</span>
                    <div className="flex-grow border-t border-white/20"></div>
                </div>
                <button onClick={handleGoogleRedirect} className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-xl shadow-md flex items-center justify-center gap-2 transition">
                    <svg className="w-5 h-5" viewBox="0 0 48 48"><g><path fill="#4285F4" d="M44.5 20H24v8.5h11.7C34.7 33.1 29.8 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c2.6 0 5 .8 7 2.3l6.4-6.4C33.5 5.1 28.1 3 24 3 12.4 3 3 12.4 3 24s9.4 21 21 21c10.5 0 20.5-7.7 20.5-21 0-1.4-.1-2.7-.3-4z" /><path fill="#34A853" d="M6.3 14.7l7 5.1C15.5 17.1 19.4 15 24 15c2.6 0 5 .8 7 2.3l6.4-6.4C33.5 5.1 28.1 3 24 3 15.6 3 8.1 8.2 6.3 14.7z" /><path fill="#FBBC05" d="M24 45c5.8 0 11.1-1.9 15.2-5.2l-7-5.7C29.8 36 27 37 24 37c-5.7 0-10.6-3.9-12.3-9.2l-7 5.4C8.1 39.8 15.6 45 24 45z" /><path fill="#EA4335" d="M44.5 20H24v8.5h11.7c-1.1 3.1-4.7 7.5-11.7 7.5-6.6 0-12-5.4-12-12s5.4-12 12-12c2.6 0 5 .8 7 2.3l6.4-6.4C33.5 5.1 28.1 3 24 3 12.4 3 3 12.4 3 24s9.4 21 21 21c10.5 0 20.5-7.7 20.5-21 0-1.4-.1-2.7-.3-4z" /></g></svg>
                    Login with Google
                </button>
                <p className="text-center text-white/80">
                    Don't have an account?{' '}
                    <span
                        className="text-purple-400 cursor-pointer hover:underline"
                        onClick={() => navigate("/register")}
                    >
                        Register
                    </span>
                </p>
            </div>
        </div>
    );
};

export default Login;
