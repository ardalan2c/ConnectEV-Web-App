export function parseVision(input: { text?: string }) {
  const t = (input.text || '').toUpperCase();
  const amps = /\b(60|70|80|90|100|110|120|125|150|175|200)A\b/.exec(t);
  const free = /(FREE SLOTS?:?\s*)(\d{1,2})/.exec(t);
  return {
    serviceAmps: amps ? parseInt(amps[1], 10) : undefined,
    freeSlots: free ? parseInt(free[2], 10) : undefined,
  };
}