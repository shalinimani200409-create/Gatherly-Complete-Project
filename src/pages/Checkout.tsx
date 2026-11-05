import React, { useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { 
  CreditCard, Smartphone, Building, Wallet, ShieldCheck, 
  ArrowRight, ArrowLeft, Tag, Check, CheckCircle2 
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

interface CheckoutProps {
  bookings: Booking[];
  notify: (msg: string) => void;
}

export const Checkout: React.FC<CheckoutProps> = ({ bookings, notify }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const bookingState = (location.state as any)?.booking;
  const bookingId = (location.state as any)?.bookingId || bookings[0]?.id || 'GT-24018';
  
  // Find booking
  const b = bookingState || bookings.find((x) => x.id === bookingId) || bookings[0];

  // Payment method selection
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'upi' | 'netbanking' | 'venue'>('card');
  const [promoCode, setPromoCode] = useState('');
  const [discountAmount, setDiscountAmount] = useState(0);
  const [appliedPromo, setAppliedPromo] = useState('');

  // Demo Card fields
  const [cardNumber, setCardNumber] = useState('4242 •••• •••• 4242');
  const [cardExpiry, setCardExpiry] = useState('12/28');
  const [cardCvv, setCardCvv] = useState('888');

  const baseAmount = b ? b.amount : 3499;
  const finalAmount = Math.max(0, baseAmount - discountAmount);

  const formatMoney = (n: number) => '₹' + n.toLocaleString('en-IN');

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanCode = promoCode.trim().toUpperCase();
    if (cleanCode === 'GATHER25') {
      const disc = Math.round(baseAmount * 0.25);
      setDiscountAmount(disc);
      setAppliedPromo('GATHER25 (25% Special Discount)');
      notify('Promo code GATHER25 applied successfully! Saved ' + formatMoney(disc));
    } else if (cleanCode === 'RELAXNOW') {
      const disc = Math.min(500, baseAmount);
      setDiscountAmount(disc);
      setAppliedPromo('RELAXNOW (₹500 Instant Discount)');
      notify('Promo code RELAXNOW applied! Saved ' + formatMoney(disc));
    } else {
      notify('Invalid or expired coupon code. Try GATHER25');
    }
  };

  const handleConfirmOrder = () => {
    notify('Demo payment verified! Booking confirmed.');
    navigate(`/confirmation/${bookingId}`, { state: { booking: { ...b, amount: finalAmount } } });
  };

  return (
    <main className="page wrap narrow">
      {/* Breadcrumb Navigation & Back Button */}
      <div className="flex items-center gap-3 mb-5 flex-wrap">
        <BackButton fallbackTo={b?.serviceId ? `/book/${b.serviceId}` : '/explore'} label="Back" />
        <div className="breadcrumb !mb-0">
          <Link to="/">Home</Link>
          <span>/</span>
          <Link to="/explore">Explore</Link>
          <span>/</span>
          <span className="text-slate-900 font-bold">Checkout Step 2</span>
        </div>
      </div>

      {/* 3-Step Progress Indicator */}
      <div className="booking-steps-bar">
        <div className="booking-step-node">
          <span className="booking-step-num">✓</span>
          <span>Schedule & Details</span>
        </div>
        <div className="booking-step-divider" />
        <div className="booking-step-node active">
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
        <span className="eyebrow">STEP 2 OF 3</span>
        <h1>Review & Secure Demo Payment</h1>
        <p>Select your preferred payment method and apply voucher discounts.</p>
      </div>

      <div className="booking-layout-grid">
        {/* Left: Payment Method Selector */}
        <div className="booking-form-box">
          <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
            <CreditCard size={20} className="text-blue-600" />
            <span>Select Payment Method (Simulation)</span>
          </h2>

          {/* Payment Method Pills */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
            <button
              type="button"
              onClick={() => setPaymentMethod('card')}
              className={`p-3.5 rounded-xl border text-left flex items-center gap-3 transition ${paymentMethod === 'card' ? 'border-blue-600 bg-blue-50/50 shadow-sm' : 'border-slate-200 bg-white hover:bg-slate-50'}`}
            >
              <CreditCard size={20} className={paymentMethod === 'card' ? 'text-blue-600' : 'text-slate-400'} />
              <div>
                <b className="text-sm block text-slate-800">Credit / Debit Card</b>
                <small className="text-xs text-slate-500">Visa, MasterCard, RuPay</small>
              </div>
            </button>

            <button
              type="button"
              onClick={() => setPaymentMethod('upi')}
              className={`p-3.5 rounded-xl border text-left flex items-center gap-3 transition ${paymentMethod === 'upi' ? 'border-blue-600 bg-blue-50/50 shadow-sm' : 'border-slate-200 bg-white hover:bg-slate-50'}`}
            >
              <Smartphone size={20} className={paymentMethod === 'upi' ? 'text-blue-600' : 'text-slate-400'} />
              <div>
                <b className="text-sm block text-slate-800">UPI / QR Scan</b>
                <small className="text-xs text-slate-500">GPay, PhonePe, Paytm</small>
              </div>
            </button>

            <button
              type="button"
              onClick={() => setPaymentMethod('netbanking')}
              className={`p-3.5 rounded-xl border text-left flex items-center gap-3 transition ${paymentMethod === 'netbanking' ? 'border-blue-600 bg-blue-50/50 shadow-sm' : 'border-slate-200 bg-white hover:bg-slate-50'}`}
            >
              <Building size={20} className={paymentMethod === 'netbanking' ? 'text-blue-600' : 'text-slate-400'} />
              <div>
                <b className="text-sm block text-slate-800">Net Banking</b>
                <small className="text-xs text-slate-500">All major Indian banks</small>
              </div>
            </button>

            <button
              type="button"
              onClick={() => setPaymentMethod('venue')}
              className={`p-3.5 rounded-xl border text-left flex items-center gap-3 transition ${paymentMethod === 'venue' ? 'border-blue-600 bg-blue-50/50 shadow-sm' : 'border-slate-200 bg-white hover:bg-slate-50'}`}
            >
              <Wallet size={20} className={paymentMethod === 'venue' ? 'text-blue-600' : 'text-slate-400'} />
              <div>
                <b className="text-sm block text-slate-800">Pay at Venue</b>
                <small className="text-xs text-slate-500">Cash or card upon arrival</small>
              </div>
            </button>
          </div>

          {/* Card Input Details (Simulated) */}
          {paymentMethod === 'card' && (
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-4 mb-6">
              <div>
                <label className="text-xs font-bold text-slate-600 uppercase block mb-1">Card Number</label>
                <input 
                  type="text" 
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  className="form-input bg-white"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-600 uppercase block mb-1">Expiry Date</label>
                  <input 
                    type="text" 
                    value={cardExpiry}
                    onChange={(e) => setCardExpiry(e.target.value)}
                    className="form-input bg-white"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-600 uppercase block mb-1">CVV / CVC</label>
                  <input 
                    type="password" 
                    value={cardCvv}
                    onChange={(e) => setCardCvv(e.target.value)}
                    className="form-input bg-white"
                  />
                </div>
              </div>
            </div>
          )}

          {paymentMethod === 'upi' && (
            <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 text-center mb-6">
              <div className="w-32 h-32 mx-auto bg-white border-2 border-dashed border-slate-300 rounded-lg flex items-center justify-center mb-3">
                <span className="text-xs font-bold text-slate-400">QR Code Demo</span>
              </div>
              <p className="text-xs text-slate-600 font-semibold">
                Scan using any UPI app (Google Pay, PhonePe, Paytm, BHIM)
              </p>
            </div>
          )}

          {/* Promo Code Box */}
          <div className="mb-6">
            <label className="text-sm font-bold text-slate-800 block mb-2">Have a Voucher or Promo Code?</label>
            <form onSubmit={handleApplyPromo} className="flex gap-2">
              <input 
                type="text" 
                placeholder="Try code GATHER25 or RELAXNOW"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                className="form-input flex-1 uppercase"
              />
              <button type="submit" className="btn btn-outline text-sm font-bold py-2.5 px-4">
                Apply
              </button>
            </form>
            {appliedPromo && (
              <p className="text-xs text-emerald-600 font-bold mt-2 flex items-center gap-1">
                <Check size={14} />
                <span>{appliedPromo}</span>
              </p>
            )}
          </div>

          <button 
            type="button"
            onClick={handleConfirmOrder}
            className="btn btn-orange w-full py-4 text-base font-bold flex items-center justify-center gap-2"
            id="confirm-booking-btn"
          >
            <span>Confirm & Complete Demo Booking</span>
            <ArrowRight size={18} />
          </button>
        </div>

        {/* Right: Order Summary */}
        <aside>
          <div className="order-summary-box">
            <div className="order-summary-body">
              <h3 className="text-lg font-bold text-slate-900 pb-3 border-b border-slate-100">
                Booking Summary
              </h3>

              <div className="my-4">
                <b className="text-base text-slate-900 block">{b?.service}</b>
                <span className="text-xs text-slate-500 font-medium">Ref ID: {b?.id}</span>
                <div className="text-xs font-semibold text-slate-600 mt-2">
                  <span>Scheduled: {b?.date} at {b?.time}</span>
                  <span className="block mt-0.5">Quantity: {b?.qty} guest(s)</span>
                </div>
              </div>

              <div className="summary-line">
                <span>Subtotal</span>
                <b>{formatMoney(baseAmount)}</b>
              </div>

              {discountAmount > 0 && (
                <div className="summary-line text-emerald-600 font-semibold">
                  <span>Voucher Discount</span>
                  <b>−{formatMoney(discountAmount)}</b>
                </div>
              )}

              <div className="summary-line">
                <span>Taxes & Surcharges</span>
                <b className="text-slate-400">₹0 (Demo)</b>
              </div>

              <div className="summary-total-line">
                <span>Total Amount Due</span>
                <b>{formatMoney(finalAmount)}</b>
              </div>

              <div className="bg-emerald-50 border border-emerald-100 rounded-lg p-3.5 text-xs text-emerald-800 mt-6 flex items-start gap-2.5">
                <CheckCircle2 size={18} className="text-emerald-600 flex-shrink-0 mt-0.5" />
                <span>
                  Instant confirmation voucher will be generated immediately and linked to your customer dashboard.
                </span>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
};
