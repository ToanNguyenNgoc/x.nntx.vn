import {
  Heart,
  MessageCircle,
  Send,
  Bookmark,
  MoreHorizontal,
} from "lucide-react";

interface PostCardProps {
  avatar: string;
  username: string;
  imageUrl: string;
  caption: string;
  date?: string;
  likes: number;
  comments: string[];
}

export default function PostCard({
  avatar,
  username,
  imageUrl,
  caption,
  // date,
  likes,
  comments,
}: PostCardProps) {
  return (
    <div className="max-w-xl mx-auto border rounded-lg bg-white shadow-sm mb-6">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2">
        <div className="flex items-center gap-3">
          <img src={avatar} className="w-8 h-8 rounded-full" />
          <div className="text-sm font-semibold">{username}</div>
          <span className="text-xs text-gray-400">• 1 tuần</span>
          <button className="text-xs text-blue-600 ml-2">Theo dõi</button>
        </div>
        <MoreHorizontal className="w-5 h-5" />
      </div>

      {/* Content */}
      <div>
        <img src={imageUrl} className="w-full object-cover" />
      </div>

      {/* Actions */}
      <div className="flex justify-between items-center px-4 py-2">
        <div className="flex gap-4">
          <Heart className="w-5 h-5" />
          <MessageCircle className="w-5 h-5" />
          <Send className="w-5 h-5" />
        </div>
        <Bookmark className="w-5 h-5" />
      </div>

      {/* Likes */}
      <div className="px-4 text-sm font-semibold">{likes.toLocaleString()} lượt thích</div>

      {/* Caption & Comments */}
      <div className="px-4 pt-1 pb-2 text-sm">
        <span className="font-semibold">{username}</span> {caption} <span className="text-gray-400">... xem thêm</span>
        <div className="text-xs text-blue-500 mt-1">Xem bản dịch</div>
        <div className="text-gray-500 text-sm mt-1">Xem tất cả {comments.length} bình luận</div>
      </div>

      {/* Comment input */}
      <div className="px-4 py-2 border-t">
        <input
          type="text"
          placeholder="Bình luận..."
          className="w-full outline-none text-sm py-2"
        />
      </div>
    </div>
  );
}
