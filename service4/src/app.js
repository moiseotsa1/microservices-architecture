const express = require('express');
const app = express();
const PORT = 3004;

app.use(express.json());

app.get('/health', (req, res) => {
  console.log('💳 Health check Payments Service');
  res.json({ 
    status: 'OK', 
    service: 'Service Payments',
    port: PORT,
    timestamp: new Date().toISOString()
  });
});

app.get('/payments', (req, res) => {
  console.log('💳 Récupération des paiements');
  res.json([
    { 
      id: 1, 
      orderId: 1, 
      amount: 999.99, 
      method: 'credit_card', 
      status: 'completed',
      processedAt: '2025-10-01T10:05:00Z'
    },
    { 
      id: 2, 
      orderId: 2, 
      amount: 1399.98, 
      method: 'paypal', 
      status: 'pending',
      processedAt: '2025-10-02T14:35:00Z'
    }
  ]);
});

app.get('/payments/:id', (req, res) => {
  const paymentId = parseInt(req.params.id);
  console.log(`💳 Recherche paiement ${paymentId}`);
  
  const payments = {
    1: { 
      id: 1, 
      orderId: 1, 
      amount: 999.99, 
      method: 'credit_card', 
      status: 'completed',
      processedAt: '2025-10-01T10:05:00Z'
    },
    2: { 
      id: 2, 
      orderId: 2, 
      amount: 1399.98, 
      method: 'paypal', 
      status: 'pending',
      processedAt: '2025-10-02T14:35:00Z'
    }
  };
  
  const payment = payments[paymentId];
  if (payment) {
    res.json(payment);
  } else {
    res.status(404).json({ error: 'Paiement non trouvé' });
  }
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Service Payments démarré sur le port ${PORT}`);
});
