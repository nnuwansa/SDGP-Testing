import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Badge, Spinner, Alert } from 'react-bootstrap';
import { BsCheckCircle, BsClock, BsArrowRepeat } from 'react-icons/bs';
import Navbar from '../layout/Navbar';
import TaskList from '../tasks/TaskList';
import { getCurrentUserStats, getCurrentUserTasks } from '../../api/tasks';
import { useAuth } from '../../context/AuthContext';

const EmployeeTaskDashboard = () => {
  const { currentUser } = useAuth();
  const [stats, setStats] = useState({
    pendingTasks: 0,
    inProgressTasks: 0,
    completedTasks: 0,
    totalPoints: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [tasks, setTasks] = useState([]);
  const [tasksLoading, setTasksLoading] = useState(true);

  useEffect(() => {
    fetchStats();
    fetchTasks();
  }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const response = await getCurrentUserStats();
      setStats(response);
    } catch (err) {
      console.error('Error fetching stats:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchTasks = async () => {
    try {
      setTasksLoading(true);
      const response = await getCurrentUserTasks();
      setTasks(response);

      // Update stats based on tasks if getCurrentUserStats fails
      const pendingTasks = response.filter(task => 
        task.status === 'PENDING' || task.status === 'New'
      ).length;

      const inProgressTasks = response.filter(task => 
        task.status === 'IN_PROGRESS'
      ).length;

      const completedTasks = response.filter(task => 
        task.status === 'COMPLETED'
      ).length;

      const totalPoints = response
        .filter(task => task.status === 'COMPLETED')
        .reduce((sum, task) => sum + (task.points || 0), 0);

      setStats({
        pendingTasks,
        inProgressTasks,
        completedTasks,
        totalPoints
      });
    } catch (err) {
      console.error('Error fetching tasks:', err);
    } finally {
      setTasksLoading(false);
    }
  };

  const handleTaskUpdate = async (updatedTask) => {
    setTasks(prevTasks => 
      prevTasks.map(task => 
        task.id === updatedTask.id ? updatedTask : task
      )
    );
    await fetchStats(); // Refresh stats after task update
  };

  if (loading && tasksLoading) {
    return (
      <div className="min-vh-100 d-flex align-items-center justify-content-center">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  return (
    <div className="min-vh-100 bg-light">
      <Navbar />
      <Container fluid className="px-4 py-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h1 className="h3 mb-0">Welcome back, {currentUser?.fullName || 'Employee'}</h1>
            <p className="text-muted">Here's your task overview</p>
          </div>
          <div className="text-end">
            <h4 className="mb-0">🏆 {stats.totalPoints} Points</h4>
            <small className="text-muted">Total points earned</small>
          </div>
        </div>

        {error && (
          <Alert variant="danger" className="mb-4" dismissible onClose={() => setError('')}>
            {error}
          </Alert>
        )}

        <Row className="g-4 mb-4">
          <Col md={4}>
            <Card className="shadow-sm h-100 border-0">
              <Card.Body>
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <h6 className="text-muted mb-2">Pending Tasks</h6>
                    <h2 className="mb-0">{stats.pendingTasks}</h2>
                  </div>
                  <div className="bg-warning bg-opacity-10 p-3 rounded">
                    <BsClock className="text-warning fs-4" />
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="shadow-sm h-100 border-0">
              <Card.Body>
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <h6 className="text-muted mb-2">In Progress</h6>
                    <h2 className="mb-0">{stats.inProgressTasks}</h2>
                  </div>
                  <div className="bg-primary bg-opacity-10 p-3 rounded">
                    <BsArrowRepeat className="text-primary fs-4" />
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="shadow-sm h-100 border-0">
              <Card.Body>
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <h6 className="text-muted mb-2">Completed Tasks</h6>
                    <h2 className="mb-0">{stats.completedTasks}</h2>
                  </div>
                  <div className="bg-success bg-opacity-10 p-3 rounded">
                    <BsCheckCircle className="text-success fs-4" />
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Card className="shadow-sm border-0">
          <Card.Body>
            <TaskList 
              externalTasks={tasks}
              onTaskUpdate={handleTaskUpdate}
              refreshTasks={fetchTasks}
              isEmployeeView={true}
            />
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default EmployeeTaskDashboard;