const fs = require("node:fs");
const { join } = require("node:path");

const filepath = join(__dirname, "input");
const cities = [];

const distances = fs
  .readFileSync(filepath, "utf8", (err, data) => {
    if (err) {
      console.log(err);
      return;
    }
    return data;
  })
  .trim()
  .split("\n");

distances.forEach((pair) => {
  const pairArray = pair.split(" ");
  const origin = pairArray[0];
  const destination = pairArray[2];
  if (!cities.includes(origin)) cities.push(origin);
  if (!cities.includes(destination)) cities.push(destination);
});

const distanceMatrix = new Array(cities.length)
  .fill(null)
  .map(() => new Array(cities.length).fill(null));

distances.forEach((pair) => {
  const [origin, _a, destination, _b, l] = pair.split(" ");
  const distance = Number(l);

  const i = cities.indexOf(origin);
  const j = cities.indexOf(destination);

  distanceMatrix[i][j] = distance;
  distanceMatrix[j][i] = distance;
});

/**
 * @param {number[][]} matrix matrix that represent distances between cities
 * @param {number} origin start city to lookup
 * @param {number[]} [visited=[origin]] list of cities already visited
 * @param {number} [acc=0] accumulator of the maximun path
 */
function findMaxPath(matrix, origin, visited = [origin], acc = 0) {
  if (visited.length === matrix.length) return { visited, pathLength: acc };

  let max;
  let nextDestination;
  for (
    let destination = 0;
    destination < matrix[origin].length;
    destination++
  ) {
    if (visited.includes(destination)) {
      continue;
    }
    const distance = matrix[origin][destination];
    if ((!visited.includes(destination) && distance > max) || !max) {
      max = distance;
      nextDestination = destination;
    }
  }

  acc += max;
  visited.push(nextDestination);

  return findMaxPath(matrix, nextDestination, visited, acc);
}

let maxPaths = [];

for (let origin = 0; origin < distanceMatrix.length; origin++) {
  maxPaths.push(findMaxPath(distanceMatrix, origin));
}

const max = maxPaths.sort((a, b) => b.pathLength - a.pathLength);
console.log("The max lenght is :", max[0].pathLength);
