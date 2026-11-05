import React, { useState, useMemo } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Compass, PartyPopper, Briefcase, BedDouble, Car, Ticket, 
  Palmtree, Building2, Music, Camera, Trophy, UtensilsCrossed, 
  Building, Stethoscope, Sparkles, Wrench, Truck, ArrowRight, 
  CheckCircle2, Star, ShieldCheck, MapPin, Tag, ChevronRight,
  SlidersHorizontal, Search
} from 'lucide-react';
import { 
  mainCategories, categorySections, allSubCategories, 
  MainCategory, CategorySection, SubCategory, handleImageError 
} from '../data';
import { BackButton } from '../components/BackButton';
import { TicketDiscovery } from '../components/TicketDiscovery';

interface CategoryPageProps {
  notify?: (msg: string) => void;
}

export const CategoryPage: React.FC<CategoryPageProps> = ({ notify = () => {} }) => {
  const { category: paramCategory } = useParams();
  const navigate = useNavigate();

  // Determine initial selected main category
  const initialMainCatId = useMemo(() => {
    if (!paramCategory) return 'travel';
    const cleanParam = decodeURIComponent(paramCategory).toLowerCase();
    if (cleanParam.includes('travel') || cleanParam.includes('stay') || cleanParam === 'travel') return 'travel';
    if (cleanParam.includes('event') || cleanParam.includes('entertainment') || cleanParam === 'events') return 'events';
    if (cleanParam.includes('business') || cleanParam.includes('daily') || cleanParam === 'business') return 'business';
    
    // Check if it matches a section
    const matchingSec = categorySections.find(s => s.id === cleanParam || s.title.toLowerCase() === cleanParam);
    if (matchingSec) return matchingSec.mainCategoryId;

    // Check if it matches a subcategory
    const matchingSub = allSubCategories.find(s => s.id === cleanParam || s.name.toLowerCase() === cleanParam);
    if (matchingSub) return matchingSub.mainCategoryId;

    return 'travel';
  }, [paramCategory]);

  const [activeMainCat, setActiveMainCat] = useState<'travel' | 'events' | 'business'>(initialMainCatId);
  const [selectedSection, setSelectedSection] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showTicketSimulator, setShowTicketSimulator] = useState(false);

  // Active Main Category Object
  const currentCategory = useMemo(() => {
    return mainCategories.find((m) => m.id === activeMainCat) || mainCategories[0];
  }, [activeMainCat]);

  // Sections for active main category
  const currentSections = useMemo(() => {
    return categorySections.filter((s) => s.mainCategoryId === activeMainCat);
  }, [activeMainCat]);

  // Filtered Subcategories
  const filteredSubcategories = useMemo(() => {
    return allSubCategories.filter((sub) => {
      const matchesMain = sub.mainCategoryId === activeMainCat;
      const matchesSection = selectedSection === 'all' || sub.sectionId === selectedSection;
      const matchesQuery = !searchQuery || 
        sub.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        sub.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesMain && matchesSection && matchesQuery;
    });
  }, [activeMainCat, selectedSection, searchQuery]);

  const getSectionIcon = (iconName: string) => {
    switch (iconName) {
      case 'BedDouble': return <BedDouble size={20} />;
      case 'Car': return <Car size={20} />;
      case 'Ticket': return <Ticket size={20} />;
      case 'Palmtree': return <Palmtree size={20} />;
      case 'Building2': return <Building2 size={20} />;
      case 'Music': return <Music size={20} />;
      case 'Camera': return <Camera size={20} />;
      case 'Trophy': return <Trophy size={20} />;
      case 'UtensilsCrossed': return <UtensilsCrossed size={20} />;
      case 'Building': return <Building size={20} />;
      case 'Stethoscope': return <Stethoscope size={20} />;
      case 'Sparkles': return <Sparkles size={20} />;
      case 'Wrench': return <Wrench size={20} />;
      case 'Truck': return <Truck size={20} />;
      default: return <Compass size={20} />;
    }
  };

  const getMainCatIcon = (iconName: string) => {
    switch (iconName) {
      case 'PartyPopper': return <PartyPopper size={20} />;
      case 'Briefcase': return <Briefcase size={20} />;
      default: return <Compass size={20} />;
    }
  };

  const handleSubcategoryClick = (sub: SubCategory) => {
    if (sub.isDiscoveryOnly && (sub.id === 'flight-tickets' || sub.id === 'train-tickets' || sub.id === 'bus-tickets')) {
      setShowTicketSimulator(true);
      window.scrollTo({ top: 400, behavior: 'smooth' });
    } else {
      navigate(`/explore?category=${encodeURIComponent(currentCategory.name)}&subcategory=${encodeURIComponent(sub.name)}`);
    }
  };

  return (
    <main className="page wrap">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-3 mb-5 flex-wrap">
        <BackButton fallbackTo="/" label="Back" />
        <div className="breadcrumb !mb-0">
          <Link to="/">Home</Link>
          <span>/</span>
          <span className="text-slate-500 font-semibold">Categories</span>
          <span>/</span>
          <span className="text-blue-700 font-bold">{currentCategory.name}</span>
        </div>
      </div>

      {/* Main Category Header Banner with 3 Main Hub Switchers */}
      <div className="relative rounded-3xl overflow-hidden bg-slate-900 text-white mb-8 shadow-xl">
        <img
          src={currentCategory.bannerImage}
          alt={currentCategory.name}
          className="absolute inset-0 w-full h-full object-cover object-center opacity-25"
          onError={handleImageError}
        />
        <div className="relative z-10 p-6 sm:p-10 lg:p-12">
          {/* Main Category Switcher Tabs */}
          <div className="inline-flex bg-white/10 backdrop-blur-md p-1.5 rounded-2xl mb-6 flex-wrap gap-1 border border-white/10">
            {mainCategories.map((mc) => (
              <button
                key={mc.id}
                type="button"
                onClick={() => {
                  setActiveMainCat(mc.id);
                  setSelectedSection('all');
                }}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition flex items-center gap-2 ${
                  activeMainCat === mc.id
                    ? 'bg-white text-slate-900 shadow-md'
                    : 'text-white/80 hover:text-white hover:bg-white/10'
                }`}
              >
                {getMainCatIcon(mc.icon)}
                <span>{mc.shortName}</span>
              </button>
            ))}
          </div>

          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-1.5 bg-blue-500/20 text-blue-200 border border-blue-400/30 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-3">
              <Sparkles size={13} />
              {currentCategory.stats}
            </span>
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight mb-3">
              {currentCategory.name}
            </h1>
            <p className="text-sm sm:text-base text-slate-200 leading-relaxed mb-0">
              {currentCategory.description}
            </p>
          </div>
        </div>
      </div>

      {/* Ticket Discovery Simulator Banner if inside Travel */}
      {activeMainCat === 'travel' && (
        <div className="mb-8">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-base font-extrabold text-slate-900 mb-0 flex items-center gap-2">
              <Ticket size={18} className="text-blue-600" />
              <span>Interactive Ticket Discovery Simulator</span>
            </h3>
            <button
              type="button"
              onClick={() => setShowTicketSimulator(!showTicketSimulator)}
              className="text-xs text-blue-700 font-bold hover:underline"
            >
              {showTicketSimulator ? 'Hide Simulator ▲' : 'Open Ticket Simulator ▼'}
            </button>
          </div>
          {showTicketSimulator && (
            <TicketDiscovery 
              notify={notify} 
              onBookDemo={() => notify('Demo ticket confirmed in My Bookings!')} 
            />
          )}
        </div>
      )}

      {/* Section Filter Pills & Search */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 bg-slate-50 p-4 rounded-2xl border border-slate-200">
        {/* Section Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
          <button
            type="button"
            onClick={() => setSelectedSection('all')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition ${
              selectedSection === 'all'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-white text-slate-700 hover:bg-slate-200/60 border border-slate-200'
            }`}
          >
            All Sections ({filteredSubcategories.length})
          </button>
          {currentSections.map((sec) => (
            <button
              key={sec.id}
              type="button"
              onClick={() => setSelectedSection(sec.id)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition flex items-center gap-1.5 ${
                selectedSection === sec.id
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-white text-slate-700 hover:bg-slate-200/60 border border-slate-200'
              }`}
            >
              {getSectionIcon(sec.icon)}
              <span>{sec.title}</span>
            </button>
          ))}
        </div>

        {/* Search within subcategories */}
        <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs w-full md:w-64">
          <Search size={15} className="text-slate-400 flex-shrink-0" />
          <input
            type="text"
            placeholder="Search subcategory..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-transparent outline-none font-medium text-slate-800"
          />
        </div>
      </div>

      {/* Sections and Subcategories Display */}
      <div className="space-y-12">
        {currentSections
          .filter((sec) => selectedSection === 'all' || sec.id === selectedSection)
          .map((sec) => {
            const sectionSubs = filteredSubcategories.filter((sub) => sub.sectionId === sec.id);
            if (sectionSubs.length === 0) return null;

            return (
              <motion.section 
                key={sec.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="category-section-block"
              >
                {/* Section Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 mb-6 border-b border-slate-200">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center flex-shrink-0 border border-blue-100">
                      {getSectionIcon(sec.icon)}
                    </div>
                    <div>
                      <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 mb-0.5">
                        {sec.title}
                      </h2>
                      <p className="text-xs text-slate-500 mb-0">
                        {sec.description}
                      </p>
                    </div>
                  </div>

                  <span className="text-xs font-bold text-slate-600 bg-slate-100 px-3 py-1 rounded-full self-start sm:self-auto">
                    {sectionSubs.length} Subcategories
                  </span>
                </div>

                {/* Subcategory Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                  {sectionSubs.map((sub) => (
                    <motion.div
                      key={sub.id}
                      whileHover={{ y: -4 }}
                      transition={{ duration: 0.25, ease: 'easeOut' }}
                      className="bg-white border border-slate-200/90 hover:border-blue-300 rounded-2xl overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col group cursor-pointer"
                      onClick={() => handleSubcategoryClick(sub)}
                    >
                      {/* Image Thumbnail with zoom on hover */}
                      <div className="relative h-48 w-full overflow-hidden bg-slate-100 aspect-[16/10]">
                        <img
                          src={sub.image}
                          alt={sub.name}
                          className="w-full h-full object-cover object-center transition duration-500 group-hover:scale-105"
                          loading="lazy"
                          onError={handleImageError}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
                        
                        {/* Top Badges */}
                        <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                          <span className="bg-white/90 backdrop-blur-xs text-slate-900 text-[11px] font-extrabold px-2.5 py-1 rounded-lg shadow-xs flex items-center gap-1">
                            {getSectionIcon(sub.icon)}
                            <span>{sub.itemCount}+ Listings</span>
                          </span>

                          {sub.badge && (
                            <span className="bg-blue-600 text-white text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full shadow-xs">
                              {sub.badge}
                            </span>
                          )}
                        </div>

                        {/* Title on image gradient */}
                        <div className="absolute bottom-3 left-3 right-3">
                          <h3 className="text-base font-extrabold text-white mb-0 drop-shadow-sm">
                            {sub.name}
                          </h3>
                        </div>
                      </div>

                      {/* Card Content */}
                      <div className="p-4 flex-1 flex flex-col justify-between">
                        <p className="text-[13px] text-slate-500 line-clamp-2 leading-relaxed mb-3 font-normal">
                          {sub.description}
                        </p>

                        <div className="flex items-center justify-between pt-3 border-t border-slate-100 mt-auto">
                          <div>
                            <span className="text-[10px] text-slate-400 block font-semibold uppercase tracking-wider">
                              Starting From
                            </span>
                            <span className="text-sm font-extrabold text-blue-700">
                              ₹{sub.startingPrice.toLocaleString('en-IN')}
                              <small className="text-[10px] text-slate-500 font-normal ml-1">
                                {sub.priceUnit}
                              </small>
                            </span>
                          </div>

                          <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-700 group-hover:bg-blue-600 group-hover:text-white flex items-center justify-center transition-all duration-200 group-hover:translate-x-0.5">
                            <ArrowRight size={15} />
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.section>
            );
          })}
      </div>
    </main>
  );
};

