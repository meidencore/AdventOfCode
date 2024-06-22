const fs = require('node:fs');
const path = require('node:path');

const filepath = path.join(__dirname, 'input')

const movesList = fs.readFileSync(filepath, "utf-8", (err, data) => {
    if(err) {
        console.log(err)
        return;
    } 
    return data
}).trim() // trim is used here to get rid of the \n at the end of the string

let basementPositionEntrance
let floor = 0

for (let i = 0; i < movesList.length - 1; i++) {
    const move = movesList[i]
    const position = i + 1
    if(move === "\(") floor++
    else floor--

    if(floor === -1) {
        basementPositionEntrance = position
        break
    }
}

console.log(basementPositionEntrance)
