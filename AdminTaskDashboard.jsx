//CORRECT
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import Navbar from '../layout/Navbar';
import TaskForm from '../tasks/TaskForm';
import TaskList from '../tasks/TaskList';
import { useAuth } from '../../context/AuthContext';
import { getCurrentUserTasks } from '../../api/tasks';

const AdminTaskDashboard = ({ onLogout }) => {
  // eslint-disable-next-line no-unused-vars
  const { logout, currentUser } = useAuth();
  const [tasks, setTasks] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [loading, setLoading] = useState(true);
  // eslint-disable-next-line no-unused-vars
  const [error, setError] = useState('');
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  useEffect(() => {
    fetchTasks();
  }, [refreshTrigger]);


  const fetchTasks = async () => {
    try {
      setLoading(true);
      const response = await getCurrentUserTasks();
      setTasks(response);
      setError('');
    } catch (err) {
      setError('Failed to load tasks. Please try again.');
      console.error('Error fetching tasks:', err);
    } finally {
      setLoading(false);
    }
  };

  // eslint-disable-next-line no-unused-vars
  const handleTaskCreated = (newTask) => {
    // After creating a task, refresh the entire task list
    // This ensures we have the most up-to-date data
    refreshTasks();
  };

  const handleTaskUpdate = (updatedTask) => {
    // Update local state immediately for a smoother UX
    setTasks(prevTasks => 
      prevTasks.map(task => 
        task.id === updatedTask.id ? updatedTask : task
      )
    );
  };

  const refreshTasks = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  // Count tasks by status
  const pendingTasks = tasks.filter(task => task.status === 'PENDING').length;
  const inProgressTasks = tasks.filter(task => task.status === 'IN_PROGRESS').length;
  const completedTasks = tasks.filter(task => task.status === 'COMPLETED').length;

  return (
    <>
      <Navbar userType="admin" onLogout={onLogout} />
      <Container fluid className="mt-4 px-4">
        <Row>
          <Col lg={4}>
            <Card className="shadow-sm mb-4">
              <Card.Body>
                <h5 className="mb-3">Create New Task</h5>
                <TaskForm onTaskCreated={handleTaskCreated} />
              </Card.Body>
            </Card>
          </Col>
          <Col lg={8}>
            <Row className="mb-4">
              <Col md={4}>
                <Card className="shadow-sm bg-light">
                  <Card.Body className="d-flex align-items-center">
                    <div className="rounded-circle bg-warning bg-opacity-25 p-3 me-3">
                      <i className="bi bi-hourglass text-warning fs-4"></i>
                    </div>
                    <div>
                      <h6 className="text-muted mb-1">Pending</h6>
                      <h2 className="mb-0">{pendingTasks}</h2>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={4}>
                <Card className="shadow-sm bg-light">
                  <Card.Body className="d-flex align-items-center">
                    <div className="rounded-circle bg-primary bg-opacity-25 p-3 me-3">
                      <i className="bi bi-clipboard-data text-primary fs-4"></i>
                    </div>
                    <div>
                      <h6 className="text-muted mb-1">In Progress</h6>
                      <h2 className="mb-0">{inProgressTasks}</h2>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={4}>
                <Card className="shadow-sm bg-light">
                  <Card.Body className="d-flex align-items-center">
                    <div className="rounded-circle bg-success bg-opacity-25 p-3 me-3">
                      <i className="bi bi-check-circle text-success fs-4"></i>
                    </div>
                    <div>
                      <h6 className="text-muted mb-1">Completed</h6>
                      <h2 className="mb-0">{completedTasks}</h2>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
            <Card className="shadow-sm">
              <Card.Body>
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h5 className="mb-0">Task Management</h5>
                  <Button 
                    variant="outline-primary" 
                    size="sm"
                    onClick={refreshTasks}
                  >
                    <i className="bi bi-arrow-clockwise me-1"></i> Refresh
                  </Button>
                </div>
                <TaskList 
                  externalTasks={tasks}
                  onTaskUpdate={handleTaskUpdate}
                  refreshTasks={refreshTasks}
                />
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default AdminTaskDashboard;

