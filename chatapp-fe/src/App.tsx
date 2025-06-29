import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./Pages/landing";
import MainApp from "./Pages/mvp"


export default function App(){
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" >
          <Route path="" element={<Landing />} />
          <Route path="Main" element={<MainApp />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}