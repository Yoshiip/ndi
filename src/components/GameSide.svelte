<script lang="ts">
    import { buyMachine, game } from "$lib/game.svelte";
</script>

<div class="w-full max-w-md bg-base-200 p-4">
    <h1 class="text-xl font-bold">Vos améliorations</h1>
    <button class="btn btn-primary">Test</button>
    <p>{game.plasticsRecycled}</p>

    <h2>Machines à recycler</h2>
    <button class="btn btn-primary" onclick={buyMachine}>
        Nouvel machine
    </button>

    {#each game.machines as machine}
        {machine.level}
        <progress class="progress w-56" value="0" max="100"></progress>
    {/each}
</div>
