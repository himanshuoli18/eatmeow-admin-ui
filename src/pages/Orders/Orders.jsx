import moment from 'moment';
import { useCallback, useEffect, useState } from 'react';
import './Orders.css';
import { getAllOrders } from '../../services/OrderService';
import { updateOrderStatus } from '../../services/OrderService';

const Orders = () => {
  const [data, setData] = useState([]);
  const [statusMap, setStatusMap] = useState({});
  const [loading, setLoading] = useState(true);

  const fetchOrders = useCallback(async () => {
    setLoading(true);
    try {
      const response = await getAllOrders();
      const sorted = response.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setData(sorted);

      const initialStatus = Object.fromEntries(
        sorted.map(order => [order.id, order.orderStatus])
      );
      setStatusMap(initialStatus);
    } catch (error) {
      console.error('Failed to fetch orders:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await updateOrderStatus(orderId, newStatus);
      fetchOrders(); // refresh after successful update
    } catch (error) {
      console.error('Failed to update order status:', error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'preparing':
        return 'status-select status-preparing';
      case 'out for delivery':
        return 'status-select status-out-for-delivery';
      case 'delivered':
        return 'status-select status-delivered';
      default:
        return 'status-select';
    }
  };

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>Orders</h3>
        <button className="btn btn-outline-primary btn-sm" onClick={fetchOrders}>
          <i className="bi bi-arrow-clockwise me-1"></i> Refresh
        </button>
      </div>

      {loading ? (
        <div className="text-center py-5">Loading orders...</div>
      ) : data.length === 0 ? (
        <div className="text-center py-5 text-muted">No orders are placed yet.</div>
      ) : (
        data.map((order, index) => (
          <div key={order.id || index} className="card mb-4 shadow-sm">
            <div className="card-header d-flex justify-content-between align-items-center">
              <span className="fw-bold">Order #{order.id}</span>
              <div className={`status-wrapper ${getStatusColor(statusMap[order.id])}`} style={{ position: 'relative' }}>
                <select
                  className="form-select form-select-sm text-white border-0 bg-transparent status-dropdown pe-4"
                  value={statusMap[order.id]}
                  onChange={(e) => handleStatusChange(order.id, e.target.value)}
                >
                  <option value="Preparing">Preparing</option>
                  <option value="Out For Delivery">Out For Delivery</option>
                  <option value="Delivered">Delivered</option>
                </select>
                <i className="bi bi-caret-down-fill text-white position-absolute" style={{
                  right: '10px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  pointerEvents: 'none'
                }}></i>
              </div>
            </div>
            <div className="card-body">
              <div className="mb-3">
                <div className="fw-semibold">Customer Details</div>
                <div className="text-muted small">
                  👤 {order.email} | 📞 {order.phoneNumber}
                </div>
                <div className="text-muted small">
                  📍 {order.userAddress}
                </div>
              </div>
              <div className="row g-3">
                {order.orderedItems?.map((item, idx) => (
                  <div key={idx} className="col-md-4 d-flex">
                    <img
                      src={item.imageUrl || '/placeholder.png'}
                      alt={item.name}
                      className="me-3 rounded"
                      style={{ width: 64, height: 64, objectFit: 'cover' }}
                    />
                    <div>
                      <div className="fw-semibold">{item.name}</div>
                      <div className="text-muted small">
                        ₹{item.price} × {item.quantity}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <hr />
              <div className="d-flex justify-content-between">
                <div className="text-muted small">
                  Ordered on {moment(order.createdAt).format('MMMM Do YYYY, h:mm A')}
                </div>
                <div className="fw-bold">Total: ₹{order.amount}</div>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Orders;
