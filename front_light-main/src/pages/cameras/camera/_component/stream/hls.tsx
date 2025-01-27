import React, { useRef, useEffect } from "react";
import Hls from "hls.js";

const HlsPlayer = ({
  src,
  autoPlay = false,
  controls = true,
}: {
  src: string;
  autoPlay?: boolean;
  controls?: boolean;
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const video: HTMLVideoElement | null | undefined = videoRef.current;

    if (video && Hls.isSupported()) {
      const hls = new Hls({
        debug: true,
      });

      hls.loadSource(src); // Load the HLS source
      hls.attachMedia(video); // Attach the HLS stream to the video element

      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        if (autoPlay) {
          video
            .play()
            .catch((err) => console.error("Video playback error:", err));
        }
      });

      hls.on(Hls.Events.ERROR, (event, data) => {
        console.error(`HLS.js error: ${data.type}`, data);
      });

      return () => {
        hls.destroy(); // Cleanup HLS instance when the component is unmounted
      };
    } else if (video && video.canPlayType("application/vnd.apple.mpegurl")) {
      // For Safari where HLS is natively supported
      video.src = src;
      if (autoPlay) {
        video
          .play()
          .catch((err) => console.error("Video playback error:", err));
      }
    }
  }, [src, autoPlay]);

  return <video ref={videoRef} controls={controls} style={{ width: "100%" }} />;
};

export default HlsPlayer;
