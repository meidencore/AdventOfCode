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
let santaTurn = true
let santaCurrentPosition = [0,0]
let roboSantaCurrentPosition = [0,0]

for (let move of movesList) {
    
    if(santaTurn) {

        let [x,y] = santaCurrentPosition

        if (move === '>') x++ 
        else if(move === '<') x--
        else if (move === '^') y++
        else if (move === 'v') y--

        const newPosition = [x,y]
        // update the current position and the turn
        santaCurrentPosition = newPosition
        santaTurn = false

        if(!housesVisited.has(newPosition.toString())) {
            housesVisited.add(newPosition.toString())
        }

    } else {
    
        let [x,y] = roboSantaCurrentPosition

        if (move === '>') x++ 
        else if(move === '<') x--
        else if (move === '^') y++
        else if (move === 'v') y--

        const newPosition = [x,y]
        // update the current position
        roboSantaCurrentPosition = newPosition
        santaTurn = true 

        if(!housesVisited.has(newPosition.toString())) {
            housesVisited.add(newPosition.toString())
        }

    }
}

console.log(housesVisited.size)
