var fs = require('fs');
var commands = require('./');


var str = fs.readFileSync('fixtures/fixture.js', 'utf-8')
var fixture = commands(['abc', 'xyz'], str);
console.log(fixture)