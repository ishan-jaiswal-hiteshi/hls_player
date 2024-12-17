import React from "react";
import { formatTime } from "../utils/time_Utils";

interface PlayerBarProps {
  currentTime: number;
  duration: number;
  formatTime: (time: number) => string;
  togglePlayPause: () => void;
  stopPlayback: () => void;
  toggleLoop: () => void;
  handleSeek: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isPlaying: boolean;
  isLooping: boolean;
  navigate: any;
}

const PlayerBar: React.FC<PlayerBarProps> = ({
  currentTime,
  duration,
  formatTime,
  togglePlayPause,
  stopPlayback,
  toggleLoop,
  handleSeek,
  isPlaying,
  isLooping,
  navigate,
}) => (
  <div className="fixed bottom-0 left-0 w-full bg-black text-white">
    <input
      type="range"
      min={0}
      max={duration}
      value={currentTime}
      onChange={handleSeek}
      step="0.1"
      className="absolute top-0 left-0 w-full h-2 bg-gray-700"
    />
    <div className="p-3 flex items-center justify-between">
      <div className="flex items-center gap-2 sm:gap-4 truncate">
        <p className="text-xs sm:text-sm lg:text-base font-medium truncate">
          {`${formatTime(currentTime)} / ${formatTime(duration)}`}
        </p>
      </div>
      <div className="flex flex-wrap justify-between items-center gap-2">
        <button
          onClick={() =>
            handleSeek({
              target: { value: Math.max(currentTime - 10, 0) },
            } as any)
          }
        >
          Previous
        </button>
        <button onClick={togglePlayPause}>
          {isPlaying ? "Pause" : "Play"}
        </button>
        <button onClick={stopPlayback}>Stop</button>
        <button
          onClick={toggleLoop}
          className={isLooping ? "bg-green-500" : "bg-gray-300"}
        >
          Loop
        </button>
        <button
          onClick={() =>
            handleSeek({
              target: { value: Math.min(currentTime + 10, duration) },
            } as any)
          }
        >
          Next
        </button>
        <button onClick={() => navigate("/", { replace: true, state: null })}>
          Close
        </button>
      </div>
    </div>
  </div>
);

export default PlayerBar;
