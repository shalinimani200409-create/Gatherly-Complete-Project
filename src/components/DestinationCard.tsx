import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Heart } from 'lucide-react';
import { Destination, handleImageError } from '../data';

interface DestinationCardProps {
  dest: Destination;
  isFav?: boolean;
  onToggleFav?: (id: number) => void;
}

export const DestinationCard: React.FC<DestinationCardProps> = ({ dest, isFav = false, onToggleFav }) => {
  return (
    <Link 
      to={`/explore?location=${encodeURIComponent(dest.name)}`} 
      className="destination-card group"
      aria-label={`Explore experiences in ${dest.name}, ${dest.country}`}
    >
      <img 
        src={dest.image} 
        alt={`${dest.name}, ${dest.country}`} 
        className="destination-card-img" 
        loading="lazy" 
        onError={handleImageError}
      />
      <div className="destination-card-overlay">
        {/* Top Right Heart Wishlist */}
        <div className="destination-top-action">
          <button 
            type="button"
            className={`btn-fav-round ${isFav ? 'active' : ''}`}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onToggleFav?.(dest.id);
            }}
            title={isFav ? "Saved" : "Save destination"}
            aria-label={isFav ? "Remove saved destination" : "Save destination"}
          >
            <Heart size={18} fill={isFav ? "currentColor" : "none"} />
          </button>
        </div>

        {/* Bottom Destination Details */}
        <div className="destination-card-info">
          <h3 className="destination-card-title">
            {dest.name}, {dest.country}
          </h3>
          <div className="destination-card-meta">
            <span className="destination-rating-pill">
              <Star size={14} className="fill-current" />
              <span>{dest.rating}</span>
              <span className="text-white/80 font-normal">({dest.reviews})</span>
            </span>
            <span className="text-xs bg-white/20 backdrop-blur-sm px-2.5 py-1 rounded-full font-medium">
              {dest.toursCount}+ listings
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};
