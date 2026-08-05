import { Users, Package, Shield, Edit } from "lucide-react";
import { User, MessageCircle, HelpCircle, Save, X, Trash2, Plus, ShieldCheck } from "lucide-react";
import LoadingSpinner from "../components/LoadingSpinner";

import React from "react";

import { useState, useEffect } from 'react';
import api from '../utils/api';
import { showToast } from '../components/ToastContainer';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('users'); // 'users', 'questions', 'products'
  const [loading, setLoading] = useState(true);
  
  // Data states
  const [users, setUsers] = useState([]);
  const [questions, setQuestions] = useState([]);
  
  // Product States
  const [products, setProducts] = useState([]);
  const [isEditingProduct, setIsEditingProduct] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);

  const initialProductState = {
    id: '', name: '', category: '', tagline: '', description: '', 
    icon: 'HelpCircle', color: 'from-gray-500 to-gray-600', bgColor: 'bg-gray-50', 
    borderColor: 'border-gray-200', iconColor: 'text-gray-600', imageUrl: '', features: ''
  };

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const fetchData = async () => {
    setLoading(true);
    try {
      if (activeTab === 'users') {
        const res = await api.get('/admin/users');
        setUsers(res.data);
      } else if (activeTab === 'questions') {
        const res = await api.get('/admin/questions');
        setQuestions(res.data);
      } else if (activeTab === 'products') {
        const res = await api.get('/ecosystem');
        setProducts(res.data);
      }
    } catch (err) {
      showToast('Failed to fetch data: ' + err.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  // --- Users Handlers ---
  const handleDeleteUser = async (id) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;
    try {
      await api.delete(`/admin/users/${id}`);
      setUsers(users.filter(u => u.id !== id));
      showToast('User deleted', 'success');
    } catch (err) {
      showToast('Delete failed: ' + err.message, 'error');
    }
  };

  const handleToggleRole = async (id, currentRole) => {
    const newRole = currentRole === 'ADMIN' ? 'STUDENT' : 'ADMIN';
    if (!window.confirm(`Change role to ${newRole}?`)) return;
    try {
      await api.patch(`/admin/users/${id}/role?role=${newRole}`);
      setUsers(users.map(u => u.id === id ? { ...u, role: newRole } : u));
      showToast(`User role updated to ${newRole}`, 'success');
    } catch (err) {
      showToast('Update failed: ' + err.message, 'error');
    }
  };

  // --- Questions Handlers ---
  const handleDeleteQuestion = async (id) => {
    if (!window.confirm('Are you sure you want to delete this question?')) return;
    try {
      await api.delete(`/admin/questions/${id}`);
      setQuestions(questions.filter(q => q.id !== id));
      showToast('Question deleted', 'success');
    } catch (err) {
      showToast('Delete failed: ' + err.message, 'error');
    }
  };

  // --- Products Handlers ---
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
      fetchData();
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
      fetchData();
      showToast('Product saved successfully', 'success');
    } catch (err) {
      showToast('Save failed: ' + err.message, 'error');
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-3xl shadow-sm border border-slate-200">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 pb-4 border-b border-slate-100 gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-slate-800 rounded-xl text-white">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Admin Dashboard</h1>
            <p className="text-slate-500">Manage Platform Resources</p>
          </div>
        </div>
        
        {/* Tabs */}
        <div className="flex bg-slate-100 p-1 rounded-xl">
          <button 
            onClick={() => { setActiveTab('users'); setIsEditingProduct(false); }} 
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${activeTab === 'users' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
          >
            <Users className="w-4 h-4" /> Users
          </button>
          <button 
            onClick={() => { setActiveTab('questions'); setIsEditingProduct(false); }} 
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${activeTab === 'questions' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
          >
            <MessageCircle className="w-4 h-4" /> Questions
          </button>
          <button 
            onClick={() => { setActiveTab('products'); setIsEditingProduct(false); }} 
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${activeTab === 'products' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
          >
            <Package className="w-4 h-4" /> Products
          </button>
        </div>
      </div>

      {loading && !isEditingProduct ? (
        <LoadingSpinner size="lg" className="py-20" />
      ) : (
        <div className="overflow-x-auto">
          {activeTab === 'users' && (
            <table className="w-full text-left border-collapse min-w-[600px]">
              <thead>
                <tr className="bg-slate-50 text-slate-500 text-sm border-b">
                  <th className="p-4 font-medium">Username</th>
                  <th className="p-4 font-medium">Email</th>
                  <th className="p-4 font-medium">Role</th>
                  <th className="p-4 font-medium">Reputation</th>
                  <th className="p-4 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map(u => (
                  <tr key={u.id} className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                    <td className="p-4 font-semibold text-slate-800">{u.username}</td>
                    <td className="p-4 text-slate-600">{u.email}</td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded text-xs font-bold ${u.role === 'ADMIN' ? 'bg-slate-800 text-white' : 'bg-slate-100 text-slate-700 border border-slate-200'}`}>
                        {u.role}
                      </span>
                    </td>
                    <td className="p-4 text-slate-600 font-medium">{u.reputationScore}</td>
                    <td className="p-4 text-right flex justify-end gap-2">
                      <button onClick={() => handleToggleRole(u.id, u.role)} className="p-2 text-slate-400 hover:text-slate-800 hover:bg-slate-100 rounded" title="Toggle Role"><Shield className="w-4 h-4" /></button>
                      <button onClick={() => handleDeleteUser(u.id)} className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded" title="Delete User"><Trash2 className="w-4 h-4" /></button>
                    </td>
                  </tr>
                ))}
                {users.length === 0 && <tr><td colSpan="5" className="p-8 text-center text-slate-500">No users found.</td></tr>}
              </tbody>
            </table>
          )}

          {activeTab === 'questions' && (
            <table className="w-full text-left border-collapse min-w-[600px]">
              <thead>
                <tr className="bg-slate-50 text-slate-500 text-sm border-b">
                  <th className="p-4 font-medium">Title</th>
                  <th className="p-4 font-medium">Author</th>
                  <th className="p-4 font-medium">Created At</th>
                  <th className="p-4 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {questions.map(q => (
                  <tr key={q.id} className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                    <td className="p-4 font-semibold text-slate-800 truncate max-w-xs">{q.title}</td>
                    <td className="p-4 text-slate-600">{q.authorUsername}</td>
                    <td className="p-4 text-slate-500 text-sm">{new Date(q.createdAt).toLocaleDateString()}</td>
                    <td className="p-4 text-right">
                      <button onClick={() => handleDeleteQuestion(q.id)} className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded"><Trash2 className="w-4 h-4" /></button>
                    </td>
                  </tr>
                ))}
                {questions.length === 0 && <tr><td colSpan="4" className="p-8 text-center text-slate-500">No questions found.</td></tr>}
              </tbody>
            </table>
          )}

          {activeTab === 'products' && (
            <div>
              <div className="flex justify-end mb-4">
                <button onClick={handleCreateProduct} className="px-4 py-2 bg-slate-900 text-white rounded-lg flex items-center gap-2 hover:bg-slate-800 transition-colors">
                  <Plus className="w-4 h-4" /> Add Product
                </button>
              </div>

              {isEditingProduct ? (
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
              ) : (
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
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
