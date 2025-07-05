import express from 'express';
import Room from '../models/Room.js';
import { nanoid } from 'nanoid';
import axios from 'axios';

const router = express.Router();

const JUDGE0_URL = 'https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=false&wait=true';
const JUDGE0_HEADERS = {
    'Content-Type': 'application/json',
    'X-RapidAPI-Key': process.env.RAPIDAPI_KEY, // Use environment variable
    'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com'
};

// Create a new room
router.post('/create', async (req, res) => {
    const { language, username, userId } = req.body;
    const roomCode = nanoid(8).toUpperCase();
    try {
        const room = new Room({
            roomCode,
            language: language || 'javascript',
            users: [{ userId, username }],
        });
        await room.save();
        res.json({ roomCode });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Join a room
router.post('/join', async (req, res) => {
    const { roomCode, username, userId } = req.body;
    try {
        const room = await Room.findOne({ roomCode });
        if (!room) return res.status(404).json({ message: 'Room not found' });
        if (!room.users.some(u => u.userId === userId)) {
            room.users.push({ userId, username });
            await room.save();
        }
        res.json({ message: 'Joined room', room });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Get room info
router.get('/:roomCode', async (req, res) => {
    try {
        const room = await Room.findOne({ roomCode: req.params.roomCode });
        if (!room) return res.status(404).json({ message: 'Room not found' });
        res.json(room);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

router.post('/run', async (req, res) => {
    const { code, language, input } = req.body;
    try {
        const response = await axios.post(JUDGE0_URL, {
            source_code: code,
            language_id: language, // This should be the Judge0 language ID
            stdin: input || ""
        }, { headers: JUDGE0_HEADERS });

        res.json({
            output: response.data.stdout,
            stderr: response.data.stderr,
            compile_output: response.data.compile_output,
            status: response.data.status
        });
    } catch (err) {
        res.status(500).json({ error: 'Execution failed', details: err.message });
    }
});

export default router; 