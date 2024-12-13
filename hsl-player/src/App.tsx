import "./App.css";
import HlsPlayer from "./components/hls_player.tsx";
function App() {
  return (
    <>
      <HlsPlayer
        sourceUrl="https://d2ccagweq17i1k.cloudfront.net/Output/1733996982061_Tum%20Hi%20Ho%20-%20Aashiqui%202%20128%20Kbps/1733996982061_Tum%20Hi%20Ho%20-%20Aashiqui%202%20128%20Kbps.m3u8?Expires=1734007220&Key-Pair-Id=AKIA3M7ACXH2FQDUUG47&Signature=iBuHSU~oEq-G0V5dag-0FSD0cyHlYIf2EaNwroYxyAGC7vnEDmTJ3xndkEqkNnh~FGon4g3kP56yOFF-jeewpYepfPZAqL6B3emFk8W1OVDZltCED7ZuTKj5Bq5X03xdNWB-pJNdcSk9-vtdPF58om8ElFWScxb22NtgQHJiQYUFMtCk-6cljAyWpwinHejk6fEpM0zztzN-Lv4sSX3c23z0Cxq5CesQJAlCBg3D3FmmPMJ4Oe6M7HR3GZResTcrPUuDd4Cev~5ATLqEE3b~tuCsb9V7KzvMn1ps~qfe~vSzTufrogb~~Znoy9N7e1~PQ~KkU~ewMw~lOsAYw1QKjw__"
        autoplay={false}
        loop={false}
        muted={false}
        poster="https://tailwindcss.com/img/card-top.jpg"
        preload="auto"
        aspectRatio=""
        artist="Unknown Artist"
        albumName="Unknown Album"
        description="No description available."
      />
    </>
  );
}

export default App;
