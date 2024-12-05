<script lang="ts">
  import { game } from "$lib/game.svelte";
  import Upgrade from "./Upgrade.svelte";
</script>

<div class="w-full bg-base-100 max-w-md space-y-4 p-4 text-sm">
  <h1 class="text-xl font-bold">Vos améliorations</h1>
  <p>
    La vie est premièrement apparue dans les océans, et les activités humaines
    entrainent une pollution sans précédent de ces derniers. Votre but, en tant
    qu'aventurier, est de récolter un maximum de déchets afin de les recycler.
    Le monde compte sur vous !
  </p>
  <p>Nombre de plastiques récupérés : <b>{game.rawPlastics}</b> (0%)</p>
  <p>Nombre de plastiques recyclés : <b>{game.recycledPlastics}</b> (+3/s)</p>

  <Upgrade title="Rayon" upgradeName="radius" />
  <Upgrade title="Vitesse" upgradeName="speed" />

  <hr />
</div>
