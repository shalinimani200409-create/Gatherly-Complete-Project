import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Star, Heart, Clock, ArrowRight } from 'lucide-react';
import { Service } from '../data';

interface ServiceCardProps {
  s: Service;
  isFav?: boolean;
  onToggleFav?: (id: number) => void;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ s, isFav = false, onToggleFav }) => {
  const formatMoney = (n: number) => '₹' + n.toLocaleString('en-IN');

  const getAccentBadgeClass = (accent: string) => {
    switch (accent) {
      case 'blue': return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'green': return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'yellow': return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'orange': return 'bg-orange-50 text-orange-700 border-orange-200';
      case 'red': return 'bg-rose-50 text-rose-700 border-rose-200';
      case 'pink': return 'bg-pink-50 text-pink-700 border-pink-200';
      case 'purple': return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'maroon': return 'bg-rose-950 text-rose-100 border-rose-900';
      default: return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  return (
    <article className="service-card group">
      {/* Image Container with Badges */}
      <div className="service-image-box">
        <Link to={`/service/${s.id}`} aria-label={`View details of ${s.name}`}>
          <img src={s.image} alt={s.name} loading="lazy" />
        </Link>
        
        {/* Tag Badge */}
        <span className="service-badge-tag">
          {s.tag}
        </span>

        {/* Favorite Heart Button */}
        <button 
          className={`service-fav-btn ${isFav ? 'active' : ''}`}
          onClick={(e) => {
            e.preventDefault();
            onToggleFav?.(s.id);
          }}
          title={isFav ? "Remove from saved" : "Save to wishlist"}
          aria-label={isFav ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart size={18} fill={isFav ? "currentColor" : "none"} />
        </button>
      </div>

      {/* Card Content Body */}
      <div className="service-card-body">
        {/* Category Pill and Rating */}
        <div className="flex items-center justify-between mb-2">
          <span className={`text-xs font-bold px-2.5 py-1 rounded-md border ${getAccentBadgeClass(s.accent)}`}>
            {s.category}
          </span>
          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700">
            <Star size={15} className="text-amber-500 fill-amber-500" />
            <span>{s.rating}</span>
            <span className="text-slate-400 font-medium">({s.reviews})</span>
          </div>
        </div>

        {/* Location Pin */}
        <div className="service-location-tag">
          <MapPin size={15} />
          <span>{s.location}</span>
        </div>

        {/* Title */}
        <Link to={`/service/${s.id}`} className="service-card-title line-clamp-1" title={s.name}>
          {s.name}
        </Link>

        {/* Duration / Key Amenities */}
        <div className="service-card-features">
          {s.duration && (
            <span className="service-feature-pill flex items-center gap-1">
              <Clock size={12} className="text-slate-500" />
              {s.duration}
            </span>
          )}
          {s.features.slice(0, 2).map((feat) => (
            <span key={feat} className="service-feature-pill">
              {feat}
            </span>
          ))}
        </div>

        {/* Card Footer: Starting Price & Book Now CTA */}
        <div className="service-card-footer">
          <div className="service-card-price">
            <small>Starting from</small>
            <b>{formatMoney(s.price)}</b>
          </div>

          <Link to={`/book/${s.id}`} className="btn-book-card group-hover:bg-blue-600 group-hover:text-white">
            <span>Book Now</span>
            <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </article>
  );
};
