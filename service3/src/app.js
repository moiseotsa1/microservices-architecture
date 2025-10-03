const express = require('express');
const app = express();
const PORT = 3003;

app.use(express.json());

app.get('/health', (req, res) => {
  console.log('📋 Health check Orders Service');
  res.json({ 
    status: 'OK', 
    service: 'Service Orders',
    port: PORT,
    timestamp: new Date().toISOString()
  });
});

app.get('/orders', (req, res) => {
  console.log('📋 Récupération des commandes');
  res.json([
    { 
      id: 1, 
      userId: 1, 
      products: [{ productId: 1, quantity: 1 }], 
      total: 999.99, 
      status: 'completed',
      createdAt: '2025-10-01T10:00:00Z'
    },
    { 
      id: 2, 
      userId: 2, 
      products: [{ productId: 2, quantity: 2 }], 
      total: 1399.98, 
      status: 'pending',
      createdAt: '2025-10-02T14:30:00Z'
    }
  ]);
});

app.get('/orders/:id', (req, res) => {
  const orderId = parseInt(req.params.id);
  console.log(`📋 Recherche commande ${orderId}`);
  
  const orders = {
    1: { 
      id: 1, 
      userId: 1, 
      products: [{ productId: 1, quantity: 1 }], 
      total: 999.99, 
      status: 'completed',
      createdAt: '2025-10-01T10:00:00Z'
    },
    2: { 
      id: 2, 
      userId: 2, 
      products: [{ productId: 2, quantity: 2 }], 
      total: 1399.98, 
      status: 'pending',
      createdAt: '2025-10-02T14:30:00Z'
    }
  };
  
  const order = orders[orderId];
  if (order) {
    res.json(order);
  } else {
    res.status(404).json({ error: 'Commande non trouvée' });
  }
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Service Orders démarré sur le port ${PORT}`);
});
