# Emoji Autocomplete
<a href="https://travis-ci.org/felixrieseberg/emoji-autocomplete"><img src="https://travis-ci.org/felixrieseberg/emoji-autocomplete.svg?branch=master" /></a> <a href="http://badge.fury.io/js/emoji-autocomplete"><img src="https://badge.fury.io/js/emoji-autocomplete.svg" alt="npm version" height="18"></a> <a href="https://david-dm.org/felixrieseberg/emoji-autocomplete"><img src="https://david-dm.org/felixrieseberg/emoji-autocomplete.svg" alt="dependencies" height="18px"></a> <img src="https://img.shields.io/npm/dm/emoji-autocomplete.svg" height="18px" />

:card_index: A small Node Library with zero production dependencies, turning words into emojis (turn rent into :house: :money_with_wings:). The API is quite simple:

### Find Emoji using a search term
```JS
var autocomplete = require('emoji-autocomplete');

var matchedEmoji = autocomplete.match('rent');
```

The result will be:
```JS
[ComplexEmoji {
    name: 'rent',
    emoji: '🏠💸',
    isComplex: true,
    content: [
        Emoji { name: 'house', emoji: '🏠' },
        Emoji { name: 'money_with_wings', emoji: '💸' }
    ]
}]
```

This also works with 'simple' Emoji, consisting of only one Emoji:
```JS
var autocomplete = require('emoji-autocomplete');

var matchedEmoji = autocomplete.match('turtle');
```

The result will be:
```JS
[Emoji {
    name: 'turtle', 
    emoji: '🐢' 
}]
```

### Find the Name for an Emoji
```JS
var autocomplete = require('emoji-autocomplete');

var matchedEmoji = autocomplete.name('🏠');
```

The result will be:
```JS
Emoji { 
    name: 'house',
    emoji: '🏠'
}
```

## CLI Tools
This script comes with a few CLI tools for developers:

 * `npm run search SEARCHTERM` - Search for an Emoji
 * `npm run add NAME EMOJI` - Add a new Emoji Combination
 * `npm run test` - Run Unit Tests
 * `npm run parse` - Execute the Parser, turning `source.js` into the JSON-file used by this package

### License
MIT. For details, please consult `LICENSE`.