import React, { useRef, useEffect } from 'react';
import Editor from '@monaco-editor/react';

const CodeEditor = ({ language, code, onChange, onCursorChange, cursors = {}, username }) => {
    const editorRef = useRef();
    const monacoRef = useRef();
    const decorationsRef = useRef([]);

    // Handle editor mount
    function handleEditorDidMount(editor, monaco) {
        editorRef.current = editor;
        monacoRef.current = monaco;
        // Listen for cursor position changes
        editor.onDidChangeCursorPosition((e) => {
            if (onCursorChange) {
                onCursorChange(e.position);
            }
        });
    }

    // Update decorations for remote cursors
    useEffect(() => {
        if (!editorRef.current || !monacoRef.current) return;
        const editor = editorRef.current;
        const monaco = monacoRef.current;
        // Remove old decorations
        decorationsRef.current = editor.deltaDecorations(
            decorationsRef.current,
            Object.entries(cursors).map(([id, { position, username: user, color }]) => ({
                range: new monaco.Range(position.lineNumber, position.column, position.lineNumber, position.column),
                options: {
                    className: 'remote-cursor',
                    afterContentClassName: 'remote-cursor-label',
                    stickiness: monaco.editor.TrackedRangeStickiness.NeverGrowsWhenTypingAtEdges,
                    after: {
                        content: ` ${user}`,
                        inlineClassName: `remote-cursor-username remote-cursor-username-${id}`,
                    },
                    inlineClassName: `remote-cursor-border remote-cursor-border-${id}`,
                },
            }))
        );
    }, [cursors]);

    // Inject dynamic styles for each cursor color
    useEffect(() => {
        const styleId = 'remote-cursor-dynamic-styles';
        let styleTag = document.getElementById(styleId);
        if (!styleTag) {
            styleTag = document.createElement('style');
            styleTag.id = styleId;
            document.head.appendChild(styleTag);
        }
        let styles = '';
        Object.entries(cursors).forEach(([id, { color }]) => {
            styles += `
                .remote-cursor-border-${id} {
                    border-left: 2px solid ${color || '#ff9800'} !important;
                    margin-left: -1px;
                    pointer-events: none;
                }
                .remote-cursor-username-${id} {
                    color: ${color || '#ff9800'} !important;
                    font-size: 0.8em;
                    background: #222;
                    border-radius: 2px;
                    padding: 0 2px;
                    margin-left: 2px;
                }
            `;
        });
        styleTag.innerHTML = styles;
        return () => {
            styleTag.innerHTML = '';
        };
    }, [cursors]);

    return (
        <div style={{ position: 'relative' }}>
            <Editor
                height="400px"
                defaultLanguage={language}
                value={code}
                onChange={onChange}
                theme="vs-dark"
                onMount={handleEditorDidMount}
            />
        </div>
    );
};

export default CodeEditor;