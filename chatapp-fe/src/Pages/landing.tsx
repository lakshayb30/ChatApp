import {  Github, SquareArrowOutUpRight } from "lucide-react"

export default function Landing(){
    function Header(){
        return (
            <div className="backdrop-blur-lg  border-b-2 border-orange-600 items-center fixed bg-black/90 text-white top-0 left-0 w-full px-8 py-4 flex items-center justify-around ">
                <div className="text-orange-400 font-bold text-2xl">
                    <a href="/">TalkSpace</a>
                </div>
                <div className="flex gap-10 items-center">
                    <span className="hover:text-orange-400 cursor-pointer duration-300">Features</span>
                    <span className="hover:text-orange-400 cursor-pointer duration-300">Preview</span>
                    <a href="https://github.com/lkshayb/chatapp" target="_blank">
                        <span className="flex items-center gap-2 text-lg cursor-pointer hover:scale-110  duration-200 bg-gradient-to-r from-orange-700 to-orange-500 text-black font-bold py-1 px-3 rounded-lg">
                            <Github/>
                            Github
                        </span>
                    </a>
                    
                </div>
            </div>
        )
    }
    
    function Hero(){
        function Card(props:any){
            return(
                <div className="bg-white">
                    <div>{props.head}</div>
                    <div>{props.base}</div>
                </div>
            )
        }
        return(
            <div className=" h-screen font-black  bg-gradient-to-br from-black via-[#121226] to-[#4d2a12]">
                <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-orange-400/20 to-amber-500/20 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute top-40 right-20 w-96 h-96 bg-gradient-to-r from-amber-400/15 to-orange-600/15 rounded-full blur-3xl animate-pulse delay-1000"></div>
                <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-gradient-to-r from-orange-500/10 to-amber-600/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
                <div className=" relative z-10 text-center flex flex-col justify-center items-center top-[35%]">
                    <div className="text-7xl font-bold text-white">
                        <span className="text-white-500">
                            Real-time 
                            <div className="bg-clip-text bg-gradient-to-l from-orange-500 to-orange-700 text-transparent">
                                Room Chats
                            </div>
                        </span>
                    </div>
                    <div className="mt-4 font-thin max-w-xl  text-white">
                        TalkSpace is a modern chat app which supports room based chats. 
                        Its a full-stack real-time messaging application built with React, Node.js, and WebSockets. 
                    </div>
                    <div className="mt-8 flex justify-center gap-4">
                        <a href="https://github.com/lkshayb/chatapp" target="_blank">
                            <div className="flex items-center  gap-3 hover:scale-105 hover:shadow-xl hover:shadow-orange-500/25 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-black px-6 py-3 rounded-md font-bold text-lg duration-300">
                                <Github/>
                                View on GitHub
                            </div>
                        </a>
                        
                        <a href="/main">
                            <div className="flex items-center gap-3 text-lg border border-orange-500 hover:bg-orange-500 text-orange-500 hover:text-white px-6 py-3 rounded-md transition">
                                <SquareArrowOutUpRight className="h-5"/>
                                Get Started
                            </div>
                        </a>
                    
                    </div>
                    <Card head="Real-time" base="WebSocket messaging"/>
                </div>
                
            </div>
        )
    }
    return(
        <div>
            <Header/>
            <Hero/>
        </div>
    )
}