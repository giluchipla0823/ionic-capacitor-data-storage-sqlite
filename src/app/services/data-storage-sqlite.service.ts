import {
  CapacitorDataStorageSqlite,
  CapacitorDataStorageSqlitePlugin,
  capOpenStorageOptions,
} from 'capacitor-data-storage-sqlite';
import { StorageAdapter } from './storage-adapter.interface';

export class DataStorageSqliteService implements StorageAdapter {
  storage!: CapacitorDataStorageSqlitePlugin;

  constructor() {}

  async init(): Promise<void> {
    this.storage = CapacitorDataStorageSqlite;

    const options: capOpenStorageOptions = {
      database: 'db_sqlite_storage_api',
    };

    try {
      await this.storage.openStore(options);
    } catch (err) {
      console.log('Error initialising capacitor-data-storage-sqlite.');
    }
  }

  async get(key: string): Promise<any> {
    const { value } = await this.storage.get({ key });

    if (!value) {
      return null;
    }

    return JSON.parse(value);
  }

  set(key: string, value: any): Promise<void> {
    return this.storage.set({ key, value: JSON.stringify(value) });
  }

  remove(key: string): Promise<void> {
    return this.storage.remove({ key });
  }

  async clearByPrefixKey(prefixKey: string): Promise<void> {
    const { keys = [] } = await this.storage.keys();

    Promise.all(
      keys.map(async (key) => {
        if (key.startsWith(prefixKey)) {
          await this.storage.remove({ key });
        }

        return Promise.resolve(true);
      })
    );
  }

  clear(): Promise<void> {
    return this.storage.clear();
  }
}
