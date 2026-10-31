import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { CheckCircle2 } from 'lucide-react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { Explore } from './pages/Explore';
import { Details } from './pages/Details';
import { Book } from './pages/Book';
import { Checkout } from './pages/Checkout';
import { Confirmation } from './pages/Confirmation';
import { Bookings } from './pages/Bookings';
import { Dashboard } from './pages/Dashboard';
import { Profile } from './pages/Profile';
import { SignIn } from './pages/SignIn';
import { SettingsPage } from './pages/SettingsPage';

export interface Booking {
  id: string;
  serviceId: number;
  service: string;
  date: string;
  time: string;
  qty: number;
  amount: number;
  status: string;
  customer: string;
  email?: string;
  phone?: string;
}

const readStorage = <T,>(key: string, fallback: T): T => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch {
    return fallback;
  }
};

const initialBookings: Booking[] = [
  {
    id: 'GT-24018',
    serviceId: 1,
    service: 'The Fern Residency & Grand Spa',
    date: '2026-11-15',
    time: '02:00 PM',
    qty: 1,
    amount: 3499,
    status: 'Confirmed',
    customer: 'Aarav Kumar',
    email: 'aarav.kumar@example.com',
    phone: '+91 98765 43210'
  },
  {
    id: 'GT-24012',
    serviceId: 3,
    service: 'The Courtyard Artisan Table',
    date: '2026-10-18',
    time: '07:30 PM',
    qty: 2,
    amount: 1700,
    status: 'Completed',
    customer: 'Aarav Kumar',
    email: 'aarav.kumar@example.com',
    phone: '+91 98765 43210'
  },
  {
    id: 'GT-24009',
    serviceId: 6,
    service: 'Bluewater Sunrise Sea Kayaking',
    date: '2026-10-08',
    time: '09:00 AM',
    qty: 2,
    amount: 2400,
    status: 'Cancelled',
    customer: 'Aarav Kumar',
    email: 'aarav.kumar@example.com',
    phone: '+91 98765 43210'
  }
];

export function App() {
  const [role, setRole] = useState<string>(() => readStorage('gatherly-role', 'customer'));
  const [bookings, setBookings] = useState<Booking[]>(() => readStorage('gatherly-bookings', initialBookings));
  const [wishlist, setWishlist] = useState<number[]>(() => readStorage('gatherly-wishlist', [1, 2, 6]));
  const [toast, setToast] = useState<string>('');

  useEffect(() => {
    localStorage.setItem('gatherly-role', JSON.stringify(role));
  }, [role]);

  useEffect(() => {
    localStorage.setItem('gatherly-bookings', JSON.stringify(bookings));
  }, [bookings]);

  useEffect(() => {
    localStorage.setItem('gatherly-wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const notify = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  };

  const addBooking = (b: Booking) => {
    setBookings((prev) => [b, ...prev]);
  };

  const updateBookingStatus = (id: string, status: string) => {
    setBookings((prev) => prev.map((b) => (b.id === id ? { ...b, status } : b)));
  };

  const toggleWishlist = (id: number) => {
    if (wishlist.includes(id)) {
      setWishlist(wishlist.filter((x) => x !== id));
      notify('Removed from your saved wishlist.');
    } else {
      setWishlist([...wishlist, id]);
      notify('Added to your saved wishlist!');
    }
  };

  const activeBookingsCount = bookings.filter((b) => b.status === 'Confirmed').length;

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-800">
      {/* Universal Navigation Header */}
      <Header 
        role={role} 
        setRole={setRole} 
        bookingsCount={activeBookingsCount}
        notify={notify}
      />

      {/* Main Page Routing */}
      <div className="flex-1">
        <Routes>
          <Route path="/" element={<Home wishlist={wishlist} toggleWishlist={toggleWishlist} notify={notify} />} />
          <Route path="/explore" element={<Explore wishlist={wishlist} toggleWishlist={toggleWishlist} />} />
          <Route path="/category/:category" element={<Explore wishlist={wishlist} toggleWishlist={toggleWishlist} />} />
          <Route path="/service/:id" element={<Details wishlist={wishlist} toggleWishlist={toggleWishlist} />} />
          <Route path="/book/:id" element={<Book addBooking={addBooking} notify={notify} />} />
          <Route path="/checkout" element={<Checkout bookings={bookings} notify={notify} />} />
          <Route path="/confirmation/:id" element={<Confirmation bookings={bookings} notify={notify} />} />
          <Route path="/bookings" element={<Bookings bookings={bookings} update={updateBookingStatus} notify={notify} />} />
          <Route path="/signin" element={<SignIn setRole={setRole} notify={notify} />} />
          <Route path="/signup" element={<SignIn setRole={setRole} notify={notify} />} />
          <Route 
            path="/dashboard" 
            element={
              <Dashboard 
                role={role} 
                setRole={setRole} 
                bookings={bookings} 
                update={updateBookingStatus} 
                wishlist={wishlist}
                toggleWishlist={toggleWishlist}
                notify={notify}
              />
            } 
          />
          <Route path="/profile" element={<Profile role={role} notify={notify} />} />
          <Route path="/settings" element={<SettingsPage notify={notify} />} />
          <Route path="*" element={<Home wishlist={wishlist} toggleWishlist={toggleWishlist} notify={notify} />} />
        </Routes>
      </div>

      {/* Universal Modern Footer */}
      <Footer notify={notify} />

      {/* Toast Notification */}
      {toast && (
        <div className="toast-notice">
          <CheckCircle2 size={20} className="text-emerald-400 flex-shrink-0" />
          <span>{toast}</span>
        </div>
      )}
    </div>
  );
}

export default App;