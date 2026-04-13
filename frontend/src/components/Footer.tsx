import { Store, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 text-xl font-bold text-emerald-400 mb-4">
              <Store className="w-6 h-6" />
              ShopEase
            </div>
            <p className="text-sm text-slate-400">
              Your one-stop destination for quality products at great prices.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="/" className="hover:text-emerald-400 transition-colors">Home</a></li>
              <li><a href="/cart" className="hover:text-emerald-400 transition-colors">Cart</a></li>
              <li><a href="/orders" className="hover:text-emerald-400 transition-colors">My Orders</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-white mb-4">Categories</h3>
            <ul className="space-y-2 text-sm">
              <li>Electronics</li>
              <li>Clothing</li>
              <li>Books</li>
              <li>Home & Garden</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-white mb-4">Contact Us</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2"><Mail className="w-4 h-4" /> support@shopease.com</li>
              <li className="flex items-center gap-2"><Phone className="w-4 h-4" /> +1 (555) 123-4567</li>
              <li className="flex items-center gap-2"><MapPin className="w-4 h-4" /> 123 Commerce St</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-slate-800 mt-8 pt-8 text-center text-sm text-slate-500">
          &copy; {new Date().getFullYear()} ShopEase E-Commerce Platform. All rights reserved.
          <br />
          <span className="text-xs">Built with Spring Boot + React | Final Year Internship Project</span>
        </div>
      </div>
    </footer>
  );
}
