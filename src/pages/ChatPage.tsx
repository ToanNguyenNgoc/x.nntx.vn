/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import ChatSidebar from "@/components/ChatSidebar";
import ChatWindow from "@/components/ChatWindow";
import { useEffect, useState } from "react";
import Pusher from "pusher-js";
import { useProfileStore } from "@/stores";

//@ts-ignore
window.Pusher = Pusher;
interface Message {
  id: number;
  fromSelf: boolean;
  text: string;
  time: string;
}

export default function ChatPage() {
  const {profile} = useProfileStore(state => state)
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

  useEffect(() => {
    Pusher.logToConsole = true;
    const pusher = new Pusher('e39fb57ddf7d806bbea7', {
      cluster: 'ap1',
      authEndpoint: `${import.meta.env.VITE_REACT_APP_API_URL}/broadcasting/auth`,
      auth: {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('api_token')}`,
          Accept: 'application/json',
        },
      },
    });
    const channel = pusher.subscribe(`private-subscribe-chat.user_id.${profile?.id}`);
    channel.bind('emit-subscribe-chat', function (data: any) {
      console.log(':inbox_tray: Received message:', data);
    });
    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, []);

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
