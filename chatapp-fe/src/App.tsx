import { useEffect, useRef, useState } from "react";
import "./App.css";
import { ClipLoader } from "react-spinners";

interface Message {
  text: string;
  sender: string;
  timestamp: string;
}

export default function App() {
  const [roomscount,setRoomcount] = useState(0);
  const [pplcount,setpplcount] = useState(0)
  const [messages, setMessages] = useState<Message[]>([]);
  const [joined, setJoined] = useState(false);
  const [roomID, setRoomID] = useState<string | null>(null);
  const [userName, setUserName] = useState<string>("");
  const [isConnecting, setIsConnecting] = useState(false);
  const wsRef = useRef<WebSocket | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const nameRef = useRef<HTMLInputElement | null>(null);
  const idRef = useRef<HTMLInputElement | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  /* */
  //Scroll to bottom when new msg will come
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  /* */

  const LeaveHandler = () => {
    if(wsRef.current?.readyState === WebSocket.OPEN){
      setJoined(false)
      setMessages([])
      wsRef.current?.close();
    }
    
  }

  const connectWebSocket = () => {
    if (wsRef.current) return;
    setIsConnecting(true);
    const ws = new WebSocket("wss://chatapp-ecai.onrender.com");
    //const ws = new WebSocket("ws://localhost:8080");
    
    ws.onopen = () => {
      console.log("WebSocket connection established");
      wsRef.current = ws;
      setIsConnecting(false);
    };

    ws.onmessage = (e) => {
      const data = JSON.parse(e.data);
      if(data.type == "roomdata"){
        setRoomcount(data.rcount)
      }
      else if(data.type == "pplcount"){
        setpplcount(data.count)
      }
      else{
        
      setMessages((m) => [...m, {
        text: data.msg,
        sender: data.sender,
        timestamp: new Date().toLocaleTimeString()
      }]);
      }
      
    };

    ws.onclose = () => {
      console.log("WebSocket connection closed");
      wsRef.current = null;
      setIsConnecting(true);
      setTimeout(connectWebSocket, 1000);
    };
  };

  useEffect(() => {
    connectWebSocket();
    return () => {
      if (wsRef.current) {
        wsRef.current.close();
        wsRef.current = null;
      }
    };
  }, []);

  const handleSendMessage = () => {
    const message = inputRef.current?.value;
    if (!message?.trim()) return;
    
    if (wsRef.current?.readyState === WebSocket.OPEN ) {
      wsRef.current.send(
        JSON.stringify({
          type: "chat",
          payload: {
            msg: message,
            sender: userName
          },
        })
      );
      if (inputRef.current) inputRef.current.value = "";
    } else {
      alert("Connection not established yet");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      if(joined) handleSendMessage()
      else alert("You are not joined | Please Reconnect")
    } 
  };

  const handleJoin = () => {
    const name = nameRef.current?.value;
    const roomID = idRef.current?.value;
    console.log(typeof(roomID))
    

    if (!name?.trim() || !roomID?.trim()) {
      alert("Please enter both name and room ID");
      return;
    }

    if (wsRef.current?.readyState === WebSocket.OPEN) {
      setUserName(name);
      wsRef.current.send(
        JSON.stringify({
          type: "join",
          payload: {
            name: name,
            roomID: roomID,
          },
        })
      );
      setJoined(true);
      setRoomID(roomID);
    } else {
      alert("Connection not established yet");
    }
  };

  const isOwnMessage = (sender: string) => sender === userName;
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-700 via-purple-500 to-pink-700 p-4 relative z-10 ">
      
      
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          {joined ? (
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 shadow-lg items-center flex justify-between">
              <div className="text-2xl font-bold text-white bg-blue-700 rounded-xl p-2">
                  Room  {roomID}
              </div>
              <div className="font-light text-sm text-white flex gap-2">
                <div className="bg-green-500 hover:bg-white hover:text-green-500 duration-300 ease-in backdrop-blur-sm shadow-xl items-center flex justify-around gap-2 rounded-xl px-3 border-green-600 font-bold border-[1px] lg:mx-2 h-7">
                    <div>
                      <img src="./user.png" className="h-4 " alt="" />
                    </div>   
                    <div>
                      {pplcount}
                    </div>      
                </div>

                <div className="bg-blue-500 backdrop-blur-sm hover:bg-white hover:text-blue-500 duration-300 ease-in shadow-xl items-center flex justify-around gap-2 rounded-xl px-3 border-blue-600 font-bold border-[1px] lg:mx-2 h-7">
                    <div>
                      <img src="./messenger.png" className="h-4 " alt="" />
                    </div>   
                    <div>
                      {roomscount}
                    </div>      
                </div>
              </div>

              <div className="bg-red-500 p-2 rounded-lg hover:bg-red-600 duration-200 ease-in hover:scale-105 mr-5" 
                onClick={LeaveHandler}><img src="./logout.png" className="h-7 " alt="" />
              </div>
            </div>
          ) : (null)}
        </div>

        {joined ? (
          <div className="bg-white/10 backdrop-blur-sm rounded-xl shadow-xl overflow-hidden">
            <div className="h-[60vh] overflow-y-auto p-4 space-y-4">
              {messages.map((message, index) => (
                <div key={index} className={`flex flex-col ${isOwnMessage(message.sender) ? 'items-end' : 'items-start'}`}>
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`text-sm font-medium ${message.sender === 'System' ? 'text-yellow-300' : isOwnMessage(message.sender) ? 'text-blue-100' : 'text-white/70'}`}>
                      {message.sender}
                    </span>
                    <span className="text-xs text-white/50">{message.timestamp}</span>
                  </div>
                  <div className={`rounded-lg p-3 shadow-sm max-w-[80%] break-words ${message.sender === 'System' ? 'bg-yellow-500/20 text-yellow-100' : isOwnMessage(message.sender)? 'bg-blue-500 text-white': 'bg-white text-gray-800'}`}>
                    {message.text}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
            <div className="p-4 bg-white/20 backdrop-blur-sm">
              <div className="flex gap-2">
                <input
                  ref={inputRef}
                  placeholder="Type your message..."
                  className="flex-1 p-3 rounded-lg backdrop-blur-sm  focus:outline-none focus:ring-2 focus:ring-black"
                  onKeyPress={handleKeyPress}
                />
                <button
                  onClick={() => {
                    if(joined){
                    handleSendMessage()
                  } else{alert("You are not joined | Please Reconnect")}
                }}
                  className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg transition-colors duration-200"
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="max-w-md ml-auto mr-auto mt-[13%] flex-column justify-items-center">
            <div className=" w-[50%]  rounded-t-2xl backdrop-blur-sm bg-black/50 text-white border-t py-1 items-center flex justify-center">
              <div className="relative inline-flex">
                <div className="rounded-full bg-green-400 h-[8px] w-[8px] inline-block mr-2"></div>
                <div className="absolute animate-ping rounded-full bg-green-400 h-[8px] w-[8px] mr-2"></div>
              </div>
              {roomscount} Rooms Active
            </div>

            
            
            <div className="card-content rounded-[12px] p-8 shadow-2xl bg-[#9333ea] opacity-0.1 ">
              <div className="flex justify-between">
                <h1 className="text-3xl font-extrabold text-white  ">Welcome to TalkSpace</h1>
              </div>
              <div className="mb-5 text-gray-300 text-md">
                Real-time, room-based chat application built using WebSockets. Users can create or join chat rooms and communicate in real time with others in the same room.
              </div>
              <div className="space-y-4 text-white">
                <input
                  placeholder="UserName"
                  ref={nameRef}
                  className="w-full p-3 rounded-lg bg-white/40 border backdrop-blur-xl placeholder-white focus:outline-none focus:ring-2 focus:ring-black duration-300 ease-in"
                />
                <input
                  type="number"
                  placeholder="Room No."
                  ref={idRef}
                  className="w-full p-3 rounded-lg bg-white/40 border backdrop-blur-xl placeholder-white focus:ring-2 focus:ring-black duration-300 ease-in"
                />
                <button
                  onClick={handleJoin}
                  disabled={isConnecting}
                  className={`${isConnecting ? "cursor-not-allowed" : "cursor-pointer"} submit-btn w-full bg-gradient-to-r from-[#ff4ecd] from-10% to-pink-500 to-90% hover:text-gray-200  text-white py-3 rounded-lg   duration-300 ease-in font-semibold text-lg`}
                >
                  {isConnecting ? <ClipLoader color="white" size={20} /> : "Join Room"}
                </button>
              </div>
            </div>
          </div>
          
        )}
      </div>
    </div>
  );
}
