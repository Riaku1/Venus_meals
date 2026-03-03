// File Name: pages/admin/dashboard.tsx

import React, { useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { LayoutDashboard, UtensilsCrossed, ImagePlus, LogOut, CheckCircle } from 'lucide-react';

export default function AdminDashboard() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [form, setForm] = useState({ name: '', category: 'Lunch', description: '' });
  const [file, setFile] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      let imagePath = '';
      
      // 1. Handle Image Upload to Storage
      if (file) {
        const fileExt = file.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const { data: storageData, error: storageError } = await supabase.storage
          .from('meal-images')
          .upload(fileName, file);
        
        if (storageError) throw storageError;
        imagePath = supabase.storage.from('meal-images').getPublicUrl(fileName).data.publicUrl;
      }

      // 2. Insert Metadata to Table
      const { error } = await supabase.from('meals').insert([{
        name: form.name,
        category: form.category,
        description: form.description,
        image_url: imagePath
      }]);

      if (error) throw error;
      setSuccess(true);
      setForm({ name: '', category: 'Lunch', description: '' });
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      alert("Error updating catalog. Please check logs.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50 text-gray-800">
      {/* Sidebar Navigation */}
      <aside className="w-64 bg-emerald-900 text-white flex flex-col">
        <div className="p-8 text-xl font-bold tracking-tighter border-b border-emerald-800">VME Admin</div>
        <nav className="flex-1 p-6 space-y-2">
          <button className="flex items-center gap-3 w-full p-3 bg-emerald-800 rounded-lg"><LayoutDashboard size={20}/> Dashboard</button>
          <button className="flex items-center gap-3 w-full p-3 hover:bg-emerald-800 transition rounded-lg text-emerald-200"><UtensilsCrossed size={20}/> Menu Manager</button>
          <button className="flex items-center gap-3 w-full p-3 hover:bg-emerald-800 transition rounded-lg text-emerald-200"><ImagePlus size={20}/> Gallery</button>
        </nav>
        <button className="p-6 border-t border-emerald-800 flex items-center gap-2 text-emerald-400 hover:text-white"><LogOut size={18}/> Logout</button>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-12">
        <header className="mb-12">
          <h1 className="text-3xl font-bold text-emerald-950">Catalog Management</h1>
          <p className="text-gray-500">Add new meals to the public website catalog.</p>
        </header>

        <div className="max-w-3xl bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            {success && (
              <div className="p-4 bg-emerald-50 text-emerald-700 rounded-lg flex items-center gap-2">
                <CheckCircle size={18} /> Catalog updated successfully!
              </div>
            )}

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-600 uppercase tracking-wider">Meal Name</label>
                <input 
                  required
                  className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none" 
                  value={form.name}
                  onChange={e => setForm({...form, name: e.target.value})}
                  placeholder="e.g. Grilled Tilapia with Matooke"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-600 uppercase tracking-wider">Category</label>
                <select 
                  className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none bg-white"
                  value={form.category}
                  onChange={e => setForm({...form, category: e.target.value})}
                >
                  <option>Breakfast</option>
                  <option>Lunch</option>
                  <option>Dinner</option>
                  <option>Snacks</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-600 uppercase tracking-wider">Description</label>
              <textarea 
                className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none h-24"
                placeholder="Brief details about the ingredients or sides..."
                value={form.description}
                onChange={e => setForm({...form, description: e.target.value})}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-600 uppercase tracking-wider">Meal Image</label>
              <div className="border-2 border-dashed border-gray-200 rounded-xl p-8 text-center hover:border-emerald-400 transition cursor-pointer bg-gray-50">
                <input 
                  type="file" 
                  className="hidden" 
                  id="mealImage" 
                  onChange={e => setFile(e.target.files?.[0] || null)}
                />
                <label htmlFor="mealImage" className="cursor-pointer">
                  <p className="text-emerald-600 font-bold mb-1">{file ? file.name : 'Click to upload image'}</p>
                  <p className="text-xs text-gray-400 uppercase tracking-widest">JPG, PNG up to 5MB</p>
                </label>
              </div>
            </div>

            <button 
              disabled={loading}
              className="w-full py-4 bg-emerald-600 text-white font-bold rounded-xl hover:bg-emerald-700 transition disabled:opacity-50"
            >
              {loading ? 'Processing...' : 'Publish to Website'}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
  }
