import {transform} from 'babel-core';
import expect from 'expect';

import babelPlugin from '../src/index';

describe('plugin', () => {
  //
  function testRequireImport(source, output, opts) {
    it('with a require statement', () => {
      const code = `var something = require("${source}");`;
      const result = transform(code, opts);
      expect(result.code).toBe(`var something = require("${output}");`);
    });
    it('with an import statement', () => {
      const code = `import something from "${source}";`;
      const result = transform(code, opts);
      expect(result.code).toBe(`import something from "${output}";`);
    });
  }

  describe('Babel Plugin', () => {
    const transformerOpts = {
      babelrc: false,
      plugins: [
        [babelPlugin, {root: ['./test/fixtures/components']}]
      ]
    };

    describe('should resolve the file path', () => {
      testRequireImport(
        'c1',
        './test/fixtures/components/c1',
        transformerOpts
      );
    });

    describe('should resolve the sub file path', () => {
      testRequireImport(
        'sub/sub1',
        './test/fixtures/components/sub/sub1',
        transformerOpts
      );
    });

    describe('should resolve the file path while keeping the extension', () => {
      testRequireImport(
        'sub/sub1.css',
        './test/fixtures/components/sub/sub1.css',
        transformerOpts
      );
    });

    describe('should resolve the file path with a filename containing a dot', () => {
      testRequireImport(
        'sub/custom.modernizr3',
        './test/fixtures/components/sub/custom.modernizr3',
        transformerOpts
      );
    });

    describe('should resolve to a file instead of a directory', () => {
      // When a file and a directory on the same level share the same name,
      // the file has priority according to the Node require mechanism
      testRequireImport(
        'bar',
        '../bar',
        {...transformerOpts, filename: './test/fixtures/foo/bar/x.js'}
      );
    });

    describe('should not resolve a path outisde of the root directory', () => {
      testRequireImport(
        'example-file',
        'example-file',
        transformerOpts
      );
    });

    describe('should resolve with basename under the regular root directory', () => {
      testRequireImport(
        './baz',
        './baz/baz',
        {...transformerOpts, filename: './test/fixtures/foo/bar/x.js'}
      );
    });

    describe('should resolve with basename under a custom root directory', () => {
      testRequireImport(
        'bar/baz',
        './baz/baz',
        {...transformerOpts, filename: './test/fixtures/foo/bar/x.js'}
      );
    });

    describe('should resolve with basename under the regular root directory', () => {
      testRequireImport(
        '../c3',
        '../c3/c3',
        {...transformerOpts, filename: './test/fixtures/components/sub/sub1.js'}
      );
    });

    describe('should not resolve with basename if an index file exists', () => {
      testRequireImport(
        '../c4',
        '../c4',
        {...transformerOpts, filename: './test/fixtures/components/sub/sub1.js'}
      );
    });
  });
});
