import { WebSocketServer, WebSocket } from "ws";
const porta = process.env.PORT || 8080
const wss = new WebSocketServer({port: porta})

interface User {
    socket : WebSocket;
    room : String;
}

let allSockets: User[] = []

wss.on("connection",(socket) => {
    
    socket.on("message", (message) => {
        const parsedMessage = JSON.parse(message as unknown as string);
        if (parsedMessage.type == "join"){
            allSockets.push({
                socket,
                room: parsedMessage.payload.roomID
            })
        }

        if (parsedMessage.type == "chat"){
            let currentUserRoom = null
            for (let i = 0;i<allSockets.length;i++){
                if (allSockets[i].socket instanceof socket.constructor) {
                    currentUserRoom = allSockets[i].room
                }
            }
            for (let i = 0;i< allSockets.length;i++){
                if (allSockets[i].room == currentUserRoom){
                    allSockets[i].socket.send(parsedMessage.payload.message)
                }
            }
        }
    })

})