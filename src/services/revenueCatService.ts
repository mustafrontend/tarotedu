import { Capacitor } from '@capacitor/core'
import { Purchases, LOG_LEVEL, PurchasesPackage } from '@revenuecat/purchases-capacitor'
import { tarotApiService } from './tarotApiService'

export const REVENUECAT_API_KEY = 'appl_KYCMWKtHLpIvVfRoVOlwEOgfuRZ'
export const REVENUECAT_ENTITLEMENT_ID = 'pro_access'

export const initializeRevenueCat = async (): Promise<boolean> => {
  try {
    const platform = Capacitor.getPlatform()
    console.log('[RevenueCat] Platform:', platform)

    if (platform === 'ios' || platform === 'android') {
      await Purchases.setLogLevel({ level: LOG_LEVEL.DEBUG })
      await Purchases.configure({ apiKey: REVENUECAT_API_KEY })
      console.log('[RevenueCat] Initialized on mobile')
      return true
    } else {
      console.log('[RevenueCat] Web mode active')
      return false
    }
  } catch (error) {
    console.error('[RevenueCat] Init error:', error)
    return false
  }
}

export const checkIsProUser = async (): Promise<boolean> => {
  try {
    const customerInfo = await Purchases.getCustomerInfo()
    return customerInfo.customerInfo.entitlements.active[REVENUECAT_ENTITLEMENT_ID] !== undefined
  } catch {
    return false
  }
}

export const purchaseProPackage = async (packageId: 'annual' | 'monthly' | 'lifetime'): Promise<boolean> => {
  try {
    const platform = Capacitor.getPlatform()
    if (platform !== 'ios' && platform !== 'android') {
      return true // Web sandbox
    }

    const offerings = await Purchases.getOfferings()
    let availablePackages: PurchasesPackage[] = offerings.current?.availablePackages || []

    if (availablePackages.length > 0) {
      const target = availablePackages.find(
        (pkg: PurchasesPackage) => pkg.identifier.toLowerCase().includes(packageId)
      ) || availablePackages[0]

      const { customerInfo } = await Purchases.purchasePackage({ aPackage: target })
      const isSuccess = customerInfo.entitlements.active[REVENUECAT_ENTITLEMENT_ID] !== undefined
      if (isSuccess) {
        tarotApiService.notifyPurchase(packageId, target.product?.priceString || 'Standard')
      }
      return isSuccess
    }

    const productIdMap = {
      annual: 'com.tarotedu.pro.annual',
      monthly: 'com.tarotedu.pro.monthly',
      lifetime: 'com.tarotedu.pro.lifetime',
    }
    const productId = productIdMap[packageId]

    const { products } = await Purchases.getProducts({ productIdentifiers: [productId] })
    if (products && products.length > 0) {
      const { customerInfo } = await Purchases.purchaseStoreProduct({ product: products[0] })
      return customerInfo.entitlements.active[REVENUECAT_ENTITLEMENT_ID] !== undefined
    }
    return false
  } catch (error: any) {
    console.error('[RevenueCat] Purchase failed:', error)
    return false
  }
}

export const restoreProPurchases = async (): Promise<boolean> => {
  try {
    const { customerInfo } = await Purchases.restorePurchases()
    return customerInfo.entitlements.active[REVENUECAT_ENTITLEMENT_ID] !== undefined
  } catch (error) {
    console.error('[RevenueCat] Restore failed:', error)
    return false
  }
}
