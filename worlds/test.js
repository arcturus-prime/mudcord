var World = require("./../engine/World");
var Location = require("./../engine/Location");

let myPlanet = new World({
  guild: "402606300896165898",
  name: "My Test Planet"
})

let testLocation = new Location({ world: myPlanet, name: "My Test Location" });

testLocation.south = new Location({ world: myPlanet, name: "My Second Test Location" });

console.log(myPlanet.locations.resolve(testLocation))