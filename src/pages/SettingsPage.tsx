import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, ShieldCheck, Bell, Lock, Check } from 'lucide-react';
import { BackButton } from '../components/BackButton';

interface SettingsProps {
  notify: (msg: string) => void;
}

export const SettingsPage: React.FC<SettingsProps> = ({ notify }) => {
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [smsAlerts, setSmsAlerts] = useState(false);
  const [promoOffers, setPromoOffers] = useState(true);

  const handleSave = () => {
    notify('Preferences updated successfully!');
  };

  return (
    <main className="page wrap narrow">
      <div className="flex items-center gap-3 mb-5 flex-wrap">
        <BackButton to="/" label="Back" />
        <div className="breadcrumb !mb-0">
          <Link to="/">Home</Link>
          <span>/</span>
          <span className="text-slate-900 font-bold">Settings</span>
        </div>
      </div>

      <div className="page-heading">
        <span className="eyebrow">PREFERENCES</span>
        <h1>Account & Privacy Settings</h1>
        <p>Control communication channels and security options.</p>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-8 shadow-sm max-w-xl mx-auto space-y-6">
        <div>
          <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
            <Bell size={18} className="text-blue-600" />
            <span>Communication Preferences</span>
          </h3>

          <div className="space-y-4">
            <label className="flex items-center justify-between p-3.5 bg-slate-50 border border-slate-200 rounded-xl cursor-pointer">
              <div className="flex items-center gap-3">
                <Mail size={18} className="text-slate-500" />
                <div>
                  <b className="text-sm text-slate-900 block">Email Reservation Updates</b>
                  <small className="text-xs text-slate-500">Booking receipts and schedule changes</small>
                </div>
              </div>
              <input 
                type="checkbox" 
                checked={emailAlerts} 
                onChange={(e) => setEmailAlerts(e.target.checked)} 
                className="w-5 h-5 text-blue-600 rounded"
              />
            </label>

            <label className="flex items-center justify-between p-3.5 bg-slate-50 border border-slate-200 rounded-xl cursor-pointer">
              <div className="flex items-center gap-3">
                <Phone size={18} className="text-slate-500" />
                <div>
                  <b className="text-sm text-slate-900 block">SMS Alerts & Reminders</b>
                  <small className="text-xs text-slate-500">Day-of-service SMS notifications</small>
                </div>
              </div>
              <input 
                type="checkbox" 
                checked={smsAlerts} 
                onChange={(e) => setSmsAlerts(e.target.checked)} 
                className="w-5 h-5 text-blue-600 rounded"
              />
            </label>

            <label className="flex items-center justify-between p-3.5 bg-slate-50 border border-slate-200 rounded-xl cursor-pointer">
              <div className="flex items-center gap-3">
                <ShieldCheck size={18} className="text-slate-500" />
                <div>
                  <b className="text-sm text-slate-900 block">Personalized Deal Alerts</b>
                  <small className="text-xs text-slate-500">Weekend getaways and exclusive voucher codes</small>
                </div>
              </div>
              <input 
                type="checkbox" 
                checked={promoOffers} 
                onChange={(e) => setPromoOffers(e.target.checked)} 
                className="w-5 h-5 text-blue-600 rounded"
              />
            </label>
          </div>
        </div>

        <div className="pt-4 border-t border-slate-200">
          <button onClick={handleSave} className="btn btn-primary w-full py-3">
            Save Preferences
          </button>
        </div>
      </div>
    </main>
  );
};
