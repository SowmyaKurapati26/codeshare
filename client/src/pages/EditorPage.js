import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import CodeEditor from '../components/CodeEditor';
import ChatBox from '../components/ChatBox';
import RunOutput from '../components/RunOutput';
import { io } from 'socket.io-client';
import languageMap from '../utils/languageMap';
import axios from 'axios';
import { useState as useReactState, useEffect as useReactEffect } from 'react';

// Predefined colors for up to 10 users
const USER_COLORS = [
    '#e57373', '#64b5f6', '#81c784', '#ffd54f', '#ba68c8',
    '#4db6ac', '#f06292', '#a1887f', '#90a4ae', '#ffb74d'
];

const EditorPage = () => {
    const { roomId } = useParams();
    const [code, setCode] = useState("");
    const [output, setOutput] = useState("");
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState([]);
    const [cursors, setCursors] = useState({}); // { socketId: { position, username, color } }
    const [users, setUsers] = useState([]); // [{ id, username }]
    const [language, setLanguage] = useState('javascript');
    const [isRunning, setIsRunning] = useState(false);
    const socketRef = useRef();
    const user = JSON.parse(localStorage.getItem("user") || '{}');
    const username = user.username || "You";
    const [popup, setPopup] = useReactState("");

    useReactEffect(() => {
        const msg = localStorage.getItem("codeshare_popup");
        if (msg) {
            setPopup(msg);
            localStorage.removeItem("codeshare_popup");
            setTimeout(() => setPopup(""), 2500);
        }
    }, []);

    const handleRun = async () => {
        setIsRunning(true);
        setOutput("Running...");
        try {
            const res = await axios.post("http://localhost:5000/api/execute/run", {
                code,
                language: languageMap[language],
                input
            });
            setOutput(
                res.data.output ||
                res.data.stderr ||
                res.data.compile_output ||
                (res.data.status && res.data.status.description) ||
                "No output"
            );
        } catch (err) {
            setOutput("Error running code.");
        }
        setIsRunning(false);
    };

    const handleSendMessage = (text) => {
        socketRef.current.emit("chat-message", {
            roomCode: roomId,
            message: text,
            username: username
        });
    };

    const handleCodeChange = (newCode) => {
        setCode(newCode);
        socketRef.current.emit("code-change", { roomCode: roomId, code: newCode });
    };

    // Handle cursor movement
    const handleCursorChange = (position) => {
        socketRef.current.emit("cursor-move", { roomCode: roomId, cursor: position, username });
    };

    // Handle language change
    const handleLanguageChange = (e) => {
        const newLang = e.target.value;
        setLanguage(newLang);
        socketRef.current.emit("language-change", { roomCode: roomId, language: newLang });
    };

    // Assign a color to each user by their order in the user list
    const getUserColors = (userList) => {
        const colorMap = {};
        userList.forEach((u, idx) => {
            colorMap[u.id] = USER_COLORS[idx % USER_COLORS.length];
        });
        return colorMap;
    };

    useEffect(() => {
        // Fetch code from DB on initial mount
        axios.get(`http://localhost:5000/api/room/${roomId}`)
            .then(res => {
                if (res.data && res.data.code) {
                    setCode(res.data.code);
                }
                if (res.data && res.data.language) {
                    setLanguage(res.data.language);
                }
            })
            .catch(() => { });
        socketRef.current = io("http://localhost:5000");

        // Join the room
        socketRef.current.emit("join-room", { roomCode: roomId, username });

        // Listen for code updates
        socketRef.current.on("code-update", (newCode) => {
            setCode(newCode);
        });

        // Listen for chat messages
        socketRef.current.on("chat-message", (msg) => {
            setMessages((prev) => [...prev, msg]);
        });

        // Listen for user-joined events
        socketRef.current.on("user-joined", ({ username: joinedUser }) => {
            setMessages((prev) => [
                ...prev,
                { sender: "System", text: `${joinedUser} joined the room.` }
            ]);
        });

        // Listen for user list updates
        socketRef.current.on("user-list", (userList) => {
            setUsers(userList);
        });

        // Listen for cursor updates from others
        socketRef.current.on("cursor-update", ({ cursor, username, id }) => {
            setCursors((prev) => ({
                ...prev,
                [id]: { position: cursor, username, color: getUserColors(users)[id] }
            }));
        });

        // Remove cursor on disconnect
        socketRef.current.on("user-left", ({ id }) => {
            setCursors((prev) => {
                const copy = { ...prev };
                delete copy[id];
                return copy;
            });
        });

        // Listen for language updates
        socketRef.current.on("language-update", (newLang) => {
            setLanguage(newLang);
        });

        return () => {
            socketRef.current.disconnect();
        };
    }, [roomId, username]);

    // Update cursor colors when user list changes
    useEffect(() => {
        setCursors((prev) => {
            const colorMap = getUserColors(users);
            const updated = {};
            for (const id in prev) {
                updated[id] = { ...prev[id], color: colorMap[id] };
            }
            return updated;
        });
    }, [users]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-700 flex flex-col">
            {popup && (
                <div className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 bg-green-600 text-white px-6 py-3 rounded-xl shadow-lg text-lg font-semibold animate-fade-in">
                    {popup}
                </div>
            )}
            <Navbar roomId={roomId} />
            <div className="flex flex-1 flex-col md:flex-row gap-4 p-4 md:p-8">
                {/* Main Editor Card */}
                <div className="flex-1 bg-[#181c27]/90 rounded-2xl shadow-2xl p-4 md:p-6 flex flex-col">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
                        <div>
                            <select value={language} onChange={handleLanguageChange} className="bg-[#23283a] text-white border-none rounded px-4 py-2 font-semibold focus:ring-2 focus:ring-purple-400">
                                {Object.keys(languageMap).map((lang) => (
                                    <option key={lang} value={lang}>{lang.charAt(0).toUpperCase() + lang.slice(1)}</option>
                                ))}
                            </select>
                        </div>
                        <div className="flex gap-2">
                            <button
                                onClick={handleRun}
                                className="flex items-center bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg font-bold shadow-md transition disabled:opacity-60"
                                disabled={isRunning}
                            >
                                <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 3v18l15-9-15-9z" /></svg>
                                {isRunning ? "Running..." : "Run Code"}
                            </button>
                        </div>
                    </div>
                    <div className="flex-1 mb-4 rounded-xl overflow-hidden">
                        <CodeEditor
                            code={code}
                            language={language}
                            onChange={handleCodeChange}
                            onCursorChange={handleCursorChange}
                            cursors={cursors}
                            username={username}
                        />
                    </div>
                    {/* Input and Output side by side */}
                    <div className="flex flex-col md:flex-row gap-4 mt-2">
                        <div className="flex-1 bg-[#23283a] rounded-xl p-4 flex flex-col">
                            <label className="text-white font-semibold mb-2">Custom Input</label>
                            <textarea
                                className="bg-[#181c27] text-white border-none rounded p-2 w-full focus:outline-none focus:ring-2 focus:ring-purple-400 resize-none"
                                rows={6}
                                value={input}
                                onChange={e => setInput(e.target.value)}
                                placeholder="Custom input for your program"
                            />
                        </div>
                        <div className="flex-1 bg-[#23283a] rounded-xl p-4 flex flex-col">
                            <label className="text-white font-semibold mb-2">Output</label>
                            <div className="flex-1 min-h-[120px]">
                                <RunOutput output={output} />
                            </div>
                        </div>
                    </div>
                </div>
                {/* Sidebar Card */}
                <div className="w-full md:w-1/3 flex flex-col space-y-4">
                    <div className="bg-[#23283a] rounded-2xl shadow-xl p-4 mb-4">
                        <h2 className="font-bold mb-2 text-lg text-white flex items-center gap-2">
                            <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17 20v-2a4 4 0 00-3-3.87M7 20v-2a4 4 0 013-3.87M12 12a4 4 0 100-8 4 4 0 000 8z" /></svg>
                            Active Users ({users.length})
                        </h2>
                        <ul>
                            {users.map((u) => (
                                <li key={u.id} className="flex items-center space-x-2 mb-1">
                                    <span style={{ width: 12, height: 12, background: getUserColors(users)[u.id], borderRadius: '50%', display: 'inline-block' }}></span>
                                    <span className="text-white">{u.username}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="bg-[#23283a] rounded-2xl shadow-xl p-4 flex-1 flex flex-col">
                        <ChatBox messages={messages} onSendMessage={handleSendMessage} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditorPage;