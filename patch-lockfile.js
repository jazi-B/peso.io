const fs = require('fs');
const path = 'node_modules/proper-lockfile/lib/lockfile.js';

try {
    let content = fs.readFileSync(path, 'utf8');
    content = content.replace("const onExit = require('signal-exit');", "const val = require('signal-exit'); const onExit = val.onExit || val;");
    fs.writeFileSync(path, content);
    console.log('Patched proper-lockfile successfully.');
} catch (e) {
    console.error('Failed to patch:', e);
}
