import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import GalleryItem from '../components/GalleryItem';
import Modal from '../components/Modal';
import CountUp from 'react-countup';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const GalleryPage = () => {
  const [selectedImage, setSelectedImage] = useState<{src: string, alt: string} | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');
  const [isStatsVisible, setIsStatsVisible] = useState(false);
  
  const sectionRefs = {
    hero: useRef<HTMLDivElement>(null),
    gallery: useRef<HTMLDivElement>(null),
    stats: useRef<HTMLDivElement>(null),
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

    // Gallery animation with staggered entrance
    if (sectionRefs.gallery.current) {
      const items = sectionRefs.gallery.current.querySelectorAll('.gallery-item');
      
      items.forEach((item, index) => {
        gsap.set(item, {
          opacity: 0,
          y: 50,
          scale: 0.9
        });

        ScrollTrigger.create({
          trigger: item,
          start: "top 85%",
          end: "bottom 15%",
          once: true,
          onEnter: () => {
            gsap.to(item, {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.8,
              delay: index * 0.05,
              ease: "back.out(1.7)"
            });
          }
        });
      });
    }

    // Stats animation
    if (sectionRefs.stats.current) {
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
      observer.observe(sectionRefs.stats.current);
    }
  }, [activeFilter]);

  const handleImageClick = (src: string, alt: string) => {
    setSelectedImage({ src, alt });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
  };

  const galleryImages = [
    {
      id: '2',
      src: '/Bali.jpg',
      alt: 'Serene lake view',
      title: 'Lake Serenity',
      category: 'nature',
      aspect: 'wide'
    },
    // Portrait images (taller)
    {
      id: '3',
      src: '/Our%20Mission.jpg',
      alt: 'Tropical beach paradise',
      title: 'Tropical Paradise',
      category: 'beach',
      aspect: 'tall'
    },
    {
      id: '4',
      src: '/Our%20Vision.jpg',
      alt: 'Ancient temple architecture',
      title: 'Ancient Temple',
      category: 'culture',
      aspect: 'tall'
    },
    // Square images
    {
      id: '5',
      src: '/Gallery02.jpg',
      alt: 'Desert sand dunes',
      title: 'Desert Journey',
      category: 'adventure',
      aspect: 'square'
    },
    {
      id: '7',
      src: '/Gallery03.jpg',
      alt: 'City skyline at sunset',
      title: 'Urban Sunset',
      category: 'urban',
      aspect: 'square'
    },
    // More mixed aspect images for bento effect
    {
      id: '8',
      src: '/Gallery06.jpg',
      alt: 'Waterfall in the jungle',
      title: 'Jungle Waterfall',
      category: 'nature',
      aspect: 'tall'
    },
    {
      id: '9',
      src: '/Gallery01.jpg',
      alt: 'Snow-capped peaks',
      title: 'Snow Peaks',
      category: 'nature',
      aspect: 'wide'
    },
    {
      id: '10',
      src: '/Gallery04.jpg',
      alt: 'Aurora borealis',
      title: 'Northern Lights',
      category: 'nature',
      aspect: 'square'
    },
    {
      id: '12',
      src: '/Gallery07.jpg',
      alt: 'Historic castle',
      title: 'Historic Castle',
      category: 'culture',
      aspect: 'wide'
    },
    // Additional images for a more complete bento grid
    {
      id: '13',
      src: '/Gallery09.jpg',
      alt: 'Misty forest',
      title: 'Enchanted Forest',
      category: 'nature',
      aspect: 'tall'
    },
    {
      id: '14',
      src: '/Gallery05.jpg',
      alt: 'Mountain sunrise',
      title: 'Sunrise Peaks',
      category: 'nature',
      aspect: 'wide'
    },
    {
      id: '15',
      src: '/Gallery08.jpg',
      alt: 'Rocky beach',
      title: 'Rocky Shore',
      category: 'beach',
      aspect: 'square'
    }
  ];

  const filteredImages = activeFilter === 'all' 
    ? galleryImages 
    : galleryImages.filter(image => image.category === activeFilter);

  const categories = [
    { value: 'all', label: 'All' },
    { value: 'nature', label: 'Nature' },
    { value: 'beach', label: 'Beach' },
    { value: 'culture', label: 'Culture' },
    { value: 'urban', label: 'Urban' },
    { value: 'adventure', label: 'Adventure' }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section 
        ref={sectionRefs.hero}
        className="relative py-20 bg-gradient-to-br from-blue-900 to-indigo-900 text-white"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="animate-on-scroll text-5xl md:text-6xl font-bold mb-6">
              Travel Gallery
            </h1>
            <p className="animate-on-scroll text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
              Immerse yourself in the beauty of our destinations through stunning photography
            </p>
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-12 bg-gray-50 sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <button
                key={category.value}
                onClick={() => setActiveFilter(category.value)}
                className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 transform hover:scale-105 ${
                  activeFilter === category.value
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-200'
                    : 'bg-white text-gray-700 hover:bg-blue-50 hover:text-blue-600 shadow-sm'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section with Bento Grid */}
      <section ref={sectionRefs.gallery} className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Explore Our Destinations</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Each image tells a story of adventure, discovery, and unforgettable moments
            </p>
          </div>
          
          {/* Bento Grid Layout */}
          <div className="bento-grid">
            {filteredImages.map((image) => (
              <div 
                key={image.id} 
                className={`gallery-item ${image.aspect === 'wide' ? 'bento-wide' : image.aspect === 'tall' ? 'bento-tall' : 'bento-square'}`}
              >
                <GalleryItem
                  {...image}
                  onImageClick={handleImageClick}
                />
              </div>
            ))}
          </div>

          {filteredImages.length === 0 && (
            <div className="text-center py-12">
              <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No images found</h3>
              <p className="text-gray-600">Try selecting a different category</p>
            </div>
          )}
        </div>
      </section>

      {/* Enhanced Stats Section */}
      <section ref={sectionRefs.stats} className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Our Gallery in Numbers</h2>
            <p className="text-gray-600 max-w-xl mx-auto">
              Capturing moments and memories from around the world
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-8 md:gap-12 lg:gap-16 text-center">
            <div className="stat-item flex-1 min-w-[120px] max-w-[160px] sm:max-w-none">
              <div className="text-3xl md:text-4xl font-bold mb-2 text-blue-600">
                {isStatsVisible && <CountUp end={1000} duration={2} suffix="+" />}
              </div>
              <div className="text-gray-600 text-sm">Stunning Photos</div>
            </div>
            <div className="stat-item flex-1 min-w-[120px] max-w-[160px] sm:max-w-none">
              <div className="text-3xl md:text-4xl font-bold mb-2 text-blue-600">
                {isStatsVisible && <CountUp end={50} duration={2} suffix="+" />}
              </div>
              <div className="text-gray-600 text-sm">Destinations</div>
            </div>
            <div className="stat-item flex-1 min-w-[120px] max-w-[160px] sm:max-w-none">
              <div className="text-3xl md:text-4xl font-bold mb-2 text-blue-600">
                {isStatsVisible && <CountUp end={500} duration={2} suffix="+" />}
              </div>
              <div className="text-gray-600 text-sm">Happy Travelers</div>
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

      {/* Lightbox Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        size="xl"
      >
        {selectedImage && (
          <div className="p-6">
            <img
              src={selectedImage.src}
              alt={selectedImage.alt}
              className="w-full h-auto max-h-[80vh] object-contain rounded-lg"
            />
            <div className="mt-4 text-center">
              <h3 className="text-xl font-semibold text-gray-900">{selectedImage.alt}</h3>
            </div>
          </div>
        )}
      </Modal>

      <style>{`
        .bento-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          grid-auto-rows: 250px;
          grid-gap: 1rem;
          grid-auto-flow: dense;
        }
        
        .bento-wide {
          grid-column: span 2;
        }
        
        .bento-tall {
          grid-row: span 2;
        }
        
        .bento-square {
          /* Default is 1x1 */
        }
        
        @media (max-width: 640px) {
          .bento-grid {
            grid-template-columns: 1fr;
          }
          
          .bento-wide,
          .bento-tall {
            grid-column: span 1;
            grid-row: span 1;
          }
        }
      `}</style>
    </div>
  );
};

export default GalleryPage;