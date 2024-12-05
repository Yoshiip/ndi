<script lang="ts">
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
      entries.forEach((entry) => {
        const { width, height } = entry.contentRect;
        scaleCanvas(width, height);
      });
    });
  });

  function scaleCanvas(width: number, height: number) {
    const ratio = window.devicePixelRatio || 1;

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

    ctx.fillStyle = "blue";
    ctx.fillRect(0, 0, canvasRef.width, canvasRef.height);

    plastics.forEach((p) => {
      ctx.fillStyle = "white";
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
</script>

<canvas bind:this={canvasRef} class="flex-1 bg-red-100" width=""> </canvas>

<button
  class="btn btn-primary"
  onclick={() => {
    game.plasticsRecycled++;
  }}>Harpon...</button
>
