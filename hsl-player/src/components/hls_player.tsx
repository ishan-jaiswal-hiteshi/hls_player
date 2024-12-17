import React, { useEffect, useRef, useState } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";
import Hls from "hls.js";
import { IoStatsChart } from "react-icons/io5";
import { CiPlay1, CiPause1, CiStop1 } from "react-icons/ci";
import { TbPlayerTrackPrev, TbPlayerTrackNext } from "react-icons/tb";
import { RxLoop, RxCrossCircled } from "react-icons/rx";
import HlsPlayerProps from "../props/player_Props";
import { useLocation, useNavigate } from "react-router-dom";

const HlsPlayer: React.FC<HlsPlayerProps> = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const playerRef = useRef<any>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [buffered, setBuffered] = useState(0);
  const [isLooping, setIsLooping] = useState(false);
  const { state } = useLocation();
  const hlsPlayerProps = state as HlsPlayerProps;
  const navigate = useNavigate();
  const [isAudio, setIsAudio] = useState(false);

  const {
    sourceUrl = "",
    autoplay = false,
    loop = false,
    muted = false,
    poster = "",
    preload = "auto",
    name = "Unknown Song",
    artist = "Unknown Artist",
    albumName = "Unknown Album",
    description = "No Description Provided",
  } = hlsPlayerProps || {};

  //Check for props data
  if (!hlsPlayerProps && isAudio) {
    return (
      <div className="flex justify-center items-center h-screen gap-2">
        <p className="text-red-500">
          No or invalid player data provided. Please return to the form.
        </p>
        <button onClick={() => navigate("/")}>Go to Form</button>
      </div>
    );
  }

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

        hls.on(Hls.Events.MANIFEST_PARSED, (_, data) => {
          // Check the types of media available
          const isAudio = data.levels.every(
            (level) => !level.videoCodec || level.audioCodec === null
          );
          console.log("Is supported media", isAudio);
          setIsAudio(isAudio);
        });

        hls.on(Hls.Events.LEVEL_LOADED, (_, data) => {
          console.log("Level Loaded:", data);
        });

        hls.on(Hls.Events.LEVEL_LOADED, (_, data) => {
          const duration = data.details.totalduration || 0;
          setDuration(duration);
        });

        hls.on(Hls.Events.ERROR, (event, data) => {
          if (data.fatal) {
            switch (data.type) {
              case Hls.ErrorTypes.NETWORK_ERROR:
                console.error(
                  "Fatal network error. Check the source URL or network."
                );
                break;
              case Hls.ErrorTypes.MEDIA_ERROR:
                console.error("Fatal media error. Attempting recovery.");
                hls.recoverMediaError();
                break;
              default:
                hls.destroy();
                console.error("Unrecoverable error occurred.");
                break;
            }
          }
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
        //Clear blob url
        if (sourceUrl.startsWith("blob:")) {
          URL.revokeObjectURL(sourceUrl);
        }
        //Clear player
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
    <div className="flex flex-col items-center px-4 md:flex-row md:justify-center  max-w-full overflow-hidden">
      <div className="shadow-lg rounded-lg overflow-hidden max-w-3xl w-full flex flex-col p-4 md:p-10 gap-6 bg-white">
        {/* Album Poster */}
        <div className="flex justify-center w-full">
          <img
            src={poster}
            alt={`Album poster for ${name}`}
            className="rounded-full w-40 h-40 md:w-96 md:h-96 object-cover shadow-xl "
          />
        </div>

        {/* Audio Player and Details */}
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

          {/* Track Details */}
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

      {/* Bottom Bar */}
      <div className="fixed bottom-0 left-0 w-full bg-black text-white">
        {/* Seek Bar */}
        <div className="relative w-full">
          <input
            type="range"
            min={0}
            max={duration}
            value={currentTime}
            onChange={handleSeek}
            step="0.1"
            className="absolute top-0 left-0 w-full h-2 bg-gray-700 cursor-pointer"
            aria-label="Seek through the track"
          />
        </div>

        {/* Controls and Info */}
        <div className="p-3 flex items-center justify-between">
          {/* Song Name */}
          <div className="flex items-center gap-2 sm:gap-4 truncate">
            <IoStatsChart size={16} className="text-white sm:text-orange-500" />
            <p className="text-xs sm:text-sm lg:text-base font-medium truncate">
              {`${name} - ${artist}`}
            </p>
          </div>

          {/* Timer */}
          <div className="text-sm">
            {formatTime(currentTime)} / {formatTime(duration)}
          </div>

          {/* Controls */}
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
    </div>
  );
};

export default HlsPlayer;
