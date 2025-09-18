import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import Modal from '../Modal';
import { FiEdit, FiTrash2, FiEye, FiSearch, FiFilter, FiPlus, FiMapPin, FiClock, FiDollarSign, FiUpload, FiX } from 'react-icons/fi';

interface Tour {
  id: string;
  title: string;
  description: string;
  price: number;
  duration: string;
  location: string;
  category: string;
  rating: number;
  image: string;
  status: 'active' | 'inactive' | 'draft';
  featured: boolean;
  maxParticipants: number;
  difficulty: 'easy' | 'medium' | 'hard';
  createdAt: string;
  updatedAt: string;
}

const ToursManagement = () => {
  const [tours, setTours] = useState<Tour[]>([
    {
      id: '1',
      title: 'Bali Adventure',
      description: 'Explore the beautiful beaches and cultural heritage of Bali with our expert guides.',
      price: 899,
      duration: '7 days',
      location: 'Bali, Indonesia',
      category: 'adventure',
      rating: 4.8,
      image: '/Bali.jpg',
      status: 'active',
      featured: true,
      maxParticipants: 20,
      difficulty: 'medium',
      createdAt: '2024-01-15',
      updatedAt: '2024-03-20'
    },
    {
      id: '2',
      title: 'European Grand Tour',
      description: 'Visit the most iconic cities across Europe in this comprehensive 14-day journey.',
      price: 2499,
      duration: '14 days',
      location: 'Multiple Countries',
      category: 'cultural',
      rating: 4.9,
      image: '/MediterraneanCoast.jpg',
      status: 'active',
      featured: true,
      maxParticipants: 15,
      difficulty: 'easy',
      createdAt: '2024-02-01',
      updatedAt: '2024-03-19'
    },
    {
      id: '3',
      title: 'Japan Cultural Experience',
      description: 'Immerse yourself in Japanese culture, from ancient temples to modern cities.',
      price: 1599,
      duration: '10 days',
      location: 'Japan',
      category: 'cultural',
      rating: 4.7,
      image: '/Gallery03.jpg',
      status: 'active',
      featured: false,
      maxParticipants: 12,
      difficulty: 'easy',
      createdAt: '2024-01-20',
      updatedAt: '2024-03-10'
    },
    {
      id: '4',
      title: 'African Safari',
      description: 'Experience the wildlife and natural beauty of Africa on this unforgettable safari.',
      price: 1899,
      duration: '12 days',
      location: 'Kenya, Tanzania',
      category: 'adventure',
      rating: 4.9,
      image: '/African Saffari.jpg',
      status: 'draft',
      featured: false,
      maxParticipants: 8,
      difficulty: 'hard',
      createdAt: '2024-03-15',
      updatedAt: '2024-03-18'
    }
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [selectedTour, setSelectedTour] = useState<Tour | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [formData, setFormData] = useState<Partial<Tour>>({});
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const tableRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (tableRef.current) {
      gsap.fromTo(
        tableRef.current.querySelectorAll('.tour-row'),
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power3.out" }
      );
    }
  }, []);

  const filteredTours = tours.filter(tour => {
    const matchesSearch = tour.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         tour.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         tour.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || tour.status === statusFilter;
    const matchesCategory = categoryFilter === 'all' || tour.category === categoryFilter;
    
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const handleEditTour = (tour: Tour) => {
    setSelectedTour(tour);
    setFormData(tour);
    setIsEditMode(true);
    setIsModalOpen(true);
  };

  const handleDeleteTour = (tourId: string) => {
    if (window.confirm('Are you sure you want to delete this tour?')) {
      setTours(tours.filter(tour => tour.id !== tourId));
    }
  };

  const handleViewTour = (tour: Tour) => {
    setSelectedTour(tour);
    setIsEditMode(false);
    setIsModalOpen(true);
  };

  const handleAddTour = () => {
    setSelectedTour(null);
    setFormData({
      title: '',
      description: '',
      price: 0,
      duration: '',
      location: '',
      category: 'adventure',
      rating: 0,
      image: '',
      status: 'draft',
      featured: false,
      maxParticipants: 10,
      difficulty: 'easy'
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

  const handleSaveTour = async () => {
    if (isEditMode) {
      let imageUrl = formData.image || '';
      
      // Handle image upload if a new image was selected
      if (uploadedImage) {
        try {
          imageUrl = await simulateImageUpload(uploadedImage);
        } catch (error) {
          alert('Failed to upload image. Please try again.');
          return;
        }
      }

      if (selectedTour) {
        // Update existing tour
        setTours(tours.map(tour => 
          tour.id === selectedTour.id ? { 
            ...tour, 
            ...formData, 
            image: imageUrl,
            updatedAt: new Date().toISOString().split('T')[0] 
          } : tour
        ));
      } else {
        // Add new tour
        const newTour: Tour = {
          id: Date.now().toString(),
          title: formData.title || '',
          description: formData.description || '',
          price: formData.price || 0,
          duration: formData.duration || '',
          location: formData.location || '',
          category: formData.category || 'adventure',
          rating: formData.rating || 0,
          image: imageUrl,
          status: formData.status || 'draft',
          featured: formData.featured || false,
          maxParticipants: formData.maxParticipants || 10,
          difficulty: formData.difficulty || 'easy',
          createdAt: new Date().toISOString().split('T')[0],
          updatedAt: new Date().toISOString().split('T')[0]
        };
        setTours([...tours, newTour]);
      }
    }
    setIsModalOpen(false);
    setSelectedTour(null);
    setFormData({});
    setUploadedImage(null);
    setImagePreview(null);
    setIsUploading(false);
  };

  const getStatusBadge = (status: string) => {
    const statusClasses = {
      active: 'bg-green-100 text-green-800',
      inactive: 'bg-red-100 text-red-800',
      draft: 'bg-yellow-100 text-yellow-800'
    };
    return statusClasses[status as keyof typeof statusClasses] || statusClasses.draft;
  };

  const getDifficultyBadge = (difficulty: string) => {
    const difficultyClasses = {
      easy: 'bg-green-100 text-green-800',
      medium: 'bg-yellow-100 text-yellow-800',
      hard: 'bg-red-100 text-red-800'
    };
    return difficultyClasses[difficulty as keyof typeof difficultyClasses] || difficultyClasses.easy;
  };

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'adventure', label: 'Adventure' },
    { value: 'cultural', label: 'Cultural' },
    { value: 'relaxation', label: 'Relaxation' },
    { value: 'nature', label: 'Nature' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div className="mb-4">
          <h2 className="text-2xl font-bold text-gray-900">Tours & Packages Management</h2>
          <p className="text-gray-600">Manage tour packages and travel experiences</p>
        </div>
        <button
          onClick={handleAddTour}
          className="mt-4 sm:mt-0 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center space-x-2"
        >
          <FiPlus className="w-4 h-4" />
          <span>Add Tour</span>
        </button>
      </div>

      {/* Enhanced Filters */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl shadow-sm border border-blue-100 p-6">
        <div className="flex items-center space-x-2 mb-4">
          <FiFilter className="w-5 h-5 text-blue-600" />
          <h3 className="text-lg font-semibold text-gray-800">Filter Tours</h3>
        </div>
        
        <div className="space-y-4">
          {/* Enhanced Search - Full Width */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Search Tours</label>
            <div className="relative group">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400 w-5 h-5 group-focus-within:text-blue-600 transition-colors" />
              <input
                type="text"
                placeholder="Search by title, location, or description..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border-2 border-blue-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white shadow-sm transition-all duration-200 hover:border-blue-300"
              />
            </div>
          </div>

          {/* Status and Category Filters - Same Line */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Enhanced Status Filter */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Tour Status</label>
              <div className="relative">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-blue-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white shadow-sm transition-all duration-200 hover:border-blue-300 appearance-none cursor-pointer"
                >
                  <option value="all">All Status</option>
                  <option value="active">Active Tours</option>
                  <option value="inactive">Inactive Tours</option>
                  <option value="draft">Draft Tours</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Enhanced Category Filter */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Tour Category</label>
              <div className="relative">
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-blue-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white shadow-sm transition-all duration-200 hover:border-blue-300 appearance-none cursor-pointer"
                >
                  {categories.map(category => (
                    <option key={category.value} value={category.value}>
                      {category.value === 'all' ? 'All Categories' : 
                       category.value === 'adventure' ? 'Adventure' :
                       category.value === 'cultural' ? 'Cultural' :
                       category.value === 'relaxation' ? 'Relaxation' :
                       category.value === 'nature' ? 'Nature' : category.label}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Filter Summary */}
        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center space-x-4 text-sm text-gray-600">
            <span className="flex items-center space-x-1">
              <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
              <span>{filteredTours.length} tours found</span>
            </span>
            {(searchQuery || statusFilter !== 'all' || categoryFilter !== 'all') && (
              <button
                onClick={() => {
                  setSearchQuery('');
                  setStatusFilter('all');
                  setCategoryFilter('all');
                }}
                className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
              >
                Clear filters
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Tours Grid */}
      <div ref={tableRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTours.map((tour) => (
          <div key={tour.id} className="tour-row bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200">
            <div className="relative">
              <img
                src={tour.image}
                alt={tour.title}
                className="w-full h-48 object-cover"
              />
              {tour.featured && (
                <div className="absolute top-3 left-3 bg-blue-600 text-white px-2 py-1 rounded text-xs font-medium">
                  Featured
                </div>
              )}
              <div className="absolute top-3 right-3 flex space-x-1">
                <button
                  onClick={() => handleViewTour(tour)}
                  className="p-1 bg-white/90 backdrop-blur-sm rounded text-gray-600 hover:text-blue-600"
                  title="View"
                >
                  <FiEye className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleEditTour(tour)}
                  className="p-1 bg-white/90 backdrop-blur-sm rounded text-gray-600 hover:text-indigo-600"
                  title="Edit"
                >
                  <FiEdit className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDeleteTour(tour.id)}
                  className="p-1 bg-white/90 backdrop-blur-sm rounded text-gray-600 hover:text-red-600"
                  title="Delete"
                >
                  <FiTrash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
            
            <div className="p-4">
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">{tour.title}</h3>
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadge(tour.status)}`}>
                  {tour.status}
                </span>
              </div>
              
              <p className="text-gray-600 text-sm mb-3 line-clamp-2">{tour.description}</p>
              
              <div className="flex items-center text-sm text-gray-500 mb-3 space-x-4">
                <div className="flex items-center">
                  <FiMapPin className="w-4 h-4 mr-1" />
                  {tour.location}
                </div>
                <div className="flex items-center">
                  <FiClock className="w-4 h-4 mr-1" />
                  {tour.duration}
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="text-lg font-bold text-blue-600">${tour.price}</span>
                  <span className="text-sm text-gray-500">/person</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-500">⭐ {tour.rating}</span>
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getDifficultyBadge(tour.difficulty)}`}>
                    {tour.difficulty}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Tour Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={isEditMode ? (selectedTour ? 'Edit Tour' : 'Add Tour') : 'Tour Details'}
        size="lg"
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
                  <label className="block text-sm font-medium text-gray-700 mb-2">Price</label>
                  <input
                    type="number"
                    value={formData.price || ''}
                    onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Duration</label>
                  <input
                    type="text"
                    value={formData.duration || ''}
                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                  <input
                    type="text"
                    value={formData.location || ''}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                  <select
                    value={formData.category || 'adventure'}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="adventure">Adventure</option>
                    <option value="cultural">Cultural</option>
                    <option value="relaxation">Relaxation</option>
                    <option value="nature">Nature</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Difficulty</label>
                  <select
                    value={formData.difficulty || 'easy'}
                    onChange={(e) => setFormData({ ...formData, difficulty: e.target.value as Tour['difficulty'] })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Max Participants</label>
                  <input
                    type="number"
                    value={formData.maxParticipants || ''}
                    onChange={(e) => setFormData({ ...formData, maxParticipants: Number(e.target.value) })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                  <select
                    value={formData.status || 'draft'}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as Tour['status'] })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="draft">Draft</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  value={formData.description || ''}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              {/* Image Upload Section */}
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Tour Image</label>
                
                {/* Image Preview */}
                {(imagePreview || formData.image) && (
                  <div className="mb-4">
                    <div className="relative inline-block">
                      <img
                        src={imagePreview || formData.image}
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
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  
                  {!imagePreview && !formData.image ? (
                    <div>
                      <FiUpload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-600 mb-2">Upload tour image</p>
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
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
                    value={formData.image || ''}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    placeholder="https://example.com/image.jpg"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
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
                  <span className="ml-2 text-sm text-gray-700">Featured Tour</span>
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
                  onClick={handleSaveTour}
                  disabled={isUploading}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                >
                  {isUploading && (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  )}
                  <span>{isUploading ? 'Uploading...' : (selectedTour ? 'Update' : 'Create') + ' Tour'}</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {selectedTour && (
                <>
                  <div className="flex items-start space-x-4">
                    <img
                      src={selectedTour.image}
                      alt={selectedTour.title}
                      className="w-24 h-24 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">{selectedTour.title}</h3>
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <span className="flex items-center">
                          <FiMapPin className="w-4 h-4 mr-1" />
                          {selectedTour.location}
                        </span>
                        <span className="flex items-center">
                          <FiClock className="w-4 h-4 mr-1" />
                          {selectedTour.duration}
                        </span>
                        <span className="flex items-center">
                          <FiDollarSign className="w-4 h-4 mr-1" />
                          ${selectedTour.price}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Category</label>
                      <p className="text-sm text-gray-900 capitalize">{selectedTour.category}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Difficulty</label>
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getDifficultyBadge(selectedTour.difficulty)}`}>
                        {selectedTour.difficulty}
                      </span>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Status</label>
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadge(selectedTour.status)}`}>
                        {selectedTour.status}
                      </span>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Max Participants</label>
                      <p className="text-sm text-gray-900">{selectedTour.maxParticipants}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Rating</label>
                      <p className="text-sm text-gray-900">⭐ {selectedTour.rating}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Featured</label>
                      <p className="text-sm text-gray-900">{selectedTour.featured ? 'Yes' : 'No'}</p>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Description</label>
                    <p className="text-sm text-gray-900 mt-1">{selectedTour.description}</p>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default ToursManagement;
