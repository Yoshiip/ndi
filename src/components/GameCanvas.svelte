<script lang="ts">
  import { COLORS } from "$lib/colors";
  import { sendEvent } from "$lib/events.svelte";
  import { game } from "$lib/game.svelte";
  import Vector from "$lib/Vector";
  import { onMount } from "svelte";

  let canvasRef: HTMLCanvasElement;
  let ctx: CanvasRenderingContext2D;

  let resizeObserver: ResizeObserver;

  type HarpoonState = "default" | "throw" | "retrieve";

  let images: any = {
    raft: null,
    waste: null,
    water: null,
    rod: null,
  };

  const harpoon = {
    position: new Vector(0, 0),
    targetPosition: new Vector(0, 0),
    state: "default" as HarpoonState,
    speed: 100,
  };
  let cursor = new Vector(0, 0);

  interface Plastic {
    position: Vector;
    velocity: Vector;
  }

  const plastics: Plastic[] = [];

  onMount(() => {
    if (typeof window !== "undefined") {
      Object.keys(images).forEach((path) => {
        images[path] = new Image();
        images[path].src = `/images/${path}.png`;
      });
    }
    if (!canvasRef) return;
    ctx = canvasRef.getContext("2d")!;

    setInterval(() => {
      plastics.push({
        position: new Vector(Math.random() * canvasRef.width, -32),
        velocity: new Vector(Math.random() - 0.5, 10),
      });
    }, 250);

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
        console.log(Math.cos(time * 100));
        ctx.drawImage(
          images.water,
          x * BG + Math.cos(time * 100) * 5,
          y * BG,
          BG,
          BG
        );
      }
    }

    plastics.forEach((p) => {
      ctx.drawImage(images.waste, p.position.x - 32, p.position.y - 32, 64, 64);
    });

    const center = getCenter();

    ctx.drawImage(
      images.raft,
      center.x - 80,
      center.y - 80 + Math.cos(time) * 8,
      160,
      160
    );

    ctx.fillStyle = "red";
    ctx.drawImage(
      images.rod,
      harpoon.position.x - 16,
      harpoon.position.y - 16,
      32,
      32
    );
    ctx.fillStyle = "black";

    ctx.beginPath();
    ctx.moveTo(center.x, center.y);
    ctx.lineTo(harpoon.position.x, harpoon.position.y);
    ctx.strokeStyle = "black";
    ctx.globalAlpha = 0.5;
    ctx.stroke();
    ctx.globalAlpha = 1.0;
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

    if (harpoon.state === "throw") {
      harpoon.position = harpoon.position.add(
        harpoon.targetPosition
          .subtract(harpoon.position)
          .normalize()
          .multiply(harpoon.speed * delta)
      );
      if (harpoon.position.distanceTo(harpoon.targetPosition) < 24) {
        harpoon.state = "retrieve";
        plastics.forEach((p) => {
          if (p.position.distanceTo(harpoon.position) < 32) {
            game.rawPlastics++;
            plastics.splice(plastics.indexOf(p), 1);
            sendEvent("oneWaterBottle");
          }
        });
        harpoon.targetPosition = getCenter();
      }
    } else if (harpoon.state === "retrieve") {
      harpoon.position = harpoon.position.add(
        harpoon.targetPosition
          .subtract(harpoon.position)
          .normalize()
          .multiply(harpoon.speed * delta)
      );
      if (harpoon.position.distanceTo(harpoon.targetPosition) < 24) {
        harpoon.state = "default";
      }
    }

    frameId = requestAnimationFrame(update);
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

<div class="w-3/4" bind:this={wrapper}>
  <canvas
    onmousedown={onMouseDown}
    onmousemove={(e) => {
      cursor = new Vector(e.offsetX * ratio, e.offsetY * ratio);
    }}
    bind:this={canvasRef}
    class="w-full bg-red-100"
  ></canvas>
</div>
