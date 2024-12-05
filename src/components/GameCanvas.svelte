<script lang="ts">

    import { game } from "$lib/game.svelte";
    import { onMount } from "svelte";

    let canvasRef: HTMLCanvasElement;
    let ctx: CanvasRenderingContext2D;

    let resizeObserver: ResizeObserver;



    $effect(() => {
        ctx = canvasRef.getContext('2d')!;
        
    })


    let frameId: number;


    function draw() {
        frameId = requestAnimationFrame(draw);

        ctx.fillStyle = 'blue'
        ctx.fillRect(0, 0, canvasRef.width, canvasRef.height);
        
    }

    function update() {

    }

    onMount(() => {

        frameId = requestAnimationFrame(draw);


        return () => {
            cancelAnimationFrame(frameId);
        }
    });

</script>

<canvas bind:this={canvasRef} class="w-3/4 bg-red-100" width=""></canvas>