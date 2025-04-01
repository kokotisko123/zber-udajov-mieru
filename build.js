
#!/usr/bin/env node
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

try {
  // Create fresh package-lock.json
  if (fs.existsSync('package-lock.json')) {
    fs.unlinkSync('package-lock.json');
    console.log('Removed existing package-lock.json');
  }
  
  if (fs.existsSync('bun.lockb')) {
    fs.unlinkSync('bun.lockb');
    console.log('Removed existing bun.lockb');
  }
  
  // Force using npm, not bun
  console.log('Installing dependencies with npm...');
  execSync('npm install --no-package-lock', { stdio: 'inherit' });
  
  // Build the project
  console.log('Building the project with npm...');
  execSync('npm run build', { stdio: 'inherit' });
  
  console.log('Build completed successfully!');
} catch (error) {
  console.error('Build failed:', error);
  process.exit(1);
}
