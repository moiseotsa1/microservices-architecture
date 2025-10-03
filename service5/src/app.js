const express = require('express');
const app = express();
const PORT = 3005;

app.use(express.json());

app.get('/health', (req, res) => {
  console.log('🔔 Health check Notifications Service');
  res.json({ 
    status: 'OK', 
    service: 'Service Notifications',
    port: PORT,
    timestamp: new Date().toISOString()
  });
});

app.get('/notifications', (req, res) => {
  console.log('🔔 Récupération des notifications');
  res.json([
    { 
      id: 1, 
      userId: 1, 
      title: 'Bienvenue !', 
      message: 'Bienvenue dans notre application microservices', 
      type: 'info',
      read: true,
      createdAt: '2025-10-01T09:00:00Z'
    },
    { 
      id: 2, 
      userId: 2, 
      title: 'Commande confirmée', 
      message: 'Votre commande #2 a été confirmée', 
      type: 'success',
      read: false,
      createdAt: '2025-10-02T14:40:00Z'
    },
    { 
      id: 3, 
      userId: 1, 
      title: 'Paiement reçu', 
      message: 'Votre paiement de $999.99 a été traité', 
      type: 'success',
      read: true,
      createdAt: '2025-10-01T10:06:00Z'
    }
  ]);
});

app.get('/notifications/:id', (req, res) => {
  const notificationId = parseInt(req.params.id);
  console.log(`🔔 Recherche notification ${notificationId}`);
  
  const notifications = {
    1: { 
      id: 1, 
      userId: 1, 
      title: 'Bienvenue !', 
      message: 'Bienvenue dans notre application microservices', 
      type: 'info',
      read: true,
      createdAt: '2025-10-01T09:00:00Z'
    },
    2: { 
      id: 2, 
      userId: 2, 
      title: 'Commande confirmée', 
      message: 'Votre commande #2 a été confirmée', 
      type: 'success',
      read: false,
      createdAt: '2025-10-02T14:40:00Z'
    },
    3: { 
      id: 3, 
      userId: 1, 
      title: 'Paiement reçu', 
      message: 'Votre paiement de $999.99 a été traité', 
      type: 'success',
      read: true,
      createdAt: '2025-10-01T10:06:00Z'
    }
  };
  
  const notification = notifications[notificationId];
  if (notification) {
    res.json(notification);
  } else {
    res.status(404).json({ error: 'Notification non trouvée' });
  }
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Service Notifications démarré sur le port ${PORT}`);
});
