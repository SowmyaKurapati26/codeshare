import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ roomId }) => {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("user") || '{}');
    const username = user.username || "User";
    const [copied, setCopied] = useState(false);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
    };

    const handleCopy = () => {
        if (roomId) {
            navigator.clipboard.writeText(roomId);
            setCopied(true);
            setTimeout(() => setCopied(false), 1800);
        }
    };

    return (
        <nav className="flex justify-between items-center bg-[#23283a]/80 backdrop-blur-md p-4 md:p-6 text-white rounded-b-2xl shadow-xl border-b border-white/10 relative z-20">
            <div className="flex items-center space-x-4">
                <h1 className="text-lg font-bold cursor-pointer flex items-center gap-2" onClick={() => navigate("/")}>
                    <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M16 18l6-6-6-6M8 6l-6 6 6 6" /></svg>
                    CodeShare
                </h1>
                {roomId && (
                    <span className="flex items-center bg-[#181c27] bg-opacity-80 px-3 py-1 rounded-lg text-sm space-x-2 border border-white/10 shadow-sm">
                        <span className="font-semibold text-purple-300">Room:</span>
                        <span className="tracking-wider font-mono text-white">{roomId}</span>
                        <button onClick={handleCopy} title="Copy Room Code" className="ml-1 p-1 rounded hover:bg-purple-700 bg-purple-600 transition flex items-center justify-center">
                            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="9" y="9" width="13" height="13" rx="2" ry="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" /></svg>
                        </button>
                    </span>
                )}
                <span className="bg-[#181c27] bg-opacity-80 px-3 py-1 rounded-lg text-sm border border-white/10 shadow-sm flex items-center gap-1">
                    <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><path d="M12 16v-4m0-4h.01" /></svg>
                    <span className="font-semibold text-blue-300">User:</span>
                    <span className="text-white">{username}</span>
                </span>
            </div>
            {copied && (
                <div className="absolute top-2 left-1/2 transform -translate-x-1/2 bg-green-600 text-white px-4 py-2 rounded shadow-lg text-sm animate-fade-in z-50">
                    Copied successfully
                </div>
            )}
            <button onClick={handleLogout} className="bg-gradient-to-r from-pink-500 to-red-500 hover:from-red-500 hover:to-pink-500 text-white px-5 py-2 rounded-xl font-bold shadow-md transition-transform hover:scale-105">
                Logout
            </button>
        </nav>
    );
};

export default Navbar;
