import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { 
  Menu, X, CalendarCheck, LayoutDashboard, Compass, 
  UserCheck, Briefcase, ShieldCheck, User, Settings, ArrowRight,
  LogOut, Sparkles
} from 'lucide-react';

interface HeaderProps {
  role: string;
  setRole: (r: string) => void;
  bookingsCount: number;
  notify: (msg: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ role, setRole, bookingsCount, notify }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const handleRoleChange = (newRole: string) => {
    setRole(newRole);
    notify(`Switched to ${newRole.charAt(0).toUpperCase() + newRole.slice(1)} demo profile`);
  };

  const getDashboardLabel = () => {
    if (role === 'provider') return 'Provider Dashboard';
    if (role === 'admin') return 'Admin Dashboard';
    return 'Customer Dashboard';
  };

  const getRoleDisplayName = () => {
    if (role === 'provider') return 'Fern Hospitality Group';
    if (role === 'admin') return 'Platform Administrator';
    return 'Aarav Kumar';
  };

  const getAvatarInitials = () => {
    if (role === 'provider') return 'FP';
    if (role === 'admin') return 'AD';
    return 'AK';
  };

  const getRoleIcon = () => {
    if (role === 'provider') return <Briefcase size={15} />;
    if (role === 'admin') return <ShieldCheck size={15} />;
    return <UserCheck size={15} />;
  };

  return (
    <>
      <header className="header">
        <div className="wrap nav">
          {/* Left Section: Brand Logo + Desktop Navigation Links */}
          <div className="nav-left">
            <Link to="/" className="brand" aria-label="Gatherly Home">
              <div className="brand-icon-wrap">
                <Compass size={20} />
              </div>
              <span className="font-extrabold tracking-tight">
                Gatherly<span className="brand-dot">.</span>
              </span>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="nav-links">
              <NavLink to="/" end>Home</NavLink>
              <NavLink to="/explore">Explore</NavLink>
              <a href="/#categories">Categories</a>
              <a href="/#destinations">Destinations</a>
              <a href="/#why">Why Us</a>
            </nav>
          </div>

          {/* Right Section: Actions */}
          <div className="nav-actions">
            {/* My Bookings Pill */}
            <Link 
              to="/bookings" 
              className="nav-bookings-btn" 
              title="View my bookings"
              aria-label={`My Bookings (${bookingsCount} active)`}
            >
              <CalendarCheck size={16} className="text-blue-600 flex-shrink-0" />
              <span className="hidden sm:inline">My Bookings</span>
              {bookingsCount > 0 && <span className="badge-count">{bookingsCount}</span>}
            </Link>

            {/* Role Selector Dropdown (Hidden on screens under 768px to prevent header crunch) */}
            <div className="role-selector-wrap hidden md:flex" title="Switch Demo Role">
              {getRoleIcon()}
              <select 
                value={role} 
                onChange={(e) => handleRoleChange(e.target.value)}
                aria-label="Switch Demo Role"
              >
                <option value="customer">Customer demo</option>
                <option value="provider">Provider demo</option>
                <option value="admin">Admin demo</option>
              </select>
            </div>

            {/* Dashboard Navigation Button (Desktop/Tablet) */}
            <button 
              onClick={() => navigate('/dashboard')} 
              className="btn-dashboard-nav hidden md:inline-flex"
              title={`Open ${getDashboardLabel()}`}
              id="nav-dashboard-button"
            >
              <LayoutDashboard size={15} className="dash-icon flex-shrink-0" />
              <span className="hidden lg:inline">{getDashboardLabel()}</span>
              <span className="lg:hidden">Dashboard</span>
            </button>

            {/* Profile Avatar */}
            <Link 
              to="/profile" 
              className="nav-avatar" 
              title={`View Profile (${role.toUpperCase()})`}
              aria-label="Account Profile"
            >
              {getAvatarInitials()}
            </Link>

            {/* Mobile Hamburger Toggle Button */}
            <button 
              className="mobile-menu-btn" 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <>
            <div 
              className="fixed inset-0 top-[64px] sm:top-[74px] bg-slate-900/40 backdrop-blur-xs z-40 transition-opacity" 
              onClick={() => setMobileMenuOpen(false)}
              aria-hidden="true"
            />
            <div className="absolute top-full left-0 right-0 bg-white border-b border-slate-200 px-5 py-6 shadow-2xl z-50 max-h-[85vh] overflow-y-auto">
              {/* User Workspace Info Card */}
              <div className="flex items-center gap-3 p-3.5 bg-blue-50/70 border border-blue-200/80 rounded-2xl mb-5">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-600 to-indigo-700 text-white font-extrabold flex items-center justify-center text-sm shadow-sm flex-shrink-0">
                  {getAvatarInitials()}
                </div>
                <div className="min-w-0 flex-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-blue-700 block">
                    {role.toUpperCase()} WORKSPACE
                  </span>
                  <b className="text-sm text-slate-900 font-extrabold block truncate">
                    {getRoleDisplayName()}
                  </b>
                </div>
                <Link
                  to="/profile"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-xs font-bold text-blue-700 hover:text-blue-900 bg-white px-2.5 py-1.5 rounded-lg border border-blue-200 shadow-2xs"
                >
                  Edit Profile
                </Link>
              </div>

              {/* Segmented Workspace Role Switcher */}
              <div className="mb-5">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2.5 flex items-center gap-1.5">
                  <Sparkles size={14} className="text-amber-500" />
                  <span>Switch Demo Profile</span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <button 
                    onClick={() => handleRoleChange('customer')}
                    className={`py-2 px-2 text-xs font-bold rounded-xl border text-center transition flex flex-col items-center gap-1 ${role === 'customer' ? 'bg-blue-600 text-white border-blue-600 shadow-sm' : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'}`}
                  >
                    <UserCheck size={16} />
                    <span>Customer</span>
                  </button>
                  <button 
                    onClick={() => handleRoleChange('provider')}
                    className={`py-2 px-2 text-xs font-bold rounded-xl border text-center transition flex flex-col items-center gap-1 ${role === 'provider' ? 'bg-blue-600 text-white border-blue-600 shadow-sm' : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'}`}
                  >
                    <Briefcase size={16} />
                    <span>Provider</span>
                  </button>
                  <button 
                    onClick={() => handleRoleChange('admin')}
                    className={`py-2 px-2 text-xs font-bold rounded-xl border text-center transition flex flex-col items-center gap-1 ${role === 'admin' ? 'bg-blue-600 text-white border-blue-600 shadow-sm' : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'}`}
                  >
                    <ShieldCheck size={16} />
                    <span>Admin</span>
                  </button>
                </div>
              </div>

              {/* Dashboard Shortcut Action */}
              <button 
                onClick={() => { navigate('/dashboard'); setMobileMenuOpen(false); }}
                className="w-full btn-dashboard-nav flex items-center justify-center py-3 rounded-xl mb-5 text-sm"
              >
                <LayoutDashboard size={17} />
                <span>Open {getDashboardLabel()}</span>
              </button>

              {/* Mobile Navigation Link List */}
              <nav className="flex flex-col gap-1 font-semibold text-slate-700 text-sm border-t border-slate-100 pt-3">
                <NavLink 
                  to="/" 
                  end 
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2.5 px-3 rounded-lg hover:bg-slate-50 hover:text-blue-600 transition flex items-center justify-between"
                >
                  <span>Home</span>
                  <ArrowRight size={14} className="text-slate-400" />
                </NavLink>
                <NavLink 
                  to="/explore" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2.5 px-3 rounded-lg hover:bg-slate-50 hover:text-blue-600 transition flex items-center justify-between"
                >
                  <span>Explore All Services</span>
                  <ArrowRight size={14} className="text-slate-400" />
                </NavLink>
                <Link 
                  to="/bookings" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2.5 px-3 rounded-lg hover:bg-slate-50 hover:text-blue-600 transition flex items-center justify-between"
                >
                  <span>My Active Bookings</span>
                  {bookingsCount > 0 && <span className="badge-count">{bookingsCount}</span>}
                </Link>
                <a 
                  href="/#categories" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2.5 px-3 rounded-lg hover:bg-slate-50 hover:text-blue-600 transition flex items-center justify-between"
                >
                  <span>Browse Categories</span>
                  <ArrowRight size={14} className="text-slate-400" />
                </a>
                <a 
                  href="/#destinations" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2.5 px-3 rounded-lg hover:bg-slate-50 hover:text-blue-600 transition flex items-center justify-between"
                >
                  <span>Popular Destinations</span>
                  <ArrowRight size={14} className="text-slate-400" />
                </a>
                <a 
                  href="/#why" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2.5 px-3 rounded-lg hover:bg-slate-50 hover:text-blue-600 transition flex items-center justify-between"
                >
                  <span>Why Choose Us</span>
                  <ArrowRight size={14} className="text-slate-400" />
                </a>
                <NavLink 
                  to="/settings" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2.5 px-3 rounded-lg hover:bg-slate-50 hover:text-blue-600 transition flex items-center justify-between"
                >
                  <span>Preferences & Settings</span>
                  <ArrowRight size={14} className="text-slate-400" />
                </NavLink>
              </nav>
            </div>
          </>
        )}
      </header>
    </>
  );
};

export default Header;
