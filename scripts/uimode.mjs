#!/usr/bin/env node

/**
 * /uimode launcher — spins up the UX/UI tooling stack so contributors can follow
 * AGENTS.md without retyping the Storybook/e2e/lint commands.
 */

import { spawn } from 'node:child_process';
import process from 'node:process';

const DOC_PATH = 'docs/agents/uimode.md';
const args = new Set(process.argv.slice(2));
const skipLint = args.has('--skip-lint');
const checkOnly = args.has('--check-only') || args.has('--no-watch') || args.has('--no-watchers');

const watcherCommands = [
  {
    name: '@hive/ui Storybook',
    command: 'pnpm',
    args: ['--filter', '@hive/ui', 'storybook'],
  },
  {
    name: 'apps/e2e dev server',
    command: 'pnpm',
    args: ['dev:e2e'],
  },
];

function logHeader() {
  console.log('\n=== Hive /uimode ===');
  console.log(`Docs: ${DOC_PATH}`);
  console.log('Press Ctrl+C to exit; watchers will shut down together.\n');
}

function runCommand(name, command, commandArgs) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, commandArgs, {
      stdio: 'inherit',
      env: { ...process.env },
    });

    child.on('error', (error) => {
      reject(new Error(`${name} failed to start: ${error.message}`));
    });

    child.on('exit', (code, signal) => {
      if (signal) {
        reject(new Error(`${name} terminated via ${signal}`));
        return;
      }

      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`${name} exited with code ${code}`));
      }
    });
  });
}

function startWatcher({ name, command, args: cmdArgs }) {
  const child = spawn(command, cmdArgs, {
    stdio: 'inherit',
    env: { ...process.env },
  });

  child.once('error', (error) => {
    console.error(`[uimode] ${name} crashed: ${error.message}`);
  });

  return { name, child };
}

async function main() {
  logHeader();

  if (skipLint) {
    console.log('[uimode] Skipping pnpm lint:tokens (requested via --skip-lint).');
  } else {
    console.log('[uimode] Running pnpm lint:tokens…');
    await runCommand('pnpm lint:tokens', 'pnpm', ['lint:tokens']);
    console.log('[uimode] pnpm lint:tokens completed.\n');
  }

  if (checkOnly) {
    console.log('[uimode] Check-only mode complete. Nothing else to start.');
    return;
  }

  console.log('[uimode] Starting watchers: Storybook + apps/e2e.');
  const activeWatchers = watcherCommands.map(startWatcher);
  let shuttingDown = false;

  const shutdown = (reason) => {
    if (shuttingDown) return;
    shuttingDown = true;
    console.log(`\n[uimode] Shutting down watchers (${reason}).`);
    activeWatchers.forEach(({ child }) => {
      if (!child.killed) {
        child.kill('SIGTERM');
      }
    });
  };

  const watcherPromises = activeWatchers.map(
    ({ name, child }) =>
      new Promise((resolve, reject) => {
        child.on('exit', (code, signal) => {
          if (shuttingDown) {
            resolve();
            return;
          }

          if (signal) {
            reject(new Error(`[uimode] ${name} exited via ${signal}`));
            return;
          }

          if (code === 0) {
            // Unexpected clean exit (probably user closed the server); treat as resolve.
            resolve();
          } else {
            reject(new Error(`[uimode] ${name} exited with code ${code}`));
          }
        });
      })
  );

  const handleSignal = (signal) => {
    shutdown(signal);
  };

  process.on('SIGINT', handleSignal);
  process.on('SIGTERM', handleSignal);

  try {
    await Promise.all(watcherPromises);
  } catch (error) {
    console.error(error.message);
    shutdown('watcher-error');
    process.exitCode = 1;
  } finally {
    process.off('SIGINT', handleSignal);
    process.off('SIGTERM', handleSignal);
  }
}

main().catch((error) => {
  console.error(`[uimode] ${error.message}`);
  process.exit(1);
});
