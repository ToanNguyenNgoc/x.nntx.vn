import { useProfileStore } from "@/stores";

const suggestedUsers = [
  { username: "trang_bi_bo", avatar: "https://i.pravatar.cc/150?img=4" },
  { username: "doanhdao77", avatar: "https://i.pravatar.cc/150?img=5" },
  { username: "_maryam.15._", avatar: "https://i.pravatar.cc/150?img=6" },
];

export function Suggestions() {
  const {profile} = useProfileStore(state => state)
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <img src={profile?.avatar} className="w-10 h-10 rounded-full" />
          <div className="text-sm font-semibold">{profile?.name}</div>
        </div>
        <button className="text-blue-500 text-sm">Chuyển</button>
      </div>

      <div className="flex justify-between text-sm text-gray-500 font-medium mb-2">
        <span>Gợi ý cho bạn</span>
        <button className="text-black text-xs">Xem tất cả</button>
      </div>

      {suggestedUsers.map((user) => (
        <div key={user.username} className="flex justify-between items-center text-sm">
          <div className="flex items-center gap-3">
            <img src={user.avatar} className="w-8 h-8 rounded-full" />
            <div>
              <div className="font-semibold">{user.username}</div>
              <div className="text-xs text-gray-500">Gợi ý cho bạn</div>
            </div>
          </div>
          <button className="text-blue-500 text-sm">Theo dõi</button>
        </div>
      ))}
    </div>
  );
}
