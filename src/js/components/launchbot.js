export default class Launchbot {
  constructor(config) {
    this.options = config.options;
    this.sets = config.sets;
  }


  // Get a complete set (id starts at 1)
  //
  // Valid args:
  // obj = {id: 1};
  // obj = {name: 'First Set Name'};
  // obj = {id: 1, name: 'First Set Name'};
  getSet(obj) {
    const { id, name } = obj;

    if (Number.isInteger(id)) {
      const searchedSet = this.sets[id - 1];
      if (searchedSet) return searchedSet;
      throw new Error(`
        No set with the id "${id}" exists.
        Id’s start at 1, you have ${this.sets.length} configured.
      `);
    }

    if (name) {
      const searchedSet = this.sets.find(set => set.name.toLowerCase() === name.toLowerCase());
      if (searchedSet) return searchedSet;
      throw new Error(`No set with the name "${name}" exists.`);
    }

    throw new Error(`
      No set found. Required object format (one property is enough):
      {id: 1, name: 'First Set Name'}
    `);
  }


  getAllSets() {
    return this.sets;
  }


  openSet(i) {
    const { items } = this.sets[i];
    items.forEach(item => window.open(item));
  }
}
