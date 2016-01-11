"use strict";

const data    = require('./emoji-data.json');
const complex = require('./emoji-complex.json');
const names   = require('./emoji-names.json');

function _simpleMatch(input) {
    let pattern = `^(${input})|[_](${input})`;
    let rx = new RegExp(pattern);
    let output = [];
    
    for (let name of names) {
        if (rx.test(name)) output.push(name);
    }
    
    return output;
}

function _complexMatch(input) {
    let pattern = `^(${input})|[_](${input})`;
    let rx = new RegExp(pattern);
    let output = [];
    
    Object.keys(complex).forEach((key, index) => {
        if (rx.test(key)) output.push(key);
        console.log(key);
    });
    
    return output;
}

function match(input) {
    let simple = _simpleMatch(input);
    let complex = _complexMatch(input);
    let output = simple.concat(complex);
    
    return output;
}

function emoji(input) {
    return data[input];
}

module.exports = { match };