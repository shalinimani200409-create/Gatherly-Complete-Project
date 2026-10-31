import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Compass, Send, CheckCircle2, Shield, Heart, 
  ShieldCheck, Lock, Globe, Instagram, Linkedin, Twitter, 
  ArrowRight, Sparkles 
} from 'lucide-react';

interface FooterProps {
  notify: (msg: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ notify }) => {
  const [email, setEmail] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && email.includes('@')) {
      notify('Thank you for subscribing to Gatherly newsletter!');
      setEmail('');
    }
  };

  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer-main">
          {/* Brand Col */}
          <div className="footer-col">
            <Link to="/" className="brand">
              <div className="brand-icon-wrap">
                <Compass size={20} />
              </div>
              <span className="text-white">Gatherly<span className="brand-dot">.</span></span>
            </Link>
            <p>
              Your premier all-in-one platform for booking curated luxury stays, scenic expeditions, artisan dining tables, and everyday wellness appointments.
            </p>
            <div className="footer-security-badge">
              <ShieldCheck size={16} className="text-blue-400 flex-shrink-0" />
              <span>Verified Hosts & Secure Demo Booking Guarantee</span>
            </div>

            {/* Social Links */}
            <div className="footer-social-links">
              <a 
                href="#twitter" 
                onClick={(e) => { e.preventDefault(); notify('Opening Gatherly Twitter / X channel'); }}
                className="footer-social-btn" 
                title="Follow on Twitter / X"
                aria-label="Twitter"
              >
                <Twitter size={16} />
              </a>
              <a 
                href="#instagram" 
                onClick={(e) => { e.preventDefault(); notify('Opening Gatherly Instagram'); }}
                className="footer-social-btn" 
                title="Follow on Instagram"
                aria-label="Instagram"
              >
                <Instagram size={16} />
              </a>
              <a 
                href="#linkedin" 
                onClick={(e) => { e.preventDefault(); notify('Opening Gatherly LinkedIn'); }}
                className="footer-social-btn" 
                title="Connect on LinkedIn"
                aria-label="LinkedIn"
              >
                <Linkedin size={16} />
              </a>
              <a 
                href="#global" 
                onClick={(e) => { e.preventDefault(); notify('Gatherly Global Network Coverage'); }}
                className="footer-social-btn" 
                title="Global Network"
                aria-label="Global Network"
              >
                <Globe size={16} />
              </a>
            </div>
          </div>

          {/* Explore Links */}
          <div className="footer-col">
            <span className="footer-heading">Discover</span>
            <Link to="/explore">All Experiences</Link>
            <Link to="/category/Hotels%20%26%20Stays">Hotels & Stays</Link>
            <Link to="/category/Travel%20%26%20Tours">Tours & Treks</Link>
            <Link to="/category/Dining%20%26%20Food">Dining & Tables</Link>
            <Link to="/category/Salon%20%26%20Spa">Salon & Wellness</Link>
            <Link to="/explore?budget=under-5000">Weekend Getaways</Link>
          </div>

          {/* Account & Dashboards */}
          <div className="footer-col">
            <span className="footer-heading">Dashboards</span>
            <Link to="/dashboard">Customer Portal</Link>
            <Link to="/dashboard">Provider Workspace</Link>
            <Link to="/dashboard">Admin Control Center</Link>
            <Link to="/bookings">My Active Bookings</Link>
            <Link to="/profile">Personal Profile</Link>
            <Link to="/signin">Switch Demo Role</Link>
          </div>

          {/* Company & Support */}
          <div className="footer-col">
            <span className="footer-heading">Support & Info</span>
            <a href="/#why">Why Choose Gatherly</a>
            <a href="/#destinations">Popular Hubs</a>
            <Link to="/settings">Notification Settings</Link>
            <a href="#terms" onClick={(e) => { e.preventDefault(); notify('Gatherly Demo Prototype Terms of Service'); }}>Terms of Service</a>
            <a href="#privacy" onClick={(e) => { e.preventDefault(); notify('Gatherly Demo Prototype Privacy Policy'); }}>Privacy Policy</a>
            <a href="#help" onClick={(e) => { e.preventDefault(); notify('24/7 Priority Concierge: concierge@gatherly.demo'); }}>Help & Support</a>
          </div>

          {/* Newsletter Subscribe */}
          <div className="footer-col footer-newsletter">
            <span className="footer-heading">Stay Inspired</span>
            <p>
              Get secret weekend deals, seasonal getaway discounts and newly audited service announcements.
            </p>
            <div className="footer-newsletter-box">
              <form onSubmit={handleSubscribe} className="w-full">
                <input 
                  type="email" 
                  placeholder="Enter your email address..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <button type="submit" className="btn btn-primary w-full py-2.5 text-sm flex items-center justify-center gap-2">
                  <Send size={15} />
                  <span>Subscribe to Newsletter</span>
                </button>
              </form>
              <div className="flex items-center gap-1.5 text-[11px] text-slate-400 mt-2.5">
                <Lock size={12} className="text-blue-400 flex-shrink-0" />
                <span>Zero spam. Unsubscribe with 1-click anytime.</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="footer-bottom">
          <div className="flex items-center gap-2 flex-wrap">
            <span>© 2026 Gatherly Platform Inc. All rights reserved.</span>
            <span className="hidden sm:inline">·</span>
            <span className="hidden sm:inline flex items-center gap-1 text-slate-400">
              Crafted with <Heart size={13} className="text-red-500 fill-current inline" /> for seamless bookings
            </span>
          </div>
          <div className="flex items-center gap-4 text-xs text-slate-400 flex-wrap">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
              <CheckCircle2 size={13} className="text-emerald-400" />
              <span>Verified Demo Prototype Environment</span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
