import { calculateUpgradePrice } from "./utils";

type Scene = "menu" | "game" | "end";

export type Upgrade = "speed" | "radius";

export const game = $state({
  currentScene: "menu" as Scene,
  recycledPlastics: 0,
  rawPlastics: 20000,
  levels: {
    speed: 0,
    radius: 0,
  } satisfies Record<Upgrade, number>,
});

export const UPGRADES_VALUES: Record<Upgrade, number[]> = {
  radius: [1, 1.2, 1.5, 2.0, 3.0, 4.0, 6.0, 7.0, 8.0, 9.0, 10],
  speed: [1, 1.2, 1.5, 2.0, 3.0, 4.0, 5.0, 6.0, 7.0, 8.0],
};

export function getUpgradePrice(upgrade: Upgrade) {
  return calculateUpgradePrice(5, game.levels[upgrade]);
}
