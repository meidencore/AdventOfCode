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
console.log(stringsList)

for (let i = 0; i < stringsList.length; i++) {
    const string = stringsList[i]

    // excluyent strings
    if(string.includes("ab") || string.includes("cd") || string.includes("pq") || string.includes("xy")) {
        continue
    }

    // vowels > 3
    const hasVowels = string.match(/[aeiou]/g)
    if(!hasVowels || hasVowels && hasVowels.length < 3) {
        continue
    }
    // repetitive subtring
    let hasDoubleLetter = false
    for (let i = 1; i < string.length; i++) {
        const currentChar = string[i]
        const prevChar = string[i - 1]
        if(currentChar === prevChar) (hasDoubleLetter = true)
    }
    
    if(!hasDoubleLetter) continue

    niceString.add(string) 
}
console.log(niceString)
console.log(niceString.size)
