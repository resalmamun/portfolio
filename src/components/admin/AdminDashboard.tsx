import React, { useState, useEffect } from 'react';
import axios, { AxiosError } from 'axios';
import LoginForm from './LoginForm';
import MessageList from './MessageList';
import CreateAdminForm from './CreateAdminForm';

const AdminDashboard: React.FC = () => {
  const [token, setToken] = useState<string>('');
  const [showCreateForm, setShowCreateForm] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    checkAdminExists();
  }, []);

  const checkAdminExists = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/auth/check-admin');
      setShowCreateForm(!response.data.exists);
      setLoading(false);
    } catch (err) {
      const error = err as AxiosError;
      setError(error.response?.data?.message || 'Failed to check admin status');
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-red-600">{error}</div>
      </div>
    );
  }

  if (showCreateForm) {
    return <CreateAdminForm onSuccess={() => setShowCreateForm(false)} />;
  }

  if (!token) {
    return <LoginForm onLogin={setToken} />;
  }

  return <MessageList token={token} />;
};

export default AdminDashboard;