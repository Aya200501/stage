import { VideoWidgetData, Widget } from "@/utils";
import Hls from "hls.js";
import { ElementRef, useEffect, useRef } from "react";

export default function StaticOption({ attributes, title }: Widget) {
  const { type = "mp4", url } = attributes as VideoWidgetData;
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !url || !type) return;

    if (type === "m3u8" && Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(url);
      hls.attachMedia(video);
    } else if (type === "mp4" && video.canPlayType("video/mp4")) {
      video.src = url;
    }

    return () => {
      if (type === "m3u8") {
        video.src = "";
        video.load();
      }
    };
  }, [type, url]);
  const videoRef = useRef<ElementRef<"video">>(null);
  return (
    <main className="!p-0 relative group">
      <div className="opacity-0 group-hover:opacity-100 p-4 bg-gradient-to-b from-background to-transparent  transition-opacity pointer-events-none absolute top-0 justify-between inset-x-0 flex items-center gap-2">
        <span className="capitalize font-semibold">{title} </span>
        <span>Online stream</span>
      </div>
      <video autoPlay loop ref={videoRef} className="w-full h-full" />
    </main>
  );
}
