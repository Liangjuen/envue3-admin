export interface getStorageOptions {
    storage: Storage,
    key: string
}
type StateKey = string
export interface PersistenceStrategy {
    storage?: Storage,
    key?: string,
    exclude?: StateKey[]
}

export interface PersistenceOptions {
    enabled: boolean,
    strategies?: PersistenceStrategy
}