export interface Service {
  id: number;
  name: string;
  category: string;
  location: string;
  price: number;
  rating: number;
  reviews: number;
  image: string;
  description: string;
  tag: string;
  accent: 'blue' | 'green' | 'yellow' | 'orange' | 'red' | 'pink' | 'purple' | 'maroon' | 'gray';
  features: string[];
  provider: string;
  duration?: string;
  featured?: boolean;
}

export interface Category {
  name: string;
  icon: string;
  accent: 'blue' | 'green' | 'yellow' | 'orange' | 'red' | 'pink' | 'purple' | 'maroon' | 'gray';
  sub: string;
  count: number;
}

export interface Destination {
  id: number;
  name: string;
  country: string;
  image: string;
  rating: number;
  reviews: string;
  toursCount: number;
  accent: string;
}

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  avatar: string;
  comment: string;
  rating: number;
  serviceBooked: string;
  date: string;
}

export interface SpecialOffer {
  id: number;
  title: string;
  subtitle: string;
  code: string;
  discount: string;
  bgGradient: string;
  badge: string;
  expires: string;
}

export const categories: Category[] = [
  { name: 'Hotels & Stays', icon: 'BedDouble', accent: 'blue', sub: 'Luxury resorts, hotels & homestays', count: 48 },
  { name: 'Travel & Tours', icon: 'Compass', accent: 'green', sub: 'Guided journeys & nature escapes', count: 32 },
  { name: 'Dining & Food', icon: 'Utensils', accent: 'orange', sub: 'Fine dining, cafes & chef tables', count: 28 },
  { name: 'Activities & Sports', icon: 'Activity', accent: 'yellow', sub: 'Outdoor fun, courts & water sports', count: 24 },
  { name: 'Car Rentals & Cabs', icon: 'CarFront', accent: 'gray', sub: 'Sedans, SUVs & airport transfers', count: 19 },
  { name: 'Events & Venues', icon: 'PartyPopper', accent: 'purple', sub: 'Conventions, parties & banquet halls', count: 16 },
  { name: 'Salon & Spa', icon: 'Sparkles', accent: 'pink', sub: 'Wellness, massage & styling studios', count: 22 },
  { name: 'VIP & Photography', icon: 'Heart', accent: 'maroon', sub: 'Premium shoots, suites & VIP passes', count: 14 },
  { name: 'Flash Deals', icon: 'ShieldCheck', accent: 'red', sub: 'Limited-time discounts & urgent booking', count: 12 },
];

export const destinations: Destination[] = [
  {
    id: 1,
    name: 'Santorini',
    country: 'Greece',
    image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=900&auto=format&fit=crop&q=80',
    rating: 4.9,
    reviews: '1.4k reviews',
    toursCount: 18,
    accent: 'blue'
  },
  {
    id: 2,
    name: 'Bali',
    country: 'Indonesia',
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=900&auto=format&fit=crop&q=80',
    rating: 4.8,
    reviews: '980 reviews',
    toursCount: 24,
    accent: 'green'
  },
  {
    id: 3,
    name: 'Ooty & Nilgiris',
    country: 'India',
    image: 'https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?w=900&auto=format&fit=crop&q=80',
    rating: 4.9,
    reviews: '1.2k reviews',
    toursCount: 15,
    accent: 'yellow'
  },
  {
    id: 4,
    name: 'Dubai',
    country: 'UAE',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=900&auto=format&fit=crop&q=80',
    rating: 4.7,
    reviews: '890 reviews',
    toursCount: 30,
    accent: 'orange'
  },
  {
    id: 5,
    name: 'Maldives',
    country: 'Indian Ocean',
    image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=900&auto=format&fit=crop&q=80',
    rating: 4.9,
    reviews: '1.6k reviews',
    toursCount: 12,
    accent: 'blue'
  },
  {
    id: 6,
    name: 'Pondicherry',
    country: 'French Quarter',
    image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=900&auto=format&fit=crop&q=80',
    rating: 4.8,
    reviews: '740 reviews',
    toursCount: 16,
    accent: 'pink'
  }
];

export const services: Service[] = [
  {
    id: 1,
    name: 'The Fern Residency & Grand Spa',
    category: 'Hotels & Stays',
    location: 'Coimbatore, Tamil Nadu',
    price: 3499,
    rating: 4.8,
    reviews: 248,
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1000&auto=format&fit=crop&q=80',
    description: 'A calm, luxury contemporary stay with thoughtful comforts, rooftop infinity pool and easy access to the city center.',
    tag: 'Guest favourite',
    accent: 'blue',
    features: ['Swimming Pool', 'Complimentary Breakfast', 'High-Speed Wi-Fi', 'Valet Parking', 'Airport Shuttle'],
    provider: 'Fern Hospitality Group',
    duration: '1 Night / 2 Days',
    featured: true
  },
  {
    id: 2,
    name: 'Serene Hillside Heritage Villa',
    category: 'Hotels & Stays',
    location: 'Ooty, Tamil Nadu',
    price: 5200,
    rating: 4.9,
    reviews: 126,
    image: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=1000&auto=format&fit=crop&q=80',
    description: 'A warm colonial hillside hideaway with panoramic tea estate valley views, private organic garden and fireplace.',
    tag: 'Top rated',
    accent: 'green',
    features: ['Mountain valley view', 'Private garden', 'Chef in kitchen', 'Bonfire setup', 'Pet friendly'],
    provider: 'Serene Stays & Resorts',
    duration: '1 Night stay',
    featured: true
  },
  {
    id: 3,
    name: 'The Courtyard Artisan Table',
    category: 'Dining & Food',
    location: 'Chennai, Tamil Nadu',
    price: 850,
    rating: 4.7,
    reviews: 184,
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1000&auto=format&fit=crop&q=80',
    description: 'Farm-to-table seasonal menus, relaxed romantic garden interiors and curated beverage pairings for memorable meals.',
    tag: 'Trending',
    accent: 'orange',
    features: ['Outdoor garden seating', 'Artisan mocktails', 'Vegan & Gluten-free options', 'Live Acoustic music'],
    provider: 'Courtyard Culinary Group',
    duration: '2 Hours slot',
    featured: true
  },
  {
    id: 4,
    name: 'Grand Orchid Royal Convention Hall',
    category: 'Events & Venues',
    location: 'Trichy, Tamil Nadu',
    price: 28000,
    rating: 4.8,
    reviews: 92,
    image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=1000&auto=format&fit=crop&q=80',
    description: 'An expansive modern event space equipped with state-of-the-art acoustics, banquet seating and bridal dressing suites.',
    tag: 'Event ready',
    accent: 'purple',
    features: ['500+ guest capacity', 'In-house catering kitchen', 'LED Stage lighting', 'Dedicated valet parking'],
    provider: 'Orchid Events & Banquets',
    duration: 'Full Day (8 Hrs)',
    featured: true
  },
  {
    id: 5,
    name: 'CityRide Premium Executive Sedan',
    category: 'Car Rentals & Cabs',
    location: 'Madurai, Tamil Nadu',
    price: 2200,
    rating: 4.6,
    reviews: 310,
    image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=1000&auto=format&fit=crop&q=80',
    description: 'Chauffeured, pristine luxury sedans equipped with GPS tracking, sanitized cabins and flexible outstation packages.',
    tag: 'Instant confirmation',
    accent: 'gray',
    features: ['Dual Climate control', 'Unlimited km option', 'Doorstep pickup', 'Professional vetted driver'],
    provider: 'CityRide Mobility Fleet',
    duration: '8 Hours / 80 Km',
    featured: false
  },
  {
    id: 6,
    name: 'Bluewater Sunrise Sea Kayaking',
    category: 'Activities & Sports',
    location: 'Mahabalipuram, Tamil Nadu',
    price: 1200,
    rating: 4.9,
    reviews: 78,
    image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1000&auto=format&fit=crop&q=80',
    description: 'Explore the Bay of Bengal coastline with certified instructors, top-tier safety gear, and complimentary action photos.',
    tag: 'Adventure pick',
    accent: 'yellow',
    features: ['Certified life jackets', 'Expert safety guide', 'Action camera photos', 'Shower & Locker access'],
    provider: 'Bluewater Coast Outdoors',
    duration: '2.5 Hours',
    featured: true
  },
  {
    id: 7,
    name: 'Glow & Grace Organic Spa Retreat',
    category: 'Salon & Spa',
    location: 'Chennai, Tamil Nadu',
    price: 1499,
    rating: 4.8,
    reviews: 156,
    image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=1000&auto=format&fit=crop&q=80',
    description: 'Restorative aromatherapy massage, herbal facial therapies, and private steam room sessions with certified therapists.',
    tag: 'Relax & glow',
    accent: 'pink',
    features: ['Private therapy suites', '100% Organic oils', 'Herbal welcome tea', 'Personal consultation'],
    provider: 'Glow & Grace Wellness',
    duration: '90 Minutes',
    featured: true
  },
  {
    id: 8,
    name: 'SmashPoint Pro Indoor Badminton Courts',
    category: 'Activities & Sports',
    location: 'Salem, Tamil Nadu',
    price: 450,
    rating: 4.6,
    reviews: 64,
    image: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=1000&auto=format&fit=crop&q=80',
    description: 'BWF-standard synthetic shock-absorbing courts, tournament-grade shadowless LED lighting and racket rentals.',
    tag: 'Active choice',
    accent: 'green',
    features: ['BWF synthetic mat', 'Yonex racket rental', 'Air-cooled spectator lounge', 'Locker & shower facilities'],
    provider: 'SmashPoint Sports Arena',
    duration: '1 Hour court slot',
    featured: false
  },
  {
    id: 9,
    name: 'WorkNest Innovation Executive Suite',
    category: 'Car Rentals & Cabs', // or Coworking
    location: 'Bengaluru, Karnataka',
    price: 1800,
    rating: 4.8,
    reviews: 115,
    image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1000&auto=format&fit=crop&q=80',
    description: 'Fully soundproofed smart conference room with 4K interactive display, video conferencing bar and artisanal coffee.',
    tag: 'Business hub',
    accent: 'gray',
    features: ['4K Interactive whiteboard', 'Zoom Rooms setup', 'Ultra high-speed fiber', 'Free gourmet beverage bar'],
    provider: 'WorkNest Collaborative Spaces',
    duration: 'Half Day (4 Hrs)',
    featured: false
  },
  {
    id: 10,
    name: 'Lenscape Golden Hour Destination Photography',
    category: 'VIP & Photography',
    location: 'Pondicherry & Coast',
    price: 6500,
    rating: 4.9,
    reviews: 89,
    image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=1000&auto=format&fit=crop&q=80',
    description: 'Cinematic, documentary-style photography for couples, families, and milestones with high-res edited digital gallery.',
    tag: 'VIP Creative',
    accent: 'maroon',
    features: ['50+ Edited high-res photos', '2 Wardrobe changes', 'Drone aerial perspective', 'Same-week delivery'],
    provider: 'Lenscape Creative Studios',
    duration: '3 Hours shoot',
    featured: true
  },
  {
    id: 11,
    name: 'Horizon Hoppers Western Ghats Trek',
    category: 'Travel & Tours',
    location: 'Kodaikanal, Tamil Nadu',
    price: 2400,
    rating: 4.9,
    reviews: 142,
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1000&auto=format&fit=crop&q=80',
    description: 'Guided wilderness hike through pine forests and misty cliff trails, including jungle camp setup and hot mountain stew.',
    tag: 'Trail favourite',
    accent: 'green',
    features: ['Certified trail guide', 'Packed meals & snacks', 'First aid & emergency kit', 'Trekking poles provided'],
    provider: 'Horizon Hoppers Expeditions',
    duration: 'Full Day Trek',
    featured: true
  },
  {
    id: 12,
    name: 'Flash Deal: Oceanfront Beach Bungalow',
    category: 'Flash Deals',
    location: 'Mahabalipuram, Tamil Nadu',
    price: 2999,
    rating: 4.7,
    reviews: 215,
    image: 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=1000&auto=format&fit=crop&q=80',
    description: 'Special 40% OFF deal! Step directly onto soft sands from your private deck, complete with ocean breezes and sunset view.',
    tag: 'Save 40% Today',
    accent: 'red',
    features: ['Direct beach access', 'Private sun deck', 'Breakfast included', 'Flexible checkout demo'],
    provider: 'Seaside Sanctuary Stays',
    duration: '1 Night stay',
    featured: true
  }
];

export const specialOffers: SpecialOffer[] = [
  {
    id: 1,
    title: 'Weekend Escape Special',
    subtitle: 'Get 25% off on all premium hillside stays & coastal resorts.',
    code: 'GATHER25',
    discount: '25% OFF',
    bgGradient: 'from-blue-600 to-indigo-700',
    badge: 'Popular Deal',
    expires: 'Limited Time Offer'
  },
  {
    id: 2,
    title: 'Dining & Spa Delights',
    subtitle: 'Enjoy complimentary chef dessert or spa upgrade with any booking.',
    code: 'RELAXNOW',
    discount: 'FLAT ₹500 OFF',
    bgGradient: 'from-amber-500 to-orange-600',
    badge: 'Trending Weekend',
    expires: 'Valid this week'
  }
];

export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Priya Sundaram',
    role: 'Travel Journalist & Blogger',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
    comment: 'Gatherly transformed how we organize weekend trips. Booking both our Ooty villa and the guided trek in one spot was wonderfully seamless.',
    rating: 5,
    serviceBooked: 'Serene Hillside Heritage Villa',
    date: '2 weeks ago'
  },
  {
    id: 2,
    name: 'Vikramaditya Nair',
    role: 'Product Director, TechVentures',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
    comment: 'The transparency and instant confirmations are world-class. The dashboard makes managing itineraries and demo invoices straightforward.',
    rating: 5,
    serviceBooked: 'The Fern Residency & Grand Spa',
    date: '1 month ago'
  },
  {
    id: 3,
    name: 'Ananya Raghavan',
    role: 'Creative Designer',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&auto=format&fit=crop&q=80',
    comment: 'The photography session and spa day we booked exceeded all our expectations. Crisp UI, responsive support, and zero hidden costs.',
    rating: 5,
    serviceBooked: 'Lenscape Photography & Glow Spa',
    date: '3 weeks ago'
  }
];

export const trustStats = [
  { label: 'Happy Customers', value: '15,000+', change: '+24% this quarter', accent: 'blue' },
  { label: 'Verified Partners', value: '450+', change: 'Strict quality audit', accent: 'green' },
  { label: 'Successful Bookings', value: '99.4%', change: 'Instant confirmations', accent: 'orange' },
  { label: 'Overall Rating', value: '4.9 / 5', change: 'Across 12,000+ reviews', accent: 'yellow' }
];

export const whyChoosePoints = [
  {
    title: 'Curated Quality & Vetted Partners',
    desc: 'Every stay, provider, and experience undergoes a rigorous quality check before being listed on Gatherly.',
    icon: 'ShieldCheck',
    accent: 'blue'
  },
  {
    title: 'Upfront & Honest Pricing',
    desc: 'No hidden convenience charges or surprise fees at checkout. You see the transparent demo price right away.',
    icon: 'Wallet',
    accent: 'green'
  },
  {
    title: 'Unified All-in-One Booking',
    desc: 'Consolidate accommodations, rides, dining, events, and wellness appointments inside a single cohesive dashboard.',
    icon: 'CalendarCheck',
    accent: 'orange'
  },
  {
    title: '24/7 Priority Concierge',
    desc: 'Need modifications or special requests? Our dedicated assistance team is available anytime to support you.',
    icon: 'Sparkles',
    accent: 'purple'
  }
];