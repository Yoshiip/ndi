<script lang="ts">
  import { buyMachine, game } from "$lib/game.svelte";
</script>

<div class="w-full bg-base-100 max-w-md space-y-4 p-4 text-white text-sm">
  <h1 class="text-xl font-bold">Vos améliorations</h1>
  <p>
    La vie est premièrement apparue dans les océans, et les activités humaines
    entrainent une pollution sans précédent de ces derniers. Votre but, en tant
    qu'aventurier, est de récolter un maximum de déchets afin de les recycler.
    Le monde compte sur vous !
  </p>
  <p>Nombre de plastiques récupérés : <b>{game.rawPlastics}</b> (0%)</p>
  <p>Nombre de plastiques recyclés : <b>{game.recycledPlastics}</b> (+3/s)</p>

  <div class="flex items-center justify-between space-x-2">
    <div>
      <p class="font-bold">Augmenter la vitesse du radeau</p>
      <p class="text-xs opacity-50">Nécessite encore 256 plastiques recyclés</p>
    </div>
    <div class="rounded bg-base-300 p-2">
      <span>0 / 10</span>
      <button type="button" class="btn btn-primary text-white min-h-0 h-auto text-xs py-1 px-2">
        +
      </button>
    </div>
  </div>

  <hr />

  <h2>Machines à recycler</h2>
  <button class="btn btn-primary" onclick={buyMachine}> Nouvel machine </button>

  {#each game.machines as machine}
    {machine.level}
    <progress class="progress w-56" value="0" max="100"></progress>
  {/each}
</div>