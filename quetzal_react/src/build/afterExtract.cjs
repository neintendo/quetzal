// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require('fs-extra');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');

module.exports = function (opts) {
  const { buildPath: extractPath, platform } = opts;
  console.log({ extractPath, platform });

  const destination =
    platform === 'darwin'
      ? path.join(extractPath, 'Electron.app', 'Contents', 'Resources', 'python')
      : path.join(extractPath, 'resources', 'python');

  const source = path.join(__dirname, '..', '..', '..', 'dist', 'quetzal_django');

  return new Promise((resolve, reject) => {
    fs.copy(source, destination, (err) => {
      if (err) {
        console.error('Failed to copy Django backend:', err);
        return reject(err);
      }
      fs.chmodSync(path.join(destination, 'quetzal_django'), 0o755);
      console.log('Finished Copying Python Folder to', destination);
      resolve();
    });
  });
};
