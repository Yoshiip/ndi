<script>
    import { game } from "$lib/game.svelte";

    function startGame() {
        game.currentScene = "game";
    }
</script>

<button class="btn btn-primary" onclick={startGame}>
    Jouer maintenant
</button>