import { useState } from 'react'
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import EmployeeDashboard from './pages/EmployeeDashboard';
import { useAuth } from './context/AuthContext';
import './index.css'

function App() {
  const { user } = useAuth();

  if (!user) {
    return <Login />;
  }

  return (
    <div className="app-container" dir="rtl">
      {user.role === 'admin' ? <AdminDashboard /> : <EmployeeDashboard />}
    </div>
  );
}

export default App
