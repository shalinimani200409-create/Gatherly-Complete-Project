import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Stethoscope, Calendar, Clock, User, CheckCircle2, ShieldCheck, 
  Sparkles, Award, MapPin, AlertCircle, X, ArrowRight, HeartPulse
} from 'lucide-react';
import { Booking } from '../App';

interface HealthcareModalProps {
  isOpen: boolean;
  onClose: () => void;
  service?: any;
  onBookDemo?: (booking: Booking) => void;
  notify?: (msg: string) => void;
}

export const HealthcareBookingModal: React.FC<HealthcareModalProps> = ({
  isOpen,
  onClose,
  service,
  onBookDemo,
  notify = () => {}
}) => {
  const [patientName, setPatientName] = useState('Aarav Kumar');
  const [patientAge, setPatientAge] = useState('32');
  const [consultType, setConsultType] = useState<'in-clinic' | 'video'>('in-clinic');
  const [selectedDate, setSelectedDate] = useState('2026-11-18');
  const [selectedSlot, setSelectedSlot] = useState('10:30 AM');
  const [reason, setReason] = useState('General preventative checkup & wellness review');
  const [confirmedSlip, setConfirmedSlip] = useState<any | null>(null);

  if (!isOpen) return null;

  const docTitle = service?.name || 'Dr. Sneha Kulkarni, MD';
  const docSpecialty = service?.subcategory || 'General Physician & Wellness Specialist';
  const consultFee = service?.price || 600;

  const handleConfirmAppointment = (e: React.FormEvent) => {
    e.preventDefault();
    const tokenNo = 'OPD-' + Math.floor(100 + Math.random() * 899);
    const bookingId = 'GT-HC-' + Math.floor(10000 + Math.random() * 89999);

    const newBooking: Booking = {
      id: bookingId,
      serviceId: service?.id || 101,
      service: `${docTitle} (${docSpecialty}) - Token ${tokenNo}`,
      date: selectedDate,
      time: selectedSlot,
      qty: 1,
      amount: consultFee,
      status: 'Confirmed',
      customer: patientName,
      email: 'aarav.kumar@example.com',
      phone: '+91 98765 43210'
    };

    if (onBookDemo) {
      onBookDemo(newBooking);
    } else {
      try {
        const stored = localStorage.getItem('gatherly-bookings');
        const list = stored ? JSON.parse(stored) : [];
        localStorage.setItem('gatherly-bookings', JSON.stringify([newBooking, ...list]));
      } catch (e) {}
    }

    setConfirmedSlip({
      bookingId,
      tokenNo,
      docTitle,
      docSpecialty,
      consultFee,
      selectedDate,
      selectedSlot,
      consultType
    });

    notify(`Demo Healthcare Appointment booked successfully! Token ${tokenNo}`);
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        className="bg-white rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl border border-slate-200 flex flex-col max-h-[90vh]"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-red-600 via-rose-600 to-red-700 text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0">
              <Stethoscope size={22} className="text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-bold text-white mb-0">Healthcare Appointment Portal</h3>
                <span className="bg-white/25 text-white text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full">
                  Demonstration
                </span>
              </div>
              <p className="text-xs text-rose-100 mb-0">
                Simulated doctor consultation slot discovery & instant demo clinic token
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white transition"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-4 flex-1">
          {!confirmedSlip ? (
            <form onSubmit={handleConfirmAppointment} className="space-y-4">
              {/* Doctor Card */}
              <div className="p-3.5 bg-rose-50/60 border border-rose-200/80 rounded-xl flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-xl bg-white shadow-xs border border-rose-100 flex items-center justify-center text-rose-600 flex-shrink-0">
                  <HeartPulse size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm mb-0.5">{docTitle}</h4>
                  <span className="text-xs text-rose-700 font-semibold block">{docSpecialty}</span>
                  <div className="flex items-center gap-2 text-[11px] text-slate-500 mt-1">
                    <span className="flex items-center gap-1">
                      <Award size={12} className="text-amber-500" />
                      14+ Yrs Experience
                    </span>
                    <span>·</span>
                    <span className="font-bold text-slate-700">₹{consultFee.toLocaleString('en-IN')} Consult Fee</span>
                  </div>
                </div>
              </div>

              {/* Consultation Mode */}
              <div>
                <label className="text-xs font-bold text-slate-700 mb-1.5 block">Consultation Mode</label>
                <div className="grid grid-cols-2 gap-2.5">
                  <button
                    type="button"
                    onClick={() => setConsultType('in-clinic')}
                    className={`p-2.5 rounded-xl border text-xs font-bold text-left transition flex items-center gap-2 ${
                      consultType === 'in-clinic'
                        ? 'bg-rose-50 border-rose-500 text-rose-900'
                        : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <MapPin size={16} className={consultType === 'in-clinic' ? 'text-rose-600' : 'text-slate-400'} />
                    <div>
                      <span className="block">In-Clinic Visit</span>
                      <small className="text-[10px] text-slate-400 block font-normal">Physical OPD Token</small>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setConsultType('video')}
                    className={`p-2.5 rounded-xl border text-xs font-bold text-left transition flex items-center gap-2 ${
                      consultType === 'video'
                        ? 'bg-rose-50 border-rose-500 text-rose-900'
                        : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <Sparkles size={16} className={consultType === 'video' ? 'text-rose-600' : 'text-slate-400'} />
                    <div>
                      <span className="block">Video Tele-Consult</span>
                      <small className="text-[10px] text-slate-400 block font-normal">HD Video Room (Demo)</small>
                    </div>
                  </button>
                </div>
              </div>

              {/* Date & Slot */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 mb-1 block">Preferred Date</label>
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800 outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 mb-1 block">Available Time Slot</label>
                  <select
                    value={selectedSlot}
                    onChange={(e) => setSelectedSlot(e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800 outline-none"
                  >
                    <option value="10:00 AM">10:00 AM (Morning)</option>
                    <option value="10:30 AM">10:30 AM (Morning)</option>
                    <option value="11:30 AM">11:30 AM (Morning)</option>
                    <option value="02:30 PM">02:30 PM (Afternoon)</option>
                    <option value="04:00 PM">04:00 PM (Afternoon)</option>
                    <option value="06:00 PM">06:00 PM (Evening)</option>
                    <option value="07:30 PM">07:30 PM (Evening)</option>
                  </select>
                </div>
              </div>

              {/* Patient Info */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-2">
                  <label className="text-xs font-bold text-slate-700 mb-1 block">Patient Name</label>
                  <input
                    type="text"
                    value={patientName}
                    onChange={(e) => setPatientName(e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800 outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 mb-1 block">Age</label>
                  <input
                    type="number"
                    value={patientAge}
                    onChange={(e) => setPatientAge(e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800 outline-none"
                    required
                  />
                </div>
              </div>

              {/* Concern */}
              <div>
                <label className="text-xs font-bold text-slate-700 mb-1 block">Reason for Consult / Symptoms</label>
                <input
                  type="text"
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800 outline-none"
                  placeholder="e.g. skin rash, dental routine checkup"
                  required
                />
              </div>

              {/* Disclaimer */}
              <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl flex items-start gap-2.5 text-xs text-amber-800">
                <AlertCircle size={16} className="text-amber-600 flex-shrink-0 mt-0.5" />
                <span>
                  <strong>Demo Disclaimer:</strong> Gatherly simulates appointment discovery and token scheduling. For medical emergencies, please visit an accredited hospital emergency room.
                </span>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={onClose}
                  className="btn btn-outline text-xs py-2 px-3.5"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary text-xs py-2 px-4 font-bold flex items-center gap-1.5"
                >
                  <CheckCircle2 size={15} />
                  <span>Confirm Demo Appointment</span>
                </button>
              </div>
            </form>
          ) : (
            /* Confirmed Appointment Token Slip */
            <div className="space-y-4">
              <div className="p-5 bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200 rounded-2xl text-center space-y-3">
                <div className="w-12 h-12 bg-emerald-600 text-white rounded-full mx-auto flex items-center justify-center">
                  <CheckCircle2 size={24} />
                </div>
                <div>
                  <span className="text-[11px] font-extrabold uppercase text-emerald-800 tracking-wider">
                    Appointment Token Confirmed
                  </span>
                  <h3 className="text-2xl font-black text-slate-900 mt-1">{confirmedSlip.tokenNo}</h3>
                  <span className="text-xs text-emerald-700 font-bold">
                    Room 204 · {confirmedSlip.consultType === 'in-clinic' ? 'In-Clinic Physical OPD' : 'Tele-Consult Link Sent'}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 text-left bg-white/80 p-3.5 rounded-xl text-xs border border-emerald-100">
                  <div>
                    <span className="text-slate-400 block font-semibold">DOCTOR</span>
                    <span className="font-extrabold text-slate-900">{confirmedSlip.docTitle}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block font-semibold">SPECIALTY</span>
                    <span className="font-extrabold text-slate-900">{confirmedSlip.docSpecialty}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block font-semibold">SCHEDULED DATE</span>
                    <span className="font-extrabold text-slate-900">{confirmedSlip.selectedDate}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block font-semibold">TIME SLOT</span>
                    <span className="font-extrabold text-slate-900">{confirmedSlip.selectedSlot}</span>
                  </div>
                </div>

                <p className="text-[11px] text-slate-500 mb-0">
                  A demo confirmation SMS and calendar invite have been simulated. This record has been stored in your Customer Dashboard.
                </p>
              </div>

              <div className="flex items-center justify-between pt-2">
                <span className="text-xs font-semibold text-slate-500">
                  Booking ID: {confirmedSlip.bookingId}
                </span>
                <button
                  type="button"
                  onClick={onClose}
                  className="btn btn-primary text-xs py-2 px-5 font-bold"
                >
                  Done
                </button>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

