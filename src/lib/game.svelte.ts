type Scene = "menu" | "game" | "end";

interface RecyclingMachine {
  level: number;
  time: number;
}

export type Upgrade = "speed" | "harpoonRadius";

export const UPGRADE_BONUSES: Record<Upgrade, { percentage: number, maxLevel: number }> = {
    speed: { percentage: 10, maxLevel: 10 },
    harpoonRadius: { percentage: 10, maxLevel: 10 },
};

export const game = $state({
  currentScene: "menu" as Scene,
  machines: [] as RecyclingMachine[],
  recycledPlastics: 0,
  rawPlastics: 0,
  levels: {
    speed: 1,
    harpoonRadius: 1,
  } satisfies Record<Upgrade, number>,
});

export function buyMachine() {
  game.machines.push({
    level: 0,
    time: 0,
  });
}
