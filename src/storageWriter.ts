const DEFAULT_NAMESPACE = 'simonSays';
const NULL_STORAGE_VALUE = '{}';

const defaults = {
  namespace: DEFAULT_NAMESPACE,
  storage: localStorage,
};

interface AbstractStorage extends Storage {}
type StorageConfig = {
  namespace: string;
  storage: AbstractStorage;
};

export interface StorageWriter {
  get: () => Record<string, any>;
  set: (data: Record<string, any>) => void;
  remove: () => void;
}

// todo this should probably be initialized with a default state...

function storageWriter(configs: StorageConfig = defaults) {
  const storageKey = configs.namespace ?? DEFAULT_NAMESPACE;
  const storageType = configs.storage ?? localStorage;

  function get() {
    const currState = storageType.getItem(storageKey) ?? NULL_STORAGE_VALUE;

    return JSON.parse(currState);
  }
  function set(data: Record<string, any>) {
    const currState = get();
    debugger;
    storageType.setItem(
      storageKey,
      JSON.stringify({
        ...currState,
        ...data,
      })
    );
  }

  function remove() {
    storageType.removeItem(storageKey);
  }

  return {
    get,
    set,
    remove,
  };
}

export default storageWriter;
