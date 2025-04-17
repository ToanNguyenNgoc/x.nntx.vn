const users = [
  { username: "dang.rangto", avatar: "https://i.pravatar.cc/150?img=1" },
  { username: "cherryglue", avatar: "https://i.pravatar.cc/150?img=2" },
  { username: "sara2626_if", avatar: "https://i.pravatar.cc/150?img=3" },
];

export function Stories() {
  return (
    <div className="flex space-x-4 overflow-x-auto pb-4">
      {users.map((user) => (
        <div key={user.username} className="flex flex-col items-center">
          <div className="w-16 h-16 rounded-full border-2 border-pink-500 p-[2px]">
            <img src={user.avatar} className="w-full h-full rounded-full" />
          </div>
          <span className="text-xs mt-1 truncate w-16 text-center">{user.username}</span>
        </div>
      ))}
    </div>
  );
}
