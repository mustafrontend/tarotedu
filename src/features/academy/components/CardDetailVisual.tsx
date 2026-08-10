import React from 'react'

interface CardDetailVisualProps {
  videoUrl?: string
  number: number
  localizedName: string
}

export const CardDetailVisual: React.FC<CardDetailVisualProps> = ({
  videoUrl,
  number,
  localizedName,
}) => {
  return (
    <div className="w-full max-w-[280px] h-80 sm:max-w-xs sm:h-96 rounded-3xl bg-slate-950 border-2 border-purple-400/60 shadow-2xl overflow-hidden relative mx-auto shrink-0 transition-all duration-300 hover:border-purple-300">
      {videoUrl ? (
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover scale-105"
          src={videoUrl}
        />
      ) : null}
      {videoUrl && (
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent p-3 text-center">
          <span className="text-xs font-black text-amber-300 tracking-wider uppercase drop-shadow">
            #{number} {localizedName}
          </span>
        </div>
      )}
    </div>
  )
}
