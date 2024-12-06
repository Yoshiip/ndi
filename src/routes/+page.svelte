<script lang="ts">
  import { game } from "$lib/game.svelte";
  import Game from "../components/scenes/Game.svelte";
  import MainMenu from "../components/scenes/MainMenu.svelte";
</script>

{#if game.currentScene === "menu"}
  <MainMenu />
{:else if game.currentScene === "game"}
  <Game />
{:else}
  <div
    class="fixed top-0 left-0 w-full h-dvh flex flex-col items-center justify-center space-y-8"
  >
    <h2 class="font-bold text-3xl">Bravo!</h2>
    <p class="text-center">
      Vous avez nettoyé l'océan! <br />À l'échelle de chaque individu il est
      simple de grandes actions!
    </p>
    <button
      class="btn btn-primary"
      onclick={() => {
        game.currentScene = "menu";
      }}
    >
      Retour au menu
    </button>
  </div>
{/if}
