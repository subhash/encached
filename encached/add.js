const { cache } = require('./cache')

module.exports = (req, resp) => {
    const { params, body } = req
    const { key } = params 
    const { value } = body
    try {
        resp.json(cache.put(key, value))
    } catch(e) {
        resp.status(400).send(e.message)
    }
}