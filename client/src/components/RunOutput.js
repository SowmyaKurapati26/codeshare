import React from 'react';

const RunOutput = ({ output }) => {
    return (
        <div className="bg-black text-green-400 p-4 h-48 overflow-y-auto rounded">
            <pre>{output || "Output will be shown here..."}</pre>
        </div>
    );
};

export default RunOutput;