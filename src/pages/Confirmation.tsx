import React from 'react';
import { useParams, useLocation, Link, useNavigate } from 'react-router-dom';
import { 
  CheckCircle2, Printer, CalendarDays, ArrowRight, 
  MapPin, Clock, User, QrCode, Sparkles 
} from 'lucide-react';
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

interface ConfirmationProps {
  bookings: Booking[];
  notify: (msg: string) => void;
}

export const Confirmation: React.FC<ConfirmationProps> = ({ bookings, notify }) => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const bookingState = (location.state as any)?.booking;

  const b = bookingState || bookings.find((x) => x.id === id) || bookings[0];

  const formatMoney = (n: number) => '₹' + n.toLocaleString('en-IN');

  const handlePrint = () => {
    window.print();
  };

  return (
    <main className="page wrap narrow confirmation-container">
      {/* Top Back Navigation */}
      <div className="flex items-center gap-3 mb-6 flex-wrap">
        <BackButton to="/bookings" label="Back to Bookings" />
        <div className="breadcrumb !mb-0 text-sm">
          <Link to="/">Home</Link>
          <span>/</span>
          <span className="text-slate-900 font-bold">Confirmation Voucher</span>
        </div>
      </div>

      {/* 3-Step Progress Indicator */}
      <div className="booking-steps-bar mb-8">
        <div className="booking-step-node">
          <span className="booking-step-num">✓</span>
          <span>Schedule & Details</span>
        </div>
        <div className="booking-step-divider" />
        <div className="booking-step-node">
          <span className="booking-step-num">✓</span>
          <span>Review & Payment</span>
        </div>
        <div className="booking-step-divider" />
        <div className="booking-step-node active">
          <span className="booking-step-num">3</span>
          <span>Confirmed Voucher</span>
        </div>
      </div>

      {/* Success Hero Header */}
      <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 mb-4 shadow-lg shadow-emerald-600/10">
        <CheckCircle2 size={44} />
      </div>

      <span className="eyebrow justify-center">RESERVATION SUCCESSFUL</span>
      <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-3">
        Your Booking is Confirmed! 🎉
      </h1>
      <p className="text-base text-slate-600 max-w-lg mx-auto mb-8">
        Thank you for booking through Gatherly. An official demo confirmation voucher has been generated and saved to your customer dashboard.
      </p>

      {/* Official Booking Voucher Card */}
      {b && (
        <div className="voucher-card">
          <div className="voucher-header flex flex-col sm:flex-row justify-between sm:items-center gap-3">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Official Booking Voucher</span>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 mt-0.5">{b.service}</h3>
            </div>
            <div className="text-left sm:text-right">
              <span className="text-[11px] text-slate-500 font-bold block mb-1">REFERENCE NO.</span>
              <span className="text-base sm:text-lg font-mono font-black text-blue-600 bg-blue-50 px-3 py-1 rounded-md inline-block border border-blue-100">
                {b.id}
              </span>
            </div>
          </div>

          <div className="voucher-details-grid grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="voucher-field">
              <span>Primary Guest</span>
              <b>{b.customer}</b>
            </div>

            <div className="voucher-field">
              <span>Date & Arrival Time</span>
              <b>{b.date} · {b.time}</b>
            </div>

            <div className="voucher-field">
              <span>Total Guests / Units</span>
              <b>{b.qty} {b.qty === 1 ? 'Guest' : 'Guests'}</b>
            </div>

            <div className="voucher-field">
              <span>Total Amount</span>
              <b className="text-emerald-600 text-xl">{formatMoney(b.amount)}</b>
            </div>

            <div className="voucher-field">
              <span>Current Status</span>
              <div>
                <span className="status-pill confirmed">
                  ✓ {b.status}
                </span>
              </div>
            </div>

            <div className="voucher-field">
              <span>Demo Check-In Code</span>
              <div className="flex items-center gap-2 text-slate-700 font-mono text-sm">
                <QrCode size={18} className="text-slate-400" />
                <span>GATH-{b.id.replace('GT-', '')}-PASS</span>
              </div>
            </div>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-slate-600">
            <span>Show this reference at reception or arrival for seamless access.</span>
            <button 
              onClick={handlePrint}
              className="btn btn-outline text-xs font-bold py-1.5 px-3 flex items-center gap-1.5 self-end sm:self-auto"
            >
              <Printer size={15} />
              <span>Print Voucher</span>
            </button>
          </div>
        </div>
      )}

      {/* Quick Action Navigation */}
      <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
        <Link to="/bookings" className="btn btn-primary text-base font-bold py-3.5 px-6">
          <span>View in My Bookings</span>
          <ArrowRight size={18} />
        </Link>
        <Link to="/explore" className="btn btn-outline text-base font-bold py-3.5 px-6">
          <span>Explore More Services</span>
        </Link>
      </div>
    </main>
  );
};
