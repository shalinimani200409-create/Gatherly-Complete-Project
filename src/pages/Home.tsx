import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Search, MapPin, CalendarDays, Wallet, ArrowRight, ShieldCheck, 
  CheckCircle2, Heart, Star, Sparkles, BedDouble, Compass, Utensils, 
  Activity, CarFront, PartyPopper, Tag, ArrowUpRight, Award, Clock,
  Check, Building2, Users, Info, Quote, BadgeCheck
} from 'lucide-react';
import { 
  categories, services, destinations, specialOffers, 
  testimonials, trustStats, whyChoosePoints 
} from '../data';
import { ServiceCard } from '../components/ServiceCard';
import { DestinationCard } from '../components/DestinationCard';
import { BackButton } from '../components/BackButton';

interface HomeProps {
  wishlist: number[];
  toggleWishlist: (id: number) => void;
  notify: (msg: string) => void;
}

export const Home: React.FC<HomeProps> = ({ wishlist, toggleWishlist, notify }) => {
  const navigate = useNavigate();

  // Search Panel State
  const [activeCategoryPill, setActiveCategoryPill] = useState('All');
  const [searchLocation, setSearchLocation] = useState('');
  const [searchCategory, setSearchCategory] = useState('All categories');
  const [searchDate, setSearchDate] = useState('2026-11-15');
  const [searchBudget, setSearchBudget] = useState('Any Budget');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchLocation) params.set('location', searchLocation);
    if (searchCategory !== 'All categories') params.set('category', searchCategory);
    if (searchBudget !== 'Any Budget') params.set('budget', searchBudget);
    navigate(`/explore?${params.toString()}`);
  };

  const handleCategoryPillClick = (catName: string) => {
    setActiveCategoryPill(catName);
    setSearchCategory(catName === 'All' ? 'All categories' : catName);
  };

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'BedDouble': return <BedDouble size={22} />;
      case 'Compass': return <Compass size={22} />;
      case 'Utensils': return <Utensils size={22} />;
      case 'Activity': return <Activity size={22} />;
      case 'CarFront': return <CarFront size={22} />;
      case 'PartyPopper': return <PartyPopper size={22} />;
      case 'Sparkles': return <Sparkles size={22} />;
      case 'Heart': return <Heart size={22} />;
      default: return <ShieldCheck size={22} />;
    }
  };

  const getAccentClass = (accent: string) => {
    switch (accent) {
      case 'blue': return 'accent-blue';
      case 'green': return 'accent-green';
      case 'yellow': return 'accent-yellow';
      case 'orange': return 'accent-orange';
      case 'red': return 'accent-red';
      case 'pink': return 'accent-pink';
      case 'purple': return 'accent-purple';
      case 'maroon': return 'accent-maroon';
      default: return 'accent-gray';
    }
  };

  return (
    <>
      {/* 1. HERO BANNER (Travivu Style, Proportioned & Aligned) */}
      <section className="hero">
        <div className="hero-image-bg" />
        <div className="wrap hero-content">
          {window.history?.length > 1 && (
            <div className="mb-4">
              <BackButton variant="hero" label="Back to Previous Page" />
            </div>
          )}
          <motion.div 
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="hero-copy"
          >
            <span className="eyebrow light">
              <Sparkles size={14} className="text-amber-400" />
              BEGINNING OF YOUR JOURNEY
            </span>
            <h1>
              Book Better Stays,<br />
              <em>Extraordinary Experiences.</em>
            </h1>
            <p>
              Discover handpicked luxury hotels, coastal villas, curated adventures, fine dining, and verified lifestyle services — all in one unified platform.
            </p>
          </motion.div>

          {/* Quick Floating Category Pills (Above search bar for balanced alignment) */}
          <div className="hero-quick-tabs">
            {['All', 'Hotels & Stays', 'Travel & Tours', 'Dining & Food', 'Activities & Sports', 'Events & Venues'].map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => handleCategoryPillClick(tab)}
                className={`hero-quick-tab ${activeCategoryPill === tab ? 'active' : ''}`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Clean Unified Travivu Search & Booking Card */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="search-panel-container"
          >
            <form onSubmit={handleSearchSubmit} className="search-fields-grid">
              {/* Field 1: Location */}
              <div className="search-field-item">
                <MapPin className="search-field-icon" size={20} />
                <div className="search-field-content">
                  <label htmlFor="hero-loc" className="search-field-label">Location</label>
                  <input 
                    id="hero-loc"
                    type="text"
                    placeholder="Where to? (City)"
                    value={searchLocation}
                    onChange={(e) => setSearchLocation(e.target.value)}
                    className="search-field-input"
                  />
                </div>
              </div>

              {/* Field 2: Category / Trip Type */}
              <div className="search-field-item">
                <Compass className="search-field-icon" size={20} />
                <div className="search-field-content">
                  <label htmlFor="hero-cat" className="search-field-label">Service Type</label>
                  <select 
                    id="hero-cat"
                    value={searchCategory}
                    onChange={(e) => {
                      setSearchCategory(e.target.value);
                      setActiveCategoryPill(e.target.value === 'All categories' ? 'All' : e.target.value);
                    }}
                    className="search-field-select"
                  >
                    <option value="All categories">Any Category</option>
                    {categories.map((c) => (
                      <option key={c.name} value={c.name}>{c.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Field 3: Date */}
              <div className="search-field-item">
                <CalendarDays className="search-field-icon" size={20} />
                <div className="search-field-content">
                  <label htmlFor="hero-date" className="search-field-label">Preferred Date</label>
                  <input 
                    id="hero-date"
                    type="date"
                    value={searchDate}
                    onChange={(e) => setSearchDate(e.target.value)}
                    className="search-field-input"
                  />
                </div>
              </div>

              {/* Field 4: Budget */}
              <div className="search-field-item">
                <Wallet className="search-field-icon" size={20} />
                <div className="search-field-content">
                  <label htmlFor="hero-budget" className="search-field-label">Price Range</label>
                  <select 
                    id="hero-budget"
                    value={searchBudget}
                    onChange={(e) => setSearchBudget(e.target.value)}
                    className="search-field-select"
                  >
                    <option value="Any Budget">Any Budget</option>
                    <option value="Under ₹2,000">Under ₹2,000</option>
                    <option value="₹2,000 - ₹5,000">₹2,000 - ₹5,000</option>
                    <option value="₹5,000 - ₹15,000">₹5,000 - ₹15,000</option>
                    <option value="Luxury / ₹15,000+">Luxury / ₹15,000+</option>
                  </select>
                </div>
              </div>

              {/* Search Submit CTA (Travivu Orange) */}
              <button type="submit" className="btn-search-submit" id="hero-search-submit">
                <Search size={18} />
                <span>Search</span>
              </button>
            </form>
          </motion.div>

          {/* Hero Trust Badges Underneath */}
          <div className="hero-trust-bar">
            <div className="hero-trust-item">
              <ShieldCheck size={16} />
              <span>Best Price Guarantee</span>
            </div>
            <div className="hero-trust-item">
              <Clock size={16} />
              <span>24/7 Concierge Support</span>
            </div>
            <div className="hero-trust-item">
              <CheckCircle2 size={16} />
              <span>15,000+ Verified Bookings</span>
            </div>
            <div className="hero-trust-item">
              <Star size={16} className="text-amber-400 fill-amber-400" />
              <span>4.9 / 5.0 Top Rated</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. TOP DESTINATIONS SECTION (Travivu Style Reference) */}
      <section className="section" id="destinations">
        <div className="wrap">
          <div className="section-head">
            <div>
              <span className="eyebrow">TOP DESTINATIONS</span>
              <h2>Popular Destinations & Getaways</h2>
              <p>Explore world-class destinations and scenic weekend hubs favored by our travelers.</p>
            </div>
            <Link to="/explore" className="text-link">
              <span>View all destinations</span>
              <ArrowRight size={16} />
            </Link>
          </div>

          <div className="destinations-grid">
            {destinations.map((dest) => (
              <DestinationCard 
                key={dest.id} 
                dest={dest} 
                isFav={wishlist.includes(dest.id)}
                onToggleFav={toggleWishlist}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 3. CATEGORIES SECTION (9-Color Accents) */}
      <section className="section tinted" id="categories">
        <div className="wrap">
          <div className="section-head">
            <div>
              <span className="eyebrow">EXPLORE BY CATEGORY</span>
              <h2>Everything You Need, <em>All In One Spot.</em></h2>
              <p>Find vetted stays, thrilling excursions, culinary experiences, or everyday appointments.</p>
            </div>
            <Link to="/explore" className="text-link">
              <span>View catalog</span>
              <ArrowRight size={16} />
            </Link>
          </div>

          <div className="category-grid">
            {categories.map((c) => (
              <Link 
                to={`/category/${encodeURIComponent(c.name)}`} 
                key={c.name}
                className="category-card"
              >
                <div className={`category-icon-box ${getAccentClass(c.accent)}`}>
                  {getCategoryIcon(c.icon)}
                </div>
                <div className="category-card-content">
                  <b>{c.name}</b>
                  <small>{c.sub}</small>
                  <span className="category-count-badge">{c.count}+ listings</span>
                </div>
                <ArrowUpRight className="cat-arrow" size={18} />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 4. FEATURED SERVICES & STAYS (Travelo TNC Style Reference) */}
      <section className="section">
        <div className="wrap">
          <div className="section-head">
            <div>
              <span className="eyebrow">HANDPICKED EXPERIENCES</span>
              <h2>Featured Services & Stays</h2>
              <p>Top-rated accommodations, journeys, and appointments curated for high satisfaction.</p>
            </div>
            <Link to="/explore" className="text-link">
              <span>Explore all services</span>
              <ArrowRight size={16} />
            </Link>
          </div>

          <div className="service-grid">
            {services.slice(0, 6).map((s) => (
              <ServiceCard 
                key={s.id} 
                s={s} 
                isFav={wishlist.includes(s.id)}
                onToggleFav={toggleWishlist}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 5. SPECIAL OFFERS & SEASONAL DEALS */}
      <section className="section tinted" id="offers">
        <div className="wrap">
          <div className="section-head">
            <div>
              <span className="eyebrow">EXCLUSIVE PROMOTIONS</span>
              <h2>Special Deals & Voucher Codes</h2>
              <p>Take advantage of limited-time seasonal savings across partner listings.</p>
            </div>
          </div>

          <div className="offers-grid">
            {specialOffers.map((offer, idx) => (
              <div key={offer.id} className={`offer-card ${idx === 0 ? 'offer-card-1' : 'offer-card-2'}`}>
                <div>
                  <span className="offer-badge">{offer.badge}</span>
                  <h3>{offer.title}</h3>
                  <p>{offer.subtitle}</p>
                </div>
                <div className="offer-action-bar">
                  <div className="offer-code-pill">
                    <Tag size={15} className="text-orange-500" />
                    <span>USE CODE: {offer.code}</span>
                  </div>
                  <button 
                    onClick={() => {
                      navigator.clipboard?.writeText?.(offer.code);
                      notify(`Coupon code ${offer.code} copied to clipboard!`);
                    }}
                    className="bg-white/20 hover:bg-white/30 text-white font-bold text-xs px-3.5 py-1.5 rounded-lg transition"
                  >
                    Copy Code
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. WHY CHOOSE GATHERLY ("Travel Services You Can Trust") */}
      <section className="section-why" id="why">
        <div className="wrap">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="eyebrow justify-center mb-3">
              <ShieldCheck size={16} className="text-blue-600" />
              <span>WHY TRAVELERS CHOOSE GATHERLY</span>
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold text-slate-900 tracking-tight leading-tight mb-4">
              Booking Services Crafted for <span className="text-blue-600">Absolute Peace of Mind</span>
            </h2>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
              We combine strict merchant auditing, transparent upfront pricing, and dedicated round-the-clock concierge support across India and beyond.
            </p>
          </div>

          <div className="why-grid">
            {whyChoosePoints.map((point) => (
              <div key={point.title} className="why-card">
                <div>
                  <div className={`why-card-icon ${getAccentClass(point.accent)}`}>
                    {point.icon === 'ShieldCheck' && <ShieldCheck size={28} />}
                    {point.icon === 'Wallet' && <Wallet size={28} />}
                    {point.icon === 'CalendarCheck' && <CalendarDays size={28} />}
                    {point.icon === 'Sparkles' && <Sparkles size={28} />}
                  </div>
                  <h3>{point.title}</h3>
                  <p>{point.desc}</p>
                </div>
                <div className="why-card-tag">
                  <Check size={14} className="text-blue-600" />
                  <span>
                    {point.icon === 'ShieldCheck' && '100% Audited Quality'}
                    {point.icon === 'Wallet' && 'Zero Hidden Charges'}
                    {point.icon === 'CalendarCheck' && 'Real-time Slot Sync'}
                    {point.icon === 'Sparkles' && '24/7 Priority Support'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. LIVE STATISTICS & TRUST BAND (CLEARLY IDENTIFIED DEMO DATA) */}
      <section className="trust-stats-band">
        <div className="wrap relative z-10">
          <div className="trust-stats-header">
            <div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase bg-blue-500/20 text-blue-300 border border-blue-400/30 mb-2">
                <Info size={13} />
                <span>PLATFORM SCALE & RELIABILITY</span>
              </span>
              <h2>Performance & Growth Benchmarks</h2>
            </div>
            
            {/* Clear Demo Content Identifier Pill */}
            <div className="demo-identifier-pill" title="These statistics represent simulated demo benchmarks for prototyping">
              <span className="demo-pulse-dot" />
              <span>DEMO BENCHMARK DATA · LIVE TELEMETRY IN PREVIEW</span>
            </div>
          </div>

          <div className="trust-stats-grid">
            {trustStats.map((stat, idx) => {
              const getStatIcon = (i: number) => {
                if (i === 0) return <Users size={22} />;
                if (i === 1) return <Building2 size={22} />;
                if (i === 2) return <CheckCircle2 size={22} />;
                return <Star size={22} />;
              };

              return (
                <div key={stat.label} className="trust-stat-box">
                  <div className="flex items-center justify-between">
                    <div className="trust-stat-box-icon">
                      {getStatIcon(idx)}
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 bg-white/5 px-2 py-0.5 rounded border border-white/10">
                      Demo Metric
                    </span>
                  </div>
                  <div className="trust-stat-number">{stat.value}</div>
                  <div className="trust-stat-label">{stat.label}</div>
                  <div className="trust-stat-sub">
                    <span className="change-pill">{stat.change}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 8. CUSTOMER TESTIMONIALS (CLEARLY IDENTIFIED DEMO REVIEWS) */}
      <section className="testimonials-section">
        <div className="wrap">
          <div className="testimonials-head">
            <span className="eyebrow justify-center mb-3">
              <Star size={15} className="text-amber-500 fill-amber-500" />
              <span>TESTIMONIALS SHOWCASE</span>
            </span>
            <h2>Loved by Travelers, Families & Organizers</h2>
            <p>
              Explore authentic feedback shared by verified guests during our prototype community trial.
            </p>
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 bg-white px-3.5 py-1.5 rounded-full border border-slate-200 mt-4 shadow-sm">
              <Info size={14} className="text-blue-600" />
              <span>Sample Demo Reviews · Production Customer Feedback Connecting Soon</span>
            </div>
          </div>

          <div className="testimonials-grid">
            {testimonials.map((t) => (
              <div key={t.id} className="testimonial-card">
                <div>
                  <div className="testimonial-top-row">
                    <div className="testimonial-stars">
                      {[...Array(t.rating)].map((_, i) => (
                        <Star key={i} size={16} className="fill-current text-amber-500" />
                      ))}
                    </div>
                    <span className="testimonial-verified-badge">
                      <BadgeCheck size={13} className="text-emerald-600" />
                      <span>Verified Demo Guest</span>
                    </span>
                  </div>
                  <p className="testimonial-comment">
                    "{t.comment}"
                  </p>
                </div>

                <div className="testimonial-author">
                  <img src={t.avatar} alt={t.name} className="testimonial-avatar" />
                  <div className="testimonial-info">
                    <b>{t.name}</b>
                    <small>{t.role}</small>
                    <span className="testimonial-service-tag">
                      Booked: {t.serviceBooked}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. CALL TO ACTION BANNER (PROFESSIONAL BLUE THEME) */}
      <section className="wrap cta-banner-wrap">
        <div className="cta-banner">
          <div className="cta-banner-content">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold tracking-wider uppercase bg-white/15 text-white border border-white/25 mb-4 backdrop-blur-md">
              <Sparkles size={13} className="text-amber-300" />
              <span>START EXPLORING TODAY</span>
            </span>
            <h2>Ready to Plan Your Next Extraordinary Journey?</h2>
            <p>
              Instantly discover and reserve handpicked boutique stays, certified trekking journeys, table reservations, and verified lifestyle appointments — with guaranteed instant demo confirmation vouchers.
            </p>
            <div className="cta-trust-tags">
              <span className="cta-trust-tag">
                <Check size={15} className="text-emerald-300" />
                <span>Instant Demo Confirmations</span>
              </span>
              <span className="cta-trust-tag">
                <Check size={15} className="text-emerald-300" />
                <span>Zero Credit Card Required</span>
              </span>
              <span className="cta-trust-tag">
                <Check size={15} className="text-emerald-300" />
                <span>24/7 Concierge Support Simulation</span>
              </span>
            </div>
          </div>

          <div className="cta-banner-actions">
            <Link to="/explore" className="btn-cta-primary">
              <Search size={18} />
              <span>Browse All Services</span>
              <ArrowRight size={17} />
            </Link>
            <Link to="/dashboard" className="btn-cta-secondary">
              <Award size={18} />
              <span>Partner & Admin Workspace</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};
