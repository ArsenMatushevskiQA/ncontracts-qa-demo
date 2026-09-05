// LOCAL DEMONSTRATION / MOCK API ONLY
// This is a tiny in-memory mock server for Playwright API testing.
// It is NOT part of Ncontracts infrastructure, services, databases, message queues,
// or internal systems. It is intentionally minimal and uses in-memory state
// that resets whenever the mock server restarts.

const http = require('http');
const crypto = require('crypto');
const { URL } = require('url');
const { PORT } = require('./api-config');

const checks = new Map();

const server = http.createServer((req, res) => {
  const parsed = new URL(req.url, `http://localhost:${PORT}`);
  res.setHeader('Content-Type', 'application/json');

  if (req.method === 'GET' && parsed.pathname === '/health') {
    res.writeHead(200);
    res.end(JSON.stringify({ status: 'ok' }));
    return;
  }

  if (req.method === 'POST' && parsed.pathname === '/api/compliance-checks') {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk;
    });
    req.on('end', () => {
      let data = {};
      try {
        data = JSON.parse(body);
      } catch {
        data = {};
      }

      const record = {
        id: crypto.randomUUID(),
        customerId: data.customerId,
        checkType: data.checkType,
        status: 'pending',
      };
      checks.set(record.id, record);

      res.writeHead(201);
      res.end(JSON.stringify(record));
    });
    return;
  }

  if (req.method === 'GET' && parsed.pathname.startsWith('/api/compliance-checks/')) {
    const id = parsed.pathname.split('/').pop();
    const record = checks.get(id);

    if (!record) {
      res.writeHead(404);
      res.end(JSON.stringify({ error: 'Not found' }));
      return;
    }

    res.writeHead(200);
    res.end(JSON.stringify({
      ...record,
      status: 'completed',
      result: 'compliant',
    }));
    return;
  }

  res.writeHead(404);
  res.end(JSON.stringify({ error: 'Not found' }));
});

server.listen(PORT, () => {
  console.log(`[MOCK API] Listening on http://localhost:${PORT}`);
});
