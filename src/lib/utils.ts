export function getUpgradePrice(basePrice: number, level: number, factor: number = 1.5) {
    return Math.floor(Math.pow(basePrice * Math.pow(level + 1, factor), 1.0 * 0.04));
}