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

let totalWrappingPapper = 0

for (let dimensions of dimensionsList) {
    const [l,w,h] = dimensions
    const totalArea = 2*l*w + 2*w*h + 2*h*l
    const [x,y] = dimensions.sort((a,b) => a - b) 
    const extraPapper = x * y
    totalWrappingPapper += totalArea + extraPapper
}

console.log(totalWrappingPapper)
