import { useEffect, useRef, useState } from "react";

function App() {
  const [socket, setSocket] = useState();
  const inputref = useRef<HTMLInputElement>(null);

  function sendMessage() {
    if (!socket) {
      return null;
    }
    socket.send(inputref.current?.value);
  }

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8000");
    setSocket(ws);

    ws.onmessage = (e) => {
      alert(e.data);
    };
    
  }, []);

  return (
    <div className="h-screen w-screen bg-black flex items-center justify-center p-5">
      <div className="max-h-160 h-full max-w-130 w-full  border border-zinc-400 rounded-xl overflow-hidden flex flex-col justify-between  ">
        <div className="msgBox h-full flex flex-col w-full p-3">
          <div className="mymsg self-end my-1 bg-blue-600 text-white px-3 py-1 rounded-l-xl rounded-t-xl ">
            <div className="mainTxt text-md">
              Hi there, wyd?
            </div>
            <div className="mt-1 minTxt justify-self-end text-zinc-200 text-xs ">
              adeeb 
            </div>
          </div>
          <div className="yourmsg my-1 bg-green-600 text-white px-3 py-1 rounded-t-xl rounded-r-xl w-fit">
            <div className="mainTxt text-md">
              nothing wby?
            </div>
            <div className="mt-1 minTxt text-zinc-200 text-xs ">
              hashim 
            </div>
          </div>
        </div>
        <div className="textBox p-5 gap-3 w-full flex">
          <input
            ref={inputref}
            className="px-3 w-full border rounded-lg text-white"
            type="text"
            placeholder="Write Your Message ..."
          />
          <button
            className="hover:bg-blue-700 cursor-pointer bg-blue-600 text-white px-4 py-2 rounded-lg"
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
