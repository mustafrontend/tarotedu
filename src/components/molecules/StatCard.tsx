import React from 'react'
import { CardBase } from '../atoms/CardBase'

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
  return (
    <CardBase hoverEffect={false} className="flex items-center gap-4">
      <div className={`p-3.5 rounded-2xl ${color}`}>
        <Icon className="w-6 h-6" />
      </div>
      <div>
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
          {title}
        </p>
        <h4 className="text-2xl font-black text-slate-900 tracking-tight">
          {value}
        </h4>
        {subtitle && (
          <p className="text-xs font-medium text-slate-400 mt-0.5">{subtitle}</p>
        )}
      </div>
    </CardBase>
  )
}
