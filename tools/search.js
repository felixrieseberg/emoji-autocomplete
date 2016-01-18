'use strict';

/**
 * This is a simple CLI-like interface, mostly for manual testing. You can run it from the
 * root of the module with `npm run search {searchterm}` - try running `npm run search re`
 * to display all the matches for "re".
 */
const util = require('util');

const autocomplete = require('../src/autocomplete');
const userArgs = process.argv.slice(2);
const searchParam = userArgs[0];

const match = autocomplete.match(searchParam);
const name = autocomplete.name(searchParam);

if (match && match.length > 0) {
    console.log('Match Results:');
    console.log(util.inspect(match, {showHidden: false, depth: null}));
}

if (name) {
    console.log('Name Results:');
    console.log(name); 
}

if ((!match || match.length < 1) && (!name || name.length < 1)) {
    console.log('No results');
}