interface ChatSidebarProps {
  selectedUser: string;
  onSelectUser: (username: string) => void;
}

const conversations = [
  { name: "TRIGGERCLUB", avatar: "https://i.imgur.com/wRUa7nb.png", lastMessage: "Alo shop" },
  { name: "Nguyễn Lộc", avatar: "https://i.pravatar.cc/150?img=1", lastMessage: "🙂" },
];

export default function ChatSidebar({ selectedUser, onSelectUser }: ChatSidebarProps) {
  return (
    <div className="w-[350px] border-r px-4 py-6 overflow-y-auto">
      <h2 className="text-xl font-bold mb-6">long__do</h2>
      <div className="space-y-4">
        {conversations.map((user) => (
          <div
            key={user.name}
            onClick={() => onSelectUser(user.name)}
            className={`flex items-center gap-3 cursor-pointer p-2 rounded-lg 
              ${selectedUser === user.name ? "bg-gray-200" : "hover:bg-gray-100"}`}
          >
            <img src={user.avatar} className="w-10 h-10 rounded-full" />
            <div>
              <div className="font-medium">{user.name}</div>
              <div className="text-sm text-gray-500 truncate w-[200px]">{user.lastMessage}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
