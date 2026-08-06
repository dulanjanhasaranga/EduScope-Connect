import React, { useState, useEffect } from 'react';
import api from '../../utils/api';
import LoadingSpinner from '../../components/LoadingSpinner';
import { showToast } from '../../components/ToastContainer';
import { Save } from 'lucide-react';

export default function SystemSettings() {
  const [settings, setSettings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    setLoading(true);
    try {
      const res = await api.get('/admin/settings');
      setSettings(res.data);
    } catch (err) {
      showToast('Failed to load system settings', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleToggle = (key) => {
    setSettings(settings.map(s => {
      if (s.key === key) {
        return { ...s, value: s.value === 'true' ? 'false' : 'true' };
      }
      return s;
    }));
  };

  const handleChange = (key, newValue) => {
    setSettings(settings.map(s => {
      if (s.key === key) {
        return { ...s, value: newValue };
      }
      return s;
    }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      // In a real app we might bulk update, but here we can just fire them sequentially or bulk API
      for (const setting of settings) {
        await api.patch(`/admin/settings/${setting.key}`, { value: String(setting.value) });
      }
      showToast('System settings saved successfully!', 'success');
    } catch (err) {
      showToast('Failed to save settings: ' + err.message, 'error');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <LoadingSpinner size="lg" className="py-20" />;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-slate-900">Global Settings</h2>
        <button 
          onClick={handleSave} 
          disabled={saving}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors disabled:opacity-50"
        >
          {saving ? <LoadingSpinner size="sm" /> : <Save className="w-4 h-4" />}
          Save Changes
        </button>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
        <div className="space-y-6 max-w-2xl">
          {settings.map(setting => {
            const isBoolean = setting.value === 'true' || setting.value === 'false';

            return (
              <div key={setting.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 border border-slate-100 bg-slate-50 rounded-xl">
                <div>
                  <h3 className="font-bold text-slate-800 font-mono text-sm">{setting.key}</h3>
                  <p className="text-slate-500 text-sm mt-1">{setting.description}</p>
                </div>
                
                <div className="flex-shrink-0">
                  {isBoolean ? (
                    <button
                      onClick={() => handleToggle(setting.key)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${setting.value === 'true' ? 'bg-blue-600' : 'bg-slate-300'}`}
                    >
                      <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${setting.value === 'true' ? 'translate-x-6' : 'translate-x-1'}`} />
                    </button>
                  ) : (
                    <input
                      type="text"
                      value={setting.value}
                      onChange={(e) => handleChange(setting.key, e.target.value)}
                      className="border border-slate-300 rounded-lg px-3 py-1.5 w-full sm:w-48 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  )}
                </div>
              </div>
            );
          })}
          {settings.length === 0 && <p className="text-slate-500">No settings found in database.</p>}
        </div>
      </div>
    </div>
  );
}
