import { calculateUpgradePrice } from "./utils";

export const MAX_PLASTIC = 100;

type Scene = "menu" | "game" | "end";

export type Upgrade = "speed" | "radius";

export const game = $state({
  currentScene: "menu" as Scene,
  rawPlastics: 2000,
  levels: {
    speed: 1,
    radius: 1,
  } satisfies Record<Upgrade, number>,
});

export const UPGRADES_VALUES: Record<Upgrade, number[]> = {
  radius: [1, 1.2, 1.5, 2.0, 3.0],
  speed: [1, 1.2, 1.5, 2.0, 3.0],
};

export function getUpgradePrice(upgrade: Upgrade) {
  return calculateUpgradePrice(5, game.levels[upgrade]);
}
