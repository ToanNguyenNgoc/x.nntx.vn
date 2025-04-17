import { Heart, MessageCircle } from "lucide-react";
import { useState } from "react";
import PostModal from "./PostModal";

interface PostPreviewProps {
    imageUrl: string;
    caption: string;
    likes: number;
    comments: number;
    username: string;
}

export default function PostPreview({
    imageUrl,
    caption,
    likes,
    comments,
    username,
}: PostPreviewProps) {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <div
                className="relative group cursor-pointer"
                onClick={() => setShowModal(true)}
            >
                <img
                    src={imageUrl}
                    className="w-full aspect-square object-cover"
                />
                <div className="absolute inset-0 bg-black/40 hidden group-hover:flex items-center justify-center gap-4 text-white text-sm font-semibold">
                    <div className="flex items-center gap-1">
                        <Heart className="w-5 h-5 fill-white" />
                        {likes}
                    </div>
                    <div className="flex items-center gap-1">
                        <MessageCircle className="w-5 h-5 fill-white" />
                        {comments}
                    </div>
                </div>
            </div>

            {showModal && (
                <PostModal
                    imageUrl="https://link-to-image"
                    caption={caption}
                    username={username}
                    userAvatar="https://i.pravatar.cc/150?img=3"
                    likes={16}
                    comments={[
                        {
                            id: 1,
                            user: {
                                name: "duongvuong_qt",
                                avatar: "https://i.pravatar.cc/150?img=4",
                            },
                            content: "❤️",
                        },
                        {
                            id: 2,
                            user: {
                                name: "doanhdao77",
                                avatar: "https://i.pravatar.cc/150?img=5",
                            },
                            content: "Đẹp giai",
                        },
                    ]}
                    onClose={() => setShowModal(false)}
                />
            )}
        </>
    );
}
