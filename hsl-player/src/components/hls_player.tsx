import React, { useEffect, useRef, useState } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";
import Hls from "hls.js";
import HlsPlayerProps from "../props/player_Props";
import { useLocation, useNavigate } from "react-router-dom";
import AlbumDetails from "./hls_AlbumDetail.tsx";
import BottomBar from "./hls_BottomPlayer.tsx";

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

  //Handeling edge case
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

  //If no props
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

  useEffect(() => {
    const videoElement = videoRef.current;

    if (videoElement) {
      const player = videojs(videoElement, {
        controls: false,
        responsive: true,
        fluid: true,
        autoplay: true,
        loop,
        muted,
        poster,
        preload,
      });
      //initeate player
      playerRef.current = player;

      //Check HLS support
      if (Hls.isSupported()) {
        const hls = new Hls();
        hls.loadSource(sourceUrl);
        hls.attachMedia(videoElement);

        //Set total duration
        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          const duration = hls.media?.duration || 0;
          setDuration(duration);
        });

        // Check the types of media
        hls.on(Hls.Events.MANIFEST_PARSED, (_, data) => {
          const isAudio = data.levels.every(
            (level) => !level.videoCodec || level.videoCodec === null
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

        //Error handling
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

      //Initate buffring and playing
      player.ready(() => {
        console.log("Player is ready");
        if (autoplay && !isPlaying) {
          player.play();
          setIsPlaying(true);
        }
      });

      //Handle buffer
      const onTimeUpdate = () => {
        setCurrentTime(videoElement.currentTime);
        const bufferRanges = videoElement.buffered;
        if (bufferRanges.length > 0) {
          setBuffered(bufferRanges.end(bufferRanges.length - 1));
          console.log(bufferRanges.end(bufferRanges.length - 1));
        }
      };

      //Listen for time updates
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
        //Close listner
        videoElement.removeEventListener("timeupdate", onTimeUpdate);
      };
    }
  }, [sourceUrl, autoplay, loop, muted, poster, preload]);

  //Handle Play Pause
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

  //Stop playing
  const stopPlayback = () => {
    if (playerRef.current) {
      playerRef.current.pause();
      playerRef.current.currentTime(0);
      setIsPlaying(false);
      setCurrentTime(0);
    }
  };

  //Set music in loop
  const toggleLoop = () => {
    const newLoopState = !isLooping;
    setIsLooping(newLoopState);
    if (playerRef.current) {
      playerRef.current.loop(newLoopState);
    }
  };

  //Seek handeling
  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const seekTime = parseFloat(e.target.value);
    if (playerRef.current) {
      playerRef.current.currentTime(seekTime);
    }
    setCurrentTime(seekTime);
  };

  return (
    <div className="flex flex-col items-center px-4 md:flex-row md:justify-center  max-w-full overflow-hidden">
      {/* Album Detail panel */}
      <AlbumDetails
        poster={poster}
        name={name}
        artist={artist}
        albumName={albumName}
        description={description}
        videoRef={videoRef}
      />

      <BottomBar
        name={name}
        artist={artist}
        currentTime={currentTime}
        duration={duration}
        isPlaying={isPlaying}
        isLooping={isLooping}
        togglePlayPause={togglePlayPause}
        stopPlayback={stopPlayback}
        toggleLoop={toggleLoop}
        handleSeek={handleSeek}
        buffered={buffered}
        navigate={navigate}
        playerRef={playerRef}
        setCurrentTime={setCurrentTime}
      />
    </div>
  );
};

export default HlsPlayer;
