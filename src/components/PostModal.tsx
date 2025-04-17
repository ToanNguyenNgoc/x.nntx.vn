import { X, Heart } from "lucide-react";
import { useEffect } from "react";

interface Comment {
  id: number;
  user: {
    name: string;
    avatar: string;
  };
  content: string;
}

interface PostModalProps {
  imageUrl: string;
  caption: string;
  username: string;
  userAvatar: string;
  comments: Comment[];
  likes: number;
  onClose: () => void;
}

export default function PostModal({
  imageUrl,
  caption,
  username,
  userAvatar,
  comments,
  likes,
  onClose,
}: PostModalProps) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center">
      <div className="bg-white max-w-5xl w-full h-[90%] flex rounded-lg overflow-hidden relative">
        {/* Close */}
        <button onClick={onClose} className="absolute top-4 right-4 text-white z-50 cursor-pointer">
          <X color="#000" size={28} />
        </button>

        {/* Left image */}
        <div className="w-2/3 bg-black flex items-center justify-center">
          <img src={imageUrl} alt="post" className="max-h-full object-contain" />
        </div>

        {/* Right content */}
        <div className="w-1/3 flex flex-col justify-between border-l">
          {/* Header */}
          <div className="flex items-center gap-3 p-4 border-b">
            <img src={userAvatar} className="w-8 h-8 rounded-full" />
            <span className="font-semibold text-sm">{username}</span>
          </div>

          {/* Comments */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 text-sm">
            {/* Caption */}
            <div className="flex items-start gap-3">
              <img src={userAvatar} className="w-8 h-8 rounded-full" />
              <div>
                <span className="font-semibold mr-2">{username}</span>
                {caption}
              </div>
            </div>

            {/* Comment list */}
            {comments.map((cmt) => (
              <div key={cmt.id} className="flex items-start gap-3">
                <img src={cmt.user.avatar} className="w-8 h-8 rounded-full" />
                <div>
                  <span className="font-semibold mr-2">{cmt.user.name}</span>
                  {cmt.content}
                </div>
              </div>
            ))}
          </div>

          {/* Bottom actions */}
          <div className="p-4 border-t space-y-2">
            <div className="flex items-center gap-4">
              <Heart className="w-5 h-5" />
            </div>
            <div className="text-sm font-semibold">{likes} lượt thích</div>
            <div className="text-xs text-gray-500">7 Tháng 7 2024</div>

            <div className="mt-2 border-t pt-2">
              <input
                placeholder="Bình luận..."
                className="w-full text-sm py-2 outline-none"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
