const request = require('supertest');
const server = require('../server');
const assert = require('assert');

describe('GET /encached/fetch?key=', () => {
    it('should error on invalid key', async () => {
        const res = await request(server)
            .get(`/encached/fetch?key=goo`)
        assert.equal(res.statusCode, 400)
        assert.equal(res.text, "Missing key goo")
    });
})
describe('POST /encached/add?key=', () => {
    it('should add and fetch an item', async () => {
        const res = await request(server)
            .post(`/encached/add?key=goo`)
            .send({ value: 2 })
        assert.equal(res.statusCode, 200)
        assert.equal(res.text, JSON.stringify({ key: 'goo', value: 2}))
    });
})