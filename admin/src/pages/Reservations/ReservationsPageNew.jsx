import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import './reservationsPage.css';

const ReservationsPage = () => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [selectedReservation, setSelectedReservation] = useState(null);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [reservationToDelete, setReservationToDelete] = useState(null);

  // Status mappings
  const statusConfig = {
    PENDING: { color: 'warning', label: 'Pending' },
    CONFIRMED: { color: 'success', label: 'Confirmed' },
    CANCELLED: { color: 'error', label: 'Cancelled' },
    COMPLETED: { color: 'info', label: 'Completed' },
    IN_PROGRESS: { color: 'primary', label: 'In Progress' }
  };

  // Fetch reservations from API
  const fetchReservations = async () => {
    try {
      setLoading(true);
      const response = await fetch('https://rentiva-backend.onrender.com/api/reservations');
      
      if (!response.ok) {
        throw new Error('Failed to fetch reservations');
      }
      
      const data = await response.json();
      setReservations(data);
      setError('');
    } catch (err) {
      console.error('Error fetching reservations:', err);
      setError('Failed to load reservations. Please check if backend is running.');
      toast.error('Error loading reservations');
    } finally {
      setLoading(false);
    }
  };

  // Update reservation status
  const updateReservationStatus = async (id, newStatus) => {
    try {
      const response = await fetch(`https://rentiva-backend.onrender.com/api/reservations/${id}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus })
      });

      if (!response.ok) {
        throw new Error('Failed to update reservation status');
      }

      // Refresh the list
      await fetchReservations();
      
      toast.success('Reservation status updated successfully');
    } catch (err) {
      console.error('Error updating reservation status:', err);
      toast.error('Error updating status');
    }
  };

  // Delete reservation
  const deleteReservation = async (id) => {
    try {
      const response = await fetch(`https://rentiva-backend.onrender.com/api/reservations/${id}`, {
        method: 'DELETE'
      });

      if (!response.ok) {
        throw new Error('Failed to delete reservation');
      }

      // Refresh the list
      await fetchReservations();
      
      toast.success('Reservation deleted successfully');
      setDeleteDialogOpen(false);
      setReservationToDelete(null);
    } catch (err) {
      console.error('Error deleting reservation:', err);
      toast.error('Error deleting reservation');
    }
  };

  // Filter reservations based on search term and status
  const filteredReservations = reservations.filter(reservation => {
    const matchesSearch = !searchTerm || 
      reservation.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reservation.lastName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reservation.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reservation.carTitle?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reservation.id?.toString().includes(searchTerm);
    
    const matchesStatus = statusFilter === 'ALL' || reservation.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  // Handle view reservation details
  const handleViewReservation = (reservation) => {
    setSelectedReservation(reservation);
    setViewDialogOpen(true);
  };

  // Handle delete confirmation
  const handleDeleteClick = (reservation) => {
    setReservationToDelete(reservation);
    setDeleteDialogOpen(true);
  };

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString('en-US');
  };

  // Calculate total price
  const calculateTotalPrice = (reservation) => {
    if (!reservation.startDate || !reservation.endDate || !reservation.dailyPrice) return 0;
    
    const start = new Date(reservation.startDate);
    const end = new Date(reservation.endDate);
    const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
    
    return days * reservation.dailyPrice;
  };

  useEffect(() => {
    fetchReservations();
  }, []);

  return (
    <div className="reservations-page-container">
      {/* Header */}
      <div className="reservations-page-header">
        <div className="reservations-page-header-content">
          <h1 className="reservations-page-title">Reservations Management</h1>
          <button
            className="reservations-page-refresh-button"
            onClick={fetchReservations}
            disabled={loading}
          >
            <span className="refresh-icon">↻</span>
            Refresh
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="reservations-page-content">
        {/* Filters */}
        <div className="reservations-filters">
          <div className="reservations-filters-container">
            <div className="search-section">
              <div className="search-input-container">
                <span className="search-icon">🔍</span>
                <input
                  type="text"
                  className="search-input"
                  placeholder="Search by name, email, or ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            
            <div className="filter-section">
              <select
                className="status-filter"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="ALL">All Statuses</option>
                <option value="PENDING">Pending</option>
                <option value="CONFIRMED">Confirmed</option>
                <option value="IN_PROGRESS">In Progress</option>
                <option value="COMPLETED">Completed</option>
                <option value="CANCELLED">Cancelled</option>
              </select>
            </div>
            
            <div className="results-info">
              <span className="results-count">Found: {filteredReservations.length}</span>
            </div>
          </div>
        </div>

        {/* Error Display */}
        {error && (
          <div className="error-message">
            <span className="error-icon">⚠️</span>
            <span>{error}</span>
          </div>
        )}

        {/* Reservations Table */}
        <div className="reservations-table-container">
          {loading ? (
            <div className="loading-container">
              <div className="loading-spinner"></div>
              <span>Loading reservations...</span>
            </div>
          ) : (
            <div className="table-wrapper">
              <table className="reservations-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Client</th>
                    <th>Car</th>
                    <th>Period</th>
                    <th>Value</th>
                    <th>Status</th>
                    <th>Created</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredReservations.length === 0 ? (
                    <tr>
                      <td colSpan="8" className="no-data">
                        <div className="no-data-content">
                          <span className="no-data-icon">📋</span>
                          <span>No reservations to display</span>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    filteredReservations.map((reservation) => (
                      <tr key={reservation.id} className="table-row">
                        <td className="id-cell">#{reservation.id}</td>
                        <td className="client-cell">
                          <div className="client-info">
                            <div className="client-name">
                              {reservation.firstName} {reservation.lastName}
                            </div>
                            <div className="client-email">{reservation.email}</div>
                          </div>
                        </td>
                        <td className="car-cell">
                          <div className="car-title">{reservation.carTitle}</div>
                        </td>
                        <td className="period-cell">
                          <div className="date-range">
                            {formatDate(reservation.startDate)} - {formatDate(reservation.endDate)}
                          </div>
                        </td>
                        <td className="price-cell">
                          <div className="price">
                            ${calculateTotalPrice(reservation).toLocaleString('en-US')}
                          </div>
                        </td>
                        <td className="status-cell">
                          <span className={`status-chip status-${reservation.status.toLowerCase()}`}>
                            {statusConfig[reservation.status]?.label || reservation.status}
                          </span>
                        </td>
                        <td className="created-cell">
                          {formatDate(reservation.createdAt)}
                        </td>
                        <td className="actions-cell">
                          <div className="actions">
                            <button
                              className="action-btn view-btn"
                              onClick={() => handleViewReservation(reservation)}
                              title="View Details"
                            >
                              👁️
                            </button>
                            <button
                              className="action-btn delete-btn"
                              onClick={() => handleDeleteClick(reservation)}
                              title="Delete Reservation"
                            >
                              🗑️
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* View Reservation Modal */}
      {viewDialogOpen && selectedReservation && (
        <div className="modal-overlay" onClick={() => setViewDialogOpen(false)}>
          <div className="modal modal-large" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Reservation Details #{selectedReservation.id}</h2>
              <button className="close-btn" onClick={() => setViewDialogOpen(false)}>×</button>
            </div>
            
            <div className="modal-content">
              <div className="reservation-details">
                <div className="details-grid">
                  <div className="details-section">
                    <h3>Client Information</h3>
                    <div className="detail-item">
                      <strong>Name:</strong> {selectedReservation.firstName} {selectedReservation.lastName}
                    </div>
                    <div className="detail-item">
                      <strong>Email:</strong> {selectedReservation.email}
                    </div>
                    <div className="detail-item">
                      <strong>Phone:</strong> {selectedReservation.phone}
                    </div>
                  </div>
                  
                  <div className="details-section">
                    <h3>Reservation Details</h3>
                    <div className="detail-item">
                      <strong>Car:</strong> {selectedReservation.carTitle}
                    </div>
                    <div className="detail-item">
                      <strong>Start Date:</strong> {formatDate(selectedReservation.startDate)}
                    </div>
                    <div className="detail-item">
                      <strong>End Date:</strong> {formatDate(selectedReservation.endDate)}
                    </div>
                    <div className="detail-item">
                      <strong>Status:</strong>
                      <span className={`status-chip status-${selectedReservation.status.toLowerCase()}`}>
                        {statusConfig[selectedReservation.status]?.label || selectedReservation.status}
                      </span>
                    </div>
                  </div>
                  
                  <div className="details-section">
                    <h3>Locations</h3>
                    <div className="detail-item">
                      <strong>Pickup:</strong> {selectedReservation.pickupLocation || '-'}
                    </div>
                    <div className="detail-item">
                      <strong>Dropoff:</strong> {selectedReservation.dropoffLocation || '-'}
                    </div>
                  </div>
                  
                  {selectedReservation.notes && (
                    <div className="details-section full-width">
                      <h3>Notes</h3>
                      <div className="notes">{selectedReservation.notes}</div>
                    </div>
                  )}
                  
                  <div className="details-section">
                    <h3>Change Status</h3>
                    <select
                      className="status-select"
                      value={selectedReservation.status}
                      onChange={(e) => updateReservationStatus(selectedReservation.id, e.target.value)}
                    >
                      <option value="PENDING">Pending</option>
                      <option value="CONFIRMED">Confirmed</option>
                      <option value="IN_PROGRESS">In Progress</option>
                      <option value="COMPLETED">Completed</option>
                      <option value="CANCELLED">Cancelled</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setViewDialogOpen(false)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteDialogOpen && reservationToDelete && (
        <div className="modal-overlay" onClick={() => setDeleteDialogOpen(false)}>
          <div className="modal modal-small" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Confirm Deletion</h2>
              <button className="close-btn" onClick={() => setDeleteDialogOpen(false)}>×</button>
            </div>
            
            <div className="modal-content">
              <p>Are you sure you want to delete reservation #{reservationToDelete.id}?</p>
              <p>This action cannot be undone.</p>
            </div>
            
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setDeleteDialogOpen(false)}>
                Cancel
              </button>
              <button 
                className="btn btn-danger" 
                onClick={() => deleteReservation(reservationToDelete.id)}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReservationsPage;
