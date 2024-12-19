import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HlsPlayer from "../components/hls_Player.tsx";
import FormPage from "../components/hls_Form.tsx";
import Playlist_Page from "../components/hls_playlist.tsx";
import Not_Found from "../components/not_Found.tsx";

//Defining Routes for complete app
const routes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<FormPage />} />
        <Route path="/playlists" element={<Playlist_Page />} />
        <Route path="/audio-player" element={<HlsPlayer />} />
        <Route path="*" element={<Not_Found />} />
      </Routes>
    </Router>
  );
};

export default routes;
