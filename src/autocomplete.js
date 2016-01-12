"use strict";

const Emoji   = require('./emoji');
const data    = require('../json/emoji-data.json');
const complex = require('../json/emoji-complex.json');
const names   = require('../json/emoji-names.json');

function _escapeRegExp(str) {
    return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');
}

function _simpleMatch(input) {
    let escapedInput = _escapeRegExp(input);
    let pattern = `^(${escapedInput})|[_](${escapedInput})`;
    let rx = new RegExp(pattern);
    let outputStrings = [];
    let outputEmoji = [];
    
    for (let name of names) {
        if (rx.test(name)) outputStrings.push(name);
    }
    
    outputStrings.forEach((em) => outputEmoji.push(_simpleEmoji(em)));
    
    return outputEmoji;
}

function _complexMatch(input) {
    let escapedInput = _escapeRegExp(input);
    let pattern = `^(${escapedInput})|[_](${escapedInput})`;
    let rx = new RegExp(pattern);
    let outputStrings = [];
    let outputEmoji = [];
    
    Object.keys(complex).forEach((key, index) => {
        if (rx.test(key)) outputStrings.push(key);
    });
    
    outputStrings.forEach((em) => outputEmoji.push(_complexEmoji(em)));
    
    return outputEmoji;
}

function match(input) {
    input = input.toLowerCase();
    let simple = _simpleMatch(input);
    let complex = _complexMatch(input);
    let output = simple.concat(complex);
    
    return output;
}

function _simpleEmoji(input) {
    const em = data[input];
    
    if (em) {
        return new Emoji.Emoji(input, em);
    } else {
        return null;
    }
}

function _complexEmoji(input) {
    let content = [];
    let contentEmoji = '';
    let contentStrings = complex[input];
    
    // Not found
    if (!contentStrings) {
        return null
    };
    
    contentStrings.forEach((element) => {
        let elementEmoji = _simpleEmoji(element);
        if (elementEmoji) {
            content.push(elementEmoji)
            contentEmoji += elementEmoji.emoji;
        };
    });
    
    return new Emoji.ComplexEmoji(input, contentEmoji, content);
}

module.exports = { match };