import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { UserCheck, Briefcase, ShieldCheck, ArrowRight, Compass } from 'lucide-react';
import { BackButton } from '../components/BackButton';

interface SignInProps {
  setRole: (r: string) => void;
  notify: (msg: string) => void;
}

export const SignIn: React.FC<SignInProps> = ({ setRole, notify }) => {
  const navigate = useNavigate();

  const handleSelectRole = (r: string) => {
    setRole(r);
    notify(`Switched to ${r.toUpperCase()} demo workspace!`);
    navigate('/dashboard');
  };

  return (
    <main className="page wrap narrow flex flex-col items-center justify-center min-h-[75vh] py-8">
      <div className="w-full max-w-lg mb-4 flex justify-start">
        <BackButton to="/" label="Back to Home" />
      </div>
      <div className="bg-white border border-slate-200 rounded-2xl sm:rounded-3xl p-5 sm:p-8 md:p-10 shadow-xl max-w-lg w-full text-center">
        <div className="w-16 h-16 rounded-2xl bg-blue-600 text-white flex items-center justify-center mx-auto mb-4 shadow-lg shadow-blue-500/20">
          <Compass size={32} />
        </div>

        <span className="eyebrow justify-center">WELCOME TO GATHERLY</span>
        <h1 className="text-3xl font-extrabold text-slate-900 mb-2">
          Select Your Workspace
        </h1>
        <p className="text-sm text-slate-600 mb-8">
          Choose a role profile to test and experience the platform's full end-to-end functionality.
        </p>

        <div className="space-y-3 text-left">
          {/* Customer */}
          <button
            onClick={() => handleSelectRole('customer')}
            className="w-full p-4 border border-slate-200 rounded-xl hover:border-blue-500 hover:bg-blue-50/50 transition flex items-center justify-between group"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center">
                <UserCheck size={22} />
              </div>
              <div>
                <b className="text-base text-slate-900 block group-hover:text-blue-600">Customer Demo</b>
                <small className="text-xs text-slate-500">Explore listings, book stays, manage personal reservations</small>
              </div>
            </div>
            <ArrowRight size={18} className="text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition" />
          </button>

          {/* Provider */}
          <button
            onClick={() => handleSelectRole('provider')}
            className="w-full p-4 border border-slate-200 rounded-xl hover:border-emerald-500 hover:bg-emerald-50/50 transition flex items-center justify-between group"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center">
                <Briefcase size={22} />
              </div>
              <div>
                <b className="text-base text-slate-900 block group-hover:text-emerald-600">Provider Demo</b>
                <small className="text-xs text-slate-500">Add service listings, manage booking requests, track earnings</small>
              </div>
            </div>
            <ArrowRight size={18} className="text-slate-400 group-hover:text-emerald-600 group-hover:translate-x-1 transition" />
          </button>

          {/* Admin */}
          <button
            onClick={() => handleSelectRole('admin')}
            className="w-full p-4 border border-slate-200 rounded-xl hover:border-purple-500 hover:bg-purple-50/50 transition flex items-center justify-between group"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-lg bg-purple-100 text-purple-600 flex items-center justify-center">
                <ShieldCheck size={22} />
              </div>
              <div>
                <b className="text-base text-slate-900 block group-hover:text-purple-600">Admin Demo</b>
                <small className="text-xs text-slate-500">Oversee users, verify providers, track revenue analytics</small>
              </div>
            </div>
            <ArrowRight size={18} className="text-slate-400 group-hover:text-purple-600 group-hover:translate-x-1 transition" />
          </button>
        </div>

        <p className="text-xs text-slate-400 mt-6">
          * Frontend simulation mode. Instant role switching available from any page.
        </p>
      </div>
    </main>
  );
};
