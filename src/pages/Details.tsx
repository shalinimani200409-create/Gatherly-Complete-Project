import React from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { 
  MapPin, Star, Check, ShieldCheck, ArrowRight, 
  Building2, ArrowLeft, Clock, CalendarDays, Award
} from 'lucide-react';
import { services, handleImageError } from '../data';
import { ServiceCard } from '../components/ServiceCard';
import { BackButton } from '../components/BackButton';

interface DetailsProps {
  wishlist: number[];
  toggleWishlist: (id: number) => void;
}

export const Details: React.FC<DetailsProps> = ({ wishlist, toggleWishlist }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const service = services.find((x) => x.id === Number(id)) || services[0];
  const related = services.filter((x) => 
    (x.subcategory === service.subcategory || x.section === service.section || x.category === service.category) && 
    x.id !== service.id
  ).slice(0, 3);
  const fallbackRelated = related.length > 0 ? related : services.filter((x) => x.id !== service.id).slice(0, 3);

  const formatMoney = (n: number) => '₹' + n.toLocaleString('en-IN');

  return (
    <main className="page wrap">
      {/* Breadcrumb Navigation & Back Button */}
      <div className="flex items-center gap-3 mb-5 flex-wrap">
        <BackButton fallbackTo="/explore" label="Back" />
        <div className="breadcrumb !mb-0">
          <Link to="/">Home</Link>
          <span>/</span>
          <Link to="/explore">Explore</Link>
          {service.mainCategoryName && (
            <>
              <span>/</span>
              <Link to={`/category/${service.mainCategory || 'travel'}`}>{service.mainCategoryName}</Link>
            </>
          )}
          <span>/</span>
          <Link to={`/explore?subcategory=${encodeURIComponent(service.subcategory || service.category)}`}>
            {service.subcategory || service.category}
          </Link>
          <span>/</span>
          <span className="text-slate-900 font-bold">{service.name}</span>
        </div>
      </div>

      {/* Top Header */}
      <div className="detail-top">
        <div>
          <span className="eyebrow">
            {(service.subcategory || service.category).toUpperCase()} {service.sectionName ? `· ${service.sectionName.toUpperCase()}` : ''}
          </span>
          <h1>{service.name}</h1>
          <div className="flex flex-wrap items-center gap-4 text-sm font-semibold text-slate-600">
            <span className="flex items-center gap-1.5 text-slate-700">
              <MapPin size={17} className="text-orange-500" />
              {service.location}
            </span>
            <span>·</span>
            <span className="flex items-center gap-1.5 text-amber-600 font-bold">
              <Star size={16} className="fill-current" />
              {service.rating} ({service.reviews} verified guest reviews)
            </span>
            <span>·</span>
            <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs px-2.5 py-0.5 rounded-full font-bold flex items-center gap-1">
              <ShieldCheck size={13} />
              Verified Partner
            </span>
          </div>
        </div>
      </div>

      {/* Multi-Image Showcase Gallery */}
      <div className="detail-gallery">
        <img 
          src={service.image} 
          alt={service.name} 
          className="detail-gallery-main" 
          onError={handleImageError}
        />
        <img 
          src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&auto=format&fit=crop&q=80" 
          alt="Ambiance view" 
          className="detail-gallery-sub" 
          onError={handleImageError}
        />
        <img 
          src="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&auto=format&fit=crop&q=80" 
          alt="Suite amenities" 
          className="detail-gallery-sub" 
          onError={handleImageError}
        />
      </div>

      {/* Main Content Columns: Left Info + Right Sticky Booking Box */}
      <div className="detail-columns">
        {/* Left Information Column */}
        <div>
          {/* Overview Panel */}
          <div className="detail-card-panel">
            <h2>About this Experience</h2>
            <p className="text-base text-slate-600 leading-relaxed mb-6">
              {service.description}
            </p>

            <h3 className="text-lg font-bold text-slate-900 mt-6 mb-3">Included Highlights & Amenities</h3>
            <div className="features-chips">
              {service.features.map((f) => (
                <div key={f} className="feature-chip-item">
                  <Check size={16} />
                  <span>{f}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Booking & Cancellation Policies */}
          <div className="detail-card-panel">
            <h2>Booking & Reservation Policies</h2>
            <div className="space-y-4 text-sm text-slate-600">
              <div className="flex items-start gap-3">
                <Check size={18} className="text-emerald-600 mt-0.5 flex-shrink-0" />
                <div>
                  <b className="text-slate-800 block text-base">Instant Demo Confirmation</b>
                  <span>Your booking will be reserved instantly with zero upfront credit card payment needed for this simulation.</span>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock size={18} className="text-blue-600 mt-0.5 flex-shrink-0" />
                <div>
                  <b className="text-slate-800 block text-base">Flexible Cancellation</b>
                  <span>Cancel anytime directly from your Gatherly Customer Dashboard with full demo status updates.</span>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <ShieldCheck size={18} className="text-purple-600 mt-0.5 flex-shrink-0" />
                <div>
                  <b className="text-slate-800 block text-base">Best Rate Assurance</b>
                  <span>Guaranteed authentic direct-from-provider pricing with no hidden checkout surcharges.</span>
                </div>
              </div>
            </div>
          </div>

          {/* Provider / Host Card */}
          <div className="detail-card-panel flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center font-bold text-xl border border-blue-100">
                <Building2 size={28} />
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Listed & Hosted by</span>
                <h3 className="text-lg font-bold text-slate-900">{service.provider}</h3>
                <span className="text-xs text-slate-500">Verified Professional Merchant · Active on Gatherly</span>
              </div>
            </div>
            <Link to="/explore" className="btn btn-outline text-xs font-bold py-2 px-3">
              View All Provider Listings
            </Link>
          </div>
        </div>

        {/* Right Sticky Booking Card */}
        <aside>
          <div className="sticky-booking-card">
            <div className="booking-card-price-row">
              <div>
                <small>Starting from</small>
                <b>{formatMoney(service.price)}</b>
              </div>
              <span className="text-xs bg-blue-50 text-blue-700 font-bold px-3 py-1 rounded-full">
                {service.duration || 'Per booking'}
              </span>
            </div>

            <div className="space-y-3 mb-6 text-sm text-slate-600">
              <div className="flex items-center justify-between py-2 border-b border-slate-100">
                <span className="flex items-center gap-2">
                  <CalendarDays size={16} className="text-blue-600" />
                  Availability
                </span>
                <b className="text-emerald-600 font-bold">Open Daily</b>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-slate-100">
                <span className="flex items-center gap-2">
                  <Award size={16} className="text-amber-500" />
                  Service Rating
                </span>
                <b>{service.rating} / 5.0</b>
              </div>
            </div>

            <Link 
              to={`/book/${service.id}`} 
              className="btn btn-orange w-full py-4 text-base font-bold flex items-center justify-center gap-2"
              id="details-book-now-btn"
            >
              <span>Proceed to Booking</span>
              <ArrowRight size={18} />
            </Link>

            <div className="mt-6 pt-5 border-t border-slate-100 flex flex-col gap-2.5 text-xs text-slate-500">
              <div className="flex items-center gap-2">
                <ShieldCheck size={15} className="text-emerald-500" />
                <span>Zero booking fees or surprise surcharges</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={15} className="text-blue-500" />
                <span>Instant reservation voucher confirmation</span>
              </div>
            </div>
          </div>
        </aside>
      </div>

      {/* Related Services */}
      <section className="mt-16 pt-12 border-t border-slate-200">
        <div className="section-head">
          <div>
            <span className="eyebrow">SIMILAR RECOMMENDATIONS</span>
            <h2>You May Also Like</h2>
            <p>Explore other popular experiences in this category.</p>
          </div>
          <Link to="/explore" className="text-link">
            <span>View all</span>
            <ArrowRight size={16} />
          </Link>
        </div>

        <div className="service-grid">
          {fallbackRelated.map((s) => (
            <ServiceCard 
              key={s.id} 
              s={s} 
              isFav={wishlist.includes(s.id)}
              onToggleFav={toggleWishlist}
            />
          ))}
        </div>
      </section>
    </main>
  );
};
