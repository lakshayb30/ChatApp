import {  Github, SquareArrowOutUpRight, Menu, X, Zap ,MonitorSmartphone, UsersRound, MessageSquare, Settings, Lock} from "lucide-react"
import { useState , useRef} from "react"

export default function Landing(){
    const featuresRef = useRef<HTMLDivElement>(null);
    function Header(){
        const [menu,setmenu] = useState(false)
        return (
            <div className="z-50 relative backdrop-blur-lg  border-b-2 border-orange-600 items-center fixed bg-black/90 text-white top-0 left-0 w-full px-8 py-4 flex items-center justify-around ">
                <div className="text-orange-400 font-bold text-2xl">
                    <a href="/">TalkSpace</a>
                </div>
                <div className="md:flex gap-10 items-center hidden">
                    <span onClick={() => featuresRef.current?.scrollIntoView({ behavior: "smooth" , block:"start"})} className="hover:text-orange-400 cursor-pointer duration-300">Features</span>
                    <span className="hover:text-orange-400 cursor-pointer duration-300">Preview</span>
                    <a href="https://github.com/lkshayb/chatapp" target="_blank">
                        <span className="flex items-center gap-2 text-lg cursor-pointer hover:scale-110  duration-200 bg-gradient-to-r from-orange-700 to-orange-500 text-black font-bold py-1 px-3 rounded-lg">
                            <Github/>
                            Github
                        </span>
                    </a>
                </div>
                <div className="md:hidden flex">
                    <Menu onClick={() => setmenu(true)} className={`h-10 ${menu ? "hidden" : "flex"} cursor-pointer`}/>
                    <X onClick={() => setmenu(false)} className={`h-10 ${menu ? "flex" : "hidden"} cursor-pointer`}/>
                </div>
                <div className={`${menu ? "block" : "hidden"} transition-all duration-300 ease-in-out flex flex-col md:hidden py-2 px-4 text-xl bg-black text-white absolute left-0 right-0 top-[101%]`}>
                    <button onClick={() => featuresRef.current?.scrollIntoView({ behavior: "smooth" })} className="mb-2 hover:bg-gray-900 rounded-lg py-3 px-8 hover:text-orange-500 cursor-pointer text-left">Features</button>
                    <button className="mb-2 hover:bg-gray-900 rounded-lg py-3 px-8 hover:text-orange-500 cursor-pointer text-left">Preview</button>
                    <a href="https://github.com/lkshayb/chatapp" target="_blank" className="mb-2 hover:from-orange-500 hover:to-orange-400 hover:shadow-sm duration-200  hover:shadow-orange-300 flex gap-3 py-3 px-8 items-center bg-gradient-to-r from-orange-700 to-orange-500 rounded-lg text-black font-semibold">
                        <Github className="h-5"/>
                        Github
                    </a>
                    
                </div>
            </div>
        )
    }
    
    function Hero(){
        function Card(props:any){
            return(
                <div className="py-5 px-8 mt-5 bg-black/10 border-orange-500/30 border backdrop-blur-md rounded-xl md:w-[100%] sm:w-[600px] hover:scale-105 duration-300">
                    <div className="text-2xl font-bold text-orange-400">{props.head}</div>
                    <div className="text-white font-thin pt-3">{props.base}</div>
                </div>
            )
        }
        return(
            <div className=" min-h-screen font-black pt-[100px] pb-[100px] bg-gradient-to-br from-black via-[#121226] to-[#4d2a12]">
                <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-orange-400/20 to-amber-500/20 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute top-40 right-20 w-96 h-96 bg-gradient-to-r from-amber-400/15 to-orange-600/15 rounded-full blur-3xl animate-pulse delay-1000"></div>
                <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-gradient-to-r from-orange-500/10 to-amber-600/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
                <div className="px-5 relative z-10 text-center flex flex-col justify-center items-center ">
                    <div className="md:text-7xl text-5xl font-bold text-white">
                        <span className="text-white-500">
                            <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-[length:_400%_400%] bg-clip-text text-transparent animate-gradient-move">
                               Real-time  
                            </span>
                            
                            <div className="bg-clip-text bg-gradient-to-l from-orange-500 to-orange-700 text-transparent">
                                Room Chats
                            </div>
                        </span>
                    </div>
                    <div className="md:text-md text-xl mt-4 font-thin max-w-xl  text-white">
                        TalkSpace is a modern chat app which supports room based chats. 
                        Its a full-stack real-time messaging application built with React, Node.js, and WebSockets. 
                    </div>
                    <div className="mt-8 sm:flex justify-center gap-4 ">
                        <a href="https://github.com/lkshayb/chatapp"  target="_blank">
                            <div className="flex items-center  gap-3 hover:scale-105 hover:shadow-xl hover:shadow-orange-500/25 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-black md:px-6 md:py-3 py-3 px-3 md:text-md rounded-md font-bold text-lg duration-300">
                                <Github className="md:h-8 h-5 "/>
                                View on GitHub
                            </div>
                        </a>
                        
                        <a href="/main">
                            <div className="sm:mt-0 mt-5  flex items-center gap-3 text-lg border border-orange-500 hover:bg-orange-500 text-orange-500 hover:text-white md:px-6 md:py-3 py-3 px-3 rounded-md transition">
                                <SquareArrowOutUpRight className="md:h-8 h-5 "/>
                                Get Started
                            </div>
                        </a>
                    
                    </div>
                    <div className="flex justify-center ">
                        <div className="md:flex gap-4">
                            <Card head="Instant Chat" base="Seamless real-time conversations"/>
                            <Card head="Scalable Backend" base="Built with Express & WebSockets"/>
                            <Card head="Clean Design" base="Responsive Tailwind UI"/>
                        </div>
                        
                    </div>
                    
                </div>
                
            </div>
        )
    }

    function Features({ refProp }: { refProp: React.RefObject<HTMLDivElement> }){
        function Card(props:any){
            return (
                <div  className="max-w-[400px] z-90 group bg-gradient-to-tl rounded-xl border-orange-700/30 border from-gray-900 to-[black] sm:w-auto w-[300px]  text-white pt-7 pl-7 hover:border-orange-700/60 duration-300 shadow-xl hover:scale-105 hover:shadow-orange-700/20">
                    
                    <div className="flex justify-left">
                        <div className="group-hover:bg-orange-900/100 group-hover:scale-[115%] duration-300 bg-orange-600/80 rounded-lg flex justify-center p-2 text-orange-300">
                            {props.children}
                        </div>
                    </div>
                    
                    <div className="mt-6 mb-6">
                        <div className="text-2xl font-bold mb-4 group-hover:text-orange-300">
                            {props.upper}
                        </div>
                        <div className="text-gray-300">
                            {props.lower}
                        </div>
                        
                    </div>
                </div>
            )
        }
        return(
            <div ref={refProp} className="relative min-h-screen bg-gradient-to-tr from-black to-[#121226] pb-[100px]">
                <div className="absolute top-20 right-10 w-72 h-72 bg-gradient-to-r from-orange-400/10 to-amber-800/20 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-gradient-to-r from-blue-900/30 to-amber-600/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
                <div className="relative">
                    <div className="flex justify-center pt-[100px] ">
                        <span className="sm:text-5xl text-3xl font-bold text-white">
                            Powerful <span className="bg-clip-text bg-gradient-to-l from-orange-400 to-orange-600 text-transparent">Features</span>
                        </span>
                        
                    </div>
                    <span className="text-center text-white flex justify-center mt-10 md:text-xl px-5 font-thin">
                        TalkSpace helps you connect instantly with friends, teams, or communities — no sign-up hassle, just seamless conversation in real time.
                    </span>
                </div>
                <div className="relative flex gap-10 flex-wrap justify-center mt-[100px]">
                    <Card upper="Real-time Messaging" lower="Instant message delivery using WebSocket technology for live, seamless communication. Messages appear instantly without needing to refresh.">
                        <Zap className="text-black group-hover:text-orange-300"/>
                    </Card>      
                    <Card upper="Mobile-first Design" lower="Responsive UI built with Tailwind CSS, optimized for all devices. Enjoy a smooth and consistent experience on mobile, tablet, and desktop.">
                        <MonitorSmartphone className="text-black group-hover:text-orange-300"/>
                    </Card> 
                    <Card upper="Multi-user Support" lower="Supports multiple users chatting simultaneously with real-time presence updates like online status and typing indicators.">
                        <UsersRound className="text-black group-hover:text-orange-300"/>
                    </Card> 
                    <Card upper="Private Chat Rooms" lower="One-on-one chat rooms with secure, isolated threads. Perfect for confidential and direct conversations between users.">
                        <Lock className="text-black group-hover:text-orange-300"/>
                    </Card> 
                    <Card upper="Modern Tech Stack" lower="Built with React, Node.js, Express, Tailwind CSS, and TypeScript—ensuring fast performance and a scalable architecture.">
                        <Settings className="text-black group-hover:text-orange-300"/>
                    </Card> 
                    <Card upper="Clean Interface" lower="A minimal, intuitive layout focused on user experience. Easy to navigate with clear message flow and user status indicators.">
                        <MessageSquare className="text-black group-hover:text-orange-300"/>
                    </Card>                   
                </div>


            </div>
        )
    }
    return(
        <div>
            <Header/>
            <Hero/>
            <Features refProp={featuresRef} />
        </div>
    )
}