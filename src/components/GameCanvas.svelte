<script lang="ts">
  import { COLORS } from "$lib/colors";
  import Vector from "$lib/Vector";
  import { onMount } from "svelte";

  let canvasRef: HTMLCanvasElement;
  let ctx: CanvasRenderingContext2D;

  let resizeObserver: ResizeObserver;

  type HarpoonState = "default" | "throw" | "retrieve";

  const harpoon = {
    position: new Vector(0, 0),
    harpoonState: "default" as HarpoonState,
    speed: 10,
  };
  let cursor = new Vector(0, 0);

  interface Plastic {
    position: Vector;
    velocity: Vector;
  }

  const plastics: Plastic[] = [];

  onMount(() => {
    if (!canvasRef) return;
    ctx = canvasRef.getContext("2d")!;

    for (let index = 0; index < 25; index++) {
      plastics.push({
        position: new Vector(
          Math.random() * canvasRef.width,
          Math.random() * canvasRef.height
        ),
        velocity: new Vector(Math.random() - 0.5, 10),
      });
    }

    resizeObserver = new ResizeObserver((entries) => {
      entries.forEach((entry) => {
        const { width, height } = entry.contentRect;
        scaleCanvas(width, height);
      });
    });

    resizeObserver.observe(wrapper);
  });

  let gameSize = new Vector(0, 0);

  function scaleCanvas(width: number, height: number) {
    const ratio = window.devicePixelRatio || 1;

    ctx.setTransform(1, 0, 0, 1, 0, 0);
    canvasRef.width = width * ratio;
    canvasRef.height = height * ratio;
    canvasRef.style.width = width + "px";
    canvasRef.style.height = height + "px";
    gameSize = new Vector(width, height);
  }

  let frameId: number;

  function draw() {
    ctx.fillStyle = COLORS.water;
    ctx.fillRect(0, 0, canvasRef.width, canvasRef.height);

    plastics.forEach((p) => {
      ctx.fillStyle = COLORS.plastic;
      ctx.fillRect(p.position.x, p.position.y, 32, 32);
    });

    ctx.fillStyle = COLORS.raft;
    const center = getCenter();
    ctx.fillRect(center.x, center.y, 80, 80);

    if (harpoon.harpoonState === "throw") {
      ctx.fillStyle = "red";
      ctx.fillRect(harpoon.position.x, harpoon.position.y, 16, 16);
    }
    ctx.fillStyle = "black";
    ctx.fillRect(cursor.x, cursor.y, 16, 16);
  }

  let lastTime: number = 0.0;
  function update(time: number) {
    const delta = (time - lastTime) / 100;
    lastTime = time;
    draw();

    plastics.forEach((p) => {
      p.position = p.position.add(p.velocity.multiply(delta));
    });

    frameId = requestAnimationFrame(update);
  }

  function getCenter() {
    return new Vector(gameSize.x / 2, gameSize.y / 2);
  }
  onMount(() => {
    frameId = requestAnimationFrame(update);

    return () => {
      cancelAnimationFrame(frameId);
    };
  });

  const ratio = window.devicePixelRatio || 1;

  let wrapper: HTMLDivElement;
</script>

<div class="w-3/4" bind:this={wrapper}>
  <canvas
    onmousedown={(e) => {}}
    onmousemove={(e) => {
      cursor = new Vector(e.offsetX * ratio, e.offsetY * ratio);
    }}
    bind:this={canvasRef}
    class="w-full bg-red-100"
  ></canvas>
</div>
