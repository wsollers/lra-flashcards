const STATS_KEY = "lra-flashcards-stats-v1";

export function loadStats() {
  try {
    return JSON.parse(localStorage.getItem(STATS_KEY)) || {};
  } catch {
    return {};
  }
}

export function saveStats(stats) {
  localStorage.setItem(STATS_KEY, JSON.stringify(stats));
}

export function recordResult(stats, cardId, result) {
  const current = stats[cardId] || {
    seen: 0,
    passed: 0,
    failed: 0,
    lastSeen: null
  };

  current.seen += 1;
  if (result === "pass") current.passed += 1;
  if (result === "fail") current.failed += 1;
  current.lastSeen = new Date().toISOString();

  stats[cardId] = current;
  saveStats(stats);
}

export function resetStats() {
  localStorage.removeItem(STATS_KEY);
}