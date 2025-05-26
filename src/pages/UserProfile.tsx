import PostPreview from "@/components/PostPreview";
import { Button } from "@/components/ui/button";
import { useProfileStore } from "@/stores";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const posts = [
    {
        id: 1,
        imageUrl: "https://i.imgur.com/oW2HzvJ.png",
        caption: "Đợt này nổi lên phong trào săn airdrops nè...",
        likes: 1,
        comments: 0,
    },
    {
        id: 2,
        imageUrl: "https://i.imgur.com/JZyPbQl.png",
        caption: "Vip nè ae",
        likes: 3,
        comments: 2,
    },
];

export default function UserProfile() {
    const {profile} = useProfileStore(state => state)
    const [activeTab, setActiveTab] = useState<"posts" | "saved" | "tagged">(
        "posts"
    );
    const navigate = useNavigate();

    return (
        <div className="max-w-5xl mx-auto px-4 py-8">
            {/* Top profile info */}
            <div className="flex items-start gap-10">
                <img
                    src={profile?.avatar}
                    className="w-32 h-32 rounded-full object-cover"
                />
                <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-4">
                        <h2 className="text-xl font-semibold">{profile?.name}</h2>
                        <Button
                            variant="secondary"
                            className="border px-3 py-1 rounded text-sm cursor-pointer"
                            onClick={() => navigate("/edit-profile")}
                        >
                            Chỉnh sửa trang cá nhân
                        </Button>
                        <Button
                            variant="secondary"
                            className="border px-3 py-1 rounded text-sm cursor-pointer"
                        >
                            Xem kho lưu trữ
                        </Button>
                    </div>
                    <div className="flex gap-6 text-sm">
                        <div>
                            <strong>2</strong> bài viết
                        </div>
                        <div>
                            <strong>4</strong> người theo dõi
                        </div>
                        <div>
                            <strong>10</strong> đang theo dõi
                        </div>
                    </div>
                    <div className="text-sm text-gray-600">@{profile?.name}</div>
                </div>
            </div>

            {/* Stories highlight */}
            <div className="flex items-center gap-6 mt-8 mb-4">
                <div className="flex flex-col items-center">
                    <div className="w-16 h-16 rounded-full border border-gray-300 flex items-center justify-center text-2xl text-gray-400">
                        +
                    </div>
                    <span className="text-xs mt-1">Mới</span>
                </div>
            </div>

            {/* Tabs */}
            <div className="border-t mt-6 pt-4">
                <div className="flex justify-center gap-8 text-sm text-gray-500 mb-6">
                    <button
                        onClick={() => setActiveTab("posts")}
                        className={`px-2 ${
                            activeTab === "posts"
                                ? "font-semibold text-black border-black"
                                : ""
                        }`}
                    >
                        📄 BÀI VIẾT
                    </button>
                    <button
                        onClick={() => setActiveTab("saved")}
                        className={`px-2 ${
                            activeTab === "saved"
                                ? "font-semibold text-black border-black"
                                : ""
                        }`}
                    >
                        🔖 ĐÃ LƯU
                    </button>
                    <button
                        onClick={() => setActiveTab("tagged")}
                        className={`px-2 ${
                            activeTab === "tagged"
                                ? "font-semibold text-black border-black"
                                : ""
                        }`}
                    >
                        🏷️ ĐƯỢC GẮN THẺ
                    </button>
                </div>

                {/* Tab content */}
                {activeTab === "posts" && (
                    <div className="grid grid-cols-3 gap-2">
                        {posts.map((post) => (
                            <PostPreview
                                key={post.id}
                                imageUrl={post.imageUrl}
                                caption={post.caption}
                                likes={post.likes}
                                comments={post.comments}
                                username="air_drops_ldc"
                            />
                        ))}
                    </div>
                )}

                {activeTab === "saved" && (
                    <div className="text-center py-10 text-gray-600">
                        <div className="text-4xl mb-2">🔖</div>
                        <div className="text-xl font-bold mb-1">Lưu</div>
                        <p className="max-w-md mx-auto text-sm">
                            Lưu ảnh và video mà bạn muốn xem lại. Sẽ không có ai
                            được thông báo và chỉ mình bạn có thể xem những gì
                            mình đã lưu.
                        </p>
                        <p className="text-xs mt-2 text-gray-400">
                            Chỉ mình bạn có thể xem mục mình đã lưu
                        </p>
                    </div>
                )}

                {activeTab === "tagged" && (
                    <div className="text-center py-10 text-gray-600">
                        <div className="text-4xl mb-2">📸</div>
                        <div className="text-xl font-bold mb-1">
                            Ảnh có mặt bạn
                        </div>
                        <p className="max-w-md mx-auto text-sm">
                            Khi mọi người gắn thẻ bạn trong ảnh, ảnh sẽ xuất
                            hiện tại đây.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
