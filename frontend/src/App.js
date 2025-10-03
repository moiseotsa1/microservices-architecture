import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:4008';

// Configuration axios avec timeout
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 5000
});

function App() {
  const [healthStatus, setHealthStatus] = useState({});
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const [healthRes, usersRes, productsRes, ordersRes, notificationsRes] = await Promise.allSettled([
        api.get('/health'),
        api.get('/api/users/users'),
        api.get('/api/products/products'),
        api.get('/api/orders/orders'),
        api.get('/api/notifications/notifications')
      ]);

      // Traiter les réponses
      if (healthRes.status === 'fulfilled') {
        setHealthStatus(healthRes.value.data);
      }

      if (usersRes.status === 'fulfilled') {
        setUsers(usersRes.value.data);
      } else {
        console.warn('Service Users inaccessible');
      }

      if (productsRes.status === 'fulfilled') {
        setProducts(productsRes.value.data);
      } else {
        console.warn('Service Products inaccessible');
      }

      if (ordersRes.status === 'fulfilled') {
        setOrders(ordersRes.value.data);
      } else {
        console.warn('Service Orders inaccessible');
      }

      if (notificationsRes.status === 'fulfilled') {
        setNotifications(notificationsRes.value.data);
      } else {
        console.warn('Service Notifications inaccessible');
      }

      // Vérifier si au moins un service répond
      const successfulCalls = [healthRes, usersRes, productsRes, ordersRes, notificationsRes]
        .filter(result => result.status === 'fulfilled').length;
      
      if (successfulCalls === 0) {
        setError("Aucun service n'est accessible. Vérifiez que l'API Gateway est démarré.");
      }

    } catch (err) {
      setError('Erreur de connexion aux services: ' + err.message);
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const refreshData = () => {
    fetchData();
  };

  if (loading) {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <h2>Chargement des microservices...</h2>
        <p>Veuillez patienter</p>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
      {/* En-tête */}
      <header style={{ 
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', 
        color: 'white', 
        padding: '2rem', 
        borderRadius: '10px',
        marginBottom: '2rem',
        textAlign: 'center'
      }}>
        <h1>🚀 Dashboard Microservices</h1>
        <p>Architecture complète avec 5 services backend</p>
        <button 
          onClick={refreshData}
          style={{
            background: 'rgba(255,255,255,0.2)',
            color: 'white',
            border: '1px solid white',
            padding: '10px 20px',
            borderRadius: '5px',
            cursor: 'pointer',
            marginTop: '10px'
          }}
        >
          Actualiser les données
        </button>
      </header>

      {/* Message d'erreur */}
      {error && (
        <div style={{
          background: '#f8d7da',
          color: '#721c24',
          padding: '15px',
          borderRadius: '5px',
          marginBottom: '20px'
        }}>
          ⚠️ {error}
        </div>
      )}

      {/* Services Status */}
      <div style={{
        background: 'white',
        padding: '20px',
        borderRadius: '10px',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
        marginBottom: '20px'
      }}>
        <h3>📊 Statut des Services</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px', marginTop: '15px' }}>
          <div style={{ padding: '10px', background: '#f8f9fa', borderRadius: '5px', textAlign: 'center' }}>
            <div>API Gateway</div>
            <div style={{ color: '#28a745', fontWeight: 'bold' }}>✅ En ligne</div>
          </div>
          <div style={{ padding: '10px', background: '#f8f9fa', borderRadius: '5px', textAlign: 'center' }}>
            <div>Service Users</div>
            <div style={{ color: users.length > 0 ? '#28a745' : '#dc3545', fontWeight: 'bold' }}>
              {users.length > 0 ? '✅ Données' : '❌ Données'}
            </div>
          </div>
          <div style={{ padding: '10px', background: '#f8f9fa', borderRadius: '5px', textAlign: 'center' }}>
            <div>Service Products</div>
            <div style={{ color: products.length > 0 ? '#28a745' : '#dc3545', fontWeight: 'bold' }}>
              {products.length > 0 ? '✅ Données' : '❌ Données'}
            </div>
          </div>
          <div style={{ padding: '10px', background: '#f8f9fa', borderRadius: '5px', textAlign: 'center' }}>
            <div>Service Orders</div>
            <div style={{ color: orders.length > 0 ? '#28a745' : '#dc3545', fontWeight: 'bold' }}>
              {orders.length > 0 ? '✅ Données' : '❌ Données'}
            </div>
          </div>
          <div style={{ padding: '10px', background: '#f8f9fa', borderRadius: '5px', textAlign: 'center' }}>
            <div>Service Notifications</div>
            <div style={{ color: notifications.length > 0 ? '#28a745' : '#dc3545', fontWeight: 'bold' }}>
              {notifications.length > 0 ? '✅ Données' : '❌ Données'}
            </div>
          </div>
        </div>
      </div>

      {/* Données */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '20px',
        marginBottom: '2rem'
      }}>
        {/* Utilisateurs */}
        <div style={{ background: 'white', padding: '20px', borderRadius: '10px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
          <h3>👥 Utilisateurs ({users.length})</h3>
          <div style={{ marginTop: '15px' }}>
            {users.length > 0 ? users.slice(0, 3).map(user => (
              <div key={user.id} style={{ padding: '10px', borderBottom: '1px solid #eee', display: 'flex', justifyContent: 'space-between' }}>
                <span>{user.name}</span>
                <span style={{ color: '#666' }}>{user.email}</span>
              </div>
            )) : <p style={{ color: '#666', fontStyle: 'italic' }}>Aucune donnée</p>}
            {users.length > 3 && <p style={{ marginTop: '10px', color: '#666' }}>... et {users.length - 3} de plus</p>}
          </div>
        </div>

        {/* Produits */}
        <div style={{ background: 'white', padding: '20px', borderRadius: '10px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
          <h3>📦 Produits ({products.length})</h3>
          <div style={{ marginTop: '15px' }}>
            {products.length > 0 ? products.slice(0, 3).map(product => (
              <div key={product.id} style={{ padding: '10px', borderBottom: '1px solid #eee', display: 'flex', justifyContent: 'space-between' }}>
                <span>{product.name}</span>
                <span style={{ color: '#28a745', fontWeight: 'bold' }}>${product.price}</span>
              </div>
            )) : <p style={{ color: '#666', fontStyle: 'italic' }}>Aucune donnée</p>}
            {products.length > 3 && <p style={{ marginTop: '10px', color: '#666' }}>... et {products.length - 3} de plus</p>}
          </div>
        </div>

        {/* Commandes */}
        <div style={{ background: 'white', padding: '20px', borderRadius: '10px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
          <h3>📋 Commandes ({orders.length})</h3>
          <div style={{ marginTop: '15px' }}>
            {orders.length > 0 ? orders.slice(0, 3).map(order => (
              <div key={order.id} style={{ padding: '10px', borderBottom: '1px solid #eee' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Commande #{order.id}</span>
                  <span style={{ 
                    color: order.status === 'completed' ? '#28a745' : '#ffc107',
                    fontWeight: 'bold'
                  }}>
                    {order.status}
                  </span>
                </div>
                <div style={{ color: '#666', fontSize: '0.9em' }}>Total: ${order.total}</div>
              </div>
            )) : <p style={{ color: '#666', fontStyle: 'italic' }}>Aucune donnée</p>}
          </div>
        </div>

        {/* Notifications */}
        <div style={{ background: 'white', padding: '20px', borderRadius: '10px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
          <h3>🔔 Notifications ({notifications.length})</h3>
          <div style={{ marginTop: '15px' }}>
            {notifications.length > 0 ? notifications.slice(0, 3).map(notification => (
              <div key={notification.id} style={{ 
                padding: '10px', 
                borderBottom: '1px solid #eee',
                borderLeft: `4px solid ${notification.type === 'success' ? '#28a745' : '#17a2b8'}`
              }}>
                <div style={{ fontWeight: 'bold' }}>{notification.title}</div>
                <div style={{ color: '#666', fontSize: '0.9em' }}>{notification.message}</div>
              </div>
            )) : <p style={{ color: '#666', fontStyle: 'italic' }}>Aucune donnée</p>}
          </div>
        </div>
      </div>

      {/* Informations techniques */}
      <div style={{ background: 'white', padding: '20px', borderRadius: '10px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
        <h3>🔧 Informations Techniques</h3>
        <div style={{ marginTop: '15px', fontFamily: 'monospace', fontSize: '14px' }}>
          <div>API Gateway: <strong>http://localhost:4008</strong></div>
          <div>Frontend: <strong>http://localhost:4000</strong></div>
          <div style={{ marginTop: '10px', color: '#666' }}>
            Dernière mise à jour: {new Date().toLocaleTimeString()}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
