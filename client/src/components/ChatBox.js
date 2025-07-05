import React from 'react';

const ChatBox = ({ messages, onSendMessage }) => {
    const [newMessage, setNewMessage] = React.useState("");

    const handleSend = () => {
        if (newMessage.trim()) {
            onSendMessage(newMessage);
            setNewMessage("");
        }
    };

    return (
        <div className="flex flex-col h-full bg-[#23283a] rounded-xl p-0">
            <div className="px-4 pt-4 pb-2 border-b border-white/10 flex items-center gap-2">
                <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" /></svg>
                <span className="text-lg font-semibold text-white">Talk2Code</span>
            </div>
            <div className="flex-1 overflow-y-auto px-4 py-2 space-y-3">
                {messages.map((msg, idx) => (
                    msg.sender === "System" ? (
                        <div key={idx} className="text-center text-gray-400 italic text-sm py-1">
                            {msg.text}
                        </div>
                    ) : (
                        <div key={idx}>
                            <div className="flex items-baseline gap-2">
                                <span className="font-bold text-purple-400">{msg.sender}</span>
                                {msg.time && <span className="text-xs text-gray-400">{msg.time}</span>}
                            </div>
                            <div className="text-white text-base ml-1">{msg.text}</div>
                        </div>
                    )
                ))}
            </div>
            <div className="p-3 border-t border-white/10 bg-[#23283a] flex items-center gap-2">
                <input
                    className="flex-1 bg-[#181c27] text-white border border-white/20 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400 placeholder-gray-400"
                    placeholder="Type a message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyDown={e => { if (e.key === 'Enter') handleSend(); }}
                />
                <button onClick={handleSend} className="bg-purple-600 hover:bg-purple-700 text-white p-2 rounded-xl flex items-center justify-center transition">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M22 2L11 13" /><path strokeLinecap="round" strokeLinejoin="round" d="M22 2L15 22L11 13L2 9L22 2Z" /></svg>
                </button>
            </div>
        </div>
    );
};

export default ChatBox;
