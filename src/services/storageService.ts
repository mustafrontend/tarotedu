export const storageService = {
  getItem<T>(key: string, defaultValue: T): T {
    try {
      const item = localStorage.getItem(key)
      return item ? JSON.parse(item) : defaultValue
    } catch {
      return defaultValue
    }
  },

  setItem<T>(key: string, value: T): void {
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch (e) {
      console.warn('[StorageService] Save error:', e)
    }
  },

  removeItem(key: string): void {
    try {
      localStorage.removeItem(key)
    } catch (e) {
      console.warn('[StorageService] Remove error:', e)
    }
  },
}
