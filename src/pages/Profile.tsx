import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Phone, MapPin, Shield, CheckCircle2, ArrowRight } from 'lucide-react';
import { BackButton } from '../components/BackButton';

interface ProfileProps {
  role: string;
  notify: (msg: string) => void;
}

export const Profile: React.FC<ProfileProps> = ({ role, notify }) => {
  const navigate = useNavigate();
  const [name, setName] = useState(role === 'provider' ? 'Fern Hospitality' : role === 'admin' ? 'Platform Administrator' : 'Aarav Kumar');
  const [email, setEmail] = useState(role === 'provider' ? 'hello@fern.demo' : role === 'admin' ? 'admin@gatherly.demo' : 'aarav.kumar@example.com');
  const [phone, setPhone] = useState('+91 98765 43210');
  const [city, setCity] = useState('Chennai, Tamil Nadu');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    notify('Profile changes updated successfully!');
  };

  return (
    <main className="page wrap narrow">
      <div className="flex items-center gap-3 mb-5 flex-wrap">
        <BackButton fallbackTo="/dashboard" label="Back" />
        <div className="breadcrumb !mb-0">
          <Link to="/">Home</Link>
          <span>/</span>
          <span className="text-slate-900 font-bold">Account Profile</span>
        </div>
      </div>

      <div className="page-heading">
        <span className="eyebrow">{role.toUpperCase()} PROFILE</span>
        <h1>Personal & Account Details</h1>
        <p>Update your personal information and contact details.</p>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-8 shadow-sm max-w-xl mx-auto">
        <div className="flex items-center gap-4 pb-6 border-b border-slate-100 mb-6">
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-blue-600 text-white font-extrabold text-xl flex items-center justify-center shadow-md flex-shrink-0">
            {role === 'admin' ? 'AD' : role === 'provider' ? 'FP' : 'AK'}
          </div>
          <div className="min-w-0">
            <h3 className="text-lg sm:text-xl font-bold text-slate-900 truncate">{name}</h3>
            <span className="text-xs font-bold text-blue-600 uppercase bg-blue-50 px-2.5 py-0.5 rounded-full inline-block mt-1">
              {role} Account
            </span>
          </div>
        </div>

        <form onSubmit={handleSave} className="space-y-4">
          <div className="form-group">
            <label className="form-label">Full Name</label>
            <input 
              type="text" 
              value={name} 
              onChange={(e) => setName(e.target.value)}
              className="form-input" 
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)}
              className="form-input" 
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Phone Number</label>
            <input 
              type="text" 
              value={phone} 
              onChange={(e) => setPhone(e.target.value)}
              className="form-input" 
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Base Location / City</label>
            <input 
              type="text" 
              value={city} 
              onChange={(e) => setCity(e.target.value)}
              className="form-input" 
            />
          </div>

          <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            <button type="submit" className="btn btn-primary w-full sm:w-auto">
              Save Profile Changes
            </button>
            <button 
              type="button" 
              onClick={() => navigate('/dashboard')}
              className="btn btn-outline text-xs w-full sm:w-auto"
            >
              Go to Dashboard
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};
