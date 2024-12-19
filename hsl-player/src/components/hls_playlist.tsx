import React from "react";

interface Media {
  sourceUrl: string;
  autoplay: boolean;
  loop: boolean;
  muted: boolean;
  poster: string;
  preload: string;
  name: string;
  artist: string;
  albumName: string;
  description: string;
}

const mediaList: Media[] = [
  {
    sourceUrl:
      "https://d2ccagweq17i1k.cloudfront.net/Output/1733996982061_Tum%20Hi%20Ho%20-%20Aashiqui%202%20128%20Kbps/1733996982061_Tum%20Hi%20Ho%20-%20Aashiqui%202%20128%20Kbps.m3u8?Expires=1734007220&Key-Pair-Id=AKIA3M7ACXH2FQDUUG47&Signature=iBuHSU~oEq-G0V5dag-0FSD0cyHlYIf2EaNwroYxyAGC7vnEDmTJ3xndkEqkNnh~FGon4g3kP56yOFF-jeewpYepfPZAqL6B3emFk8W1OVDZltCED7ZuTKj5Bq5X03xdNWB-pJNdcSk9-vtdPF58om8ElFWScxb22NtgQHJiQYUFMtCk-6cljAyWpwinHejk6fEpM0zztzN-Lv4sSX3c23z0Cxq5CesQJAlCBg3D3FmmPMJ4Oe6M7HR3GZResTcrPUuDd4Cev~5ATLqEE3b~tuCsb9V7KzvMn1ps~qfe~vSzTufrogb~~Znoy9N7e1~PQ~KkU~ewMw~lOsAYw1QKjw__",
    autoplay: false,
    loop: false,
    muted: false,
    poster: "https://tailwindcss.com/img/card-top.jpg",
    preload: "auto",
    name: "Tum Hi Ho",
    artist: "Arijit Singh",
    albumName: "Aashiqui 2",
    description: "A soulful melody from the movie Aashiqui 2.",
  },
  {
    sourceUrl:
      "https://d2ccagweq17i1k.cloudfront.net/Output/1733996982061_Tum%20Hi%20Ho%20-%20Aashiqui%202%20128%20Kbps/1733996982061_Tum%20Hi%20Ho%20-%20Aashiqui%202%20128%20Kbps.m3u8?Expires=1734007220&Key-Pair-Id=AKIA3M7ACXH2FQDUUG47&Signature=iBuHSU~oEq-G0V5dag-0FSD0cyHlYIf2EaNwroYxyAGC7vnEDmTJ3xndkEqkNnh~FGon4g3kP56yOFF-jeewpYepfPZAqL6B3emFk8W1OVDZltCED7ZuTKj5Bq5X03xdNWB-pJNdcSk9-vtdPF58om8ElFWScxb22NtgQHJiQYUFMtCk-6cljAyWpwinHejk6fEpM0zztzN-Lv4sSX3c23z0Cxq5CesQJAlCBg3D3FmmPMJ4Oe6M7HR3GZResTcrPUuDd4Cev~5ATLqEE3b~tuCsb9V7KzvMn1ps~qfe~vSzTufrogb~~Znoy9N7e1~PQ~KkU~ewMw~lOsAYw1QKjw__",
    autoplay: false,
    loop: false,
    muted: false,
    poster: "https://tailwindcss.com/img/card-top.jpg",
    preload: "auto",
    name: "Sun Saathiya",
    artist: "Divya Kumar & Priya Saraiya",
    albumName: "ABCD 2",
    description: "A romantic song with mesmerizing tunes.",
  },
  {
    sourceUrl:
      "https://d2ccagweq17i1k.cloudfront.net/Output/1733996982061_Tum%20Hi%20Ho%20-%20Aashiqui%202%20128%20Kbps/1733996982061_Tum%20Hi%20Ho%20-%20Aashiqui%202%20128%20Kbps.m3u8?Expires=1734007220&Key-Pair-Id=AKIA3M7ACXH2FQDUUG47&Signature=iBuHSU~oEq-G0V5dag-0FSD0cyHlYIf2EaNwroYxyAGC7vnEDmTJ3xndkEqkNnh~FGon4g3kP56yOFF-jeewpYepfPZAqL6B3emFk8W1OVDZltCED7ZuTKj5Bq5X03xdNWB-pJNdcSk9-vtdPF58om8ElFWScxb22NtgQHJiQYUFMtCk-6cljAyWpwinHejk6fEpM0zztzN-Lv4sSX3c23z0Cxq5CesQJAlCBg3D3FmmPMJ4Oe6M7HR3GZResTcrPUuDd4Cev~5ATLqEE3b~tuCsb9V7KzvMn1ps~qfe~vSzTufrogb~~Znoy9N7e1~PQ~KkU~ewMw~lOsAYw1QKjw__",
    autoplay: false,
    loop: false,
    muted: false,
    poster: "https://tailwindcss.com/img/card-top.jpg",
    preload: "auto",
    name: "Bekhayali",
    artist: "Sachet Tandon",
    albumName: "Kabir Singh",
    description: "An emotional song depicting love and pain.",
  },
  {
    sourceUrl:
      "https://d2ccagweq17i1k.cloudfront.net/Output/1733996982061_Tum%20Hi%20Ho%20-%20Aashiqui%202%20128%20Kbps/1733996982061_Tum%20Hi%20Ho%20-%20Aashiqui%202%20128%20Kbps.m3u8?Expires=1734007220&Key-Pair-Id=AKIA3M7ACXH2FQDUUG47&Signature=iBuHSU~oEq-G0V5dag-0FSD0cyHlYIf2EaNwroYxyAGC7vnEDmTJ3xndkEqkNnh~FGon4g3kP56yOFF-jeewpYepfPZAqL6B3emFk8W1OVDZltCED7ZuTKj5Bq5X03xdNWB-pJNdcSk9-vtdPF58om8ElFWScxb22NtgQHJiQYUFMtCk-6cljAyWpwinHejk6fEpM0zztzN-Lv4sSX3c23z0Cxq5CesQJAlCBg3D3FmmPMJ4Oe6M7HR3GZResTcrPUuDd4Cev~5ATLqEE3b~tuCsb9V7KzvMn1ps~qfe~vSzTufrogb~~Znoy9N7e1~PQ~KkU~ewMw~lOsAYw1QKjw__",
    autoplay: false,
    loop: false,
    muted: false,
    poster: "https://tailwindcss.com/img/card-top.jpg",
    preload: "auto",
    name: "Tera Ban Jaunga",
    artist: "Akhil Sachdeva & Tulsi Kumar",
    albumName: "Kabir Singh",
    description: "A beautiful duet portraying commitment and love.",
  },
];

const PlaylistPage: React.FC = () => {
  return (
    <div className="font-poppins flex flex-col items-center px-4 md:flex-row md:justify-center  max-w-full overflow-hidden">
      <div className="shadow-xl shadow-yellow-200 rounded-lg overflow-hidden max-w-3xl w-full flex flex-col p-4 md:p-10 gap-6 bg-white ">
        <ul className="divide-y divide-gray-200">
          {mediaList.map((song, index) => (
            <li key={index} className="py-4">
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  <img
                    className="w-16 h-16 rounded-lg object-cover"
                    src={song.poster}
                    alt={`${song.name} poster`}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-lg font-semibold text-gray-900 truncate">
                    {song.name}
                  </p>
                  <p className="text-sm text-gray-500 truncate">
                    {song.artist} - {song.albumName}
                  </p>
                  <p className="text-sm text-gray-400 truncate">
                    {song.description}
                  </p>
                </div>
                <div className="flex-shrink-0">
                  <button
                    onClick={() => alert(`Playing: ${song.name}`)}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Play
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PlaylistPage;
