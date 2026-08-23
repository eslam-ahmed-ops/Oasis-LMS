"use client";

import React, { useRef, useState, useEffect } from "react";
import { Play, Pause, Volume2, VolumeX, Maximize, RotateCcw, CheckCircle2 } from "lucide-react";
import { toArabicNumerals } from "@/lib/arabicNumbers";

interface VideoPlayerProps {
  videoUrl?: string;
  lessonTitle: string;
  onProgressUpdate?: (seconds: number, completed: boolean) => void;
  initialSeconds?: number;
}

export default function VideoPlayer({
  videoUrl,
  lessonTitle,
  onProgressUpdate,
  initialSeconds = 0,
}: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(1);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    if (videoRef.current && initialSeconds > 0) {
      videoRef.current.currentTime = initialSeconds;
    }
  }, [initialSeconds]);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const current = videoRef.current.currentTime;
    const dur = videoRef.current.duration || 1;
    setCurrentTime(current);

    // If 90% watched, mark completed
    const completed = current / dur >= 0.9;
    if (completed && !isCompleted) {
      setIsCompleted(true);
    }

    if (onProgressUpdate) {
      onProgressUpdate(Math.floor(current), completed);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    setCurrentTime(time);
    if (videoRef.current) {
      videoRef.current.currentTime = time;
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleSpeedChange = (speed: number) => {
    setPlaybackSpeed(speed);
    if (videoRef.current) {
      videoRef.current.playbackRate = speed;
    }
  };

  const toggleFullscreen = () => {
    if (!videoRef.current) return;
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      videoRef.current.parentElement?.requestFullscreen();
    }
  };

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainingSecs = Math.floor(secs % 60);
    return `${toArabicNumerals(mins)}:${toArabicNumerals(remainingSecs < 10 ? "0" + remainingSecs : remainingSecs)}`;
  };

  return (
    <div className="relative rounded-2xl overflow-hidden bg-slate-950 text-white shadow-xl group border border-slate-800">
      {/* Video element */}
      <div className="relative aspect-video flex items-center justify-center bg-slate-900">
        {videoUrl ? (
          <video
            ref={videoRef}
            src={videoUrl}
            className="w-full h-full object-cover"
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
            onEnded={() => setIsPlaying(false)}
          />
        ) : (
          /* Placeholder animated preview when no direct video file is loaded */
          <div className="flex flex-col items-center justify-center p-8 text-center bg-gradient-to-br from-slate-900 via-brand-900/40 to-slate-950 w-full h-full">
            <div className="w-20 h-20 rounded-full bg-brand-500/20 border border-brand-500/40 flex items-center justify-center mb-4 cursor-pointer hover:scale-110 transition-transform" onClick={() => setIsPlaying(!isPlaying)}>
              <Play className="w-8 h-8 text-brand-500 fill-brand-500 mr-1" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">{lessonTitle}</h3>
            <p className="text-sm text-slate-400 max-w-md">
              فيديو تعليمي عالي الدقة، يمكنك التحكم بالسرعة ومتابعة تقدمك تلقائياً
            </p>
            {isCompleted && (
              <div className="flex items-center gap-1.5 text-green-400 bg-green-500/10 px-3 py-1.5 rounded-full text-xs mt-4">
                <CheckCircle2 className="w-4 h-4" />
                <span>تم إكمال هذا الدرس بنجاح</span>
              </div>
            )}
          </div>
        )}

        {/* Center overlay play button */}
        {!isPlaying && videoUrl && (
          <button
            onClick={togglePlay}
            className="absolute inset-0 m-auto w-16 h-16 rounded-full bg-brand-500/90 text-white flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
          >
            <Play className="w-7 h-7 fill-white mr-1" />
          </button>
        )}
      </div>

      {/* Video controls */}
      <div className="p-4 bg-slate-900/95 border-t border-slate-800 flex flex-col gap-3">
        {/* Progress scrub bar */}
        <div className="flex items-center gap-3">
          <span className="text-xs text-slate-400 font-mono">{formatTime(currentTime)}</span>
          <input
            type="range"
            min={0}
            max={duration || 100}
            value={currentTime}
            onChange={handleSeek}
            className="flex-1 h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-brand-500"
          />
          <span className="text-xs text-slate-400 font-mono">{formatTime(duration || 1800)}</span>
        </div>

        {/* Action buttons */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={togglePlay}
              className="p-2 rounded-lg hover:bg-slate-800 text-white transition-colors"
              title={isPlaying ? "إيقاف مؤقت" : "تشغيل"}
            >
              {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 fill-white" />}
            </button>

            <button
              onClick={() => {
                if (videoRef.current) videoRef.current.currentTime -= 10;
              }}
              className="p-2 rounded-lg hover:bg-slate-800 text-slate-300 transition-colors"
              title="تراجع 10 ثواني"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-2">
              <button
                onClick={toggleMute}
                className="p-2 rounded-lg hover:bg-slate-800 text-slate-300 transition-colors"
              >
                {isMuted ? <VolumeX className="w-5 h-5 text-red-400" /> : <Volume2 className="w-5 h-5" />}
              </button>
              <input
                type="range"
                min={0}
                max={1}
                step={0.1}
                value={isMuted ? 0 : volume}
                onChange={(e) => {
                  const val = parseFloat(e.target.value);
                  setVolume(val);
                  if (videoRef.current) {
                    videoRef.current.volume = val;
                    setIsMuted(val === 0);
                  }
                }}
                className="w-16 h-1 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-brand-500"
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Speed Selector */}
            <div className="flex items-center bg-slate-800 rounded-lg p-0.5 text-xs">
              {[0.75, 1, 1.25, 1.5, 2].map((spd) => (
                <button
                  key={spd}
                  onClick={() => handleSpeedChange(spd)}
                  className={`px-2 py-1 rounded-md font-medium transition-colors ${
                    playbackSpeed === spd ? "bg-brand-500 text-white" : "text-slate-400 hover:text-white"
                  }`}
                >
                  {toArabicNumerals(spd)}x
                </button>
              ))}
            </div>

            <button
              onClick={toggleFullscreen}
              className="p-2 rounded-lg hover:bg-slate-800 text-slate-300 transition-colors"
              title="ملء الشاشة"
            >
              <Maximize className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
