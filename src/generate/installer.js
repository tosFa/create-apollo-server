const spawn = require('cross-spawn');
const dependencies = require('../generate/dependencies');
const util = require('../util');

function installer(outputDir, cb) {
  const command = util.shouldUseYarn() ? `yarnpkg` : 'npm';
  const args = (util.shouldUseYarn() ? ['add'] : ['install', '--save', '--save-exact'])
    .concat(dependencies.production.common)
    .concat(dependencies.development.common)
    .concat(dependencies.production.subscriptions);

  process.chdir(outputDir);

  const child = spawn(command, args, { stdio: 'inherit' });

  child.on('close', code => cb(code, command, args));
}

module.exports = installer;