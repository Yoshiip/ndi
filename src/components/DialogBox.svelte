<script lang="ts">
    import { markEventAsRead } from "$lib/events.svelte";

    type Props = {
        text: string,
    }

    let { text }: Props = $props();
</script>

<div class="fixed bottom-10 left-10 rounded-sm">
    <button type="button" class="absolute top-2 right-4" onclick={markEventAsRead}>
        x
    </button>
    <div class="bg-base-100 rounded-md p-4 border-4 border-primary">
        <h1 class="font-bold">Le savais-tu ?</h1>
        <p class="text-sm w-auto max-w-[500px]">{text}</p>
    </div>
</div>