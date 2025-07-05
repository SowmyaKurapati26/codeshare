import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import EditorPage from "./pages/EditorPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./utils/ProtectedRoute";
import { useEffect } from "react";
import axios from "axios";

function AuthSuccess() {
    const navigate = useNavigate();
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const token = params.get("token");
        if (token) {
            localStorage.setItem("token", token);
            // Fetch user info and store it
            axios.get("http://localhost:5000/api/auth/me", {
                headers: { Authorization: `Bearer ${token}` }
            }).then(res => {
                localStorage.setItem("user", JSON.stringify(res.data));
                navigate("/");
            }).catch(() => {
                navigate("/login");
            });
        } else {
            navigate("/login");
        }
    }, [navigate]);
    return <div>Logging you in...</div>;
}

const App = () => {
    const isAuth = !!localStorage.getItem("token");

    return (
        <Router>
            <Routes>
                <Route path="/" element={
                    <ProtectedRoute>
                        <Home />
                    </ProtectedRoute>
                } />
                <Route path="/editor/:roomId" element={
                    <ProtectedRoute>
                        <EditorPage />
                    </ProtectedRoute>
                } />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/auth-success" element={<AuthSuccess />} />
            </Routes>
        </Router>
    );
};

export default App;
