import { useEffect, useRef } from "react";

interface RoomProps {
  messages: any;
  userName: string;
  roomId: string;
  exit: () => void;
  setMessages: any;
  wsocket: WebSocket | null;
}

function Room({
  wsocket,
  setMessages,
  exit,
  userName,
  roomId,
  messages,
}: RoomProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const msgBoxRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (msgBoxRef.current) {
      msgBoxRef.current.scrollTop = msgBoxRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = () => {
    const inputText = inputRef.current?.value;

    if (!wsocket || !inputText?.trim()) return;

    setMessages((prev: any) => [
      ...prev,
      {
        type: "chat",
        payload: { name: userName, text: inputText },
        isOwn: true,
      },
    ]);

    wsocket.send(
      JSON.stringify({
        type: "chat",
        payload: { text: inputText },
      })
    );

    inputRef.current!.value = "";
  };
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  return (
    <>
      <div className="top max-w-130 w-full  text-white flex items-center justify-between p-3 bg-zinc-800 rounded-xl mb-2">
        <div className="text">
          Chat Room : <span className="font-semibold uppercase">{roomId}</span>
        </div>
        <div className="btng">
          <button
            onClick={exit}
            className="hover:bg-zinc-200 cursor-pointer bg-zinc-100 text-black px-2 py-1 rounded-lg"
          >
            Leave
          </button>
        </div>
      </div>
      <div className="max-h-180 h-full max-w-130 w-full  border border-zinc-400 rounded-xl overflow-hidden flex flex-col justify-between  ">
        <div
          ref={msgBoxRef}
          className="msgBoxRef h-full flex flex-col w-full p-3 overflow-scroll no-scrollbar"
        >
          {messages.map((msg: any, idx: any) => {
            if (msg.type === "system") {
              return (
                <div key={idx} className="systmsg my-2 w-full ">
                  <div className="text-zinc-300 text-sm justify-self-center">
                    {msg.text}
                  </div>
                </div>
              );
            } else if (msg.type === "chat" && msg.payload) {
              const isOwn = msg.isOwn;
              return (
                <div
                  key={idx}
                  className={`my-2 text-white px-3 py-1 rounded-t-xl max-w-[70%] ${
                    isOwn
                      ? "rounded-l-xl bg-zinc-800 self-end"
                      : "rounded-r-xl w-fit  bg-zinc-600"
                  }`}
                >
                  <div className="text-md">{msg.payload.text}</div>
                  <div
                    className={`mt-1 minTxt text-zinc-200 text-xs ${
                      isOwn ? "justify-self-end" : ""
                    } `}
                  >
                    {isOwn ? "you" : msg.payload.name}
                  </div>
                </div>
              );
            }
            return null;
          })}
        </div>
        <div className="textBox p-5 gap-3 w-full flex">
          <input
            ref={inputRef}
            onKeyPress={handleKeyPress}
            className="px-3 w-full border rounded-lg text-white"
            type="text"
            placeholder="Write Your Message ..."
          />
          <button
            className="hover:bg-zinc-100 cursor-pointer bg-white text-black px-4 py-2 rounded-lg"
            onClick={sendMessage}
          >
            Send
          </button>
        </div>
      </div>
    </>
  );
}

export default Room;