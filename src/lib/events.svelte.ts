type EventName = keyof typeof EVENTS_MESSAGES;

export const EVENTS_MESSAGES = {
    oneWaterBottle: "D'ici l'année 2050, on estime que les océans seront pollués par près d'un milliard de bouteilles en plastique !",
    tenWatterBottles: "Une bouteille prend à peu près 450 ans pour se décomposer naturellement, voire plus pour certain type de plastique."
};

export const events = $state({
    currentMessageKey: null as EventName | null,
    seenEvents: [] as EventName[],
});

export function markEventAsRead() {
    if (events.currentMessageKey) {
        events.seenEvents = [...events.seenEvents, events.currentMessageKey];
        events.currentMessageKey = null;
    }
}

export function sendEvent(name: EventName) {
    if (!events.seenEvents.includes(name)) {
        events.currentMessageKey = name;
    }
}