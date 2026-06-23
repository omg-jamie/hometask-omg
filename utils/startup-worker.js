/* eslint-env node */
const { computeFee } = require('./fee');
const logger = require('./logger');

function readEnvNumber(name) {
  const v = process.env[name];
  if (!v) return undefined;
  const n = Number(v);
  return Number.isFinite(n) ? n : undefined;
}

try {
  const amount = readEnvNumber('STARTUP_FEE_AMOUNT');
  const percent = readEnvNumber('STARTUP_FEE_PERCENT');
  const fee = computeFee(amount, percent);
  // Intentionally quiet on success to avoid noisy logs in detached worker
  // Keep the variable referenced so linters won't complain.
  void fee;
} catch (err) {
  logger.warn(`Startup worker failed: ${err && err.message}`);
}

// Ensure the worker exits promptly
process.exit(0);
