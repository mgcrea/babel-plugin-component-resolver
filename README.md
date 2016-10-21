# Babel Component Resolver Plugin

[![project status](https://img.shields.io/badge/status-stable-green.svg?style=flat)](https://github.com/mgcrea/babel-plugin-component-resolver) [![license](https://img.shields.io/github/license/mgcrea/babel-plugin-component-resolver.svg?style=flat)](https://tldrlegal.com/license/mit-license) [![build status](http://img.shields.io/travis/mgcrea/babel-plugin-component-resolver/master.svg?style=flat)](http://travis-ci.org/mgcrea/babel-plugin-component-resolver) [![dependencies status](https://img.shields.io/david/mgcrea/babel-plugin-component-resolver.svg?style=flat)](https://david-dm.org/mgcrea/babel-plugin-component-resolver) [![devDependencies status](https://img.shields.io/david/dev/mgcrea/babel-plugin-component-resolver.svg?style=flat)](https://david-dm.org/mgcrea/babel-plugin-component-resolver#info=devDependencies) [![coverage status](http://img.shields.io/codeclimate/coverage/github/mgcrea/babel-plugin-component-resolver.svg?style=flat)](https://codeclimate.com/github/mgcrea/babel-plugin-component-resolver) [![climate status](https://img.shields.io/codeclimate/github/mgcrea/babel-plugin-component-resolver.svg?style=flat)](https://codeclimate.com/github/mgcrea/babel-plugin-component-resolver)

Babel plugin to resolve components based on their dirname when an index file is not present.

Let you drop `index.js` files when you only want to export one file/component:

## Usage

When you require a folder:

```js
import BarComponent from './BarComponent';
```

You usually have to use an `index.js` file as an export proxy:

```
├── BarComponent
│   ├── BarComponent.js
│   └── index.js
```

With this plugin, you can clean up the structure and have working directory imports:

```
├── BarComponent
│   └── BarComponent.js
```

### Quickstart

```
npm i --save-dev babel-plugin-component-resolver
```

1. Add the plugin to your `.babelrc`

    ```js
    {
      "plugins": [
        "transform-object-rest-spread",
        ["component-resolver", {
          "root": ["./src"]
        }]
      ]
    }
    ```

### Available scripts

| **Script** | **Description** |
|----------|-------|
| start | Alias of test:watch |
| test | Run mocha unit tests |
| test:watch | Run and watch mocha unit tests |
| lint | Run eslint static tests |
| compile | Compile the library |
| compile:watch | Compile and watch the library |


## Authors

**Olivier Louvignes**

+ http://olouv.com
+ http://github.com/mgcrea

Implementation inspired by [babel-plugin-module-resolver](https://github.com/tleunen/babel-plugin-module-resolver) by [@tleunen](https://github.com/tleunen)

## License

```
The MIT License

Copyright (c) 2016 Olivier Louvignes

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
```
