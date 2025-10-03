const express = require('express');
const app = express();
const PORT = 3001;

// Middleware basique
app.use(express.json());

// Route santé - pour vérifier que le service tourne
app.get('/health', (req, res) => {
  console.log('✅ Health check appelé');
  res.json({ 
    status: 'OK', 
    service: 'Service Users',
    port: PORT,
    timestamp: new Date().toISOString()
  });
});

// Route simple pour les utilisateurs
app.get('/users', (req, res) => {
  console.log('📝 Récupération des utilisateurs');
  res.json([
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com' }
  ]);
});

// Route pour un utilisateur spécifique
app.get('/users/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  console.log(`🔍 Recherche utilisateur ${userId}`);
  
  if (userId === 1) {
    res.json({ id: 1, name: 'John Doe', email: 'john@example.com' });
  } else if (userId === 2) {
    res.json({ id: 2, name: 'Jane Smith', email: 'jane@example.com' });
  } else {
    res.status(404).json({ error: 'Utilisateur non trouvé' });
  }
});

// Démarrer le service
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Service Users démarré sur le port ${PORT}`);
  console.log(`📍 Health check: http://localhost:${PORT}/health`);
  console.log(`📍 Utilisateurs: http://localhost:${PORT}/users`);
});

// Gestion des erreurs
process.on('uncaughtException', (error) => {
  console.error('❌ Erreur non capturée:', error);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('❌ Rejet non géré:', reason);
});
