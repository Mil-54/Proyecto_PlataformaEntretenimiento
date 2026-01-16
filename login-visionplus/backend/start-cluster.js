const { spawn } = require('child_process');
const path = require('path');

const runProcess = (name, command, args, env = {}) => {
    const proc = spawn(command, args, {
        stdio: 'inherit',
        shell: true,
        env: { ...process.env, ...env },
        cwd: __dirname
    });

    console.log(`[Launcher] Starting ${name}...`);

    proc.on('close', (code) => {
        console.log(`[Launcher] ${name} exited with code ${code}`);
    });

    return proc;
};

// Start Backend Server 1
runProcess('Backend-1', 'npm', ['run', 'start:prod'], { PORT: 3001 });

// Start Backend Server 2 wait a bit to avoid port conflicts during rapid startup if any binding issues
setTimeout(() => {
    runProcess('Backend-2', 'npm', ['run', 'start:prod'], { PORT: 3002 });
}, 500);

// Start Load Balancer
setTimeout(() => {
    runProcess('Load-Balancer', 'node', ['load-balancer.js']);
}, 5000);
