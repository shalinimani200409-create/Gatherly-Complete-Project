import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, CalendarCheck, Clock, Users, Building2, 
  Briefcase, Plus, Trash2, Edit3, Check, X, ShieldCheck, 
  Wallet, TrendingUp, Sparkles, LogOut, ArrowRight, ArrowLeft, MapPin, 
  Settings, UserCheck, Star, Heart, CheckCircle2, DollarSign,
  Layers, Filter, Eye, RefreshCw
} from 'lucide-react';
import { services, categories, Service } from '../data';

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

interface DashboardProps {
  role: string;
  setRole: (r: string) => void;
  bookings: Booking[];
  update: (id: string, status: string) => void;
  wishlist: number[];
  toggleWishlist: (id: number) => void;
  notify: (msg: string) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
  role,
  setRole,
  bookings,
  update,
  wishlist,
  toggleWishlist,
  notify,
}) => {
  const navigate = useNavigate();

  // Tab State based on current role
  const [customerTab, setCustomerTab] = useState<'Overview' | 'My Bookings' | 'Booking History' | 'Saved Services' | 'Profile & Settings'>('Overview');
  const [providerTab, setProviderTab] = useState<'Overview' | 'Manage Services' | 'Add New Service' | 'Manage Bookings' | 'Revenue Overview' | 'Profile Settings'>('Overview');
  const [adminTab, setAdminTab] = useState<'Overview' | 'Manage Customers' | 'Manage Providers' | 'Manage Services' | 'Manage Categories' | 'Booking Management' | 'Revenue Statistics'>('Overview');

  // Active tab helper to determine if on the main dashboard (Overview) or a sub-page
  const currentTab = 
    role === 'customer' ? customerTab :
    role === 'provider' ? providerTab :
    adminTab;

  const isMainDashboard = currentTab === 'Overview';

  const handleBackToMainDashboard = () => {
    if (role === 'customer') setCustomerTab('Overview');
    else if (role === 'provider') setProviderTab('Overview');
    else if (role === 'admin') setAdminTab('Overview');
  };

  // Provider Listings State (persisted in local storage)
  const [providerListings, setProviderListings] = useState<Service[]>(() => {
    try {
      const saved = localStorage.getItem('gatherly-provider-listings');
      return saved ? JSON.parse(saved) : services.slice(0, 5);
    } catch {
      return services.slice(0, 5);
    }
  });

  useEffect(() => {
    localStorage.setItem('gatherly-provider-listings', JSON.stringify(providerListings));
  }, [providerListings]);

  // Provider Add Form State
  const [newServiceName, setNewServiceName] = useState('');
  const [newServiceCategory, setNewServiceCategory] = useState('Hotels & Stays');
  const [newServicePrice, setNewServicePrice] = useState('3200');
  const [newServiceLocation, setNewServiceLocation] = useState('Ooty, Tamil Nadu');
  const [newServiceDuration, setNewServiceDuration] = useState('1 Night stay');
  const [newServiceDesc, setNewServiceDesc] = useState('Experience top-rated hospitality with modern comforts and scenic surroundings.');
  const [newServiceFeatures, setNewServiceFeatures] = useState('Wi-Fi, Breakfast, Free Parking, Mountain View');

  // Customer Profile State
  const [customerName, setCustomerName] = useState('Aarav Kumar');
  const [customerEmail, setCustomerEmail] = useState('aarav.kumar@example.com');
  const [customerPhone, setCustomerPhone] = useState('+91 98765 43210');
  const [notifEmail, setNotifEmail] = useState(true);
  const [notifSms, setNotifSms] = useState(false);

  // Admin Mock Users State
  const [adminUsers, setAdminUsers] = useState([
    { id: 1, name: 'Aarav Kumar', email: 'aarav@example.com', role: 'Customer', active: true, joined: 'Oct 2026' },
    { id: 2, name: 'Maya Srinivasan', email: 'maya.s@example.com', role: 'Customer', active: true, joined: 'Sep 2026' },
    { id: 3, name: 'Rohan Mehra', email: 'rohan.m@example.com', role: 'Customer', active: true, joined: 'Aug 2026' },
    { id: 4, name: 'Pooja Hegde', email: 'pooja.h@example.com', role: 'Customer', active: false, joined: 'Jul 2026' },
  ]);

  const [adminProviders, setAdminProviders] = useState([
    { id: 1, name: 'Fern Hospitality Group', category: 'Hotels & Stays', verified: true, listings: 4, rating: 4.8 },
    { id: 2, name: 'Serene Stays & Resorts', category: 'Hotels & Stays', verified: true, listings: 2, rating: 4.9 },
    { id: 3, name: 'Courtyard Culinary Group', category: 'Dining & Food', verified: true, listings: 3, rating: 4.7 },
    { id: 4, name: 'Orchid Events & Banquets', category: 'Events & Venues', verified: true, listings: 2, rating: 4.8 },
    { id: 5, name: 'Bluewater Coast Outdoors', category: 'Activities & Sports', verified: false, listings: 1, rating: 4.9 },
  ]);

  const formatMoney = (n: number) => '₹' + n.toLocaleString('en-IN');

  const handleLogout = () => {
    notify(`Logged out of ${role.toUpperCase()} demo.`);
    navigate('/');
  };

  const handleCreateService = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newServiceName.trim()) {
      notify('Please enter a valid service name.');
      return;
    }

    const newService: Service = {
      id: Date.now(),
      name: newServiceName,
      category: newServiceCategory,
      location: newServiceLocation,
      price: Number(newServicePrice) || 2000,
      rating: 5.0,
      reviews: 1,
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1000&auto=format&fit=crop&q=80',
      description: newServiceDesc,
      tag: 'New Listing',
      accent: 'blue',
      features: newServiceFeatures.split(',').map((s) => s.trim()).filter(Boolean),
      provider: 'Fern Hospitality Group',
      duration: newServiceDuration,
      featured: true
    };

    setProviderListings([newService, ...providerListings]);
    setNewServiceName('');
    setProviderTab('Manage Services');
    notify('🎉 New service listing published successfully!');
  };

  const handleDeleteListing = (id: number) => {
    if (window.confirm('Delete this service listing?')) {
      setProviderListings(providerListings.filter((x) => x.id !== id));
      notify('Service listing removed.');
    }
  };

  return (
    <main className="dashboard-layout wrap">
      {/* ========================================================
          SIDEBAR NAVIGATION (Desktop Sticky & Mobile Top Header)
          ======================================================== */}
      <aside className="dash-sidebar">
        {/* User / Partner Header Badge */}
        <div className="dash-user-badge">
          <div className="dash-user-avatar">
            {role === 'admin' ? 'AD' : role === 'provider' ? 'FP' : 'AK'}
          </div>
          <div className="dash-user-info min-w-0">
            <b className="truncate">{role === 'admin' ? 'Platform Administrator' : role === 'provider' ? 'Fern Hospitality' : customerName}</b>
            <span>{role.toUpperCase()} WORKSPACE</span>
          </div>
        </div>

        {/* Navigation Tabs based on Role */}
        <div className="dash-nav-links">
          {/* CUSTOMER TABS */}
          {role === 'customer' && (
            <>
              <button 
                className={`dash-nav-btn ${customerTab === 'Overview' ? 'active' : ''}`}
                onClick={() => setCustomerTab('Overview')}
              >
                <LayoutDashboard size={18} />
                <span>Overview</span>
              </button>
              <button 
                className={`dash-nav-btn ${customerTab === 'My Bookings' ? 'active' : ''}`}
                onClick={() => setCustomerTab('My Bookings')}
              >
                <CalendarCheck size={18} />
                <span>My Bookings</span>
              </button>
              <button 
                className={`dash-nav-btn ${customerTab === 'Booking History' ? 'active' : ''}`}
                onClick={() => setCustomerTab('Booking History')}
              >
                <Clock size={18} />
                <span>Booking History</span>
              </button>
              <button 
                className={`dash-nav-btn ${customerTab === 'Saved Services' ? 'active' : ''}`}
                onClick={() => setCustomerTab('Saved Services')}
              >
                <Heart size={18} />
                <span>Saved Services ({wishlist.length})</span>
              </button>
              <button 
                className={`dash-nav-btn ${customerTab === 'Profile & Settings' ? 'active' : ''}`}
                onClick={() => setCustomerTab('Profile & Settings')}
              >
                <Settings size={18} />
                <span>Profile & Settings</span>
              </button>
            </>
          )}

          {/* PROVIDER TABS */}
          {role === 'provider' && (
            <>
              <button 
                className={`dash-nav-btn ${providerTab === 'Overview' ? 'active' : ''}`}
                onClick={() => setProviderTab('Overview')}
              >
                <LayoutDashboard size={18} />
                <span>Provider Overview</span>
              </button>
              <button 
                className={`dash-nav-btn ${providerTab === 'Manage Services' ? 'active' : ''}`}
                onClick={() => setProviderTab('Manage Services')}
              >
                <Layers size={18} />
                <span>Manage Services ({providerListings.length})</span>
              </button>
              <button 
                className={`dash-nav-btn ${providerTab === 'Add New Service' ? 'active' : ''}`}
                onClick={() => setProviderTab('Add New Service')}
              >
                <Plus size={18} />
                <span>Add New Service</span>
              </button>
              <button 
                className={`dash-nav-btn ${providerTab === 'Manage Bookings' ? 'active' : ''}`}
                onClick={() => setProviderTab('Manage Bookings')}
              >
                <CalendarCheck size={18} />
                <span>Manage Bookings</span>
              </button>
              <button 
                className={`dash-nav-btn ${providerTab === 'Revenue Overview' ? 'active' : ''}`}
                onClick={() => setProviderTab('Revenue Overview')}
              >
                <DollarSign size={18} />
                <span>Revenue Overview</span>
              </button>
              <button 
                className={`dash-nav-btn ${providerTab === 'Profile Settings' ? 'active' : ''}`}
                onClick={() => setProviderTab('Profile Settings')}
              >
                <Building2 size={18} />
                <span>Business Profile</span>
              </button>
            </>
          )}

          {/* ADMIN TABS */}
          {role === 'admin' && (
            <>
              <button 
                className={`dash-nav-btn ${adminTab === 'Overview' ? 'active' : ''}`}
                onClick={() => setAdminTab('Overview')}
              >
                <LayoutDashboard size={18} />
                <span>Admin Overview</span>
              </button>
              <button 
                className={`dash-nav-btn ${adminTab === 'Manage Customers' ? 'active' : ''}`}
                onClick={() => setAdminTab('Manage Customers')}
              >
                <Users size={18} />
                <span>Manage Customers</span>
              </button>
              <button 
                className={`dash-nav-btn ${adminTab === 'Manage Providers' ? 'active' : ''}`}
                onClick={() => setAdminTab('Manage Providers')}
              >
                <Building2 size={18} />
                <span>Manage Providers</span>
              </button>
              <button 
                className={`dash-nav-btn ${adminTab === 'Manage Services' ? 'active' : ''}`}
                onClick={() => setAdminTab('Manage Services')}
              >
                <Layers size={18} />
                <span>Manage Services</span>
              </button>
              <button 
                className={`dash-nav-btn ${adminTab === 'Manage Categories' ? 'active' : ''}`}
                onClick={() => setAdminTab('Manage Categories')}
              >
                <Sparkles size={18} />
                <span>Manage Categories</span>
              </button>
              <button 
                className={`dash-nav-btn ${adminTab === 'Booking Management' ? 'active' : ''}`}
                onClick={() => setAdminTab('Booking Management')}
              >
                <CalendarCheck size={18} />
                <span>Booking Management</span>
              </button>
              <button 
                className={`dash-nav-btn ${adminTab === 'Revenue Statistics' ? 'active' : ''}`}
                onClick={() => setAdminTab('Revenue Statistics')}
              >
                <TrendingUp size={18} />
                <span>Revenue Statistics</span>
              </button>
            </>
          )}
        </div>

        {/* Sidebar Footer with Logout & Role Switcher */}
        <div className="dash-sidebar-footer">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">Demo Quick Switch</div>
          <div className="grid grid-cols-3 gap-1 mb-2">
            <button 
              onClick={() => { setRole('customer'); notify('Switched to Customer demo'); }}
              className={`py-1.5 px-2 text-xs font-bold rounded ${role === 'customer' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-700'}`}
            >
              Customer
            </button>
            <button 
              onClick={() => { setRole('provider'); notify('Switched to Provider demo'); }}
              className={`py-1.5 px-2 text-xs font-bold rounded ${role === 'provider' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-700'}`}
            >
              Provider
            </button>
            <button 
              onClick={() => { setRole('admin'); notify('Switched to Admin demo'); }}
              className={`py-1.5 px-2 text-xs font-bold rounded ${role === 'admin' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-700'}`}
            >
              Admin
            </button>
          </div>

          <button onClick={handleLogout} className="dash-logout-btn w-full justify-center">
            <LogOut size={16} />
            <span>Sign Out (Demo)</span>
          </button>
        </div>
      </aside>

      {/* ========================================================
          MAIN CONTENT AREA
          ======================================================== */}
      <section className="dash-main-area">
        {/* Single Consolidated Dashboard Breadcrumb / Back Navigation Bar */}
        {!isMainDashboard && (
          <div className="flex items-center justify-between gap-3 mb-6 p-2.5 sm:p-3 bg-blue-50/70 border border-blue-200/80 rounded-2xl flex-wrap">
            <div className="flex items-center gap-2.5 flex-wrap">
              <button
                type="button"
                onClick={handleBackToMainDashboard}
                className="btn-back text-xs py-1.5 px-3"
                title="Back to Dashboard Overview"
              >
                <ArrowLeft size={15} className="btn-back-icon" />
                <span>Back to Overview</span>
              </button>
              <div className="text-xs font-semibold text-slate-500 flex items-center gap-1.5">
                <button 
                  type="button" 
                  onClick={handleBackToMainDashboard} 
                  className="text-blue-700 hover:underline font-bold"
                >
                  {role.charAt(0).toUpperCase() + role.slice(1)} Dashboard
                </button>
                <span>/</span>
                <span className="text-slate-800 font-bold">{currentTab}</span>
              </div>
            </div>

            <Link to="/explore" className="btn btn-outline text-xs font-bold py-1.5 px-3 hidden sm:inline-flex">
              <span>View Live Website</span>
              <ArrowRight size={13} />
            </Link>
          </div>
        )}

        {/* Topbar Greeting */}
        <div className="dash-topbar flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
          <div>
            <span className="eyebrow">{role.toUpperCase()} CONTROL PANEL</span>
            <h1>
              {role === 'admin' 
                ? (isMainDashboard ? 'Platform Operations Center' : `Admin: ${currentTab}`) 
                : role === 'provider' 
                ? (isMainDashboard ? 'Welcome back, Fern Hospitality 👋' : `Provider: ${currentTab}`) 
                : (isMainDashboard ? `Welcome back, ${customerName} 👋` : `Customer: ${currentTab}`)}
            </h1>
            <p>
              {isMainDashboard
                ? `Here’s what’s happening with your ${role === 'admin' ? 'global platform' : role === 'provider' ? 'business listings' : 'reservations'} today.`
                : `Managing ${currentTab} inside your ${role} workspace.`}
            </p>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <Link to="/explore" className="btn btn-outline text-xs font-bold py-2 px-3">
              Browse Platform
            </Link>
          </div>
        </div>

        {/* ----------------------------------------------------
            CUSTOMER DASHBOARD PANELS
            ---------------------------------------------------- */}
        {role === 'customer' && (
          <div>
            {/* Metric Cards - shown on Overview page */}
            {customerTab === 'Overview' && (
              <div className="metrics-grid">
                <div className="metric-card">
                  <div className="metric-card-header">
                    <span className="metric-card-label">Total Bookings</span>
                    <div className="metric-card-icon bg-blue-50 text-blue-600">
                      <CalendarCheck size={22} />
                    </div>
                  </div>
                  <div className="metric-card-val">{bookings.length}</div>
                  <span className="metric-card-sub text-blue-600">All reservations</span>
                </div>

                <div className="metric-card">
                  <div className="metric-card-header">
                    <span className="metric-card-label">Confirmed & Upcoming</span>
                    <div className="metric-card-icon bg-emerald-50 text-emerald-600">
                      <CheckCircle2 size={22} />
                    </div>
                  </div>
                  <div className="metric-card-val">
                    {bookings.filter((b) => b.status === 'Confirmed').length}
                  </div>
                  <span className="metric-card-sub">Ready when you are</span>
                </div>

                <div className="metric-card">
                  <div className="metric-card-header">
                    <span className="metric-card-label">Completed</span>
                    <div className="metric-card-icon bg-amber-50 text-amber-600">
                      <Clock size={22} />
                    </div>
                  </div>
                  <div className="metric-card-val">
                    {bookings.filter((b) => b.status === 'Completed').length}
                  </div>
                  <span className="metric-card-sub text-amber-600">Great memories</span>
                </div>

                <div className="metric-card">
                  <div className="metric-card-header">
                    <span className="metric-card-label">Saved Wishlist</span>
                    <div className="metric-card-icon bg-pink-50 text-pink-600">
                      <Heart size={22} />
                    </div>
                  </div>
                  <div className="metric-card-val">{wishlist.length}</div>
                  <span className="metric-card-sub text-pink-600">Favorites</span>
                </div>
              </div>
            )}

            {/* Panel: Overview & My Bookings */}
            {(customerTab === 'Overview' || customerTab === 'My Bookings') && (
              <div className="dash-panel">
                <div className="dash-panel-header">
                  <div>
                    <h3>{customerTab === 'Overview' ? 'Active & Recent Reservations' : 'All My Bookings'}</h3>
                    <p>Track your upcoming hotel stays, dining slots, and guided excursions.</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Link to="/explore" className="text-link text-xs font-bold">
                      <span>Browse more services</span>
                      <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>

                <div className="dash-table-wrap">
                  <table className="dash-table">
                    <thead>
                      <tr>
                        <th>Booking ID</th>
                        <th>Experience</th>
                        <th>Schedule</th>
                        <th>Amount</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {bookings.map((b) => (
                        <tr key={b.id}>
                          <td className="font-mono font-bold text-blue-600 text-xs">{b.id}</td>
                          <td className="font-bold text-slate-900">{b.service}</td>
                          <td className="text-slate-600 text-xs">
                            <span className="font-semibold block">{b.date}</span>
                            <span>{b.time} ({b.qty} guest)</span>
                          </td>
                          <td className="font-bold text-slate-900">{formatMoney(b.amount)}</td>
                          <td>
                            <span className={`status-pill ${b.status.toLowerCase()}`}>
                              {b.status}
                            </span>
                          </td>
                          <td>
                            <div className="flex items-center gap-2">
                              <button 
                                onClick={() => navigate(`/confirmation/${b.id}`, { state: { booking: b } })}
                                className="btn btn-outline text-xs py-1.5 px-3"
                              >
                                Voucher
                              </button>
                              {b.status === 'Confirmed' && (
                                <button 
                                  onClick={() => {
                                    if (window.confirm('Cancel this demo booking?')) {
                                      update(b.id, 'Cancelled');
                                      notify('Booking cancelled.');
                                    }
                                  }}
                                  className="text-xs font-bold text-rose-600 hover:text-rose-800"
                                >
                                  Cancel
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Panel: Booking History */}
            {customerTab === 'Booking History' && (
              <div className="dash-panel">
                <div className="dash-panel-header">
                  <div>
                    <h3>Past & Completed Bookings</h3>
                    <p>Archived reservations from previous trips and appointments.</p>
                  </div>
                </div>

                <div className="dash-table-wrap">
                  <table className="dash-table">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Service</th>
                        <th>Date</th>
                        <th>Total</th>
                        <th>Status</th>
                        <th>Review</th>
                      </tr>
                    </thead>
                    <tbody>
                      {bookings.filter((b) => b.status !== 'Confirmed').map((b) => (
                        <tr key={b.id}>
                          <td className="font-mono font-bold text-xs">{b.id}</td>
                          <td className="font-bold">{b.service}</td>
                          <td>{b.date}</td>
                          <td className="font-bold">{formatMoney(b.amount)}</td>
                          <td>
                            <span className={`status-pill ${b.status.toLowerCase()}`}>{b.status}</span>
                          </td>
                          <td>
                            <span className="text-xs text-amber-600 font-bold">★★★★★ 5.0</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Panel: Saved Services (Wishlist) */}
            {customerTab === 'Saved Services' && (
              <div className="dash-panel">
                <div className="dash-panel-header">
                  <div>
                    <h3>Saved Experiences & Wishlist ({wishlist.length})</h3>
                    <p>Your favorite destinations and listings bookmarked for future trips.</p>
                  </div>
                </div>

                {wishlist.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {services.filter((s) => wishlist.includes(s.id)).map((s) => (
                      <div key={s.id} className="border border-slate-200 rounded-xl overflow-hidden bg-white shadow-sm flex flex-col">
                        <img src={s.image} alt={s.name} className="h-40 w-full object-cover" />
                        <div className="p-4 flex flex-col flex-1">
                          <span className="text-xs font-bold text-blue-600 mb-1">{s.category}</span>
                          <h4 className="font-bold text-slate-900 text-sm mb-2">{s.name}</h4>
                          <div className="mt-auto pt-3 border-t border-slate-100 flex items-center justify-between">
                            <b className="text-sm font-extrabold">{formatMoney(s.price)}</b>
                            <div className="flex items-center gap-2">
                              <button 
                                onClick={() => toggleWishlist(s.id)}
                                className="text-xs font-semibold text-slate-500 hover:text-rose-600"
                              >
                                Remove
                              </button>
                              <Link to={`/book/${s.id}`} className="btn btn-primary text-xs py-1 px-3">
                                Book
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 text-slate-400">
                    <Heart size={36} className="mx-auto mb-2 text-slate-300" />
                    <p className="font-medium text-sm">No saved services in your wishlist yet.</p>
                    <Link to="/explore" className="btn btn-primary text-xs mt-3 inline-flex">
                      Explore Catalog
                    </Link>
                  </div>
                )}
              </div>
            )}

            {/* Panel: Profile & Settings */}
            {customerTab === 'Profile & Settings' && (
              <div className="dash-panel max-w-xl">
                <div className="dash-panel-header">
                  <div>
                    <h3>Profile & Contact Preferences</h3>
                    <p>Update your personal information for faster booking checkout.</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="form-group">
                    <label className="form-label">Full Name</label>
                    <input 
                      type="text" 
                      value={customerName} 
                      onChange={(e) => setCustomerName(e.target.value)} 
                      className="form-input" 
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Email Address</label>
                    <input 
                      type="email" 
                      value={customerEmail} 
                      onChange={(e) => setCustomerEmail(e.target.value)} 
                      className="form-input" 
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Phone Number</label>
                    <input 
                      type="tel" 
                      value={customerPhone} 
                      onChange={(e) => setCustomerPhone(e.target.value)} 
                      className="form-input" 
                    />
                  </div>

                  <div className="pt-2 border-t border-slate-100">
                    <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Notification Channels</h4>
                    <label className="flex items-center gap-2.5 text-xs text-slate-700 font-semibold mb-2 cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={notifEmail} 
                        onChange={(e) => setNotifEmail(e.target.checked)} 
                        className="rounded text-blue-600" 
                      />
                      <span>Email confirmation receipts</span>
                    </label>
                    <label className="flex items-center gap-2.5 text-xs text-slate-700 font-semibold cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={notifSms} 
                        onChange={(e) => setNotifSms(e.target.checked)} 
                        className="rounded text-blue-600" 
                      />
                      <span>Day-of-service SMS reminders</span>
                    </label>
                  </div>

                  <button 
                    onClick={() => notify('Profile preferences updated.')} 
                    className="btn btn-primary mt-2"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ----------------------------------------------------
            PROVIDER DASHBOARD PANELS
            ---------------------------------------------------- */}
        {role === 'provider' && (
          <div>
            {/* Metric Cards - shown on Overview page */}
            {providerTab === 'Overview' && (
              <div className="metrics-grid">
                <div className="metric-card">
                  <div className="metric-card-header">
                    <span className="metric-card-label">Active Listings</span>
                    <div className="metric-card-icon bg-blue-50 text-blue-600">
                      <Layers size={22} />
                    </div>
                  </div>
                  <div className="metric-card-val">{providerListings.length}</div>
                  <span className="metric-card-sub text-blue-600">Published online</span>
                </div>

                <div className="metric-card">
                  <div className="metric-card-header">
                    <span className="metric-card-label">Total Bookings</span>
                    <div className="metric-card-icon bg-emerald-50 text-emerald-600">
                      <CalendarCheck size={22} />
                    </div>
                  </div>
                  <div className="metric-card-val">{bookings.length}</div>
                  <span className="metric-card-sub">Active customers</span>
                </div>

                <div className="metric-card">
                  <div className="metric-card-header">
                    <span className="metric-card-label">Net Earnings</span>
                    <div className="metric-card-icon bg-purple-50 text-purple-600">
                      <Wallet size={22} />
                    </div>
                  </div>
                  <div className="metric-card-val">
                    {formatMoney(bookings.reduce((sum, b) => sum + b.amount, 0))}
                  </div>
                  <span className="metric-card-sub text-purple-600">Ready for payout</span>
                </div>

                <div className="metric-card">
                  <div className="metric-card-header">
                    <span className="metric-card-label">Merchant Rating</span>
                    <div className="metric-card-icon bg-amber-50 text-amber-600">
                      <Star size={22} className="fill-amber-500" />
                    </div>
                  </div>
                  <div className="metric-card-val">4.9 / 5.0</div>
                  <span className="metric-card-sub">Top Tier Host</span>
                </div>
              </div>
            )}

            {/* Panel: Overview & Manage Bookings */}
            {(providerTab === 'Overview' || providerTab === 'Manage Bookings') && (
              <div className="dash-panel">
                <div className="dash-panel-header">
                  <div>
                    <h3>{providerTab === 'Overview' ? 'Recent Customer Bookings' : 'All Booking Requests'}</h3>
                    <p>Approve, confirm, or manage incoming customer bookings for your listings.</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => setProviderTab('Add New Service')} 
                      className="btn btn-primary text-xs py-2 px-3 flex items-center gap-1.5"
                    >
                      <Plus size={15} />
                      <span>Add New Service</span>
                    </button>
                  </div>
                </div>

                <div className="dash-table-wrap">
                  <table className="dash-table">
                    <thead>
                      <tr>
                        <th>Booking Ref</th>
                        <th>Customer</th>
                        <th>Service</th>
                        <th>Date & Time</th>
                        <th>Amount</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {bookings.map((b) => (
                        <tr key={b.id}>
                          <td className="font-mono font-bold text-xs text-blue-600">{b.id}</td>
                          <td className="font-semibold text-slate-800">{b.customer}</td>
                          <td className="font-bold text-slate-900">{b.service}</td>
                          <td className="text-xs text-slate-500">{b.date} · {b.time}</td>
                          <td className="font-bold text-slate-900">{formatMoney(b.amount)}</td>
                          <td>
                            <span className={`status-pill ${b.status.toLowerCase()}`}>{b.status}</span>
                          </td>
                          <td>
                            {b.status === 'Confirmed' ? (
                              <div className="flex items-center gap-2">
                                <button 
                                  onClick={() => { update(b.id, 'Completed'); notify(`Booking ${b.id} marked as completed!`); }}
                                  className="text-xs font-bold text-emerald-600 hover:text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200"
                                >
                                  Complete
                                </button>
                                <button 
                                  onClick={() => { update(b.id, 'Cancelled'); notify(`Booking ${b.id} rejected.`); }}
                                  className="text-xs font-bold text-rose-600 hover:text-rose-800 bg-rose-50 px-2.5 py-1 rounded border border-rose-200"
                                >
                                  Decline
                                </button>
                              </div>
                            ) : (
                              <span className="text-xs text-slate-400">Processed</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Panel: Manage Services */}
            {providerTab === 'Manage Services' && (
              <div className="dash-panel">
                <div className="dash-panel-header">
                  <div>
                    <h3>Your Active Service Listings</h3>
                    <p>Live listings currently visible to travelers on the Gatherly platform.</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => setProviderTab('Add New Service')} 
                      className="btn btn-primary text-xs py-2 px-3 flex items-center gap-1.5"
                    >
                      <Plus size={15} />
                      <span>Create New Listing</span>
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {providerListings.map((s) => (
                    <div key={s.id} className="border border-slate-200 rounded-xl p-4 flex gap-4 bg-white shadow-sm">
                      <img src={s.image} alt={s.name} className="w-24 h-24 rounded-lg object-cover flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-bold text-blue-600">{s.category}</span>
                          <span className="status-pill confirmed text-xs">Active</span>
                        </div>
                        <h4 className="text-base font-bold text-slate-900 truncate">{s.name}</h4>
                        <div className="flex items-center gap-2 text-xs text-slate-500 my-1">
                          <MapPin size={12} className="text-orange-500" />
                          <span>{s.location}</span>
                        </div>
                        <div className="flex items-center justify-between mt-3 pt-2 border-t border-slate-100">
                          <b className="text-base font-extrabold text-slate-900">{formatMoney(s.price)}</b>
                          <div className="flex items-center gap-2">
                            <Link to={`/service/${s.id}`} className="text-xs font-bold text-blue-600 hover:underline">
                              Preview
                            </Link>
                            <button 
                              onClick={() => handleDeleteListing(s.id)}
                              className="text-xs font-bold text-rose-600 hover:text-rose-800"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Panel: Add New Service Form */}
            {providerTab === 'Add New Service' && (
              <div className="dash-panel max-w-2xl">
                <div className="dash-panel-header">
                  <div>
                    <h3>Publish a New Service Listing</h3>
                    <p>Fill out listing specifications to instantly add to the demo marketplace.</p>
                  </div>
                </div>

                <form onSubmit={handleCreateService} className="space-y-4">
                  <div className="form-group">
                    <label className="form-label">Service / Experience Title</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Whispering Pines Luxury Treehouse Villa"
                      value={newServiceName}
                      onChange={(e) => setNewServiceName(e.target.value)}
                      required
                      className="form-input"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="form-group">
                      <label className="form-label">Category</label>
                      <select 
                        value={newServiceCategory} 
                        onChange={(e) => setNewServiceCategory(e.target.value)}
                        className="form-select"
                      >
                        {categories.map((c) => (
                          <option key={c.name} value={c.name}>{c.name}</option>
                        ))}
                      </select>
                    </div>

                    <div className="form-group">
                      <label className="form-label">Base Starting Price (₹)</label>
                      <input 
                        type="number" 
                        value={newServicePrice} 
                        onChange={(e) => setNewServicePrice(e.target.value)}
                        required
                        className="form-input"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="form-group">
                      <label className="form-label">Location / City</label>
                      <input 
                        type="text" 
                        value={newServiceLocation} 
                        onChange={(e) => setNewServiceLocation(e.target.value)}
                        required
                        className="form-input"
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label">Duration / Slot Type</label>
                      <input 
                        type="text" 
                        value={newServiceDuration} 
                        onChange={(e) => setNewServiceDuration(e.target.value)}
                        className="form-input"
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Key Amenities (comma separated)</label>
                    <input 
                      type="text" 
                      value={newServiceFeatures} 
                      onChange={(e) => setNewServiceFeatures(e.target.value)}
                      className="form-input"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Description</label>
                    <textarea 
                      value={newServiceDesc} 
                      onChange={(e) => setNewServiceDesc(e.target.value)}
                      rows={4}
                      className="form-textarea"
                    />
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 pt-3">
                    <button type="submit" className="btn btn-primary w-full sm:w-auto">
                      <Plus size={16} />
                      <span>Publish Listing to Marketplace</span>
                    </button>
                    <button 
                      type="button" 
                      onClick={() => setProviderTab('Manage Services')}
                      className="btn btn-outline w-full sm:w-auto"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Panel: Revenue Overview */}
            {providerTab === 'Revenue Overview' && (
              <div className="dash-panel">
                <div className="dash-panel-header">
                  <div>
                    <h3>Merchant Earnings & Payouts</h3>
                    <p>Overview of booking proceeds and automated payout schedules.</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                  <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl">
                    <span className="text-xs font-bold text-slate-500 uppercase block">Total Net Disbursed</span>
                    <b className="text-2xl font-black text-slate-900">₹8,42,650</b>
                    <small className="text-xs text-emerald-600 block mt-1">100% on-time demo payouts</small>
                  </div>
                  <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl">
                    <span className="text-xs font-bold text-slate-500 uppercase block">Pending Settlement</span>
                    <b className="text-2xl font-black text-blue-600">₹24,300</b>
                    <small className="text-xs text-slate-500 block mt-1">Settles this Friday</small>
                  </div>
                  <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl">
                    <span className="text-xs font-bold text-slate-500 uppercase block">Platform Commission</span>
                    <b className="text-2xl font-black text-slate-900">10% Flat</b>
                    <small className="text-xs text-slate-500 block mt-1">Includes 24/7 concierge</small>
                  </div>
                </div>

                <div className="bg-white border border-slate-200 rounded-xl p-5">
                  <h4 className="text-sm font-bold text-slate-900 mb-3">Recent Payout Logs</h4>
                  <div className="space-y-3 text-xs">
                    <div className="flex justify-between py-2 border-b border-slate-100 flex-wrap gap-2">
                      <span>Payout #PO-88219 (Bank Transfer)</span>
                      <b>₹68,400 · Completed (28 Oct 2026)</b>
                    </div>
                    <div className="flex justify-between py-2 border-b border-slate-100 flex-wrap gap-2">
                      <span>Payout #PO-88192 (Bank Transfer)</span>
                      <b>₹54,200 · Completed (21 Oct 2026)</b>
                    </div>
                    <div className="flex justify-between py-2 border-b border-slate-100 flex-wrap gap-2">
                      <span>Payout #PO-88145 (Bank Transfer)</span>
                      <b>₹72,800 · Completed (14 Oct 2026)</b>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Panel: Business Profile */}
            {providerTab === 'Profile Settings' && (
              <div className="dash-panel max-w-xl">
                <div className="dash-panel-header">
                  <div>
                    <h3>Partner Business Profile</h3>
                    <p>Details displayed on your public service listings.</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="form-group">
                    <label className="form-label">Business Name</label>
                    <input type="text" defaultValue="Fern Hospitality Group" className="form-input" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Support Email</label>
                    <input type="email" defaultValue="support@fernhospitality.demo" className="form-input" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Direct Helpline</label>
                    <input type="tel" defaultValue="+91 422 2489000" className="form-input" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Settlement Bank Account</label>
                    <input type="text" defaultValue="HDFC Bank · A/C Ending in 9948" className="form-input" />
                  </div>
                  <button onClick={() => notify('Business profile saved.')} className="btn btn-primary">
                    Update Business Profile
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ----------------------------------------------------
            ADMIN DASHBOARD PANELS
            ---------------------------------------------------- */}
        {role === 'admin' && (
          <div>
            {/* Metric Cards - shown on Overview page */}
            {adminTab === 'Overview' && (
              <div className="metrics-grid">
                <div className="metric-card">
                  <div className="metric-card-header">
                    <span className="metric-card-label">Registered Customers</span>
                    <div className="metric-card-icon bg-blue-50 text-blue-600">
                      <Users size={22} />
                    </div>
                  </div>
                  <div className="metric-card-val">1,428</div>
                  <span className="metric-card-sub text-blue-600">+12% this month</span>
                </div>

                <div className="metric-card">
                  <div className="metric-card-header">
                    <span className="metric-card-label">Verified Providers</span>
                    <div className="metric-card-icon bg-emerald-50 text-emerald-600">
                      <Building2 size={22} />
                    </div>
                  </div>
                  <div className="metric-card-val">58</div>
                  <span className="metric-card-sub text-emerald-600">Across 6 categories</span>
                </div>

                <div className="metric-card">
                  <div className="metric-card-header">
                    <span className="metric-card-label">Total Bookings</span>
                    <div className="metric-card-icon bg-purple-50 text-purple-600">
                      <CalendarCheck size={22} />
                    </div>
                  </div>
                  <div className="metric-card-val">684</div>
                  <span className="metric-card-sub text-purple-600">99.4% fulfillment rate</span>
                </div>

                <div className="metric-card">
                  <div className="metric-card-header">
                    <span className="metric-card-label">Platform GMV</span>
                    <div className="metric-card-icon bg-amber-50 text-amber-600">
                      <TrendingUp size={22} />
                    </div>
                  </div>
                  <div className="metric-card-val">₹14,82,900</div>
                  <span className="metric-card-sub text-amber-600">+18.4% growth</span>
                </div>
              </div>
            )}

            {/* Panel: Admin Overview with Activity Chart */}
            {adminTab === 'Overview' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Monthly Activity Bar Chart */}
                  <div className="dash-panel lg:col-span-2">
                    <div className="dash-panel-header">
                      <div>
                        <h3>Booking Activity & Trends (Past 12 Months)</h3>
                        <p>Simulated monthly booking volume across all platform categories.</p>
                      </div>
                      <span className="status-pill confirmed">+18.4% YoY</span>
                    </div>

                    <div className="h-44 flex items-end gap-2 sm:gap-3 pt-6 pb-2 px-1 sm:px-2 border-b border-slate-100 overflow-x-auto no-scrollbar">
                      {[42, 58, 47, 73, 61, 88, 68, 95, 74, 82, 66, 100].map((h, i) => (
                        <div key={i} className="flex-1 min-w-[18px] sm:min-w-[24px] flex flex-col items-center gap-2 h-full justify-end group">
                          <div 
                            style={{ height: `${h}%` }}
                            className="w-full max-w-[28px] bg-gradient-to-t from-blue-600 to-indigo-500 rounded-t-md transition-all group-hover:brightness-110"
                            title={`Month ${i + 1}: ${h * 7} bookings`}
                          />
                          <span className="text-[10px] sm:text-[11px] font-bold text-slate-400">
                            {['Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'][i]}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Revenue Quick Card */}
                  <div className="dash-panel">
                    <div className="dash-panel-header">
                      <div>
                        <h3>Commission Earnings</h3>
                        <p>10% platform share</p>
                      </div>
                    </div>

                    <div className="my-4">
                      <span className="text-xs font-bold text-slate-400 uppercase">Total Take-Rate</span>
                      <h2 className="text-3xl font-black text-slate-900 my-1">₹1,48,290</h2>
                      <span className="text-xs text-emerald-600 font-bold">100% collected automatically</span>
                    </div>

                    <div className="space-y-2 pt-4 border-t border-slate-100 text-xs text-slate-600">
                      <div className="flex justify-between">
                        <span>Customer Disputes</span>
                        <b className="text-emerald-600">0 Active</b>
                      </div>
                      <div className="flex justify-between">
                        <span>Provider Approvals</span>
                        <b className="text-blue-600">2 Pending</b>
                      </div>
                      <div className="flex justify-between">
                        <span>System Health</span>
                        <b className="text-emerald-600">99.98% Uptime</b>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Platform Live Bookings Feed */}
                <div className="dash-panel">
                  <div className="dash-panel-header">
                    <div>
                      <h3>Recent Platform-Wide Bookings</h3>
                      <p>Real-time booking transactions across all customer accounts.</p>
                    </div>
                    <button 
                      onClick={() => setAdminTab('Booking Management')}
                      className="btn btn-outline text-xs font-bold py-1.5 px-3"
                    >
                      View All
                    </button>
                  </div>

                  <div className="dash-table-wrap">
                    <table className="dash-table">
                      <thead>
                        <tr>
                          <th>Ref</th>
                          <th>Customer</th>
                          <th>Service</th>
                          <th>Date</th>
                          <th>Total</th>
                          <th>Status</th>
                          <th>Override</th>
                        </tr>
                      </thead>
                      <tbody>
                        {bookings.map((b) => (
                          <tr key={b.id}>
                            <td className="font-mono font-bold text-xs text-blue-600">{b.id}</td>
                            <td className="font-semibold text-slate-800">{b.customer}</td>
                            <td className="font-bold text-slate-900">{b.service}</td>
                            <td className="text-xs text-slate-500">{b.date}</td>
                            <td className="font-bold text-slate-900">{formatMoney(b.amount)}</td>
                            <td>
                              <span className={`status-pill ${b.status.toLowerCase()}`}>{b.status}</span>
                            </td>
                            <td>
                              <select 
                                value={b.status} 
                                onChange={(e) => {
                                  update(b.id, e.target.value);
                                  notify(`Booking ${b.id} status updated to ${e.target.value}`);
                                }}
                                className="text-xs p-1 border rounded bg-slate-50 font-semibold"
                              >
                                <option value="Confirmed">Confirmed</option>
                                <option value="Completed">Completed</option>
                                <option value="Cancelled">Cancelled</option>
                              </select>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* Panel: Manage Customers */}
            {adminTab === 'Manage Customers' && (
              <div className="dash-panel">
                <div className="dash-panel-header">
                  <div>
                    <h3>Registered Customers Directory</h3>
                    <p>Manage customer account statuses and booking access.</p>
                  </div>
                </div>

                <div className="dash-table-wrap">
                  <table className="dash-table">
                    <thead>
                      <tr>
                        <th>Customer Name</th>
                        <th>Email Address</th>
                        <th>Role</th>
                        <th>Account Status</th>
                        <th>Joined</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {adminUsers.map((u) => (
                        <tr key={u.id}>
                          <td className="font-bold text-slate-900">{u.name}</td>
                          <td className="text-slate-600 text-xs">{u.email}</td>
                          <td className="text-xs font-semibold">{u.role}</td>
                          <td>
                            <span className={`status-pill ${u.active ? 'confirmed' : 'cancelled'}`}>
                              {u.active ? 'Active' : 'Suspended'}
                            </span>
                          </td>
                          <td className="text-xs text-slate-400">{u.joined}</td>
                          <td>
                            <button 
                              onClick={() => {
                                setAdminUsers(adminUsers.map((x) => x.id === u.id ? { ...x, active: !x.active } : x));
                                notify(`${u.name} account ${u.active ? 'deactivated' : 'activated'}.`);
                              }}
                              className={`text-xs font-bold py-1 px-2.5 rounded border ${u.active ? 'text-rose-600 border-rose-200 bg-rose-50' : 'text-emerald-600 border-emerald-200 bg-emerald-50'}`}
                            >
                              {u.active ? 'Deactivate' : 'Activate'}
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Panel: Manage Providers */}
            {adminTab === 'Manage Providers' && (
              <div className="dash-panel">
                <div className="dash-panel-header">
                  <div>
                    <h3>Verified Merchant Partners & Providers</h3>
                    <p>Audit provider quality, active catalog listings, and certifications.</p>
                  </div>
                </div>

                <div className="dash-table-wrap">
                  <table className="dash-table">
                    <thead>
                      <tr>
                        <th>Business Entity</th>
                        <th>Primary Category</th>
                        <th>Active Listings</th>
                        <th>Rating</th>
                        <th>Verification Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {adminProviders.map((p) => (
                        <tr key={p.id}>
                          <td className="font-bold text-slate-900">{p.name}</td>
                          <td className="text-xs text-slate-600">{p.category}</td>
                          <td className="text-xs font-bold">{p.listings} services</td>
                          <td className="text-xs font-bold text-amber-600">⭐ {p.rating}</td>
                          <td>
                            <span className={`status-pill ${p.verified ? 'confirmed' : 'pending'}`}>
                              {p.verified ? 'Verified Partner' : 'Under Review'}
                            </span>
                          </td>
                          <td>
                            <button 
                              onClick={() => {
                                setAdminProviders(adminProviders.map((x) => x.id === p.id ? { ...x, verified: !x.verified } : x));
                                notify(`${p.name} verification status toggled.`);
                              }}
                              className="text-xs font-bold text-blue-600 hover:underline"
                            >
                              {p.verified ? 'Revoke Badge' : 'Verify Partner'}
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Panel: Manage Services */}
            {adminTab === 'Manage Services' && (
              <div className="dash-panel">
                <div className="dash-panel-header">
                  <div>
                    <h3>All Platform Service Listings ({services.length})</h3>
                    <p>Review and moderate listings across all categories.</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {services.map((s) => (
                    <div key={s.id} className="border border-slate-200 rounded-xl p-4 flex gap-4 bg-white">
                      <img src={s.image} alt={s.name} className="w-20 h-20 rounded-lg object-cover flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <span className="text-xs font-bold text-blue-600">{s.category}</span>
                        <h4 className="text-sm font-bold text-slate-900 truncate">{s.name}</h4>
                        <div className="text-xs text-slate-500 my-1">{s.provider}</div>
                        <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-100">
                          <b className="text-sm font-black text-slate-900">{formatMoney(s.price)}</b>
                          <span className="status-pill confirmed text-xs">Active Listing</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Panel: Manage Categories */}
            {adminTab === 'Manage Categories' && (
              <div className="dash-panel">
                <div className="dash-panel-header">
                  <div>
                    <h3>Service Categories & Accents</h3>
                    <p>The 9 core categories with dedicated brand color accents.</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {categories.map((c) => (
                    <div key={c.name} className="border border-slate-200 rounded-xl p-4 bg-slate-50 flex items-center justify-between">
                      <div>
                        <b className="text-sm font-bold text-slate-900 block">{c.name}</b>
                        <small className="text-xs text-slate-500">{c.sub}</small>
                      </div>
                      <span className={`status-pill ${c.accent}`}>
                        Accent: {c.accent}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Panel: Booking Management */}
            {adminTab === 'Booking Management' && (
              <div className="dash-panel">
                <div className="dash-panel-header">
                  <div>
                    <h3>Global Booking Management</h3>
                    <p>Comprehensive transaction log and master status overrides.</p>
                  </div>
                </div>

                <div className="dash-table-wrap">
                  <table className="dash-table">
                    <thead>
                      <tr>
                        <th>Booking Ref</th>
                        <th>Customer</th>
                        <th>Service</th>
                        <th>Schedule</th>
                        <th>Total Amount</th>
                        <th>Status</th>
                        <th>Override Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {bookings.map((b) => (
                        <tr key={b.id}>
                          <td className="font-mono font-bold text-xs text-blue-600">{b.id}</td>
                          <td className="font-semibold text-slate-900">{b.customer}</td>
                          <td className="font-bold">{b.service}</td>
                          <td className="text-xs text-slate-500">{b.date} · {b.time}</td>
                          <td className="font-bold">{formatMoney(b.amount)}</td>
                          <td>
                            <span className={`status-pill ${b.status.toLowerCase()}`}>{b.status}</span>
                          </td>
                          <td>
                            <select 
                              value={b.status} 
                              onChange={(e) => {
                                update(b.id, e.target.value);
                                notify(`Booking ${b.id} overridden to ${e.target.value}`);
                              }}
                              className="text-xs p-1.5 border rounded bg-white font-semibold"
                            >
                              <option value="Confirmed">Confirmed</option>
                              <option value="Completed">Completed</option>
                              <option value="Cancelled">Cancelled</option>
                            </select>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Panel: Revenue Statistics */}
            {adminTab === 'Revenue Statistics' && (
              <div className="dash-panel">
                <div className="dash-panel-header">
                  <div>
                    <h3>Platform Financial Metrics & GMV</h3>
                    <p>Detailed gross merchandise value and net commission earnings.</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                  <div className="border border-slate-200 p-4 rounded-xl bg-slate-50">
                    <span className="text-xs font-bold text-slate-400 uppercase block">Total GMV</span>
                    <b className="text-2xl font-black text-slate-900">₹14,82,900</b>
                    <small className="text-xs text-emerald-600 block mt-1">+18.4% growth</small>
                  </div>
                  <div className="border border-slate-200 p-4 rounded-xl bg-slate-50">
                    <span className="text-xs font-bold text-slate-400 uppercase block">Net Take-Rate (10%)</span>
                    <b className="text-2xl font-black text-blue-600">₹1,48,290</b>
                    <small className="text-xs text-blue-600 block mt-1">Platform gross profit</small>
                  </div>
                  <div className="border border-slate-200 p-4 rounded-xl bg-slate-50">
                    <span className="text-xs font-bold text-slate-400 uppercase block">Avg Order Value</span>
                    <b className="text-2xl font-black text-slate-900">₹2,168</b>
                    <small className="text-xs text-slate-500 block mt-1">Per transaction</small>
                  </div>
                  <div className="border border-slate-200 p-4 rounded-xl bg-slate-50">
                    <span className="text-xs font-bold text-slate-400 uppercase block">Refund Rate</span>
                    <b className="text-2xl font-black text-emerald-600">0.4%</b>
                    <small className="text-xs text-emerald-600 block mt-1">Industry-leading low</small>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </section>
    </main>
  );
};

export default Dashboard;
