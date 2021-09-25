const DEFAULT_NAMESPACE = 'simonSays';
const NULL_STORAGE_VALUE = '{}';

// Defaults supplied t
const defaults = {
  namespace: DEFAULT_NAMESPACE,
  storage: localStorage,
};

/**
 * Convenience interface that extends the native browser Storage interface (e.g. localstorage)
 */
interface AbstractStorage extends Storage {}

type StorageConfig = {
  namespace: string;
  storage: AbstractStorage;
};

/**
 * App-specific implementation of a writer interface.
 * @member set Write JSON data to storage.
 * @member remove Deletes all JSON data in storage
 */
export interface StorageWriter {
  write: (data: { [key: string]: any }) => void;
  remove: () => void;
}

/**
 * StorageReader reads data as JSON from an object that implements AbstractStorage
 *
 * @member read Read a json object from storage
 */
export interface StorageReader {
  read: () => { [key: string]: any };
}

export interface SimonStorage extends StorageWriter, StorageReader {}

/**
 * Factory function to create a read/write API that works with data in an underlying
 * storage system. Any storage can be used provided it conforms to the AbstractStorage
 * interface, and can accept / return JSON data
 *
 * @param configs.namespace Pointer to where the JSON data willbe stored
 * @param configs.storage Object that conforms to the AbstractStorage interace
 * @returns API conforming to SimonStorage interface
 */
function storage(configs: StorageConfig = defaults): SimonStorage {
  const storageKey = configs.namespace ?? DEFAULT_NAMESPACE;
  const storageType = configs.storage ?? localStorage;

  function read() {
    const currState = storageType.getItem(storageKey) ?? NULL_STORAGE_VALUE;

    return JSON.parse(currState);
  }

  function write(data: Record<string, any>) {
    const currState = read();

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
    read,
    write,
    remove,
  };
}

export default storage;
