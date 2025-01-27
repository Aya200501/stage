// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { Utf8ArrayToStr, detectBrowser, makePic } from "@/utils";
// import React from "react";
// import { useRef, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import { env } from "@/lib/env";
// import { cn } from "@/lib/utils";
// import Loader from "@/pages/dashboard/components/loader";
// import { useGlobalContext } from "@/Context";
// import {
//   Breadcrumb,
//   BreadcrumbItem,
//   BreadcrumbLink,
//   BreadcrumbList,
//   BreadcrumbPage,
//   BreadcrumbSeparator,
// } from "@/components/ui/breadcrumb";
// import useSWR from "swr";
// import {
//   Select,
//   SelectContent,
//   SelectGroup,
//   SelectItem,
//   SelectLabel,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";

// const StreamPage = ({ analyses }: { analyses: any[] }) => {
//   const { cameraId } = useParams<{ cameraId: string }>();
//   const { cameraName, backendApi } = useGlobalContext();
//   const [selectAnalyse, setSelectAnalyse] = React.useState<any>();
//   // const navigate = useNavigate();
//   const [scale, setScale] = React.useState({
//     scaleX: 1,
//     scaleY: 1,
//   });

//   const { data: dataAnalyses, isLoading: loadingAnalyse } = useSWR(
//     `cameaAnalysedata${cameraId}${open}`,
//     async () => {
//       if (!open || !cameraId) return;
//       const res = await backendApi.FindById<{
//         // eslint-disable-next-line @typescript-eslint/no-explicit-any
//         cameraAnalyses: any[];
//       }>("camera", cameraId!, {
//         select: {
//           cameraAnalyses: {
//             select: {
//               config: true,
//               cameraId: true,
//               id: true,
//               name: true,
//               category: {
//                 select: {
//                   name: true,
//                   icon: true,
//                   id: true,
//                 },
//               },
//             },
//           },
//         },
//       });
//       return res;
//     }
//   );
//   const refVideo = useRef<HTMLVideoElement>(null);
//   const refCanvas = useRef<HTMLCanvasElement>(null);
//   const [loading, setLoading] = React.useState(true);
//   useEffect(() => {
//     if (!refVideo.current) return;
//     const mseQueue: any[] = [];
//     let mseSourceBuffer: SourceBuffer | null = null;
//     let mseStreamingStarted = false;
//     let mse: MediaSource | null = null;
//     let ws: WebSocket | null = null;

//     function WebSocketFnc(url: string) {
//       ws = new WebSocket(url);
//       ws.binaryType = "arraybuffer";
//       ws.onopen = function () {
//         console.log("Connected to ws");
//       };
//       ws.onmessage = function (event) {
//         console.log("||||   Received data   ||||");
//         if (!event.data || !mse || mse.readyState !== "open") return;
//         if (event.data instanceof Blob) {
//           const reader = new FileReader();
//           reader.onload = function () {
//             readPacket(new Uint8Array(reader.result as ArrayBuffer));
//           };
//           reader.readAsArrayBuffer(event.data);
//           return;
//         }
//         const data = new Uint8Array(event.data);
//         if (data[0] === 9) {
//           let mimeCodec;
//           const decodedArr = data.slice(1);
//           if (window.TextDecoder) {
//             mimeCodec = new TextDecoder("utf-8").decode(decodedArr);
//           } else {
//             mimeCodec = Utf8ArrayToStr(decodedArr);
//           }
//           try {
//             mseSourceBuffer = mse.addSourceBuffer(
//               'video/mp4; codecs="' + mimeCodec + '"'
//             );
//             mseSourceBuffer.mode = "segments";
//             mseSourceBuffer.addEventListener("updateend", pushPacket);
//           } catch (e) {
//             console.error("Error adding SourceBuffer: ", e);
//           }
//         } else {
//           readPacket(event.data);
//         }
//       };
//       ws.onerror = function (error) {
//         console.error("WebSocket Error: ", error);
//         ws?.close();
//         setLoading(true);
//         if (mse && mse.readyState === "open") {
//           setTimeout(() => {
//             WebSocketFnc(url);
//           }, 2000);
//         }
//       };
//       ws.onclose = function () {
//         setLoading(true);
//         if (mse && mse.readyState === "open") {
//           setTimeout(() => {
//             WebSocketFnc(url);
//           }, 2000);
//         }
//       };
//     }
//     function startPlay(videoEl: HTMLVideoElement, url: string) {
//       mse = new MediaSource();
//       videoEl.src = window.URL.createObjectURL(mse);
//       mse.addEventListener(
//         "sourceopen",
//         function () {
//           WebSocketFnc(url);
//         },
//         false
//       );
//     }

//     function pushPacket() {
//       if (!mseSourceBuffer) return;
//       if (!mseSourceBuffer.updating) {
//         if (mseQueue.length > 0) {
//           const packet = mseQueue.shift();
//           try {
//             mseSourceBuffer.appendBuffer(packet);
//           } catch (e) {
//             console.error("Error appending buffer: ", e);
//           }
//         } else {
//           mseStreamingStarted = false;
//         }
//       }
//       const videoEl = refVideo.current;
//       if (videoEl && videoEl.buffered.length > 0) {
//         if (typeof document.hidden !== "undefined" && document.hidden) {
//           videoEl.currentTime =
//             videoEl.buffered.end(videoEl.buffered.length - 1) - 0.5;
//         }
//       }
//     }

//     function readPacket(packet: any) {
//       if (!mseSourceBuffer) return;
//       const videoEl = refVideo.current;
//       if (videoEl && videoEl.error) {
//         console.error("Video Element Error: ", videoEl.error);
//         return;
//       }
//       try {
//         if (!mseStreamingStarted) {
//           mseSourceBuffer.appendBuffer(packet);
//           mseStreamingStarted = true;
//           return;
//         }
//         mseQueue.push(packet);
//         if (!mseSourceBuffer.updating) {
//           pushPacket();
//         }
//       } catch (e) {
//         console.error("Error appending initial buffer: ", e);
//       }
//     }

//     refVideo.current.addEventListener("loadeddata", () => {
//       setLoading(false);
//       if (detectBrowser() !== "Safari" && refVideo.current && cameraId) {
//         makePic(
//           refVideo?.current,
//           cameraId,
//           refVideo.current?.width,
//           refVideo.current?.height
//         );
//       }
//     });

//     refVideo.current.addEventListener("loadedmetadata", () => {
//       const videoEl = refVideo.current;
//       if (!videoEl) return;
//       videoEl.width = videoEl.videoWidth;
//       videoEl.height = videoEl.videoHeight;

//       const canvasRef = refCanvas.current;
//       if (!canvasRef) return;
//       canvasRef.width = videoEl.videoWidth;
//       canvasRef.height = videoEl.videoHeight;
//       const originalWidth = (selectAnalyse || analyses[0])?.config.width;
//       const originalHeight = (selectAnalyse || analyses[0])?.config.height;
//       const scaleX = videoEl.width / originalWidth || 1;
//       const scaleY = videoEl.height / originalHeight || 1;
//       setScale({ scaleX, scaleY });
//     });

//     refVideo.current.addEventListener("pause", () => {
//       const videoEl = refVideo.current;
//       if (!videoEl) return;
//       if (
//         videoEl.currentTime > videoEl.buffered.end(videoEl.buffered.length - 1)
//       ) {
//         videoEl.currentTime =
//           videoEl.buffered.end(videoEl.buffered.length - 1) - 0.1;
//         videoEl.play();
//       }
//     });

//     startPlay(
//       refVideo.current,
//       `${env.VITE_VIDEO_WS_URL}/${cameraId}/channel/0/mse?uuid=${cameraId}&channel=0`
//     );

//     return () => {
//       if (ws) {
//         ws.close();
//       }
//       if (mse && mse.readyState === "open") {
//         mse.endOfStream();
//       }
//       mse?.removeEventListener("sourceopen", () => {});
//     };
//   }, [cameraId]);

//   useEffect(() => {
//     if (loading || !refCanvas.current || !refVideo.current || !selectAnalyse)
//       return;
//     const videoEl = refVideo.current;
//     if (!videoEl) return;
//     videoEl.width = videoEl.videoWidth;
//     videoEl.height = videoEl.videoHeight;

//     const canvasRef = refCanvas.current;
//     if (!canvasRef) return;
//     canvasRef.width = videoEl.videoWidth;
//     canvasRef.height = videoEl.videoHeight;
//     const originalWidth = (selectAnalyse || analyses[0])?.config.width;
//     const originalHeight = (selectAnalyse || analyses[0])?.config.height;
//     const scaleX = videoEl.width / originalWidth || 1;
//     const scaleY = videoEl.height / originalHeight || 1;
//     const canvas = refCanvas.current;
//     const context = canvas.getContext("2d");
//     setScale({ scaleX, scaleY });
//     if (!context) return;

//     context.clearRect(0, 0, canvas.width, canvas.height);

//     // selectAnalyse.forEach((analysis) => {
//     if (selectAnalyse?.config?.polygons || analyses[0]?.config?.lines) {
//       Object.values(
//         (selectAnalyse || analyses[0])?.config?.polygons || {}
//       ).forEach((polygon: any) => {
//         context.beginPath();
//         polygon.forEach(([x, y]: [number, number], index: number) => {
//           const scaledX = Math.floor(x * scale.scaleX) * 1;
//           const scaledY = Math.floor(y * scale.scaleY) * 1;
//           if (index === 0) {
//             context.moveTo(scaledX, scaledY);
//           } else {
//             context.lineTo(scaledX, scaledY);
//           }
//         });
//         context.closePath();
//         context.strokeStyle = "red";
//         context.lineWidth = 4;
//         context.stroke();
//       });
//     }

//     if (selectAnalyse?.config?.lines || analyses[0]?.config?.lines) {
//       Object.values(
//         (selectAnalyse || analyses[0])?.config?.lines || {}
//       ).forEach((line: any) => {
//         const [x1, y1] = line[0];
//         const [x2, y2] = line[1];
//         const scaledX1 = Math.floor(x1 * scale.scaleX) * 1;
//         const scaledY1 = Math.floor(y1 * scale.scaleY) * 1;
//         const scaledX2 = Math.floor(x2 * scale.scaleX) * 1;
//         const scaledY2 = Math.floor(y2 * scale.scaleY) * 1;
//         context.beginPath();
//         context.moveTo(scaledX1, scaledY1);
//         context.lineTo(scaledX2, scaledY2);
//         context.strokeStyle = "red";
//         context.lineWidth = 4;
//         context.stroke();
//       });
//     }
//   }, [selectAnalyse, refVideo.current, refCanvas.current]);

//   useEffect(() => {
//     if (loading || !refVideo.current || !refCanvas.current) return;
//     const canvas = refCanvas.current;
//     // get video aspect ratio
//     const aspectRatio =
//       refVideo.current.videoWidth / refVideo.current.videoHeight;
//     // set canvas aspect ratio
//     canvas.style.aspectRatio = `${aspectRatio}`;
//   }, [loading]);

//   return (
//     <main className="flex h-full  relative w-full flex-col gap-3 max-md:px-4 max-md:pb-4 md:gap-4 overflow-hidden">
//       <div className="z-20 flex w-full items-center justify-between max-md:bg-background/80 capitalize max-md:sticky max-md:top-0 max-md:py-5">
//         <Breadcrumb className="h-[3rem] flex items-center">
//           <BreadcrumbList>
//             <BreadcrumbItem>
//               <BreadcrumbLink href="/cameras">Cameras</BreadcrumbLink>
//             </BreadcrumbItem>
//             <BreadcrumbSeparator />
//             <BreadcrumbItem className="flex gap-5">
//               <BreadcrumbPage>{cameraName}</BreadcrumbPage>
//               <div className="px-2 w-[15rem]">
//                 <Select
//                   onValueChange={(value) => {
//                     setSelectAnalyse(
//                       analyses?.find((analyse) => analyse.id === value)
//                     );
//                   }}
//                 >
//                   <SelectTrigger
//                     className={cn(`w-full`, {
//                       disabled:
//                         loading ||
//                         !refVideo.current ||
//                         !refCanvas.current ||
//                         loadingAnalyse,
//                     })}
//                   >
//                     <SelectValue placeholder="Select analyses" />
//                   </SelectTrigger>
//                   <SelectContent className="w-full">
//                     <SelectGroup>
//                       <SelectLabel>select Analyse</SelectLabel>
//                       {dataAnalyses?.cameraAnalyses.map((analyse: any) => (
//                         <SelectItem key={analyse.id} value={analyse.id}>
//                           {analyse?.name}
//                         </SelectItem>
//                       ))}
//                     </SelectGroup>
//                   </SelectContent>
//                 </Select>
//               </div>
//             </BreadcrumbItem>
//           </BreadcrumbList>
//         </Breadcrumb>
//       </div>

//       {(loading || loadingAnalyse) && (
//         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
//           <Loader className="text-xl" />
//         </div>
//       )}
//       <main className="flex-1  grid place-content-center relative">
//         <div className="absolute"></div>
//         <video
//           ref={refVideo}
//           autoPlay
//           className="object-contain overflow-hidden max-h-full max-w-full relative"
//           style={{
//             rotate: (analyses[0]?.config?.rotation || 0) + "deg",
//           }}
//         ></video>

//         <canvas
//           ref={refCanvas}
//           id="canvas_stream"
//           className={cn(
//             "max-w-full max-h-full absolute aspect-video top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
//             {
//               hidden:
//                 loading ||
//                 !refVideo.current ||
//                 !refCanvas.current ||
//                 loadingAnalyse,
//             }
//           )}
//         />
//       </main>
//       <canvas
//         id="canvas_screen"
//         className="hidden"
//         style={{ display: "none" }}
//       />
//     </main>
//   );
// };

// export default StreamPage;

/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { useRef, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { cn } from "@/lib/utils";
import Loader from "@/pages/dashboard/components/loader";
import { useGlobalContext } from "@/Context";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import useSWR from "swr";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import Hls from "hls.js";
import { makePic } from "@/utils";
import { env } from "@/lib/env";
import { ScreenShareIcon } from "lucide-react";
import { AlertScreenshot } from "@/pages/alerts/components/alert-details/components/screenshot";

const StreamPage = ({ analyses }: { analyses: any[] }) => {
  const { cameraId } = useParams<{ cameraId: string }>();
  const { cameraName, backendApi } = useGlobalContext();
  const [selectAnalyse, setSelectAnalyse] = useState<any>();
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [loading, setLoading] = useState(true);
  const refVideo = useRef<HTMLVideoElement>(null);
  const refCanvas = useRef<HTMLCanvasElement>(null);
  const [scale, setScale] = useState({
    scaleX: 1,
    scaleY: 1,
  });

  const { data: dataAnalyses, isLoading: loadingAnalyse } = useSWR(
    `cameaAnalysedata${cameraId}`,
    async () => {
      if (!cameraId) return;
      const res = await backendApi.FindById<{
        config: {
          rtspLink: string;
        };
        cameraAnalyses: any[];
      }>("camera", cameraId, {
        select: {
          config: true,
          cameraAnalyses: {
            select: {
              cameraId: true,
              id: true,
              name: true,
              category: {
                select: {
                  name: true,
                  icon: true,
                  id: true,
                },
              },
            },
          },
        },
      });
      return res;
    }
  );

  useEffect(() => {
    if (loading || !refVideo.current || !refCanvas.current) return;
    const canvas = refCanvas.current;
    //     // get video aspect ratio
    const aspectRatio =
      refVideo.current.videoWidth / refVideo.current.videoHeight;
    //     // set canvas aspect ratio
    canvas.style.aspectRatio = `${aspectRatio}`;
  }, [loading]);

  useEffect(() => {
    if (!refVideo.current || !cameraId) return;

    const video = refVideo.current;
    const hlsUrl = `${dataAnalyses?.config.rtspLink}/index.m3u8`;

    // Use HLS.js for browsers that don't support HLS natively
    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(hlsUrl);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        console.log("HLS Manifest Parsed");

        setLoading(false);
        video.play();
        if (isFirstLoad) {
          setTimeout(() => {
            console.log("Video loaded ||||| makePic", {
              video,
              cameraId,
              videoWidth: video.videoWidth,
              videoHeight: video.videoHeight,
            });
            setIsFirstLoad(false);
            makePic(video, cameraId, video.videoWidth, video.videoHeight);
          }, 1000);
        }
      });
      hls.on(Hls.Events.ERROR, (event, data) => {
        console.error("HLS Error: ", data);
      });

      return () => {
        hls.destroy();
      };
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      // Native HLS support (e.g., Safari)
      video.src = hlsUrl;
      video.addEventListener("loadeddata", () => {
        console.log("Video loaded");

        setLoading(false);
        video.play();
      });

      return () => {
        video.src = "";
      };
    }
  }, [cameraId]);
  useEffect(() => {
    if (loading || !refCanvas.current || !refVideo.current || !selectAnalyse)
      return;
    const videoEl = refVideo.current;
    if (!videoEl) return;
    videoEl.width = videoEl.videoWidth;
    videoEl.height = videoEl.videoHeight;

    const canvasRef = refCanvas.current;
    if (!canvasRef) return;
    canvasRef.width = videoEl.videoWidth;
    canvasRef.height = videoEl.videoHeight;
    const originalWidth = (selectAnalyse || analyses[0])?.config.width;
    const originalHeight = (selectAnalyse || analyses[0])?.config.height;
    const scaleX = videoEl.width / originalWidth || 1;
    const scaleY = videoEl.height / originalHeight || 1;
    const canvas = refCanvas.current;
    const context = canvas.getContext("2d");
    setScale({ scaleX, scaleY });
    if (!context) return;

    context.clearRect(0, 0, canvas.width, canvas.height);

    // selectAnalyse.forEach((analysis) => {
    if (selectAnalyse?.config?.polygons || analyses[0]?.config?.lines) {
      Object.values(
        (selectAnalyse || analyses[0])?.config?.polygons || {}
      ).forEach((polygon: any) => {
        context.beginPath();
        polygon.forEach(([x, y]: [number, number], index: number) => {
          const scaledX = Math.floor(x * scale.scaleX) * 1;
          const scaledY = Math.floor(y * scale.scaleY) * 1;
          if (index === 0) {
            context.moveTo(scaledX, scaledY);
          } else {
            context.lineTo(scaledX, scaledY);
          }
        });
        context.closePath();
        context.strokeStyle = "red";
        context.lineWidth = 4;
        context.stroke();
      });
    }

    if (selectAnalyse?.config?.lines || analyses[0]?.config?.lines) {
      Object.values(
        (selectAnalyse || analyses[0])?.config?.lines || {}
      ).forEach((line: any) => {
        const [x1, y1] = line[0];
        const [x2, y2] = line[1];
        const scaledX1 = Math.floor(x1 * scale.scaleX) * 1;
        const scaledY1 = Math.floor(y1 * scale.scaleY) * 1;
        const scaledX2 = Math.floor(x2 * scale.scaleX) * 1;
        const scaledY2 = Math.floor(y2 * scale.scaleY) * 1;
        context.beginPath();
        context.moveTo(scaledX1, scaledY1);
        context.lineTo(scaledX2, scaledY2);
        context.strokeStyle = "red";
        context.lineWidth = 4;
        context.stroke();
      });
    }
  }, [selectAnalyse, refVideo.current, refCanvas.current]);

  useEffect(() => {
    if (loading || !refVideo.current || !refCanvas.current) return;
    const canvas = refCanvas.current;
    // get video aspect ratio
    const aspectRatio =
      refVideo.current.videoWidth / refVideo.current.videoHeight;
    // set canvas aspect ratio
    canvas.style.aspectRatio = `${aspectRatio}`;
  }, [loading]);
  useEffect(() => {
    if (loading || !refCanvas.current || !refVideo.current || !selectAnalyse)
      return;

    const videoEl = refVideo.current;
    const canvasRef = refCanvas.current;
    const context = canvasRef.getContext("2d");

    const originalWidth = (selectAnalyse || analyses[0])?.config.width;
    const originalHeight = (selectAnalyse || analyses[0])?.config.height;

    const scaleX = videoEl.videoWidth / originalWidth || 1;
    const scaleY = videoEl.videoHeight / originalHeight || 1;

    setScale({ scaleX, scaleY });

    if (!context) return;
    context.clearRect(0, 0, canvasRef.width, canvasRef.height);

    if (selectAnalyse?.config?.polygons) {
      Object.values(selectAnalyse.config.polygons).forEach((polygon: any) => {
        context.beginPath();
        polygon.forEach(([x, y]: [number, number], index: number) => {
          const scaledX = x * scaleX;
          const scaledY = y * scaleY;
          if (index === 0) context.moveTo(scaledX, scaledY);
          else context.lineTo(scaledX, scaledY);
        });
        context.closePath();
        context.strokeStyle = "red";
        context.lineWidth = 4;
        context.stroke();
      });
    }
  }, [selectAnalyse, refVideo.current, refCanvas.current]);

  return (
    <main className="flex h-full relative w-full flex-col gap-3 max-md:px-4 max-md:pb-4 md:gap-4 overflow-hidden">
      <div className="z-20 flex w-full items-center justify-between max-md:bg-background/80 capitalize max-md:sticky max-md:top-0 max-md:py-5">
        <Breadcrumb className="h-[3rem] flex items-center">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/cameras">Cameras</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem className="flex gap-5">
              <BreadcrumbPage>{cameraName}</BreadcrumbPage>
              <div className="px-2 w-[15rem]">
                <Select
                  onValueChange={(value) => {
                    setSelectAnalyse(
                      analyses?.find((analyse) => analyse.id === value)
                    );
                  }}
                >
                  <SelectTrigger
                    className={cn(`w-full`, { disabled: loadingAnalyse })}
                  >
                    <SelectValue placeholder="Select analyses" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>select Analyse</SelectLabel>
                      {dataAnalyses?.cameraAnalyses.map((analyse: any) => (
                        <SelectItem key={analyse.id} value={analyse.id}>
                          {analyse?.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      {loading && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <Loader className="text-xl" />
        </div>
      )}
      <main className="flex-1  grid place-content-center relative">
        <div className="absolute"></div>
        <video
          ref={refVideo}
          autoPlay
          className="object-contain overflow-hidden max-h-full max-w-full relative"
          style={{
            rotate: (analyses[0]?.config?.rotation || 0) + "deg",
          }}
        ></video>

        <canvas
          ref={refCanvas}
          id="canvas_stream"
          className={cn(
            "max-w-full max-h-full absolute aspect-video top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
            {
              hidden:
                loading ||
                !refVideo.current ||
                !refCanvas.current ||
                loadingAnalyse,
            }
          )}
        />
      </main>
      <canvas
        id="canvas_screen"
        className="hidden"
        style={{ display: "none" }}
      />
      {/* <main className="flex-1 grid place-content-center relative">
        <video
          ref={refVideo}
          autoPlay
          controls
          className="object-contain overflow-hidden max-h-full max-w-full relative"
        ></video>
        <canvas
          ref={refCanvas}
          id="canvas_stream"
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        />
      </main> */}
    </main>
  );
};

export default StreamPage;
