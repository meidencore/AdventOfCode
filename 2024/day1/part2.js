const fs = require("node:fs");
const path = require("node:path");

const filepath = path.join(__dirname, "input");

const firsList = [];
const secondList = [];

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

// second

let score = 0;
for (let i = 0; i < firsList.length; i++) {
  const a = firsList[i];
  let count = secondList.filter((el) => el === a).length;
  score += a * count;
}

console.log(score);
