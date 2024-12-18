// AlbumDetails.tsx
import React from "react";
import AlbumDetailsProps from "../props/albumDetails_Props";
import { IoStatsChart } from "react-icons/io5";

const AlbumDetails: React.FC<AlbumDetailsProps> = ({
  poster,
  name,
  artist,
  albumName,
  description,
  videoRef,
}) => {
  return (
    <div className="shadow-lg rounded-lg overflow-hidden max-w-3xl w-full flex flex-col p-4 md:p-10 gap-6 bg-white">
      {/* Album Poster */}
      <div className="flex justify-center w-full">
        <img
          src={poster}
          alt={`Album poster for ${name}`}
          className="rounded-full w-40 h-40 md:w-96 md:h-96 object-cover shadow-xl "
        />
      </div>

      {/* Other Details and video.js player */}
      <div className="w-full">
        {/* Audio Player */}
        <div className="mb-4">
          <div className="rounded-lg overflow-hidden">
            <video
              ref={videoRef}
              className="video-js w-0 h-0"
              poster={poster}
            />
          </div>
        </div>

        {/* Other Details */}
        <div className="px-4 text-left">
          <div className="flex items-center gap-2 mb-2">
            <IoStatsChart size={20} color="orange" />
            <h2 className="text-xl font-bold text-orange-400">{name}</h2>
          </div>
          <p className="text-gray-500 text-xs mb-2">
            {albumName}
            <span className="text-pink-600 ml-2 bg-pink-100 px-2 py-1 rounded font-bold">
              INDIE
            </span>
          </p>
          <p className="font-semibold text-gray-800">{artist}</p>
          <hr className="my-4 h-px bg-gray-200 border-0" />
          <p className="mt-2 text-gray-700 leading-relaxed break-words sm:break-normal text-sm sm:text-base lg:text-lg overflow-hidden max-w-full">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AlbumDetails;
