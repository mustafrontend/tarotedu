import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ChevronDown, Star, MessageSquare } from 'lucide-react'
import { CardBase } from '../../../components/atoms/CardBase'

export const TestimonialsFaqSection: React.FC = () => {
  const { t } = useTranslation()
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const reviews = [
    {
      name: t('testimonials.r1Name', 'Elena Rostova'),
      role: t('testimonials.r1Role', 'Tarot Practitioner'),
      text: t('testimonials.r1Text', 'TarotEdu made understanding Rider-Waite symbolism so clear and practical!'),
      rating: 5,
    },
    {
      name: t('testimonials.r2Name', 'Marcus Vance'),
      role: t('testimonials.r2Role', 'Daily Learner'),
      text: t('testimonials.r2Text', 'The daily intention draw and 528Hz audio frequency completely transformed my morning routine.'),
      rating: 5,
    },
  ]

  const faqs = [
    {
      q: t('faq.q1', 'Is TarotEdu based on authentic Rider-Waite tarot?'),
      a: t('faq.a1', 'Yes! All 78 cards follow the traditional Rider-Waite-Smith symbolism, upright & reversed interpretations.'),
    },
    {
      q: t('faq.q2', 'Can I use TarotEdu offline?'),
      a: t('faq.a2', 'Absolutely. Cards, meanings, spreads, and local journal entries work 100% offline.'),
    },
    {
      q: t('faq.q3', 'How does the Mystic Tarot Oracle work?'),
      a: t('faq.a3', 'The Oracle matches your question prompt against authentic Rider-Waite arcana energy to synthesize guidance.'),
    },
  ]

  return (
    <div className="space-y-6">
      {/* Student Testimonials */}
      <div className="space-y-3">
        <h3 className="text-sm font-extrabold text-white tracking-tight flex items-center gap-1.5">
          <MessageSquare className="w-4 h-4 text-purple-400" />
          <span>{t('home.studentReviews', 'Student Reviews & Community')}</span>
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {reviews.map((rev, idx) => (
            <CardBase key={idx} hoverEffect={false} className="p-4 space-y-2 border-[0.5px] border-purple-500/20">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white">{rev.name}</span>
                <div className="flex text-amber-400 text-xs">
                  {Array.from({ length: rev.rating }).map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-current" />
                  ))}
                </div>
              </div>
              <p className="text-xs text-purple-200/90 italic">"{rev.text}"</p>
              <p className="text-[10px] font-semibold text-purple-300/70">{rev.role}</p>
            </CardBase>
          ))}
        </div>
      </div>

      {/* FAQ Accordion */}
      <div className="space-y-3">
        <h3 className="text-sm font-extrabold text-white tracking-tight">
          {t('home.faqTitle', 'Frequently Asked Questions')}
        </h3>
        <div className="space-y-2">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx
            return (
              <CardBase key={idx} hoverEffect={false} className="p-3.5 border-[0.5px] border-purple-500/20">
                <button
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full flex items-center justify-between text-left text-xs font-bold text-purple-100"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-purple-300/70 transition-transform ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <p className="text-xs text-purple-200/80 mt-2 font-medium leading-relaxed pt-2 border-t border-purple-500/20">
                    {faq.a}
                  </p>
                )}
              </CardBase>
            )
          })}
        </div>
      </div>
    </div>
  )
}
