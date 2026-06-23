/* eslint-env node */
const { fork } = require('child_process');
const path = require('path');
const logger = require('./logger');

function runStartupTasks(config) {
  try {
    const workerPath = path.join(__dirname, 'startup-worker.js');
    // Use fork so the child can communicate back via IPC with process.send()
    const child = fork(workerPath, [], {
      env: Object.assign({}, process.env, {
        STARTUP_FEE_AMOUNT: String(config.fee?.defaultAmount || ''),
        STARTUP_FEE_PERCENT: String(config.fee?.defaultPercentage || ''),
      }),
      silent: true,
    });

    // Listen for the computed fee from the worker and store it on config
    const timeout = setTimeout(() => {
      // If worker doesn't respond within 2s, kill it and proceed
      try {
        child.kill();
      } catch (e) {
        /* ignore */
      }
    }, 2000);

    child.on('message', (msg) => {
      if (msg && typeof msg.fee !== 'undefined') {
        config.computedFee = msg.fee;
        logger.info(`Default fee computed (worker): ${msg.fee}`);
      }
      clearTimeout(timeout);
      try {
        child.kill();
      } catch (e) {
        /* ignore */
      }
    });
    logger.info('Startup worker forked.');
  } catch (err) {
    logger.warn(`Failed to spawn startup worker: ${err && err.message}`);
    // Fallback: run synchronously in-process so startup still completes
    try {
      const { computeFee } = require('./fee');
      const fee = computeFee(config.fee.defaultAmount, config.fee.defaultPercentage);
      config.computedFee = fee;
      logger.info(`Default fee computed (fallback): ${fee}`);
    } catch (e) {
      logger.warn(`Fallback startup task failed: ${e && e.message}`);
    }
  }
}

module.exports = { runStartupTasks };
