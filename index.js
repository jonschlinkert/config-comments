'use strict';

var extract = require('esprima-extract-comments');
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
 *   - a keyword must be the first thing in a comment, and
 *   - a "commandments comment" should only have arguments to be parsed.
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

  keywords = !Array.isArray(keywords)
    ? [keywords]
    : keywords

  var re = new RegExp('\\s*(?:' + keywords.join('|') + '):([\\s\\S]+)');
  var o = {missing: [], omit: []};

  try {
    return keywords.reduce(function(acc, keyword) {
      var commands = extract.fromString(str);

      commands.forEach(function(ele) {
        var comment = ele.value.trim();

        if(new RegExp('^' + keyword).test(comment)) {
          var match = re.exec(comment);
          if (match) {
            match[1] = match[1].trim().replace(/\s*\*\/$/, '');
            acc[keyword] = minimist(match[1].split(' '), options);
          }
        }
      });
      return acc;
    }, {});
  } catch(err) {}
}
