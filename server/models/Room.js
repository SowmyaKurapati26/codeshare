import mongoose from 'mongoose';

const roomSchema = new mongoose.Schema({
    roomCode: { type: String, required: true, unique: true },
    language: { type: String, default: 'javascript' },
    code: { type: String, default: '' },
    users: [{
        userId: String,
        username: String
    }],
    locked: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Room', roomSchema); 