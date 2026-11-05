import React, { useState, useMemo, useEffect } from 'react';
import { Link, useParams, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, MapPin, SlidersHorizontal, ArrowLeft, Star, 
  RotateCcw, Sparkles, Filter, Ticket, Stethoscope, 
  X, Check, ChevronDown, Layers
} from 'lucide-react';
import { 
  services, categories, mainCategories, categorySections, 
  allSubCategories, Service, SubCategory 
} from '../data';
import { ServiceCard } from '../components/ServiceCard';
import { BackButton } from '../components/BackButton';
import { TicketDiscovery } from '../components/TicketDiscovery';
import { HealthcareBookingModal } from '../components/HealthcareBookingModal';

interface ExploreProps {
  wishlist: number[];
  toggleWishlist: (id: number) => void;
  notify?: (msg: string) => void;
}

export const Explore: React.FC<ExploreProps> = ({ 
  wishlist, 
  toggleWishlist,
  notify = () => {} 
}) => {
  const { category: paramCategory } = useParams();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  // Search & Filter States
  const [keyword, setKeyword] = useState(searchParams.get('q') || '');
  const [selectedLoc, setSelectedLoc] = useState(searchParams.get('location') || '');
  
  // Multi-tier category state
  const [selectedMainCat, setSelectedMainCat] = useState<string>(() => {
    const cat = searchParams.get('mainCat') || searchParams.get('category');
    if (cat) {
      const match = mainCategories.find(m => m.name.toLowerCase() === cat.toLowerCase() || m.id === cat.toLowerCase());
      if (match) return match.name;
    }
    return 'All categories';
  });

  const [selectedSection, setSelectedSection] = useState<string>(() => {
    return searchParams.get('section') || 'All sections';
  });

  const [selectedSubcategory, setSelectedSubcategory] = useState<string>(() => {
    return searchParams.get('subcategory') || searchParams.get('subcat') || 'All subcategories';
  });

  const [sortOption, setSortOption] = useState('Recommended');
  const [maxPrice, setMaxPrice] = useState(80000);
  const [minRating, setMinRating] = useState('Any rating');
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Modal states for specialized discovery
  const [activeHealthcareService, setActiveHealthcareService] = useState<Service | null>(null);

  // Handle URL param changes
  useEffect(() => {
    const q = searchParams.get('q');
    const loc = searchParams.get('location');
    const sub = searchParams.get('subcategory') || searchParams.get('subcat');
    const sec = searchParams.get('section');
    const cat = searchParams.get('category');

    if (q !== null) setKeyword(q);
    if (loc !== null) setSelectedLoc(loc);
    if (sub) setSelectedSubcategory(sub);
    if (sec) setSelectedSection(sec);
    if (cat) {
      const match = mainCategories.find(m => m.name.toLowerCase() === cat.toLowerCase() || m.id === cat.toLowerCase());
      if (match) setSelectedMainCat(match.name);
    }
  }, [location.search]);

  // Available sections based on selected main category
  const availableSections = useMemo(() => {
    if (selectedMainCat === 'All categories') return categorySections;
    const mainCatObj = mainCategories.find(m => m.name.toLowerCase() === selectedMainCat.toLowerCase());
    if (!mainCatObj) return categorySections;
    return categorySections.filter(s => s.mainCategoryId === mainCatObj.id);
  }, [selectedMainCat]);

  // Available subcategories based on selected main category and section
  const availableSubcategories = useMemo(() => {
    let list = allSubCategories;
    if (selectedMainCat !== 'All categories') {
      const mainCatObj = mainCategories.find(m => m.name.toLowerCase() === selectedMainCat.toLowerCase());
      if (mainCatObj) {
        list = list.filter(sub => sub.mainCategoryId === mainCatObj.id);
      }
    }
    if (selectedSection !== 'All sections') {
      list = list.filter(sub => sub.sectionId === selectedSection || sub.name.toLowerCase() === selectedSection.toLowerCase());
    }
    return list;
  }, [selectedMainCat, selectedSection]);

  // Main Filter Logic
  const filteredServices = useMemo(() => {
    return services.filter((s: Service) => {
      // Keyword search
      const matchesKeyword = !keyword || 
        s.name.toLowerCase().includes(keyword.toLowerCase()) ||
        s.category.toLowerCase().includes(keyword.toLowerCase()) ||
        (s.subcategory && s.subcategory.toLowerCase().includes(keyword.toLowerCase())) ||
        s.description.toLowerCase().includes(keyword.toLowerCase()) ||
        s.tag.toLowerCase().includes(keyword.toLowerCase());

      // Location search
      const matchesLoc = !selectedLoc || 
        s.location.toLowerCase().includes(selectedLoc.toLowerCase());

      // Main Category filter
      const matchesMainCat = selectedMainCat === 'All categories' || 
        (s.mainCategoryName && s.mainCategoryName.toLowerCase() === selectedMainCat.toLowerCase()) ||
        s.category.toLowerCase() === selectedMainCat.toLowerCase();

      // Section filter
      const matchesSection = selectedSection === 'All sections' ||
        s.section === selectedSection ||
        (s.sectionName && s.sectionName.toLowerCase() === selectedSection.toLowerCase());

      // Subcategory filter
      const matchesSubcategory = selectedSubcategory === 'All subcategories' ||
        (s.subcategory && s.subcategory.toLowerCase() === selectedSubcategory.toLowerCase()) ||
        s.category.toLowerCase() === selectedSubcategory.toLowerCase();

      // Price filter
      const matchesPrice = s.price <= maxPrice;

      // Rating filter
      const matchesRating = minRating === 'Any rating' || s.rating >= parseFloat(minRating);

      return matchesKeyword && matchesLoc && matchesMainCat && matchesSection && matchesSubcategory && matchesPrice && matchesRating;
    }).sort((a, b) => {
      if (sortOption === 'Price: low to high') return a.price - b.price;
      if (sortOption === 'Price: high to low') return b.price - a.price;
      if (sortOption === 'Highest rated') return b.rating - a.rating;
      return 0; // Recommended default
    });
  }, [keyword, selectedLoc, selectedMainCat, selectedSection, selectedSubcategory, sortOption, maxPrice, minRating]);

  // Check if active selection is Ticket Discovery
  const isTicketCategory = useMemo(() => {
    const sub = selectedSubcategory.toLowerCase();
    return sub.includes('flight ticket') || sub.includes('train ticket') || sub.includes('bus ticket') || selectedSection === 'travel-tickets';
  }, [selectedSubcategory, selectedSection]);

  const handleResetFilters = () => {
    setKeyword('');
    setSelectedLoc('');
    setSelectedMainCat('All categories');
    setSelectedSection('All sections');
    setSelectedSubcategory('All subcategories');
    setSortOption('Recommended');
    setMaxPrice(80000);
    setMinRating('Any rating');
  };

  const formatMoney = (n: number) => '₹' + n.toLocaleString('en-IN');

  const activeFiltersCount = [
    keyword ? 1 : 0,
    selectedLoc ? 1 : 0,
    selectedMainCat !== 'All categories' ? 1 : 0,
    selectedSection !== 'All sections' ? 1 : 0,
    selectedSubcategory !== 'All subcategories' ? 1 : 0,
    minRating !== 'Any rating' ? 1 : 0,
    maxPrice < 80000 ? 1 : 0
  ].reduce((a, b) => a + b, 0);

  return (
    <main className="page wrap">
      {/* Breadcrumb Navigation & Back Button */}
      <div className="flex items-center gap-3 mb-5 flex-wrap">
        <BackButton fallbackTo="/" label="Back" />
        <div className="breadcrumb !mb-0">
          <Link to="/">Home</Link>
          <span>/</span>
          <span className="text-slate-900 font-semibold">Explore Catalog</span>
          {selectedMainCat !== 'All categories' && (
            <>
              <span>/</span>
              <span className="text-blue-600 font-bold">{selectedMainCat}</span>
            </>
          )}
          {selectedSubcategory !== 'All subcategories' && (
            <>
              <span>/</span>
              <span className="text-slate-800 font-extrabold">{selectedSubcategory}</span>
            </>
          )}
        </div>
      </div>

      {/* Page Title & Headline */}
      <div className="page-heading">
        <span className="eyebrow">
          <Sparkles size={16} />
          ALL-IN-ONE BOOKING CATALOG · 86 SUBCATEGORIES
        </span>
        <h1>
          Explore Verified <em>Services & Stays</em>
        </h1>
        <p>
          Discover handpicked luxury hotels, vehicle rentals, scenic tours, wedding venues, culinary reservations, healthcare demo slots, and everyday home services.
        </p>
      </div>

      {/* Main Category Pill Quick Switcher */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-6 scrollbar-none">
        {['All categories', 'Travel & Accommodation', 'Events & Entertainment', 'Business & Daily Services'].map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => {
              setSelectedMainCat(cat);
              setSelectedSection('All sections');
              setSelectedSubcategory('All subcategories');
            }}
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition flex items-center gap-1.5 ${
              selectedMainCat.toLowerCase() === cat.toLowerCase()
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
            }`}
          >
            <span>{cat}</span>
          </button>
        ))}
      </div>

      {/* Main Search & Tool Bar */}
      <div className="explore-search-bar">
        {/* Search Keyword */}
        <div className="explore-input-box">
          <Search size={18} className="text-blue-600 flex-shrink-0" />
          <input 
            type="text" 
            placeholder="Search by service, doctor, venue, turf..."
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
          {keyword && (
            <button type="button" onClick={() => setKeyword('')} className="text-slate-400 hover:text-slate-600">
              <X size={15} />
            </button>
          )}
        </div>

        {/* Location Filter */}
        <div className="explore-input-box">
          <MapPin size={18} className="text-orange-500 flex-shrink-0" />
          <input 
            type="text" 
            placeholder="City / Region (e.g. Coimbatore, Ooty)"
            value={selectedLoc}
            onChange={(e) => setSelectedLoc(e.target.value)}
          />
          {selectedLoc && (
            <button type="button" onClick={() => setSelectedLoc('')} className="text-slate-400 hover:text-slate-600">
              <X size={15} />
            </button>
          )}
        </div>

        {/* Subcategory Selector (All 86 Subcategories) */}
        <div className="explore-input-box">
          <Layers size={18} className="text-purple-600 flex-shrink-0" />
          <select 
            value={selectedSubcategory} 
            onChange={(e) => setSelectedSubcategory(e.target.value)}
            aria-label="Filter by Subcategory"
          >
            <option value="All subcategories">All Subcategories ({availableSubcategories.length})</option>
            {availableSubcategories.map((sub) => (
              <option key={sub.id} value={sub.name}>{sub.name}</option>
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

      {/* Ticket Discovery Simulator if Ticket category is selected */}
      {isTicketCategory && (
        <TicketDiscovery 
          notify={notify}
          onBookDemo={() => notify('Demo ticket confirmed and saved to My Bookings!')}
        />
      )}

      {/* Active Filter Chips */}
      {activeFiltersCount > 0 && (
        <div className="flex items-center gap-2 mb-4 flex-wrap">
          <span className="text-xs font-bold text-slate-500">Active Filters:</span>
          {selectedMainCat !== 'All categories' && (
            <span className="bg-blue-50 text-blue-700 text-xs font-bold px-2.5 py-1 rounded-lg flex items-center gap-1 border border-blue-200">
              <span>{selectedMainCat}</span>
              <button type="button" onClick={() => setSelectedMainCat('All categories')}>
                <X size={13} />
              </button>
            </span>
          )}
          {selectedSection !== 'All sections' && (
            <span className="bg-purple-50 text-purple-700 text-xs font-bold px-2.5 py-1 rounded-lg flex items-center gap-1 border border-purple-200">
              <span>{selectedSection}</span>
              <button type="button" onClick={() => setSelectedSection('All sections')}>
                <X size={13} />
              </button>
            </span>
          )}
          {selectedSubcategory !== 'All subcategories' && (
            <span className="bg-indigo-50 text-indigo-700 text-xs font-bold px-2.5 py-1 rounded-lg flex items-center gap-1 border border-indigo-200">
              <span>{selectedSubcategory}</span>
              <button type="button" onClick={() => setSelectedSubcategory('All subcategories')}>
                <X size={13} />
              </button>
            </span>
          )}
          {selectedLoc && (
            <span className="bg-orange-50 text-orange-700 text-xs font-bold px-2.5 py-1 rounded-lg flex items-center gap-1 border border-orange-200">
              <span>Location: {selectedLoc}</span>
              <button type="button" onClick={() => setSelectedLoc('')}>
                <X size={13} />
              </button>
            </span>
          )}
          {keyword && (
            <span className="bg-slate-100 text-slate-700 text-xs font-bold px-2.5 py-1 rounded-lg flex items-center gap-1 border border-slate-200">
              <span>Keyword: {keyword}</span>
              <button type="button" onClick={() => setKeyword('')}>
                <X size={13} />
              </button>
            </span>
          )}
          <button 
            type="button" 
            onClick={handleResetFilters} 
            className="text-xs text-blue-600 font-extrabold hover:underline ml-2"
          >
            Clear all filters
          </button>
        </div>
      )}

      {/* Mobile Filter Toggle Button */}
      <div className="md:hidden mb-4">
        <button 
          type="button" 
          onClick={() => setShowMobileFilters(!showMobileFilters)} 
          className="flex items-center justify-between w-full p-3.5 bg-white border border-slate-200 rounded-xl font-bold text-sm text-slate-800 shadow-xs"
        >
          <span className="flex items-center gap-2">
            <SlidersHorizontal size={17} className="text-blue-600" /> 
            <span>Refine & Filter Catalog</span>
            {activeFiltersCount > 0 && (
              <span className="bg-blue-600 text-white text-[11px] font-extrabold w-5 h-5 rounded-full flex items-center justify-center">
                {activeFiltersCount}
              </span>
            )}
          </span>
          <span className="text-xs text-blue-600 font-extrabold bg-blue-50 px-2 py-0.5 rounded">
            {showMobileFilters ? 'Hide Filters ▲' : 'Show Filters ▼'}
          </span>
        </button>
      </div>

      {/* Explore Layout: Left Sidebar Filters + Right Results Grid */}
      <div className="explore-layout">
        {/* Sidebar Filters */}
        <aside className={`filters-sidebar ${showMobileFilters ? 'block' : 'hidden md:block'}`}>
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
            <h3 className="!mb-0 !pb-0 !border-none flex items-center gap-2">
              <SlidersHorizontal size={18} className="text-blue-600" />
              <span>Refine Results</span>
            </h3>
            <button 
              type="button"
              onClick={handleResetFilters}
              className="text-xs text-blue-600 font-bold hover:underline"
            >
              Reset
            </button>
          </div>

          {/* Section Filter Dropdown */}
          <div className="filter-group">
            <label className="text-xs font-bold text-slate-700 mb-1.5 block">Category Section</label>
            <select
              value={selectedSection}
              onChange={(e) => {
                setSelectedSection(e.target.value);
                setSelectedSubcategory('All subcategories');
              }}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs font-semibold text-slate-800 outline-none"
            >
              <option value="All sections">All Sections ({availableSections.length})</option>
              {availableSections.map((sec) => (
                <option key={sec.id} value={sec.id}>{sec.title}</option>
              ))}
            </select>
          </div>

          {/* Subcategory Selector */}
          <div className="filter-group">
            <label className="text-xs font-bold text-slate-700 mb-1.5 block">Subcategory ({availableSubcategories.length})</label>
            <select
              value={selectedSubcategory}
              onChange={(e) => setSelectedSubcategory(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs font-semibold text-slate-800 outline-none"
            >
              <option value="All subcategories">All Subcategories</option>
              {availableSubcategories.map((sub) => (
                <option key={sub.id} value={sub.name}>{sub.name}</option>
              ))}
            </select>
          </div>

          {/* Price Range Slider */}
          <div className="filter-group">
            <div className="filter-label">
              <span>Maximum Price</span>
              <b>{formatMoney(maxPrice)}</b>
            </div>
            <input 
              type="range" 
              min={500} 
              max={80000} 
              step={500}
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-blue-600 cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-slate-400 mt-1 font-semibold">
              <span>₹500</span>
              <span>₹40,000</span>
              <span>₹80,000+</span>
            </div>
          </div>

          {/* Rating Filter */}
          <div className="filter-group">
            <label className="text-xs font-bold text-slate-700 mb-1.5 block">Minimum Guest Rating</label>
            <div className="space-y-1.5">
              {['Any rating', '4.8', '4.5', '4.0'].map((r) => (
                <label 
                  key={r} 
                  className={`flex items-center justify-between p-2 rounded-lg cursor-pointer text-xs font-semibold transition ${
                    minRating === r ? 'bg-blue-50 text-blue-700 border border-blue-200 font-bold' : 'hover:bg-slate-50 text-slate-600'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <input 
                      type="radio" 
                      name="rating" 
                      checked={minRating === r}
                      onChange={() => setMinRating(r)}
                      className="accent-blue-600"
                    />
                    <span>{r === 'Any rating' ? 'Any Rating' : `${r} ★ & Above`}</span>
                  </div>
                  {r !== 'Any rating' && (
                    <div className="flex text-amber-400">
                      {[...Array(Math.floor(parseFloat(r)))].map((_, i) => (
                        <Star key={i} size={11} className="fill-current" />
                      ))}
                    </div>
                  )}
                </label>
              ))}
            </div>
          </div>

          {/* Category Portal Jump Card */}
          <div className="p-4 bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl text-xs space-y-2 mt-6">
            <h4 className="font-extrabold text-blue-900 mb-0">Browse All 86 Subcategories</h4>
            <p className="text-slate-600 leading-relaxed mb-0">
              View our complete visual directory covering Travel, Events, Dining, Spaces, and Machinery.
            </p>
            <Link to="/categories" className="inline-flex items-center gap-1 font-bold text-blue-700 hover:underline pt-1">
              <span>Open Visual Directory</span>
              <ArrowLeft size={12} className="rotate-180" />
            </Link>
          </div>
        </aside>

        {/* Right Results Grid */}
        <div className="results-container">
          {/* Results Header Bar */}
          <div className="results-header-bar">
            <div>
              <h3>
                Showing {filteredServices.length} {filteredServices.length === 1 ? 'Experience' : 'Experiences'}
              </h3>
              <p>
                {selectedSubcategory !== 'All subcategories' 
                  ? `Filtered by subcategory: ${selectedSubcategory}`
                  : selectedMainCat !== 'All categories'
                  ? `Curated inside ${selectedMainCat}`
                  : 'All handpicked verified listings across Gatherly.'}
              </p>
            </div>

            <div className="text-xs text-slate-500 font-semibold hidden sm:block">
              Page 1 of 1
            </div>
          </div>

          {/* Results Grid with Framer Motion Animation */}
          {filteredServices.length > 0 ? (
            <motion.div 
              layout
              className="service-grid"
            >
              <AnimatePresence>
                {filteredServices.map((service) => (
                  <motion.div
                    key={service.id}
                    layout
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.25 }}
                    className="flex flex-col h-full"
                  >
                    <ServiceCard 
                      service={service} 
                      isFav={wishlist.includes(service.id)} 
                      onToggleFav={toggleWishlist}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          ) : (
            /* Empty State */
            <div className="empty-results-box">
              <div className="w-16 h-16 rounded-full bg-blue-50 text-blue-600 mx-auto flex items-center justify-center mb-4">
                <Search size={28} />
              </div>
              <h3>No matching experiences found</h3>
              <p>
                We couldn’t find any verified listings matching your active filters. Try broadening your budget range, clearing the location, or selecting another subcategory.
              </p>
              <button 
                type="button" 
                onClick={handleResetFilters}
                className="btn btn-primary"
              >
                <RotateCcw size={16} />
                <span>Reset All Filters</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Healthcare Booking Modal */}
      {activeHealthcareService && (
        <HealthcareBookingModal
          isOpen={!!activeHealthcareService}
          onClose={() => setActiveHealthcareService(null)}
          service={activeHealthcareService}
          notify={notify}
        />
      )}
    </main>
  );
};
