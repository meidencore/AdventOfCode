const fs = require('node:fs');
const path = require('node:path');

const filepath = path.join(__dirname, 'input')

// Generate Instruction Detail Object

const instructionsList = fs.readFileSync(filepath, "utf-8", (err, data) => {
    if(err) {
        console.log(err)
        return;
    } 
    return data 
}).trim().split('\n').map(instruction => {

    if (instruction.startsWith('turn')) {
        instruction = instruction.slice(5)
    }

    const instructionArray = instruction.split(' ')

    const action = instructionArray[0]
    const start = instructionArray[1].split(',').map(Number)
    const finish = instructionArray[3].split(',').map(Number)

    return instructionDetail = {action, start, finish}
})

// Create the ligthMatrix

const LightMatrix = new Array(1000).fill([]).map((arr) => (arr = new Array(1000).fill(0)))

// Proccess the instructions

for (let instruction of instructionsList) {
    const { action, start, finish } = instruction

    for (let i = start[0]; i <= finish[0]; i++) {
        for (let j = start[1]; j <= finish[1]; j++) {
            
            if (action === 'on') LightMatrix[i][j] = 1
            else if (action === 'off') LightMatrix[i][j] = 0
            else LightMatrix[i][j] === 1 ? LightMatrix[i][j] = 0 : LightMatrix[i][j] = 1
        }
    }
}

const ligthsOn = LightMatrix.reduce((total, column, index) => {
    const ColumSum = column.reduce((sum, value) => sum + value)
    console.log(`the total sum of the column ${index} is ${ColumSum}`)
    return total + ColumSum
}, 0)
console.log(LightMatrix[1])
console.log(ligthsOn)
