import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  ArrowRight, ArrowLeft, CalendarDays, Clock, Users, 
  MapPin, ShieldCheck, CheckCircle2 
} from 'lucide-react';
import { services, Service } from '../data';
import { BackButton } from '../components/BackButton';

interface BookingRecord {
  id: string;
  serviceId: number;
  service: string;
  date: string;
  time: string;
  qty: number;
  amount: number;
  status: string;
  customer: string;
  email: string;
  phone: string;
}

interface BookProps {
  addBooking: (b: BookingRecord) => void;
  notify: (msg: string) => void;
}

export const Book: React.FC<BookProps> = ({ addBooking, notify }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const service: Service = services.find((x) => x.id === Number(id)) || services[0];

  // Form State
  const [date, setDate] = useState('2026-11-15');
  const [time, setTime] = useState('10:00 AM');
  const [qty, setQty] = useState(1);
  const [fullName, setFullName] = useState('Aarav Kumar');
  const [email, setEmail] = useState('aarav.kumar@example.com');
  const [phone, setPhone] = useState('+91 98765 43210');
  const [specialRequests, setSpecialRequests] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const formatMoney = (n: number) => '₹' + n.toLocaleString('en-IN');
  const subtotal = service.price * qty;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !email.includes('@') || phone.length < 8) {
      setErrorMsg('Please enter valid contact information (Full name, valid email, and phone number).');
      return;
    }

    const bookingId = 'GT-' + Math.floor(10000 + Math.random() * 89999);
    const newBooking: BookingRecord = {
      id: bookingId,
      serviceId: service.id,
      service: service.name,
      date,
      time,
      qty,
      amount: subtotal,
      status: 'Confirmed',
      customer: fullName,
      email,
      phone
    };

    addBooking(newBooking);
    notify('Details confirmed! Proceeding to demo checkout.');
    navigate('/checkout', { state: { bookingId, booking: newBooking } });
  };

  return (
    <main className="page wrap narrow">
      {/* Breadcrumb Navigation & Back Button */}
      <div className="flex items-center gap-3 mb-5 flex-wrap">
        <BackButton to={`/service/${service.id}`} label="Back to Details" />
        <div className="breadcrumb !mb-0">
          <Link to="/">Home</Link>
          <span>/</span>
          <Link to="/explore">Explore</Link>
          <span>/</span>
          <Link to={`/service/${service.id}`}>{service.name}</Link>
          <span>/</span>
          <span className="text-slate-900 font-bold">Booking Step 1</span>
        </div>
      </div>

      {/* 3-Step Progress Indicator */}
      <div className="booking-steps-bar">
        <div className="booking-step-node active">
          <span className="booking-step-num">1</span>
          <span>Schedule & Details</span>
        </div>
        <div className="booking-step-divider" />
        <div className="booking-step-node">
          <span className="booking-step-num">2</span>
          <span>Review & Payment</span>
        </div>
        <div className="booking-step-divider" />
        <div className="booking-step-node">
          <span className="booking-step-num">3</span>
          <span>Confirmed Voucher</span>
        </div>
      </div>

      <div className="page-heading">
        <span className="eyebrow">STEP 1 OF 3</span>
        <h1>Reserve Your Booking</h1>
        <p>Confirm your preferred schedule, guests, and contact information for instant confirmation.</p>
      </div>

      {/* Grid: Form on Left + Summary on Right */}
      <div className="booking-layout-grid">
        {/* Form Container */}
        <form onSubmit={handleSubmit} className="booking-form-box">
          {/* Section 1: Schedule */}
          <div className="booking-form-section-title">
            <CalendarDays size={20} className="text-blue-600" />
            <span>1. Date & Time Selection</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="form-group">
              <label className="form-label" htmlFor="book-date">Preferred Date</label>
              <input 
                id="book-date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                min="2026-10-30"
                required
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="book-time">Time Slot</label>
              <select 
                id="book-time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="form-select"
              >
                <option value="09:00 AM">09:00 AM (Morning Slot)</option>
                <option value="11:30 AM">11:30 AM (Brunch Slot)</option>
                <option value="02:00 PM">02:00 PM (Afternoon Slot)</option>
                <option value="04:30 PM">04:30 PM (Evening Slot)</option>
                <option value="07:00 PM">07:00 PM (Dinner / Night Slot)</option>
              </select>
            </div>
          </div>

          {/* Quantity / Guests Counter */}
          <div className="form-group mb-8">
            <label className="form-label">Guests / Units</label>
            <div className="qty-counter-box">
              <button 
                type="button" 
                onClick={() => setQty(Math.max(1, qty - 1))}
                className="qty-btn"
                aria-label="Decrease quantity"
              >
                −
              </button>
              <span className="qty-val">{qty}</span>
              <button 
                type="button" 
                onClick={() => setQty(Math.min(10, qty + 1))}
                className="qty-btn"
                aria-label="Increase quantity"
              >
                +
              </button>
              <span className="text-sm text-slate-500 font-medium ml-2">
                ({qty} {qty === 1 ? 'person / booking' : 'people / bookings'})
              </span>
            </div>
          </div>

          {/* Section 2: Contact Details */}
          <div className="booking-form-section-title">
            <Users size={20} className="text-orange-500" />
            <span>2. Lead Guest Contact Details</span>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="book-name">Full Name</label>
            <input 
              id="book-name"
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
              className="form-input"
              placeholder="e.g. Aarav Kumar"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="form-group">
              <label className="form-label" htmlFor="book-email">Email Address</label>
              <input 
                id="book-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="form-input"
                placeholder="name@domain.com"
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="book-phone">Phone Number</label>
              <input 
                id="book-phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                className="form-input"
                placeholder="+91 98765 43210"
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="book-notes">Special Requests / Preferences (Optional)</label>
            <textarea 
              id="book-notes"
              value={specialRequests}
              onChange={(e) => setSpecialRequests(e.target.value)}
              placeholder="Dietary requests, late check-in notice, or special celebration arrangements..."
              className="form-textarea"
              rows={3}
            />
          </div>

          {errorMsg && (
            <div className="bg-rose-50 text-rose-700 p-3 rounded-lg text-sm font-semibold mb-4 border border-rose-200">
              {errorMsg}
            </div>
          )}

          {/* Submit Action */}
          <button 
            type="submit" 
            className="btn btn-orange w-full py-4 text-base font-bold flex items-center justify-center gap-2 mt-4"
            id="proceed-checkout-btn"
          >
            <span>Continue to Simulated Checkout</span>
            <ArrowRight size={18} />
          </button>

          <p className="text-center text-xs text-slate-400 mt-4">
            🔒 Safe simulated transaction. No credit card will be charged.
          </p>
        </form>

        {/* Right Summary Card */}
        <aside>
          <div className="order-summary-box">
            <img src={service.image} alt={service.name} className="order-summary-img" />
            <div className="order-summary-body">
              <span className="eyebrow">{service.category.toUpperCase()}</span>
              <h3 className="text-xl font-bold text-slate-900 mb-2">{service.name}</h3>
              <p className="flex items-center gap-1.5 text-xs text-slate-500 font-semibold mb-4">
                <MapPin size={14} className="text-orange-500" />
                {service.location}
              </p>

              <div className="summary-line">
                <span>Unit Base Price</span>
                <b>{formatMoney(service.price)}</b>
              </div>

              <div className="summary-line">
                <span>Quantity / Guests</span>
                <b>× {qty}</b>
              </div>

              <div className="summary-line">
                <span>Platform Convenience Fee</span>
                <b className="text-emerald-600">FREE (Demo)</b>
              </div>

              <div className="summary-total-line">
                <span>Estimated Total</span>
                <b>{formatMoney(subtotal)}</b>
              </div>

              <div className="bg-blue-50 border border-blue-100 rounded-lg p-3.5 text-xs text-blue-800 mt-6 flex items-start gap-2.5">
                <ShieldCheck size={18} className="text-blue-600 flex-shrink-0 mt-0.5" />
                <span>
                  Free cancellation available up to 24 hours prior to the booked time slot directly from your dashboard.
                </span>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
};
