import { useEffect, useRef, useState } from "react";
import "./App.css";

export default function App() {
  const [messages, setMessages] = useState([]);
  const [joined, setJoined] = useState(false);
  const [roomID, setRoomID] = useState();
  const wsRef = useRef();
  const inputRef = useRef();
  const nameRef = useRef();
  const idRef = useRef();

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8080");

    ws.onmessage = (e) => {
      
      setMessages((m) => [...m,e.data,]);
    };

    wsRef.current = ws;



    return () => {
      ws.close();
    };
  }, []);

  return (
    <div className="h-screen bg-gradient-to-br from-blue-400 to-purple-800">
      <div style={{display:"flex",justifyContent:"center",alignItems:"center",paddingTop:50,fontSize:30}}>
        {joined? <span className="font-bold">ROOM NO - {roomID}</span>:<span className="font-bold">NOT CONNECTED</span>}
        
      </div>
      
      <br />
      <br />
      <br />

      {joined? 
      <div>
        <div className="h-[80vh] overflow-y-auto">
          {messages.map((message) => (
            <div className="m-8 ">
              <span className="bg-white text-black rounded-xl p-4 py-2 border">{message}</span>
            </div>
          ))}
        </div>
        <div className="w-95vw mx-4 bg-white flex">
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

      <div className="text-white flex flex-col w-[50%]" style={{margin:"auto"}}>
        <input placeholder="name" ref={nameRef} className="text-black"></input>
        <input placeholder="roomID" ref={idRef} className="text-black"></input>
        <button className="bg-purple-600" onClick={() => {
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
          Enter
        </button>
      </div>}     
    </div>
  );
}
