"use strict";

const glob  = require('glob');
const Mocha = require('mocha');
const mocha = new Mocha({
    reporter: 'spec'
});
const root = 'tests/';


function addFiles(mocha, files) {
    glob.sync(root + files).forEach(mocha.addFile.bind(mocha));
}

addFiles(mocha, './mocha-eslint-test.js');
// addFiles(mocha, './mocha-jscs-test.js');
addFiles(mocha, './unit/json-test.js');

mocha.run(function(failures) {
    process.on('exit', function() {
        process.exit(failures);
    });
});
