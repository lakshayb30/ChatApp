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
                    <span className="flex items-center gap-2 text-lg cursor-pointer hover:scale-110  duration-200 bg-gradient-to-r from-orange-700 to-orange-500 text-black font-bold py-1 px-3 rounded-lg">
                        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" className="h-7" viewBox="0 0 64 64">
                            <path d="M32 6C17.641 6 6 17.641 6 32c0 12.277 8.512 22.56 19.955 25.286-.592-.141-1.179-.299-1.755-.479V50.85c0 0-.975.325-2.275.325-3.637 0-5.148-3.245-5.525-4.875-.229-.993-.827-1.934-1.469-2.509-.767-.684-1.126-.686-1.131-.92-.01-.491.658-.471.975-.471 1.625 0 2.857 1.729 3.429 2.623 1.417 2.207 2.938 2.577 3.721 2.577.975 0 1.817-.146 2.397-.426.268-1.888 1.108-3.57 2.478-4.774-6.097-1.219-10.4-4.716-10.4-10.4 0-2.928 1.175-5.619 3.133-7.792C19.333 23.641 19 22.494 19 20.625c0-1.235.086-2.751.65-4.225 0 0 3.708.026 7.205 3.338C28.469 19.268 30.196 19 32 19s3.531.268 5.145.738c3.497-3.312 7.205-3.338 7.205-3.338.567 1.474.65 2.99.65 4.225 0 2.015-.268 3.19-.432 3.697C46.466 26.475 47.6 29.124 47.6 32c0 5.684-4.303 9.181-10.4 10.4 1.628 1.43 2.6 3.513 2.6 5.85v8.557c-.576.181-1.162.338-1.755.479C49.488 54.56 58 44.277 58 32 58 17.641 46.359 6 32 6zM33.813 57.93C33.214 57.972 32.61 58 32 58 32.61 58 33.213 57.971 33.813 57.93zM37.786 57.346c-1.164.265-2.357.451-3.575.554C35.429 57.797 36.622 57.61 37.786 57.346zM32 58c-.61 0-1.214-.028-1.813-.07C30.787 57.971 31.39 58 32 58zM29.788 57.9c-1.217-.103-2.411-.289-3.574-.554C27.378 57.61 28.571 57.797 29.788 57.9z"></path>
                        </svg>
                        Github
                    </span>
                </div>
            </div>
        )
    }
    
    function Hero(){
        return(
            <div className=" h-screen font-black  bg-gradient-to-br from-black via-[#121226] to-[#4d2a12]">
                <div className=" absolute top-0 left-0 w-[500px] h-[500px] bg-yellow-900 opacity-80 rounded-full blur-3xl animate-pulse transition duration-1000 mix-blend-screen "></div>
                <div className=" absolute bottom-0 right-0 w-[300px] h-[300px] bg-orange-700 opacity-50 rounded-full blur-3xl animate-pulse transition duration-1000 mix-blend-screen  "></div>
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
                    <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-md shadow-lg transition">View on GitHub</button>
                    <a href="/main">
                        <div className="border border-orange-500 hover:bg-orange-500 text-orange-500 hover:text-white px-6 py-3 rounded-md transition">
                            Get Started
                        </div>
                    </a>
                    
                    </div>
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