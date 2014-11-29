'use strict';

var extract = require('esprima-extract-comments');
var minimist = require('minimist');

module.exports = function commandments(keywords, str) {
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

  return keywords.reduce(function(acc, keyword) {
    extract.fromString(str).forEach(function(ele) {
      var comment = ele.value.trim();

      if(new RegExp('^' + keyword).test(comment)) {
        var match = re.exec(comment);
        if (match) {
          match[1] = match[1].trim().replace(/\s*\*\/$/, '');
          acc[keyword] = minimist(match[1].split(' '));
        }
      }
    });
    return acc;
  }, {});
};
