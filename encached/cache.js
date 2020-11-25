
class Cache {

    constructor() {
        this.cache = new Map()
    }

    static sizeOf(obj) {
        if (obj) {
            switch(typeof obj) {
                case 'number': return 8
                case 'string': return obj.length * 2
                case 'boolean': return 4
                case 'object':
                    if (Array.isArray(obj)) {
                        return obj.reduce((acc, e) => acc + this.sizeOf(e), 0)
                    }
                    for (const k in obj) {
                        return this.sizeOf(k) + this.sizeOf(obj[k])
                    }
            }
        } else {
            return 0
        }
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