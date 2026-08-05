import React, { useState, useEffect } from 'react';
import { Plus, X, Save, Edit, Trash2 } from 'lucide-react';
import api from '../../utils/api';
import { showToast } from '../../components/ToastContainer';
import LoadingSpinner from '../../components/LoadingSpinner';

export default function EcosystemManagement() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditingProduct, setIsEditingProduct] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);

  const initialProductState = {
    id: '', name: '', category: '', tagline: '', description: '', 
    icon: 'HelpCircle', color: 'from-gray-500 to-gray-600', bgColor: 'bg-gray-50', 
    borderColor: 'border-gray-200', iconColor: 'text-gray-600', imageUrl: '', features: ''
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await api.get('/ecosystem');
      setProducts(res.data);
    } catch (err) {
      showToast('Failed to fetch products: ' + err.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleEditProduct = (product) => {
    setCurrentProduct({ ...product, features: product.features.join('\n') });
    setIsEditingProduct(true);
  };

  const handleCreateProduct = () => {
    setCurrentProduct(initialProductState);
    setIsEditingProduct(true);
  };

  const handleDeleteProduct = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    try {
      await api.delete(`/admin/ecosystem/${id}`);
      fetchProducts();
      showToast('Product deleted', 'success');
    } catch (err) {
      showToast('Delete failed: ' + err.message, 'error');
    }
  };

  const handleSubmitProduct = async (e) => {
    e.preventDefault();
    const payload = {
      ...currentProduct,
      features: currentProduct.features.split('\n').filter(f => f.trim() !== '')
    };

    try {
      if (products.find(p => p.id === payload.id)) {
        await api.put(`/admin/ecosystem/${payload.id}`, payload);
      } else {
        await api.post(`/admin/ecosystem`, payload);
      }
      setIsEditingProduct(false);
      fetchProducts();
      showToast('Product saved successfully', 'success');
    } catch (err) {
      showToast('Save failed: ' + err.message, 'error');
    }
  };

  if (loading && !isEditingProduct) return <LoadingSpinner size="lg" className="py-20" />;

  return (
    <div>
      <h2 className="text-2xl font-bold text-slate-900 mb-6">Ecosystem Management</h2>
      
      {!isEditingProduct ? (
        <div>
          <div className="flex justify-end mb-4">
            <button onClick={handleCreateProduct} className="px-4 py-2 bg-slate-900 text-white rounded-lg flex items-center gap-2 hover:bg-slate-800 transition-colors">
              <Plus className="w-4 h-4" /> Add Product
            </button>
          </div>
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-500 text-sm border-b">
                <th className="p-4 font-medium">Name</th>
                <th className="p-4 font-medium">Category</th>
                <th className="p-4 font-medium">ID</th>
                <th className="p-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map(p => (
                <tr key={p.id} className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                  <td className="p-4 font-semibold text-slate-800">{p.name}</td>
                  <td className="p-4"><span className="px-2 py-1 bg-slate-200 rounded text-xs">{p.category}</span></td>
                  <td className="p-4 text-slate-500 text-sm">{p.id}</td>
                  <td className="p-4 text-right">
                    <button onClick={() => handleEditProduct(p)} className="p-2 text-slate-400 hover:text-slate-800 hover:bg-slate-100 rounded mr-2"><Edit className="w-4 h-4" /></button>
                    <button onClick={() => handleDeleteProduct(p.id)} className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded"><Trash2 className="w-4 h-4" /></button>
                  </td>
                </tr>
              ))}
              {products.length === 0 && <tr><td colSpan="4" className="p-8 text-center text-slate-500">No products found.</td></tr>}
            </tbody>
          </table>
        </div>
      ) : (
        <form onSubmit={handleSubmitProduct} className="space-y-6 bg-slate-50 p-6 rounded-2xl border border-slate-200">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">{currentProduct.id ? 'Edit Product' : 'New Product'}</h2>
            <button type="button" onClick={() => setIsEditingProduct(false)} className="text-slate-500 hover:text-slate-800"><X /></button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">ID (URL slug)</label>
              <input type="text" required disabled={!!products.find(p => p.id === currentProduct.id)} value={currentProduct.id} onChange={e => setCurrentProduct({...currentProduct, id: e.target.value})} className="w-full p-2 border rounded" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Name</label>
              <input type="text" required value={currentProduct.name} onChange={e => setCurrentProduct({...currentProduct, name: e.target.value})} className="w-full p-2 border rounded" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Category</label>
              <input type="text" required value={currentProduct.category} onChange={e => setCurrentProduct({...currentProduct, category: e.target.value})} className="w-full p-2 border rounded" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Tagline</label>
              <input type="text" required value={currentProduct.tagline} onChange={e => setCurrentProduct({...currentProduct, tagline: e.target.value})} className="w-full p-2 border rounded" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">Description</label>
              <textarea required value={currentProduct.description} onChange={e => setCurrentProduct({...currentProduct, description: e.target.value})} className="w-full p-2 border rounded h-24" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">Features (One per line)</label>
              <textarea required value={currentProduct.features} onChange={e => setCurrentProduct({...currentProduct, features: e.target.value})} className="w-full p-2 border rounded h-32" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Image URL</label>
              <input type="text" value={currentProduct.imageUrl} onChange={e => setCurrentProduct({...currentProduct, imageUrl: e.target.value})} className="w-full p-2 border rounded" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Lucide Icon Name</label>
              <input type="text" required value={currentProduct.icon} onChange={e => setCurrentProduct({...currentProduct, icon: e.target.value})} className="w-full p-2 border rounded" />
            </div>
          </div>
          
          <div className="flex justify-end gap-3 pt-4 border-t">
            <button type="button" onClick={() => setIsEditingProduct(false)} className="px-4 py-2 text-slate-600 hover:bg-slate-200 rounded">Cancel</button>
            <button type="submit" className="px-4 py-2 bg-slate-900 text-white rounded flex items-center gap-2 hover:bg-slate-800 transition-colors"><Save className="w-4 h-4"/> Save Product</button>
          </div>
        </form>
      )}
    </div>
  );
}
