const { cache } = require('./cache')

module.exports = (req, resp) => {
    const { params } = req
    const { key } = params 
    try {
        resp.json(cache.evict(key))
    } catch(e) {
        resp.status(400).send(e.message)
    }
}