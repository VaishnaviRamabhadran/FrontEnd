class EventScheduler {
  scheduleEvents(eventInput, interruptInput, currentTimestamp) {
    const events = eventInput.map((str, index) => {
      const match = str.match(/^(.*)\s+(\d+)$/);
      if (!match) throw new Error(`Invalid event input: ${str}`);
      const [, name, duration] = match;
      return { name, duration: parseInt(duration), order: index };
    });

    events.sort((a, b) =>
      a.duration == b.duration ? a.order - b.order : a.duration - b.duration,
    );

    const interrupt = interruptInput.map((str) => {
      const match = str.match(/^(.*)\s+(\d+)\s+(\d+)$/);
      if (!match) throw new Error(`Invalid interrupt input: ${str}`);
      const [, name, timestamp, duration] = match;
      return {
        name,
        timestamp: parseInt(timestamp),
        duration: parseInt(duration),
      };
    });
    interrupt.sort((a, b) => a.timestamp - b.timestamp);
    const result = [];
    let currentTime = currentTimestamp;
    let i = 0;
    events.forEach((e) => {
      let endTime = currentTime + e.duration;
      result.push(`${e.name} ${endTime}`);

      while (i < interrupt.length && interrupt[i].timestamp <= endTime) {
        endTime =
          Math.max(endTime, interrupt[i].timestamp) + interrupt[i].duration;

        result.push(`${interrupt[i].name} ${endTime}`);
        i++;
      }
      currentTime = endTime;
    });

    while (i < interrupt.length) {
      currentTime =
        Math.max(currentTime, interrupt[i].timestamp) + interrupt[i].duration;
      result.push(`${interrupt[i].name} ${currentTime}`);
    }
    return result;
  }
}

const scheduler = new EventScheduler();
const events = ["Event A 800", "Event B 600"];
const interrupts = ["Interrupt1 1629900001200 500"];
const timestamp = 1629900000000;
console.log(scheduler.scheduleEvents(events, interrupts, timestamp));
