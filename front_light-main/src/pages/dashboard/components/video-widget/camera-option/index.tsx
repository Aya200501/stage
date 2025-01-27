/* eslint-disable @typescript-eslint/no-explicit-any */
import { useGlobalContext } from "@/Context";
import { env } from "@/lib/env";
import {
  Utf8ArrayToStr,
  VideoWidgetData,
  Widget,
  detectBrowser,
  makePic,
} from "@/utils";
import { useEffect, useRef } from "react";
import useSWR from "swr";

// export default function CameraOption({ attributes }: Widget) {
//     const { t } = useTranslation();
//   const { cameraId } = attributes as VideoWidgetData;
//   const { backendApi, groupId } = useGlobalContext();
//   const refVideo = useRef<HTMLVideoElement>(null);
//   const [loading, setLoading] = useState(true);
//   const { data, isLoading, error } = useSWR(
//     `${groupId}/dashboard/video/${cameraId}`,
//     async () => {
//       if (!cameraId) return;
//       const res = await backendApi.FindById<CameraType>("camera", cameraId);
//       return res;
//     }
//   );

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
//         setLoading(true);
//         ws?.close();
//         setTimeout(() => {
//           WebSocketFnc(url);
//         }, 2000);
//       };
//       ws.onclose = function () {
//         setLoading(true);
//         setTimeout(() => {
//           WebSocketFnc(url);
//         }, 2000);
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

//   // if (isLoading || loading) {
//   //   return (

//   //   );
//   // }
//   if (error) {
//     return (
//       <main className="grid place-content-center text-3xl">
//        {t("somethingError")}
//       </main>
//     );
//   }
//   if (!data) {
//     return (
//       <main className="grid place-content-center text-3xl">
//         The camera was not found
//       </main>
//     );
//   }

//   return (
//     <main className=" relative !p-0 group">
//       <div className="opacity-0 group-hover:opacity-100 p-4 bg-gradient-to-b from-background to-transparent  transition-opacity pointer-events-none absolute top-0 justify-between inset-x-0 flex items-center gap-2">
//         <span className="capitalize font-semibold">{data.name} </span>
//         <span>Online stream</span>
//       </div>
//       <video
//         ref={refVideo}
//         autoPlay
//         className="h-full w-full object-contain rounded"
//       ></video>
//       {(loading || isLoading) && (
//         <main className="absolute inset-0 grid place-content-center text-3xl animate-pulse">
//           {t("loading")}
//         </main>
//       )}
//     </main>
//   );
// }

/* eslint-disable @typescript-eslint/no-explicit-any */

import React from "react";
import Loader from "@/pages/dashboard/components/loader";

const CameraOption = ({ attributes }: Widget) => {
  // const { cameraId } = useParams<{ cameraId: string }>();
  // const { cameraName, backendApi } = useGlobalContext();
  // const [selectAnalyse, setSelectAnalyse] = React.useState<any>();
  // // const navigate = useNavigate();
  // const [scale, setScale] = React.useState({
  //   scaleX: 1,
  //   scaleY: 1,
  // });

  const { cameraId } = attributes as VideoWidgetData;
  const { backendApi, groupId } = useGlobalContext();

  const { data, isLoading: loadingAnalyse } = useSWR(
    `${groupId}/dashboard/video/${cameraId}`,
    async () => {
      if (!open || !cameraId) return;
      const res = await backendApi.FindById<{
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        cameraAnalyses: any[];
      }>("camera", cameraId!, {
        select: {
          cameraAnalyses: {
            select: {
              config: true,
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

  const refVideo = useRef<HTMLVideoElement>(null);
  const refCanvas = useRef<HTMLCanvasElement>(null);
  const [loading, setLoading] = React.useState(true);
  useEffect(() => {
    if (!refVideo.current) return;
    const mseQueue: any[] = [];
    let mseSourceBuffer: SourceBuffer | null = null;
    let mseStreamingStarted = false;
    let mse: MediaSource | null = null;
    let ws: WebSocket | null = null;

    function WebSocketFnc(url: string) {
      ws = new WebSocket(url);
      ws.binaryType = "arraybuffer";
      ws.onopen = function () {
        console.log("Connected to ws");
      };
      ws.onmessage = function (event) {
        console.log("||||   Received data   ||||");
        if (!event.data || !mse || mse.readyState !== "open") return;
        if (event.data instanceof Blob) {
          const reader = new FileReader();
          reader.onload = function () {
            readPacket(new Uint8Array(reader.result as ArrayBuffer));
          };
          reader.readAsArrayBuffer(event.data);
          return;
        }
        const data = new Uint8Array(event.data);
        if (data[0] === 9) {
          let mimeCodec;
          const decodedArr = data.slice(1);
          if (window.TextDecoder) {
            mimeCodec = new TextDecoder("utf-8").decode(decodedArr);
          } else {
            mimeCodec = Utf8ArrayToStr(decodedArr);
          }
          try {
            mseSourceBuffer = mse.addSourceBuffer(
              'video/mp4; codecs="' + mimeCodec + '"'
            );
            mseSourceBuffer.mode = "segments";
            mseSourceBuffer.addEventListener("updateend", pushPacket);
          } catch (e) {
            console.error("Error adding SourceBuffer: ", e);
          }
        } else {
          readPacket(event.data);
        }
      };
      ws.onerror = function (error) {
        console.error("WebSocket Error: ", error);
        ws?.close();
        setLoading(true);
        if (mse && mse.readyState === "open") {
          setTimeout(() => {
            WebSocketFnc(url);
          }, 2000);
        }
      };
      ws.onclose = function () {
        setLoading(true);
        if (mse && mse.readyState === "open") {
          setTimeout(() => {
            WebSocketFnc(url);
          }, 2000);
        }
      };
    }
    function startPlay(videoEl: HTMLVideoElement, url: string) {
      mse = new MediaSource();
      videoEl.src = window.URL.createObjectURL(mse);
      mse.addEventListener(
        "sourceopen",
        function () {
          WebSocketFnc(url);
        },
        false
      );
    }

    function pushPacket() {
      if (!mseSourceBuffer) return;
      if (!mseSourceBuffer.updating) {
        if (mseQueue.length > 0) {
          const packet = mseQueue.shift();
          try {
            mseSourceBuffer.appendBuffer(packet);
          } catch (e) {
            console.error("Error appending buffer: ", e);
          }
        } else {
          mseStreamingStarted = false;
        }
      }
      const videoEl = refVideo.current;
      if (videoEl && videoEl.buffered.length > 0) {
        if (typeof document.hidden !== "undefined" && document.hidden) {
          videoEl.currentTime =
            videoEl.buffered.end(videoEl.buffered.length - 1) - 0.5;
        }
      }
    }

    function readPacket(packet: any) {
      if (!mseSourceBuffer) return;
      const videoEl = refVideo.current;
      if (videoEl && videoEl.error) {
        console.error("Video Element Error: ", videoEl.error);
        return;
      }
      try {
        if (!mseStreamingStarted) {
          mseSourceBuffer.appendBuffer(packet);
          mseStreamingStarted = true;
          return;
        }
        mseQueue.push(packet);
        if (!mseSourceBuffer.updating) {
          pushPacket();
        }
      } catch (e) {
        console.error("Error appending initial buffer: ", e);
      }
    }

    refVideo.current.addEventListener("loadeddata", () => {
      setLoading(false);
      if (detectBrowser() !== "Safari" && refVideo.current && cameraId) {
        makePic(
          refVideo?.current,
          cameraId,
          refVideo.current?.width,
          refVideo.current?.height
        );
      }
    });

    refVideo.current.addEventListener("pause", () => {
      const videoEl = refVideo.current;
      if (!videoEl) return;
      if (
        videoEl.currentTime > videoEl.buffered.end(videoEl.buffered.length - 1)
      ) {
        videoEl.currentTime =
          videoEl.buffered.end(videoEl.buffered.length - 1) - 0.1;
        videoEl.play();
      }
    });

    startPlay(
      refVideo.current,
      `${env.VITE_VIDEO_WS_URL}/${cameraId}/channel/0/mse?uuid=${cameraId}&channel=0`
    );

    return () => {
      if (ws) {
        ws.close();
      }
      if (mse && mse.readyState === "open") {
        mse.endOfStream();
      }
      mse?.removeEventListener("sourceopen", () => {});
    };
  }, [cameraId]);

  useEffect(() => {
    if (loading || !refVideo.current || !refCanvas.current) return;
    const canvas = refCanvas.current;
    // get video aspect ratio
    const aspectRatio =
      refVideo.current.videoWidth / refVideo.current.videoHeight;
    // set canvas aspect ratio
    canvas.style.aspectRatio = `${aspectRatio}`;
  }, [loading]);

  if (!data) {
    return (
      <main className="grid place-content-center text-3xl">
        The camera was not found
      </main>
    );
  }
  return (
    <main className="flex h-full  relative w-full flex-col gap-3 max-md:px-4 max-md:pb-4 md:gap-4 overflow-hidden">
      {(loading || loadingAnalyse) && (
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
        ></video>
      </main>
    </main>
  );
};

export default CameraOption;
