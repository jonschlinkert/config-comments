'use strict';

var extract = require('extract-comments');
var extend = require('extend-shallow');
var minimist = require('minimist');
var cache = {};

module.exports = function(keywords, str, options) {
  if (!Array.isArray(keywords) && typeof keywords !== 'string') {
    throw new TypeError('expected string or array as the first argument.');
  }

  if (typeof str !== 'string') {
    throw new TypeError('expected a string as the second argument.');
  }

  var opts = extend({silent: true}, options);
  keywords = arrayify(keywords);
  var re = makeRe(keywords);

  var comments = extract(str, opts);
  var len = comments.length;
  var idx = -1;
  var res = {};

  while (++idx < len) {
    var comment = comments[idx];
    var value = comment.value.trim();

    if (!re.test(value)) {
      continue;
    }

    var match = re.exec(value);
    if (!match) continue;

    var keyword = match[1];
    var args = match[2].trim().split(/\s+/);
    res[keyword] = minimist(args, opts);
  }
  return res;
};

function arrayify(val) {
  return val ? (Array.isArray(val) ? val : [val]) : [];
}

/**
 * Create regex
 */

function makeRe(arr) {
  var str = arr.join('|');
  if (cache[str]) return cache[str];
  var regex = new RegExp('^[ \\t]*(' + str + ')\s*:([^\n]+)');
  cache[str] = regex;
  return regex;
}
