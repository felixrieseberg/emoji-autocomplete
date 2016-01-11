/** 
 * This is a simple CLI-like interface, mostly for manual testing. You can run it from the
 * root of the module with `npm run search {searchterm}` - try running `npm run search re`
 * to display all the matches for "re".
 */
const autocomplete = require('./src/autocomplete');

const userArgs = process.argv.slice(2);
const searchParam = userArgs[0];

console.log(autocomplete.match(searchParam));