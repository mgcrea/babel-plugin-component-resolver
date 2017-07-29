import path from 'path';
import findPkg from 'find-pkg';
import {resolveSync, replaceExt, isDirectory, isFile, relativePathFromCwd, toLocalPath, toPosixPath} from './utils';

const nodePathEnv = process.env.NODE_PATH;

export default ({types: t}) => {
  //
  const isRequireCallExpression = nodePath =>
    t.isIdentifier(nodePath.node.callee, {name: 'require'})
    || (t.isMemberExpression(nodePath.node.callee) && t.isIdentifier(nodePath.node.callee.object, {name: 'require'}));

  const mapModule = (source, file, pluginOpts, cwd) => {
    let resolvedFile;
    const sourceBasename = path.basename(source);

    // Search the source basename under the regular root directory
    const fileDirname = path.dirname(file);
    if (isDirectory(path.resolve(cwd, fileDirname, source)) && !isFile(path.resolve(cwd, fileDirname, source, 'index.js'))) {
      resolvedFile = resolveSync(`./${source}/${sourceBasename}`, {basedir: path.resolve(cwd, fileDirname)});
    }

    // Search the file under the custom root directories
    const rootDirs = (pluginOpts.root || []).concat(nodePathEnv ? [nodePathEnv] : []);
    if (!resolvedFile) {
      rootDirs.some((dir) => {
        resolvedFile = resolveSync(`./${source}`, {basedir: path.resolve(cwd, dir)});
        if (!resolvedFile) {
          // Search the source basename under this custom root directory
          if (isDirectory(path.resolve(cwd, dir, source)) && !isFile(path.resolve(cwd, dir, source, 'index.js'))) {
            resolvedFile = resolveSync(`./${source}/${sourceBasename}`, {basedir: path.resolve(cwd, dir)});
          }
        }
        return !!resolvedFile;
      }, '');
    }

    if (resolvedFile) {
      // Map the source and keep its extname if the import/require had one
      const resolvedFileExtname = path.extname(resolvedFile);
      const sourceFileExtname = path.extname(source);
      const extname = resolvedFileExtname === sourceFileExtname ? resolvedFileExtname : '';
      return toLocalPath(toPosixPath(replaceExt(relativePathFromCwd(cwd, file, resolvedFile), extname)));
    }

    return null;
  };

  const transformImportCall = (nodePath, state) => {
    const module = nodePath.node.source;
    if (module && module.type === 'StringLiteral' && !state.file.$imports[module.value]) {
      const modulePath = mapModule(module.value, state.file.opts.filename, state.opts, state.file.$cwd);
      state.file.$imports[module.value] = true;
      if (modulePath) {
        nodePath.replaceWith(t.importDeclaration(nodePath.node.specifiers, t.stringLiteral(modulePath)));
      }
    }
  };

  const transformRequireCall = (nodePath, state) => {
    const module = nodePath.node.arguments[0];
    if (module && module.type === 'StringLiteral' && !state.file.$imports[module.value]) {
      const modulePath = mapModule(module.value, state.file.opts.filename, state.opts, state.file.$cwd);
      state.file.$imports[module.value] = true;
      if (modulePath) {
        nodePath.replaceWith(t.callExpression(nodePath.node.callee, [t.stringLiteral(modulePath)]));
      }
    }
  };

  return {
    pre(file) {
      const startPath = (file.opts.filename === 'unknown') ? './' : file.opts.filename;
      const pkgFile = findPkg.sync(startPath);
      file.$cwd = pkgFile ? path.dirname(pkgFile) : process.cwd();
      file.$imports = new Object(); // eslint-disable-line
    },
    visitor: {
      ImportDeclaration: {
        exit(nodePath, state) {
          return transformImportCall(nodePath, state);
        }
      },
      CallExpression: {
        exit(nodePath, state) {
          if (!isRequireCallExpression(nodePath)) {
            return;
          }
          transformRequireCall(nodePath, state);
        }
      }
    }
  };
};
