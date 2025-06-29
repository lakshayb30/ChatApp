import { useEffect, useRef, useState } from "react";
import "./App.css";
import { ClipLoader } from "react-spinners";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainApp from "./Pages/mvp"




function Landing(){
  return(
    <div>

    </div>
  )
}

export default function App(){
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" >
          <Route path="Landing" element={<Landing />} />
          <Route path="Main" element={<MainApp />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}