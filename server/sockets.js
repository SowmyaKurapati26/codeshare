import Room from './models/Room.js';

const roomUsers = {};

export function setupSockets(io) {
    io.on('connection', (socket) => {
        console.log('User connected:', socket.id);
        let currentRoom = null;
        let currentUsername = null;

        // Join room
        socket.on('join-room', ({ roomCode, username }) => {
            socket.join(roomCode);
            currentRoom = roomCode;
            currentUsername = username;
            if (!roomUsers[roomCode]) roomUsers[roomCode] = {};
            roomUsers[roomCode][socket.id] = username;
            socket.to(roomCode).emit('user-joined', { username, id: socket.id });
            // Broadcast updated user list
            io.to(roomCode).emit('user-list', Object.entries(roomUsers[roomCode]).map(([id, username]) => ({ id, username })));
        });

        // Code change (persist to DB)
        socket.on('code-change', async ({ roomCode, code }) => {
            socket.to(roomCode).emit('code-update', code);
            try {
                await Room.findOneAndUpdate({ roomCode }, { code });
            } catch (err) {
                console.error('Error saving code:', err);
            }
        });

        // Language change (persist to DB)
        socket.on('language-change', async ({ roomCode, language }) => {
            socket.to(roomCode).emit('language-update', language);
            try {
                await Room.findOneAndUpdate({ roomCode }, { language });
            } catch (err) {
                console.error('Error saving language:', err);
            }
        });

        // Chat message
        socket.on('chat-message', ({ roomCode, message, username }) => {
            io.to(roomCode).emit('chat-message', { sender: username, text: message });
        });

        // Cursor movement
        socket.on('cursor-move', ({ roomCode, cursor, username }) => {
            socket.to(roomCode).emit('cursor-update', { cursor, username, id: socket.id });
        });

        // Disconnect
        socket.on('disconnect', () => {
            if (currentRoom && roomUsers[currentRoom]) {
                delete roomUsers[currentRoom][socket.id];
                // Broadcast updated user list
                io.to(currentRoom).emit('user-list', Object.entries(roomUsers[currentRoom]).map(([id, username]) => ({ id, username })));
                // Notify others to remove cursor
                io.to(currentRoom).emit('user-left', { id: socket.id });
            }
            console.log('User disconnected:', socket.id);
        });
    });
} 