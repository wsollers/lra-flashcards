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
    retryQueue: [],
    passed: 0,
    failed: 0,
    seen: 0,
    round: 1
  };
}

export function prepareNextCard(session) {
  if (session.queue.length > 0) return true;
  if (session.retryQueue.length === 0) return false;

  session.queue = shuffle(session.retryQueue);
  session.retryQueue = [];
  session.round += 1;
  return true;
}

export function passCurrent(session) {
  session.queue.shift();
  session.passed += 1;
  session.seen += 1;
}

export function failCurrent(session) {
  const failed = session.queue.shift();
  session.retryQueue.push(failed);
  session.failed += 1;
  session.seen += 1;
}
