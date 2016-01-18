'use strict';

const Emoji   = require('./emoji');
const data    = require('../json/emoji-data.json');
const complex = require('../json/emoji-complex.json');
const names   = require('../json/emoji-names.json');

// Helper Functions

function _escapeRegExp(str) {
    return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');
}

function _simpleEmoji(input) {
    const em = data[input];

    if (em) {
        return new Emoji.Emoji(input, em);
    }

    return null;
}

function _complexEmoji(input) {
    let content = [];
    let contentEmoji = '';
    let contentStrings = complex[input];

    // Not found
    if (!contentStrings) {
        return null;
    }

    contentStrings.forEach((element) => {
        let elementEmoji = _simpleEmoji(element);

        if (elementEmoji) {
            content.push(elementEmoji);
            contentEmoji += elementEmoji.emoji;
        }
    });

    return new Emoji.ComplexEmoji(input, contentEmoji, content);
}

function _simpleMatch(input) {
    let escapedInput = _escapeRegExp(input);
    let pattern = `^(${escapedInput})|[_](${escapedInput})`;
    let rx = new RegExp(pattern);
    let outputStrings = [];
    let outputEmoji = [];

    for (let elementName of names) {
        if (rx.test(elementName)) {
            outputStrings.push(elementName);
        }
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

    Object.keys(complex).forEach((key) => {
        if (rx.test(key)) {
            outputStrings.push(key);
        }
    });

    outputStrings.forEach((em) => outputEmoji.push(_complexEmoji(em)));

    return outputEmoji;
}

// Exported Functions

function match(input) {
    let lowerInput = input.toLowerCase();
    let simpleMatch = _simpleMatch(lowerInput);
    let complexMatch = _complexMatch(lowerInput);
    let output = simpleMatch.concat(complexMatch);

    return output;
}

function name(input) {
    let output;

    Object.keys(data).forEach((key) => {
        if (data[key] === input) {
            output = new Emoji.Emoji(key, data[key]);
        }
    });

    return output;
}

module.exports = { match, name };
