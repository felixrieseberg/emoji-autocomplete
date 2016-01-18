'use strict';

const fs           = require('fs');
const path         = require('path');
const complex      = require('../json/emoji-complex.json');
const autocomplete = require('../src/autocomplete');

const userArgs     = process.argv.slice(2);
const newName      = userArgs[0];
const newEmojis    = userArgs[1];

const outputData = path.join(__dirname, '..', 'json', 'emoji-complex.json');

// Helper Functions
function getNames(input) {
    let names = [];
    let split = input.split(/([\uD800-\uDBFF][\uDC00-\uDFFF])/);

    for (let i = 0; i < split.length; i++) {
        let char = split[i];
        if (char !== '') {
            let currentName = autocomplete.name(char).name;
            names.push(currentName);
        }
    }

    return names;
}

function writeToFile(input, file) {
    return new Promise((resolve, reject) => {
        fs.writeFile(file, JSON.stringify(input), (err) => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
}

function appendNewComplex(name, emojiNames) {
    let clonedData = {};

    if (complex[name] !== undefined) {
        return clonedData;
    }

    for (let key in complex) {
        if (complex.hasOwnProperty(key)) {
            clonedData[key] = complex[key];
        }
    }

    clonedData[name] = emojiNames;

    return clonedData;
}

if (newName && newEmojis) {
    let newNames = getNames(newEmojis);
    let newData = appendNewComplex(newName, newNames);


    writeToFile(newData, outputData).then(() => {
        console.log(`${newName} with sub-emoji ${newNames} added`);
    });
} else {
    console.log('Insufficient parameters! Usage: npm run add {name} {emojis}');
}
