import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import Modal from '../Modal';
import { FiEdit, FiTrash2, FiEye, FiSearch, FiPlus, FiImage, FiUpload, FiTag, FiX } from 'react-icons/fi';

interface GalleryItem {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  category: string;
  tags: string[];
  featured: boolean;
  status: 'active' | 'inactive';
  uploadedAt: string;
  uploadedBy: string;
  alt: string;
}

const GalleryManagement = () => {
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([
    {
      id: '1',
      title: 'Mountain Sunrise',
      description: 'Beautiful sunrise over the mountain peaks',
      imageUrl: '/Gallery01.jpg',
      category: 'nature',
      tags: ['mountain', 'sunrise', 'landscape'],
      featured: true,
      status: 'active',
      uploadedAt: '2024-01-15',
      uploadedBy: 'Admin',
      alt: 'Mountain sunrise landscape'
    },
    {
      id: '2',
      title: 'Tropical Beach',
      description: 'Crystal clear waters and white sand beach',
      imageUrl: '/TropicalParadise.jpg',
      category: 'beach',
      tags: ['beach', 'tropical', 'ocean'],
      featured: true,
      status: 'active',
      uploadedAt: '2024-02-01',
      uploadedBy: 'Admin',
      alt: 'Tropical beach paradise'
    },
    {
      id: '3',
      title: 'Ancient Temple',
      description: 'Historic temple architecture in Southeast Asia',
      imageUrl: '/Our Vision.jpg',
      category: 'culture',
      tags: ['temple', 'architecture', 'history'],
      featured: false,
      status: 'active',
      uploadedAt: '2024-02-15',
      uploadedBy: 'Admin',
      alt: 'Ancient temple architecture'
    },
    {
      id: '4',
      title: 'Desert Dunes',
      description: 'Golden sand dunes in the desert',
      imageUrl: '/Gallery05.jpg',
      category: 'adventure',
      tags: ['desert', 'dunes', 'adventure'],
      featured: false,
      status: 'inactive',
      uploadedAt: '2024-03-10',
      uploadedBy: 'Admin',
      alt: 'Desert sand dunes'
    }
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [formData, setFormData] = useState<Partial<GalleryItem>>({});
  const [newTag, setNewTag] = useState('');
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const galleryRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (galleryRef.current) {
      gsap.fromTo(
        galleryRef.current.querySelectorAll('.gallery-item'),
        { y: 20, opacity: 0, scale: 0.95 },
        { y: 0, opacity: 1, scale: 1, duration: 0.6, stagger: 0.1, ease: "power3.out" }
      );
    }
  }, []);

  const filteredItems = galleryItems.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
    const matchesCategory = categoryFilter === 'all' || item.category === categoryFilter;
    
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const handleEditItem = (item: GalleryItem) => {
    setSelectedItem(item);
    setFormData(item);
    setIsEditMode(true);
    setIsModalOpen(true);
  };

  const handleDeleteItem = (itemId: string) => {
    if (window.confirm('Are you sure you want to delete this image?')) {
      setGalleryItems(galleryItems.filter(item => item.id !== itemId));
    }
  };

  const handleViewItem = (item: GalleryItem) => {
    setSelectedItem(item);
    setIsEditMode(false);
    setIsModalOpen(true);
  };

  const handleAddItem = () => {
    setSelectedItem(null);
    setFormData({
      title: '',
      description: '',
      imageUrl: '',
      category: 'nature',
      tags: [],
      featured: false,
      status: 'inactive',
      alt: ''
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

  const handleSaveItem = async () => {
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

      if (selectedItem) {
        // Update existing item
        setGalleryItems(galleryItems.map(item => 
          item.id === selectedItem.id ? { ...item, ...formData, imageUrl } : item
        ));
      } else {
        // Add new item
        const newItem: GalleryItem = {
          id: Date.now().toString(),
          title: formData.title || '',
          description: formData.description || '',
          imageUrl: imageUrl,
          category: formData.category || 'nature',
          tags: formData.tags || [],
          featured: formData.featured || false,
          status: formData.status || 'inactive',
          uploadedAt: new Date().toISOString().split('T')[0],
          uploadedBy: 'Admin',
          alt: formData.alt || ''
        };
        setGalleryItems([...galleryItems, newItem]);
      }
    }
    setIsModalOpen(false);
    setSelectedItem(null);
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
      active: 'bg-green-100 text-green-800',
      inactive: 'bg-red-100 text-red-800'
    };
    return statusClasses[status as keyof typeof statusClasses] || statusClasses.inactive;
  };

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'nature', label: 'Nature' },
    { value: 'beach', label: 'Beach' },
    { value: 'culture', label: 'Culture' },
    { value: 'adventure', label: 'Adventure' },
    { value: 'urban', label: 'Urban' },
    { value: 'food', label: 'Food' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div className="mb-4">
          <h2 className="text-2xl font-bold text-gray-900">Gallery Management</h2>
          <p className="text-gray-600">Manage images and visual content</p>
        </div>
        <button
          onClick={handleAddItem}
          className="mt-4 sm:mt-0 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center space-x-2"
        >
          <FiPlus className="w-4 h-4" />
          <span>Add Image</span>
        </button>
      </div>

      {/* Enhanced Filters */}
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl shadow-sm border border-purple-100 p-6">
        <div className="flex items-center space-x-2 mb-4">
          <FiImage className="w-5 h-5 text-purple-600" />
          <h3 className="text-lg font-semibold text-gray-800">Filter Gallery</h3>
        </div>
        
        <div className="space-y-4">
          {/* Enhanced Search - Full Width */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Search Images</label>
            <div className="relative group">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400 w-5 h-5 group-focus-within:text-purple-600 transition-colors" />
              <input
                type="text"
                placeholder="Search by title, tags, or description..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border-2 border-purple-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-white shadow-sm transition-all duration-200 hover:border-purple-300"
              />
            </div>
          </div>

          {/* Status and Category Filters - Same Line */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Enhanced Status Filter */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Image Status</label>
              <div className="relative">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-purple-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-white shadow-sm transition-all duration-200 hover:border-purple-300 appearance-none cursor-pointer"
                >
                  <option value="all">All Images</option>
                  <option value="active">Active Images</option>
                  <option value="inactive">Inactive Images</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Enhanced Category Filter */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Image Category</label>
              <div className="relative">
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-purple-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-white shadow-sm transition-all duration-200 hover:border-purple-300 appearance-none cursor-pointer"
                >
                  {categories.map(category => (
                    <option key={category.value} value={category.value}>
                      {category.value === 'all' ? 'All Categories' : 
                       category.value === 'nature' ? 'Nature' :
                       category.value === 'beach' ? 'Beach' :
                       category.value === 'culture' ? 'Culture' :
                       category.value === 'adventure' ? 'Adventure' :
                       category.value === 'urban' ? 'Urban' :
                       category.value === 'food' ? 'Food' : category.label}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
              <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
              <span>{filteredItems.length} images found</span>
            </span>
            {(searchQuery || statusFilter !== 'all' || categoryFilter !== 'all') && (
              <button
                onClick={() => {
                  setSearchQuery('');
                  setStatusFilter('all');
                  setCategoryFilter('all');
                }}
                className="text-purple-600 hover:text-purple-800 font-medium transition-colors"
              >
                Clear filters
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Gallery Grid */}
      <div ref={galleryRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredItems.map((item) => (
          <div key={item.id} className="gallery-item bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200">
            <div className="relative group">
              <img
                src={item.imageUrl}
                alt={item.alt}
                className="w-full h-48 object-cover"
              />
              {item.featured && (
                <div className="absolute top-3 left-3 bg-blue-600 text-white px-2 py-1 rounded text-xs font-medium">
                  Featured
                </div>
              )}
              <div className="absolute top-3 right-3 flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <button
                  onClick={() => handleViewItem(item)}
                  className="p-1 bg-white/90 backdrop-blur-sm rounded text-gray-600 hover:text-blue-600"
                  title="View"
                >
                  <FiEye className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleEditItem(item)}
                  className="p-1 bg-white/90 backdrop-blur-sm rounded text-gray-600 hover:text-indigo-600"
                  title="Edit"
                >
                  <FiEdit className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDeleteItem(item.id)}
                  className="p-1 bg-white/90 backdrop-blur-sm rounded text-gray-600 hover:text-red-600"
                  title="Delete"
                >
                  <FiTrash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
            
            <div className="p-4">
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-sm font-semibold text-gray-900 line-clamp-1">{item.title}</h3>
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadge(item.status)}`}>
                  {item.status}
                </span>
              </div>
              
              <p className="text-gray-600 text-xs mb-3 line-clamp-2">{item.description}</p>
              
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span className="capitalize">{item.category}</span>
                <span>{new Date(item.uploadedAt).toLocaleDateString()}</span>
              </div>
              
              {item.tags.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-1">
                  {item.tags.slice(0, 3).map((tag, index) => (
                    <span key={index} className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-700">
                      <FiTag className="w-3 h-3 mr-1" />
                      {tag}
                    </span>
                  ))}
                  {item.tags.length > 3 && (
                    <span className="text-xs text-gray-500">+{item.tags.length - 3} more</span>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Gallery Item Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={isEditMode ? (selectedItem ? 'Edit Image' : 'Add Image') : 'Image Details'}
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
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                  <select
                    value={formData.category || 'nature'}
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
                {/* Image Upload Section */}
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Gallery Image</label>
                  
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
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-purple-400 transition-colors">
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
                        <p className="text-sm text-gray-600 mb-2">Upload gallery image</p>
                        <button
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
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
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Alt Text</label>
                  <input
                    type="text"
                    value={formData.alt || ''}
                    onChange={(e) => setFormData({ ...formData, alt: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                  <select
                    value={formData.status || 'inactive'}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as GalleryItem['status'] })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
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
                  rows={3}
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
                  <span className="ml-2 text-sm text-gray-700">Featured Image</span>
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
                  onClick={handleSaveItem}
                  disabled={isUploading}
                  className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                >
                  {isUploading && (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  )}
                  <span>{isUploading ? 'Uploading...' : (selectedItem ? 'Update' : 'Add') + ' Image'}</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {selectedItem && (
                <>
                  <div className="flex items-start space-x-4">
                    <img
                      src={selectedItem.imageUrl}
                      alt={selectedItem.alt}
                      className="w-32 h-32 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">{selectedItem.title}</h3>
                      <p className="text-gray-600 mb-3">{selectedItem.description}</p>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span className="capitalize">{selectedItem.category}</span>
                        <span>{new Date(selectedItem.uploadedAt).toLocaleDateString()}</span>
                        <span>by {selectedItem.uploadedBy}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Status</label>
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadge(selectedItem.status)}`}>
                        {selectedItem.status}
                      </span>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Featured</label>
                      <p className="text-sm text-gray-900">{selectedItem.featured ? 'Yes' : 'No'}</p>
                    </div>
                  </div>
                  
                  {selectedItem.tags.length > 0 && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Tags</label>
                      <div className="flex flex-wrap gap-2">
                        {selectedItem.tags.map((tag, index) => (
                          <span key={index} className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-700">
                            <FiTag className="w-3 h-3 mr-1" />
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

export default GalleryManagement;
