const fs = require('node:fs');
const path = require('node:path');

const filepath = path.join(__dirname, 'input')

const movesList = fs.readFileSync(filepath, "utf8", (err, data) => {
    if(err) {
        console.log(err)
        return;
    } 
    return data
}).trim()

const housesVisited = new Set(["0,0"])

let currentPosition = [0,0]

for (let move of movesList) {
    
    let [x,y] = currentPosition

    if (move === '>') x++ 
    else if(move === '<') x--
    else if (move === '^') y++
    else if (move === 'v') y--

    const newPosition = [x,y]

    if(!housesVisited.has(newPosition.toString())) {
        housesVisited.add(newPosition.toString())
    }

    // update the current position
    currentPosition = newPosition
}

console.log(housesVisited.size)
