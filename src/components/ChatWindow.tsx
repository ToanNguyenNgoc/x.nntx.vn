/* eslint-disable react-hooks/exhaustive-deps */
import usePrevious from "@/hooks/usePrevious";
import { useState, useEffect, useRef } from "react";
import { MoreVertical, Copy, Send, RotateCw, FileIcon } from "lucide-react";
import ChatInput from "@/components/ChatInput";

interface Message {
    id: number;
    fromSelf: boolean;
    text: string;
    time: string;
    recall?: boolean;
    files?: {
        file: File;
        previewUrl: string;
        type: "image" | "video" | "file";
    }[];
}

interface ChatWindowProps {
    username: string;
    messages: Message[];
    onSendMessage: (msg: Message) => void;
    onRecallMessage: (id: number) => void;
}

export default function ChatWindow({
    username,
    messages,
    onSendMessage,
    onRecallMessage,
}: ChatWindowProps) {
    const [showScrollButton, setShowScrollButton] = useState(false);
    const endRef = useRef<HTMLDivElement>(null);
    const menuRef = useRef<HTMLDivElement | null>(null);
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [selectedMessageId, setSelectedMessageId] = useState<number | null>(
        null
    );

    console.log("messages", messages);

    const handleCopy = (text: string) => {
        navigator.clipboard.writeText(text);
        setSelectedMessageId(null);
    };

    const handleRecall = (id: number) => {
        onRecallMessage(id);
        setSelectedMessageId(null);
    };

    // Tự scroll xuống khi có tin nhắn mới
    const prevMessageCount = usePrevious(messages.length);

    // Scroll xuống chỉ khi có thêm tin mới
    useEffect(() => {
        if (
            prevMessageCount !== undefined &&
            messages.length > prevMessageCount
        ) {
            endRef.current?.scrollIntoView({ behavior: "instant" });
        }
    }, [messages]);

    // Theo dõi scroll để hiện nút quay lại
    useEffect(() => {
        const container = scrollContainerRef.current;
        if (!container) return;

        const handleScroll = () => {
            const { scrollTop, scrollHeight, clientHeight } = container;
            const atBottom = scrollHeight - scrollTop - clientHeight < 100;
            setShowScrollButton(!atBottom);
        };

        container.addEventListener("scroll", handleScroll);
        return () => container.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (
                menuRef.current &&
                !menuRef.current.contains(e.target as Node)
            ) {
                setSelectedMessageId(null);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const scrollToBottom = () => {
        endRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <div className="flex-1 flex flex-col justify-between relative">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b">
                <div className="flex items-center gap-3">
                    <img
                        src="https://i.pravatar.cc/150?img=8"
                        className="w-10 h-10 rounded-full"
                    />
                    <div>
                        <div className="font-medium text-sm">{username}</div>
                        <div className="text-xs text-gray-500">
                            Instagram • Online
                        </div>
                    </div>
                </div>
                <button className="text-sm px-3 py-1 border rounded">
                    Xem trang cá nhân
                </button>
            </div>

            {/* Chat list */}
            <div
                ref={scrollContainerRef}
                className="flex-1 p-4 overflow-y-auto space-y-3 bg-gray-50 relative"
            >
                {messages.map((msg) => (
                    <div
                        key={msg.id}
                        className={`flex ${
                            msg.fromSelf ? "justify-end" : "justify-start"
                        } relative group`}
                    >
                        <div
                            className={`flex relative items-center gap-2 ${
                                msg.fromSelf ? "flex-row-reverse" : ""
                            }`}
                        >
                            <div
                                className={`max-w-xs text-sm p-2 rounded-xl break-words ${
                                    msg.fromSelf
                                        ? "bg-black text-white"
                                        : "bg-gray-200 text-black"
                                }`}
                            >
                                {msg.recall ? (
                                    <div className="italic text-sm text-gray-300">
                                        Bạn đã thu hồi tin nhắn này
                                    </div>
                                ) : (
                                    <>
                                        {Array.isArray(msg.files) &&
                                        msg.files?.length > 1 ? (
                                            <div className="grid grid-cols-2 gap-1 mb-2">
                                                {msg.files.map((f, idx) => (
                                                    <div key={idx}>
                                                        {f.type === "image" && (
                                                            <img
                                                                src={
                                                                    f.previewUrl
                                                                }
                                                                className="w-full aspect-square object-cover rounded-md"
                                                            />
                                                        )}
                                                        {f.type === "video" && (
                                                            <video
                                                                controls
                                                                className="w-full aspect-square object-cover rounded-md"
                                                                src={
                                                                    f.previewUrl
                                                                }
                                                            />
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                        ) : (
                                            msg.files?.map((f, idx) => (
                                                <div key={idx} className="mb-2">
                                                    {f.type === "image" && (
                                                        <img
                                                            src={f.previewUrl}
                                                            className="w-40 rounded-lg"
                                                        />
                                                    )}
                                                    {f.type === "video" && (
                                                        <video
                                                            controls
                                                            className="w-60 rounded-lg"
                                                            src={f.previewUrl}
                                                        />
                                                    )}
                                                    {f.type === "file" && (
                                                        <a
                                                            href={f.previewUrl}
                                                            download={
                                                                f.file.name
                                                            }
                                                            className="flex items-center text-sm text-blue-600 hover:underline"
                                                        >
                                                            <FileIcon className="w-4 h-4 mr-1" />
                                                            {f.file.name}
                                                        </a>
                                                    )}
                                                </div>
                                            ))
                                        )}
                                        {msg.text && <div>{msg.text}</div>}
                                        <div className="text-xs mt-1 text-right opacity-60">
                                            {msg.time}
                                        </div>
                                    </>
                                )}
                            </div>

                            {!msg.recall && (
                                <div className="relative">
                                    <button
                                        onClick={() =>
                                            setSelectedMessageId(msg.id)
                                        }
                                        className="opacity-100 cursor-pointer transition"
                                    >
                                        <MoreVertical color="#000" size={16} />
                                    </button>

                                    {selectedMessageId === msg.id && (
                                        <div
                                            ref={menuRef}
                                            className={`absolute top-0 w-44 bg-white rounded-lg shadow border text-sm text-black z-50 ${
                                                msg.fromSelf
                                                    ? "right-[102%]"
                                                    : "left-[102%]"
                                            }`}
                                        >
                                            <div className="px-3 py-2 text-xs text-gray-500">
                                                {msg.time}
                                            </div>

                                            <button className="flex items-center w-full px-3 py-2 hover:bg-gray-100 gap-2">
                                                <Send size={14} /> Chuyển tiếp
                                            </button>

                                            <button
                                                className="flex items-center w-full px-3 py-2 hover:bg-gray-100 gap-2"
                                                onClick={() =>
                                                    handleCopy(msg.text)
                                                }
                                            >
                                                <Copy size={14} /> Sao chép
                                            </button>

                                            {msg.fromSelf && (
                                                <button
                                                    className="flex items-center w-full px-3 py-2 hover:bg-red-50 text-red-600 gap-2"
                                                    onClick={() =>
                                                        handleRecall(msg.id)
                                                    }
                                                >
                                                    <RotateCw size={14} /> Thu
                                                    hồi
                                                </button>
                                            )}
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                ))}
                <div ref={endRef} />
            </div>

            {/* Nút trở về chat mới nhất */}
            {showScrollButton && (
                <button
                    onClick={scrollToBottom}
                    className="absolute left-1/2 w-max -translate-x-1/2 bottom-24 right-6 px-4 py-2 text-sm rounded-full bg-gray-800 text-white shadow-md hover:bg-gray-700 cursor-pointer transition-all duration-200 ease-in-out"
                >
                    Xem chat mới nhất
                </button>
            )}

            {/* Input */}
            <ChatInput
                onSend={({ text, files }) => {
                    const now = new Date();
                    onSendMessage({
                        id: Date.now(),
                        fromSelf: true,
                        text,
                        time: now.toLocaleString("vi-VN"),
                        files,
                    });
                }}
            />
        </div>
    );
}
