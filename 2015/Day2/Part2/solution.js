const fs = require('node:fs');
const path = require('node:path');

const filepath = path.join(__dirname, 'input')

const dimensionsList = fs.readFileSync(filepath, "utf-8", (err, data) => {
    if(err) {
        console.log(err)
        return;
    } 
    return data 
}).trim().split('\n').map(dimensions => dimensions.split("x").map(Number))

let totalRibbon = 0

for (let dimensions of dimensionsList) {
    const [l,w,h] = dimensions
    const volume = l * w * h
    const [x,y] = dimensions.sort((a,b) => a - b) 
    const shorterPerimeter = 2*x + 2*y
    totalRibbon += volume + shorterPerimeter
}

console.log(totalRibbon)

