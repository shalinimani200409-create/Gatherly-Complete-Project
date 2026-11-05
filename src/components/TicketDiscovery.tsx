import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plane, Train, Bus, Calendar, Clock, ArrowRight, ShieldCheck, 
  Sparkles, CheckCircle2, MapPin, Tag, Luggage, Armchair, Ticket
} from 'lucide-react';
import { Booking } from '../App';

interface TicketDiscoveryProps {
  initialType?: 'flight' | 'train' | 'bus';
  onBookDemo?: (booking: any) => void;
  notify?: (msg: string) => void;
}

export const TicketDiscovery: React.FC<TicketDiscoveryProps> = ({ 
  initialType = 'flight', 
  onBookDemo,
  notify = () => {} 
}) => {
  const [activeTab, setActiveTab] = useState<'flight' | 'train' | 'bus'>(initialType);
  const [fromCity, setFromCity] = useState('Bengaluru (BLR)');
  const [toCity, setToCity] = useState('Delhi (DEL)');
  const [departureDate, setDepartureDate] = useState('2026-11-20');
  const [travelClass, setTravelClass] = useState('Economy');
  const [isSearching, setIsSearching] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<any | null>(null);
  const [confirmedTicket, setConfirmedTicket] = useState<any | null>(null);

  // Simulated flights
  const flightResults = [
    {
      id: 'FL-6E452',
      operator: 'IndiGo Airlines',
      flightNo: '6E 452',
      departureTime: '06:15 AM',
      arrivalTime: '09:00 AM',
      duration: '2h 45m',
      from: fromCity.split(' ')[0],
      to: toCity.split(' ')[0],
      stops: 'Non-stop',
      price: 4299,
      seatsLeft: 7,
      type: 'flight'
    },
    {
      id: 'FL-AI803',
      operator: 'Air India Express',
      flightNo: 'AI 803',
      departureTime: '11:30 AM',
      arrivalTime: '02:25 PM',
      duration: '2h 55m',
      from: fromCity.split(' ')[0],
      to: toCity.split(' ')[0],
      stops: 'Non-stop',
      price: 4850,
      seatsLeft: 12,
      type: 'flight'
    },
    {
      id: 'FL-UK812',
      operator: 'Vistara Prime',
      flightNo: 'UK 812',
      departureTime: '05:40 PM',
      arrivalTime: '08:35 PM',
      duration: '2h 55m',
      from: fromCity.split(' ')[0],
      to: toCity.split(' ')[0],
      stops: 'Non-stop',
      price: 5490,
      seatsLeft: 4,
      type: 'flight'
    }
  ];

  // Simulated trains
  const trainResults = [
    {
      id: 'TR-20643',
      operator: 'Vande Bharat Express',
      flightNo: '20643 VB',
      departureTime: '05:45 AM',
      arrivalTime: '01:50 PM',
      duration: '8h 05m',
      from: fromCity.split(' ')[0],
      to: toCity.split(' ')[0],
      stops: '4 stops (Fastest)',
      price: 1850,
      seatsLeft: 38,
      type: 'train'
    },
    {
      id: 'TR-12007',
      operator: 'Shatabdi Express',
      flightNo: '12007 AC',
      departureTime: '06:00 AM',
      arrivalTime: '02:40 PM',
      duration: '8h 40m',
      from: fromCity.split(' ')[0],
      to: toCity.split(' ')[0],
      stops: '6 stops',
      price: 1350,
      seatsLeft: 19,
      type: 'train'
    },
    {
      id: 'TR-12429',
      operator: 'Rajdhani AC Special',
      flightNo: '12429 RAJ',
      departureTime: '08:00 PM',
      arrivalTime: '06:30 AM',
      duration: '10h 30m',
      from: fromCity.split(' ')[0],
      to: toCity.split(' ')[0],
      stops: 'Overnight Express',
      price: 2450,
      seatsLeft: 8,
      type: 'train'
    }
  ];

  // Simulated buses
  const busResults = [
    {
      id: 'BS-INT902',
      operator: 'IntrCity SmartBus Volvo',
      flightNo: 'Volvo Multi-Axle 9600',
      departureTime: '09:00 PM',
      arrivalTime: '06:30 AM',
      duration: '9h 30m',
      from: fromCity.split(' ')[0],
      to: toCity.split(' ')[0],
      stops: 'Direct (1 Dinner Halt)',
      price: 1199,
      seatsLeft: 14,
      type: 'bus'
    },
    {
      id: 'BS-KSR88',
      operator: 'KSRTC Airavat Club Class',
      flightNo: 'Scania Multi-Axle AC',
      departureTime: '10:15 PM',
      arrivalTime: '07:45 AM',
      duration: '9h 30m',
      from: fromCity.split(' ')[0],
      to: toCity.split(' ')[0],
      stops: 'Express Non-stop',
      price: 980,
      seatsLeft: 22,
      type: 'bus'
    }
  ];

  const currentResults = activeTab === 'flight' ? flightResults : activeTab === 'train' ? trainResults : busResults;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearching(true);
    setTimeout(() => {
      setIsSearching(false);
      notify(`Found ${currentResults.length} simulated routes between ${fromCity} and ${toCity}`);
    }, 600);
  };

  const handleGenerateTicket = (ticket: any) => {
    setSelectedTicket(ticket);
  };

  const handleConfirmDemoBooking = () => {
    if (!selectedTicket) return;
    const pnr = `GTH-${activeTab.toUpperCase()}-${Math.floor(10000 + Math.random() * 90000)}`;
    const newBooking: Booking = {
      id: pnr,
      serviceId: 999,
      service: `${selectedTicket.operator} (${selectedTicket.flightNo}) - ${selectedTicket.from} to ${selectedTicket.to}`,
      date: departureDate,
      time: selectedTicket.departureTime,
      qty: 1,
      amount: selectedTicket.price,
      status: 'Confirmed',
      customer: 'Aarav Kumar',
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

    setConfirmedTicket({ ...selectedTicket, pnr });
    setSelectedTicket(null);
    notify(`Demo boarding pass generated! Saved to My Bookings (${pnr}).`);
  };

  return (
    <div className="bg-white border border-slate-200/90 rounded-2xl shadow-sm overflow-hidden mb-8">
      {/* Simulator Notice Header */}
      <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-blue-800 text-white p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white/15 backdrop-blur-xs flex items-center justify-center flex-shrink-0">
            <Ticket size={22} className="text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base sm:text-lg font-bold text-white mb-0">Travel Ticket Discovery Simulator</h3>
              <span className="bg-amber-400 text-slate-900 text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full">
                Demonstration Mode
              </span>
            </div>
            <p className="text-xs text-blue-100 mb-0">
              Simulated route comparison and instant demo e-ticket reservation for flights, trains, and buses.
            </p>
          </div>
        </div>

        {/* Tab Switchers */}
        <div className="inline-flex bg-white/15 p-1 rounded-xl self-start sm:self-center">
          <button
            type="button"
            onClick={() => setActiveTab('flight')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
              activeTab === 'flight' ? 'bg-white text-blue-700 shadow-xs' : 'text-white hover:bg-white/10'
            }`}
          >
            <Plane size={14} />
            <span>Flights</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('train')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
              activeTab === 'train' ? 'bg-white text-blue-700 shadow-xs' : 'text-white hover:bg-white/10'
            }`}
          >
            <Train size={14} />
            <span>Trains</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('bus')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
              activeTab === 'bus' ? 'bg-white text-blue-700 shadow-xs' : 'text-white hover:bg-white/10'
            }`}
          >
            <Bus size={14} />
            <span>Buses</span>
          </button>
        </div>
      </div>

      {/* Search Input Bar */}
      <form onSubmit={handleSearch} className="p-4 sm:p-5 bg-slate-50/70 border-b border-slate-200">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* From City */}
          <div>
            <label className="text-xs font-bold text-slate-600 mb-1 block">Origin City</label>
            <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-xl px-3 py-2 text-sm">
              <MapPin size={16} className="text-blue-600 flex-shrink-0" />
              <input
                type="text"
                value={fromCity}
                onChange={(e) => setFromCity(e.target.value)}
                className="w-full bg-transparent outline-none font-semibold text-slate-800 text-xs sm:text-sm"
                placeholder="From City"
              />
            </div>
          </div>

          {/* To City */}
          <div>
            <label className="text-xs font-bold text-slate-600 mb-1 block">Destination City</label>
            <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-xl px-3 py-2 text-sm">
              <MapPin size={16} className="text-orange-500 flex-shrink-0" />
              <input
                type="text"
                value={toCity}
                onChange={(e) => setToCity(e.target.value)}
                className="w-full bg-transparent outline-none font-semibold text-slate-800 text-xs sm:text-sm"
                placeholder="To City"
              />
            </div>
          </div>

          {/* Departure Date */}
          <div>
            <label className="text-xs font-bold text-slate-600 mb-1 block">Travel Date</label>
            <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-xl px-3 py-2 text-sm">
              <Calendar size={16} className="text-emerald-600 flex-shrink-0" />
              <input
                type="date"
                value={departureDate}
                onChange={(e) => setDepartureDate(e.target.value)}
                className="w-full bg-transparent outline-none font-semibold text-slate-800 text-xs sm:text-sm"
              />
            </div>
          </div>

          {/* Class / Search Button */}
          <div className="flex items-end gap-2">
            <div className="flex-1">
              <label className="text-xs font-bold text-slate-600 mb-1 block">Class / Tier</label>
              <select
                value={travelClass}
                onChange={(e) => setTravelClass(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs sm:text-sm font-semibold text-slate-800 outline-none"
              >
                <option value="Economy">Economy / Standard</option>
                <option value="Premium">Premium / AC Chair</option>
                <option value="Business">Business / Executive</option>
              </select>
            </div>
            <button
              type="submit"
              disabled={isSearching}
              className="btn btn-primary px-4 py-2.5 text-xs font-bold flex items-center justify-center gap-1.5 h-[40px]"
            >
              <Sparkles size={14} />
              <span>{isSearching ? 'Searching...' : 'Search'}</span>
            </button>
          </div>
        </div>
      </form>

      {/* Simulated Route Listings */}
      <div className="p-4 sm:p-5">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            Simulated Available Routes ({activeTab.toUpperCase()})
          </span>
          <span className="text-xs text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full font-bold flex items-center gap-1">
            <ShieldCheck size={13} />
            Live Demo Fares
          </span>
        </div>

        <div className="space-y-3">
          {currentResults.map((t) => (
            <div
              key={t.id}
              className="p-4 bg-white border border-slate-200 hover:border-blue-400 rounded-xl transition flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-2xs hover:shadow-sm"
            >
              {/* Carrier & Time Info */}
              <div className="flex items-start sm:items-center gap-4">
                <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center flex-shrink-0">
                  {activeTab === 'flight' ? <Plane size={20} /> : activeTab === 'train' ? <Train size={20} /> : <Bus size={20} />}
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-extrabold text-sm sm:text-base text-slate-900 mb-0">{t.operator}</h4>
                    <span className="text-xs bg-slate-100 text-slate-600 font-bold px-2 py-0.5 rounded">
                      {t.flightNo}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 mt-1.5 text-xs text-slate-600 flex-wrap">
                    <span className="font-extrabold text-slate-900">{t.departureTime} ({t.from})</span>
                    <span>→</span>
                    <span className="font-extrabold text-slate-900">{t.arrivalTime} ({t.to})</span>
                    <span>·</span>
                    <span className="flex items-center gap-1">
                      <Clock size={12} className="text-slate-400" />
                      {t.duration}
                    </span>
                    <span>·</span>
                    <span className="text-slate-500">{t.stops}</span>
                  </div>
                </div>
              </div>

              {/* Price & Action */}
              <div className="flex items-center justify-between md:justify-end gap-4 border-t md:border-t-0 pt-3 md:pt-0">
                <div className="text-left md:text-right">
                  <span className="text-[11px] text-slate-400 block font-semibold">Simulated Fare</span>
                  <span className="text-base sm:text-lg font-black text-slate-900">
                    ₹{t.price.toLocaleString('en-IN')}
                  </span>
                  <span className="text-[11px] text-emerald-600 font-bold block">{t.seatsLeft} seats left</span>
                </div>

                <button
                  type="button"
                  onClick={() => handleGenerateTicket(t)}
                  className="btn btn-primary text-xs py-2 px-3.5 font-bold flex items-center gap-1.5"
                >
                  <span>Select & Preview</span>
                  <ArrowRight size={13} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Demo Ticket Preview Modal */}
      <AnimatePresence>
        {selectedTicket && (
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="bg-white rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl border border-slate-200"
            >
              {/* Ticket Top Ribbon */}
              <div className="bg-gradient-to-r from-blue-700 to-indigo-800 text-white p-5 text-center relative">
                <div className="text-xs uppercase tracking-widest font-extrabold text-blue-200 mb-1">
                  Demonstration E-Boarding Pass
                </div>
                <h3 className="text-xl font-black text-white mb-0">{selectedTicket.operator}</h3>
                <span className="text-xs bg-white/20 text-white px-3 py-0.5 rounded-full font-bold mt-1 inline-block">
                  {selectedTicket.flightNo} · {travelClass} Class
                </span>
              </div>

              {/* Ticket Details */}
              <div className="p-6 space-y-4">
                <div className="flex items-center justify-between pb-4 border-b border-dashed border-slate-200">
                  <div>
                    <span className="text-xs text-slate-400 font-semibold block">FROM</span>
                    <span className="text-lg font-extrabold text-slate-900">{selectedTicket.from}</span>
                    <span className="text-xs text-slate-600 block">{selectedTicket.departureTime}</span>
                  </div>
                  <div className="text-center px-4">
                    <span className="text-xs text-slate-400 font-semibold block">{selectedTicket.duration}</span>
                    <ArrowRight size={20} className="text-blue-600 mx-auto" />
                    <span className="text-[10px] text-slate-500 font-bold block">{selectedTicket.stops}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-slate-400 font-semibold block">TO</span>
                    <span className="text-lg font-extrabold text-slate-900">{selectedTicket.to}</span>
                    <span className="text-xs text-slate-600 block">{selectedTicket.arrivalTime}</span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3 text-xs bg-slate-50 p-3.5 rounded-xl">
                  <div>
                    <span className="text-slate-400 block font-semibold">PASSENGER</span>
                    <span className="font-extrabold text-slate-800">Aarav Kumar</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block font-semibold">DATE</span>
                    <span className="font-extrabold text-slate-800">{departureDate}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block font-semibold">SEAT (DEMO)</span>
                    <span className="font-extrabold text-blue-700">14B (Window)</span>
                  </div>
                </div>

                {/* Simulated Barcode */}
                <div className="text-center py-2 bg-slate-100 rounded-lg">
                  <div className="tracking-[6px] font-mono font-bold text-slate-700 text-xs">
                    ||| | ||||| || |||| ||| |||| | |||
                  </div>
                  <span className="text-[10px] text-slate-500 font-semibold">
                    ELECTRONIC VERIFICATION CODE: GTH-DEMO-2026
                  </span>
                </div>

                {/* Price & Disclaimer */}
                <div className="flex items-center justify-between pt-2">
                  <div>
                    <span className="text-xs text-slate-400 block font-semibold">Demo Price</span>
                    <span className="text-xl font-black text-slate-900">
                      ₹{selectedTicket.price.toLocaleString('en-IN')}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setSelectedTicket(null)}
                      className="btn btn-outline text-xs py-2 px-3"
                    >
                      Close
                    </button>
                    <button
                      type="button"
                      onClick={handleConfirmDemoBooking}
                      className="btn btn-primary text-xs py-2 px-4 font-bold flex items-center gap-1.5"
                    >
                      <CheckCircle2 size={14} />
                      <span>Save to My Bookings</span>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Confirmed Notice */}
      {confirmedTicket && (
        <div className="m-4 sm:m-5 p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <CheckCircle2 size={20} className="text-emerald-600 flex-shrink-0" />
            <div>
              <span className="text-xs font-bold text-emerald-900 block">
                Demo Ticket Reserved: {confirmedTicket.operator} ({confirmedTicket.pnr})
              </span>
              <span className="text-xs text-emerald-700">
                You can review this demo booking anytime in your Customer Dashboard under My Bookings.
              </span>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setConfirmedTicket(null)}
            className="text-xs font-bold text-emerald-800 hover:underline flex-shrink-0"
          >
            Dismiss
          </button>
        </div>
      )}
    </div>
  );
};

