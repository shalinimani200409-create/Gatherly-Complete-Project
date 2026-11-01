import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  CalendarDays, CalendarCheck, Clock, CheckCircle2, 
  X, ArrowRight, ArrowLeft, Search, Printer, RotateCcw,
  Sparkles, ShieldCheck
} from 'lucide-react';
import { services } from '../data';
import { BackButton } from '../components/BackButton';

interface Booking {
  id: string;
  serviceId: number;
  service: string;
  date: string;
  time: string;
  qty: number;
  amount: number;
  status: string;
  customer: string;
}

interface BookingsProps {
  bookings: Booking[];
  update: (id: string, status: string) => void;
  notify: (msg: string) => void;
}

export const Bookings: React.FC<BookingsProps> = ({ bookings, update, notify }) => {
  const [filterTab, setFilterTab] = useState<'All' | 'Confirmed' | 'Completed' | 'Cancelled'>('All');
  const navigate = useNavigate();

  const filtered = bookings.filter((b) => {
    if (filterTab === 'All') return true;
    return b.status === filterTab;
  });

  const formatMoney = (n: number) => '₹' + n.toLocaleString('en-IN');

  const handleCancelBooking = (id: string) => {
    if (window.confirm('Are you sure you want to cancel this booking?')) {
      update(id, 'Cancelled');
      notify(`Booking ${id} has been cancelled.`);
    }
  };

  return (
    <main className="page wrap">
      {/* Breadcrumb Navigation & Back Button */}
      <div className="flex items-center gap-3 mb-5 flex-wrap">
        <BackButton to="/" label="Back to Home" />
        <div className="breadcrumb !mb-0 text-sm">
          <Link to="/">Home</Link>
          <span>/</span>
          <span className="text-slate-900 font-bold">My Bookings</span>
        </div>
      </div>

      {/* Page Heading & Action Button */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
        <div>
          <span className="eyebrow">CUSTOMER WORKSPACE</span>
          <h1>My Bookings & Reservations</h1>
          <p>Review, manage, or reschedule your upcoming stays, tours, and services.</p>
        </div>

        <Link to="/explore" className="btn btn-primary self-start sm:self-auto py-2.5 px-4 text-sm">
          <span>Book New Service</span>
          <ArrowRight size={16} />
        </Link>
      </div>

      {/* Filter Tabs with Hidden Scrollbar for Mobile Smoothness */}
      <div className="flex gap-2 border-b border-slate-200 pb-3 mb-6 overflow-x-auto no-scrollbar">
        {(['All', 'Confirmed', 'Completed', 'Cancelled'] as const).map((tab) => {
          const count = tab === 'All' ? bookings.length : bookings.filter(b => b.status === tab).length;
          const isActive = filterTab === tab;
          return (
            <button
              key={tab}
              onClick={() => setFilterTab(tab)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition flex items-center gap-2 whitespace-nowrap flex-shrink-0 ${
                isActive 
                  ? 'bg-blue-600 text-white shadow-sm' 
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              <span>{tab === 'All' ? 'All Bookings' : tab}</span>
              <span className={`text-[11px] px-2 py-0.5 rounded-full font-bold ${
                isActive ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-700'
              }`}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Bookings List */}
      {filtered.length > 0 ? (
        <div className="space-y-4">
          {filtered.map((b) => {
            const svc = services.find((s) => s.id === b.serviceId) || services[0];
            return (
              <div 
                key={b.id} 
                className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 shadow-sm hover:shadow-md transition flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                {/* Left: Thumbnail and Details */}
                <div className="flex items-start sm:items-center gap-3.5 sm:gap-4 min-w-0">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden bg-slate-100 flex-shrink-0 border border-slate-200">
                    <img 
                      src={svc.image} 
                      alt={b.service} 
                      className="w-full h-full object-cover" 
                      loading="lazy" 
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className="text-xs font-mono font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-100">
                        {b.id}
                      </span>
                      <span className={`status-pill ${b.status.toLowerCase()}`}>
                        {b.status === 'Confirmed' && '✓ Confirmed'}
                        {b.status === 'Completed' && 'Completed'}
                        {b.status === 'Cancelled' && 'Cancelled'}
                      </span>
                    </div>
                    <Link 
                      to={`/service/${svc.id}`} 
                      className="text-base sm:text-lg font-bold text-slate-900 hover:text-blue-600 transition block truncate"
                      title={b.service}
                    >
                      {b.service}
                    </Link>
                    <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-slate-500 mt-1">
                      <span className="flex items-center gap-1 text-slate-700">
                        <CalendarDays size={13} className="text-blue-500 flex-shrink-0" />
                        <span>{b.date} at {b.time}</span>
                      </span>
                      <span>·</span>
                      <span>{b.qty} guest(s)</span>
                    </div>
                  </div>
                </div>

                {/* Right: Price & Actions */}
                <div className="flex items-center justify-between md:justify-end gap-4 pt-3 md:pt-0 border-t md:border-t-0 border-slate-100 flex-wrap">
                  <div className="text-left md:text-right">
                    <small className="text-[11px] text-slate-400 font-bold uppercase tracking-wider block">Total Amount</small>
                    <b className="text-lg sm:text-xl font-extrabold text-slate-900">{formatMoney(b.amount)}</b>
                  </div>

                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => navigate(`/confirmation/${b.id}`, { state: { booking: b } })}
                      className="btn btn-outline text-xs font-bold py-2 px-3 sm:px-4"
                      title="View Voucher"
                    >
                      <span>Voucher</span>
                    </button>

                    {b.status === 'Confirmed' && (
                      <button 
                        onClick={() => handleCancelBooking(b.id)}
                        className="py-2 px-3 sm:px-4 text-xs font-bold text-rose-600 bg-rose-50 hover:bg-rose-100 border border-rose-200 rounded-lg transition"
                        title="Cancel this booking"
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="empty-state-box">
          <CalendarCheck size={44} className="mx-auto text-slate-300" />
          <h3>No bookings found in this category</h3>
          <p>You have no {filterTab !== 'All' ? filterTab.toLowerCase() : ''} bookings at the moment.</p>
          <Link to="/explore" className="btn btn-primary mt-2">
            <span>Explore Services</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      )}
    </main>
  );
};

export default Bookings;
