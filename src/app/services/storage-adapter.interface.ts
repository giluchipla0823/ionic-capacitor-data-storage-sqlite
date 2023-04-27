export interface StorageAdapter {
  init(): Promise<void>;
  set(key: string, value: any): Promise<void>;
  get(key: string): Promise<any>;
  clear(): Promise<void>;
  remove(key: string): Promise<void>;
  clearByPrefixKey(prefixKey: string): Promise<void>;
}
