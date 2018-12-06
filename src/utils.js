import {lstatSync} from 'fs';
import resolve from 'resolve';
import path from 'path';

const defaultBabelExtensions = ['.js', '.jsx', '.es', '.es6', '.ts'];

export const toPosixPath = modulePath => modulePath.replace(/\\/g, '/');

export const toLocalPath = p => (p[0] !== '.' ? `./${p}` : p);

export const replaceExt = (p, ext) => {
  const filename = path.basename(p, path.extname(p)) + ext;
  return path.join(path.dirname(p), filename);
};

export const toAbsolutePath = (cwd, filename) => (path.isAbsolute(filename) ? filename : path.resolve(cwd, filename));

export const relativePathFromCwd = (cwd, source, target) => {
  const from = toAbsolutePath(cwd, path.dirname(source));
  const to = toAbsolutePath(cwd, path.normalize(target));
  // return path.relative(from, to);
  const relative = path.relative(from, to);
  return toPosixPath(relative);
};

export const resolveSync = (filepath, {basedir, extensions = defaultBabelExtensions}) => {
  try {
    return resolve.sync(filepath, {basedir, extensions});
  } catch (e) {
    return false;
  }
};

export const isDirectory = (filepath) => {
  try {
    return lstatSync(filepath).isDirectory();
  } catch (err) {
    return false;
  }
};

export const isFile = (filepath) => {
  try {
    return lstatSync(filepath).isFile();
  } catch (err) {
    return false;
  }
};
