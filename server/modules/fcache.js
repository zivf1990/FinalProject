class FCache {
  constructor() {
    this._memory = [];
  }

  addOne(item) {
    this._memory.push(dog);
  }

  addMany(items) {
    this._memory = this._memory.concat([...items]);
  }

  getAll() {
    return this._memory;
  }
}

module.exports = {
  cache: new FCache(),
};
