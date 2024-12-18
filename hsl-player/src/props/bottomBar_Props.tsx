export default interface BottomBarProps {
  name: string;
  artist: string;
  currentTime: number;
  duration: number;
  isPlaying: boolean;
  isLooping: boolean;
  togglePlayPause: () => void;
  stopPlayback: () => void;
  toggleLoop: () => void;
  handleSeek: (e: React.ChangeEvent<HTMLInputElement>) => void;
  buffered: number;
  navigate: (path: string, options: { replace: boolean; state: any }) => void;
  playerRef: any;
  setCurrentTime: any;
}
