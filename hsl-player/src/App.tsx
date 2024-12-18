import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HlsPlayer from "./components/hls_Player.tsx";
//import React from "react";
import FormPage from "./components/hls_Form.tsx";

//Defining reoutes for App
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<FormPage />} />
        <Route path="/audio-player" element={<HlsPlayer />} />
      </Routes>
    </Router>
  );
}

export default App;
