/**
 * Deterministic (non-AI) Gibberish & Meaningful Text Validation Utility
 * Validates whether a user's input is a meaningful intention/question rather than random keyboard mashing (e.g. "asdasdasd", "qwerty", "aaaaa").
 */

export interface ValidationResult {
  isValid: boolean
  errorKey?: string
  errorMessage?: string
}

export function validateIntentionText(text: string): ValidationResult {
  const trimmed = text.trim()

  // 1. Empty or too short check
  if (!trimmed || trimmed.length < 3) {
    return {
      isValid: false,
      errorKey: 'validation.tooShort',
      errorMessage: 'Lütfen kart çekmeden önce anlamlı bir niyet veya soru yazın.',
    }
  }

  // 2. Single character repeated check (e.g., "aaaaaaa", "zzzzzz")
  if (/^(.)\1+$/i.test(trimmed)) {
    return {
      isValid: false,
      errorKey: 'validation.gibberish',
      errorMessage: 'Lütfen rastgele harfler yerine anlamlı bir niyet belirtin.',
    }
  }

  // 3. Known keyboard mashing & repeated sub-pattern check (e.g., "asdasdasd", "qwertyuiop", "zxcvbnm", "123123")
  const lower = trimmed.toLowerCase()
  const keyboardMashes = [
    'asdasd', 'qwerty', 'zxcvbn', 'dfghj', 'hjkl', '12345', 'abcabc',
    'qwer', 'asdf', 'zxcv', 'qazwsx', 'wsxedc', 'rfvtgb', 'yhnujm'
  ]

  for (const mash of keyboardMashes) {
    if (lower.includes(mash)) {
      return {
        isValid: false,
        errorKey: 'validation.gibberish',
        errorMessage: 'Lütfen rastgele klavye tuşları yerine gerçek bir niyet yazın.',
      }
    }
  }

  // 4. Repeated 2-3 char pattern check (e.g., "asdasdasd", "ababab", "xyzxyz")
  if (/^(.{2,4})\1+$/i.test(lower)) {
    return {
      isValid: false,
      errorKey: 'validation.pattern',
      errorMessage: 'Lütfen anlamlı bir cümle veya niyet yazın.',
    }
  }

  // 5. Vowel ratio check for Latin-based texts (Ensures text has reasonable vowels unless short/symbolic)
  const LatinRegex = /^[a-zA-ZçğıöşüÇĞİÖŞÜ\s.,?!'"]+$/
  if (LatinRegex.test(trimmed) && trimmed.length >= 6) {
    const vowels = (trimmed.match(/[aeiouöüıieàèéìòù\s]/gi) || []).length
    const ratio = vowels / trimmed.length
    if (ratio < 0.15 || ratio > 0.85) {
      return {
        isValid: false,
        errorKey: 'validation.meaningfulText',
        errorMessage: 'Yazdığınız metin anlamlı bir niyet veya soru gibi görünmüyor.',
      }
    }
  }

  return { isValid: true }
}
