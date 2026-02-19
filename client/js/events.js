export let eventBuffer = [];

export function emitEvent(type, data = {}) {

  const event = {
    event_type: type,
    timestamp: new Date().toISOString(),
    ...data
  };

  eventBuffer.push(event);

  console.log("Event:", event);
}

export async function sendEventsToServer() {

  try {

    await fetch("https://cognitive-reflex-analyzer.onrender.com/api/events", {

      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(eventBuffer)
    });

    console.log("Events sent to server");

  } catch(err) {

    console.error("Error sending events:", err);
  }
}
