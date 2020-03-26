/* eslint-disable node/no-unsupported-features/node-builtins */
var path = require("path"),
  fs = require("fs");

export function ensureDirectoryExist(filePath) {
  var dirname = path.dirname(filePath);
  if (fs.existsSync(dirname)) {
    return new Promise(resolve => {
      resolve(true);
    });
  }
  return fs.promises.mkdir(dirname, { recursive: true });
}

export function ensureDirectoryWrite(filePath, file) {
  ensureDirectoryExist(filePath).then(() => {
    fs.writeFileSync(filePath, file);
  });
}
