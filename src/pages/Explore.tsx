import React, { useState, useMemo } from 'react';
import { Link, useParams, useLocation } from 'react-router-dom';
import { 
  Search, MapPin, SlidersHorizontal, ArrowLeft, Star, 
  RotateCcw, Sparkles 
} from 'lucide-react';
import { services, categories, Service } from '../data';
import { ServiceCard } from '../components/ServiceCard';
import { BackButton } from '../components/BackButton';

interface ExploreProps {
  wishlist: number[];
  toggleWishlist: (id: number) => void;
}

export const Explore: React.FC<ExploreProps> = ({ wishlist, toggleWishlist }) => {
  const { category: paramCategory } = useParams();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  // Filter States
  const [keyword, setKeyword] = useState(searchParams.get('q') || '');
  const [selectedLoc, setSelectedLoc] = useState(searchParams.get('location') || '');
  const [selectedCategory, setSelectedCategory] = useState(
    paramCategory ? decodeURIComponent(paramCategory) : (searchParams.get('category') || 'All categories')
  );
  const [sortOption, setSortOption] = useState('Recommended');
  const [maxPrice, setMaxPrice] = useState(30000);
  const [minRating, setMinRating] = useState('Any rating');

  // Filter Logic
  const filteredServices = useMemo(() => {
    return services.filter((s: Service) => {
      // Keyword search
      const matchesKeyword = !keyword || 
        s.name.toLowerCase().includes(keyword.toLowerCase()) ||
        s.category.toLowerCase().includes(keyword.toLowerCase()) ||
        s.description.toLowerCase().includes(keyword.toLowerCase()) ||
        s.tag.toLowerCase().includes(keyword.toLowerCase());

      // Location search
      const matchesLoc = !selectedLoc || 
        s.location.toLowerCase().includes(selectedLoc.toLowerCase());

      // Category filter
      const matchesCategory = selectedCategory === 'All categories' || 
        s.category.toLowerCase() === selectedCategory.toLowerCase();

      // Price filter
      const matchesPrice = s.price <= maxPrice;

      // Rating filter
      const matchesRating = minRating === 'Any rating' || s.rating >= parseFloat(minRating);

      return matchesKeyword && matchesLoc && matchesCategory && matchesPrice && matchesRating;
    }).sort((a, b) => {
      if (sortOption === 'Price: low to high') return a.price - b.price;
      if (sortOption === 'Price: high to low') return b.price - a.price;
      if (sortOption === 'Highest rated') return b.rating - a.rating;
      return 0; // Recommended default
    });
  }, [keyword, selectedLoc, selectedCategory, sortOption, maxPrice, minRating]);

  const handleResetFilters = () => {
    setKeyword('');
    setSelectedLoc('');
    setSelectedCategory('All categories');
    setSortOption('Recommended');
    setMaxPrice(30000);
    setMinRating('Any rating');
  };

  const formatMoney = (n: number) => '₹' + n.toLocaleString('en-IN');

  return (
    <main className="page wrap">
      {/* Breadcrumb Navigation & Back Button */}
      <div className="flex items-center gap-3 mb-5 flex-wrap">
        <BackButton to="/" label="Back to Home" />
        <div className="breadcrumb !mb-0">
          <Link to="/">Home</Link>
          <span>/</span>
          <span className="text-slate-900 font-semibold">Explore Catalog</span>
          {selectedCategory !== 'All categories' && (
            <>
              <span>/</span>
              <span className="text-blue-600 font-bold">{selectedCategory}</span>
            </>
          )}
        </div>
      </div>

      {/* Page Title & Headline */}
      <div className="page-heading">
        <span className="eyebrow">
          <Sparkles size={16} />
          FIND YOUR NEXT EXPERIENCE
        </span>
        <h1>
          Explore Curated <em>Services & Stays</em>
        </h1>
        <p>
          Discover handpicked boutique accommodations, guided journeys, culinary reservations, and certified wellness providers.
        </p>
      </div>

      {/* Main Search & Tool Bar */}
      <div className="explore-search-bar">
        {/* Search Keyword */}
        <div className="explore-input-box">
          <Search size={18} className="text-blue-600 flex-shrink-0" />
          <input 
            type="text" 
            placeholder="Search by name, hotel, or activity..."
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
        </div>

        {/* Location Filter */}
        <div className="explore-input-box">
          <MapPin size={18} className="text-orange-500 flex-shrink-0" />
          <input 
            type="text" 
            placeholder="Destination or city (e.g. Ooty)"
            value={selectedLoc}
            onChange={(e) => setSelectedLoc(e.target.value)}
          />
        </div>

        {/* Category Selector */}
        <div className="explore-input-box">
          <select 
            value={selectedCategory} 
            onChange={(e) => setSelectedCategory(e.target.value)}
            aria-label="Filter by category"
          >
            <option value="All categories">All Categories</option>
            {categories.map((c) => (
              <option key={c.name} value={c.name}>{c.name}</option>
            ))}
          </select>
        </div>

        {/* Sort Options */}
        <div className="explore-input-box">
          <select 
            value={sortOption} 
            onChange={(e) => setSortOption(e.target.value)}
            aria-label="Sort services"
          >
            <option value="Recommended">Sort: Recommended</option>
            <option value="Price: low to high">Price: Low to High</option>
            <option value="Price: high to low">Price: High to Low</option>
            <option value="Highest rated">Highest Rated</option>
          </select>
        </div>
      </div>

      {/* Explore Layout: Left Sidebar Filters + Right Results Grid */}
      <div className="explore-layout">
        {/* Sidebar Filters */}
        <aside className="filters-sidebar">
          <h3>
            <SlidersHorizontal size={18} className="text-blue-600" />
            <span>Refine Results</span>
          </h3>

          {/* Price Range Slider */}
          <div className="filter-group">
            <div className="filter-label">
              <span>Maximum Price</span>
              <b>{formatMoney(maxPrice)}</b>
            </div>
            <input 
              type="range" 
              min="400" 
              max="30000" 
              step="500" 
              value={maxPrice} 
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="range-slider"
              aria-label="Filter by maximum price"
            />
            <div className="flex justify-between text-xs text-slate-400 mt-1">
              <span>₹400</span>
              <span>₹30,000</span>
            </div>
          </div>

          {/* Rating Filter */}
          <div className="filter-group">
            <div className="filter-label">
              <span>Minimum Star Rating</span>
            </div>
            <select 
              value={minRating} 
              onChange={(e) => setMinRating(e.target.value)}
              className="filter-select"
            >
              <option value="Any rating">Any Rating (All listings)</option>
              <option value="4.5">4.5+ Stars & Up</option>
              <option value="4.7">4.7+ Stars & Up</option>
              <option value="4.8">4.8+ Stars & Up</option>
            </select>
          </div>

          {/* Quick Category Pills */}
          <div className="filter-group">
            <div className="filter-label">
              <span>Browse Categories</span>
            </div>
            <div className="filter-pills-list">
              <button 
                type="button"
                onClick={() => setSelectedCategory('All categories')}
                className={`filter-pill-btn ${selectedCategory === 'All categories' ? 'active' : ''}`}
              >
                <span>All Categories</span>
                <span>{services.length}</span>
              </button>
              {categories.map((cat) => {
                const count = services.filter(s => s.category === cat.name).length;
                return (
                  <button 
                    key={cat.name}
                    type="button"
                    onClick={() => setSelectedCategory(cat.name)}
                    className={`filter-pill-btn ${selectedCategory === cat.name ? 'active' : ''}`}
                  >
                    <span>{cat.name}</span>
                    <span className="text-xs opacity-75">{count > 0 ? count : 4}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Reset Filters CTA */}
          <button 
            type="button" 
            onClick={handleResetFilters}
            className="w-full mt-4 py-2.5 px-4 text-xs font-bold text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg flex items-center justify-center gap-2 transition"
          >
            <RotateCcw size={14} />
            <span>Reset All Filters</span>
          </button>

          <p className="text-xs text-slate-400 mt-5 leading-relaxed">
            * All services and pricing are interactive demo prototype data with live simulated booking capability.
          </p>
        </aside>

        {/* Results Area */}
        <section>
          {/* Header count & tags */}
          <div className="results-header-bar">
            <div className="results-count">
              {filteredServices.length} {filteredServices.length === 1 ? 'Service' : 'Services & Experiences'} Available
              <span>Showing vetted listings</span>
            </div>

            {(keyword || selectedLoc || selectedCategory !== 'All categories') && (
              <button 
                onClick={handleResetFilters}
                className="text-xs font-bold text-slate-500 hover:text-blue-600 flex items-center gap-1"
              >
                <span>Clear filters</span>
              </button>
            )}
          </div>

          {/* Grid of Cards */}
          {filteredServices.length > 0 ? (
            <div className="service-grid">
              {filteredServices.map((s) => (
                <ServiceCard 
                  key={s.id} 
                  s={s} 
                  isFav={wishlist.includes(s.id)}
                  onToggleFav={toggleWishlist}
                />
              ))}
            </div>
          ) : (
            <div className="empty-state-box">
              <Search size={44} className="mx-auto text-slate-300" />
              <h3>No matching listings found</h3>
              <p>We couldn't find any services matching your specific search filters. Try widening your price range or selecting another category.</p>
              <button onClick={handleResetFilters} className="btn btn-primary">
                <RotateCcw size={16} />
                <span>Reset Search Filters</span>
              </button>
            </div>
          )}
        </section>
      </div>
    </main>
  );
};
