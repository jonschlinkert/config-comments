'use strict';

var extract = require('extract-comments');
var extend = require('extend-shallow');
var minimist = require('minimist');
var cache = {};

/**
 * Expose `commandments`
 */

module.exports = commandments;

/**
 * Pass the `keywords` to use for identifying comments that
 * should be parsed.
 *
 * **Heads up!:**
 *
 *   1. a keyword must be the first thing in a comment, and
 *   2. a "commandments comment" should only have arguments to be parsed.
 *
 * **Example:**
 *
 * ```js
 * commandments([keywords], str, opts={});
 * ```
 *
 * @param {String|Array} `keywords` Keyword(s) to identify comments to parse.
 * @param {String} `str` A string of valid javascript with comments to parse.
 * @param {Object} `options` Options to pass to [minimist]
 * @return {Object} Object of parsed arguments.
 * @api public
 */

function commandments(keywords, str, options) {
  if (!Array.isArray(keywords) && typeof keywords !== 'string') {
    throw new TypeError('commandments expects a string or array as the first argument.');
  }

  if (typeof str !== 'string') {
    throw new TypeError('commandments expects a string as the second argument.');
  }

  options = extend({silent: true}, options);
  keywords = arrayify(keywords);
  var re = makeRe(keywords);

  var comments = extract(str);
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
    res[keyword] = minimist(args, options);
  }
  return res;
}

function arrayify(val) {
  return val ? (Array.isArray(val) ? val : [val]) : [];
}

/**
 * Create regex
 */

function makeRe(arr) {
  var str = arr.join('|');
  if (cache[str]) {
    return cache[str];
  }
  var regex = new RegExp('\\s*(' + str + ')\s*:([^\n]+)');
  cache[str] = regex;
  return regex;
}
