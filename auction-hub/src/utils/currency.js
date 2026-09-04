/**
 * Format number in Indian currency style (e.g., ₹2,45,000 or ₹1.5 Cr)
 */
export function formatCurrency(amount, compact = false) {
  if (amount === undefined || amount === null || isNaN(amount)) return '₹0';
  
  const num = Number(amount);
  
  if (compact) {
    if (num >= 10000000) {
      return `₹${(num / 10000000).toFixed(2).replace(/\.00$/, '')} Cr`;
    }
    if (num >= 100000) {
      return `₹${(num / 100000).toFixed(2).replace(/\.00$/, '')} L`;
    }
    if (num >= 1000) {
      return `₹${(num / 1000).toFixed(1).replace(/\.0$/, '')}k`;
    }
    return `₹${num}`;
  }

  // Full Indian numbering formatting
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(num);
}

/**
 * Calculate dynamic next minimum bid increment based on IPL/Sports standard brackets
 */
export function getNextMinIncrement(currentBid) {
  if (currentBid < 20000) return 2000;
  if (currentBid < 50000) return 5000;
  if (currentBid < 100000) return 10000;
  if (currentBid < 500000) return 25000;
  if (currentBid < 1000000) return 50000;
  if (currentBid < 5000000) return 100000;
  return 200000;
}
