import React from 'react';
import Hero from './components/Hero';
import AdminDashboard from './components/admin/AdminDashboard';

function App() {
  const isAdminRoute = window.location.pathname === '/admin';

  if (isAdminRoute) {
    return <AdminDashboard />;
  }

  return (
    <div className="min-h-screen bg-white">
      <Hero />
    </div>
  );
}

export default App;