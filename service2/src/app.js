const express = require('express');
const app = express();
const PORT = 3002;

app.use(express.json());

app.get('/health', (req, res) => {
  console.log('📦 Health check Products Service');
  res.json({ 
    status: 'OK', 
    service: 'Service Products',
    port: PORT,
    timestamp: new Date().toISOString()
  });
});

app.get('/products', (req, res) => {
  console.log('📦 Récupération des produits');
  res.json([
    { id: 1, name: 'Laptop', price: 999.99, category: 'Electronics' },
    { id: 2, name: 'Smartphone', price: 699.99, category: 'Electronics' },
    { id: 3, name: 'Desk Chair', price: 199.99, category: 'Furniture' }
  ]);
});

app.get('/products/:id', (req, res) => {
  const productId = parseInt(req.params.id);
  console.log(`📦 Recherche produit ${productId}`);
  
  const products = {
    1: { id: 1, name: 'Laptop', price: 999.99, category: 'Electronics' },
    2: { id: 2, name: 'Smartphone', price: 699.99, category: 'Electronics' },
    3: { id: 3, name: 'Desk Chair', price: 199.99, category: 'Furniture' }
  };
  
  const product = products[productId];
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ error: 'Produit non trouvé' });
  }
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Service Products démarré sur le port ${PORT}`);
});
