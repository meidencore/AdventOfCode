const fs = require('node:fs');
const path = require('node:path');

const filepath = path.join(__dirname, 'input')

const stringsList = fs.readFileSync(filepath, "utf-8", (err, data) => {
    if(err) {
        console.log(err)
        return;
    } 
    return data 
}).trim().split('\n')

const niceString = new Set()

for (let i = 0; i < stringsList.length; i++) {
    const string = stringsList[i]

    // repetitive double pairSubtring
    let hasDoublePair = false
    for (let i = 1; i < string.length - 2; i++) {

        const pair = string[i - 1] + string[i]
        const uncheckedString = string.slice(i + 1) 

        if(uncheckedString.includes(pair)) {
            hasDoublePair = true
            break
        }
    }

    if(!hasDoublePair) continue

    // repeat inbetween letter
    let hasInbetweenRepeatLetter = false
    for (let i = 1; i < string.length - 1; i++) {
        const prevChar = string[i - 1]
        const nextChar = string[i + 1]
        if(prevChar === nextChar) {
            hasInbetweenRepeatLetter = true
            break
        }
    }
    if(!hasInbetweenRepeatLetter) continue

    niceString.add(string) 
}

console.log(niceString)
console.log(niceString.size)
