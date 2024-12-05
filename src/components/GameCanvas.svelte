<script lang="ts">
  import { COLORS } from "$lib/colors";
  import { game } from "$lib/game.svelte";
  import Vector from "$lib/Vector";
  import { onMount } from "svelte";

  let canvasRef: HTMLCanvasElement;
  let ctx: CanvasRenderingContext2D;

  let resizeObserver: ResizeObserver;

  type HarpoonState = "default" | "throw" | "retrieve";

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
    if (!canvasRef) return;
    ctx = canvasRef.getContext("2d")!;

    setInterval(() => {
      plastics.push({
        position: new Vector(Math.random() * canvasRef.width, -32),
        velocity: new Vector(Math.random() - 0.5, 10),
      });
    }, 100);

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

    ctx.fillStyle = "red";
    ctx.fillRect(harpoon.position.x, harpoon.position.y, 16, 16);
    ctx.fillRect(harpoon.targetPosition.x, harpoon.targetPosition.y, 16, 16);
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

    console.log(harpoon.state);
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
    return new Vector(gameSize.x / 2, gameSize.y / 2);
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

  const ratio = window.devicePixelRatio || 1;

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
