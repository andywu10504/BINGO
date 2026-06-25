const BingoStorage = {
  saveGameState(state) {
    localStorage.setItem(BingoConfig.storageKey, JSON.stringify(state));
  },

  loadGameState() {
    const raw = localStorage.getItem(BingoConfig.storageKey);

    if (!raw) {
      return null;
    }

    try {
      return JSON.parse(raw);
    } catch {
      return null;
    }
  },

  clearGameState() {
    localStorage.removeItem(BingoConfig.storageKey);
  }
};
