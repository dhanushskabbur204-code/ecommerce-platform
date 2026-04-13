import { useEffect, useState } from 'react';
import { orderService, type Order } from '../services/orderService';
import { Package, Loader2, Clock, CheckCircle, Truck, XCircle } from 'lucide-react';

const statusConfig: Record<string, { icon: React.ReactNode; color: string; bg: string }> = {
  PENDING: { icon: <Clock className="w-4 h-4" />, color: 'text-yellow-600', bg: 'bg-yellow-50' },
  CONFIRMED: { icon: <CheckCircle className="w-4 h-4" />, color: 'text-blue-600', bg: 'bg-blue-50' },
  SHIPPED: { icon: <Truck className="w-4 h-4" />, color: 'text-purple-600', bg: 'bg-purple-50' },
  DELIVERED: { icon: <CheckCircle className="w-4 h-4" />, color: 'text-emerald-600', bg: 'bg-emerald-50' },
  CANCELLED: { icon: <XCircle className="w-4 h-4" />, color: 'text-red-600', bg: 'bg-red-50' },
};

export default function Orders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      const data = await orderService.getMyOrders();
      setOrders(data);
    } catch {
      console.error('Failed to load orders');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-emerald-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-slate-900 mb-8">My Orders</h1>

        {orders.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl shadow">
            <Package className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <p className="text-slate-500 text-lg">No orders yet</p>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => {
              const status = statusConfig[order.status] || statusConfig.PENDING;
              return (
                <div key={order.id} className="bg-white rounded-xl shadow overflow-hidden">
                  <div className="p-6 border-b border-slate-100">
                    <div className="flex flex-wrap items-center justify-between gap-4">
                      <div>
                        <span className="text-sm text-slate-500">Order #{order.id}</span>
                        <p className="text-sm text-slate-400 mt-1">
                          {new Date(order.createdAt).toLocaleDateString('en-US', {
                            year: 'numeric', month: 'long', day: 'numeric',
                          })}
                        </p>
                      </div>
                      <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium ${status.color} ${status.bg}`}>
                        {status.icon}
                        {order.status}
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="space-y-3">
                      {order.items.map((item) => (
                        <div key={item.id} className="flex items-center gap-4">
                          <img
                            src={item.product.imageUrl}
                            alt={item.product.name}
                            className="w-12 h-12 object-cover rounded"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = 'https://via.placeholder.com/50';
                            }}
                          />
                          <div className="flex-1">
                            <p className="text-sm font-medium text-slate-800">{item.product.name}</p>
                            <p className="text-xs text-slate-500">Qty: {item.quantity} x ${item.price.toFixed(2)}</p>
                          </div>
                          <span className="text-sm font-medium">${(item.quantity * item.price).toFixed(2)}</span>
                        </div>
                      ))}
                    </div>
                    <div className="border-t border-slate-100 mt-4 pt-4 flex justify-between">
                      <div className="text-sm text-slate-500">
                        <p>Ship to: {order.shippingAddress}</p>
                        <p>Payment: {order.paymentMethod}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-slate-500">Total</p>
                        <p className="text-xl font-bold text-emerald-600">${order.totalAmount.toFixed(2)}</p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
