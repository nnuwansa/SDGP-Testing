import React from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import DashboardLayout from '../layout/DashboardLayout';
import { useAuth } from '../../context/AuthContext';

const AdminDashboard = () => {
  const { currentUser } = useAuth();

  const adminSidebarItems = [
    {
      title: 'Dashboard',
      path: '/admin-dashboard',
      icon: 'bi-speedometer2'
    },
    {
      title: 'Tasks',
      path: '/admin-tasks',
      icon: 'bi-list-check'
    },
    {
      title: 'Employees',
      path: '/admin-employees',
      icon: 'bi-people'
    },
    {
      title: 'Progress Analysis',
      path: '/admin-progress',
      icon: 'bi-graph-up'
    },
    
    {
      title: 'Leaderboard',
      path: '/admin-leaderboard',
      icon: 'bi-bar-chart-line'
    },
    {
      title: 'Settings',
      path: '/admin-settings',
      icon: 'bi-gear'
           
    }
    
    
  ];

  // Feature cards for the dashboard
  const featureCards = [
    {
      title: 'Task Management',
      description: 'Create, assign, and track tasks for your team members',
      icon: 'bi-list-check',
      color: 'primary',
      path: '/admin/tasks'
    },
    {
      title: 'Employee Management',
      description: 'Manage employee profiles, roles, and permissions',
      icon: 'bi-people',
      color: 'success',
      path: '/admin-employees'
    },
    {
      title: 'Progress Analysis',
      description: 'View detailed analytics and reports on team performance',
      icon: 'bi-graph-up',
      color: 'info',
      path: '/admin-progress'
    },
    
    {
      title: 'Leaderboard',
      description: 'View top performers and encourage healthy competition',
      icon: 'bi-bar-chart-line',
      color: 'danger',
      path: '/admin-leaderboard'
    },
    
   
    
  ];

  return (
    <DashboardLayout sidebarItems={adminSidebarItems}>
      <div className="mb-4">
        <h1 className="mb-2">Welcome, {currentUser?.fullName || 'Admin'}</h1>  
        <p className="text-muted">Manage your team and boost productivity with AchievePlus</p>
      </div>
      
      <Row>
        {featureCards.map((feature, index) => (
          <Col md={6} lg={3} xl={3} key={index} className="mb-4">
            <Link to={feature.path} className="text-decoration-none">
              <Card className="h-100 shadow-sm hover-card">
                <Card.Body className="d-flex flex-column align-items-center text-center p-4">
                  <div className={`rounded-circle bg-${feature.color} p-3 mb-3`}>
                    <i className={`bi ${feature.icon} text-white fs-3`}></i>
                  </div>
                  <h5 className="card-title">{feature.title}</h5>
                  <p className="card-text text-muted">{feature.description}</p>
                </Card.Body>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </DashboardLayout>
  );
};

export default AdminDashboard; 