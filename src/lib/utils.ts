import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Format currency amount in a more readable format (millions/billions)
export function formatCurrencyCompact(amount: number): string {
  if (amount >= 1000000000) {
    return `Rp ${(amount / 1000000000).toFixed(1)}M`
  } else if (amount >= 1000000) {
    return `Rp ${(amount / 1000000).toFixed(1)}Jt`
  } else if (amount >= 1000) {
    return `Rp ${(amount / 1000).toFixed(0)}K`
  } else {
    return `Rp ${amount.toLocaleString('id-ID')}`
  }
}

// Format currency with full Indonesian format
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
}
