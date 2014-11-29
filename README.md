# commandments [![NPM version](https://badge.fury.io/js/commandments.svg)](http://badge.fury.io/js/commandments)

> Parse argument commands/options from code comments using esprima and minimist.

## Install
## Install with [npm](npmjs.org)

```bash
npm i commandments --save
```

## Run tests

```bash
npm test
```

## Usage

```js
var commandments = require('commandments');
```

**Example**

Given you have a file named `app.js` with some code comments (both block and line comments will work):

```js
// abc: apple kiwi grapefruit */
function foo(str) {
  return str;
}

function bar(str) {
  /* xyz: --exclude=cranberry */
  return str;
}
```

```js
var fs = require('fs');
var str = fs.readFileSync('lib/app.js', 'utf8');
var args = commandments(['abc', 'xyz'], str);
```

Results in:

```js
{ abc: { _: [ 'apple', 'kiwi', 'grapefruit' ] },
  xyz: { _: [], exclude: 'cranberry' } }
```

## API
### [commandments](index.js#L25)

* `keywords` **{String|Array}**: Keyword(s) to identify comments to parse.    
* `str` **{String}**: A string of valid javascript with comments to parse.    
* `options` **{Object}**: Options to pass to [minimist]    
* `returns` **{Object}**: Object of parsed arguments.  

Pass the `keywords` to use for identifying comments that
should be parsed. A keyword must be the first thing in a comment,
and a "commandments comment" should only have arguments to
be parsed.

## Contributing
Pull requests and stars are always welcome. For bugs and feature requests, [please create an issue](https://github.com/jonschlinkert/commandments/issues)

## Author

**Jon Schlinkert**
 
+ [github/jonschlinkert](https://github.com/jonschlinkert)
+ [twitter/jonschlinkert](http://twitter.com/jonschlinkert) 

## License
Copyright (c) 2014 Jon Schlinkert  
Released under the MIT license

***

_This file was generated by [verb](https://github.com/assemble/verb) on November 29, 2014._

[esprima]: http://esprima.org
[lodash]: http://lodash.com/
[array-differ]: https://github.com/sindresorhus/array-differ
[array-uniq]: https://github.com/sindresorhus/array-uniq
[array-union]: https://github.com/sindresorhus/array-union
[async]: https://github.com/caolan/async
[once]: https://github.com/isaacs/once
[wrappy]: https://github.com/npm/wrappy
[inflight]: https://github.com/isaacs/inflight
[inherits]: https://github.com/isaacs/inherits
[lru-cache]: https://github.com/isaacs/node-lru-cache
[sigmund]: https://github.com/isaacs/sigmund
[minimatch]: https://github.com/isaacs/minimatch
[glob]: https://github.com/isaacs/node-glob
[globby]: https://github.com/sindresorhus/globby
[normalize-path]: https://github.com/jonschlinkert/normalize-path
[relative]: https://github.com/jonschlinkert/relative
[map-files]: https://github.com/jonschlinkert/map-files
[esprima-extract-comments]: https://github.com/jonschlinkert/esprima-extract-comments
[minimist]: https://github.com/substack/minimist
