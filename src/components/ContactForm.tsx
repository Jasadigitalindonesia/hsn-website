"use client";

import React, { useState } from 'react';
import { Send, MessageCircle, CheckCircle2 } from 'lucide-react';
import { getStoredQuotations, saveStoredQuotations, QuotationRequest } from '@/data/mockData';

interface ContactFormProps {
  t: {
    formTitle: string;
    formDesc: string;
    fullName: string;
    inst: string;
    phone: string;
    emailAdd: string;
    msgLabel: string;
    msgPlace: string;
    sendEmail: string;
    chatWA: string;
  };
  settings: Record<string, string>;
}

export default function ContactForm({ t, settings }: ContactFormProps) {
  const [formData, setFormData] = useState({
    fullName: '',
    institution: '',
    phone: '',
    email: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const phoneNo = (settings.footer_phone || "+6285284222200").replace(/\D/g, '');
  const recipientEmail = settings.footer_email || "magdalena@hsnmedica.com";

  const handleSendEmail = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.phone || !formData.email || !formData.message) {
      alert("Mohon lengkapi data nama, no. HP, email, dan pesan Anda.");
      return;
    }

    // Save to local quotations/inquiries storage for admin panel
    const newInquiry: QuotationRequest = {
      id: 'inq-' + Date.now(),
      productName: 'Pesan Kontak (General Inquiry)',
      productId: 'contact',
      clientName: formData.fullName,
      clientEmail: formData.email,
      clientPhone: formData.phone,
      clientCompany: formData.institution || 'Umum/Klinik',
      notes: formData.message,
      date: new Date().toISOString(),
      status: 'pending'
    };

    try {
      const current = getStoredQuotations();
      saveStoredQuotations([newInquiry, ...current]);
    } catch (err) {
      console.error(err);
    }

    // Open Mailto link
    const subject = encodeURIComponent(`Inquiry Kontak HSN - ${formData.fullName}`);
    const body = encodeURIComponent(
      `Nama: ${formData.fullName}\nInstansi: ${formData.institution || '-'}\nNo HP: ${formData.phone}\nEmail: ${formData.email}\n\nPesan:\n${formData.message}`
    );
    window.open(`mailto:${recipientEmail}?subject=${subject}&body=${body}`, '_blank');

    setIsSubmitted(true);
  };

  const handleWhatsApp = () => {
    const waText = encodeURIComponent(
      `Halo PT Harvest Selaras Nusantara Medica,\nSaya ${formData.fullName || 'Pengunjung'}${formData.institution ? ` dari ${formData.institution}` : ''}.\n\n` +
      (formData.message ? `Pesan: ${formData.message}` : 'Saya ingin berkonsultasi mengenai produk medis & estetika HSN.')
    );
    const waUrl = settings.cta_whatsapp_url || `https://wa.me/${phoneNo}?text=${waText}`;
    window.open(waUrl, '_blank');
  };

  return (
    <div className="bg-white p-8 md:p-14 rounded-[3rem] shadow-[0_20px_60px_rgba(0,0,0,0.05)] border border-gray-100 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[80px]"></div>
      
      <h3 className="text-3xl font-black text-gray-900 mb-3 tracking-tight relative z-10">
        {settings.kontak_form_title || t.formTitle}
      </h3>
      <p className="text-gray-500 mb-10 text-lg font-light relative z-10">
        {settings.kontak_form_desc || t.formDesc}
      </p>

      {isSubmitted ? (
        <div className="py-12 flex flex-col items-center justify-center text-center relative z-10">
          <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-4">
            <CheckCircle2 size={36} />
          </div>
          <h4 className="text-2xl font-black text-gray-900 mb-2">Pesan Berhasil Terkirim!</h4>
          <p className="text-gray-500 max-w-md">
            Terima kasih, <strong>{formData.fullName}</strong>. Tim sales dan teknis HSN akan segera menghubungi Anda dalam waktu 1x24 jam.
          </p>
          <button
            type="button"
            onClick={() => setIsSubmitted(false)}
            className="mt-6 text-sm font-bold text-primary hover:underline"
          >
            Kirim Pesan Lain
          </button>
        </div>
      ) : (
        <form onSubmit={handleSendEmail} className="space-y-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <label className="block text-sm font-bold text-gray-900 mb-3">{t.fullName}</label>
              <input 
                type="text" 
                required
                value={formData.fullName}
                onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                className="w-full px-6 py-5 rounded-2xl border-none bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:bg-white text-gray-900 transition-all font-medium" 
                placeholder="Cth: Dr. Budi Santoso" 
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-900 mb-3">{t.inst}</label>
              <input 
                type="text" 
                value={formData.institution}
                onChange={(e) => setFormData({...formData, institution: e.target.value})}
                className="w-full px-6 py-5 rounded-2xl border-none bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:bg-white text-gray-900 transition-all font-medium" 
                placeholder="Cth: RS Medika Jaya" 
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <label className="block text-sm font-bold text-gray-900 mb-3">{t.phone}</label>
              <input 
                type="tel" 
                required
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                className="w-full px-6 py-5 rounded-2xl border-none bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:bg-white text-gray-900 transition-all font-medium" 
                placeholder="0812xxxxxx" 
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-900 mb-3">{t.emailAdd}</label>
              <input 
                type="email" 
                required
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full px-6 py-5 rounded-2xl border-none bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:bg-white text-gray-900 transition-all font-medium" 
                placeholder="email@contoh.com" 
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-bold text-gray-900 mb-3">{t.msgLabel}</label>
            <textarea 
              rows={5} 
              required
              value={formData.message}
              onChange={(e) => setFormData({...formData, message: e.target.value})}
              className="w-full px-6 py-5 rounded-2xl border-none bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:bg-white text-gray-900 transition-all font-medium resize-none" 
              placeholder={t.msgPlace}
            ></textarea>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <button 
              type="submit" 
              className="flex-1 bg-gray-900 hover:bg-black text-white font-bold py-5 px-8 rounded-2xl transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-3 cursor-pointer"
            >
              {t.sendEmail} <Send size={20} />
            </button>
            <button 
              type="button" 
              onClick={handleWhatsApp}
              className="flex-1 bg-[#25D366] hover:bg-[#128C7E] text-white font-bold py-5 px-8 rounded-2xl transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-3 cursor-pointer"
            >
              {t.chatWA} <MessageCircle size={20} />
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
