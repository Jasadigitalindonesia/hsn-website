const fs = require('fs');
const path = require('path');

const targetFile = path.join(process.cwd(), 'src', 'app', 'admin', 'page.tsx');
let content = fs.readFileSync(targetFile, 'utf8');

if (!content.includes('Pengaturan Website')) {
// 1. Add 'Settings' icon to lucide imports
content = content.replace(
  'RotateCcw, Check, Clock, Eye, Mail, Phone, Home, MessageSquare',
  'RotateCcw, Check, Clock, Eye, Mail, Phone, Home, MessageSquare, Settings'
);

// 2. Update activeTab state
content = content.replace(
  "const [activeTab, setActiveTab] = useState<'products' | 'news' | 'quotes'>('products');",
  "const [activeTab, setActiveTab] = useState<'products' | 'news' | 'quotes' | 'settings'>('products');"
);

// 3. Add settings state
content = content.replace(
  "const [quotes, setQuotes] = useState<QuotationRequest[]>([]);",
  `const [quotes, setQuotes] = useState<QuotationRequest[]>([]);
  const [settings, setSettings] = useState<Record<string, string>>({
    hero_title: 'Distributor of Medical & Aesthetic Equipments',
    hero_image: 'https://images.unsplash.com/photo-1620288627223-53302f4e8c74?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
    hero_layout: 'right'
  });`
);

// 4. Update loadData to fetch settings
content = content.replace(
  "setQuotes(getStoredQuotations());",
  `setQuotes(getStoredQuotations());

      const settingsRes = await fetch('/api/settings');
      const settingsData = await settingsRes.json();
      if (settingsData.success && settingsData.data) {
        setSettings(prev => ({ ...prev, ...settingsData.data }));
      }`
);

// 5. Add handleSettingsSubmit
content = content.replace(
  "// Quotes Operations",
  `// Settings CMS
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

  // Quotes Operations`
);

// 6. Add Settings Tab Button
const settingsTabBtn = `
          <button
            onClick={() => setActiveTab('settings')}
            className={\`px-6 py-3 border-b-2 font-display text-sm font-bold transition-all flex items-center gap-2 \${
              activeTab === 'settings' ? 'border-accent text-primary' : 'border-transparent text-gray-400 hover:text-primary'
            }\`}
          >
            <Settings size={16} />
            <span>Pengaturan Website</span>
          </button>
        </div>`;
content = content.replace('</div>\n\n        {/* Tab 1: Products Panel */}', settingsTabBtn + '\n\n        {/* Tab 1: Products Panel */}');

// 7. Add Settings Panel UI
const settingsPanel = `
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
`;

content = content.replace('      </main>\n    </div>\n  );\n}\n', settingsPanel + '      </main>\n    </div>\n  );\n}\n');

fs.writeFileSync(targetFile, content);
console.log('Successfully patched admin page.');
} else {
  console.log('Already patched.');
}
