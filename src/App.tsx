import { useEffect, useRef, useState } from "react";

function App() {
  const [socket, setSocket] = useState();
  const inputref = useRef<HTMLInputElement>();

  function sendMessage() {
    socket?.send(inputref.current.value);
  }

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8000");
    setSocket(ws);

    ws.onmessage = (e) => {
      alert(e.data);
    };
  }, []);

  return (
    <div className="h-screen w-screen  flex items-center justify-center">
      <div className="max-h-250 h-full max-w-150 w-full bg-zinc-900 border border-zinc-400 rounded-xl overflow-hidden flex flex-col justify-between  ">
        <div className="msgBox h-full flex flex-col  w-full rounded-b p-3" > 
          <div className="mymsg self-end my-1 bg-blue-600 text-white px-2 py-1 rounded-xl">Hi there</div>
          <div className="yourmsg my-1 bg-green-600 text-white px-2 py-1 rounded-xl w-fit">Hello  wasuup</div>
        </div>
        <div className="textBox p-5 gap-5 w-full flex">
          <input
            ref={inputref}
            className="p-3 w-full border rounded-lg text-white"
            type="text"
            placeholder="Write Your Message ..."
          />
          <button
            className="bg-blue-600 text-white px-5 py-3 rounded-lg"
            onClick={sendMessage}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
