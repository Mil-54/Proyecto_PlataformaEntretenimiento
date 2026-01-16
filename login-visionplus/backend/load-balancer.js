const http = require('http');
const httpProxy = require('http-proxy');

// Create a proxy server with custom application logic
const proxy = httpProxy.createProxyServer({});

// Backend servers
const servers = [
    { target: 'http://localhost:3001' },
    { target: 'http://localhost:3002' }
];

let currentServer = 0;

const server = http.createServer((req, res) => {
    // Get the next server in the list
    const target = servers[currentServer];
    currentServer = (currentServer + 1) % servers.length;

    console.log(`[Load Balancer] Routing ${req.method} ${req.url} to ${target.target}`);

    // Proxy the request
    proxy.web(req, res, { target: target.target }, (error) => {
        console.error(`[Load Balancer] Error proxying to ${target.target}:`, error.message);
        res.writeHead(502, { 'Content-Type': 'text/plain' });
        res.end('Bad Gateway');
    });
});

const PORT = 3000;
console.log(`Load Balancer running on port ${PORT}`);
console.log(`Distributing traffic to: ${servers.map(s => s.target).join(', ')}`);
server.listen(PORT);
