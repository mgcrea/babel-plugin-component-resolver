# Babel Component Resolver Plugin

[![npm version](https://img.shields.io/npm/v/babel-plugin-component-resolver.svg)](https://www.npmjs.com/package/babel-plugin-component-resolver)
![status](https://img.shields.io/badge/status-deprecated-red.svg)

**🚧 This module is deprecated and not maintained anymore 🚧**

**Please use [babel-plugin-directory-resolver](https://github.com/mgcrea/babel-plugin-directory-resolver) instead.**

## Readme

Babel plugin to resolve components based on their dirname when an index file is not present.

Let you drop `index.js` files when you only want to export a single file for a component.

Useful for React with CSS modules, where you end up with one folder per component (.js & .css).

Also enables extra root folders (think `NODE_PATH`) to look for exotic resolves.

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
        "transform-object-rest-spread", "component-resolver"]
      ]
    }
    ```

1. The `root` option allows you to specify additional root folders to resolve files.

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

1. By default, the `NODE_PATH` env var will be processed to look for exotic resolves.

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
