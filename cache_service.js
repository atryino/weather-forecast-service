var NodeCache = require('node-cache');

class Cache {
  constructor(ttlSeconds) {
    this.cache = new NodeCache({ stdTTL: ttlSeconds, checkperiod: ttlSeconds * 0.2, useClones: false });
  }

  /**
   * Get cached results or save results to the cache.
   * @param {string} key 
   * @param {Function} storeFunction 
   */
  get(key, storeFunction) {
    const value = this.cache.get(key);
    if (value) {
      return Promise.resolve(value);
    }

    return storeFunction().then((result) => {
      this.cache.set(key, result);
      return result;
    });
  }
}


module.exports = Cache;
