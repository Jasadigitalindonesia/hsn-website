"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Package, FileText, ShoppingBag, Plus, Trash2, Edit2, 
  RotateCcw, Check, Clock, Eye, Mail, Phone, Home, MessageSquare, Settings 
} from 'lucide-react';
import { 
  getStoredProducts, saveStoredProducts, 
  getStoredNews, saveStoredNews, 
  getStoredQuotations, saveStoredQuotations, 
  Product, NewsArticle, QuotationRequest, 
  DEFAULT_PRODUCTS, DEFAULT_NEWS, DEFAULT_QUOTATIONS 
} from '@/data/mockData';

// Helper function for unique ID generation outside component to maintain purity checks
const generateId = (prefix: string): string => {
  return `${prefix}-${Date.now()}`;
};

export default function AdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  // Check login state on mount
  useEffect(() => {
    const auth = sessionStorage.getItem('hsn_admin_auth');
    if (auth === 'true') {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'admin_hsn' && password === 'HsnSecure2026#') {
      sessionStorage.setItem('hsn_admin_auth', 'true');
      setIsLoggedIn(true);
      setLoginError('');
    } else {
      setLoginError('Username atau password salah!');
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('hsn_admin_auth');
    setIsLoggedIn(false);
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 font-sans">
        <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 w-full max-w-md">
          <div className="flex flex-col items-center mb-8">
            <div className="w-16 h-16 bg-gray-50 p-2 rounded-xl mb-4 border border-gray-100 flex items-center justify-center">
              <Image src="/hsn-logo.png" alt="HSN" width={48} height={48} className="object-contain" />
            </div>
            <h2 className="text-2xl font-black text-primary">Admin Login</h2>
            <p className="text-sm text-gray-400 mt-1">Masukkan kredensial untuk mengakses CMS</p>
          </div>

          {loginError && (
            <div className="mb-4 bg-red-50 text-red-500 text-xs font-bold p-3 rounded-xl text-center border border-red-100 animate-fade-in">
              {loginError}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Username</label>
              <input 
                type="text" required placeholder="Masukkan username"
                value={username} onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:border-accent outline-none text-primary font-semibold"
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Password</label>
              <input 
                type="password" required placeholder="Masukkan password"
                value={password} onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:border-accent outline-none text-primary font-semibold"
              />
            </div>
            <button 
              type="submit" 
              className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-primary/20 mt-2"
            >
              Masuk ke Dashboard
            </button>
          </form>
          <div className="mt-6 text-center">
            <Link href="/" className="text-xs text-gray-400 hover:text-primary font-medium transition-colors">
              &larr; Kembali ke Website
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return <AdminDashboard onLogout={handleLogout} />;
}

function AdminDashboard({ onLogout }: { onLogout: () => void }) {
  // Tabs
  const [activeTab, setActiveTab] = useState<'products' | 'news' | 'quotes' | 'settings'>('products');

  // DB States
  const [products, setProducts] = useState<Product[]>([]);
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [quotes, setQuotes] = useState<QuotationRequest[]>([]);
  const [settings, setSettings] = useState<Record<string, string>>({
    hero_title: 'Distributor of Medical & Aesthetic Equipments',
    hero_image: 'https://images.unsplash.com/photo-1620288627223-53302f4e8c74?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
    hero_layout: 'right'
  });

  // Notifications
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'info' } | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  // Form states for Products
  const [editingProdId, setEditingProdId] = useState<string | null>(null);
  const [prodForm, setProdForm] = useState({
    name: '',
    brand: '',
    category: 'Diagnostic',
    image: '',
    description: '',
    specs: '',
    isFeatured: false
  });

  // Form states for News
  const [editingNewsId, setEditingNewsId] = useState<string | null>(null);
  const [newsForm, setNewsForm] = useState({
    title: '',
    excerpt: '',
    content: '',
    image: '',
    author: 'Admin HSN',
    date: '',
    readTime: '3 min read'
  });

  const loadData = async () => {
    try {
      const prodRes = await fetch('/api/products');
      const prodData = await prodRes.json();
      if (prodData.success) {
        // Handle type correctly for specs (Prisma Json array to string array for frontend compatibility)
        const parsedProducts = prodData.data.map((p: any) => ({
          ...p,
          specs: Array.isArray(p.specs) ? p.specs : (typeof p.specs === 'string' ? JSON.parse(p.specs) : [])
        }));
        setProducts(parsedProducts);
      }

      const newsRes = await fetch('/api/articles');
      const newsData = await newsRes.json();
      if (newsData.success) setNews(newsData.data);
      
      setQuotes(getStoredQuotations());

      const settingsRes = await fetch('/api/settings');
      const settingsData = await settingsRes.json();
      if (settingsData.success && settingsData.data) {
        setSettings(prev => ({ ...prev, ...settingsData.data }));
      }
    } catch (e) {
      console.error("Error loading data", e);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const showToast = (message: string, type: 'success' | 'info' = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, setter: (url: string) => void) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      
      const data = await res.json();
      if (data.success) {
        setter(data.url);
        showToast("Gambar berhasil diunggah!");
      } else {
        alert("Gagal mengunggah gambar: " + data.error);
      }
    } catch (error) {
      console.error(error);
      alert("Error saat mengunggah gambar");
    } finally {
      setIsUploading(false);
    }
  };

  // Reset database to defaults
  const handleResetData = () => {
    if (confirm("Reset database (Lokal) sudah dinonaktifkan karena kita sudah menggunakan Supabase. Silakan hapus data secara manual jika diperlukan.")) {
      // Disabled local reset to prevent overwriting cloud data accidentally
    }
  };

  // Products CMS
  const handleProductSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prodForm.name || !prodForm.brand) return;

    const specsArray = prodForm.specs.split('\n').map(s => s.trim()).filter(s => s.length > 0);
    const fallbackImage = prodForm.image || 'https://images.unsplash.com/photo-1516549655169-df83a0774514?w=600&h=400&fit=crop&q=80';

    try {
      if (editingProdId) {
        const res = await fetch(`/api/products/${editingProdId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...prodForm, image: fallbackImage, specs: specsArray })
        });
        if (res.ok) showToast("Produk berhasil diperbarui!");
      } else {
        const res = await fetch('/api/products', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...prodForm, image: fallbackImage, specs: specsArray })
        });
        if (res.ok) showToast("Produk baru berhasil ditambahkan!");
      }
      loadData();
      resetProductForm();
    } catch (e) {
      alert("Error saving product");
    }
  };

  const handleEditProduct = (prod: any) => {
    setEditingProdId(prod.id);
    setProdForm({
      name: prod.name,
      brand: prod.brand,
      category: prod.category || prod.categoryId || 'Diagnostic',
      image: prod.image,
      description: prod.description,
      specs: (prod.specs || []).join('\n'),
      isFeatured: !!prod.isFeatured
    });
  };

  const handleDeleteProduct = async (id: string) => {
    if (confirm("Hapus produk ini?")) {
      try {
        await fetch(`/api/products/${id}`, { method: 'DELETE' });
        showToast("Produk berhasil dihapus!");
        loadData();
      } catch (e) {
        alert("Gagal menghapus produk");
      }
    }
  };

  const resetProductForm = () => {
    setEditingProdId(null);
    setProdForm({
      name: '',
      brand: '',
      category: 'Diagnostic',
      image: '',
      description: '',
      specs: '',
      isFeatured: false
    });
  };

  // News CMS
  const handleNewsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsForm.title) return;

    const fallbackImage = newsForm.image || 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&h=400&fit=crop&q=80';
    const postDate = newsForm.date || new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

    try {
      if (editingNewsId) {
        const res = await fetch(`/api/articles/${editingNewsId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...newsForm, image: fallbackImage, date: postDate })
        });
        if (res.ok) showToast("Artikel berhasil diperbarui!");
      } else {
        const res = await fetch('/api/articles', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...newsForm, image: fallbackImage, date: postDate })
        });
        if (res.ok) showToast("Artikel berita berhasil diterbitkan!");
      }
      loadData();
      resetNewsForm();
    } catch (e) {
      alert("Error saving article");
    }
  };

  const handleEditNews = (art: any) => {
    setEditingNewsId(art.id);
    setNewsForm({
      title: art.title,
      excerpt: art.excerpt,
      content: art.content,
      image: art.image,
      author: art.author,
      date: art.date,
      readTime: art.readTime
    });
  };

  const handleDeleteNews = async (id: string) => {
    if (confirm("Hapus artikel berita ini?")) {
      try {
        await fetch(`/api/articles/${id}`, { method: 'DELETE' });
        showToast("Artikel berhasil dihapus!");
        loadData();
      } catch (e) {
        alert("Gagal menghapus artikel");
      }
    }
  };

  const resetNewsForm = () => {
    setEditingNewsId(null);
    setNewsForm({
      title: '',
      excerpt: '',
      content: '',
      image: '',
      author: 'Admin HSN',
      date: '',
      readTime: '3 min read'
    });
  };

  // Settings CMS
  const handleSettingsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Convert object to array for API
    const settingsArray = Object.keys(settings).map(key => ({
      key,
      value: settings[key],
      category: key.startsWith('hero_') ? 'Hero' : 'General'
    }));

    try {
      const res = await fetch('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ settings: settingsArray })
      });
      
      if (res.ok) {
        showToast("Pengaturan berhasil disimpan!");
      } else {
        alert("Gagal menyimpan pengaturan");
      }
    } catch (e) {
      alert("Error saving settings");
    }
  };

  // Quotes Operations
  const handleUpdateQuoteStatus = (id: string, status: 'pending' | 'reviewed' | 'contacted') => {
    const updated = quotes.map(q => q.id === id ? { ...q, status } : q);
    saveStoredQuotations(updated);
    setQuotes(updated);
    showToast(`Status quotation diupdate ke ${status}!`);
  };

  const handleDeleteQuote = (id: string) => {
    if (confirm("Hapus catatan quotation ini?")) {
      const updated = quotes.filter(q => q.id !== id);
      saveStoredQuotations(updated);
      setQuotes(updated);
      showToast("Catatan quotation dihapus!");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      
      {/* Toast */}
      {notification && (
        <div className="fixed top-6 right-6 z-50 bg-primary text-white py-3 px-6 rounded-xl shadow-2xl flex items-center gap-2 border border-accent/30 text-xs font-bold uppercase tracking-wider animate-fade-in">
          <Check size={14} className="text-accent" />
          <span>{notification.message}</span>
        </div>
      )}

      {/* Header Panel */}
      <header className="bg-primary text-white py-6 px-6 md:px-12 border-b border-accent/20 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link href="/" className="relative block w-10 h-10 overflow-hidden bg-white p-1 rounded-xl shadow border border-accent/20 shrink-0">
            <Image src="/hsn-logo.png" alt="PT HSN Logo" fill className="object-contain" />
          </Link>
          <div>
            <h1 className="font-display font-black text-lg tracking-wider">HSN CMS Admin</h1>
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block">PT. HARVEST SELARAS NUSANTARA</span>
          </div>
        </div>
        
        <div className="flex flex-wrap items-center gap-3">
          <button 
            onClick={handleResetData}
            className="flex items-center gap-1.5 bg-white/10 hover:bg-white/15 text-white border border-white/10 text-xs font-bold px-4 py-2.5 rounded-xl transition-all"
          >
            <RotateCcw size={12} className="text-accent" />
            <span className="hidden sm:inline">Reset Database</span>
          </button>
          <Link 
            href="/"
            className="flex items-center gap-1.5 bg-gradient-to-r from-accent to-accent-dark hover:from-accent-light hover:to-accent text-primary-dark text-xs font-black uppercase px-4 py-2.5 rounded-xl transition-all shadow-md shadow-accent/15"
          >
            <Home size={12} />
            <span className="hidden sm:inline">Lihat Website</span>
          </Link>
          <button 
            onClick={onLogout}
            className="flex items-center gap-1.5 bg-red-500/20 hover:bg-red-500 text-white border border-red-500/30 text-xs font-bold px-4 py-2.5 rounded-xl transition-all ml-2"
          >
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </header>

      {/* Stats Board */}
      <section className="px-6 md:px-12 pt-8 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-6xl w-full mx-auto">
        <div className="bg-white p-6 rounded-2xl border border-gray-200/80 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block">Total Produk</span>
            <span className="font-display font-black text-3xl text-primary mt-1 block">{products.length}</span>
          </div>
          <div className="w-12 h-12 bg-primary/5 text-primary rounded-xl flex items-center justify-center">
            <Package size={22} />
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-200/80 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block">Artikel Berita</span>
            <span className="font-display font-black text-3xl text-primary mt-1 block">{news.length}</span>
          </div>
          <div className="w-12 h-12 bg-primary/5 text-primary rounded-xl flex items-center justify-center">
            <FileText size={22} />
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-200/80 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block">Quotes Pending</span>
            <span className="font-display font-black text-3xl text-accent-dark mt-1 block">
              {quotes.filter(q => q.status === 'pending').length}
            </span>
          </div>
          <div className="w-12 h-12 bg-accent/15 text-accent-dark rounded-xl flex items-center justify-center">
            <ShoppingBag size={22} />
          </div>
        </div>
      </section>

      {/* Main Tabs Workspace */}
      <main className="flex-grow px-6 md:px-12 py-8 max-w-6xl w-full mx-auto flex flex-col gap-6">
        
        {/* Navigation Tabs */}
        <div className="flex border-b border-gray-200">
          <button
            onClick={() => setActiveTab('products')}
            className={`px-6 py-3 border-b-2 font-display text-sm font-bold transition-all flex items-center gap-2 ${
              activeTab === 'products' ? 'border-accent text-primary' : 'border-transparent text-gray-400 hover:text-primary'
            }`}
          >
            <Package size={16} />
            <span>Manajemen Produk</span>
          </button>
          <button
            onClick={() => setActiveTab('news')}
            className={`px-6 py-3 border-b-2 font-display text-sm font-bold transition-all flex items-center gap-2 ${
              activeTab === 'news' ? 'border-accent text-primary' : 'border-transparent text-gray-400 hover:text-primary'
            }`}
          >
            <FileText size={16} />
            <span>Berita & Artikel</span>
          </button>
          <button
            onClick={() => setActiveTab('quotes')}
            className={`px-6 py-3 border-b-2 font-display text-sm font-bold transition-all flex items-center gap-2 ${
              activeTab === 'quotes' ? 'border-accent text-primary' : 'border-transparent text-gray-400 hover:text-primary'
            }`}
          >
            <ShoppingBag size={16} />
            <span>Request Quotation Inbox</span>
            {quotes.filter(q => q.status === 'pending').length > 0 && (
              <span className="bg-accent text-primary-dark font-black text-[10px] w-5 h-5 rounded-full flex items-center justify-center">
                {quotes.filter(q => q.status === 'pending').length}
              </span>
            )}
          </button>
        
          <button
            onClick={() => setActiveTab('settings')}
            className={`px-6 py-3 border-b-2 font-display text-sm font-bold transition-all flex items-center gap-2 ${
              activeTab === 'settings' ? 'border-accent text-primary' : 'border-transparent text-gray-400 hover:text-primary'
            }`}
          >
            <Settings size={16} />
            <span>Pengaturan Website</span>
          </button>
        </div>

        {/* Tab 1: Products Panel */}
        {activeTab === 'products' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Form */}
            <form onSubmit={handleProductSubmit} className="lg:col-span-4 bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-4">
              <h3 className="font-display font-bold text-base text-primary border-b border-gray-100 pb-2 flex justify-between items-center">
                <span>{editingProdId ? 'Edit Produk' : 'Tambah Produk Baru'}</span>
                {editingProdId && (
                  <button type="button" onClick={resetProductForm} className="text-[10px] text-red-500 uppercase font-bold hover:underline">Batal</button>
                )}
              </h3>

              <div>
                <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Nama Alat Medis</label>
                <input 
                  type="text" required placeholder="Contoh: Laser Cariera 3000"
                  value={prodForm.name} onChange={(e) => setProdForm({...prodForm, name: e.target.value})}
                  className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs focus:border-accent outline-none text-primary font-semibold"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Merek (Brand)</label>
                  <input 
                    type="text" required placeholder="GE, Lumenis, dll"
                    value={prodForm.brand} onChange={(e) => setProdForm({...prodForm, brand: e.target.value})}
                    className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs focus:border-accent outline-none text-primary"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Kategori</label>
                  <select 
                    value={prodForm.category} onChange={(e) => setProdForm({...prodForm, category: e.target.value})}
                    className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs focus:border-accent outline-none text-primary"
                  >
                    <option value="Diagnostic">Diagnostic</option>
                    <option value="Aesthetic">Aesthetic</option>
                    <option value="Dental">Dental</option>
                    <option value="Laboratory">Laboratory</option>
                    <option value="Surgical">Surgical</option>
                    <option value="Hospital Furniture">Hospital Furniture</option>
                    <option value="Consumables">Consumables</option>
                    <option value="Accessories">Accessories</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Unggah Gambar Produk</label>
                <div className="flex items-center gap-2 mb-2">
                  <input 
                    type="file" 
                    accept="image/*"
                    onChange={(e) => handleFileUpload(e, (url) => setProdForm({...prodForm, image: url}))}
                    className="w-full text-xs file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20 cursor-pointer"
                  />
                  {isUploading && <span className="text-[10px] text-accent font-bold animate-pulse">Mengunggah...</span>}
                </div>
                <input 
                  type="text" placeholder="Atau tempelkan URL gambar (opsional)..."
                  value={prodForm.image} onChange={(e) => setProdForm({...prodForm, image: e.target.value})}
                  className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs focus:border-accent outline-none text-gray-500 bg-gray-50"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Deskripsi Ringkas</label>
                <textarea 
                  rows={3} placeholder="Penjelasan singkat mengenai alat medis..."
                  value={prodForm.description} onChange={(e) => setProdForm({...prodForm, description: e.target.value})}
                  className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs focus:border-accent outline-none text-primary"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Spesifikasi (Satu Baris per Spek)</label>
                <textarea 
                  rows={4} placeholder="Contoh:&#10;Daya Laser: 80W&#10;Pendinginan: Air & Kipas&#10;Berat: 45kg"
                  value={prodForm.specs} onChange={(e) => setProdForm({...prodForm, specs: e.target.value})}
                  className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs focus:border-accent outline-none text-primary"
                />
              </div>

              <div className="flex items-center gap-2">
                <input 
                  type="checkbox" id="isFeatured"
                  checked={prodForm.isFeatured} onChange={(e) => setProdForm({...prodForm, isFeatured: e.target.checked})}
                  className="rounded border-gray-300 text-accent focus:ring-accent"
                />
                <label htmlFor="isFeatured" className="text-xs text-gray-600 font-bold">Tampilkan di Featured Products</label>
              </div>

              <button 
                type="submit" 
                className="w-full flex items-center justify-center gap-1 bg-primary hover:bg-primary-dark text-white text-xs font-bold py-3 rounded-xl transition-all cursor-pointer"
              >
                <Plus size={14} className="text-accent" />
                <span>{editingProdId ? 'Simpan Perubahan' : 'Terbitkan Produk'}</span>
              </button>
            </form>

            {/* List */}
            <div className="lg:col-span-8 bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="p-4 border-b border-gray-100 bg-gray-50/50 flex justify-between items-center">
                <h3 className="font-display font-bold text-sm text-primary">Daftar Produk Aktif</h3>
                <span className="text-[10px] font-bold text-gray-400">{products.length} Produk</span>
              </div>
              <div className="divide-y divide-gray-100 overflow-y-auto max-h-[600px]">
                {products.map((p) => (
                  <div key={p.id} className="p-4 flex gap-4 items-center hover:bg-gray-50/50 transition-colors">
                    <div className="relative w-12 h-12 bg-gray-100 rounded-lg overflow-hidden shrink-0">
                      <Image src={p.image} alt={p.name} fill className="object-cover" />
                    </div>
                    <div className="flex-grow">
                      <div className="flex items-center gap-2">
                        <span className="text-[9px] font-black uppercase text-accent">{p.brand}</span>
                        <span className="text-[9px] font-bold bg-gray-100 px-2 py-0.5 rounded text-gray-500">{p.category}</span>
                        {p.isFeatured && <span className="text-[8px] font-extrabold bg-green-50 text-green-600 border border-green-200 px-1.5 rounded">Featured</span>}
                      </div>
                      <h4 className="font-display font-bold text-sm text-primary leading-tight mt-1">{p.name}</h4>
                    </div>
                    <div className="flex gap-2">
                      <button 
                        onClick={() => handleEditProduct(p)}
                        className="p-2 text-gray-400 hover:text-accent hover:bg-accent/10 rounded-lg transition-all"
                      >
                        <Edit2 size={14} />
                      </button>
                      <button 
                        onClick={() => handleDeleteProduct(p.id)}
                        className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: News Panel */}
        {activeTab === 'news' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Form */}
            <form onSubmit={handleNewsSubmit} className="lg:col-span-4 bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-4">
              <h3 className="font-display font-bold text-base text-primary border-b border-gray-100 pb-2 flex justify-between items-center">
                <span>{editingNewsId ? 'Edit Artikel' : 'Tulis Artikel Baru'}</span>
                {editingNewsId && (
                  <button type="button" onClick={resetNewsForm} className="text-[10px] text-red-500 uppercase font-bold hover:underline">Batal</button>
                )}
              </h3>

              <div>
                <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Judul Berita</label>
                <input 
                  type="text" required placeholder="Judul artikel berita..."
                  value={newsForm.title} onChange={(e) => setNewsForm({...newsForm, title: e.target.value})}
                  className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs focus:border-accent outline-none text-primary font-semibold"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Ringkasan (Excerpt)</label>
                <textarea 
                  rows={2} required placeholder="Ringkasan pendek 1-2 kalimat..."
                  value={newsForm.excerpt} onChange={(e) => setNewsForm({...newsForm, excerpt: e.target.value})}
                  className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs focus:border-accent outline-none text-primary"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Konten Lengkap</label>
                <textarea 
                  rows={6} required placeholder="Isi artikel berita selengkapnya..."
                  value={newsForm.content} onChange={(e) => setNewsForm({...newsForm, content: e.target.value})}
                  className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs focus:border-accent outline-none text-primary"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Penulis (Author)</label>
                  <input 
                    type="text" placeholder="Admin HSN"
                    value={newsForm.author} onChange={(e) => setNewsForm({...newsForm, author: e.target.value})}
                    className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs focus:border-accent outline-none text-primary"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Estimasi Waktu Baca</label>
                  <input 
                    type="text" placeholder="4 min read"
                    value={newsForm.readTime} onChange={(e) => setNewsForm({...newsForm, readTime: e.target.value})}
                    className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs focus:border-accent outline-none text-primary"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Unggah Gambar Cover</label>
                <div className="flex items-center gap-2 mb-2">
                  <input 
                    type="file" 
                    accept="image/*"
                    onChange={(e) => handleFileUpload(e, (url) => setNewsForm({...newsForm, image: url}))}
                    className="w-full text-xs file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20 cursor-pointer"
                  />
                  {isUploading && <span className="text-[10px] text-accent font-bold animate-pulse">Mengunggah...</span>}
                </div>
                <input 
                  type="text" placeholder="Atau tempelkan URL gambar (opsional)..."
                  value={newsForm.image} onChange={(e) => setNewsForm({...newsForm, image: e.target.value})}
                  className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs focus:border-accent outline-none text-gray-500 bg-gray-50"
                />
              </div>

              <button 
                type="submit" 
                className="w-full flex items-center justify-center gap-1 bg-primary hover:bg-primary-dark text-white text-xs font-bold py-3 rounded-xl transition-all cursor-pointer"
              >
                <Plus size={14} className="text-accent" />
                <span>{editingNewsId ? 'Simpan Perubahan' : 'Terbitkan Berita'}</span>
              </button>
            </form>

            {/* List */}
            <div className="lg:col-span-8 bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="p-4 border-b border-gray-100 bg-gray-50/50 flex justify-between items-center">
                <h3 className="font-display font-bold text-sm text-primary">Daftar Artikel Aktif</h3>
                <span className="text-[10px] font-bold text-gray-400">{news.length} Artikel</span>
              </div>
              <div className="divide-y divide-gray-100 overflow-y-auto max-h-[600px]">
                {news.map((n) => (
                  <div key={n.id} className="p-4 flex gap-4 items-center hover:bg-gray-50/50 transition-colors">
                    <div className="relative w-12 h-12 bg-gray-100 rounded-lg overflow-hidden shrink-0">
                      <Image src={n.image} alt={n.title} fill className="object-cover" />
                    </div>
                    <div className="flex-grow">
                      <div className="flex items-center gap-2 text-[9px] text-gray-400 font-bold uppercase">
                        <span>{n.author}</span>
                        <span>•</span>
                        <span>{n.date}</span>
                      </div>
                      <h4 className="font-display font-bold text-sm text-primary leading-tight mt-1">{n.title}</h4>
                    </div>
                    <div className="flex gap-2">
                      <button 
                        onClick={() => handleEditNews(n)}
                        className="p-2 text-gray-400 hover:text-accent hover:bg-accent/10 rounded-lg transition-all"
                      >
                        <Edit2 size={14} />
                      </button>
                      <button 
                        onClick={() => handleDeleteNews(n.id)}
                        className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Quotation Requests Panel */}
        {activeTab === 'quotes' && (
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="p-4 border-b border-gray-100 bg-gray-50/50 flex justify-between items-center">
              <h3 className="font-display font-bold text-sm text-primary">Inbox Permintaan Quotation Masuk</h3>
              <span className="text-[10px] font-bold text-gray-400">{quotes.length} Permintaan</span>
            </div>

            {quotes.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-gray-50 text-gray-500 uppercase font-bold tracking-wider border-b border-gray-200">
                    <tr>
                      <th className="p-4">Klien & Lembaga</th>
                      <th className="p-4">Produk Diminta</th>
                      <th className="p-4">Kontak</th>
                      <th className="p-4">Tanggal</th>
                      <th className="p-4">Status</th>
                      <th className="p-4 text-center">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {quotes.map((q) => (
                      <tr key={q.id} className="hover:bg-gray-50/30 transition-colors">
                        <td className="p-4">
                          <div className="font-bold text-gray-900">{q.clientName}</div>
                          <div className="text-[10px] text-gray-400 font-semibold">{q.clientCompany || 'Instansi Umum'}</div>
                        </td>
                        <td className="p-4">
                          <span className="bg-primary/5 text-primary border border-primary/10 px-2.5 py-1 rounded-lg font-bold">
                            {q.productName}
                          </span>
                        </td>
                        <td className="p-4 space-y-1 text-gray-500 font-medium">
                          <div className="flex items-center gap-1"><Mail size={12} className="text-gray-400" /> {q.clientEmail}</div>
                          <div className="flex items-center gap-1"><Phone size={12} className="text-gray-400" /> {q.clientPhone}</div>
                        </td>
                        <td className="p-4 text-gray-400 font-medium">
                          {new Date(q.date).toLocaleDateString('id-ID', { hour: '2-digit', minute: '2-digit' })}
                        </td>
                        <td className="p-4">
                          {q.status === 'pending' && (
                            <span className="inline-flex items-center gap-1 bg-yellow-50 text-yellow-600 border border-yellow-200 px-2 py-0.5 rounded-full font-bold">
                              <Clock size={10} /> Pending
                            </span>
                          )}
                          {q.status === 'reviewed' && (
                            <span className="inline-flex items-center gap-1 bg-blue-50 text-blue-600 border border-blue-200 px-2 py-0.5 rounded-full font-bold">
                              <Eye size={10} /> Reviewed
                            </span>
                          )}
                          {q.status === 'contacted' && (
                            <span className="inline-flex items-center gap-1 bg-green-50 text-green-600 border border-green-200 px-2 py-0.5 rounded-full font-bold">
                              <Check size={10} /> Contacted
                            </span>
                          )}
                        </td>
                        <td className="p-4">
                          <div className="flex items-center justify-center gap-2">
                            <select 
                              value={q.status}
                              onChange={(e) => handleUpdateQuoteStatus(q.id, e.target.value as "pending" | "reviewed" | "contacted")}
                              className="px-2 py-1 rounded border border-gray-200 text-[10px] outline-none text-gray-600 font-bold"
                            >
                              <option value="pending">Pending</option>
                              <option value="reviewed">Reviewed</option>
                              <option value="contacted">Contacted</option>
                            </select>
                            <button 
                              onClick={() => handleDeleteQuote(q.id)}
                              className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded"
                            >
                              <Trash2 size={12} />
                            </button>
                          </div>
                          {q.notes && (
                            <div className="mt-2 text-[10px] text-gray-500 bg-gray-50 p-2 rounded border border-gray-100 flex items-start gap-1 max-w-[250px]">
                              <MessageSquare size={12} className="text-gray-400 shrink-0 mt-0.5" />
                              <p className="italic leading-snug">&quot;{q.notes}&quot;</p>
                            </div>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="p-12 text-center text-gray-400">
                <ShoppingBag size={32} className="mx-auto mb-4 opacity-30" />
                <h4 className="font-bold text-gray-700">Inbox Quotation Kosong</h4>
                <p className="text-xs text-gray-400 mt-1">Belum ada client yang mengirimkan request quotation.</p>
              </div>
            )}
          </div>
        )}


        {/* Tab 4: Settings Panel */}
        {activeTab === 'settings' && (
          <div className="grid grid-cols-1 gap-8 items-start max-w-4xl">
            <form onSubmit={handleSettingsSubmit} className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-6">
              <h3 className="font-display font-bold text-xl text-primary border-b border-gray-100 pb-4">
                Pengaturan Hero Section (Beranda)
              </h3>
              
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Unggah Gambar Utama (Hero Image)</label>
                <div className="flex items-center gap-4 mb-2">
                  <div className="relative w-32 h-20 bg-gray-100 rounded-lg overflow-hidden shrink-0 border border-gray-200">
                    {settings.hero_image && <Image src={settings.hero_image} alt="Hero Preview" fill className="object-cover" />}
                  </div>
                  <div className="flex-grow">
                    <input 
                      type="file" 
                      accept="image/*"
                      onChange={(e) => handleFileUpload(e, (url) => setSettings({...settings, hero_image: url}))}
                      className="w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20 cursor-pointer"
                    />
                    {isUploading && <span className="text-[10px] text-accent font-bold animate-pulse block mt-1">Mengunggah...</span>}
                    <p className="text-[10px] text-gray-400 mt-2 font-medium">Maksimal ukuran file: 2MB. Resolusi disarankan: 1920x1080px.</p>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Teks Judul Utama</label>
                <input 
                  type="text" required placeholder="Contoh: Distributor of Medical..."
                  value={settings.hero_title || ''} onChange={(e) => setSettings({...settings, hero_title: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:border-accent outline-none text-primary font-bold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Tata Letak (Layout)</label>
                <select 
                  value={settings.hero_layout || 'right'} onChange={(e) => setSettings({...settings, hero_layout: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:border-accent outline-none text-primary font-medium"
                >
                  <option value="left">Rata Kiri (Teks di kiri, gradasi di kiri)</option>
                  <option value="center">Tengah (Teks di tengah, gradasi penuh)</option>
                  <option value="right">Rata Kanan (Teks di kanan, gradasi di kanan)</option>
                </select>
              </div>

              <div className="pt-4 border-t border-gray-100">
                <button 
                  type="submit" 
                  className="w-full sm:w-auto px-8 bg-primary hover:bg-primary-dark text-white text-sm font-bold py-3 rounded-xl transition-all shadow-lg shadow-primary/20"
                >
                  Simpan Pengaturan
                </button>
              </div>
            </form>
          </div>
        )}
      </main>
    </div>
  );
}
