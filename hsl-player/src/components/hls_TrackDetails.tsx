import React from "react";

interface TrackDetailsProps {
  name: string;
  artist: string;
  albumName: string;
  description: string;
  poster: string;
}

const TrackDetails: React.FC<TrackDetailsProps> = ({
  name,
  artist,
  albumName,
  description,
  poster,
}) => {
  return (
    <div className="flex flex-col items-start gap-4">
      <div className="flex justify-center w-full">
        <img
          src={poster}
          alt={`Album poster for ${name}`}
          className="rounded-lg w-40 h-40 md:w-96 md:h-96 object-cover shadow-xl"
        />
      </div>
      <div className="text-left">
        <div className="flex items-center gap-2 mb-2">
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
  );
};

export default TrackDetails;
