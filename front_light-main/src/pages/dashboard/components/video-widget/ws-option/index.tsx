/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card } from "@/components/ui/card";
import { useEffect, useId, useState } from "react";
import { socket } from "@/lib/socket";
import { Button } from "@/components/ui/button";
import { LoaderCircle, Maximize } from "lucide-react";
import { VideoWidgetData, Widget } from "@/utils";

export default function WsOption({ attributes }: Widget) {
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [img, setImg] = useState<string>("");
  const id = useId();

  const { cameraId } = attributes as VideoWidgetData;

  useEffect(() => {
    if (!cameraId) return;
    if (socket.connected) {
      onConnect();
    }

    function onConnect() {
      console.log("connection success");
      setIsConnected(true);

      socket.on(cameraId!, (data: any) => {
        setImg(Buffer.from(data, "base64").toString());
      });
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);

    function onDisconnect() {
      setIsConnected(false);
    }
    return () => {
      socket.off("connect", onConnect);
      socket.off(cameraId);
      socket.off("disconnect", onDisconnect);
    };
  }, [cameraId]);

  if (!isConnected) {
    return (
      <Card className="grid h-[22.5rem] place-content-center p-4">
        <span className="animate-spin duration-1000 text-gray-500">
          <LoaderCircle size={64} />
        </span>
      </Card>
    );
  }

  return (
    <>
      <Button
        variant="ghost"
        className="absolute top-1 right-1 bg-black/50 hover:bg-black"
        size="icon"
        onClick={() => {
          const screen = document.getElementById(id);
          if (!isFullScreen && screen) {
            screen.requestFullscreen();
            setIsFullScreen(true);
          } else if (isFullScreen && screen) {
            document.exitFullscreen();
            setIsFullScreen(false);
          }
        }}
      >
        <Maximize />
      </Button>
      {!img ? (
        <div className="w-full h-full grid place-content-center">
          <span>No Stream yet</span>
        </div>
      ) : (
        <img
          id={id}
          src={`data:image/jpeg;base64,${img}`}
          alt="flux"
          className="object-contain w-full h-full"
        />
      )}
    </>
  );
}
