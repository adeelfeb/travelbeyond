import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import Modal from '../Modal';
import { FiEdit, FiTrash2, FiEye, FiSearch, FiPlus, FiBook, FiUser, FiCalendar, FiClock, FiUpload, FiX, FiCheckCircle, FiFileText, FiArchive, FiGlobe, FiMapPin, FiInfo, FiUsers, FiActivity, FiCoffee, FiCamera } from 'react-icons/fi';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  category: string;
  tags: string[];
  featured: boolean;
  status: 'published' | 'draft' | 'archived';
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
  readTime: string;
  imageUrl: string;
  slug: string;
}

const BlogManagement = () => {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([
    {
      id: '1',
      title: '10 Must-Visit Destinations in Southeast Asia',
      excerpt: 'Discover the most breathtaking and culturally rich destinations across Southeast Asia that every traveler should experience at least once in their lifetime.',
      content: 'Southeast Asia is a treasure trove of incredible destinations...',
      author: 'Sarah Johnson',
      category: 'destinations',
      tags: ['southeast asia', 'travel guide', 'destinations'],
      featured: true,
      status: 'published',
      publishedAt: '2024-03-15',
      createdAt: '2024-03-10',
      updatedAt: '2024-03-15',
      readTime: '5 min read',
      imageUrl: '/Gallery06.jpg',
      slug: '10-must-visit-destinations-southeast-asia'
    },
    {
      id: '2',
      title: 'Sustainable Travel: How to Explore Responsibly',
      excerpt: 'Learn about eco-friendly travel practices and how you can minimize your environmental impact while exploring the world.',
      content: 'Sustainable travel is becoming increasingly important...',
      author: 'Michael Chen',
      category: 'tips',
      tags: ['sustainable travel', 'eco-friendly', 'tips'],
      featured: false,
      status: 'published',
      publishedAt: '2024-03-12',
      createdAt: '2024-03-08',
      updatedAt: '2024-03-12',
      readTime: '7 min read',
      imageUrl: '/Gallery07.jpg',
      slug: 'sustainable-travel-explore-responsibly'
    },
    {
      id: '3',
      title: 'Hidden Gems of Eastern Europe',
      excerpt: 'Explore the lesser-known but equally stunning destinations in Eastern Europe that offer authentic experiences without the crowds.',
      content: 'Eastern Europe is full of hidden gems waiting to be discovered...',
      author: 'Emma Wilson',
      category: 'destinations',
      tags: ['eastern europe', 'hidden gems', 'off the beaten path'],
      featured: false,
      status: 'draft',
      publishedAt: '',
      createdAt: '2024-03-18',
      updatedAt: '2024-03-18',
      readTime: '6 min read',
      imageUrl: '/Gallery08.jpg',
      slug: 'hidden-gems-eastern-europe'
    },
    {
      id: '4',
      title: 'Photography Tips for Travelers',
      excerpt: 'Capture stunning travel memories with these professional photography tips and techniques.',
      content: 'Great travel photography is about more than just having a good camera...',
      author: 'David Kim',
      category: 'photography',
      tags: ['photography', 'travel tips', 'camera'],
      featured: true,
      status: 'published',
      publishedAt: '2024-03-20',
      createdAt: '2024-03-15',
      updatedAt: '2024-03-20',
      readTime: '8 min read',
      imageUrl: '/Gallery09.jpg',
      slug: 'photography-tips-travelers'
    }
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [formData, setFormData] = useState<Partial<BlogPost>>({});
  const [newTag, setNewTag] = useState('');
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const postsRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [showStatusMenu, setShowStatusMenu] = useState(false);
  const [showCategoryMenu, setShowCategoryMenu] = useState(false);

  useEffect(() => {
    if (postsRef.current) {
      gsap.fromTo(
        postsRef.current.querySelectorAll('.blog-post'),
        { y: 20, opacity: 0, scale: 0.95 },
        { y: 0, opacity: 1, scale: 1, duration: 0.6, stagger: 0.1, ease: "power3.out" }
      );
    }
  }, []);

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesStatus = statusFilter === 'all' || post.status === statusFilter;
    const matchesCategory = categoryFilter === 'all' || post.category === categoryFilter;
    
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const handleEditPost = (post: BlogPost) => {
    setSelectedPost(post);
    setFormData(post);
    setIsEditMode(true);
    setIsModalOpen(true);
  };

  const handleDeletePost = (postId: string) => {
    if (window.confirm('Are you sure you want to delete this blog post?')) {
      setBlogPosts(blogPosts.filter(post => post.id !== postId));
    }
  };

  const handleViewPost = (post: BlogPost) => {
    setSelectedPost(post);
    setIsEditMode(false);
    setIsModalOpen(true);
  };

  const handleAddPost = () => {
    setSelectedPost(null);
    setFormData({
      title: '',
      excerpt: '',
      content: '',
      author: 'Admin',
      category: 'destinations',
      tags: [],
      featured: false,
      status: 'draft',
      readTime: '5 min read',
      imageUrl: '',
      slug: ''
    });
    setUploadedImage(null);
    setImagePreview(null);
    setIsEditMode(true);
    setIsModalOpen(true);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.type.startsWith('image/')) {
        setUploadedImage(file);
        const reader = new FileReader();
        reader.onload = (e) => {
          setImagePreview(e.target?.result as string);
        };
        reader.readAsDataURL(file);
      } else {
        alert('Please select a valid image file');
      }
    }
  };

  const handleRemoveImage = () => {
    setUploadedImage(null);
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const simulateImageUpload = async (file: File): Promise<string> => {
    setIsUploading(true);
    // Simulate upload delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // In a real app, you would upload to a server and get back a URL
    // For now, we'll create a data URL
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        resolve(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    });
  };

  const handleSavePost = async () => {
    if (isEditMode) {
      let imageUrl = formData.imageUrl || '';
      
      // Handle image upload if a new image was selected
      if (uploadedImage) {
        try {
          imageUrl = await simulateImageUpload(uploadedImage);
        } catch (error) {
          alert('Failed to upload image. Please try again.');
          return;
        }
      }

      if (selectedPost) {
        // Update existing post
        setBlogPosts(blogPosts.map(post => 
          post.id === selectedPost.id ? { 
            ...post, 
            ...formData, 
            imageUrl,
            updatedAt: new Date().toISOString().split('T')[0],
            slug: formData.title?.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || post.slug
          } : post
        ));
      } else {
        // Add new post
        const newPost: BlogPost = {
          id: Date.now().toString(),
          title: formData.title || '',
          excerpt: formData.excerpt || '',
          content: formData.content || '',
          author: formData.author || 'Admin',
          category: formData.category || 'destinations',
          tags: formData.tags || [],
          featured: formData.featured || false,
          status: formData.status || 'draft',
          publishedAt: formData.status === 'published' ? new Date().toISOString().split('T')[0] : '',
          createdAt: new Date().toISOString().split('T')[0],
          updatedAt: new Date().toISOString().split('T')[0],
          readTime: formData.readTime || '5 min read',
          imageUrl: imageUrl,
          slug: formData.title?.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || ''
        };
        setBlogPosts([...blogPosts, newPost]);
      }
    }
    setIsModalOpen(false);
    setSelectedPost(null);
    setFormData({});
    setUploadedImage(null);
    setImagePreview(null);
    setIsUploading(false);
  };

  const handleAddTag = () => {
    if (newTag.trim() && formData.tags) {
      setFormData({
        ...formData,
        tags: [...formData.tags, newTag.trim()]
      });
      setNewTag('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    if (formData.tags) {
      setFormData({
        ...formData,
        tags: formData.tags.filter(tag => tag !== tagToRemove)
      });
    }
  };

  const getStatusBadge = (status: string) => {
    const statusClasses = {
      published: 'bg-green-100 text-green-800',
      draft: 'bg-yellow-100 text-yellow-800',
      archived: 'bg-gray-100 text-gray-800'
    };
    return statusClasses[status as keyof typeof statusClasses] || statusClasses.draft;
  };

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'destinations', label: 'Destinations' },
    { value: 'tips', label: 'Travel Tips' },
    { value: 'culture', label: 'Culture' },
    { value: 'adventure', label: 'Adventure' },
    { value: 'food', label: 'Food & Drink' },
    { value: 'photography', label: 'Photography' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div className="mb-4">
          <h2 className="text-2xl font-bold text-gray-900">Blog Management</h2>
          <p className="text-gray-600">Manage blog posts and content</p>
        </div>
        <button
          onClick={handleAddPost}
          className="mt-4 sm:mt-0 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center space-x-2"
        >
          <FiPlus className="w-4 h-4" />
          <span>New Post</span>
        </button>
      </div>

      {/* Enhanced Filters */}
      <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl shadow-sm border border-emerald-100 p-6">
        <div className="flex items-center space-x-2 mb-4">
          <FiBook className="w-5 h-5 text-emerald-600" />
          <h3 className="text-lg font-semibold text-gray-800">Filter Blog Posts</h3>
        </div>
        
        <div className="space-y-4">
          {/* Enhanced Search - Full Width */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Search Posts</label>
            <div className="relative group">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-emerald-400 w-5 h-5 group-focus-within:text-emerald-600 transition-colors" />
              <input
                type="text"
                placeholder="Search by title, author, or tags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border-2 border-emerald-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white shadow-sm transition-all duration-200 hover:border-emerald-300"
              />
            </div>
          </div>

          {/* Status and Category Filters - Same Line */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Enhanced Status Filter */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Post Status</label>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setShowStatusMenu(prev => !prev)}
                  className="w-full px-4 py-3 border-2 border-emerald-200 rounded-xl bg-white shadow-sm flex items-center justify-between hover:border-emerald-300 focus:ring-2 focus:ring-emerald-500"
                >
                  <span className="flex items-center space-x-2 text-gray-700">
                    {statusFilter === 'all' && <FiGlobe className="w-4 h-4 text-emerald-600" />}
                    {statusFilter === 'published' && <FiCheckCircle className="w-4 h-4 text-emerald-600" />}
                    {statusFilter === 'draft' && <FiFileText className="w-4 h-4 text-emerald-600" />}
                    {statusFilter === 'archived' && <FiArchive className="w-4 h-4 text-emerald-600" />}
                    <span className="capitalize">{statusFilter === 'all' ? 'All Posts' : `${statusFilter} Posts`}</span>
                  </span>
                  <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {showStatusMenu && (
                  <div className="absolute z-10 mt-2 w-full bg-white border border-emerald-100 rounded-xl shadow-lg overflow-hidden">
                    {[
                      { value: 'all', label: 'All Posts', icon: <FiGlobe className="w-4 h-4 text-emerald-600" /> },
                      { value: 'published', label: 'Published Posts', icon: <FiCheckCircle className="w-4 h-4 text-emerald-600" /> },
                      { value: 'draft', label: 'Draft Posts', icon: <FiFileText className="w-4 h-4 text-emerald-600" /> },
                      { value: 'archived', label: 'Archived Posts', icon: <FiArchive className="w-4 h-4 text-emerald-600" /> }
                    ].map(item => (
                      <button
                        key={item.value}
                        onClick={() => { setStatusFilter(item.value); setShowStatusMenu(false); }}
                        className={`w-full flex items-center justify-between px-4 py-2 text-sm hover:bg-emerald-50 ${statusFilter === item.value ? 'bg-emerald-50' : ''}`}
                      >
                        <span className="flex items-center space-x-2 text-gray-700">
                          {item.icon}
                          <span>{item.label}</span>
                        </span>
                        {statusFilter === item.value && <FiCheckCircle className="w-4 h-4 text-emerald-600" />}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Enhanced Category Filter */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Post Category</label>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setShowCategoryMenu(prev => !prev)}
                  className="w-full px-4 py-3 border-2 border-emerald-200 rounded-xl bg-white shadow-sm flex items-center justify-between hover:border-emerald-300 focus:ring-2 focus:ring-emerald-500"
                >
                  <span className="flex items-center space-x-2 text-gray-700 capitalize">
                    {categoryFilter === 'all' && <FiGlobe className="w-4 h-4 text-emerald-600" />}
                    {categoryFilter === 'destinations' && <FiMapPin className="w-4 h-4 text-emerald-600" />}
                    {categoryFilter === 'tips' && <FiInfo className="w-4 h-4 text-emerald-600" />}
                    {categoryFilter === 'culture' && <FiUsers className="w-4 h-4 text-emerald-600" />}
                    {categoryFilter === 'adventure' && <FiActivity className="w-4 h-4 text-emerald-600" />}
                    {categoryFilter === 'food' && <FiCoffee className="w-4 h-4 text-emerald-600" />}
                    {categoryFilter === 'photography' && <FiCamera className="w-4 h-4 text-emerald-600" />}
                    <span>{categoryFilter === 'all' ? 'All Categories' : categories.find(c => c.value === categoryFilter)?.label || categoryFilter}</span>
                  </span>
                  <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {showCategoryMenu && (
                  <div className="absolute z-10 mt-2 w-full bg-white border border-emerald-100 rounded-xl shadow-lg overflow-hidden">
                    {[
                      { value: 'all', label: 'All Categories', icon: <FiGlobe className="w-4 h-4 text-emerald-600" /> },
                      { value: 'destinations', label: 'Destinations', icon: <FiMapPin className="w-4 h-4 text-emerald-600" /> },
                      { value: 'tips', label: 'Travel Tips', icon: <FiInfo className="w-4 h-4 text-emerald-600" /> },
                      { value: 'culture', label: 'Culture', icon: <FiUsers className="w-4 h-4 text-emerald-600" /> },
                      { value: 'adventure', label: 'Adventure', icon: <FiActivity className="w-4 h-4 text-emerald-600" /> },
                      { value: 'food', label: 'Food & Drink', icon: <FiCoffee className="w-4 h-4 text-emerald-600" /> },
                      { value: 'photography', label: 'Photography', icon: <FiCamera className="w-4 h-4 text-emerald-600" /> }
                    ].map(item => (
                      <button
                        key={item.value}
                        onClick={() => { setCategoryFilter(item.value); setShowCategoryMenu(false); }}
                        className={`w-full flex items-center justify-between px-4 py-2 text-sm hover:bg-emerald-50 ${categoryFilter === item.value ? 'bg-emerald-50' : ''}`}
                      >
                        <span className="flex items-center space-x-2 text-gray-700">
                          {item.icon}
                          <span>{item.label}</span>
                        </span>
                        {categoryFilter === item.value && <FiCheckCircle className="w-4 h-4 text-emerald-600" />}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        
        {/* Filter Summary */}
        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center space-x-4 text-sm text-gray-600">
            <span className="flex items-center space-x-1">
              <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
              <span>{filteredPosts.length} posts found</span>
            </span>
            {(searchQuery || statusFilter !== 'all' || categoryFilter !== 'all') && (
              <button
                onClick={() => {
                  setSearchQuery('');
                  setStatusFilter('all');
                  setCategoryFilter('all');
                }}
                className="text-emerald-600 hover:text-emerald-800 font-medium transition-colors"
              >
                Clear filters
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Blog Posts Grid */}
      <div ref={postsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPosts.map((post) => (
          <div key={post.id} className="blog-post bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200 group">
            <div className="relative">
              <img
                src={post.imageUrl}
                alt={post.title}
                className="w-full h-48 object-cover"
              />
              {post.featured && (
                <div className="absolute top-3 left-3 bg-blue-600 text-white px-2 py-1 rounded text-xs font-medium">
                  Featured
                </div>
              )}
              <div className="absolute top-3 right-3 flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <button
                  onClick={() => handleViewPost(post)}
                  className="p-1 bg-white/90 backdrop-blur-sm rounded text-gray-600 hover:text-blue-600"
                  title="View"
                >
                  <FiEye className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleEditPost(post)}
                  className="p-1 bg-white/90 backdrop-blur-sm rounded text-gray-600 hover:text-indigo-600"
                  title="Edit"
                >
                  <FiEdit className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDeletePost(post.id)}
                  className="p-1 bg-white/90 backdrop-blur-sm rounded text-gray-600 hover:text-red-600"
                  title="Delete"
                >
                  <FiTrash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
            
            <div className="p-4">
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">{post.title}</h3>
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadge(post.status)}`}>
                  {post.status}
                </span>
              </div>
              
              <p className="text-gray-600 text-sm mb-3 line-clamp-3">{post.excerpt}</p>
              
              <div className="flex items-center text-xs text-gray-500 mb-3 space-x-4">
                <div className="flex items-center">
                  <FiUser className="w-3 h-3 mr-1" />
                  {post.author}
                </div>
                <div className="flex items-center">
                  <FiClock className="w-3 h-3 mr-1" />
                  {post.readTime}
                </div>
                <div className="flex items-center">
                  <FiCalendar className="w-3 h-3 mr-1" />
                  {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString() : 'Draft'}
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500 capitalize">{post.category}</span>
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-gray-500">
                    {post.publishedAt ? 'Published' : 'Created'} {new Date(post.publishedAt || post.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
              
              {post.tags.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-1">
                  {post.tags.slice(0, 3).map((tag, index) => (
                    <span key={index} className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-700">
                      {tag}
                    </span>
                  ))}
                  {post.tags.length > 3 && (
                    <span className="text-xs text-gray-500">+{post.tags.length - 3} more</span>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Blog Post Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={isEditMode ? (selectedPost ? 'Edit Post' : 'New Post') : 'Post Details'}
        size="xl"
      >
        <div className="p-6">
          {isEditMode ? (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                  <input
                    type="text"
                    value={formData.title || ''}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Author</label>
                  <input
                    type="text"
                    value={formData.author || ''}
                    onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                  <select
                    value={formData.category || 'destinations'}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    {categories.slice(1).map(category => (
                      <option key={category.value} value={category.value}>
                        {category.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                  <select
                    value={formData.status || 'draft'}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as BlogPost['status'] })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                    <option value="archived">Archived</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Read Time</label>
                  <input
                    type="text"
                    value={formData.readTime || ''}
                    onChange={(e) => setFormData({ ...formData, readTime: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                {/* Image Upload Section */}
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Blog Image</label>
                  
                  {/* Image Preview */}
                  {(imagePreview || formData.imageUrl) && (
                    <div className="mb-4">
                      <div className="relative inline-block">
                        <img
                          src={imagePreview || formData.imageUrl}
                          alt="Preview"
                          className="w-32 h-32 object-cover rounded-lg border border-gray-200"
                        />
                        <button
                          type="button"
                          onClick={handleRemoveImage}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                        >
                          <FiX className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Upload Area */}
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-emerald-400 transition-colors">
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                    
                    {!imagePreview && !formData.imageUrl ? (
                      <div>
                        <FiUpload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                        <p className="text-sm text-gray-600 mb-2">Upload blog image</p>
                        <button
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors"
                        >
                          Choose Image
                        </button>
                        <p className="text-xs text-gray-500 mt-2">PNG, JPG, GIF up to 10MB</p>
                      </div>
                    ) : (
                      <div>
                        <button
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors"
                        >
                          Change Image
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Fallback URL Input */}
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Or enter image URL</label>
                    <input
                      type="url"
                      value={formData.imageUrl || ''}
                      onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                      placeholder="https://example.com/image.jpg"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    />
                  </div>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Excerpt</label>
                <textarea
                  value={formData.excerpt || ''}
                  onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Content</label>
                <textarea
                  value={formData.content || ''}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  rows={8}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Tags</label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {formData.tags?.map((tag, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800"
                    >
                      {tag}
                      <button
                        onClick={() => handleRemoveTag(tag)}
                        className="ml-1 text-blue-600 hover:text-blue-800"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    placeholder="Add a tag"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    onKeyPress={(e) => e.key === 'Enter' && handleAddTag()}
                  />
                  <button
                    onClick={handleAddTag}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                  >
                    Add
                  </button>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.featured || false}
                    onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">Featured Post</span>
                </label>
              </div>
              
              <div className="flex justify-end space-x-3 pt-4">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSavePost}
                  disabled={isUploading}
                  className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                >
                  {isUploading && (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  )}
                  <span>{isUploading ? 'Uploading...' : (selectedPost ? 'Update' : 'Create') + ' Post'}</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {selectedPost && (
                <>
                  <div className="flex items-start space-x-4">
                    <img
                      src={selectedPost.imageUrl}
                      alt={selectedPost.title}
                      className="w-32 h-32 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">{selectedPost.title}</h3>
                      <p className="text-gray-600 mb-3">{selectedPost.excerpt}</p>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span className="flex items-center">
                          <FiUser className="w-4 h-4 mr-1" />
                          {selectedPost.author}
                        </span>
                        <span className="flex items-center">
                          <FiClock className="w-4 h-4 mr-1" />
                          {selectedPost.readTime}
                        </span>
                        <span className="flex items-center">
                          <FiCalendar className="w-4 h-4 mr-1" />
                          {selectedPost.publishedAt ? new Date(selectedPost.publishedAt).toLocaleDateString() : 'Draft'}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Category</label>
                      <p className="text-sm text-gray-900 capitalize">{selectedPost.category}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Status</label>
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadge(selectedPost.status)}`}>
                        {selectedPost.status}
                      </span>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Featured</label>
                      <p className="text-sm text-gray-900">{selectedPost.featured ? 'Yes' : 'No'}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Slug</label>
                      <p className="text-sm text-gray-900 font-mono">{selectedPost.slug}</p>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Content</label>
                    <div className="text-sm text-gray-900 bg-gray-50 p-4 rounded-lg max-h-40 overflow-y-auto">
                      {selectedPost.content}
                    </div>
                  </div>
                  
                  {selectedPost.tags.length > 0 && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Tags</label>
                      <div className="flex flex-wrap gap-2">
                        {selectedPost.tags.map((tag, index) => (
                          <span key={index} className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-700">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default BlogManagement;
