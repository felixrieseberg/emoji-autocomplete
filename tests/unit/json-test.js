"use strict";

const expect        = require('../helpers/expect');
const complex       = require('../../json/emoji-complex.json');
const data          = require('../../json/emoji-data.json');

describe('complex emojis', () => {
    it('should all reference existing simple emojis', () => {
        let notFound = false;

        for (let element in complex) {
            if (complex.hasOwnProperty(element)) {
                complex[element].forEach((value) => {
                    if (data[value] === undefined) {
                        console.log('Emoji not found: ' + value);
                        notFound = true;
                    }
                })
            }
        }
        
        return expect(notFound).to.be.false;
    });
});