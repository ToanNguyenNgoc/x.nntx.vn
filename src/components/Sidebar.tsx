import PostCreationModal from "@/components/PostCreationModal";
import {
    Home,
    Search,
    Compass,
    Clapperboard,
    MessageCircle,
    Heart,
    Plus,
    User,
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const menuItems = [
    { icon: <Home className="w-5 h-5" />, label: "Trang chủ", link: "/" },
    {
        icon: <User className="w-5 h-5" />,
        label: "Trang cá nhân",
        link: "/profile",
    },
    { icon: <Search className="w-5 h-5" />, label: "Tìm kiếm" },
    { icon: <Compass className="w-5 h-5" />, label: "Khám phá" },
    { icon: <Clapperboard className="w-5 h-5" />, label: "Reels" },
    {
        icon: <MessageCircle className="w-5 h-5" />,
        label: "Tin nhắn",
        link: "/messages",
    },
    { icon: <Heart className="w-5 h-5" />, label: "Thông báo" },
];

export default function Sidebar() {
    const [showModal, setShowModal] = useState(false);
    return (
        <div className="w-60 min-h-screen border-r px-4 py-6 space-y-6">
            <div className="text-2xl font-bold mb-6 px-2">Instagram</div>

            <nav className="space-y-4">
                {menuItems.map((item, idx) => (
                    <Link
                        key={idx}
                        to={item.link || "#"}
                        className="flex items-center gap-4 px-2 py-2 rounded-xl hover:bg-gray-100 cursor-pointer"
                    >
                        {item.icon}
                        <span className="font-medium text-sm">
                            {item.label}
                        </span>
                    </Link>
                ))}
                <p
                    onClick={() => setShowModal(true)}
                    className="flex items-center gap-4 px-2 py-2 rounded-xl hover:bg-gray-100 cursor-pointer"
                >
                    <Plus className="w-5 h-5" />
                    <span className="font-medium text-sm">Tạo bài Viết</span>
                </p>
            </nav>
            {showModal && (
                <PostCreationModal onClose={() => setShowModal(false)} />
            )}
        </div>
    );
}
