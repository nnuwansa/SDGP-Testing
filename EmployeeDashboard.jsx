import React from 'react';
import { Row, Col, Card, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import DashboardLayout from '../layout/DashboardLayout';
import { useAuth } from '../../context/AuthContext';

const EmployeeDashboard = () => {
  const { currentUser } = useAuth();

  const employeeSidebarItems = [
    {
      title: 'Dashboard',
      path: '/employee-dashboard',
      icon: 'bi-speedometer2'
    },
    {
      title: 'My Tasks',
      path: '/employee-tasks',
      icon: 'bi-list-check'
    },
    {
      title: 'Progress Analysis',
      path: '/employee-progress',
      icon: 'bi-graph-up'
    },
    {
      title: 'Rewards & Achievements',
      path: '/employee-rewards',
      icon: 'bi-trophy'
    },
    {
      title: 'Leaderboard',
      path: '/employee-leaderboard',
      icon: 'bi-bar-chart-line'
    },
    {
      title: 'Reward Store',
      path: '/employee-store',
      icon: 'bi-shop'
    },
    {
      title: 'Wellness Hub',
      path: '/employee-wellness',
      icon: 'bi-heart-pulse'
    },
    {
      title: 'Profile Settings',
      path: '/employee-profile',
      icon: 'bi-person-gear'
    },
    {
      title: 'Help & Support',
      path: '/employee-help',
      icon: 'bi-question-circle'
    }
    
  ];

  // Feature cards for the dashboard
  const featureCards = [
    {
      title: 'My Tasks',
      description: 'View and manage your assigned tasks',
      icon: 'bi-list-check',
      color: 'primary',
      path: '/employee-tasks'
    },
    {
      title: 'Progress Analysis',
      description: 'Track your performance and growth over time',
      icon: 'bi-graph-up',
      color: 'info',
      path: '/employee-progress'
    },
    {
      title: 'Rewards & Achievements',
      description: 'View your earned badges and achievements',
      icon: 'bi-trophy',
      color: 'warning',
      path: '/employee-rewards'
    },
    {
      title: 'Leaderboard',
      description: 'See how you rank among your colleagues',
      icon: 'bi-bar-chart-line',
      color: 'danger',
      path: '/employee-leaderboard'
    },
    {
      title: 'Reward Store',
      description: 'Redeem your points for exciting rewards',
      icon: 'bi-shop',
      color: 'success',
      path: '/employee-store'
    },
    {
      title: 'Wellness Hub',
      description: 'Resources for maintaining work-life balance',
      icon: 'bi-heart-pulse',
      color: 'secondary',
      path: '/employee-wellness'
    }
    
  ];

  return (
    <DashboardLayout sidebarItems={employeeSidebarItems}>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1 className="mb-2">Welcome, {currentUser?.fullName || 'Employee'}</h1>
          <p className="text-muted">Your personal dashboard to track progress and achievements</p>
        </div>
        <Badge bg="primary" className="p-2 fs-6">
          <i className="bi bi-star-fill me-2"></i>
          1250 Points
        </Badge>
      </div>
      
      <Row>
        {featureCards.map((feature, index) => (
          <Col md={4} lg={2} xl={2} key={index} className="mb-4">
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

export default EmployeeDashboard; 