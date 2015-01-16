/*!
 * commandments <https://github.com/jonschlinkert/commandments>
 *
 * Copyright (c) 2014-2015, Jon Schlinkert.
 * Licensed under the MIT License
 */

'use strict';

var should = require('should');
var commands = require('./');

describe('commandments', function () {
  it('should parse arguments in line comments', function () {
    commands(['abc'], '// abc: a b c').should.have.property('abc', {'_': ['a', 'b', 'c']});
  });

  it('should parse arguments in block comments', function () {
    commands(['xyz'], '/* xyz: a b c */').should.have.property('xyz', {'_': ['a', 'b', 'c']});
  });

  it('should only parse arguments with matching keywords', function () {
    var str = 'var foo = "bar"; /* abc: a b c */\n/* xyz: a b c */';
    commands(['xyz'], str).should.have.property('xyz', {'_': ['a', 'b', 'c']});
  });

  it('should not choke when no code comments are in the string:', function () {
    var str = 'var foo = "bar";';
    commands(['xyz'], str).should.eql({});
  });

  it('should parse arguments when multiple comments have matching keywords:', function () {
    var str = '/* abc: a b c */\n/* xyz: x y z */';
    commands(['abc', 'xyz'], str).should.have.property('abc', {'_': ['a', 'b', 'c']});
    commands(['abc', 'xyz'], str).should.have.property('xyz', {'_': ['x', 'y', 'z']});
  });
});

