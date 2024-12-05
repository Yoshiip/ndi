<script lang="ts">
    import { game } from "$lib/game.svelte";

    function startGame() {
        game.currentScene = "game";
    }
</script>

<div class="fixed top-0 left-0 w-full h-dvh flex flex-col items-center justify-center space-y-4">
    <h2 class="font-bold text-3xl">Titre du jeu banger</h2>
    <button type="button" class="btn btn-primary" onclick={startGame}>
        Jouer maintenant
    </button>


    NUIT DE L'INFO 2024
</div>