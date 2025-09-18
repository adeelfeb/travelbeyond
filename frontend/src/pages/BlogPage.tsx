import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import BlogCard from '../components/BlogCard';
import SearchBar from '../components/SearchBar';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const blogPosts = [
  {
    id: '1',
    title: '10 Must-Visit Destinations in Southeast Asia',
    excerpt: 'Discover the most breathtaking and culturally rich destinations across Southeast Asia that every traveler should experience at least once in their lifetime.',
    image: '/Gallery01.jpg',
    author: 'Sarah Johnson',
    date: 'March 15, 2024',
    readTime: '5 min read',
    category: 'Destinations',
    featured: true
  },
  {
    id: '2',
    title: 'Sustainable Travel: How to Explore Responsibly',
    excerpt: 'Learn about eco-friendly travel practices and how you can minimize your environmental impact while exploring the world.',
    image: '/Gallery04.jpg',
    author: 'Michael Chen',
    date: 'March 12, 2024',
    readTime: '7 min read',
    category: 'Tips'
  },
  // ... (other blog posts remain the same)
];

const BlogPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [filteredPosts, setFilteredPosts] = useState(blogPosts);
  const [sortBy, setSortBy] = useState('recent');
  
  const sectionRefs = {
    hero: useRef<HTMLDivElement>(null),
    posts: useRef<HTMLDivElement>(null),
  };

  const blogGridRef = useRef<HTMLDivElement>(null);

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

  // Enhanced animation for blog cards with ScrollTrigger
  useEffect(() => {
    if (blogGridRef.current) {
      const cards = blogGridRef.current.querySelectorAll('.blog-item');
      
      // Clear any previous animations
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.vars.id === 'blog-cards') {
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
          // For small screens (1 column), alternate up and down
          animationProps = index % 2 === 0 ? { x: 0, y: -60 } : { x: 0, y: 60 };
        }

        // Set initial state
        gsap.set(card, {
          ...animationProps,
          opacity: 0,
          scale: 0.85,
          rotationY: index % 2 === 0 ? -12 : 12,
        });

        // Create ScrollTrigger animation
        ScrollTrigger.create({
          id: 'blog-cards',
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
              ease: "back.out(1.4)",
            });
          }
        });
      });
    }

    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.vars.id === 'blog-cards') {
          trigger.kill();
        }
      });
    };
  }, [filteredPosts]);

  useEffect(() => {
    let filtered = blogPosts;

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(post =>
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.category?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by category
    if (selectedFilter !== 'all') {
      filtered = filtered.filter(post => post.category?.toLowerCase() === selectedFilter.toLowerCase());
    }

    // Sort posts
    switch (sortBy) {
      case 'oldest':
        filtered = filtered.slice().reverse();
        break;
      case 'read-time-short':
        filtered = filtered.sort((a, b) => parseInt(a.readTime) - parseInt(b.readTime));
        break;
      case 'read-time-long':
        filtered = filtered.sort((a, b) => parseInt(b.readTime) - parseInt(a.readTime));
        break;
      case 'alphabetical':
        filtered = filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
      default:
        // Keep original order for 'recent'
        break;
    }

    setFilteredPosts(filtered);
  }, [searchQuery, selectedFilter, sortBy]);

  const categories = [
    { value: 'all', label: 'All Posts' },
    { value: 'destinations', label: 'Destinations' },
    { value: 'tips', label: 'Travel Tips' },
    { value: 'culture', label: 'Culture' },
    { value: 'adventure', label: 'Adventure' },
    { value: 'food', label: 'Food & Drink' },
    { value: 'photography', label: 'Photography' }
  ];

  const sortOptions = [
    { value: 'recent', label: 'Most Recent' },
    { value: 'oldest', label: 'Oldest First' },
    { value: 'read-time-short', label: 'Quick Reads' },
    { value: 'read-time-long', label: 'Long Reads' },
    { value: 'alphabetical', label: 'Alphabetical' }
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
              Travel Blog
            </h1>
            <p className="animate-on-scroll text-lg sm:text-xl lg:text-2xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
              Stories, tips, and insights from our travel experts to inspire your next adventure
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
                placeholder="Search articles, topics, or authors..."
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
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm bg-white shadow-sm min-w-[160px]"
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

      {/* Blog Posts Grid */}
      <section ref={sectionRefs.posts} className="py-20 bg-white">
        <div className="max-w-7xl lg:max-w-[85%] lg:max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredPosts.length === 0 ? (
            <div className="text-center py-12">
              <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.29-1.009-5.824-2.709M15 6.291A7.962 7.962 0 0012 5c-2.34 0-4.29 1.009-5.824 2.709" />
              </svg>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No articles found</h3>
              <p className="text-gray-600">Try adjusting your search or filter criteria</p>
            </div>
          ) : (
            <>
              <div className="text-center mb-16">
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                  {searchQuery ? `Search Results (${filteredPosts.length})` : 'Latest Articles'}
                </h2>
                {searchQuery && (
                  <p className="text-gray-600 text-lg">Showing results for "{searchQuery}"</p>
                )}
              </div>
              
              {/* Enhanced Responsive Grid - Full width on small screens */}
              <div 
                ref={blogGridRef}
                className="flex flex-wrap justify-center gap-3"
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 400px))',
                  justifyContent: 'center',
                  alignItems: 'stretch'
                }}
              >
                {filteredPosts.map((post, index) => (
                  <div 
                    key={post.id} 
                    className="blog-item w-full"
                    style={{ 
                      perspective: '1000px',
                      transformStyle: 'preserve-3d',
                      width: '100%',
                      maxWidth: '400px',
                      minWidth: '300px'
                    }}
                  >
                    <BlogCard {...post} />
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">Stay Updated</h2>
          <p className="text-xl text-blue-100 mb-8 leading-relaxed">
            Subscribe to our newsletter for the latest travel tips, destination guides, and exclusive offers
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-6 py-4 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-300 shadow-lg"
            />
            <button className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogPage;