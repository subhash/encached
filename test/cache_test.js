var assert = require('assert');
describe('Cache', function() {
    const cache = require('../encached/cache')
    const items = {
        "item1": 2,
        "item2": "abc",
        "item3": {"foo": "bar"}
    }
    describe('#put', function() {
        it('should put items', function() {
            for (i in items) {
                assert.ok(cache.put(i, items[i]))
            }
        });
        it('should throw error for undefined values', () => {
            assert.throws(() => cache.put("foo", null), Error)
            assert.throws(() => cache.put("foo"), Error)
        });
    });
    describe('#get', function() {
        it('should get items', function() {
            for (i in items) {
                assert.equal(cache.get(i), items[i]);
            }
        });
        it('should throw error for missing keys', () => {
            assert.throws(() => cache.get("foo"), Error)
        });
    });
    describe('#evict', function() {
        it('should evict item', function() {
            const key = Object.keys(items)[0]
            assert.ok(cache.evict(key))
            assert.throws(() => cache.get(key), Error)
        });
    });
    describe('#expiry', () => {
        it("should expire item", (done) => {
            const key = "foo"
            assert.ok(cache.put(key, 2))
            setTimeout(() => {
                assert.equal(cache.get(key), 2)
                assert.throws(() => cache.get(key), Error)
                done();
            }, 1000)

        })
    });
    

});