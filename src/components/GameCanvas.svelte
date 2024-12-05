<script lang="ts">
  import { COLORS } from "$lib/colors";
  import { game } from "$lib/game.svelte";
  import Vector from "$lib/Vector";
  import { onMount } from "svelte";

  let canvasRef: HTMLCanvasElement;
  let ctx: CanvasRenderingContext2D;

  let resizeObserver: ResizeObserver;

  interface Plastic {
    position: Vector;
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
      });
    }

    resizeObserver = new ResizeObserver((entries) => {
      console.log("hey");
      entries.forEach((entry) => {
        const { width, height } = entry.contentRect;
        scaleCanvas(width, height);
      });
    });

    resizeObserver.observe(wrapper);
  });

  function scaleCanvas(width: number, height: number) {
    const ratio = window.devicePixelRatio || 1;

    console.log(width);
    console.log(height);

    ctx.setTransform(1, 0, 0, 1, 0, 0);
    canvasRef.width = width * ratio;
    canvasRef.height = height * ratio;
    ctx.scale(ratio, ratio);
    canvasRef.style.width = width + "px";
    canvasRef.style.height = height + "px";
  }

  let frameId: number;

  function draw() {
    frameId = requestAnimationFrame(draw);

    ctx.fillStyle = COLORS.water;
    ctx.fillRect(0, 0, canvasRef.width, canvasRef.height);

    plastics.forEach((p) => {
      ctx.fillStyle = COLORS.plastic;
      ctx.fillRect(p.position.x, p.position.y, 32, 32);
    });
  }

  function update() {
    plastics.forEach((p) => {
      p.position.add(new Vector(0, 1));
    });
  }

  onMount(() => {
    frameId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(frameId);
    };
  });

  let wrapper: HTMLDivElement;
</script>

<div class="w-3/4" bind:this={wrapper}>
  <canvas bind:this={canvasRef} class="w-full bg-red-100"></canvas>
</div>
