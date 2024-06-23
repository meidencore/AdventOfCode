const crypto = require('crypto')
const fs = require('node:fs');
const path = require('node:path');

const filepath = path.join(__dirname, 'input')

const secret = fs.readFileSync(filepath, "utf8", (err, data) => {
    if(err) {
        console.log(err)
        return;
    } 
    return data
}).trim()

for (let i = 1; i < Infinity; i++) {
    const hash = crypto.createHash('md5').update(`${secret}${String(i)}`).digest('hex')

    if(hash.startsWith('00000')) {
        console.log(i)
        console.log(hash)
        break
    }
}
