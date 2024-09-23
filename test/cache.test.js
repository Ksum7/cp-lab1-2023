import { Cache } from "../src/cache";

describe('Cache', () => {

    let cache;

    beforeEach(() => {
        cache = new Cache();
    });

    test('stores and retrieves value', () => {
        cache.setCache('a', 100);
        expect(cache['a']).toBe(100);
        expect(cache['a']).toBe(null);
    });

    test('handles multiple accesses', () => {
        cache.setCache('a', 100, 3);
        expect(cache['a']).toBe(100);
        expect(cache['a']).toBe(100);
        expect(cache['a']).toBe(100);
        expect(cache['a']).toBe(null);
    });

    test('returns null for missing key', () => {
        expect(cache['b']).toBe(null);
    });

    test('clears value after max accesses', () => {
        cache.setCache('a', 200, 2);
        expect(cache['a']).toBe(200);
        expect(cache['a']).toBe(200);
        expect(cache['a']).toBe(null);
    });

    test('handles multiple keys', () => {
        cache.setCache('a', 100, 2);
        cache.setCache('b', 200, 3);
        expect(cache['a']).toBe(100);
        expect(cache['a']).toBe(100);
        expect(cache['a']).toBe(null);
        expect(cache['b']).toBe(200);
        expect(cache['b']).toBe(200);
        expect(cache['b']).toBe(200);
        expect(cache['b']).toBe(null);
    });

    test('logs accesses', () => {
        cache.setCache('a', 300, 2);
        cache['a'];
        cache['a'];
        const log = cache.log;
        expect(log.length).toBe(2);
        expect(log[0]).toEqual({ key: 'a', value: 300, remainingAccesses: 1 });
        expect(log[1]).toEqual({ key: 'a', value: 300, remainingAccesses: 0 });
    });

    test('logs when key is deleted', () => {
        cache.setCache('x', 500, 1);
        cache['x'];
        const log = cache.log;
        expect(log.length).toBe(1);
        expect(log[0]).toEqual({ key: 'x', value: 500, remainingAccesses: 0 });
    });

    test('default access count is 1', () => {
        cache.setCache('y', 400);
        expect(cache['y']).toBe(400);
        expect(cache['y']).toBe(null);
    });

    test('removes value after accesses', () => {
        cache.setCache('z', 600, 2);
        expect(cache['z']).toBe(600);
        expect(cache['z']).toBe(600);
        expect(cache['z']).toBe(null);
    });

    test('overwrites value and access count', () => {
        cache.setCache('a', 100, 2);
        expect(cache['a']).toBe(100);
        cache.setCache('a', 200, 3);
        expect(cache['a']).toBe(200);
        expect(cache['a']).toBe(200);
        expect(cache['a']).toBe(200);
        expect(cache['a']).toBe(null);
    });
});
