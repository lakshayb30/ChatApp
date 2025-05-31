import { rm } from "fs";
import { createServer } from "http";
import { WebSocketServer, WebSocket } from "ws";
const PORT = Number(process.env.PORT) || 8080;
const server = createServer(); 
    


const wss = new WebSocketServer({ server  });

interface User {
    socket : WebSocket;
    room : number;
}

let allSockets: User[] = []
var CurrentRooms:number[] = [];

wss.on("connection",(socket) => {

    setInterval(() => {
        socket.send(JSON.stringify({
        type:"roomdata",
        rcount:CurrentRooms.length
    }))
    }, 1000);
    
    

    socket.on("close" , () => {
        
        let remroom:number | undefined;
        console.log("1 connection closed")

        for(let i=0;i<allSockets.length;i++){
            
            if(allSockets[i].socket === socket){
                remroom = allSockets[i].room
                console.log("removed socket from :",remroom)
                allSockets.splice(i,1)
                break
            }
        }
        if(remroom !== undefined){
            const stillexist = allSockets.some(e => e.room === remroom)
            if(!stillexist){
                const roomIndex = CurrentRooms.indexOf(remroom);
                if(remroom !== -1){
                    console.log("rem room :",remroom);
                    CurrentRooms.splice(roomIndex,1)
                }else{
                    console.log("room not found:",remroom);
                }
            } else{
                console.log("room stil have sockets")
            }
        }
        
    })

    socket.on("message", (message) => {
        const parsedMessage = JSON.parse(message as unknown as string);
        

        if (parsedMessage.type == "join"){
            const rm:number = Number(parsedMessage.payload.roomID);
            if(CurrentRooms){
                let flag = 0;
                for(let i = 0;i<CurrentRooms.length;i++){
                    if(CurrentRooms[i] == rm){
                        flag = 1;
                    }  
                }
                if (flag == 0){
                        CurrentRooms.push(rm)
                }
            } 

           
            
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
                    allSockets[i].socket.send((
                        JSON.stringify({
                            msg: parsedMessage.payload.msg,
                            sender: parsedMessage.payload.sender,
                            currentrooms:CurrentRooms
                        })
                    ))
                    
                
                }
            }
        }
    })

})

// Start both HTTP & WebSocket server
server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
