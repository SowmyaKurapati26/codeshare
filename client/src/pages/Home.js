import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";

const features = [
    {
        icon: (
            <span className="bg-gradient-to-tr from-pink-500 to-purple-500 p-2 rounded-full inline-block">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M16 18l6-6-6-6M8 6l-6 6 6 6" /></svg>
            </span>
        ),
        title: "Real-time Code Editing",
        desc: "Collaborate on code with multiple users simultaneously"
    },
    {
        icon: (
            <span className="bg-gradient-to-tr from-pink-500 to-purple-500 p-2 rounded-full inline-block">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87M16 3.13a4 4 0 010 7.75M8 3.13a4 4 0 000 7.75" /></svg>
            </span>
        ),
        title: "Multi-user Support",
        desc: "See who's online and watch their cursors in real-time"
    },
    {
        icon: (
            <span className="bg-gradient-to-tr from-pink-500 to-purple-500 p-2 rounded-full inline-block">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17 8h2a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2v-8a2 2 0 012-2h2M15 3h-6a2 2 0 00-2 2v2a2 2 0 002 2h6a2 2 0 002-2V5a2 2 0 00-2-2z" /></svg>
            </span>
        ),
        title: "Live Chat",
        desc: "Discuss changes and ideas without leaving the editor"
    },
    {
        icon: (
            <span className="bg-gradient-to-tr from-pink-500 to-purple-500 p-2 rounded-full inline-block">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
            </span>
        ),
        title: "Instant Sync",
        desc: "Changes appear instantly for all connected users"
    }
];

const Home = () => {
    const [roomId, setRoomId] = useState("");
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("user") || '{}');

    const handleJoin = async () => {
        if (roomId.trim()) {
            try {
                await axios.post("http://localhost:5000/api/room/join", {
                    roomCode: roomId,
                    username: user.username || "User",
                    userId: user.id || user._id || "",
                });
                localStorage.setItem("codeshare_popup", "Joined successfully!");
                navigate(`/editor/${roomId}`);
            } catch (err) {
                alert("Failed to join room. Room may not exist.");
            }
        }
    };

    const handleCreate = async () => {
        try {
            const res = await axios.post("http://localhost:5000/api/room/create", {
                language: "javascript",
                username: user.username || "User",
                userId: user.id || user._id || "",
            });
            const newRoomId = res.data.roomCode;
            localStorage.setItem("codeshare_popup", "Room created successfully!");
            navigate(`/editor/${newRoomId}`);
        } catch (err) {
            alert("Failed to create room.");
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#2a0845] via-[#6441a5] to-[#ff5e62] flex flex-col">
            <Navbar />
            <div className="flex flex-1 flex-col items-center justify-center px-4 py-8">
                <h1 className="text-5xl md:text-6xl font-extrabold text-white text-center mb-4">
                    Code Together, <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Build Faster</span>
                </h1>
                <p className="text-lg md:text-xl text-white/80 text-center mb-10 max-w-2xl">
                    Real-time collaborative code editor with live chat. Write, share, and debug code together in perfect sync.
                </p>
                <div className="flex flex-col md:flex-row gap-8 mb-12 w-full max-w-3xl">
                    {/* Create Room Card */}
                    <div className="flex-1 bg-white/10 backdrop-blur-md rounded-2xl shadow-xl p-8 flex flex-col items-center border border-white/20">
                        <div className="mb-3">
                            <span className="inline-block bg-gradient-to-tr from-pink-500 to-purple-500 p-2 rounded-full">
                                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                            </span>
                        </div>
                        <h2 className="text-xl font-bold text-white mb-2">⚡ Create New Room</h2>
                        <p className="text-white/80 mb-4 text-center">Start a new coding session and invite others</p>
                        <button onClick={handleCreate} className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold py-2 rounded-lg shadow-md hover:scale-105 transition-transform">Create Room</button>
                    </div>
                    {/* Join Room Card */}
                    <div className="flex-1 bg-white/10 backdrop-blur-md rounded-2xl shadow-xl p-8 flex flex-col items-center border border-white/20">
                        <div className="mb-3">
                            <span className="inline-block bg-gradient-to-tr from-pink-500 to-purple-500 p-2 rounded-full">
                                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M16 18l6-6-6-6M8 6l-6 6 6 6" /></svg>
                            </span>
                        </div>
                        <h2 className="text-xl font-bold text-white mb-2">⬆ Join Existing Room</h2>
                        <p className="text-white/80 mb-4 text-center">Enter a room code to join a session</p>
                        <input
                            className="w-full mb-3 bg-white/20 border border-white/30 text-white placeholder-white/60 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400"
                            placeholder="Enter room code (e.g., ABC123)"
                            value={roomId}
                            onChange={(e) => setRoomId(e.target.value)}
                        />
                        <button onClick={handleJoin} className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold py-2 rounded-lg shadow-md hover:scale-105 transition-transform">Join Room</button>
                    </div>
                </div>
                {/* Features Section */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 w-full max-w-5xl mt-6">
                    {features.map((f, i) => (
                        <div key={i} className="bg-white/10 backdrop-blur-md rounded-xl p-6 flex flex-col items-center border border-white/20">
                            {f.icon}
                            <h3 className="text-lg font-bold text-white mt-3 mb-1 text-center">{f.title}</h3>
                            <p className="text-white/70 text-center text-sm">{f.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Home;

