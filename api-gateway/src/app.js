const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const app = express();
const PORT = 8080;

// Middleware CORS pour autoriser le frontend
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:4000');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.use(express.json());

app.get('/health', (req, res) => {
  console.log('🔧 Health check API Gateway');
  res.json({ 
    status: 'OK', 
    gateway: 'healthy',
    services: ['users', 'products', 'orders', 'payments', 'notifications'],
    timestamp: new Date().toISOString()
  });
});

app.get('/', (req, res) => {
  res.json({
    message: '🚀 API Gateway opérationnel!',
    endpoints: {
      health: '/health',
      users: '/api/users',
      products: '/api/products',
      orders: '/api/orders',
      payments: '/api/payments',
      notifications: '/api/notifications'
    }
  });
});

// Proxies avec gestion d'erreur
const proxyOptions = {
  changeOrigin: true,
  pathRewrite: { '^/api/[^/]+': '/' },
  onError: (err, req, res) => {
    console.error('Proxy error:', err.message);
    res.status(503).json({ error: 'Service temporarily unavailable' });
  }
};

app.use('/api/users', createProxyMiddleware({
  ...proxyOptions,
  target: 'http://service1:3001'
}));

app.use('/api/products', createProxyMiddleware({
  ...proxyOptions,
  target: 'http://service2:3002'
}));

app.use('/api/orders', createProxyMiddleware({
  ...proxyOptions,
  target: 'http://service3:3003'
}));

app.use('/api/payments', createProxyMiddleware({
  ...proxyOptions,
  target: 'http://service4:3004'
}));

app.use('/api/notifications', createProxyMiddleware({
  ...proxyOptions,
  target: 'http://service5:3005'
}));

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 API Gateway démarré sur le port ${PORT}`);
  console.log('📍 CORS activé pour le frontend');
});
