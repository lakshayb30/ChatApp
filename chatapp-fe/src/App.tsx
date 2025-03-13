import { useEffect, useRef, useState } from "react";
import "./App.css";

export default function App() {
  const [messages, setMessages] = useState<string>([]);
  const [joined, setJoined] = useState(false);
  const [roomID, setRoomID] = useState<string | null>(null);
  const wsRef = useRef<WebSocket | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const nameRef = useRef<HTMLInputElement | null>(null);
  const idRef = useRef<HTMLInputElement | null>(null);

  const connectWebSocket = () => {
    if (wsRef.current) {return}
    const ws = new WebSocket("ws://localhost:8080");
    ws.onopen = () => {
      console.log("WebSocket connection established");
      wsRef.current = ws;
    }

    ws.onmessage = (e) => {
      try{
        const data = JSON.parse(e.data)
        if (data.type === "chat"){
          setMessages((m) => [...m,data.payload.message]);
        } else if (data.type === "join_success"){
          setJoined(true);
          setRoomID(data.payload.roomID);
        }
      } catch(error){
        console.log("non JSON msg received" , e.data)
        setMessages((m) => [...m,e.data]);
      }
      
    };

    ws.onclose = () => {
      console.log("WebSocket connection closed");
      wsRef.current = null;
      setTimeout(connectWebSocket, 1000);
    };
  }

  useEffect(() => {
    connectWebSocket();
    return () => {
      if (wsRef.current) {
        wsRef.current.close();
        wsRef.current = null;
      }
    };
  }, []);

  return (
    <div className="h-screen bg-gradient-to-br from-blue-400 to-purple-800">
      <div style={{display:"flex",justifyContent:"center",alignItems:"center",paddingTop:50,fontSize:30}}>
        {joined? <div className=" bg-sky-400 w-100vw px-10 -mt-1 rounded-2xl  "><span className="font-bold">ROOM NO - {roomID}</span></div>:<span className="font-bold">Welcome to TalkSpace !</span>}
        
      </div>
      
      <br />
      <br />
      <br />

      {joined? 
      <div>
        <div className="h-[70vh] overflow-y-auto">
          {messages.map((message) => (
            <div className="m-8 ">
              <span className="bg-white text-black rounded-xl p-4 py-2 border">{message}</span>
            </div>
          ))}
        </div>
        <div className="w-95vw  bg-white flex">
          <input ref={inputRef} placeholder="Type Here..." id="message" className="flex-1 p-4"></input>
          <button onClick={() => {
            const message = inputRef.current?.value;
            if (wsRef.current.readyState === WebSocket.OPEN) {
              wsRef.current.send(
                JSON.stringify({
                  type: "chat",
                  payload: {
                    message: message,
                  },
                })
              );
            }else {alert("Connection not made yet")}
          }} className="bg-purple-600 text-white p-4">
            Send message
          </button>
        </div>
      </div> : 

      <div className="text-white flex flex-col w-[50%] m-auto">
        <input placeholder="Name" ref={nameRef} className="text-black mb-4 h-10 pl-7 rounded-2xl" ></input>
        <input placeholder="RoomID" ref={idRef} className="text-black h-10 pl-7 mb-4 rounded-2xl" ></input>
        <button className="bg-black hover:bg-white hover:text-black h-10 text-sky-400 font-semibold rounded-2xl transition-all duration-300"  onClick={() => {
          const name = nameRef.current?.value
          const roomID = idRef.current?.value
          if (wsRef.current.readyState === WebSocket.OPEN) {
            wsRef.current.send(
              JSON.stringify({
                type: "join",
                payload: {
                  name:name,
                  roomID: roomID,
                },
              })
            );
            setJoined(true)
            setRoomID(roomID)
          } else {alert("Connection not made yet")}
        }}>
          ENTER
        </button>
      </div>}     
    </div>
  );
}
