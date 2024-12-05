export function calculateUpgradePrice(basePrice: number, level: number) {
  return Math.floor(basePrice * Math.pow(level + 1, 1.5));
}
