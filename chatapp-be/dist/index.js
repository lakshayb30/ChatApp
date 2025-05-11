"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = require("http");
const fs_1 = require("fs");
const ws_1 = require("ws");
const path_1 = require("path");
const PORT = Number(process.env.PORT) || 8080;
// Create HTTP server to serve static frontend
const server = (0, http_1.createServer)((req, res) => {
    let filePath = req.url === "/" ? "index.html" : req.url;
    if (filePath && filePath.startsWith("/"))
        filePath = filePath.slice(1);
    const fullPath = (0, path_1.join)(__dirname, "../chatapp-fe/build", filePath);
    if ((0, fs_1.existsSync)(fullPath)) {
        const ext = (0, path_1.extname)(fullPath);
        const contentTypeMap = {
            ".html": "text/html",
            ".js": "application/javascript",
            ".css": "text/css",
            ".json": "application/json",
            ".png": "image/png",
            ".jpg": "image/jpeg",
            ".svg": "image/svg+xml",
        };
        const contentType = contentTypeMap[ext] || "text/plain";
        res.writeHead(200, { "Content-Type": contentType });
        res.end((0, fs_1.readFileSync)(fullPath));
    }
    else {
        // Fallback to index.html for client-side routing (React)
        const fallback = (0, path_1.join)(__dirname, "../chatapp-fe/build/index.html");
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end((0, fs_1.readFileSync)(fallback));
    }
});
const wss = new ws_1.WebSocketServer({ server });
let allSockets = [];
wss.on("connection", (socket) => {
    socket.on("message", (message) => {
        const parsedMessage = JSON.parse(message);
        if (parsedMessage.type == "join") {
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
                console.log(parsedMessage.payload);
                console.log(typeof (parsedMessage.payload));
                if (allSockets[i].room == currentUserRoom) {
                    allSockets[i].socket.send(parsedMessage.payload.message);
                }
            }
        }
    });
});
// Start both HTTP & WebSocket server
server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
