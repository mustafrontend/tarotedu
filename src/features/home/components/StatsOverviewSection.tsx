import React from 'react'
import { useTranslation } from 'react-i18next'
import { Flame, Award, History, Star } from 'lucide-react'
import { CardBase } from '../../../components/atoms/CardBase'

interface StatsOverviewSectionProps {
  learnedCount: number
  readingsCount: number
}

export const StatsOverviewSection: React.FC<StatsOverviewSectionProps> = ({
  learnedCount,
  readingsCount,
}) => {
  const { t } = useTranslation()

  const stats = [
    {
      icon: Flame,
      label: t('hero.streak'),
      value: t('stats.sevenDays', '7 Days'),
      sub: t('stats.activePractice', 'Active Practice'),
      color: 'bg-amber-500/20 text-amber-300 border border-amber-500/30',
    },
    {
      icon: Award,
      label: t('hero.learned'),
      value: `${learnedCount}/22`,
      sub: t('stats.majorArcana', 'Major Arcana'),
      color: 'bg-purple-500/20 text-purple-300 border border-purple-500/30',
    },
    {
      icon: History,
      label: t('hero.readings'),
      value: readingsCount,
      sub: t('stats.savedSpreads', 'Saved Spreads'),
      color: 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30',
    },
    {
      icon: Star,
      label: t('stats.studentRating', 'Student Rating'),
      value: '4.9★',
      sub: t('stats.globalStudents', 'Global Students'),
      color: 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30',
    },
  ]

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      {stats.map((stat, idx) => {
        const Icon = stat.icon
        return (
          <CardBase key={idx} hoverEffect={false} className="p-4 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-2">
              <div className={`p-2.5 rounded-2xl ${stat.color}`}>
                <Icon className="w-4 h-4" />
              </div>
              <span className="text-[10px] font-bold text-amber-300 uppercase tracking-wider bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/20">
                {t('home.proBadge', 'PRO')}
              </span>
            </div>
            <div>
              <p className="text-[11px] font-semibold text-purple-200/80">{stat.label}</p>
              <h4 className="text-xl font-black text-white tracking-tight">{stat.value}</h4>
              <p className="text-[10px] text-purple-200/60 font-medium">{stat.sub}</p>
            </div>
          </CardBase>
        )
      })}
    </div>
  )
}
