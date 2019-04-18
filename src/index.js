require = require('esm')(module/*, options*/); // jshint ignore:line
const showdown = require('./showdown.js');
console.log(showdown.default);

module.exports = showdown.default;
