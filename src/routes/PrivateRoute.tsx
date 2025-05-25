import ProfileForm from "@/components/ProfileForm"
import Sidebar from "@/components/Sidebar"
import { NotFoundPage } from "@/pages"
import ChatPage from "@/pages/ChatPage"
import HomePage from "@/pages/HomePage"
import UserProfile from "@/pages/UserProfile"
import { Route, Routes } from "react-router-dom"

export const PrivateRoute = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 bg-gray-50 min-h-screen">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/messages" element={<ChatPage />} />
          <Route path="/edit-profile" element={<ProfileForm />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </div>
  )
}