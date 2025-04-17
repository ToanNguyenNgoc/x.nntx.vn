import Sidebar from "@/components/Sidebar";
import "./App.css";
import HomePage from "@/pages/HomePage";
import { Routes, Route } from "react-router-dom";
import ChatPage from "@/pages/ChatPage";
import UserProfile from "@/pages/UserProfile";
import ProfileForm from "@/components/ProfileForm";

function App() {
    return (
        <div className="flex">
            <Sidebar />
            <div className="flex-1 bg-gray-50 min-h-screen">
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/profile" element={<UserProfile />} />
                    <Route path="/messages" element={<ChatPage />} />
                    <Route path="/edit-profile" element={<ProfileForm />} />
                </Routes>
            </div>
        </div>
    );
}

export default App;
