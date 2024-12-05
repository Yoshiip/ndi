<script lang="ts">
    import { game, type Upgrade } from "$lib/game.svelte";
    import { getUpgradePrice } from "$lib/utils";

    type Props = {
        title: string,
        upgradeName: Upgrade,
    }

    const { title, upgradeName }: Props = $props();
    const currentLevel = game.levels[upgradeName];
    const upgradePrice = getUpgradePrice(10, currentLevel);
</script>

<div class="flex items-center justify-between space-x-2">
    <div>
        <p class="font-bold">{title}</p>
        <p class="text-xs opacity-50">Nécessite encore {upgradePrice} plastiques recyclés</p>
    </div>
    <div class="rounded bg-base-300 p-2">
        <span>0 / 10</span>
        <button type="button" class="btn btn-primary text-white min-h-0 h-auto text-xs py-1 px-2">
            +
        </button>
    </div>
</div>