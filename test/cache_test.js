var assert = require('assert');
describe('Cache', function() {
    const { cache, Cache } = require('../encached/cache')
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
            assert.ok(cache.put(key, 2, 500))
            setTimeout(() => {
                assert.equal(cache.get(key), 2)
                assert.throws(() => cache.get(key), Error)
                done();
            }, 1000)

        })
    });
    describe('#sizeOf', () => {
        it("should return correct size of objects", () => {
            assert.equal(Cache.sizeOf('foo'), 6)
            assert.equal(Cache.sizeOf(34), 8)
            assert.equal(Cache.sizeOf(true), 4)
            assert.equal(Cache.sizeOf([34, true]), 12)
            assert.equal(Cache.sizeOf({"foo": [34, true]}), 18)
        });
    });
    describe('#LRU', () => {
        it("should evict LRU if mem exceeds", () => {
            const smallCache = new Cache(80)
            assert.ok(smallCache.put('a', 1))
            assert.ok(smallCache.put('b', 2))
            assert.ok(smallCache.put('c', 3))
            
            assert.ok(smallCache.get('a'), 1)
            assert.ok(smallCache.get('c'), 3)
            
            // LRU kicks in
            assert.ok(smallCache.put('d', 4))
            // b gets Evicted
            assert.throws(() => smallCache.get('b'), Error)
        });
    });
    

});