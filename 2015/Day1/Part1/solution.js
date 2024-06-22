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

const moveUp = movesList.match(/\(/g).length
const moveDown = movesList.length - moveUp

const finalFloor = moveUp - moveDown
console.log(finalFloor)
console.log(moveUp)
console.log(moveDown)
