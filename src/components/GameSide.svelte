<script lang="ts">
  import { game, MAX_PLASTIC } from "$lib/game.svelte";
  import GameCanvas from "./GameCanvas.svelte";
  import Upgrade from "./Upgrade.svelte";
</script>

<div class="drawer drawer-end lg:drawer-open h-full">
  <input id="upgrade-drawer" type="checkbox" class="drawer-toggle" />
  <div class="drawer-content">
    <GameCanvas />
    <label
      for="upgrade-drawer"
      class="btn btn-primary fixed top-4 right-4 drawer-button lg:hidden"
    >
      Améliorations
    </label>
  </div>
  <div class="drawer-side">
    <label
      for="upgrade-drawer"
      aria-label="close sidebar"
      class="drawer-overlay"
    ></label>

    <div class="w-[90%] h-full bg-base-100 max-w-md space-y-4 p-4 text-sm">
      <h1 class="text-xl font-bold">Vos améliorations</h1>
      <p>
        La vie est premièrement apparue dans les océans, et les activités
        humaines entrainent une pollution sans précédent de ces derniers. Votre
        but, en tant qu'aventurier, est de récolter un maximum de déchets afin
        de les recycler. Le monde compte sur vous !
      </p>
      <div class="flex gap-2 bg-base-200 rounded p-2 flex-col items-center">
        <div class="flex gap-2 items-center">
          <img src="/images/bottle.png" alt="bouteille" class="w-8 h-8" />
          <p>
            Nombre de plastiques récupérés: <b>{game.rawPlastics} </b>
          </p>
        </div>
        <progress
          class="progress progress-primary"
          value={game.rawPlastics / MAX_PLASTIC}
          max="1"
        ></progress>
      </div>

      <Upgrade title="Rayon" upgradeName="radius" />
      <Upgrade title="Vitesse" upgradeName="speed" />

      <hr />
    </div>
  </div>
</div>
