import React from 'react'
import { useTranslation } from 'react-i18next'
import { Sun, Moon, Eye, Heart, Briefcase } from 'lucide-react'
import { TarotCard } from '../../../types/tarot'
import { useTarotStore } from '../../../store/tarotStore'

interface CardDetailTabsContentProps {
  card: TarotCard
  activeTab: 'core' | 'symbolism' | 'loveCareer'
}

export const CardDetailTabsContent: React.FC<CardDetailTabsContentProps> = ({ card, activeTab }) => {
  const { t } = useTranslation()
  const theme = useTarotStore((state) => state.theme)
  const isDark = theme === 'dark'

  const defaultLove = `${card.name} ilişkilerde tutkulu, samimi ve dürüst bir iletişimi temsil eder. Duygusal bağların derinleştiği, karşılıklı güven ve ruhsal uyumun ön plana çıktığı bir evreyi işaret eder. Bekarlar için yeni ve heyecan verici bir aşka yelken açma potansiyelidir.`
  const defaultCareer = `${card.name} kariyer yolculuğunuzda stratejik kararlar alma, finansal fırsatları değerlendirme ve yeteneklerinizi sergileme zamanıdır. Projelerin başarıyla tamamlanacağı ve liderlik vizyonunuzun takdir toplayacağı bereketli bir süreçtir.`
  const defaultSymbolism = `Rider-Waite esoterik geleneğinde ${card.name}, arketipsel bilincin ve ruhsal yolculuğun kutsal evrelerini simgeler. Karttaki renkler, figürlerin duruşu ve gizli geometri bilinçaltı rehberliği sunar.`

  return (
    <>
      {activeTab === 'core' && (
        <div className="space-y-3 font-sans">
          <div>
            <h4 className={`text-[11px] font-bold uppercase tracking-wider flex items-center gap-1 mb-1 ${
              isDark ? 'text-amber-300' : 'text-purple-900'
            }`}>
              <Sun className="w-3.5 h-3.5 text-amber-400" />
              {t('academy.uprightMeaning')}
            </h4>
            <p className={`text-xs font-medium leading-relaxed p-3 rounded-xl border shadow-inner whitespace-pre-line ${
              isDark ? 'bg-slate-900/90 border-purple-500/30 text-purple-100' : 'bg-slate-100 border-slate-200 text-slate-800'
            }`}>
              {t(`cards.${card.id}.upright`, card.meaning.upright)}
            </p>
          </div>
          <div>
            <h4 className={`text-[11px] font-bold uppercase tracking-wider flex items-center gap-1 mb-1 ${
              isDark ? 'text-indigo-300' : 'text-indigo-900'
            }`}>
              <Moon className="w-3.5 h-3.5 text-indigo-400" />
              {t('academy.reversedMeaning')}
            </h4>
            <p className={`text-xs font-medium leading-relaxed p-3 rounded-xl border shadow-inner whitespace-pre-line ${
              isDark ? 'bg-slate-900/90 border-purple-500/30 text-purple-100' : 'bg-slate-100 border-slate-200 text-slate-800'
            }`}>
              {t(`cards.${card.id}.reversed`, card.meaning.reversed)}
            </p>
          </div>
        </div>
      )}

      {activeTab === 'symbolism' && (
        <div className={`space-y-2 text-xs p-3.5 rounded-xl border leading-relaxed font-medium font-sans shadow-inner ${
          isDark ? 'bg-slate-900/90 border-purple-500/30 text-purple-100' : 'bg-slate-100 border-slate-200 text-slate-800'
        }`}>
          <span className={`font-bold flex items-center gap-1 mb-1 text-xs ${
            isDark ? 'text-amber-300' : 'text-purple-900'
          }`}>
            <Eye className="w-4 h-4 text-amber-400" /> Kadim Sembolizm & Arketip Analizi
          </span>
          <p className="text-xs leading-relaxed whitespace-pre-line">
            {t(`cards.${card.id}.symbolism`, defaultSymbolism)}
          </p>
        </div>
      )}

      {activeTab === 'loveCareer' && (
        <div className="space-y-3 font-sans">
          <div className={`p-3.5 rounded-xl border space-y-1 shadow-inner ${
            isDark ? 'bg-slate-900/90 border-purple-500/30' : 'bg-purple-50 border-purple-200'
          }`}>
            <span className={`font-bold flex items-center gap-1 text-xs ${
              isDark ? 'text-pink-300' : 'text-pink-700'
            }`}>
              <Heart className="w-4 h-4 text-pink-400" /> Aşk & İlişki Yorumu:
            </span>
            <p className={`text-xs font-medium leading-relaxed whitespace-pre-line ${
              isDark ? 'text-purple-100' : 'text-slate-800'
            }`}>
              {t(`cards.${card.id}.love`, defaultLove)}
            </p>
          </div>

          <div className={`p-3.5 rounded-xl border space-y-1 shadow-inner ${
            isDark ? 'bg-slate-900/90 border-purple-500/30' : 'bg-teal-50 border-teal-200'
          }`}>
            <span className={`font-bold flex items-center gap-1 text-xs ${
              isDark ? 'text-teal-300' : 'text-teal-800'
            }`}>
              <Briefcase className="w-4 h-4 text-teal-400" /> Kariyer & Finans Yorumu:
            </span>
            <p className={`text-xs font-medium leading-relaxed whitespace-pre-line ${
              isDark ? 'text-purple-100' : 'text-slate-800'
            }`}>
              {t(`cards.${card.id}.career`, defaultCareer)}
            </p>
          </div>
        </div>
      )}
    </>
  )
}
