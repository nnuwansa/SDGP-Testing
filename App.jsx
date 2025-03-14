import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './App.css';

// Import components
import Login from './auth/Login';
import Signup from './auth/Register';
import AdminDashboard from './components/admin/AdminDashboard';
import EmployeeDashboard from './components/employee/EmployeeDashboard';
import AdminTaskDashboard from './components/admin/AdminTaskDashboard';
import EmployeeTaskDashboard from './components/employee/EmployeeTaskDashboard';
import { useAuth } from './context/AuthContext';

function App() {
  const { currentUser, loading, isAdmin } = useAuth();

  // Show loading state if auth is still being checked
  if (loading) {
    return <div className="loading-container">
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>;
  }

  // Debug logs
  console.log('App - Current user:', currentUser);
  console.log('App - Is admin:', isAdmin);

  return (
    <div className="app">
      <Routes>
        {/* Home route - redirects based on auth status */}
        <Route 
          path="/" 
          element={
            currentUser ? (
              isAdmin ? (
                <Navigate to="/admin-dashboard" />
              ) : (
                <Navigate to="/dashboard" />
              )
            ) : (
              <Navigate to="/login" />
            )
          } 
        />
        
        {/* Auth routes */}
        <Route 
          path="/login" 
          element={
            currentUser ? (
              isAdmin ? (
                <Navigate to="/admin-dashboard" />
              ) : (
                <Navigate to="/dashboard" />
              )
            ) : (
              <Login />
            )
          } 
        />
        <Route 
          path="/signup" 
          element={
            currentUser ? (
              isAdmin ? (
                <Navigate to="/admin-dashboard" />
              ) : (
                <Navigate to="/dashboard" />
              )
            ) : (
              <Signup />
            )
          } 
        />
        
        {/* Admin dashboard routes */}
        <Route 
          path="/admin-dashboard/*" 
          element={
            currentUser && isAdmin ? (
              <AdminDashboard />
            ) : (
              currentUser ? (
                <Navigate to="/dashboard" />
              ) : (
                <Navigate to="/login" />
              )
            )
          } 
        />
         {/* Admin Task Dashboard */}
         <Route 
          path="/admin-tasks" 
          element={
            currentUser && isAdmin ? (
              <AdminTaskDashboard />
            ) : (
              currentUser ? (
                <Navigate to="/dashboard" />
              ) : (
                <Navigate to="/login" />
              )
            )
          } 
        />
        
        {/* Employee dashboard routes */}
        <Route 
          path="/dashboard/*" 
          element={
            currentUser && !isAdmin ? (
              <EmployeeDashboard />
            ) : (
              currentUser ? (
                <Navigate to="/admin-dashboard" />
              ) : (
                <Navigate to="/login" />
              )
            )
          } 
        />
         {/* Employee Task Dashboard */}
         <Route 
          path="/employee-tasks" 
          element={
            currentUser && !isAdmin ? (
              <EmployeeTaskDashboard />
            ) : (
              currentUser ? (
                <Navigate to="/admin-dashboard" />
              ) : (
                <Navigate to="/login" />
              )
            )
          } 
        />
        
        
        {/* Catch-all route */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default App;