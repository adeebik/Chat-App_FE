function Landing() {
  return (
    <>
      <div className="w-full max-w-200 p-5 border border-zinc-600 rounded-xl overflow-hidden flex flex-col shadow-sm gap-5 text-white">
        <div className="textbox ">
          <h1 className="text-2xl font-bold">Real Time Chat App</h1>
          <p className="text-sm text-zinc-400">temporary room that expires after all users exit</p>
        </div>
        <div className="main flex justify-between gap-4 flex-wrap">
          <div className="create flex flex-col w-[48.5%] gap-4 p-3 border border-zinc-700 rounded-xl ">
            <input className="border border-zinc-700 px-3 py-2 rounded-lg" type="text" placeholder="Enter your name" />
            <input className="border border-zinc-700 px-3 py-2 rounded-lg" type="text" placeholder="Create room code" />
            <button className="w-full bg-zinc-100 text-black font-lg py-3 rounded-lg font-semibold"> Create Room </button>
          </div>
          <div className="join flex flex-col w-[48.5%] gap-4 p-3 border border-zinc-700 rounded-xl">
            <input className="border border-zinc-700 px-3 py-2 rounded-lg" type="text" placeholder="Enter your name" />
            <input className="border border-zinc-700 px-3 py-2 rounded-lg" type="text" placeholder="Enter room code" />
            <button className="w-full bg-zinc-100 text-black font-lg py-3 rounded-lg font-semibold"> Join Room </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Landing;
