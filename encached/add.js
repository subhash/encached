const { cache } = require('./cache')

module.exports = (req, resp) => {
    const { query, body } = req
    const { key } = { ...query, ...body }
    const { value } = body
    resp.json(cache.put(key, value))
}