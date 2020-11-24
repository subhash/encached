const cache = new Map()

const LRU = new Map()
const expiry = new Map()
const expires = 500

function get(key) {
    if (cache.has(key)) {
        const value = cache.get(key)
        if (expiry.get(key) <= Date.now()) {
            evict(key)
        }
        return value
    } else {
        throw new Error(`Missing key ${key}`)
    }
}

function put(key, value) {
    if (value) {
        cache.set(key, value)
        expiry.set(key, Date.now() + expires)
        return { key, value }
    } else {
        throw new Error(`No value for key ${key}`)
    }
}

function evict(key) {
    if (cache.has(key)) {
        return cache.delete(key)
    } else {
        throw new Error(`Missing key ${key}`)
    }
}

module.exports = { get, put, evict }