'use client';
import { useState } from 'react';
import { Upload, X, Loader2, Image as ImageIcon } from 'lucide-react';

export default function ImageUpload({ value, onChange, label }) {
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = async () => {
      try {
        const res = await fetch('/api/admin/upload', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ image: reader.result }),
        });
        const data = await res.json();
        if (data.success) {
          onChange(data.url);
        } else {
          alert('Upload failed: ' + data.error);
        }
      } catch (err) {
        alert('Upload Error: ' + err.message);
      } finally {
        setUploading(false);
      }
    };
  };

  return (
    <div className="flex flex-col gap-2 mb-4">
      {label && <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{label}</label>}
      <div className="relative group">
        <input
          type="text"
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Image URL or upload..."
          className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-sm text-white focus:outline-none focus:border-blue-500/50 pr-12"
        />
        <label className="absolute right-2 top-1/2 -translate-y-1/2 p-2 hover:bg-white/10 rounded-lg cursor-pointer transition-colors">
          {uploading ? <Loader2 className="animate-spin text-blue-400" size={18} /> : <Upload className="text-slate-400" size={18} />}
          <input type="file" className="hidden" accept="image/*" onChange={handleUpload} disabled={uploading} />
        </label>
      </div>
      {value && (
        <div className="relative w-full h-32 rounded-xl overflow-hidden border border-white/10 mt-2 group">
          <img src={value} alt="Preview" className="w-full h-full object-cover transition-transform group-hover:scale-105" />
          <button 
            onClick={() => onChange('')}
            className="absolute top-2 right-2 p-1.5 bg-red-500/80 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <X size={14} />
          </button>
        </div>
      )}
    </div>
  );
}
