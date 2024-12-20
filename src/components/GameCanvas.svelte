<script lang="ts">
  import { COLORS } from "$lib/colors";
  import { sendEvent } from "$lib/events.svelte";
  import { game, UPGRADES_VALUES } from "$lib/game.svelte";
  import { onMount } from "svelte";
  import Vector from "$lib/Vector";

  let canvasRef: HTMLCanvasElement;
  let ctx: CanvasRenderingContext2D;
  let resizeObserver: ResizeObserver;
  let cursor = new Vector(0, 0);

  type HarpoonState = "default" | "throw" | "retrieve";
  type PictureItem = HTMLImageElement | null;

  interface Plastic {
    position: Vector;
    velocity: Vector;
    imageName: "svelty" | "bottle";
  }

  const plastics: Plastic[] = [];

  const images = {
    raft: null as PictureItem,
    bottle: null as PictureItem,
    svelty: null as PictureItem,
    water: null as PictureItem,
    rod: null as PictureItem,
  };

  const harpoon = {
    position: null as Vector | null,
    targetPosition: new Vector(0, 0),
    state: "default" as HarpoonState,
    speed: 100,
  };

  onMount(() => {
    if (typeof window !== "undefined") {
      const keys = Object.keys(images) as (keyof typeof images)[];
      for (const path of keys) {
        images[path] = new Image();
        images[path].src = `/images/${path}.png`;
      }
    }
    if (!canvasRef) return;
    ctx = canvasRef.getContext("2d")!;

    ctx.strokeStyle = "black";

    setInterval(() => {
      const waste = ["bottle", "svelty"] as Plastic["imageName"][];
      const randIndex = Math.floor(Math.random() * waste.length);
      plastics.push({
        position: new Vector(Math.random() * canvasRef.width, -32),
        velocity: new Vector(Math.random() - 0.5, 10),
        imageName: waste[randIndex],
      });
    }, 350);

    resizeObserver = new ResizeObserver((entries) => {
      entries.forEach((entry) => {
        const { width, height } = entry.contentRect;
        scaleCanvas(width, height);
      });
    });

    resizeObserver.observe(wrapper);
  });

  let gameSize = new Vector(0, 0);
  const ratio = window.devicePixelRatio || 1;

  function scaleCanvas(width: number, height: number) {
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    canvasRef.width = width * ratio;
    canvasRef.height = height * ratio;
    canvasRef.style.width = width + "px";
    canvasRef.style.height = height + "px";
    gameSize = new Vector(width, height);
  }

  let frameId: number;
  let time = 0.0;

  const BG = 256;
  function draw() {
    ctx.fillStyle = COLORS.water;
    ctx.fillRect(0, 0, canvasRef.width, canvasRef.height);
    for (let x = 0; x < (gameSize.x * 2) / BG; x++) {
      for (let y = 0; y < (gameSize.y * 2) / BG; y++) {
        ctx.drawImage(
          images.water!,
          x * BG + Math.cos(time * 100) * 5,
          y * BG,
          BG,
          BG
        );
      }
    }

    plastics.forEach((p) => {
      ctx.drawImage(
        images[p.imageName]!,
        p.position.x - 32,
        p.position.y - 32,
        64,
        64
      );
    });

    const center = getCenter();

    ctx.drawImage(
      images.raft!,
      center.x - 80,
      center.y - 80 + Math.cos(time) * 8,
      160,
      160
    );

    if (harpoon.position !== null) {
      ctx.fillStyle = "red";
      ctx.drawImage(
        images.rod!,
        harpoon.position.x - 16,
        harpoon.position.y - 16,
        32,
        32
      );
      ctx.fillStyle = COLORS.black;

      ctx.beginPath();
      ctx.lineWidth = 2;
      ctx.moveTo(center.x, center.y);
      ctx.lineTo(harpoon.position.x, harpoon.position.y);
      ctx.globalAlpha = 0.5;
      ctx.stroke();
      ctx.globalAlpha = 1.0;
      ctx.closePath();
      ctx.beginPath();
      ctx.arc(cursor.x, cursor.y, getRadius(), 0, Math.PI * 2);

      ctx.stroke();
      ctx.closePath();
    }
  }

  let lastTime: number = 0.0;

  function update(time: number) {
    const delta = (time - lastTime) / 100;
    lastTime = time;
    time += delta;
    draw();

    plastics.forEach((p) => {
      p.position = p.position.add(p.velocity.multiply(delta));
    });

    if (harpoon.position !== null) {
      if (harpoon.state === "throw") {
        harpoon.position = harpoon.position.add(
          harpoon.targetPosition
            .subtract(harpoon.position)
            .normalize()
            .multiply(getSpeed() * delta)
        );
        if (harpoon.position.distanceTo(harpoon.targetPosition) < 24) {
          harpoon.state = "retrieve";
          plastics.forEach((p) => {
            if (p.position.distanceTo(harpoon.position!) < getRadius()) {
              game.rawPlastics++;
              plastics.splice(plastics.indexOf(p), 1);
              sendEvent(
                game.rawPlastics === 10 ? "tenWatterBottles" : "oneWaterBottle"
              );
            }
          });
          harpoon.targetPosition = getCenter();
        }
      } else if (harpoon.state === "retrieve") {
        harpoon.position = harpoon.position.add(
          harpoon.targetPosition
            .subtract(harpoon.position)
            .normalize()
            .multiply(getSpeed() * delta)
        );
        if (harpoon.position.distanceTo(harpoon.targetPosition) < 24) {
          harpoon.state = "default";
        }
      }
    }

    frameId = requestAnimationFrame(update);
  }

  function getRadius() {
    return 35 * UPGRADES_VALUES.radius[game.levels.radius - 1];
  }

  function getSpeed() {
    return harpoon.speed * UPGRADES_VALUES.speed[game.levels.speed - 1];
  }

  function getCenter() {
    return new Vector(gameSize.x / 2, gameSize.y / 2).multiply(ratio);
  }
  onMount(() => {
    frameId = requestAnimationFrame(update);

    return () => {
      cancelAnimationFrame(frameId);
    };
  });

  function onMouseDown(e: MouseEvent) {
    if (harpoon.state === "default") {
      harpoon.state = "throw";
      harpoon.position = getCenter();
      harpoon.targetPosition = cursor;
    }
  }

  let wrapper: HTMLDivElement;
</script>

<div class="relative h-full flex-1" bind:this={wrapper}>
  <canvas
    onmousedown={onMouseDown}
    onmousemove={(e) => {
      cursor = new Vector(e.offsetX * ratio, e.offsetY * ratio);
    }}
    bind:this={canvasRef}
    class="w-full bg-red-100"
  ></canvas>
</div>
