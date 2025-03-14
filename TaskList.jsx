import React, { useState, useEffect } from 'react';
import { Nav, Tab, Alert, Spinner, Container, Row, Col, Badge } from 'react-bootstrap';
import TaskItem from './TaskItem';
import { getCurrentUserTasks } from '../../api/tasks';
import { BsCheckCircle, BsClock, BsListTask, BsArrowRepeat } from 'react-icons/bs';

const TaskList = ({ externalTasks, onTaskUpdate, refreshTasks, isEmployeeView = false }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('all');

  useEffect(() => {
    if (externalTasks) {
      setTasks(externalTasks);
      setLoading(false);
    } else {
      fetchTasks();
    }
  }, [externalTasks]);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const response = await getCurrentUserTasks();
      setTasks(response);
      setError('');
    } catch (err) {
      console.error('Error fetching tasks:', err);
      setError('Failed to load tasks. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = () => {
    if (refreshTasks) {
      refreshTasks();
    } else {
      fetchTasks();
    }
  };

  const handleTaskUpdate = (updatedTask) => {
    const updatedTasks = tasks.map(task => 
      task.id === updatedTask.id ? updatedTask : task
    );
    setTasks(updatedTasks);
    
    if (onTaskUpdate) {
      onTaskUpdate(updatedTask);
    }
  };

  const getFilteredTasks = (status = null) => {
    if (!status || status === 'all') {
      return tasks;
    }
    return tasks.filter(task => {
      if (status === 'pending') {
        return task.status === 'PENDING' || task.status === 'New';
      }
      if (status === 'in_progress') {
        return task.status === 'IN_PROGRESS';
      }
      if (status === 'completed') {
        return task.status === 'COMPLETED';
      }
      return true;
    });
  };

  const getTaskStats = () => {
    return {
      all: tasks.length,
      pending: getFilteredTasks('pending').length,
      inProgress: getFilteredTasks('in_progress').length,
      completed: getFilteredTasks('completed').length
    };
  };

  const stats = getTaskStats();

  if (loading) {
    return (
      <div className="text-center p-4">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading tasks...</span>
        </Spinner>
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="danger" dismissible onClose={() => setError('')}>
        {error}
      </Alert>
    );
  }

  return (
    <div className="task-list">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h5 className="mb-0">
          {activeTab === 'all' ? 'All Tasks' : 
           activeTab === 'pending' ? 'Pending Tasks' :
           activeTab === 'in_progress' ? 'In Progress Tasks' : 'Completed Tasks'}
        </h5>
        <Badge 
          bg="primary" 
          className="refresh-badge d-flex align-items-center gap-2" 
          style={{ cursor: 'pointer' }} 
          onClick={handleRefresh}
        >
          <BsArrowRepeat /> Refresh
        </Badge>
      </div>

      <Nav 
        variant="pills" 
        className="mb-4 gap-2 flex-wrap" 
        activeKey={activeTab}
        onSelect={(k) => setActiveTab(k)}
      >
        <Nav.Item>
          <Nav.Link eventKey="all" className="d-flex align-items-center gap-2">
            <BsListTask />
            All
            <Badge bg="secondary" pill>{stats.all}</Badge>
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="pending" className="d-flex align-items-center gap-2">
            <BsClock />
            Pending
            <Badge bg="warning" pill>{stats.pending}</Badge>
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="in_progress" className="d-flex align-items-center gap-2">
            <BsArrowRepeat />
            In Progress
            <Badge bg="primary" pill>{stats.inProgress}</Badge>
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="completed" className="d-flex align-items-center gap-2">
            <BsCheckCircle />
            Completed
            <Badge bg="success" pill>{stats.completed}</Badge>
          </Nav.Link>
        </Nav.Item>
      </Nav>

      <div className="tasks-container">
        {getFilteredTasks(activeTab).length === 0 ? (
          <Alert variant="info">
            No {activeTab === 'all' ? '' : activeTab} tasks {activeTab === 'all' ? 'available' : 'found'}.
          </Alert>
        ) : (
          <div className="task-grid">
            {getFilteredTasks(activeTab).map(task => (
              <TaskItem 
                key={task.id} 
                task={task} 
                onStatusUpdate={handleTaskUpdate}
                isEmployeeView={isEmployeeView}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskList;
