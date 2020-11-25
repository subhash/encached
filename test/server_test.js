const request = require('supertest');
const server = require('../server');
const assert = require('assert');

describe('GET /encached/:key', () => {
    it('should error on invalid key', async () => {
        const res = await request(server)
            .get(`/encached/goo`)
        assert.equal(res.statusCode, 400)
        assert.equal(res.text, "Missing key goo")
    });
})

describe('PUT /encached/:key', () => {
    it('should add an item', async () => {
        const res = await request(server)
            .put(`/encached/goo`)
            .send({ value: 2 })
        assert.equal(res.statusCode, 200)
        assert.equal(res.text, JSON.stringify({ key: 'goo', value: 2}))
        
        const res2 = await request(server)
            .get(`/encached/goo`)
        assert.equal(res2.statusCode, 200)
        assert.equal(res2.text, 2)
    });
})

describe('DELETE /encached/:key', () => {
    it('should remove an item', async () => {
        const res = await request(server)
            .delete(`/encached/goo`)
        assert.equal(res.statusCode, 200)
        
        const res2 = await request(server)
            .get(`/encached/goo`)
        assert.equal(res2.statusCode, 400)
        assert.equal(res2.text, "Missing key goo")
    });
})