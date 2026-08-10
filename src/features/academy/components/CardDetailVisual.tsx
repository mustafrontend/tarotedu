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
    <div className="w-36 h-56 sm:w-40 sm:h-64 rounded-2xl bg-slate-900 border-2 border-purple-400/50 shadow-xl overflow-hidden relative shrink-0">
      {videoUrl ? (
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
          src={videoUrl}
        />
      ) : null}
      {videoUrl && (
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-transparent p-2 text-center">
          <span className="text-[10px] font-black text-amber-300 tracking-wider uppercase">
            #{number} {localizedName}
          </span>
        </div>
      )}
    </div>
  )
}
