/**
 * 状态持久化插件
 * 
 */

import type { PiniaPluginContext } from 'pinia'
import type {
    getStorageOptions,
    PersistenceStrategy,
    PersistenceOptions
} from './type.js'
import 'pinia'

declare module 'pinia' {
    export interface DefineStoreOptionsBase<S, Store> {
        persisten?: PersistenceOptions
    }
}

type Store = PiniaPluginContext['store']

const defaultStorage: Storage = sessionStorage
const __piniaKey__: Symbol = Symbol('PiniaPersistence')
const getKey = (str: string) => `${__piniaKey__} - ${str}`

export const updateStore = (strategy: PersistenceStrategy, store: Store) => {
    const storage = strategy.storage || sessionStorage
    const storeKey = strategy.key || getKey(store.$id)
    if (strategy.exclude) {
        let storageObj: { [propName: string]: any } = {}
        for (let key in store.$state) {
            if (!strategy.exclude.includes(key)) storageObj[key] = store.$state[key]
        }
        storage.setItem(storeKey, JSON.stringify(storageObj))
    }
}

export const getStore = (options: getStorageOptions) => {
    const { storage, key } = options
    return (JSON.parse(storage.getItem(key) as string) || {})
}

export default ({ options, store }: PiniaPluginContext) => {
    if (options.persisten?.enabled) {
        const strategies = options.persisten?.strategies ? options.persisten?.strategies : {}
        const strategy: PersistenceStrategy = {
            storage: strategies.storage || defaultStorage,
            key: strategies.key || getKey(store.$id),
            exclude: strategies.exclude || []
        }
        let _data = getStore({ storage: strategy.storage as Storage, key: strategy.key as string })
        const data = store.$state
        for (let key in _data) {
            data[key] = _data[key]
        }

        store.$subscribe(() => {
            updateStore(strategy, store)
        })
        return { ...data }
    }
}