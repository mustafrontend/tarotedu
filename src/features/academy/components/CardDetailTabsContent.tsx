import React from 'react'
import { useTranslation } from 'react-i18next'
import { Sun, Moon, Eye, Heart, Briefcase } from 'lucide-react'
import { TarotCard } from '../../../types/tarot'

interface CardDetailTabsContentProps {
  card: TarotCard
  activeTab: 'core' | 'symbolism' | 'loveCareer'
}

export const CardDetailTabsContent: React.FC<CardDetailTabsContentProps> = ({ card, activeTab }) => {
  const { t } = useTranslation()

  const defaultLove = `${card.name} ilişkilerde tutkulu, samimi ve dürüst bir iletişimi temsil eder. Duygusal bağların derinleştiği, karşılıklı güven ve ruhsal uyumun ön plana çıktığı bir evreyi işaret eder. Bekarlar için yeni ve heyecan verici bir aşka yelken açma potansiyelidir.`
  const defaultCareer = `${card.name} kariyer yolculuğunuzda stratejik kararlar alma, finansal fırsatları değerlendirme ve yeteneklerinizi sergileme zamanıdır. Projelerin başarıyla tamamlanacağı ve liderlik vizyonunuzun takdir toplayacağı bereketli bir süreçtir.`
  const defaultSymbolism = `Rider-Waite esoterik geleneğinde ${card.name}, arketipsel bilincin ve ruhsal yolculuğun kutsal evrelerini simgeler. Karttaki renkler, figürlerin duruşu ve gizli geometri bilinçaltı rehberliği sunar.`

  return (
    <>
      {activeTab === 'core' && (
        <div className="space-y-3 font-sans">
          <div>
            <h4 className="text-[11px] font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1 mb-1">
              <Sun className="w-3.5 h-3.5 text-amber-400" />
              {t('academy.uprightMeaning')}
            </h4>
            <p className="text-xs text-purple-100 font-medium leading-relaxed bg-slate-900/90 p-3 rounded-xl border border-purple-500/30 shadow-inner whitespace-pre-line">
              {t(`cards.${card.id}.upright`, card.meaning.upright)}
            </p>
          </div>
          <div>
            <h4 className="text-[11px] font-bold text-indigo-300 uppercase tracking-wider flex items-center gap-1 mb-1">
              <Moon className="w-3.5 h-3.5 text-indigo-400" />
              {t('academy.reversedMeaning')}
            </h4>
            <p className="text-xs text-purple-100 font-medium leading-relaxed bg-slate-900/90 p-3 rounded-xl border border-purple-500/30 shadow-inner whitespace-pre-line">
              {t(`cards.${card.id}.reversed`, card.meaning.reversed)}
            </p>
          </div>
        </div>
      )}

      {activeTab === 'symbolism' && (
        <div className="space-y-2 text-xs text-purple-100 bg-slate-900/90 p-3.5 rounded-xl border border-purple-500/30 leading-relaxed font-medium font-sans shadow-inner">
          <span className="font-bold text-amber-300 flex items-center gap-1 mb-1 text-xs">
            <Eye className="w-4 h-4 text-amber-400" /> Kadim Sembolizm & Arketip Analizi
          </span>
          <p className="text-xs leading-relaxed whitespace-pre-line">
            {t(`cards.${card.id}.symbolism`, defaultSymbolism)}
          </p>
        </div>
      )}

      {activeTab === 'loveCareer' && (
        <div className="space-y-3 font-sans">
          <div className="bg-slate-900/90 p-3.5 rounded-xl border border-purple-500/30 space-y-1 shadow-inner">
            <span className="font-bold text-pink-300 flex items-center gap-1 text-xs">
              <Heart className="w-4 h-4 text-pink-400" /> Aşk & İlişki Yorumu:
            </span>
            <p className="text-xs text-purple-100 font-medium leading-relaxed whitespace-pre-line">
              {t(`cards.${card.id}.love`, defaultLove)}
            </p>
          </div>

          <div className="bg-slate-900/90 p-3.5 rounded-xl border border-purple-500/30 space-y-1 shadow-inner">
            <span className="font-bold text-teal-300 flex items-center gap-1 text-xs">
              <Briefcase className="w-4 h-4 text-teal-400" /> Kariyer & Finans Yorumu:
            </span>
            <p className="text-xs text-purple-100 font-medium leading-relaxed whitespace-pre-line">
              {t(`cards.${card.id}.career`, defaultCareer)}
            </p>
          </div>
        </div>
      )}
    </>
  )
}
