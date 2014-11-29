/*!
 * commandments <https://github.com/jonschlinkert/commandments>
 *
 * Copyright (c) 2014 Jon Schlinkert, contributors.
 * Licensed under the MIT License
 */

'use strict';

var assert = require('assert');
var should = require('should');
var commands = require('./');

describe('commands', function () {
  it('should equal', function () {
    commands({a: 'b'}).should.eql({a: 'b'});
    commands('abc').should.equal('abc');
  });

  it('should have property.', function () {
    commands({a: 'b'}).should.have.property('a', 'b');
  });
});

