export type ElementType = 'fire' | 'water' | 'air' | 'earth'

export interface SynastryPartner {
  name: string
  cardId: string
}

export interface ElementalBalance {
  elementA: ElementType
  elementB: ElementType
  alchemyName: string
  synergyScore: number
  description: string
  ratios: Record<ElementType, number>
}

export interface SynastryAnalysisResult {
  partnerACard: string
  partnerBCard: string
  analysisText: string
  elementalBalance: ElementalBalance
}
