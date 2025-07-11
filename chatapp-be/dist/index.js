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
        let remroom;
        console.log("1 connection closed");
        for (let i = 0; i < allSockets.length; i++) {
            if (allSockets[i].socket === socket) {
                remroom = allSockets[i].room;
                console.log("removed socket from :", remroom);
                allSockets.splice(i, 1);
                break;
            }
        }
        if (remroom !== undefined) {
            const stillexist = allSockets.some(e => e.room === remroom);
            if (!stillexist) {
                const roomIndex = CurrentRooms.indexOf(remroom);
                if (remroom !== -1) {
                    console.log("rem room :", remroom);
                    CurrentRooms.splice(roomIndex, 1);
                }
                else {
                    console.log("room not found:", remroom);
                }
            }
            else {
                console.log("room stil have sockets");
            }
        }
    });
    socket.on("message", (message) => {
        const parsedMessage = JSON.parse(message);
        setInterval(() => {
            const usersInRoom = allSockets
                .filter(user => user.room === parsedMessage.payload.roomID)
                .map(user => user.name);
            let rmcount = 0;
            for (let i = 0; i < allSockets.length; i++) {
                if (allSockets[i].room == parsedMessage.payload.roomID) {
                    rmcount++;
                    allSockets[i].socket.send((JSON.stringify({
                        type: "pplcount",
                        count: rmcount,
                        names: usersInRoom
                    })));
                }
            }
        }, 1000);
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
            console.log("Looking for users in room:", parsedMessage.payload.roomID);
            allSockets.push({
                socket,
                room: parsedMessage.payload.roomID,
                name: parsedMessage.payload.name
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
