import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import CountUp from 'react-countup';
import TourCard from '../components/TourCard';

const LandingPage = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const [isStatsVisible, setIsStatsVisible] = useState(false);

  useEffect(() => {
    // Hero animation - coming from right
    if (heroRef.current) {
      const tl = gsap.timeline();
      tl.fromTo(
        heroRef.current.querySelector('.hero-title'),
        { x: 100, opacity: 0 },
        { x: 0, opacity: 1, duration: 1, ease: "power3.out" }
      )
      .fromTo(
        heroRef.current.querySelector('.hero-subtitle'),
        { x: 80, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
        "-=0.5"
      )
      .fromTo(
        heroRef.current.querySelector('.hero-cta'),
        { x: 60, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.6, ease: "power3.out" },
        "-=0.3"
      );
    }

    // Stats animation
    if (statsRef.current) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setIsStatsVisible(true);
              gsap.fromTo(
                entry.target.querySelectorAll('.stat-item'),
                { y: 20, opacity: 0 },
                { 
                  y: 0, 
                  opacity: 1, 
                  duration: 0.8, 
                  stagger: 0.15, 
                  ease: "power3.out" 
                }
              );
            }
          });
        },
        { threshold: 0.3 }
      );
      observer.observe(statsRef.current);
    }

    // Cards stagger animation
    if (cardsRef.current) {
      const cardsObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              gsap.fromTo(
                entry.target.querySelectorAll('.tour-card'),
                { y: 30, opacity: 0 },
                { 
                  y: 0, 
                  opacity: 1, 
                  duration: 0.8, 
                  stagger: 0.15, 
                  ease: "power3.out" 
                }
              );
            }
          });
        },
        { threshold: 0.2 }
      );
      cardsObserver.observe(cardsRef.current);
    }
  }, []);

  const featuredTours = [
    {
      id: '1',
      title: 'Santiago and the Andes Mountains',
      description: 'Explore the vibrant city life of Santiago and the breathtaking beauty of the Andes. Discover local gems, enjoy authentic cuisine, and take in stunning mountain views. A perfect mix of urban culture and natural wonders.',
      price: 899,
      duration: '7 days',
      image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800&auto=format&fit=crop&q=60',
      rating: 4.8,
      location: 'Santiago, Chile'
    },
    {
      id: '2',
      title: 'World Renowned Wineries',
      description: 'Embark on a journey through some of the most prestigious vineyards in the world. Savor the rich flavors of Chilean wines while enjoying picturesque views of rolling hills and expertly crafted estates.',
      price: 2499,
      duration: '14 days',
      image: 'https://images.unsplash.com/photo-1511910849309-0dffb062c7dc?w=800&auto=format&fit=crop&q=60',
      rating: 4.9,
      location: 'Multiple Countries'
    },
    {
      id: '3',
      title: 'Shore Excursions',
      description: 'Discover the beauty of Chile’s coastline with our curated shore excursions. From tranquil beaches to bustling port cities, explore local markets, dine on fresh seafood, and take in breathtaking ocean views.',
      price: 1599,
      duration: '10 days',
      image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop&q=60',
      rating: 4.7,
      location: 'Japan'
    },
    {
      id: '4',
      title: 'Patagonia and Torres del Paine',
      description: 'Journey to the untamed wilderness of Patagonia and explore the iconic Torres del Paine. Experience towering granite peaks, glacial lakes, and vast open landscapes. Hike through some of the world’s most awe-inspiring scenery, where nature’s raw beauty is on full display.',
      price: 1899,
      duration: '12 days',
      image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&auto=format&fit=crop&q=60',
      rating: 4.9,
      location: 'Chile'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section 
        ref={heroRef}
        className="relative h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 overflow-hidden"
      >
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1920&h=1080&fit=crop"
            alt="Travel destination"
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        
        {/* Content */}
        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          <h1 className="hero-title text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Discover Your
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-cyan-300 mt-2">
              Next Adventure
            </span>
          </h1>
          <p className="hero-subtitle text-lg md:text-xl mb-8 text-blue-100 max-w-2xl mx-auto leading-relaxed">
            Explore breathtaking destinations, create unforgettable memories, and experience the world like never before.
          </p>
          <div className="hero-cta flex flex-wrap gap-4 justify-center">
            <Link
              to="/packages"
              className="bg-white text-blue-900 hover:bg-blue-50 px-6 py-3 rounded-md text-base font-medium transition-all duration-200 shadow-sm hover:shadow-md"
            >
              Explore Tours
            </Link>
            <Link
              to="/gallery"
              className="border border-white/30 text-white hover:bg-white/10 px-6 py-3 rounded-md text-base font-medium transition-all duration-200 backdrop-blur-sm"
            >
              View Gallery
            </Link>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* Stats Section - Moved before Featured Tours */}
      <section ref={statsRef} className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Why Choose Us</h2>
            <p className="text-gray-600 max-w-xl mx-auto">
              Trusted by travelers worldwide for exceptional experiences
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-8 md:gap-12 lg:gap-16 text-center">
            <div className="stat-item flex-1 min-w-[120px] max-w-[160px] sm:max-w-none">
              <div className="text-3xl md:text-4xl font-bold mb-2 text-blue-600">
                {isStatsVisible && <CountUp end={500} duration={2} suffix="+" />}
              </div>
              <div className="text-gray-600 text-sm">Happy Travelers</div>
            </div>
            <div className="stat-item flex-1 min-w-[120px] max-w-[160px] sm:max-w-none">
              <div className="text-3xl md:text-4xl font-bold mb-2 text-blue-600">
                {isStatsVisible && <CountUp end={50} duration={2} suffix="+" />}
              </div>
              <div className="text-gray-600 text-sm">Destinations</div>
            </div>
            <div className="stat-item flex-1 min-w-[120px] max-w-[160px] sm:max-w-none">
              <div className="text-3xl md:text-4xl font-bold mb-2 text-blue-600">
                {isStatsVisible && <CountUp end={100} duration={2} suffix="+" />}
              </div>
              <div className="text-gray-600 text-sm">Tours Available</div>
            </div>
            <div className="stat-item flex-1 min-w-[120px] max-w-[160px] sm:max-w-none">
              <div className="text-3xl md:text-4xl font-bold mb-2 text-blue-600">
                {isStatsVisible && <CountUp end={4.9} duration={2} decimals={1} />}
              </div>
              <div className="text-gray-600 text-sm">Average Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Tours Section */}
      <section ref={cardsRef} className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Featured Tours</h2>
            <p className="text-gray-600 max-w-xl mx-auto">
              Handpicked experiences that showcase the best of each destination
            </p>
          </div>
          
          {/* Flex container with wrapping */}
          <div className="flex flex-wrap justify-center gap-6 md:gap-8 -mx-2">
            {featuredTours.map((tour) => (
              <div 
                key={tour.id} 
                className="tour-card flex-grow-0 flex-shrink-0 basis-full sm:basis-[calc(50%-1rem)] lg:basis-[calc(33.333%-1.5rem)] px-2 mb-6"
                style={{ maxWidth: '400px' }}
              >
                <TourCard {...tour} className="w-full" />
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link
              to="/packages"
              className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200"
            >
              View All Tours
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;