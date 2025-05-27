import NotificationPopup from "@/components/NotificationPopup";
import PostCard from "@/components/PostCard";
import { Stories } from "@/components/Stories";
import { Suggestions } from "@/components/Suggestions";

type Post = {
    avatar: string;
    username: string;
    imageUrl: string;
    caption: string;
    date: string;
    likes: number;
    comments: string[];
};

export default function HomePage() {
    const posts: Post[] = [
        {
            avatar: "https://i.pravatar.cc/300",
            username: "studio_by_kei",
            imageUrl: "https://i.imgur.com/CcCwR3V.jpeg",
            caption: "桜がどんどん散り始めててなんだか寂しい。",
            date: "2025/4/7",
            likes: 32907,
            comments: ["Đẹp quá!", "Ảnh nghệ thuật thật sự"],
        },
        {
            avatar: "https://i.pravatar.cc/301",
            username: "sakura_life",
            imageUrl: "https://i.imgur.com/9XQF9F1.jpeg",
            caption: "Cuộc sống thật đẹp nếu biết trân trọng từng khoảnh khắc.",
            date: "2025/4/8",
            likes: 1873,
            comments: ["Hay quá", "Bức ảnh có hồn ghê"],
        },
    ];
    return (
        <div className="flex max-w-6xl mx-auto">
            <div className="flex-1 px-6 py-4">
                <Stories />
                {posts.map((post, index) => (
                    <PostCard
                        key={index}
                        avatar={post.avatar}
                        username={post.username}
                        imageUrl={post.imageUrl}
                        caption={post.caption}
                        date={post.date}
                        likes={post.likes}
                        comments={post.comments}
                    />
                ))}
            </div>

            <div className="w-[320px] lg:block px-6 py-4">
                <Suggestions />
            </div>
            <NotificationPopup />
        </div>
    );
}
