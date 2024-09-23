class Cache {
    constructor() {
        this.cache = {};
        this.log = [];

        return new Proxy(this, {
            get: (target, prop) => {
                if (prop in target) {
                    return target[prop];
                }

                return target.getCache(prop);
            }
        });
    }

    setCache(key, value, accessCount = 1) {
        this.cache[key] = {
            value,
            accessCount
        };
    }

    getCache(key) {
        const entry = this.cache[key];

        if (!entry || entry.accessCount <= 0) {
            return null;
        }

        entry.accessCount -= 1;

        this.log.push({
            key,
            value: entry.value,
            remainingAccesses: entry.accessCount
        });

        if (entry.accessCount <= 0) {
            delete this.cache[key];
        }

        return entry.value;
    }
}
export { Cache }