<script lang="ts">
    import { buyMachine, game } from "$lib/game.svelte";
</script>

<div class="w-full max-w-md bg-base-200 p-4">
    <h1 class="text-xl font-bold">Vos améliorations</h1>
    <p>La vie est premièrement apparue dans les océans, et les activités humaines entrainent une pollution sans précédent de ces derniers. Votre but, en tant qu'aventurier, est de récolter un maximum de déchets afin de les recycler. Le monde compte sur vous !</p>
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
