import ChatSidebar from "@/components/ChatSidebar";
import ChatWindow from "@/components/ChatWindow";
import { useState } from "react";

interface Message {
  id: number;
  fromSelf: boolean;
  text: string;
  time: string;
}

export default function ChatPage() {
  const [selectedUser, setSelectedUser] = useState("TRIGGERCLUB");

  const handleRecallMessage = (id: number) => {
    setAllMessages((prev) => ({
      ...prev,
      [selectedUser]: prev[selectedUser].map((msg) =>
        msg.id === id ? { ...msg, recall: true } : msg
      ),
    }));
  };
  

  const [allMessages, setAllMessages] = useState<Record<string, Message[]>>({
    "TRIGGERCLUB": [
      { id: 1, fromSelf: true, text: "Dạ mình chào shop", time: "20:19 19/8/24" },
      { id: 2, fromSelf: true, text: "Mình có đặt shopee 1 cái quần...", time: "18:03 20/8/24" },
    ],
    "Nguyễn Lộc": [
      { id: 1, fromSelf: false, text: "🙂", time: "49 tuần" },
    ],
  });

  return (
    <div className="flex h-screen">
      <ChatSidebar
        selectedUser={selectedUser}
        onSelectUser={(user) => setSelectedUser(user)}
      />
      <ChatWindow
          username={selectedUser}
          messages={allMessages[selectedUser] || []}
          onRecallMessage={handleRecallMessage}
          onSendMessage={(newMessage) => {
          setAllMessages((prev) => ({
            ...prev,
            [selectedUser]: [...(prev[selectedUser] || []), newMessage],
          }));
        }}
      />
    </div>
  );
}
