'use strict';

var extend = require('extend-shallow');
var minimist = require('minimist');
var re = /(?:^|\s)(?:\/\*(?!\*?\/)([\s\S]+?)\*\/)/;

function extract(str) {
  str = str.replace(/\r/, '');
  var matches = [];
  var match;

  while (match = re.exec(str)) {
    var comment = match[1];
    if (comment) {
      comment = comment.trim();
      if (comment[0] !== '!') {
        matches.push(comment.replace(/\*\s*/, ''));
      }
    }
    str = str.replace(match[0], '');
  }

  return matches;
}

module.exports = function comments(keywords, str) {
  var o = {missing: [], omit: []};

  keywords = !Array.isArray(keywords)
    ? [keywords]
    : keywords

  var id = keywords.join('|');
  var re = new RegExp('\\s*(?:' + id + '):([\\s\\S]+)');
  if (!str) {
    return [];
  }

  var commands = {};

  keywords.forEach(function(key) {
    extract(str).forEach(function(comment) {
      if(new RegExp('^' + key).test(comment)) {
        var match = re.exec(comment);
        if (match != null) {
          commands[key] = minimist(match[1].trim().split(' '));
        }
      }
    });
  });

  return commands;
};
