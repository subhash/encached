const { cache } = require('./cache')

module.exports = (req, resp) => {
    const { query } = req
    const { key } = query
    const ret = JSON.stringify(cache.get(key))
    resp.send(ret)
}