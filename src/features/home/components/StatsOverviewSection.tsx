import React from 'react'
import { useTranslation } from 'react-i18next'
import { Flame, Award, History, Star } from 'lucide-react'
import { CardBase } from '../../../components/atoms/CardBase'
import { useTarotStore } from '../../../store/tarotStore'

interface StatsOverviewSectionProps {
  learnedCount: number
  readingsCount: number
}

export const StatsOverviewSection: React.FC<StatsOverviewSectionProps> = ({
  learnedCount,
  readingsCount,
}) => {
  const { t } = useTranslation()
  const theme = useTarotStore((state) => state.theme)
  const isDark = theme === 'dark'

  const stats = [
    {
      icon: Flame,
      label: t('hero.streak'),
      value: t('stats.sevenDays', '7 Days'),
      sub: t('stats.activePractice', 'Active Practice'),
      color: isDark
        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
        : 'bg-amber-100 text-amber-800 border border-amber-300',
    },
    {
      icon: Award,
      label: t('hero.learned'),
      value: `${learnedCount}/22`,
      sub: t('stats.majorArcana', 'Major Arcana'),
      color: isDark
        ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
        : 'bg-purple-100 text-purple-800 border border-purple-300',
    },
    {
      icon: History,
      label: t('hero.readings'),
      value: readingsCount,
      sub: t('stats.savedSpreads', 'Saved Spreads'),
      color: isDark
        ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'
        : 'bg-indigo-100 text-indigo-800 border border-indigo-300',
    },
    {
      icon: Star,
      label: t('stats.studentRating', 'Student Rating'),
      value: '4.9★',
      sub: t('stats.globalStudents', 'Global Students'),
      color: isDark
        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
        : 'bg-emerald-100 text-emerald-800 border border-emerald-300',
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
              <span
                className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${
                  isDark
                    ? 'text-amber-300 bg-amber-500/10 border-amber-500/20'
                    : 'text-amber-800 bg-amber-100 border-amber-300'
                }`}
              >
                {t('home.proBadge', 'PRO')}
              </span>
            </div>
            <div>
              <p className={`text-[11px] font-semibold ${isDark ? 'text-purple-200/80' : 'text-slate-600'}`}>
                {stat.label}
              </p>
              <h4 className={`text-xl font-black tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
                {stat.value}
              </h4>
              <p className={`text-[10px] font-medium ${isDark ? 'text-purple-200/80' : 'text-slate-600'}`}>
                {stat.sub}
              </p>
            </div>
          </CardBase>
        )
      })}
    </div>
  )
}
