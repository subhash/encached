
class Cache {

    constructor() {
        this.cache = new Map()
    }
    
    get(key) {
        if (this.cache.has(key)) {
            const { value, expiry } = this.cache.get(key)
            if (expiry <= Date.now()) {
                this.evict(key)
            }
            return value
        } else {
            throw new Error(`Missing key ${key}`)
        }
    }

    put(key, value, expires = 10*60*60*1000) {
        if (value) {
            const expiry = Date.now() + expires
            this.cache.set(key, { value, expiry })
            return { key, value }
        } else {
            throw new Error(`No value for key ${key}`)
        }
    }

    evict(key) {
        if (this.cache.has(key)) {
            return this.cache.delete(key)
        } else {
            throw new Error(`Missing key ${key}`)
        }
    }
}

module.exports = { Cache, cache: new Cache() } 