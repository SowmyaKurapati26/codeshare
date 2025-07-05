import express from 'express';
import axios from 'axios';

const router = express.Router();

const JUDGE0_URL = 'https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=false&wait=true';
const JUDGE0_HEADERS = {
    'Content-Type': 'application/json',
    'X-RapidAPI-Key': process.env.RAPIDAPI_KEY, // Use environment variable
    'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com'
};

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
        console.log(err.response?.data || err.message);
        res.status(500).json({ error: 'Execution failed', details: err.message });
    }
});

export default router; 