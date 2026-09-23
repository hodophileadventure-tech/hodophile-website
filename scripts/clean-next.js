const fs = require('fs');
const path = require('path');

const projectRoot = path.resolve(__dirname, '..');
const nextDir = path.join(projectRoot, '.next');

if (fs.existsSync(nextDir)) {
  fs.rmSync(nextDir, { recursive: true, force: true });
  console.log('Cleared stale .next cache before starting Next.js dev server.');
} else {
  console.log('No stale .next cache found; starting Next.js dev server.');
}
