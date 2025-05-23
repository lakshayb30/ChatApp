"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = require("http");
const ws_1 = require("ws");
//import { extname, join } from "path";
//import { IncomingMessage, ServerResponse } from "http";
const PORT = Number(process.env.PORT) || 8080;
// Create HTTP server to serve static frontend
/* const server = createServer((req: IncomingMessage, res: ServerResponse) => {
    let filePath: any = req.url === "/" ? "index.html" : req.url;
    if (filePath && filePath.startsWith("/")) filePath = filePath.slice(1);

    const fullPath = join(__dirname, "../chatapp-fe/build", filePath);

    if (existsSync(fullPath)) {
        const ext = extname(fullPath);
        const contentTypeMap: { [key: string]: string } = {
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
        res.end(readFileSync(fullPath));
    } else {
        // Fallback to index.html for client-side routing (React)
        const fallback = join(__dirname, "../chatapp-fe/build/index.html");
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(readFileSync(fallback));
    }
}); */
const server = (0, http_1.createServer)();
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
                    allSockets[i].socket.send((JSON.stringify({
                        msg: parsedMessage.payload.msg,
                        sender: parsedMessage.payload.sender
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
