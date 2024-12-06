<script lang="ts">
  import DialogBox from "../DialogBox.svelte";
  import GameSide from "../GameSide.svelte";
  import { events, EVENTS_MESSAGES } from "$lib/events.svelte";
</script>

<GameSide />
{#if events.currentMessageKey}
  <DialogBox text={EVENTS_MESSAGES[events.currentMessageKey]} />
{/if}
