"use client";

import { useState, useEffect } from 'react';
import { X, Send, CheckCircle2 } from 'lucide-react';
import { getStoredQuotations, saveStoredQuotations, QuotationRequest } from '@/data/mockData';

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultProductName?: string;
  defaultProductId?: string;
}

export default function QuoteModal({ isOpen, onClose, defaultProductName = '', defaultProductId = '' }: QuoteModalProps) {
  const [formData, setFormData] = useState({
    clientName: '',
    clientEmail: '',
    clientPhone: '',
    clientCompany: '',
    productName: '',
    notes: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const resetForm = async () => {
        await Promise.resolve();
        setFormData({
          clientName: '',
          clientEmail: '',
          clientPhone: '',
          clientCompany: '',
          productName: defaultProductName,
          notes: ''
        });
        setIsSubmitted(false);
      };
      resetForm();
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, defaultProductName]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.clientName || !formData.clientEmail || !formData.clientPhone) return;

    const newRequest: QuotationRequest = {
      id: 'req-' + Date.now(),
      productName: formData.productName || 'General Inquiry',
      productId: defaultProductId || 'general',
      clientName: formData.clientName,
      clientEmail: formData.clientEmail,
      clientPhone: formData.clientPhone,
      clientCompany: formData.clientCompany,
      notes: formData.notes,
      date: new Date().toISOString(),
      status: 'pending'
    };

    const currentQuotes = getStoredQuotations();
    saveStoredQuotations([newRequest, ...currentQuotes]);
    setIsSubmitted(true);

    // Auto close after 3 seconds on success
    setTimeout(() => {
      onClose();
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-primary-dark/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl border border-accent/20 overflow-hidden relative transition-all duration-300 transform scale-100">
        
        {/* Decorative Gold Header Line */}
        <div className="h-1.5 bg-gradient-to-r from-accent to-accent-dark w-full"></div>

        {/* Close Button */}
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-primary transition-colors bg-gray-50 hover:bg-gray-100 rounded-full"
        >
          <X size={18} />
        </button>

        <div className="p-8">
          {!isSubmitted ? (
            <>
              <div className="mb-6">
                <h3 className="font-display font-extrabold text-2xl text-primary tracking-wide">
                  Request Quotation
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                  Kirimkan detail kebutuhan Anda, tim spesialis kami akan segera memberikan penawaran terbaik.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Product Name */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                    Produk / Alat Medis
                  </label>
                  <input 
                    type="text" 
                    required
                    placeholder="Contoh: Voluson E10 Ultrasound"
                    value={formData.productName}
                    onChange={(e) => setFormData({...formData, productName: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:border-accent focus:ring-1 focus:ring-accent outline-none text-primary font-semibold"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Name */}
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                      Nama Lengkap *
                    </label>
                    <input 
                      type="text" 
                      required
                      placeholder="Nama Anda"
                      value={formData.clientName}
                      onChange={(e) => setFormData({...formData, clientName: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:border-accent focus:ring-1 focus:ring-accent outline-none text-primary"
                    />
                  </div>

                  {/* Institution/Company */}
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                      Rumah Sakit / Klinik / Instansi
                    </label>
                    <input 
                      type="text" 
                      placeholder="Nama RS atau Klinik"
                      value={formData.clientCompany}
                      onChange={(e) => setFormData({...formData, clientCompany: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:border-accent focus:ring-1 focus:ring-accent outline-none text-primary"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Email */}
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                      Email *
                    </label>
                    <input 
                      type="email" 
                      required
                      placeholder="email@instansi.com"
                      value={formData.clientEmail}
                      onChange={(e) => setFormData({...formData, clientEmail: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:border-accent focus:ring-1 focus:ring-accent outline-none text-primary"
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                      No. WhatsApp / HP *
                    </label>
                    <input 
                      type="tel" 
                      required
                      placeholder="Contoh: 08123456789"
                      value={formData.clientPhone}
                      onChange={(e) => setFormData({...formData, clientPhone: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:border-accent focus:ring-1 focus:ring-accent outline-none text-primary"
                    />
                  </div>
                </div>

                {/* Notes */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                    Catatan Kebutuhan Tambahan
                  </label>
                  <textarea 
                    rows={3}
                    placeholder="Jelaskan kebutuhan khusus, jumlah unit, pengiriman, atau instalasi..."
                    value={formData.notes}
                    onChange={(e) => setFormData({...formData, notes: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:border-accent focus:ring-1 focus:ring-accent outline-none text-primary"
                  />
                </div>

                <button 
                  type="submit" 
                  className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-primary to-primary-dark hover:from-primary-dark text-white font-display font-bold text-sm uppercase py-4 rounded-xl transition-all duration-300 hover:shadow-lg shadow-primary/20 cursor-pointer mt-2"
                >
                  <Send size={16} className="text-accent" />
                  <span>Kirim Permintaan Quotation</span>
                </button>
              </form>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="w-16 h-16 bg-accent/10 text-accent rounded-full flex items-center justify-center mb-6 animate-pulse">
                <CheckCircle2 size={36} />
              </div>
              <h3 className="font-display font-extrabold text-2xl text-primary tracking-wide">
                Permintaan Terkirim!
              </h3>
              <p className="text-sm text-gray-500 mt-2 max-w-sm">
                Terima kasih, <strong>{formData.clientName}</strong>. Permintaan quotation Anda untuk <strong>{formData.productName}</strong> telah kami terima. Tim HSN akan menghubungi Anda dalam waktu 1x24 jam.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
