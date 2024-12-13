import React, { useEffect, useRef, useState } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";
import Hls from "hls.js";

interface HlsPlayerProps {
  sourceUrl: string;
  autoplay?: boolean;
  loop?: boolean;
  muted?: boolean;
  poster?: string;
  preload?: "auto" | "metadata" | "none";
  aspectRatio?: string;
  artist?: string;
  albumName?: string;
  description?: string;
}

const HlsPlayer: React.FC<HlsPlayerProps> = ({
  sourceUrl,
  autoplay = false,
  loop = false,
  muted = false,
  poster = "",
  preload = "",
  aspectRatio = "",
  artist = "",
  albumName = "",
  description = "",
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const playerRef = useRef<any>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [buffered, setBuffered] = useState(0);
  const [isLooping, setIsLooping] = useState(loop);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  useEffect(() => {
    const videoElement = videoRef.current;

    if (videoElement) {
      const player = videojs(videoElement, {
        controls: false,
        responsive: true,
        fluid: true,
        autoplay,
        loop,
        muted,
        poster,
        preload,
      });

      playerRef.current = player;

      if (Hls.isSupported()) {
        const hls = new Hls();
        hls.loadSource(sourceUrl);
        hls.attachMedia(videoElement);

        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          const duration = hls.media?.duration || 0;
          setDuration(duration);
        });

        hls.on(Hls.Events.LEVEL_LOADED, (_, data) => {
          const duration = data.details.totalduration || 0;
          setDuration(duration);
        });

        hls.on(Hls.Events.ERROR, (event, data) => {
          console.error("HLS.js error:", data);
        });
      }

      const onTimeUpdate = () => {
        setCurrentTime(videoElement.currentTime);

        const bufferRanges = videoElement.buffered;
        if (bufferRanges.length > 0) {
          setBuffered(bufferRanges.end(bufferRanges.length - 1));
        }
      };

      videoElement.addEventListener("timeupdate", onTimeUpdate);

      return () => {
        if (player) {
          player.dispose();
        }
        videoElement.removeEventListener("timeupdate", onTimeUpdate);
      };
    }
  }, [sourceUrl, autoplay, loop, muted, poster, preload]);

  const togglePlayPause = () => {
    if (playerRef.current) {
      if (isPlaying) {
        playerRef.current.pause();
      } else {
        playerRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const stopPlayback = () => {
    if (playerRef.current) {
      playerRef.current.pause();
      playerRef.current.currentTime(0);
      setIsPlaying(false);
      setCurrentTime(0);
    }
  };

  const toggleLoop = () => {
    const newLoopState = !isLooping;
    setIsLooping(newLoopState);
    if (playerRef.current) {
      playerRef.current.loop(newLoopState);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const seekTime = parseFloat(e.target.value);
    if (playerRef.current) {
      playerRef.current.currentTime(seekTime);
    }
    setCurrentTime(seekTime);
  };

  return (
    <div className="flex justify-center items-center max-h-screen">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden w-full max-w-3xl">
        <div className="flex">
          <div className="w-full p-10 bg-gray-100">
            {/* Album Poster */}
            <div className="flex justify-center items-center">
              <img
                src={poster}
                alt="Album Artwork"
                className="rounded-full w-96 h-96 shadow-xl dark:shadow-gray-800"
              />
            </div>
            {/* Video Player */}
            <div className="mb-4">
              <div
                className={`aspect-w-${aspectRatio.split(":")[0]} aspect-h-${
                  aspectRatio.split(":")[1]
                } rounded-lg overflow-hidden`}
              >
                <video
                  ref={videoRef}
                  className="video-js w-full h-full"
                  poster={poster}
                />
              </div>
            </div>

            {/* Track Details */}
            <div className="mb-4">
              <h3 className="text-2xl font-bold">{albumName}</h3>
              <p className="text-gray-600">{artist}</p>
              <p className="text-gray-500 text-sm">{description}</p>
            </div>

            {/* Seek Bar */}
            <div className="mb-4">
              <input
                type="range"
                min={0}
                max={duration}
                value={currentTime}
                onChange={handleSeek}
                className="w-full h-1 bg-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                step="0.1"
              />
              <div className="text-sm text-gray-700 mt-2 text-center">
                {formatTime(currentTime)} / {formatTime(duration)}
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-center space-x-4 mt-4">
              <button
                onClick={() => {
                  const newTime = Math.max(currentTime - 10, 0); // Seek 10 seconds backward
                  if (playerRef.current) {
                    playerRef.current.currentTime(newTime);
                  }
                  setCurrentTime(newTime);
                }}
                className="bg-yellow-500 text-white px-4 py-2 rounded-lg shadow hover:bg-yellow-600"
              >
                -10s
              </button>
              <button
                onClick={togglePlayPause}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600"
              >
                {isPlaying ? "Pause" : "Play"}
              </button>
              <button
                onClick={stopPlayback}
                className="bg-red-500 text-white px-4 py-2 rounded-lg shadow hover:bg-red-600"
              >
                Stop
              </button>
              <button
                onClick={toggleLoop}
                className={`px-4 py-2 rounded-lg shadow ${
                  isLooping
                    ? "bg-green-500 text-white hover:bg-green-600"
                    : "bg-gray-300 text-gray-700 hover:bg-gray-400"
                }`}
              >
                {isLooping ? "Loop On" : "Loop Off"}
              </button>
              <button
                onClick={() => {
                  const newTime = Math.min(currentTime + 10, duration); // Seek 10 seconds forward
                  if (playerRef.current) {
                    playerRef.current.currentTime(newTime);
                  }
                  setCurrentTime(newTime);
                }}
                className="bg-yellow-500 text-white px-4 py-2 rounded-lg shadow hover:bg-yellow-600"
              >
                +10s
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HlsPlayer;
