const { get } = require('./cache')

module.exports = (req, resp) => {
    const { query } = req
    const { key } = query
    const ret = JSON.stringify(get(key))
    resp.send(ret)
}