"use client";
import React from "react";

type Data =
  | { ok: true; isPlaying: false }
  | {
      ok: true;
      isPlaying: true;
      title: string;
      artist: string;
      album?: string;
      albumImageUrl?: string;
      songUrl?: string;
    };

export default function NowPlaying() {
  const [data, setData] = React.useState<Data | null>(null);

  React.useEffect(() => {
    let timer: any;
    const load = async () => {
      try {
        const res = await fetch("/api/spotify/now-playing", { cache: "no-store" });
        const json = (await res.json()) as Data;
        setData(json);
      } catch {}
      timer = setTimeout(load, 20_000);
    };
    load();
    return () => clearTimeout(timer);
  }, []);

  if (!data) return null;

  return (
    <div className="relative flex items-center justify-center w-full">
      {data.ok && data.isPlaying ? (
        <div className="relative flex items-center justify-center">
          {/* Left wave - flows FROM widget TO left card border */}
          <div className="absolute right-full mr-1 sm:mr-4 flex items-center overflow-hidden max-w-[12vw] sm:max-w-[150px]">
            <svg width="100%" height="20" viewBox="0 0 150 20" className="min-w-[60px] sm:min-w-[120px]">
              <defs>
                <linearGradient id="fadeLeft" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" style={{stopColor:"#4ade80", stopOpacity:0.1}} />
                  <stop offset="30%" style={{stopColor:"#4ade80", stopOpacity:0.4}} />
                  <stop offset="70%" style={{stopColor:"#4ade80", stopOpacity:0.7}} />
                  <stop offset="100%" style={{stopColor:"#4ade80", stopOpacity:0.9}} />
                </linearGradient>
              </defs>
              <path
                d="M150,10 Q140,5 130,10 T110,10 T90,10 T70,10 T50,10 T30,10 T10,10 T0,10"
                stroke="url(#fadeLeft)"
                strokeWidth="2"
                fill="none"
                className="wave-left"
              />
            </svg>
          </div>

          {/* Main player content - no border */}
          <div className="flex items-center gap-3 bg-card/80 backdrop-blur px-3 py-2 text-sm rounded-md">
            {data.albumImageUrl ? (
              <img
                src={`/api/spotify/image-proxy?url=${encodeURIComponent(data.albumImageUrl)}`}
                alt="Album"
                className="h-8 w-8 rounded object-cover"
                loading="lazy"
              />
            ) : null}
            <div className="min-w-0">
              <div className="truncate font-medium">
                {data.songUrl ? (
                  <a href={data.songUrl} target="_blank" rel="noopener noreferrer" className="hover:underline">
                    {data.title}
                  </a>
                ) : (
                  data.title
                )}
              </div>
              <div className="truncate text-xs text-muted-foreground">{data.artist}</div>
            </div>
          </div>

          {/* Right wave - flows FROM widget TO right card border */}
          <div className="absolute left-full ml-1 sm:ml-4 flex items-center overflow-hidden max-w-[12vw] sm:max-w-[150px]">
            <svg width="100%" height="20" viewBox="0 0 150 20" className="min-w-[60px] sm:min-w-[120px]">
              <defs>
                <linearGradient id="fadeRight" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" style={{stopColor:"#4ade80", stopOpacity:0.9}} />
                  <stop offset="30%" style={{stopColor:"#4ade80", stopOpacity:0.7}} />
                  <stop offset="70%" style={{stopColor:"#4ade80", stopOpacity:0.4}} />
                  <stop offset="100%" style={{stopColor:"#4ade80", stopOpacity:0.1}} />
                </linearGradient>
              </defs>
              <path
                d="M0,10 Q10,15 20,10 T40,10 T60,10 T80,10 T100,10 T120,10 T140,10 T150,10"
                stroke="url(#fadeRight)"
                strokeWidth="2"
                fill="none"
                className="wave-right"
              />
            </svg>
          </div>
        </div>
      ) : (
        <div className="flex items-center gap-3 text-muted-foreground">
          <img
            src="/spotify.svg"
            alt="Spotify"
            className="h-6 w-6 object-contain opacity-60 invert-0 dark:invert"
            loading="lazy"
          />
          <span className="text-sm">No Music Playing - Spotify</span>
        </div>
      )}

      <style jsx>{`
        .wave-left {
          animation: wave-motion 2s ease-in-out infinite, color-cycle 8s ease-in-out infinite;
        }
        .wave-right {
          animation: wave-motion 2s ease-in-out infinite 0.5s, color-cycle 8s ease-in-out infinite;
        }
        
        .wave-left path {
          stroke-dasharray: 200;
          animation: flow-left 3s ease-in-out infinite;
        }
        
        .wave-right path {
          stroke-dasharray: 200;
          animation: flow-right 3s ease-in-out infinite;
        }
        
        @keyframes wave-motion {
          0%, 100% {
            transform: translateY(0) scaleY(1);
          }
          50% {
            transform: translateY(-1px) scaleY(1.1);
          }
        }
        
        @keyframes flow-left {
          0% {
            stroke-dashoffset: 200;
          }
          100% {
            stroke-dashoffset: 0;
          }
        }
        
        @keyframes flow-right {
          0% {
            stroke-dashoffset: -200;
          }
          100% {
            stroke-dashoffset: 0;
          }
        }
        
        @keyframes color-cycle {
          0% { filter: hue-rotate(0deg); }
          16% { filter: hue-rotate(60deg); }
          33% { filter: hue-rotate(120deg); }
          50% { filter: hue-rotate(180deg); }
          66% { filter: hue-rotate(240deg); }
          83% { filter: hue-rotate(300deg); }
          100% { filter: hue-rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
