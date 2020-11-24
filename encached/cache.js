const cache = new Map()

function get(key) {
    if (cache.has(key)) {
        return cache.get(key)
    } else {
        throw new Error(`Missing key .${key}.`)
    }
}

function put(key, value) {
    if (value) {
        cache.set(key, value)
        return { key, value }
    } else {
        throw new Error(`No value for key ${key}`)
    }
}

module.exports = { get, put }