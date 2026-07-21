const localStorageShim = {
  getItem: () => null,
  setItem: () => {},
  removeItem: () => {},
  clear: () => {},
};

(globalThis as typeof globalThis & { localStorage: typeof localStorageShim }).localStorage = localStorageShim as unknown as typeof globalThis.localStorage;
