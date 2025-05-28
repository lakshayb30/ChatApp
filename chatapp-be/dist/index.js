"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = require("http");
const ws_1 = require("ws");
const PORT = Number(process.env.PORT) || 8080;
const server = (0, http_1.createServer)();
const wss = new ws_1.WebSocketServer({ server });
let allSockets = [];
var CurrentRooms = [];
wss.on("connection", (socket) => {
    setInterval(() => {
        socket.send(JSON.stringify({
            type: "roomdata",
            rcount: CurrentRooms.length
        }));
    }, 1000);
    socket.on("close", () => {
        for (let i = 0; i < allSockets.length; i++) {
            if (allSockets[i].socket == socket) {
                const rm = allSockets[i].room;
                for (let i = CurrentRooms.length; i >= 0; i--) {
                    if (CurrentRooms[i] == rm) {
                        CurrentRooms.splice(i, 1);
                    }
                }
            }
        }
        console.log(CurrentRooms);
    });
    socket.on("message", (message) => {
        const parsedMessage = JSON.parse(message);
        if (parsedMessage.type == "join") {
            const rm = Number(parsedMessage.payload.roomID);
            if (CurrentRooms) {
                let flag = 0;
                for (let i = 0; i < CurrentRooms.length; i++) {
                    if (CurrentRooms[i] == rm) {
                        flag = 1;
                    }
                }
                if (flag == 0) {
                    CurrentRooms.push(rm);
                }
            }
            allSockets.push({
                socket,
                room: parsedMessage.payload.roomID
            });
        }
        if (parsedMessage.type == "chat") {
            let currentUserRoom = null;
            for (let i = 0; i < allSockets.length; i++) {
                if (allSockets[i].socket instanceof socket.constructor) {
                    currentUserRoom = allSockets[i].room;
                }
            }
            for (let i = 0; i < allSockets.length; i++) {
                if (allSockets[i].room == currentUserRoom) {
                    allSockets[i].socket.send((JSON.stringify({
                        msg: parsedMessage.payload.msg,
                        sender: parsedMessage.payload.sender,
                        currentrooms: CurrentRooms
                    })));
                }
            }
        }
    });
});
// Start both HTTP & WebSocket server
server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
