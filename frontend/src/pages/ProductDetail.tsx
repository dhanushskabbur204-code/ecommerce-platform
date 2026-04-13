import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { productService, type Product } from '../services/productService';
import { cartService } from '../services/cartService';
import { useAuth } from '../context/AuthContext';
import { ShoppingCart, ArrowLeft, Minus, Plus, Loader2, Package } from 'lucide-react';
import toast from 'react-hot-toast';

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [adding, setAdding] = useState(false);

  useEffect(() => {
    if (id) {
      loadProduct(parseInt(id));
    }
  }, [id]);

  const loadProduct = async (productId: number) => {
    try {
      const data = await productService.getById(productId);
      setProduct(data);
    } catch {
      toast.error('Product not found');
      navigate('/');
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      toast.error('Please login to add items to cart');
      navigate('/login');
      return;
    }
    if (!product) return;

    setAdding(true);
    try {
      await cartService.addToCart(product.id, quantity);
      toast.success(`${quantity}x ${product.name} added to cart!`);
    } catch {
      toast.error('Failed to add to cart');
    } finally {
      setAdding(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-emerald-600" />
      </div>
    );
  }

  if (!product) return null;

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-slate-600 hover:text-emerald-600 mb-6 transition-colors">
          <ArrowLeft className="w-5 h-5" /> Back
        </button>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
            <div className="bg-slate-100 p-8 flex items-center justify-center">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="max-h-96 object-contain rounded-lg"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://via.placeholder.com/500x400?text=No+Image';
                }}
              />
            </div>

            <div className="p-8">
              <p className="text-sm text-emerald-600 font-medium uppercase tracking-wide mb-2">
                {product.category?.name}
              </p>
              <h1 className="text-3xl font-bold text-slate-900 mb-4">{product.name}</h1>
              <p className="text-slate-600 mb-6 leading-relaxed">{product.description}</p>

              <div className="text-4xl font-bold text-slate-900 mb-6">
                ${product.price.toFixed(2)}
              </div>

              <div className="flex items-center gap-2 mb-6">
                <Package className="w-5 h-5 text-slate-400" />
                <span className={`text-sm font-medium ${product.stockQuantity > 10 ? 'text-emerald-600' : product.stockQuantity > 0 ? 'text-orange-500' : 'text-red-500'}`}>
                  {product.stockQuantity > 10
                    ? 'In Stock'
                    : product.stockQuantity > 0
                    ? `Only ${product.stockQuantity} left`
                    : 'Out of Stock'}
                </span>
              </div>

              <div className="flex items-center gap-4 mb-6">
                <span className="text-sm font-medium text-slate-700">Quantity:</span>
                <div className="flex items-center border border-slate-200 rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 hover:bg-slate-100 rounded-l-lg transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-4 py-2 font-medium min-w-12 text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity(Math.min(product.stockQuantity, quantity + 1))}
                    className="p-2 hover:bg-slate-100 rounded-r-lg transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <button
                onClick={handleAddToCart}
                disabled={product.stockQuantity === 0 || adding}
                className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-300 text-white py-3 px-6 rounded-lg font-semibold flex items-center justify-center gap-2 transition-colors"
              >
                {adding ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <ShoppingCart className="w-5 h-5" />
                )}
                {adding ? 'Adding...' : 'Add to Cart'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
