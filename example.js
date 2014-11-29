var fs = require('fs');
var comments = require('./');

function read(fp) {
  return fs.readFileSync(fp, 'utf-8');
}

var fixture = comments(['deps', 'lint'], read('fixture.js'));
console.log(fixture)