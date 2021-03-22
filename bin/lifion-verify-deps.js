#!/usr/bin/env node

'use strict';

const argv = require('minimist')(process.argv.slice(2));

const verifyDeps = require('../lib');
const { name } = require('../package.json');

if (argv.help) {
  console.log(
    [
      '',
      `Usage: ${name} [options]`,
      '',
      'Checks existing dependencies for available updates',
      '',
      'Options:',
      '--help             Display this help message and exit',
      '-pre --pre-release Include pre-release dependencies',
      '-u --auto-upgrade  Automatically run all suggested upgrades'
    ].join('\n')
  );
  return;
}

async function run() {
  const autoUpgrade = argv['auto-upgrade'] || argv.u;
  const includePreReleaseDependencies = argv['pre-release'] || argv.pre;
  try {
    await verifyDeps({ autoUpgrade, dir: process.cwd(), includePreReleaseDependencies });
    process.exit(0);
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
}

run();
