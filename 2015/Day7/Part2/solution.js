const fs = require('node:fs');
const path = require('node:path');

const filepath = path.join(__dirname, 'input')
const aSignal = 16076
const wiresValues = {}
const wireToWire = {}
const gateToWire = {}
// Generate Instruction Detail Object
const instructionsList = fs.readFileSync(filepath, "utf-8", (err, data) => {
    if(err) {
        console.log(err)
        return;
    } 
    return data 
}).trim()
    .split('\n').forEach(instruction => {

    const splittedInstruction = instruction.split(" ")

    // values assignation
    if (splittedInstruction.length === 3 && !isNaN(splittedInstruction[0])) {
        let [signal, to, wire] = splittedInstruction
        signal = Number(signal)
        wiresValues[wire] = signal
    }

    // singular wire to wire assignment
    if (splittedInstruction.length === 3 && isNaN(splittedInstruction[0])) {
        let [carry, to, reciever] = splittedInstruction
        wireToWire[reciever] = {op:null, moveValue:null, carry}
    }
    if (splittedInstruction.length === 4) {
        const [op, carry, to, reciever] = splittedInstruction
        wireToWire[reciever]= {op, moveValue: null, carry}
    }
    if (splittedInstruction.length === 5 && (splittedInstruction[1] === 'RSHIFT' || splittedInstruction[1] === 'LSHIFT')) {
        const [carry, op, moveValue, to, reciever] = splittedInstruction
        wireToWire[reciever] = {op, moveValue: Number(moveValue), carry}
    }

    // gate to wire assignment
    if (splittedInstruction.length === 5 && (splittedInstruction[1] === 'AND' || splittedInstruction[1] === 'OR')) {
        const [carry1, op, carry2, to, reciever] = splittedInstruction
        gateToWire[reciever] = {carry1, carry2, op}
    }
})

wiresValues.b = aSignal
console.log(wireToWire)
console.log(wiresValues)
console.log(gateToWire)

function findSignalOfWire(wire) {
    // look on the wireValues
    if (wiresValues[wire]) {
        console.log(`wire ${wire} signal is: ${wiresValues[wire]}`)
        return wiresValues[wire]
    }

    // look for single assigment
    if (wireToWire[wire]) {
        const b16 = new Uint16Array(3)
        let [value, carry] = b16
        switch (wireToWire[wire].op) {
            case 'LSHIFT':
                carry = findSignalOfWire(wireToWire[wire].carry)
                value = carry << wireToWire[wire].moveValue & 0xFFFF
                console.log(`wire ${wire} signal is: ${value}`)
                wiresValues[wire] = value
                delete wireToWire[wire]
                break
            case 'RSHIFT':
                carry = findSignalOfWire(wireToWire[wire].carry)
                value = carry >> wireToWire[wire].moveValue
                console.log(`wire ${wire} signal is: ${value}`)
                wiresValues[wire] = value
                delete wireToWire[wire]
                break
            case 'NOT':
                value = 65535 - findSignalOfWire(wireToWire[wire].carry)
                console.log(`wire ${wire} signal is: ${value}`)
                wiresValues[wire] = value
                delete wireToWire[wire]
                break
            case null:
                value = findSignalOfWire(wireToWire[wire].carry)
                console.log(`wire ${wire} signal is: ${value}`)
                wiresValues[wire] = value
                delete wireToWire[wire]
                break
        }
        return value
    }

    // look for gate assigment
    if (gateToWire[wire]) {
        const b16 = new Uint16Array(3)
        let [value, carry1, carry2] = b16
        switch (gateToWire[wire].op) {
            case 'AND':
                carry1 = isNaN(gateToWire[wire].carry1) ? findSignalOfWire(gateToWire[wire].carry1) : Number(gateToWire[wire].carry1)
                carry2 = isNaN(gateToWire[wire].carry2) ? findSignalOfWire(gateToWire[wire].carry2) : Number(gateToWire[wire].carry2)
                value = carry1 & carry2
                console.log(`wire ${wire} signal is: ${value}`)
                wiresValues[wire] = value
                delete gateToWire[wire]
                break
            case 'OR':
                carry1 = isNaN(gateToWire[wire].carry1) ? findSignalOfWire(gateToWire[wire].carry1) : Number(gateToWire[wire].carry1)
                carry2 = isNaN(gateToWire[wire].carry2) ? findSignalOfWire(gateToWire[wire].carry2) : Number(gateToWire[wire].carry2)
                value = carry1 | carry2
                console.log(`wire ${wire} signal is: ${value}`)
                wiresValues[wire] = value
                delete gateToWire[wire]
                break
        }
        return value
    }
}


console.log(wireToWire)
console.log(wiresValues)
console.log(gateToWire)

function findInstructionOfReciever(wire) {
    console.log(wiresValues[wire])
    console.log(wireToWire[wire])
    console.log(gateToWire[wire])
}

findInstructionOfReciever('a')
findSignalOfWire('a')

