import { Media, usePostMedia } from "@/hooks";
import {
  Smile,
  Send,
  Image as ImageIcon,
  File as FileIcon,
  Video as VideoIcon,
  X,
  Plus,
} from "lucide-react";
import { useState, useRef } from "react";

export default function ChatInput({
  onSend,
}: {
  onSend: (payload: { text: string; medias: Media[] }) => void;
}) {
  const { handlePostMedia } = usePostMedia();
  const [input, setInput] = useState("");
  // const [files, setFiles] = useState<PendingFile[]>([]);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleSend = () => {
    if (!input.trim() && medias.length === 0) return;
    onSend({ text: input.trim(), medias });
    setInput("");
    setMedias([]);
  };
  //
  const [medias, setMedias] = useState<Media[]>([]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    handlePostMedia({
      e,
      callBack(data) {
        console.log(data);
        setMedias([...data, ...medias])
      },
    })
  };

  const removeFile = (model_id: number) => {
    setMedias(prev => prev.filter(i => i.model_id !== model_id));
  };

  return (
    <div
      className={`border  px-4 py-4 m-4 bg-white ${medias.length > 0 ? "rounded-xl" : "rounded-full"
        }`}
    >
      {/* Preview area */}
      {medias.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3 mb-2 items-center">
          {medias.map((f, idx) => (
            <div
              key={idx}
              className="relative aspect-square w-full"
            >
              {f.model_type.startsWith("image") && (
                <img
                  src={f.original_url}
                  className="aspect-square w-full object-cover rounded-md"
                />
              )}
              {f.model_type.startsWith('video') && (
                <video
                  src={f.original_url}
                  className="aspect-square w-full object-cover rounded-md"
                  muted
                />
              )}
              {f.model_type.startsWith('file') && (
                <div className="aspect-square w-full flex items-center justify-center bg-gray-100 text-sm text-center p-2 rounded-md">
                  <FileIcon className="w-5 h-5 mr-1" />
                  {f.original_url.slice(0, 10)}
                </div>
              )}
              {
                f.model_id > 0 ?
                  <button
                    onClick={() => removeFile(f.model_id)}
                    className="absolute -top-2 -right-2 bg-white rounded-full border shadow"
                  >
                    <X className="w-4 h-4" />
                  </button>
                  :
                  <div className="absolute inset-0 bg-white/50 backdrop-blur-sm flex items-center justify-center rounded-md">
                    <div className="w-6 h-6 border-2 border-gray-300 border-t-transparent rounded-full animate-spin" />
                  </div>
              }
            </div>
          ))}
          <button
            onClick={() => fileInputRef.current?.click()}
            className="aspect-square w-full flex items-center justify-center bg-gray-100 rounded-md border hover:bg-gray-200"
          >
            <Plus className="w-6 h-6 text-gray-500" />
          </button>
        </div>
      )}

      {/* Input + Actions */}
      <div className="flex items-center gap-3">
        <Smile className="w-5 h-5 text-gray-600" />

        <input
          type="text"
          placeholder="Nhắn tin..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          className="flex-1 outline-none text-sm"
        />

        {input.trim() || medias.length > 0 ? (
          <button
            onClick={handleSend}
            className="text-blue-600 hover:underline"
          >
            <Send className="w-5 h-5" />
          </button>
        ) : (
          <div className="flex items-center gap-3 text-gray-600">
            <button onClick={() => fileInputRef.current?.click()}>
              <ImageIcon className="w-5 h-5 cursor-pointer" />
            </button>
            <button onClick={() => fileInputRef.current?.click()}>
              <VideoIcon className="w-5 h-5 cursor-pointer" />
            </button>
            <button onClick={() => fileInputRef.current?.click()}>
              <FileIcon className="w-5 h-5 cursor-pointer" />
            </button>
          </div>
        )}
        <input
          type="file"
          accept="image/*,video/*,.pdf,.doc,.docx,.xls,.xlsx,.txt"
          multiple
          ref={fileInputRef}
          onChange={handleFileSelect}
          className="hidden"
        />
      </div>
    </div>
  );
}
