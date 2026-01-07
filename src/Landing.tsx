import { useRef, useState } from "react";

type LandingProps = {
  wsocket: WebSocket | null;
  socketWorking: boolean;
};

function Landing({ wsocket, socketWorking }: LandingProps) {
  const createNameRef = useRef<HTMLInputElement>(null);
  const createRoomRef = useRef<HTMLInputElement>(null);
  const joinNameRef = useRef<HTMLInputElement>(null);
  const joinRoomRef = useRef<HTMLInputElement>(null);
  const [createLoading, setcreateLoading] = useState(false);
  const [joinLoading, setjoinLoading] = useState(false);
  const [createErrors, setcreateErrors] = useState("");
  const [joinErrors, setjoinErrors] = useState("");

  const roomCreate = () => {
    if (!wsocket) {
      return;
    }

    const cname = createNameRef.current?.value;
    const croomId = createRoomRef.current?.value;
    console.log("data", cname, croomId);

    if (!cname || !croomId) {
      setcreateErrors("Please enter both name and room code");
      return;
    }

    setcreateErrors("");
    setcreateLoading(true);

    wsocket?.send(
      JSON.stringify({
        type: "create",
        payload: {
          roomId: croomId,
          name: cname,
        },
      })
    );
  };

  const joinRoom = () => {
    if (!wsocket) {
      return;
    }

    const name = joinNameRef.current?.value;
    const roomId = joinRoomRef.current?.value;

    if (!name?.trim() || !roomId?.trim()) {
      setjoinErrors("Please enter both name and room code");
      return;
    }

    setjoinErrors("");
    setjoinLoading(true);

    const data = JSON.stringify({
      type: "join",
      payload: {
        roomId,
        name,
      },
    });

    wsocket?.send(data);
  };

  return (
    <>
      <div className="w-full max-w-200 p-5 border border-zinc-600 rounded-xl overflow-hidden flex flex-col shadow-sm gap-5 text-white">
        <div className="textbox flex justify-between">
          <div className="texts">
            <h1 className="text-2xl font-bold">Real Time Chat App</h1>
            <p className="text-sm text-zinc-400">
              temporary room that expires after all users exit
            </p>
          </div>
          <div className="status flex items-center gap-2">
            <div
              className={`h-3 w-3 rounded-full ${
                socketWorking ? "bg-green-500" : "bg-red-500"
              }`}
            ></div>
            <span className="text-xs text-zinc-400">
              {socketWorking ? "Connected" : "Disconnected"}
            </span>
          </div>
        </div>
        <div className="main flex justify-between gap-4 flex-wrap">
          <div className="create flex flex-col w-full lg:w-[48.5%] gap-4 p-3 border border-zinc-700 rounded-xl ">
            <input
              ref={createNameRef}
              className="border border-zinc-700 px-3 py-2 rounded-lg"
              type="text"
              placeholder="Enter your name"
            />
            <input
              ref={createRoomRef}
              className="border border-zinc-700 px-3 py-2 rounded-lg"
              type="text"
              placeholder="Create room code"
            />
            {!createLoading ? (
              <button
                onClick={roomCreate}
                className="w-full  cursor-pointer bg-zinc-100 text-zinc-900 font-lg py-3 rounded-lg font-semibold"
              >
                Create Room
              </button>
            ) : (
              <button
                className="w-full bg-zinc-700 text-zinc-400 font-lg py-3 rounded-lg font-semibold flex items-center justify-center gap-3"
                disabled
              >
                <svg className="animate-spin rounded-full h-4 w-4 border-b-2 border-zinc-200"></svg>
                creating ...
              </button>
            )}
            {createErrors && (
              <button
                disabled
                className="w-full bg-red-200 border border-red-200 text-red-900 font-lg py-3 rounded-lg font-semibold text-sm "
              >
                {createErrors}
              </button>
            )}
          </div>
          <div className="join flex flex-col w-full lg:w-[48.5%] gap-4 p-3 border border-zinc-700 rounded-xl">
            <input
              ref={joinNameRef}
              className="border border-zinc-700 px-3 py-2 rounded-lg"
              type="text"
              placeholder="Enter your name"
            />
            <input
              ref={joinRoomRef}
              className="border border-zinc-700 px-3 py-2 rounded-lg"
              type="text"
              placeholder="Enter room code"
            />
            {!joinLoading ? (
              <button
                onClick={joinRoom}
                className="w-full cursor-pointer bg-zinc-100 text-zinc-900 font-lg py-3 rounded-lg font-semibold "
              >
                Join Room
              </button>
            ) : (
              <button
                className="w-full bg-zinc-700 text-zinc-400 font-lg py-3 rounded-lg font-semibold flex items-center justify-center gap-3"
                disabled
              >
                <svg className="animate-spin rounded-full h-4 w-4 border-b-2 border-zinc-200"></svg>
                joining ...
              </button>
            )}
            {joinErrors && (
              <button
                disabled
                className="w-full bg-red-200 border border-red-200 text-red-900 font-lg py-3 rounded-lg font-semibold text-sm "
              >
                {joinErrors}
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Landing;