const { FusesPlugin } = require('@electron-forge/plugin-fuses');
const { FuseV1Options, FuseVersion } = require('@electron/fuses');
const path = require('node:path');
const fs = require('node:fs');

module.exports = {
  packagerConfig: {
    asar: true,

  },
  hooks: {
    packageAfterPrune(_config, appPath) {
      const modules = fs.readdirSync(path.join(__dirname, 'node_modules')).filter(f => f !== "backend");

      for (const m of modules) {
        copyFolderRecursive(path.join(__dirname, 'node_modules', m), path.join(appPath, 'node_modules'));
      }

      copyFolderRecursive(path.join(__dirname, '..', 'backend'), path.join(appPath, 'node_modules'));
    }
  },
  rebuildConfig: {},
  makers: [
    {
      name: '@electron-forge/maker-squirrel',
      config: {},
    },
    {
      name: '@electron-forge/maker-zip',
      platforms: ['darwin'],
    },
    {
      name: '@electron-forge/maker-deb',
      config: {},
    },
    {
      name: '@electron-forge/maker-rpm',
      config: {},
    },
  ],
  plugins: [
    {
      name: '@electron-forge/plugin-auto-unpack-natives',
      config: {},
    },
    // Fuses are used to enable/disable various Electron functionality
    // at package time, before code signing the application
    new FusesPlugin({
      version: FuseVersion.V1,
      [FuseV1Options.RunAsNode]: false,
      [FuseV1Options.EnableCookieEncryption]: true,
      [FuseV1Options.EnableNodeOptionsEnvironmentVariable]: false,
      [FuseV1Options.EnableNodeCliInspectArguments]: false,
      [FuseV1Options.EnableEmbeddedAsarIntegrityValidation]: true,
      [FuseV1Options.OnlyLoadAppFromAsar]: true,
    }),
  ],
};


function copyFolderRecursive(source, target) {
  const targetFolder = path.join(target, path.basename(source));

  if (!fs.existsSync(targetFolder)) {
    fs.mkdirSync(targetFolder);
  }

  if (fs.lstatSync(source).isDirectory()) {
    const files = fs.readdirSync(source);

    for (const file of files) {
      const curSource = path.join(source, file);
      if (fs.lstatSync(curSource).isDirectory()) {
        copyFolderRecursive(curSource, targetFolder);
      } else {
        copyFileSync(curSource, targetFolder);
      }
    }
  }

  function copyFileSync(source, target) {

    let targetFile = target;

    if (fs.existsSync(target) && fs.lstatSync(target).isDirectory()) {
      targetFile = path.join(target, path.basename(source));
    }

    fs.copyFileSync(source, targetFile);
  }
}
