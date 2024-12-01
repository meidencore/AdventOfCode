const fs = require("node:fs");
const path = require("node:path");

const filepath = path.join(__dirname, "input");

const firsList = [];
const secondList = [];
let distances = 0;

fs.readFileSync(filepath, "utf-8", (err, data) => {
  if (err) {
    console.log(err);
    return;
  }
  return data;
})
  .trim() // trim is used here to get rid of the \n at the end of the string
  .split("\n")
  .forEach((el) => {
    const [first, second] = el.split("   ");
    firsList.push(Number(first));
    secondList.push(Number(second));
  });

firsList.sort();
secondList.sort();

for (let i = 0; i < firsList.length; i++) {
  const a = firsList[i];
  const b = secondList[i];

  a >= b ? (distances += a - b) : (distances += b - a);
}

console.log(distances);
