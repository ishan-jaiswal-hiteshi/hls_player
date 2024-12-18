// BottomBar.tsx
import React from "react";
import BottomBarProps from "../props/bottombar_Props.tsx";
import { IoStatsChart } from "react-icons/io5";
import { CiPlay1, CiPause1 } from "react-icons/ci";
import { TbPlayerTrackPrev, TbPlayerTrackNext } from "react-icons/tb";
import { RxLoop, RxCrossCircled } from "react-icons/rx";
import formatTime from "../utils/time_Utils.tsx";
import { RxStop } from "react-icons/rx";

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
          className="absolute top-0 left-0 h-2 bg-yellow-100 rounded-full"
          style={{
            width: `${(buffered / duration) * 100}%`,
          }}
        />
        {/*Played Bar*/}
        <div
          className="absolute h-2 bg-yellow-500 rounded-full"
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
        background: yellow;
        border: 2px solid orange;
        margin-top: 3px;
      }
    `}
        </style>
      </div>

      {/* Controls and Info */}
      <div className="p-3 flex items-center justify-between">
        {/* Song Name (Left Panel)*/}
        <div className="flex items-center gap-2 sm:gap-4 truncate">
          <IoStatsChart size={16} className="text-white sm:text-white-500" />
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
            className="bg-black-500 px-4 py-2 rounded-lg shadow hover:bg-grey-600"
            aria-label="Rewind 10 seconds"
          >
            <TbPlayerTrackPrev color="white" size={20} />
          </button>

          <button
            onClick={toggleLoop}
            className={`px-4 py-2 rounded-lg bg-black shadow `}
            aria-label="Toggle Loop"
          >
            {isLooping ? (
              <RxLoop color="orange" size={20} />
            ) : (
              <RxLoop color="white" size={20} />
            )}
          </button>

          <button
            onClick={togglePlayPause}
            className="bg-white text-white w-10 h-10 rounded-full shadow flex items-center justify-center hover:bg-gray-600"
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? (
              <CiPause1 color="black" size={20} />
            ) : (
              <CiPlay1 color="black" size={20} />
            )}
          </button>

          <button
            onClick={stopPlayback}
            className="bg-black text-white px-4 py-2 rounded-lg shadow hover:bg-grey-600"
            aria-label="Stop Playback"
          >
            <RxStop color="white" size={20} />
          </button>

          <button
            onClick={() => {
              const newTime = Math.min(currentTime + 10, duration);
              if (playerRef.current) playerRef.current.currentTime(newTime);
              setCurrentTime(newTime);
            }}
            className="bg-black  px-4 py-2 rounded-lg shadow hover:bg-grey-600"
            aria-label="Fast Forward 10 seconds"
          >
            <TbPlayerTrackNext color="white" size={20} />
          </button>

          <button
            onClick={() => navigate("/", { replace: true, state: null })}
            className="text-white"
            aria-label="Close Player"
          >
            <RxCrossCircled size={25} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default BottomBar;
