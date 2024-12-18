// BottomBar.tsx
import React from "react";
import BottomBarProps from "../props/bottombar_Props.tsx";
import { IoStatsChart } from "react-icons/io5";
import { CiPlay1, CiPause1, CiStop1 } from "react-icons/ci";
import { TbPlayerTrackPrev, TbPlayerTrackNext } from "react-icons/tb";
import { RxLoop, RxCrossCircled } from "react-icons/rx";
import formatTime from "../utils/time_Utils.tsx";

const BottomBar: React.FC<BottomBarProps> = ({
  name,
  artist,
  currentTime,
  duration,
  isPlaying,
  isLooping,
  togglePlayPause,
  stopPlayback,
  toggleLoop,
  handleSeek,
  buffered,
  navigate,
  playerRef,
  setCurrentTime,
}) => {
  return (
    <div className="fixed bottom-0 left-0 w-full bg-black text-white">
      {/* Seek Bar */}
      <div className="relative w-full h-1">
        {/* Buffered Progress Bar */}
        <div
          className="absolute top-0 left-0 h-2 bg-gray-400 rounded-full"
          style={{
            width: `${(buffered / duration) * 100}%`,
          }}
        />
        {/*Played Bar*/}
        <div
          className="absolute h-2 bg-orange-500 rounded-full"
          style={{ width: `${(currentTime / duration) * 100}%` }}
        />
        {/* Input Range for Seeking */}
        <input
          type="range"
          min={0}
          max={duration}
          value={currentTime}
          onChange={handleSeek}
          step="0.1"
          className="relative w-full h-2 bg-transparent appearance-none cursor-pointer"
          aria-label="Seek through the track"
        />

        {/* Custom styling for thumb and seek */}
        <style>
          {`
        input[type="range"] {
        position: absolute;
        top: 1;
        left: 0;
        width: 100%;
        height: 5px; 
      }

      input[type="range"]::-webkit-slider-thumb {
        -webkit-appearance: none;
        height: 10px;
        width: 10px;
        border-radius: 50%;
        background: orange;
        border: 2px solid darkorange;
        margin-top: 3px;
      }
    `}
        </style>
      </div>

      {/* Controls and Info */}
      <div className="p-3 flex items-center justify-between">
        {/* Song Name (Left Panel)*/}
        <div className="flex items-center gap-2 sm:gap-4 truncate">
          <IoStatsChart size={16} className="text-white sm:text-orange-500" />
          <p className="text-xs sm:text-sm lg:text-base font-medium truncate">
            {`${name} - ${artist}`}
          </p>
        </div>

        {/* Timer (Center)*/}
        <div className="text-sm">
          {formatTime(currentTime)} / {formatTime(duration)}
        </div>

        {/* Controls (Right Panel)*/}
        <div className="flex flex-wrap justify-between items-center gap-2">
          <button
            onClick={() => {
              const newTime = Math.max(currentTime - 10, 0);
              if (playerRef.current) playerRef.current.currentTime(newTime);
              setCurrentTime(newTime);
            }}
            className="bg-yellow-500 text-white px-4 py-2 rounded-lg shadow hover:bg-yellow-600"
            aria-label="Rewind 10 seconds"
          >
            <TbPlayerTrackPrev />
          </button>

          <button
            onClick={togglePlayPause}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600"
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? <CiPause1 /> : <CiPlay1 />}
          </button>

          <button
            onClick={stopPlayback}
            className="bg-red-500 text-white px-4 py-2 rounded-lg shadow hover:bg-red-600"
            aria-label="Stop Playback"
          >
            <CiStop1 />
          </button>

          <button
            onClick={toggleLoop}
            className={`px-4 py-2 rounded-lg shadow ${
              isLooping
                ? "bg-green-500 text-white hover:bg-green-600"
                : "bg-gray-300 text-gray-700 hover:bg-gray-400"
            }`}
            aria-label="Toggle Loop"
          >
            <RxLoop />
          </button>

          <button
            onClick={() => {
              const newTime = Math.min(currentTime + 10, duration);
              if (playerRef.current) playerRef.current.currentTime(newTime);
              setCurrentTime(newTime);
            }}
            className="bg-yellow-500 text-white px-4 py-2 rounded-lg shadow hover:bg-yellow-600"
            aria-label="Fast Forward 10 seconds"
          >
            <TbPlayerTrackNext />
          </button>

          <button
            onClick={() => navigate("/", { replace: true, state: null })}
            className="text-white"
            aria-label="Close Player"
          >
            <RxCrossCircled size={30} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default BottomBar;
