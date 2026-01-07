import { useEffect, useRef, useState } from "react";
import Room from "./room";
import Landing from "./Landing";
import { Route, Routes, useNavigate } from "react-router-dom";

function App() {
  const socket = useRef<WebSocket | null>(null);
  const navigate = useNavigate();
  const [socketWorking, setsocketWorking] = useState(false);
  const [name, setName] = useState("");
  const [roomId, setRoomId] = useState("");
  const [messages, setMessages] = useState<any[]>([]);

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8080");
    socket.current = ws;

    ws.onopen = () => {
      console.log("Connected to server");
      setsocketWorking(true);
    };

    ws.onmessage = (e) => {
      const receivedData = JSON.parse(e.data);
      console.log(receivedData);

      if (receivedData.type === "joined" || receivedData.type === "created") {
        const { name, roomId } = receivedData.payload;
        console.log("name and roomId : ", name, roomId);
        setName(name);
        setRoomId(roomId.trim());
        navigate("/chatroom");
      }

      if (receivedData.type === "system" || receivedData.type === "chat") {
        setMessages((prev) => [...prev, { ...receivedData, isOwn: false }]);
      }

      if (receivedData.type === "error") {
        console.error("Server error:", receivedData.text);
        alert(receivedData.text);
        window.location.reload();
      }
    };

    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
      setsocketWorking(false);
    };

    ws.onclose = () => {
      console.log("Disconnected from server");
      setsocketWorking(false);
    };

    return () => {
      ws.close();
    };
  }, []);

  const leaveRoom = () => {
    if (socket.current) {
      socket.current.close();
    }
    navigate("/");
    window.location.reload();
  };

  return (
    <div className="h-screen w-screen bg-black flex-col flex items-center justify-center p-5">
      <Routes>
        <Route
          path="/"
          element={
            <Landing wsocket={socket.current} socketWorking={socketWorking} />
          }
        />
        <Route
          path="/chatroom"
          element={
            <Room
              wsocket={socket.current}
              setMessages={setMessages}
              messages={messages}
              userName={name}
              roomId={roomId}
              exit={leaveRoom}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
