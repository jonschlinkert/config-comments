'use strict';

var extract = require('esprima-extract-comments');
var minimist = require('minimist');

module.exports = function commendments(keywords, str) {
  var o = {missing: [], omit: []};

  keywords = !Array.isArray(keywords)
    ? [keywords]
    : keywords

  var id = keywords.join('|');
  var re = new RegExp('\\s*(?:' + id + '):([^\\*]+)');
  if (!str) {
    return [];
  }

  var comments = extract.fromString(str);
  var commands = {};

  keywords.forEach(function(keyword) {
    comments.forEach(function(ele) {
      var comment = ele.value.trim();

      if(new RegExp('^' + keyword).test(comment)) {
        var match = re.exec(comment);
        if (match != null) {
          commands[keyword] = minimist(match[1].trim().split(' '));
        }
      }
    })
  });

  return commands;
};
