import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { 
  Menu, X, CalendarCheck, LayoutDashboard, Compass, 
  UserCheck, Briefcase, ShieldCheck 
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

  const handleRoleChange = (newRole: string) => {
    setRole(newRole);
    notify(`Switched to ${newRole.charAt(0).toUpperCase() + newRole.slice(1)} demo profile`);
  };

  const getDashboardLabel = () => {
    if (role === 'provider') return 'Provider Dashboard';
    if (role === 'admin') return 'Admin Dashboard';
    return 'Customer Dashboard';
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
    <header className="header">
      <div className="wrap nav">
        {/* Left Section: Brand Logo + Desktop Nav Links */}
        <div className="nav-left">
          {/* Brand Logo */}
          <Link to="/" className="brand">
            <div className="brand-icon-wrap">
              <Compass size={20} />
            </div>
            <span>Gatherly<span className="brand-dot">.</span></span>
          </Link>

          {/* Clean Desktop Navigation Links (Spaced away from logo) */}
          <nav className="nav-links">
            <NavLink to="/" end>Home</NavLink>
            <NavLink to="/explore">Explore</NavLink>
            <a href="/#categories">Categories</a>
            <a href="/#destinations">Destinations</a>
            <a href="/#why">Why Us</a>
          </nav>
        </div>

        {/* Right Section: My Bookings, Role Selector, Dashboard Button, Avatar */}
        <div className="nav-actions">
          {/* My Bookings link */}
          <Link to="/bookings" className="nav-bookings-btn" title="View my bookings">
            <CalendarCheck size={16} />
            <span>My Bookings</span>
            {bookingsCount > 0 && <span className="badge-count">{bookingsCount}</span>}
          </Link>

          {/* Role Selector Pill */}
          <div className="role-selector-wrap" title="Switch Demo Role">
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

          {/* Dedicated Dashboard Button */}
          <button 
            onClick={() => navigate('/dashboard')} 
            className="btn-dashboard-nav"
            title={`Open ${getDashboardLabel()}`}
            id="nav-dashboard-button"
          >
            <LayoutDashboard size={15} className="dash-icon" />
            <span>{getDashboardLabel()}</span>
          </button>

          {/* Avatar Profile */}
          <Link 
            to="/profile" 
            className="nav-avatar" 
            title={`View profile (${role.toUpperCase()})`}
          >
            {getAvatarInitials()}
          </Link>

          {/* Mobile Menu Hamburger */}
          <button 
            className="mobile-menu-btn" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-6 py-5 shadow-xl transition-all">
          <nav className="flex flex-col gap-3 font-semibold text-slate-700 text-sm mb-5">
            <NavLink 
              to="/" 
              end 
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 hover:text-blue-600 border-b border-slate-100"
            >
              Home
            </NavLink>
            <NavLink 
              to="/explore" 
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 hover:text-blue-600 border-b border-slate-100"
            >
              Explore All Services
            </NavLink>
            <Link 
              to="/bookings" 
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 hover:text-blue-600 border-b border-slate-100 flex items-center justify-between"
            >
              <span>My Bookings</span>
              {bookingsCount > 0 && <span className="badge-count">{bookingsCount}</span>}
            </Link>
            <a 
              href="/#categories" 
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 hover:text-blue-600 border-b border-slate-100"
            >
              Browse Categories
            </a>
            <a 
              href="/#destinations" 
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 hover:text-blue-600 border-b border-slate-100"
            >
              Popular Destinations
            </a>
            <a 
              href="/#why" 
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 hover:text-blue-600 border-b border-slate-100"
            >
              Why Choose Us
            </a>
          </nav>

          <div className="pt-2 flex flex-col gap-3">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-400">Switch Demo Workspace</div>
            <div className="grid grid-cols-3 gap-2">
              <button 
                onClick={() => { handleRoleChange('customer'); setMobileMenuOpen(false); }}
                className={`py-2 px-3 text-xs font-bold rounded-lg border text-center transition ${role === 'customer' ? 'bg-blue-600 text-white border-blue-600' : 'bg-slate-50 text-slate-700 border-slate-200'}`}
              >
                Customer
              </button>
              <button 
                onClick={() => { handleRoleChange('provider'); setMobileMenuOpen(false); }}
                className={`py-2 px-3 text-xs font-bold rounded-lg border text-center transition ${role === 'provider' ? 'bg-blue-600 text-white border-blue-600' : 'bg-slate-50 text-slate-700 border-slate-200'}`}
              >
                Provider
              </button>
              <button 
                onClick={() => { handleRoleChange('admin'); setMobileMenuOpen(false); }}
                className={`py-2 px-3 text-xs font-bold rounded-lg border text-center transition ${role === 'admin' ? 'bg-blue-600 text-white border-blue-600' : 'bg-slate-50 text-slate-700 border-slate-200'}`}
              >
                Admin
              </button>
            </div>

            <button 
              onClick={() => { navigate('/dashboard'); setMobileMenuOpen(false); }}
              className="mt-3 w-full btn-dashboard-nav flex items-center justify-center py-2.5"
            >
              <LayoutDashboard size={16} />
              <span>Open {getDashboardLabel()}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
