import { useEffect, useRef, useState } from "react";
import "./App.css";

interface Message {
  text: string;
  sender: string;
  timestamp: string;
}

export default function App() {
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

  const connectWebSocket = () => {
    if (wsRef.current) return;
    setIsConnecting(true);
    const ws = new WebSocket("wss://chatapp-ecai.onrender.com");
    
    ws.onopen = () => {
      console.log("WebSocket connection established");
      wsRef.current = ws;
      setIsConnecting(false);
    };

    ws.onmessage = (e) => {
      const data = JSON.parse(e.data);
      setMessages((m) => [...m, {
        text: data.msg,
        sender: data.sender,
        timestamp: new Date().toLocaleTimeString()
      }]);
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
    <div className="min-h-screen bg-gradient-to-br from-blue-400 to-purple-800 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          {joined ? (
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 shadow-lg items-center flex justify-between">
              <div className="text-2xl font-bold text-white ml-5">
                Room: {roomID}
              </div>
              <div className="bg-red-600 p-2 rounded-lg hover:bg-red-500 duration-200 ease-in hover:scale-105 mr-5" onClick={() => {
                setJoined(false)
                setMessages([])
              }}>
                <img src="./logout.png" className="h-7 " alt="" />
              </div>
              
            </div>
          ) : (
            <h1 className="text-4xl font-bold text-white mb-2">
              Welcome to TalkSpace
            </h1>
          )}
        </div>

        {joined ? (
          <div className="bg-white/10 backdrop-blur-sm rounded-xl shadow-xl overflow-hidden">
            <div className="h-[60vh] overflow-y-auto p-4 space-y-4">
              {messages.map((message, index) => (
                <div key={index} className={`flex flex-col ${isOwnMessage(message.sender) ? 'items-end' : 'items-start'}`}>
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`text-sm font-medium ${message.sender === 'System' ? 'text-yellow-300' : isOwnMessage(message.sender) ? 'text-blue-300' : 'text-white/70'}`}>
                      {message.sender}
                    </span>
                    <span className="text-xs text-white/50">{message.timestamp}</span>
                  </div>
                  <div className={`rounded-lg p-3 shadow-sm max-w-[80%] break-words ${
                    message.sender === 'System' 
                      ? 'bg-yellow-500/20 text-yellow-100' 
                      : isOwnMessage(message.sender)
                        ? 'bg-blue-500 text-white'
                        : 'bg-white text-gray-800'
                  }`}>
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
                  className="flex-1 p-3 rounded-lg bg-white/90 focus:outline-none focus:ring-2 focus:ring-purple-500"
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
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 shadow-xl max-w-md mx-auto">
            <div className="space-y-4">
              <input
                placeholder="Your Name"
                ref={nameRef}
                className="w-full p-3 rounded-lg bg-white/90 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <input
                type="number"
                placeholder="Room Number"
                ref={idRef}
                className="w-full p-3 rounded-lg bg-white/90 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <button
                onClick={handleJoin}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg transition-colors duration-200 font-semibold"
              >
                {isConnecting ? "Connecting..." : "Join Room"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
