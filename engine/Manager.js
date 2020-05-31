var bot = require("./../bot");
var settings = require("./../settings");
var Base = require("./Base");

class Manager extends Base {
  constructor(world) {
    super(world);
    this.contents = {};
  }
  add(objects) {
    if (typeof objects == "array") {
      for (let x = 0; x < objects; x++) {
        this.contents[objects[x].id] = objects[x];
      }
    } else if (typeof objects == "object") {
      this.contents[objects.id] = objects;
    }
    return this.contents;
  }
  remove(objectResolvables) {
    if (typeof objectResolvables == "array") {
      for (let x = 0; x < objectResolvables; x++) {
        if (typeof objectResolvables[x] == "object") {
          delete this.contents[objectResolvables[x].id];
        } else if (typeof objectResolvables[x] == "string") {
          delete this.contents[objectResolvables[x]];
        }
      }
    } else if (typeof objectResolvables == "object") {
      delete this.contents[objectResolvables.id];
    } else if (typeof objectResolvables == "string") {
      delete this.contents[objectResolvables];
    } else if (objectResolvables == undefined) {
      this.contents = {};
    }
    return this.contents;
  }
  set(objects) {
    this.remove();
    this.add(objects);
    return this.contents;
  }
  resolve(objectResolvables) {
    if (typeof objectResolvables == "array") {
      let outputArray = [];
      for (let x = 0; x < objectResolvables; x++) {
        if (typeof objectResolvables[x] == "object") {
          outputArray.push(this.contents[objectResolvables[x].id]);
        } else if (typeof objectResolvables[x] == "string") {
          outputArray.push(this.contents[objectResolvables[x]]);
        }
      }
      return outputArray;
    } else if (typeof objectResolvables == "object") {
      return this.contents[objectResolvables.id];
    } else if (typeof objectResolvables == "string") {
      return this.contents[objectResolvables];
    } else if (objectResolvables == undefined) {
      return this.contents;
    }
  }
}

module.exports = Manager;