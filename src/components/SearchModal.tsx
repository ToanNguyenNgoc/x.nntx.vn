import { X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useGetInfinitiesUsers } from "@/hooks";
import { FC, useState } from "react";
import { useDebounce } from "@/hooks";
import { UserItem } from "./UserItem";


export default function SearchModal({ onClose }: { onClose: () => void }) {
  const [keyword, setKeyword] = useState('');
  const searchKeyword = useDebounce<string>(keyword, 600);
  const { users, isEmpty, isLoading } = useGetInfinitiesUsers({
    sort: '-created_at',
    'filter[keyword]': searchKeyword
  });
  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-start pt-20 z-50">
      <div className="bg-white w-full max-w-md rounded-xl p-4 shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Tìm kiếm</h2>
          <button onClick={onClose}>
            <X className="w-5 h-5" />
          </button>
        </div>
        <Input
          placeholder="Tìm kiếm người dùng, bài viết..."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          className="mb-4"
        />
        <div className="space-y-2 max-h-80 overflow-y-auto">
          {isLoading && <LoadingSkeleton />}
          {isEmpty && <p className="text-sm text-gray-500">Không tìm thấy kết quả.</p>}
          {users.map((item) => (
            <UserItem to={`/profile/${item.id}`} user={item} key={item.id} onClick={onClose} />
          ))}
        </div>
      </div>
    </div>
  );
}

export const LoadingSkeleton: FC = () => {
  return (
    <>
      {[...Array(5)].map((_, idx) => (
        <div
          key={idx}
          className="flex items-center gap-3 p-2 animate-pulse"
        >
          <div className="w-8 h-8 bg-gray-300 rounded-full" />
          <div className="flex flex-col space-y-1">
            <div className="w-32 h-3 bg-gray-300 rounded" />
            <div className="w-24 h-2 bg-gray-200 rounded" />
          </div>
        </div>
      ))}
    </>
  )
}
