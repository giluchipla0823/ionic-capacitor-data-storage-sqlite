import { Inject, Injectable } from '@angular/core';
import { StorageAdapter } from './storage-adapter.interface';
import { Platform } from '@ionic/angular';
import { DataStorageSqliteService } from './data-storage-sqlite.service';
import { LocalForageService } from './local-forage.service';
import { API_URL, STORAGE_ADAPTER_SERVICE } from '../app.module';

export type ApiCacheResponse<T> = {
  createdAt?: number | null;
  expiredAt?: number | null;
  data: T;
};

// Expire time in seconds (1 hour)
const TTL = 60 * 60;

// Prefix Key to identify only cached API data
const PREFIX_CACHE_KEY = '_api_cached_';

@Injectable({
  providedIn: 'root',
})
export class StorageApiService {
  constructor(
    @Inject(STORAGE_ADAPTER_SERVICE)
    private storageAdapterService: StorageAdapter
  ) {}

  init(): Promise<void> {
    return this.storageAdapterService.init();
  }

  async get<T>(key: string): Promise<ApiCacheResponse<T> | null> {
    key = `${PREFIX_CACHE_KEY}${key}`;

    const storedValue: any = this.storageAdapterService.get(key);

    if (!storedValue) {
      return null;
    }

    const currentTime = new Date().getTime();

    const { expiredAt } = storedValue;

    if (expiredAt < currentTime) {
      await this.storageAdapterService.remove(key);

      return null;
    }

    return storedValue;
  }

  set(key: string, value: any): Promise<void> {
    const createdAt = new Date().getTime();
    const expiredAt = createdAt + TTL * 1000;

    key = `${PREFIX_CACHE_KEY}${key}`;

    return this.storageAdapterService.set(key, {
      createdAt,
      expiredAt,
      data: value,
    });
  }

  clear(): Promise<void> {
    return this.clearByPrefixKey();
  }

  clearByPrefixKey(): Promise<void> {
    return this.storageAdapterService.clearByPrefixKey(PREFIX_CACHE_KEY);
  }

  remove(key: string): Promise<void> {
    key = `${PREFIX_CACHE_KEY}${key}`;

    return this.storageAdapterService.remove(key);
  }
}
