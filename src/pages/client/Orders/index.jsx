import React, { useState, useEffect } from 'react';
import { Layout, Card, Badge, Button, Spin, Empty, Divider, Modal, Image } from 'antd';
import { Package, Eye, Calendar, CreditCard, MapPin, Phone, Mail } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ordersAPI } from '../../../utils/api';
import { toast } from 'react-toastify';

const { Content } = Layout;

const OrderHistoryPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await ordersAPI.getUserOrders();
      setOrders(response.data.data || []);
    } catch (error) {
      console.error('Error fetching orders:', error);
      toast.error('Failed to fetch orders');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      'pending': 'orange',
      'confirmed': 'blue',
      'processing': 'cyan',
      'shipped': 'purple',
      'delivered': 'green',
      'cancelled': 'red'
    };
    return colors[status] || 'default';
  };

  const getStatusText = (status) => {
    const texts = {
      'pending': 'Pending',
      'confirmed': 'Confirmed',
      'processing': 'Processing',
      'shipped': 'Shipped',
      'delivered': 'Delivered',
      'cancelled': 'Cancelled'
    };
    return texts[status] || status;
  };

  const handleViewOrder = (order) => {
    setSelectedOrder(order);
    setModalVisible(true);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="bg-gray-50 min-h-screen flex items-center justify-center">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <Layout className="min-h-screen bg-gray-50">
      <Content className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Order History</h1>
          <p className="text-gray-600 mt-2">Track and manage all your orders</p>
        </div>

        {orders.length === 0 ? (
          <Card className="text-center py-12">
            <Empty
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              description={
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No orders found</h3>
                  <p className="text-gray-500 mb-4">You haven't placed any orders yet.</p>
                  <Button
                    type="primary"
                    size="large"
                    onClick={() => navigate('/men/shirts')}
                    className="bg-[#0F172A]"
                  >
                    Start Shopping
                  </Button>
                </div>
              }
            />
          </Card>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <Card key={order._id} className="shadow-sm hover:shadow-md transition-shadow">
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-2">
                      <div className="flex items-center gap-2">
                        <Package size={20} className="text-gray-500" />
                        <span className="font-semibold text-lg">Order #{order.orderNumber}</span>
                      </div>
                      <Badge 
                        color={getStatusColor(order.status)} 
                        text={getStatusText(order.status)}
                        className="font-medium"
                      />
                    </div>
                    
                    <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                      <div className="flex items-center gap-1">
                        <Calendar size={16} />
                        <span>{formatDate(order.createdAt)}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <CreditCard size={16} />
                        <span className="capitalize">{order.paymentMethod}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <span className="text-sm text-gray-600">
                        {order.items.length} item{order.items.length > 1 ? 's' : ''}
                      </span>
                      <span className="text-lg font-bold text-green-600">
                        Rs: {order.total.toFixed(2)}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button
                      type="default"
                      icon={<Eye size={16} />}
                      onClick={() => handleViewOrder(order)}
                    >
                      View Details
                    </Button>
                  </div>
                </div>

                {/* Quick preview of items */}
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="flex gap-4 overflow-x-auto">
                    {order.items.slice(0, 4).map((item, index) => (
                      <div key={index} className="flex-shrink-0">
                        <img
                          src={`http://localhost:5000${item.image}`}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded"
                          onError={(e) => {
                            e.target.src = 'https://via.placeholder.com/64x64?text=No+Image';
                          }}
                        />
                      </div>
                    ))}
                    {order.items.length > 4 && (
                      <div className="flex-shrink-0 w-16 h-16 bg-gray-100 rounded flex items-center justify-center">
                        <span className="text-sm text-gray-500">+{order.items.length - 4}</span>
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* Order Details Modal */}
        <Modal
          title={`Order Details - #${selectedOrder?.orderNumber}`}
          open={modalVisible}
          onCancel={() => setModalVisible(false)}
          footer={null}
          width={800}
          className="order-details-modal"
        >
          {selectedOrder && (
            <div className="space-y-6">
              {/* Order Status */}
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <Package size={24} className="text-gray-600" />
                  <div>
                    <h3 className="font-semibold">Order Status</h3>
                    <p className="text-sm text-gray-600">{formatDate(selectedOrder.createdAt)}</p>
                  </div>
                </div>
                <Badge 
                  color={getStatusColor(selectedOrder.status)} 
                  text={getStatusText(selectedOrder.status)}
                  className="font-medium text-lg"
                />
              </div>

              {/* Order Items */}
              <div>
                <h3 className="font-semibold mb-4">Order Items</h3>
                <div className="space-y-4">
                  {selectedOrder.items.map((item, index) => (
                    <div key={index} className="flex gap-4 p-4 bg-gray-50 rounded-lg">
                      <Image
                        src={`http://localhost:5000${item.image}`}
                        alt={item.name}
                        width={80}
                        height={80}
                        className="object-cover rounded"
                        fallback="https://via.placeholder.com/80x80?text=No+Image"
                      />
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{item.name}</h4>
                        <div className="flex items-center gap-4 mt-1 text-sm text-gray-600">
                          <span>Size: <span className="font-medium">{item.size}</span></span>
                          <span>Qty: <span className="font-medium">{item.quantity}</span></span>
                          <span>Price: <span className="font-medium">Rs: {item.price.toFixed(2)}</span></span>
                        </div>
                        <div className="mt-2">
                          <span className="font-semibold text-gray-900">
                            Total: Rs: {(item.price * item.quantity).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Order Summary */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold mb-3">Order Summary</h3>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal</span>
                    <span>Rs: {selectedOrder.subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Shipping</span>
                    <span>{selectedOrder.shipping === 0 ? 'Free' : `Rs: ${selectedOrder.shipping.toFixed(2)}`}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Tax</span>
                    <span>Rs: {selectedOrder.tax.toFixed(2)}</span>
                  </div>
                  <Divider className="my-2" />
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total</span>
                    <span className="text-green-600">Rs: {selectedOrder.total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Shipping Address */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <MapPin size={18} />
                  Shipping Address
                </h3>
                <div className="text-sm space-y-1">
                  <p className="font-medium">
                    {selectedOrder.shippingAddress.firstName} {selectedOrder.shippingAddress.lastName}
                  </p>
                  <p>{selectedOrder.shippingAddress.address}</p>
                  {selectedOrder.shippingAddress.apartment && (
                    <p>{selectedOrder.shippingAddress.apartment}</p>
                  )}
                  <p>
                    {selectedOrder.shippingAddress.city}, {selectedOrder.shippingAddress.state} {selectedOrder.shippingAddress.zipCode}
                  </p>
                  <div className="flex items-center gap-4 mt-2 pt-2 border-t border-gray-200">
                    <div className="flex items-center gap-1">
                      <Mail size={14} />
                      <span>{selectedOrder.shippingAddress.email}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Phone size={14} />
                      <span>{selectedOrder.shippingAddress.phone}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <CreditCard size={18} />
                  Payment Method
                </h3>
                <div className="flex items-center justify-between">
                  <span className="capitalize">
                    {selectedOrder.paymentMethod === 'cod' ? 'Cash on Delivery' : 
                     selectedOrder.paymentMethod === 'card' ? 'Credit/Debit Card' :
                     selectedOrder.paymentMethod === 'paypal' ? 'PayPal' :
                     selectedOrder.paymentMethod}
                  </span>
                  <Badge 
                    color={selectedOrder.paymentMethod === 'cod' ? 'orange' : 'green'}
                    text={selectedOrder.paymentMethod === 'cod' ? 'Pending' : 'Paid'}
                  />
                </div>
              </div>
            </div>
          )}
        </Modal>
      </Content>
    </Layout>
  );
};

export default OrderHistoryPage;
;