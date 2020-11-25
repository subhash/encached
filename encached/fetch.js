const { cache } = require('./cache')

module.exports = (req, resp) => {
    const { params } = req
    const { key } = params
    try {
        const ret = JSON.stringify(cache.get(key))
        resp.send(ret)
    } catch(e) {
        resp.status(400).send(e.message)
    }
}