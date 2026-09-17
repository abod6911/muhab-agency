import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const distDir = path.join(rootDir, 'dist');

console.log('🚀 Starting safe production deployment to GitHub Pages...');

// 1. Verify dist exists and is compiled
const indexPath = path.join(distDir, 'index.html');
if (!fs.existsSync(indexPath)) {
  console.error('❌ Error: dist/index.html not found! Run npm run build first.');
  process.exit(1);
}

const htmlContent = fs.readFileSync(indexPath, 'utf8');
if (htmlContent.includes('/src/main.tsx')) {
  console.error('❌ CRITICAL ERROR: dist/index.html contains uncompiled /src/main.tsx! Aborting deployment.');
  process.exit(1);
}

// 2. Ensure .nojekyll exists
const noJekyllPath = path.join(distDir, '.nojekyll');
if (!fs.existsSync(noJekyllPath)) {
  fs.writeFileSync(noJekyllPath, '');
  console.log('✓ Created .nojekyll');
}

// 3. Ensure 404.html exists for SPA routing
const notFoundPath = path.join(distDir, '404.html');
if (!fs.existsSync(notFoundPath)) {
  fs.copyFileSync(indexPath, notFoundPath);
  console.log('✓ Created 404.html');
}

try {
  // 4. Stage dist contents
  console.log('📦 Staging dist directory...');
  execSync('git add -f dist', { cwd: rootDir, stdio: 'inherit' });

  // 5. Create git tree from dist
  const treeHash = execSync('git write-tree --prefix=dist', { cwd: rootDir }).toString().trim();
  console.log(`✓ Tree created from dist: ${treeHash}`);

  // 6. Get origin/gh-pages parent if exists
  let parentArg = '';
  try {
    const parentCommit = execSync('git rev-parse origin/gh-pages', { cwd: rootDir }).toString().trim();
    if (parentCommit) {
      parentArg = `-p ${parentCommit}`;
      console.log(`✓ Parent commit on origin/gh-pages: ${parentCommit.slice(0, 7)}`);
    }
  } catch (e) {
    console.log('ℹ No remote origin/gh-pages commit found, creating root commit.');
  }

  // 7. Create commit object
  const message = `deploy: production build with compiled assets [${new Date().toISOString()}]`;
  const commitCommand = `git commit-tree ${treeHash} ${parentArg} -m "${message}"`;
  const newCommit = execSync(commitCommand, { cwd: rootDir }).toString().trim();
  console.log(`✓ Created deploy commit: ${newCommit.slice(0, 7)}`);

  // 8. Push to origin and studio remotes
  console.log('📤 Pushing to origin/gh-pages...');
  execSync(`git push origin ${newCommit}:refs/heads/gh-pages --force`, { cwd: rootDir, stdio: 'inherit' });

  try {
    console.log('📤 Pushing to studio/gh-pages...');
    execSync(`git push studio ${newCommit}:refs/heads/gh-pages --force`, { cwd: rootDir, stdio: 'inherit' });
  } catch (e) {
    console.warn('⚠️ Note: Push to studio remote had warning/error:', e.message);
  }

  // 9. Unstage dist
  execSync('git reset HEAD dist', { cwd: rootDir, stdio: 'ignore' });
  console.log('🎉 Successfully deployed compiled production site to GitHub Pages!');
} catch (err) {
  try {
    execSync('git reset HEAD dist', { cwd: rootDir, stdio: 'ignore' });
  } catch (_) {}
  console.error('❌ Deployment failed:', err.message);
  process.exit(1);
}
