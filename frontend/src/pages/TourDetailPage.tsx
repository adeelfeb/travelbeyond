import { useEffect, useRef, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { gsap } from 'gsap';

const TourDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [selectedImage, setSelectedImage] = useState(0);
  const [isBooking, setIsBooking] = useState(false);
  const [isBooked, setIsBooked] = useState(false);

  const sectionRefs = {
    hero: useRef<HTMLDivElement>(null),
    details: useRef<HTMLDivElement>(null),
    itinerary: useRef<HTMLDivElement>(null),
    map: useRef<HTMLDivElement>(null),
  };

  useEffect(() => {
    // Hero animation
    if (sectionRefs.hero.current) {
      gsap.fromTo(
        sectionRefs.hero.current.querySelectorAll('.animate-on-scroll'),
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.2, ease: "power3.out" }
      );
    }

    // Details animation
    if (sectionRefs.details.current) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              gsap.fromTo(
                entry.target.querySelectorAll('.animate-on-scroll'),
                { y: 30, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power2.out" }
              );
            }
          });
        },
        { threshold: 0.3 }
      );
      observer.observe(sectionRefs.details.current);
    }

    // Itinerary animation
    if (sectionRefs.itinerary.current) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              gsap.fromTo(
                entry.target.querySelectorAll('.animate-on-scroll'),
                { x: -50, opacity: 0 },
                { x: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power2.out" }
              );
            }
          });
        },
        { threshold: 0.3 }
      );
      observer.observe(sectionRefs.itinerary.current);
    }

    // Map animation
    if (sectionRefs.map.current) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              gsap.fromTo(
                entry.target.querySelectorAll('.animate-on-scroll'),
                { x: 50, opacity: 0 },
                { x: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power2.out" }
              );
            }
          });
        },
        { threshold: 0.3 }
      );
      observer.observe(sectionRefs.map.current);
    }
  }, []);

  // Mock tour data - in a real app, this would come from an API
  const tour = {
    id: id || '1',
    title: 'Bali Adventure',
    description: 'Explore the beautiful beaches and cultural heritage of Bali with our expert guides. This comprehensive tour takes you through the most stunning locations on the island, from ancient temples to pristine beaches.',
    price: 899,
    duration: '7 days',
    nights: '6 nights',
    departureDate: '2024-04-15',
    departureLocation: 'Denpasar, Bali',
    destination: 'Bali, Indonesia',
    rating: 4.8,
    reviewCount: 127,
    images: [
      'https://images.unsplash.com/photo-1537951596046-d17ebf42a933?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1506905925346-14b1e586d1bd?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&h=600&fit=crop'
    ],
    highlights: [
      'Visit ancient temples and cultural sites',
      'Explore pristine beaches and crystal-clear waters',
      'Experience traditional Balinese cuisine',
      'Enjoy sunset views from scenic viewpoints',
      'Learn about local traditions and customs'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Arrival in Bali',
        description: 'Arrive at Denpasar Airport and transfer to your hotel. Welcome dinner and orientation.',
        activities: ['Airport pickup', 'Hotel check-in', 'Welcome dinner', 'Orientation meeting']
      },
      {
        day: 2,
        title: 'Ubud Cultural Tour',
        description: 'Explore the cultural heart of Bali with visits to temples, rice terraces, and traditional villages.',
        activities: ['Tirta Empul Temple', 'Tegallalang Rice Terraces', 'Ubud Monkey Forest', 'Traditional market visit']
      },
      {
        day: 3,
        title: 'Beach Day in Sanur',
        description: 'Relax on the beautiful beaches of Sanur and enjoy water activities.',
        activities: ['Beach relaxation', 'Snorkeling', 'Water sports', 'Beachside lunch']
      },
      {
        day: 4,
        title: 'Mount Batur Sunrise Trek',
        description: 'Early morning trek to Mount Batur for a spectacular sunrise view.',
        activities: ['Early morning pickup', 'Mountain trek', 'Sunrise viewing', 'Breakfast at summit']
      },
      {
        day: 5,
        title: 'Nusa Penida Island',
        description: 'Day trip to the stunning Nusa Penida island with its dramatic cliffs and beaches.',
        activities: ['Boat transfer', 'Kelingking Beach', 'Angel\'s Billabong', 'Broken Beach']
      },
      {
        day: 6,
        title: 'Free Day & Shopping',
        description: 'Free day to explore on your own or enjoy optional activities.',
        activities: ['Free time', 'Optional spa treatment', 'Shopping in Seminyak', 'Farewell dinner']
      },
      {
        day: 7,
        title: 'Departure',
        description: 'Check out and transfer to airport for departure.',
        activities: ['Hotel check-out', 'Airport transfer', 'Departure']
      }
    ],
    included: [
      '6 nights accommodation in 4-star hotel',
      'All meals as specified',
      'Professional English-speaking guide',
      'All entrance fees and activities',
      'Airport transfers',
      'Transportation throughout the tour',
      'Travel insurance'
    ],
    notIncluded: [
      'International flights',
      'Personal expenses',
      'Optional activities',
      'Tips and gratuities',
      'Alcoholic beverages'
    ]
  };

  const handleBookNow = async () => {
    setIsBooking(true);
    // Simulate booking process
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsBooking(false);
    setIsBooked(true);
  };

  if (isBooked) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center max-w-md mx-auto">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Booking Confirmed!</h2>
          <p className="text-gray-600 mb-8">
            Your tour has been successfully booked. You will receive a confirmation email shortly.
          </p>
          <div className="space-y-4">
            <Link
              to="/payment"
              className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200 inline-block"
            >
              Complete Payment
            </Link>
            <Link
              to="/packages"
              className="w-full border border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors duration-200 inline-block"
            >
              Browse More Tours
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section 
        ref={sectionRefs.hero}
        className="relative h-96 bg-gradient-to-br from-blue-900 to-indigo-900 text-white overflow-hidden"
      >
        <div className="absolute inset-0">
          <img
            src={tour.images[0]}
            alt={tour.title}
            className="w-full h-full object-cover opacity-40"
          />
        </div>
        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="animate-on-scroll">
              <h1 className="text-4xl md:text-6xl font-bold mb-4">{tour.title}</h1>
              <p className="text-xl md:text-2xl text-blue-100 mb-6 max-w-3xl">{tour.description}</p>
              <div className="flex flex-wrap items-center gap-6 text-lg">
                <div className="flex items-center">
                  <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {tour.destination}
                </div>
                <div className="flex items-center">
                  <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {tour.duration}
                </div>
                <div className="flex items-center">
                  <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  {tour.rating} ({tour.reviewCount} reviews)
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Image Gallery */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {tour.images.map((image, index) => (
              <div
                key={index}
                className={`cursor-pointer rounded-lg overflow-hidden ${
                  selectedImage === index ? 'ring-4 ring-blue-500' : ''
                }`}
                onClick={() => setSelectedImage(index)}
              >
                <img
                  src={image}
                  alt={`${tour.title} ${index + 1}`}
                  className="w-full h-32 object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section ref={sectionRefs.details} className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-12">
              {/* Tour Highlights */}
              <div className="animate-on-scroll">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Tour Highlights</h2>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {tour.highlights.map((highlight, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <svg className="w-6 h-6 text-green-500 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-700">{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* What's Included */}
              <div className="animate-on-scroll">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">What's Included</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-lg font-semibold text-green-600 mb-4">Included</h3>
                    <ul className="space-y-2">
                      {tour.included.map((item, index) => (
                        <li key={index} className="flex items-start space-x-3">
                          <svg className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span className="text-gray-700 text-sm">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-red-600 mb-4">Not Included</h3>
                    <ul className="space-y-2">
                      {tour.notIncluded.map((item, index) => (
                        <li key={index} className="flex items-start space-x-3">
                          <svg className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                          <span className="text-gray-700 text-sm">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Booking Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-lg p-6 sticky top-8">
                <div className="text-center mb-6">
                  <div className="text-4xl font-bold text-blue-600 mb-2">${tour.price}</div>
                  <div className="text-gray-600">per person</div>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Duration</span>
                    <span className="font-medium">{tour.duration}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Departure</span>
                    <span className="font-medium">{tour.departureDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">From</span>
                    <span className="font-medium">{tour.departureLocation}</span>
                  </div>
                </div>

                <button
                  onClick={handleBookNow}
                  disabled={isBooking}
                  className="w-full bg-blue-600 text-white py-4 px-6 rounded-lg font-semibold text-lg hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed transition-colors duration-200 flex items-center justify-center"
                >
                  {isBooking ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </>
                  ) : (
                    'Book Now'
                  )}
                </button>

                <div className="mt-6 text-sm text-gray-500 space-y-2">
                  <p>✓ Free cancellation up to 48h</p>
                  <p>✓ Instant confirmation</p>
                  <p>✓ 24/7 customer support</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Itinerary */}
      <section ref={sectionRefs.itinerary} className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Daily Itinerary</h2>
          <div className="space-y-8">
            {tour.itinerary.map((day, index) => (
              <div key={index} className="animate-on-scroll">
                <div className="flex items-start space-x-6">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                      {day.day}
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{day.title}</h3>
                    <p className="text-gray-600 mb-4">{day.description}</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {day.activities.map((activity, activityIndex) => (
                        <div key={activityIndex} className="flex items-center space-x-2">
                          <svg className="w-4 h-4 text-blue-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                          <span className="text-sm text-gray-700">{activity}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section ref={sectionRefs.map} className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-on-scroll">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Tour Location</h2>
            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="h-96 bg-gray-200 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <p className="text-gray-600">Interactive map would be embedded here</p>
                  <p className="text-sm text-gray-500 mt-2">Using Leaflet or Google Maps</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TourDetailPage;

