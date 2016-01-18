'use strict';

const Emoji = class Emoji {
    constructor(name, emoji) {
        this.name = name;
        this.emoji = emoji;
    }
};

const ComplexEmoji = class ComplexEmoji extends Emoji {
    constructor(name, emoji, content) {
        super(name, emoji);
        this.isComplex = true;
        this.content = content;
    }
};

module.exports = { Emoji, ComplexEmoji };
