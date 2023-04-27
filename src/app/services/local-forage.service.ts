import localForage from 'localforage';
import { StorageAdapter } from './storage-adapter.interface';

export class LocalForageService implements StorageAdapter {
  private storage!: LocalForage;

  constructor() {}

  init(): Promise<void> {
    this.storage = localForage.createInstance({
      name: '_localforage_storage_api',
      driver: [localForage.INDEXEDDB, localForage.LOCALSTORAGE],
      storeName: '_ionic_storage_api',
    });

    return Promise.resolve();
  }

  async get(key: string): Promise<any> {
    return await this.storage.getItem(key);
  }

  async set(key: string, value: any): Promise<void> {
    await this.storage.setItem(key, value);
  }

  remove(key: string): Promise<void> {
    return this.storage.removeItem(key);
  }

  async clearByPrefixKey(prefixKey: string): Promise<void> {
    const keys = await this.storage.keys();

    Promise.all(
      keys.map(async (key) => {
        if (key.startsWith(prefixKey)) {
          await this.storage.removeItem(key);
        }

        return Promise.resolve(true);
      })
    );
  }

  clear(): Promise<void> {
    return this.storage.clear();
  }
}
