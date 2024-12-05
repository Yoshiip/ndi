<script lang="ts">
  import {
    game,
    getUpgradePrice,
    UPGRADES_VALUES,
    type Upgrade,
  } from "$lib/game.svelte";

  type Props = {
    title: string;
    upgradeName: Upgrade;
  };

  const { title, upgradeName }: Props = $props();
</script>

{#if 1 == 1}
  {@const price = getUpgradePrice(upgradeName)}
  {@const diff = price - game.rawPlastics}

  <div class="flex items-center justify-between space-x-2">
    <div>
      <p class="font-bold">{title}</p>
      <p class="text-xs opacity-50">
        {#if diff >= 0}
          Nécessite encore {diff} plastique{diff ? "s" : ""} recyclés
        {:else}
          Disponible
        {/if}
      </p>
    </div>
    <div class="rounded bg-base-300 p-2">
      <span
        >{game.levels[upgradeName]}/{UPGRADES_VALUES[upgradeName].length}</span
      >
      <button
        type="button"
        disabled={price - game.rawPlastics >= 0 ||
          game.levels[upgradeName] >= UPGRADES_VALUES[upgradeName].length}
        class="btn btn-primary min-h-0 h-auto text-xs py-1 px-2"
        onclick={() => {
          if (game.rawPlastics - price >= 0) {
            game.rawPlastics -= price;
            game.levels[upgradeName] += 1;
          }
        }}
      >
        +
      </button>
    </div>
  </div>
{/if}
