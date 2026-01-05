

function Room(inputref : any, sendMessage: any) {
  return (
    <>
      <div className="max-h-160 h-full max-w-130 w-full  border border-zinc-400 rounded-xl overflow-hidden flex flex-col justify-between  ">
        <div className="msgBox h-full flex flex-col w-full p-3">
          <div className="systmsg my-2 w-full ">
            <div className="text-zinc-400 text-sm justify-self-center">
              <span className="text-zinc-300">Adeeb</span> has joined the room
            </div>
          </div>
          <div className="systmsg my-2 w-full ">
            <div className="text-zinc-400 text-sm justify-self-center">
              <span className="text-zinc-300">Hashim</span> has joined the room
            </div>
          </div>
          <div className="mymsg self-end my-2 bg-zinc-800 text-white px-3 py-1 rounded-l-xl rounded-t-xl max-w-[70%] ">
            <div className="mainTxt text-md">nothing wby? chal chaiya chaiyaaschaiyaaa chaiya. chal chaioye chaiye chaiye chaissss</div>
            <div className="mt-1 minTxt justify-self-end text-zinc-200 text-xs ">
              you
            </div>
          </div>
          <div className="yourmsg my-2 bg-zinc-600 text-white px-3 py-1 rounded-t-xl rounded-r-xl w-fit max-w-[70%]">
            <div className="mainTxt text-md">nothing wby? chal chaiya chaiya chaiya chaiya.sdsd chal chaioye chaiye chaiye chaisdsdye</div>
            <div className="mt-1 minTxt text-zinc-200 text-xs ">hashim</div>
          </div>
          <div className="systmsg my-2 w-full ">
            <div className="text-zinc-400 text-sm justify-self-center">
              <span className="text-zinc-300">Adeeb</span> has left the room
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
            className="hover:bg-blue-700 cursor-pointer bg-white text-black px-4 py-2 rounded-lg"
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
