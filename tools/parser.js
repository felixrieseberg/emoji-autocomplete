'use strict';

const fs = require('fs');
const path = require('path');
const source = require('./source');

const outputData = path.join(__dirname, '..', 'json', 'emoji-data.json');
const outputNames = path.join(__dirname, '..', 'json', 'emoji-names.json');

// Helper Function
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

let data = {};
let names = [];

for (let key in source) {
    if (source.hasOwnProperty(key)) {
        let item = source[key];
        data[item[3][0]] = item[0][0];
        names.push(item[3][0]);
    }
}

let dataWriter = writeToFile(data, outputData);
let namesWriter = writeToFile(names, outputNames);

Promise.all([dataWriter, namesWriter])
    .then(() => {
        console.log('All done 👍');
    })
    .catch((err) => {
        console.log('Error 💩: ', err);
    });
