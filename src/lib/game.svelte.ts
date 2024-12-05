type Scene = "menu" | "game" | "end";

interface RecyclingMachine {
  level: number;
  time: number;
}

export const game = $state({
  currentScene: "menu" as Scene,
  rawPlastics: 0,
  machines: [] as RecyclingMachine[],
});

export function buyMachine() {
  game.machines.push({
    level: 0,
    time: 0,
  });
}
