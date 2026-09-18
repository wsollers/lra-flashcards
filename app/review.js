export function shuffle(items) {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export function createSession(cards) {
  return {
    queue: shuffle(cards.map(card => card.id)),
    passed: 0,
    failed: 0,
    seen: 0
  };
}

export function passCurrent(session) {
  session.queue.shift();
  session.passed += 1;
  session.seen += 1;
}

export function failCurrent(session) {
  const failed = session.queue.shift();
  const insertAt = Math.min(3, session.queue.length);
  session.queue.splice(insertAt, 0, failed);
  session.failed += 1;
  session.seen += 1;
}