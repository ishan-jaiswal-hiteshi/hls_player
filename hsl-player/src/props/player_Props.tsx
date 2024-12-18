//HLS props
export default interface HlsPlayerProps {
  sourceUrl?: string;
  autoplay?: boolean;
  loop?: boolean;
  muted?: boolean;
  poster?: string;
  preload?: "auto" | "metadata" | "none";
  aspectRatio?: string;
  name?: string;
  artist?: string;
  albumName?: string;
  description?: string;
}
