import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "./reservationsPage.css";
import { IoIosClose } from "react-icons/io";
import { FiSearch, FiEye, FiTrash2, FiAlertTriangle, FiClipboard, FiRefreshCw } from "react-icons/fi";
import { BsExclamationTriangle } from "react-icons/bs";

const ReservationsPage = () => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [selectedReservation, setSelectedReservation] = useState(null);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [reservationToDelete, setReservationToDelete] = useState(null);
  const [statusUpdateDialogOpen, setStatusUpdateDialogOpen] = useState(false);
  const [statusUpdateData, setStatusUpdateData] = useState({ id: null, newStatus: "", oldStatus: "" });
  // Status mappings
  const statusConfig = {
    PENDING: { color: "warning", label: "Pending" },
    CONFIRMED: { color: "success", label: "Confirmed" },
    CANCELLED: { color: "error", label: "Cancelled" },
    COMPLETED: { color: "info", label: "Completed" },
    IN_PROGRESS: { color: "primary", label: "In Progress" },
  };

  // Fetch reservations from API
  const fetchReservations = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:8081/api/reservations");

      if (!response.ok) {
        throw new Error("Failed to fetch reservations");
      }

      const data = await response.json();
      setReservations(data);
      setError("");
    } catch (err) {
      console.error("Error fetching reservations:", err);
      setError("Failed to load reservations. Please check if the backend is running.");
      toast.error("Error loading reservations");
    } finally {
      setLoading(false);
    }
  };
  // Update reservation status
  const updateReservationStatus = async (id, newStatus) => {
    try {
      const response = await fetch(`http://localhost:8081/api/reservations/${id}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) {
        throw new Error("Failed to update reservation status");
      } // Refresh the list
      await fetchReservations();      toast.success("Reservation status has been updated");
      setStatusUpdateDialogOpen(false);
      setStatusUpdateData({ id: null, newStatus: "", oldStatus: "" });
      // Enable body scroll
      document.body.style.overflow = 'unset';
      document.body.classList.remove('modal-open');
    } catch (err) {
      console.error("Error updating reservation status:", err);
      toast.error("Error updating status");
    }
  };  // Handle status change confirmation
  const handleStatusChange = (id, newStatus, oldStatus) => {
    setStatusUpdateData({ id, newStatus, oldStatus });
    setStatusUpdateDialogOpen(true);
    // Disable body scroll
    document.body.style.overflow = 'hidden';
    document.body.classList.add('modal-open');
  };

  // Handle close status update modal
  const handleCloseStatusUpdateModal = () => {
    setStatusUpdateDialogOpen(false);
    setStatusUpdateData({ id: null, newStatus: '', oldStatus: '' });
    // Enable body scroll
    document.body.style.overflow = 'unset';
    document.body.classList.remove('modal-open');
  };

  // Confirm status update
  const confirmStatusUpdate = () => {
    updateReservationStatus(statusUpdateData.id, statusUpdateData.newStatus);
  };

  // Delete reservation
  const deleteReservation = async (id) => {
    try {
      const response = await fetch(`http://localhost:8081/api/reservations/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete reservation");
      } // Refresh the list
      await fetchReservations();      toast.success("Reservation has been deleted");
      setDeleteDialogOpen(false);
      setReservationToDelete(null);
      // Enable body scroll
      document.body.style.overflow = 'unset';
      document.body.classList.remove('modal-open');
    } catch (err) {
      console.error("Error deleting reservation:", err);
      toast.error("Error deleting reservation");
    }
  };

  // Filter reservations based on search term and status
  const filteredReservations = reservations.filter((reservation) => {
    const matchesSearch =
      !searchTerm ||
      reservation.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reservation.lastName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reservation.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reservation.carTitle?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reservation.id?.toString().includes(searchTerm);

    const matchesStatus = statusFilter === "ALL" || reservation.status === statusFilter;

    return matchesSearch && matchesStatus;
  });  // Handle view reservation details
  const handleViewReservation = (reservation) => {
    setSelectedReservation(reservation);
    setViewDialogOpen(true);
    // Disable body scroll
    document.body.style.overflow = 'hidden';
    document.body.classList.add('modal-open');
  };

  // Handle close view modal
  const handleCloseViewModal = () => {
    setViewDialogOpen(false);
    setSelectedReservation(null);
    // Enable body scroll
    document.body.style.overflow = 'unset';
    document.body.classList.remove('modal-open');
  };  // Handle delete confirmation
  const handleDeleteClick = (reservation) => {
    setReservationToDelete(reservation);
    setDeleteDialogOpen(true);
    // Disable body scroll
    document.body.style.overflow = 'hidden';
    document.body.classList.add('modal-open');
  };

  // Handle close delete modal
  const handleCloseDeleteModal = () => {
    setDeleteDialogOpen(false);
    setReservationToDelete(null);
    // Enable body scroll
    document.body.style.overflow = 'unset';
    document.body.classList.remove('modal-open');
  };

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return "-";
    return new Date(dateString).toLocaleDateString("pl-PL");
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
  // Cleanup scroll lock when component unmounts
  useEffect(() => {
    return () => {
      document.body.style.overflow = 'unset';
      document.body.classList.remove('modal-open');
    };
  }, []);
  return (
    <div className="reservations-page">
      <div className="reservations-container">
        {" "}
        {/* Page Header */}
        <div className="page-header">
          <h1 className="page-title">Reservations Management</h1>
          {/* <button className="refresh-btn" onClick={fetchReservations} disabled={loading}>
            <FiRefreshCw className="btn-icon" />
            Refresh
          </button> */}
        </div>
        {/* Filters */}
        <div className="filters-card">
          <div className="filters-content">
            {" "}
            <div className="filter-group">
              <div className="search-container">
                <FiSearch className="search-icon" />
                <input
                  type="text"
                  className="search-input"
                  placeholder="Search by name, surname, email or ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div className="filter-group">
              <label className="filter-label">Status</label>
              <select className="status-select" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                <option value="ALL">All</option>
                <option value="PENDING">Pending</option>
                <option value="CONFIRMED">Confirmed</option>
                <option value="IN_PROGRESS">In Progress</option>
                <option value="COMPLETED">Completed</option>
                <option value="CANCELLED">Cancelled</option>
              </select>
            </div>
            <div className="filter-group">
              <span className="results-count">Found: {filteredReservations.length}</span>
            </div>
          </div>
        </div>{" "}
        {/* Error Display */}
        {error && (
          <div className="error-alert">
            <BsExclamationTriangle className="error-icon" />
            {error}
          </div>
        )}
        {/* Reservations Table */}
        <div className="table-card">
          <div className="table-content">
            {" "}
            {loading ? (
              <div className="loading-container">
                <div className="spinner"></div>
                <span>Loading reservations...</span>
              </div>
            ) : (
              <div className="table-container">
                <table className="reservations-table">
                  {" "}
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Client</th>
                      <th>Car</th>
                      <th>Period</th>
                      <th>Value</th>
                      <th>Status</th>
                      <th>Created Date</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredReservations.length === 0 ? (
                      <tr>
                        {" "}
                        <td colSpan="8" className="no-data">
                          <div className="no-data-content">
                            <FiClipboard className="no-data-icon" />
                            <span>No reservations to display</span>
                          </div>
                        </td>
                      </tr>
                    ) : (
                      filteredReservations.map((reservation) => (
                        <tr key={reservation.id} className="table-row">
                          <td>#{reservation.id}</td>
                          <td>
                            <div className="client-info">
                              <div className="client-name">
                                {reservation.firstName} {reservation.lastName}
                              </div>
                              <div className="client-email">{reservation.email}</div>
                            </div>
                          </td>
                          <td>
                            <div className="car-title">{reservation.carTitle}</div>
                          </td>
                          <td>
                            <div className="date-range">
                              {formatDate(reservation.startDate)} - {formatDate(reservation.endDate)}
                            </div>
                          </td>
                          <td>
                            <div className="price">{calculateTotalPrice(reservation).toLocaleString("pl-PL")} PLN</div>
                          </td>
                          <td>
                            <span className={`status-chip status-${reservation.status.toLowerCase()}`}>
                              {statusConfig[reservation.status]?.label || reservation.status}
                            </span>
                          </td>
                          <td>{formatDate(reservation.createdAt)}</td>
                          <td>
                            {" "}
                            <div className="actions">
                              <button className="action-btn view-btn" onClick={() => handleViewReservation(reservation)} title="View details">
                                <FiEye />
                              </button>
                              <button className="action-btn delete-btn" onClick={() => handleDeleteClick(reservation)} title="Delete reservation">
                                <FiTrash2 />
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
        </div>        {/* View Reservation Modal */}
        {viewDialogOpen && (
          <div className="modal-overlay" onClick={handleCloseViewModal}>
            {" "}
            <div className="modal" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h2>Reservation Details #{selectedReservation?.id}</h2>
                <IoIosClose className="close-btn-icon" onClick={handleCloseViewModal} />
              </div>

              <div className="modal-content">
                {selectedReservation && (
                  <div className="reservation-details">
                    {" "}
                    <div className="details-section">
                      <h3>Client Data</h3>
                      <div className="detail-item">
                        <strong>First Name:</strong> {selectedReservation.firstName}
                      </div>
                      <div className="detail-item">
                        <strong>Last Name:</strong> {selectedReservation.lastName}
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
                        <strong>Pickup Location:</strong> {selectedReservation.pickupLocation || "-"}
                      </div>
                      <div className="detail-item">
                        <strong>Dropoff Location:</strong> {selectedReservation.dropoffLocation || "-"}
                      </div>
                    </div>
                    {selectedReservation.notes && (
                      <div className="details-section">
                        <h3>Notes</h3>
                        <div className="notes">{selectedReservation.notes}</div>
                      </div>
                    )}{" "}
                    <div className="details-section">
                      <h3>Change Status</h3>
                      <select
                        className="status-select"
                        value={selectedReservation.status}
                        onChange={(e) => handleStatusChange(selectedReservation.id, e.target.value, selectedReservation.status)}
                      >
                        <option value="PENDING">Pending</option>
                        <option value="CONFIRMED">Confirmed</option>
                        <option value="IN_PROGRESS">In Progress</option>
                        <option value="COMPLETED">Completed</option>
                        <option value="CANCELLED">Cancelled</option>
                      </select>
                    </div>
                  </div>
                )}
              </div>              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={handleCloseViewModal}>
                  Close
                </button>
              </div>
            </div>
          </div>
        )}        {/* Delete Confirmation Modal */}
        {deleteDialogOpen && (
          <div className="modal-overlay" onClick={handleCloseDeleteModal}>
            {" "}
            <div className="modal modal-small" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h2>Confirm Deletion</h2>
                {/* <button 
                className="close-btn"
                onClick={() => setDeleteDialogOpen(false)}
              >
                <IoIosClose className='close-btn-icon' />
              </button> */}
                <IoIosClose className="close-btn-icon" onClick={handleCloseDeleteModal} />
              </div>

              <div className="modal-content">
                <p>
                  Are you sure you want to delete reservation #{reservationToDelete?.id}?
                  <br />
                  <strong>This operation is irreversible.</strong>
                </p>
              </div>              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={handleCloseDeleteModal}>
                  Cancel
                </button>
                <button className="btn btn-danger" onClick={() => deleteReservation(reservationToDelete?.id)}>
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}        {/* Status Update Confirmation Modal */}
        {statusUpdateDialogOpen && (
          <div className="modal-overlay" onClick={handleCloseStatusUpdateModal}>
            <div className="modal modal-small" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h2>Confirm Status Change</h2>
                <IoIosClose className="close-btn-icon" onClick={handleCloseStatusUpdateModal} />
              </div>

              <div className="modal-content">
                <p>
                  Are you sure you want to change the status from{" "}
                  <strong>{statusConfig[statusUpdateData.oldStatus]?.label || statusUpdateData.oldStatus}</strong> to{" "}
                  <strong>{statusConfig[statusUpdateData.newStatus]?.label || statusUpdateData.newStatus}</strong>?
                  <br />
                  <br />
                  This action will update the reservation status immediately.
                </p>
              </div>              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={handleCloseStatusUpdateModal}>
                  Cancel
                </button>
                <button className="btn btn-primary" onClick={confirmStatusUpdate}>
                  Update Status
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReservationsPage;
