import React from "react";
import { TbPlayerTrackPrev, TbPlayerTrackNext } from "react-icons/tb";
import { CiPlay1, CiPause1, CiStop1 } from "react-icons/ci";
import { RxLoop, RxCrossCircled } from "react-icons/rx";

interface PlayerControlsProps {
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  isLooping: boolean;
  onPlayPause: () => void;
  onStop: () => void;
  onLoopToggle: () => void;
  onSeek: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRewind: () => void;
  onForward: () => void;
  onClose: () => void;
}

const PlayerControls: React.FC<PlayerControlsProps> = ({
  isPlaying,
  currentTime,
  duration,
  isLooping,
  onPlayPause,
  onStop,
  onLoopToggle,
  onSeek,
  onRewind,
  onForward,
  onClose,
}) => {
  return (
    <div className="flex items-center justify-between p-4 bg-black text-white">
      {/* Seek Bar */}
      <div className="relative w-full">
        <input
          type="range"
          min={0}
          max={duration}
          value={currentTime}
          onChange={onSeek}
          step="0.1"
          className="absolute top-0 left-0 w-full h-2 bg-gray-700 cursor-pointer"
          aria-label="Seek through the track"
        />
      </div>

      {/* Controls and Info */}
      <div className="flex items-center gap-4">
        {/* Rewind */}
        <button
          onClick={onRewind}
          className="bg-yellow-500 text-white px-4 py-2 rounded-lg shadow hover:bg-yellow-600"
          aria-label="Rewind 10 seconds"
        >
          <TbPlayerTrackPrev />
        </button>

        {/* Play/Pause */}
        <button
          onClick={onPlayPause}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600"
          aria-label={isPlaying ? "Pause" : "Play"}
        >
          {isPlaying ? <CiPause1 /> : <CiPlay1 />}
        </button>

        {/* Stop */}
        <button
          onClick={onStop}
          className="bg-red-500 text-white px-4 py-2 rounded-lg shadow hover:bg-red-600"
          aria-label="Stop Playback"
        >
          <CiStop1 />
        </button>

        {/* Loop */}
        <button
          onClick={onLoopToggle}
          className={`${
            isLooping ? "bg-green-500 text-white" : "bg-gray-300 text-gray-700"
          } px-4 py-2 rounded-lg shadow hover:bg-green-600`}
          aria-label="Toggle Loop"
        >
          <RxLoop />
        </button>

        {/* Forward */}
        <button
          onClick={onForward}
          className="bg-yellow-500 text-white px-4 py-2 rounded-lg shadow hover:bg-yellow-600"
          aria-label="Fast Forward 10 seconds"
        >
          <TbPlayerTrackNext />
        </button>

        {/* Close */}
        <button
          onClick={onClose}
          className="text-white"
          aria-label="Close Player"
        >
          <RxCrossCircled size={30} />
        </button>
      </div>
    </div>
  );
};

export default PlayerControls;
