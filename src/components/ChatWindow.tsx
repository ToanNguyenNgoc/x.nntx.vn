/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useRef } from "react";
import { MoreVertical } from "lucide-react";
import ChatInput from "@/components/ChatInput";
import { PusherService } from "@/services";
import { ReqMessage, ReqPostMessage, Res, ResMessage, ResPaginate } from "@/interfaces";
import { useInfiniteQuery, UseInfiniteQueryOptions } from "@tanstack/react-query";
import { CONST, formatTime } from "@/utils";
import { MessageApi } from "@/apis/message.api";
import { Media, useGetTopic } from "@/hooks";
import { ChatWindowHeader } from "./ChatWindowHeader";
import { useProfileStore } from "@/stores";
import InfiniteScroll from 'react-infinite-scroll-component';
import moment from "moment";


interface ChatWindowProps {
  topic_id: number;
}

const useGetMessages = (params: ReqMessage, options?: UseInfiniteQueryOptions<Res<ResPaginate<ResMessage[]>>>) => {
  const query = useInfiniteQuery({
    queryKey: [CONST.queryKey.messages, params],
    queryFn: ({ pageParam = 1 }) => MessageApi.getMessages({ ...params, page: pageParam }),
    getNextPageParam: (lastPage) => {
      if (lastPage?.context.current_page < lastPage?.context.last_page) {
        return lastPage?.context.current_page + 1
      } else {
        return undefined
      }
    },
    staleTime: 0,
    ...options
  })
  const messages = query.data?.pages.flatMap(i => i.context.data) || [];
  return Object.assign(query, {
    messages,
    isEmpty: messages.length === 0 && !query.isLoading,
    onLoadMore: () => query.hasNextPage ? query.fetchNextPage() : null
  })
}

export default function ChatWindow({
  topic_id
}: ChatWindowProps) {
  //
  const { profile } = useProfileStore(state => state);
  const { topic } = useGetTopic(topic_id);
  const { messages, onLoadMore, hasNextPage, isLoading, refetch } = useGetMessages({
    topic_id,
    include: 'reply',
    sort: '-created_at'
  });
  const [newMessages, setNewMessages] = useState<ResMessage[]>([]);
  useEffect(() => {
    const pusher = PusherService.getInstance().getPusher();
    pusher
      .subscribe(`private-subscribe-topic_id.${topic_id}`)
      .bind('emit-topic', (data: { message: ResMessage }) => {
        // Log(msg);
        if (data.message.user_id !== profile?.id) {
          setNewMessages(prev => {
            const exists = prev.some(msg => msg.id === data.message.id);
            return exists ? prev : [data.message, ...prev];
          });
        }
      });
    return () => {
      pusher.unsubscribe(`private-subscribe-topic_id.${topic_id}`);
      pusher.unbind('emit-topic');
      setNewMessages([]);
      refetch();
    }
  }, [topic_id])

  //
  const [showScrollButton, setShowScrollButton] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // const handleCopy = (text: string) => {
  //   navigator.clipboard.writeText(text);
  //   setSelectedMessageId(null);
  // };

  // const handleRecall = (id: number) => {
  //   onRecallMessage(id);
  //   setSelectedMessageId(null);
  // };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const { scrollTop, clientHeight } = container;
      const atBottom = scrollTop < -clientHeight;
      setShowScrollButton(atBottom);
    };
    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, [scrollContainerRef.current]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target as Node)
      ) {
        // setSelectedMessageId(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const scrollToBottom = () => {
    if (!scrollContainerRef.current) return;
    scrollContainerRef.current.scrollTo({ top: 0, behavior: 'smooth' })
  };
  if (!topic) return null;

  const onPostMessage = (payload: { text: string; medias: Media[] }) => {
    if (!profile) return;
    const body: ReqPostMessage = {
      topic_id,
      body: payload.text || undefined,
      media_ids: payload.medias.map(i => i.model_id),
      reply_id: undefined
    }
    const temp_id = new Date().getTime();
    setNewMessages([{
      topic_id,
      id: temp_id,
      body: payload.text,
      user_id: Number(profile?.id),
      reply_id: null,
      media_urls: payload.medias.map(i => i.original_url),
      deleted_at: null,
      created_at: moment().format('YYYY-MM-DD HH:mm'),
      updated_at: moment().format('YYYY-MM-DD HH:mm'),
      user: profile
    }, ...newMessages]);
    MessageApi.postMessage(body).then(res => {
      setNewMessages(prev =>
        prev.map(msg =>
          msg.id === temp_id ? { ...msg, id: res.context.id } : msg
        )
      );
      scrollToBottom();
    });
  }

  return (
    <div className="flex-1 flex flex-col justify-between relative">
      {/* Header */}
      <ChatWindowHeader topic={topic} />
      {/* Chat list */}
      <div
        id="scrollableDiv"
        ref={scrollContainerRef}
        className="p-4 space-y-3 bg-gray-50"
        style={{
          height: '100%',
          overflow: 'auto',
          display: 'flex',
          flexDirection: 'column-reverse',
        }}
      >
        <InfiniteScroll
          dataLength={newMessages.length + messages.length}
          next={onLoadMore}
          style={{ display: 'flex', flexDirection: 'column-reverse' }}
          inverse={true} //
          hasMore={true}
          loader={(isLoading || hasNextPage) ? <h4>Loading...</h4> : <div />}
          scrollableTarget="scrollableDiv"
        >
          {newMessages.concat(messages).map((msg, idx) => (
            <MessageItem
              key={idx}
              item={msg}
              fromSelf={profile?.id === msg.user_id}
            />
          ))}
        </InfiniteScroll>
      </div>
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
        onSend={onPostMessage}
      />
    </div>
  );
}

const MessageItem = ({ item, fromSelf }: { item: ResMessage, fromSelf: boolean }) => {
  const recall = false;
  return (
    <div
      className={`flex mb-4 ${fromSelf ? "justify-end" : "justify-start"
        } relative group`}
    >
      <div
        className={`flex relative items-center gap-2 ${fromSelf ? "flex-row-reverse" : ""
          }`}
      >
        <div
          className={`max-w-xs text-sm p-2 rounded-xl break-words ${fromSelf
            ? "bg-black text-white"
            : "bg-gray-200 text-black"
            }`}
        >
          {recall ? (
            <div className="italic text-sm text-gray-300">
              Bạn đã thu hồi tin nhắn này
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 gap-1 mb-2">
                {item.media_urls.map((f, idx) => (
                  <div key={idx}>
                    <img
                      src={f}
                      className="w-full aspect-square object-cover rounded-md"
                    />
                    {/* {f.type === "image" && (
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
                      )} */}
                  </div>
                ))}
              </div>
              {item.body && <div>{item.body}</div>}
              <div className="text-xs mt-1 text-right opacity-60">
                {formatTime(item.created_at)}
              </div>
            </>
          )}
        </div>

        {!recall && (
          <div className="relative">
            <button
              // onClick={() =>
              //   setSelectedMessageId(msg.id)
              // }
              className="opacity-100 cursor-pointer transition"
            >
              <MoreVertical color="#000" size={16} />
            </button>

            {/* {selectedMessageId === msg.id && (
              <div
                ref={menuRef}
                className={`absolute top-0 w-44 bg-white rounded-lg shadow border text-sm text-black z-50 ${msg.fromSelf
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
            )} */}
          </div>
        )}
      </div>
    </div>
  )
}
