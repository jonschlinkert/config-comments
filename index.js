'use strict';

var extract = require('esprima-extract-comments');
var extend = require('extend-shallow');
var minimist = require('minimist');

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
  keywords = !Array.isArray(keywords) ? [keywords] : keywords;
  var re = makeRe(keywords);

  try {
    return keywords.reduce(function(acc, keyword) {
      var commands = extract.fromString(str);

      commands.forEach(function(ele) {
        var comment = ele.value.trim();

        if(comment.indexOf(keyword) === 0) {
          var match = re.exec(comment);
          if (match) {
            match[1] = match[1].trim().replace(/\s*\*\/$/, '');
            acc[keyword] = minimist(match[1].split(/[ \t]/), options);
          }
        }
      });
      return acc;
    }, {});

  } catch(err) {
    if (options.silent === false) throw err;
  }
}

/**
 * RegExp cache
 */

var regex, cache;

function makeRe(arr) {
  var str = arr.join('|');
  cache = cache || str;

  if (cache !== str) {
    regex = null;
    cache = str;
  }

  if (regex instanceof RegExp) {
    return regex;
  }

  regex = new RegExp('\\s*(?:' + str + '):([\\s\\S]*)');
  return regex;
}
