<script lang="ts">
    import { game } from "$lib/game.svelte";
    import Game from "../components/scenes/Game.svelte";
    import MainMenu from "../components/scenes/MainMenu.svelte";
</script>

{#if game.currentScene === "menu"}
    <MainMenu />
{:else if game.currentScene === "game"}
    <Game />
{/if}