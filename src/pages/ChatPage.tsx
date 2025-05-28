import ChatSidebar from "@/components/ChatSidebar";
import ChatWindow from "@/components/ChatWindow";
import { useGetParamsUrl } from "@/hooks";


export default function ChatPage() {

  // const handleRecallMessage = (id: number) => {
  //   setAllMessages((prev) => ({
  //     ...prev,
  //     [selectedUser]: prev[selectedUser].map((msg) =>
  //       msg.id === id ? { ...msg, recall: true } : msg
  //     ),
  //   }));
  // };


  const params = useGetParamsUrl<{ topic_id?: string }>();
  

  return (
    <div className="flex h-screen">
      <ChatSidebar
        topic_id={Number(params.topic_id)}
      />
      {
        !isNaN(Number(params.topic_id)) &&
        <ChatWindow
          topic_id={Number(params.topic_id)}
        />
      }
    </div>
  );
}
