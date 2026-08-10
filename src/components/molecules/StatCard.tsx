import React from 'react'
import { CardBase } from '../atoms/CardBase'
import { useTarotStore } from '../../store/tarotStore'

interface StatCardProps {
  icon: React.ComponentType<{ className?: string }>
  title: string
  value: string | number
  subtitle?: string
  color?: string
}

export const StatCard: React.FC<StatCardProps> = ({
  icon: Icon,
  title,
  value,
  subtitle,
  color = 'text-purple-600 bg-purple-50',
}) => {
  const theme = useTarotStore((state) => state.theme)
  const isDark = theme === 'dark'

  return (
    <CardBase hoverEffect={false} className="flex items-center gap-4 p-4 font-sans">
      <div className={`p-3.5 rounded-2xl ${color}`}>
        <Icon className="w-6 h-6" />
      </div>
      <div>
        <p className={`text-xs font-semibold uppercase tracking-wider ${
          isDark ? 'text-purple-200/80' : 'text-slate-600'
        }`}>
          {title}
        </p>
        <h4 className={`text-2xl font-black tracking-tight ${
          isDark ? 'text-white' : 'text-slate-900'
        }`}>
          {value}
        </h4>
        {subtitle && (
          <p className={`text-xs font-medium mt-0.5 ${
            isDark ? 'text-purple-200/70' : 'text-slate-500'
          }`}>
            {subtitle}
          </p>
        )}
      </div>
    </CardBase>
  )
}
