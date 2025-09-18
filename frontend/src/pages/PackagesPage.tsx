import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import TourCard from '../components/TourCard';
import SearchBar from '../components/SearchBar';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const tours = [
    {
      id: '1',
      title: 'Bali Adventure',
      description: 'Explore the beautiful beaches and cultural heritage of Bali with our expert guides.',
      price: 899,
      duration: '7 days',
      image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=500&h=300&fit=crop&auto=format&q=60',
      rating: 4.8,
      location: 'Bali, Indonesia',
      category: 'adventure'
    },
    {
      id: '2',
      title: 'European Grand Tour',
      description: 'Visit the most iconic cities across Europe in this comprehensive 14-day journey.',
      price: 2499,
      duration: '14 days',
      image: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=500&h=300&fit=crop',
      rating: 4.9,
      location: 'Multiple Countries',
      category: 'cultural'
    },
    {
      id: '3',
      title: 'Japan Cultural Experience',
      description: 'Immerse yourself in Japanese culture, from ancient temples to modern cities.',
      price: 1599,
      duration: '10 days',
      image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=500&h=300&fit=crop',
      rating: 4.7,
      location: 'Japan',
      category: 'cultural'
    },
    {
      id: '4',
      title: 'African Safari',
      description: 'Experience the wildlife and natural beauty of Africa on this unforgettable safari.',
      price: 1899,
      duration: '12 days',
      image: 'https://images.unsplash.com/photo-1508672019048-805c876b67e2?w=500&h=300&fit=crop&auto=format&q=60',
      rating: 4.9,
      location: 'Kenya, Tanzania',
      category: 'adventure'
    },
    {
      id: '5',
      title: 'Caribbean Cruise',
      description: 'Relax and unwind on a luxury cruise through the beautiful Caribbean islands.',
      price: 1299,
      duration: '8 days',
      image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=500&h=300&fit=crop&auto=format&q=60',
      rating: 4.6,
      location: 'Caribbean',
      category: 'relaxation'
    },
    {
      id: '6',
      title: 'Himalayan Trek',
      description: 'Challenge yourself with this incredible trek through the majestic Himalayas.',
      price: 1199,
      duration: '15 days',
      image: 'https://images.unsplash.com/photo-1509644851110-66e75b0c06af?w=500&h=300&fit=crop&auto=format&q=60',
      rating: 4.8,
      location: 'Nepal',
      category: 'adventure'
    },
    {
      id: '7',
      title: 'Mediterranean Coast',
      description: 'Discover the stunning coastlines and historic cities of the Mediterranean.',
      price: 1799,
      duration: '11 days',
      image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=500&h=300&fit=crop&auto=format&q=60',
      rating: 4.7,
      location: 'Greece, Italy',
      category: 'cultural'
    },
    {
      id: '8',
      title: 'Tropical Paradise',
      description: 'Escape to pristine beaches and crystal-clear waters in this tropical getaway.',
      price: 999,
      duration: '6 days',
      image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=500&h=300&fit=crop&auto=format&q=60',
      rating: 4.5,
      location: 'Maldives',
      category: 'relaxation'
    }
  ];

const PackagesPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [filteredTours, setFilteredTours] = useState(tours);
  const [sortBy, setSortBy] = useState('popular');
  
  const sectionRefs = {
    hero: useRef<HTMLDivElement>(null),
    tours: useRef<HTMLDivElement>(null),
  };

  const tourGridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Hero animation
    if (sectionRefs.hero.current) {
      gsap.fromTo(
        sectionRefs.hero.current.querySelectorAll('.animate-on-scroll'),
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.3, ease: "power3.out" }
      );
    }
  }, []);

  // Enhanced animation for tour cards with ScrollTrigger
  useEffect(() => {
    if (tourGridRef.current) {
      const cards = tourGridRef.current.querySelectorAll('.tour-item');
      
      // Clear any previous animations
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.vars.id === 'tour-cards') {
          trigger.kill();
        }
      });

      cards.forEach((card, index) => {
        // Determine animation direction based on screen size and index
        let animationProps;
        const screenWidth = window.innerWidth;
        
        if (screenWidth >= 1024) { // lg screens and up - 4 columns
          const directions = ['left', 'bottom', 'right', 'top'];
          const direction = directions[index % 4];
          
          switch (direction) {
            case 'left':
              animationProps = { x: -100, y: 0 };
              break;
            case 'right':
              animationProps = { x: 100, y: 0 };
              break;
            case 'top':
              animationProps = { x: 0, y: -100 };
              break;
            case 'bottom':
              animationProps = { x: 0, y: 100 };
              break;
            default:
              animationProps = { x: -100, y: 0 };
          }
        } else if (screenWidth >= 768) { // md screens - 3 columns
          const directions = ['left', 'bottom', 'right'];
          const direction = directions[index % 3];
          
          switch (direction) {
            case 'left':
              animationProps = { x: -80, y: 0 };
              break;
            case 'right':
              animationProps = { x: 80, y: 0 };
              break;
            case 'bottom':
              animationProps = { x: 0, y: 80 };
              break;
            default:
              animationProps = { x: -80, y: 0 };
          }
        } else {
          // For small screens (2 columns), alternate left and right
          animationProps = index % 2 === 0 ? { x: -60, y: 0 } : { x: 60, y: 0 };
        }

        // Set initial state
        gsap.set(card, {
          ...animationProps,
          opacity: 0,
          scale: 0.8,
          rotationY: index % 2 === 0 ? -15 : 15,
        });

        // Create ScrollTrigger animation
        ScrollTrigger.create({
          id: 'tour-cards',
          trigger: card,
          start: 'top 85%',
          end: 'bottom 15%',
          once: true,
          onEnter: () => {
            gsap.to(card, {
              x: 0,
              y: 0,
              opacity: 1,
              scale: 1,
              rotationY: 0,
              duration: 0.8,
              delay: index * 0.1,
              ease: "back.out(1.7)",
            });
          }
        });
      });
    }

    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.vars.id === 'tour-cards') {
          trigger.kill();
        }
      });
    };
  }, [filteredTours]);

  useEffect(() => {
    let filtered = tours;

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(tour =>
        tour.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tour.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tour.location.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by category
    if (selectedFilter !== 'all') {
      filtered = filtered.filter(tour => tour.category === selectedFilter);
    }

    // Sort tours
    switch (sortBy) {
      case 'price-low':
        filtered = filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered = filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered = filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'duration':
        filtered = filtered.sort((a, b) => parseInt(a.duration) - parseInt(b.duration));
        break;
      default:
        // Keep original order for 'popular'
        break;
    }

    setFilteredTours(filtered);
  }, [searchQuery, selectedFilter, sortBy]);

  const categories = [
    { value: 'all', label: 'All Tours' },
    { value: 'adventure', label: 'Adventure' },
    { value: 'cultural', label: 'Cultural' },
    { value: 'relaxation', label: 'Relaxation' }
  ];

  const sortOptions = [
    { value: 'popular', label: 'Most Popular' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'rating', label: 'Highest Rated' },
    { value: 'duration', label: 'Shortest Duration' }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section 
        ref={sectionRefs.hero}
        className="relative py-20 bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 text-white overflow-hidden"
      >
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="animate-on-scroll text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
              Travel Packages
            </h1>
            <p className="animate-on-scroll text-lg sm:text-xl lg:text-2xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
              Discover our carefully curated selection of travel experiences around the world
            </p>
          </div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-12 bg-gradient-to-r from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-6">
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <SearchBar
                onSearch={setSearchQuery}
                placeholder="Search destinations, activities, or tours..."
              />
            </div>

            {/* Filters */}
            <div className="flex flex-col lg:flex-row gap-6 justify-between items-center">
              {/* Category Filter */}
              <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
                {categories.map((category) => (
                  <button
                    key={category.value}
                    onClick={() => setSelectedFilter(category.value)}
                    className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 transform hover:scale-105 ${
                      selectedFilter === category.value
                        ? 'bg-blue-600 text-white shadow-lg shadow-blue-200'
                        : 'bg-white text-gray-700 hover:bg-blue-50 hover:text-blue-600 shadow-sm'
                    }`}
                  >
                    {category.label}
                  </button>
                ))}
              </div>

              {/* Sort Dropdown */}
              <div className="flex items-center space-x-3">
                <label htmlFor="sort" className="text-sm font-medium text-gray-700 whitespace-nowrap">
                  Sort by:
                </label>
                <select
                  id="sort"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm bg-white shadow-sm min-w-[180px]"
                >
                  {sortOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tours Grid */}
      <section ref={sectionRefs.tours} className="py-20 bg-white">
        <div className="max-w-7xl lg:max-w-[85%] lg:max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredTours.length === 0 ? (
            <div className="text-center py-12">
              <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.29-1.009-5.824-2.709M15 6.291A7.962 7.962 0 0012 5c-2.34 0-4.29 1.009-5.824 2.709" />
              </svg>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No tours found</h3>
              <p className="text-gray-600">Try adjusting your search or filter criteria</p>
            </div>
          ) : (
            <>
              <div className="text-center mb-16">
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                  {searchQuery ? `Search Results (${filteredTours.length})` : 'Available Tours'}
                </h2>
                {searchQuery && (
                  <p className="text-gray-600 text-lg">Showing results for "{searchQuery}"</p>
                )}
              </div>
              
              {/* Enhanced Responsive Grid - Fixed Layout */}
              <div 
                ref={tourGridRef}
                className="flex flex-wrap justify-center gap-3"
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 400px))',
                  justifyContent: 'center',
                  alignItems: 'stretch'
                }}
              >
                {filteredTours.map((tour, index) => (
                  <div 
                    key={tour.id} 
                    className="tour-item"
                    style={{ 
                      perspective: '1000px',
                      transformStyle: 'preserve-3d',
                      width: '100%',
                      maxWidth: '400px',
                      minWidth: '300px'
                    }}
                  >
                    <TourCard {...tour} />
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">Can't Find What You're Looking For?</h2>
          <p className="text-xl text-blue-100 mb-8 leading-relaxed">
            We can create a custom travel package tailored to your specific needs and preferences
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Contact Us
            </a>
            <a
              href="/about"
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-all duration-300 transform hover:scale-105"
            >
              Learn More
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PackagesPage;