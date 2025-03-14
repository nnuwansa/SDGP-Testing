import React, { useState } from 'react';
import { Card, Badge, Button, Spinner } from 'react-bootstrap';
import { updateTaskStatus } from '../../api/tasks';
import { BsClock, BsCalendar } from 'react-icons/bs';

const TaskItem = ({ task, onStatusUpdate }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const handleStatusUpdate = async (newStatus) => {
    setLoading(true);
    setError('');

    try {
      const updatedTask = await updateTaskStatus(task.id, newStatus);
      if (onStatusUpdate) {
        onStatusUpdate(updatedTask);
      }
    } catch (err) {
      console.error('Error updating task status:', err);
      setError(err.message || 'Failed to update task status. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const isEmployee = localStorage.getItem('userRole') === 'ROLE_EMPLOYEE' || true; // Force enable for testing
  const isAssignedToCurrentUser = task.assignedTo === parseInt(localStorage.getItem('userId')) || true; // Force enable for testing
  const canUpdateStatus = isEmployee && isAssignedToCurrentUser;
  const isPending = task.status === 'PENDING' || task.status === 'New';
  const isInProgress = task.status === 'IN_PROGRESS';
  const isCompleted = task.status === 'COMPLETED';

  // Only show action buttons for non-completed tasks
  const showActionButtons = canUpdateStatus && !isCompleted;

  return (
    <Card className="mb-4 border-0 shadow-sm rounded">
      <Card.Body>
        <div className="d-flex flex-column">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <h5 className="fw-semibold mb-0">{task.title}</h5>
            {isCompleted && (
              <Badge bg="success" className="rounded-pill px-3">Completed</Badge>
            )}
            {isInProgress && (
              <Badge bg="primary" className="rounded-pill px-3">In progress</Badge>
            )}
            {isPending && (
              <Badge bg="warning" className="rounded-pill px-3">Pending</Badge>
            )}
          </div>
          
          <p className="text-muted mb-3">{task.description}</p>
          
          <div className="d-flex align-items-center text-muted small mb-2">
            <BsCalendar className="me-1" />
            <span>Due: {formatDate(task.dueDate)}</span>
            
            {task.points && (
              <span className="ms-3">
                🎯 {task.points} points
              </span>
            )}
          </div>
          
          <div className="d-flex align-items-center small text-muted mb-3">
            <BsClock className="me-1" />
            <span>Created: {formatDate(task.createdAt || task.createdDate)}</span>
          </div>

          {loading ? (
            <div className="text-center mt-3">
              <Spinner animation="border" size="sm" />
            </div>
          ) : (
            // Only show action buttons for non-completed tasks
            showActionButtons && (
              <div className="d-flex justify-content-end gap-2 mt-2">
                {isPending && (
                  <Button
                    variant="outline-primary"
                    size="sm"
                    onClick={() => handleStatusUpdate('IN_PROGRESS')}
                    className="rounded-pill px-4"
                  >
                    Mark as In Progress
                  </Button>
                )}
                
                {(isPending || isInProgress) && (
                  <Button
                    variant="outline-success"
                    size="sm"
                    onClick={() => handleStatusUpdate('COMPLETED')}
                    className="rounded-pill px-4"
                  >
                    Mark as Completed
                  </Button>
                )}
              </div>
            )
          )}

          {/* Option to mark a completed task as pending - only shown for completed tasks */}
          {isCompleted && canUpdateStatus && !loading && (
            <div className="d-flex justify-content-end gap-2 mt-2">
              <Button
                variant="outline-warning"
                size="sm"
                onClick={() => handleStatusUpdate('PENDING')}
                className="rounded-pill px-4"
              >
                Mark as Pending
              </Button>
            </div>
          )}

          {error && (
            <div className="mt-2">
              <small className="text-danger">{error}</small>
            </div>
          )}
        </div>
      </Card.Body>
    </Card>
  );
};

export default TaskItem;