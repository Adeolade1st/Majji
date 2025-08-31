import React, { useState } from 'react';
import { ArrowLeft, Upload, DollarSign, Tag, Globe, FileText, Image, Save, X, AlertCircle, CheckCircle, Loader2 } from 'lucide-react';

interface AddProductPageProps {
  onNavigate: (page: string) => void;
}

const AddProductPage: React.FC<AddProductPageProps> = ({ onNavigate }) => {
  // File upload constants
  const MAX_FILE_SIZE_MB = 10;
  const MAX_FILES = 10;
  const ALLOWED_FILE_TYPES = [
    'image/jpeg', 'image/jpg', 'image/png', 'image/gif',
    'application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  ];

  // File input reference
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    price: '',
    tags: '',
    licenseTypes: ['Standard'],
    features: [''],
    demoUrl: '',
    documentationUrl: '',
    supportEmail: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadedImages, setUploadedImages] = useState<Array<{url: string, name: string}>>([]);

  // File upload state
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [fileUploadErrors, setFileUploadErrors] = useState<string[]>([]);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploadingFiles, setIsUploadingFiles] = useState(false);

  const categories = [
    'Web Application',
    'Mobile App',
    'WordPress Plugin',
    'API/Service',
    'Component Library',
    'Chrome Extension',
    'Desktop Application'
  ];

  const licenseOptions = ['Standard', 'Extended', 'Enterprise', 'White Label'];

  // File handling functions
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setFileUploadErrors([]);
    setUploadProgress(0);

    // Validate number of files
    if (files.length > MAX_FILES) {
      setFileUploadErrors([`Maximum ${MAX_FILES} files allowed`]);
      return;
    }

    const validFiles: File[] = [];
    const errors: string[] = [];

    files.forEach((file) => {
      // Validate file type
      if (!ALLOWED_FILE_TYPES.includes(file.type)) {
        errors.push(`${file.name}: Unsupported file type`);
        return;
      }

      // Validate file size
      if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
        errors.push(`${file.name}: File size exceeds ${MAX_FILE_SIZE_MB}MB limit`);
        return;
      }

      validFiles.push(file);
    });

    setSelectedFiles(validFiles);
    setFileUploadErrors(errors);
  };

  const handleRemoveFile = (index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handleUploadFiles = async () => {
    if (selectedFiles.length === 0) return;

    setIsUploadingFiles(true);
    setUploadProgress(0);
    setFileUploadErrors([]);

    try {
      // Simulate file upload with progress
      for (let i = 0; i < selectedFiles.length; i++) {
        const file = selectedFiles[i];
        
        // Simulate upload progress
        const progressIncrement = 100 / selectedFiles.length;
        const startProgress = i * progressIncrement;
        
        // Simulate upload with XMLHttpRequest for progress tracking
        await new Promise<void>((resolve, reject) => {
          const xhr = new XMLHttpRequest();
          
          xhr.upload.addEventListener('progress', (event) => {
            if (event.lengthComputable) {
              const fileProgress = (event.loaded / event.total) * progressIncrement;
              setUploadProgress(startProgress + fileProgress);
            }
          });

          xhr.addEventListener('load', () => {
            if (xhr.status === 200) {
              // Simulate successful upload - add to uploaded images
              const imageUrl = URL.createObjectURL(file);
              setUploadedImages(prev => [...prev, { url: imageUrl, name: file.name }]);
              resolve();
            } else {
              reject(new Error(`Upload failed for ${file.name}`));
            }
          });

          xhr.addEventListener('error', () => {
            reject(new Error(`Network error uploading ${file.name}`));
          });

          // Simulate upload delay
          setTimeout(() => {
            xhr.dispatchEvent(new Event('load'));
          }, 1000 + Math.random() * 1000);

          // Create mock request
          const formData = new FormData();
          formData.append('file', file);
          xhr.open('POST', '/api/upload'); // Mock endpoint
        });
      }

      // Upload complete
      setUploadProgress(100);
      setSelectedFiles([]);
      
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }

    } catch (error) {
      setFileUploadErrors([error instanceof Error ? error.message : 'Upload failed']);
    } finally {
      setIsUploadingFiles(false);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) newErrors.name = 'Product name is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.category) newErrors.category = 'Category is required';
    if (!formData.price || isNaN(Number(formData.price)) || Number(formData.price) <= 0) {
      newErrors.price = 'Valid price is required';
    }
    if (!formData.tags.trim()) newErrors.tags = 'At least one tag is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Success feedback
      alert('Product added successfully! It will be reviewed and published within 24 hours.');
      onNavigate('dashboard');
    } catch (error) {
      alert('Failed to add product. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const addFeature = () => {
    setFormData(prev => ({
      ...prev,
      features: [...prev.features, '']
    }));
  };

  const removeFeature = (index: number) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index)
    }));
  };

  const updateFeature = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.map((feature, i) => i === index ? value : feature)
    }));
  };

  const toggleLicense = (license: string) => {
    setFormData(prev => ({
      ...prev,
      licenseTypes: prev.licenseTypes.includes(license)
        ? prev.licenseTypes.filter(l => l !== license)
        : [...prev.licenseTypes, license]
    }));
  };

  return (
    <div className="min-h-screen bg-bg-light">
      {/* Header */}
      <div className="bg-bg-white border-b border-border-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <button
            onClick={() => onNavigate('dashboard')}
            className="flex items-center space-x-2 text-primary-action hover:text-primary-action-dark transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Dashboard</span>
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-text-darkest mb-2">Add New Product</h1>
          <p className="text-text-dark">Create a new product listing to sell on the marketplace</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information */}
          <div className="bg-bg-white rounded-lg shadow-sm border border-border-light p-6">
            <h2 className="text-xl font-semibold text-text-darkest mb-6">Basic Information</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-text-darkest mb-2">
                  Product Name *
                </label>
                <input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className={`w-full px-3 py-3 border rounded-lg focus:ring-2 focus:ring-primary-action focus:border-primary-action transition-colors ${
                    errors.name ? 'border-error' : 'border-border-medium'
                  }`}
                  placeholder="Enter product name"
                />
                {errors.name && <p className="text-error text-sm mt-1">{errors.name}</p>}
              </div>

              <div>
                <label htmlFor="category" className="block text-sm font-medium text-text-darkest mb-2">
                  Category *
                </label>
                <select
                  id="category"
                  value={formData.category}
                  onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                  className={`w-full px-3 py-3 border rounded-lg focus:ring-2 focus:ring-primary-action focus:border-primary-action transition-colors ${
                    errors.category ? 'border-error' : 'border-border-medium'
                  }`}
                >
                  <option value="">Select a category</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
                {errors.category && <p className="text-error text-sm mt-1">{errors.category}</p>}
              </div>
            </div>

            <div className="mt-6">
              <label htmlFor="description" className="block text-sm font-medium text-text-darkest mb-2">
                Description *
              </label>
              <textarea
                id="description"
                rows={4}
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                className={`w-full px-3 py-3 border rounded-lg focus:ring-2 focus:ring-primary-action focus:border-primary-action transition-colors ${
                  errors.description ? 'border-error' : 'border-border-medium'
                }`}
                placeholder="Describe your product, its features, and benefits"
              />
              {errors.description && <p className="text-error text-sm mt-1">{errors.description}</p>}
            </div>
          </div>

          {/* Pricing & Licensing */}
          <div className="bg-bg-white rounded-lg shadow-sm border border-border-light p-6">
            <h2 className="text-xl font-semibold text-text-darkest mb-6">Pricing & Licensing</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="price" className="block text-sm font-medium text-text-darkest mb-2">
                  Base Price (USD) *
                </label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-text-medium" />
                  <input
                    id="price"
                    type="number"
                    min="1"
                    step="0.01"
                    value={formData.price}
                    onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                    className={`w-full pl-10 pr-3 py-3 border rounded-lg focus:ring-2 focus:ring-primary-action focus:border-primary-action transition-colors ${
                      errors.price ? 'border-error' : 'border-border-medium'
                    }`}
                    placeholder="0.00"
                  />
                </div>
                {errors.price && <p className="text-error text-sm mt-1">{errors.price}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-text-darkest mb-2">
                  License Types
                </label>
                <div className="space-y-2">
                  {licenseOptions.map((license) => (
                    <label key={license} className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.licenseTypes.includes(license)}
                        onChange={() => toggleLicense(license)}
                        className="text-primary-action focus:ring-primary-action border-border-medium rounded"
                      />
                      <span className="text-sm text-text-dark">{license}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Product Details */}
          <div className="bg-bg-white rounded-lg shadow-sm border border-border-light p-6">
            <h2 className="text-xl font-semibold text-text-darkest mb-6">Product Details</h2>
            
            <div className="space-y-6">
              <div>
                <label htmlFor="tags" className="block text-sm font-medium text-text-darkest mb-2">
                  Tags *
                </label>
                <div className="relative">
                  <Tag className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-text-medium" />
                  <input
                    id="tags"
                    type="text"
                    value={formData.tags}
                    onChange={(e) => setFormData(prev => ({ ...prev, tags: e.target.value }))}
                    className={`w-full pl-10 pr-3 py-3 border rounded-lg focus:ring-2 focus:ring-primary-action focus:border-primary-action transition-colors ${
                      errors.tags ? 'border-error' : 'border-border-medium'
                    }`}
                    placeholder="React, TypeScript, Dashboard (comma separated)"
                  />
                </div>
                {errors.tags && <p className="text-error text-sm mt-1">{errors.tags}</p>}
                <p className="text-text-medium text-sm mt-1">Separate tags with commas</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-text-darkest mb-2">
                  Key Features
                </label>
                <div className="space-y-3">
                  {formData.features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <input
                        type="text"
                        value={feature}
                        onChange={(e) => updateFeature(index, e.target.value)}
                        className="flex-1 px-3 py-2 border border-border-medium rounded-lg focus:ring-2 focus:ring-primary-action focus:border-primary-action transition-colors"
                        placeholder="Enter a key feature"
                      />
                      {formData.features.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeFeature(index)}
                          className="p-2 text-text-medium hover:text-error transition-colors"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={addFeature}
                    className="text-primary-action hover:text-primary-action-dark text-sm font-medium transition-colors"
                  >
                    + Add Feature
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Media & Links */}
          <div className="bg-bg-white rounded-lg shadow-sm border border-border-light p-6">
            <h2 className="text-xl font-semibold text-text-darkest mb-6">Media & Links</h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-text-darkest mb-2">
                  Product Images
                </label>
                
                {/* Hidden file input */}
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  accept=".jpg,.jpeg,.png,.gif,.pdf,.doc,.docx,.xls,.xlsx"
                  onChange={handleFileChange}
                  className="hidden"
                  aria-label="Choose files to upload"
                />
                
                <div 
                  className="border-2 border-dashed border-border-medium rounded-lg p-8 text-center hover:border-primary-action transition-colors cursor-pointer"
                  onClick={triggerFileInput}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      triggerFileInput();
                    }
                  }}
                  tabIndex={0}
                  role="button"
                  aria-label="Click to choose files for upload"
                >
                  <Image className="h-12 w-12 text-text-medium mx-auto mb-4" />
                  <p className="text-text-dark mb-2">Upload product screenshots or images</p>
                  <p className="text-text-medium text-sm mb-4">
                    Images (JPG, PNG, GIF), Documents (PDF, DOC, DOCX), Spreadsheets (XLS, XLSX)
                  </p>
                  <p className="text-text-medium text-sm mb-4">Up to {MAX_FILES} files, {MAX_FILE_SIZE_MB}MB each</p>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      triggerFileInput();
                    }}
                    className="bg-primary-action text-text-light px-4 py-2 rounded-lg hover:bg-primary-action-dark transition-colors btn-animate"
                  >
                    Choose Files
                  </button>
                </div>

                {/* File Upload Errors */}
                {fileUploadErrors.length > 0 && (
                  <div className="mt-4 p-4 bg-error-50 border border-error-100 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <AlertCircle className="h-4 w-4 text-error" />
                      <span className="text-sm font-medium text-error">Upload Errors</span>
                    </div>
                    <ul className="text-sm text-error space-y-1">
                      {fileUploadErrors.map((error, index) => (
                        <li key={index}>• {error}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Selected Files Display */}
                {selectedFiles.length > 0 && (
                  <div className="mt-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-medium text-text-darkest">Selected Files ({selectedFiles.length})</h4>
                      <button
                        type="button"
                        onClick={handleUploadFiles}
                        disabled={isUploadingFiles || fileUploadErrors.length > 0}
                        className="bg-success text-text-light px-4 py-2 rounded-lg hover:bg-success-dark transition-colors btn-animate disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                      >
                        {isUploadingFiles ? (
                          <>
                            <Loader2 className="h-4 w-4 animate-spin" />
                            <span>Uploading...</span>
                          </>
                        ) : (
                          <>
                            <Upload className="h-4 w-4" />
                            <span>Upload Files</span>
                          </>
                        )}
                      </button>
                    </div>

                    {/* File List */}
                    <div className="space-y-2 max-h-48 overflow-y-auto">
                      {selectedFiles.map((file, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-bg-light border border-border-light rounded-lg">
                          <div className="flex items-center space-x-3 flex-1 min-w-0">
                            <div className="flex-shrink-0">
                              {file.type.startsWith('image/') ? (
                                <Image className="h-5 w-5 text-primary-action" />
                              ) : (
                                <FileText className="h-5 w-5 text-text-medium" />
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-text-darkest truncate">{file.name}</p>
                              <p className="text-xs text-text-medium">{formatFileSize(file.size)}</p>
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={() => handleRemoveFile(index)}
                            disabled={isUploadingFiles}
                            className="p-1 text-text-medium hover:text-error transition-colors disabled:opacity-50"
                            aria-label={`Remove ${file.name}`}
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                    </div>

                    {/* Upload Progress */}
                    {isUploadingFiles && (
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-text-dark">Uploading files...</span>
                          <span className="text-text-dark">{Math.round(uploadProgress)}%</span>
                        </div>
                        <div className="w-full bg-border-light rounded-full h-2">
                          <div 
                            className="bg-primary-action h-2 rounded-full transition-all duration-300 ease-out"
                            style={{ width: `${uploadProgress}%` }}
                          ></div>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Uploaded Images Display */}
                {uploadedImages.length > 0 && (
                  <div className="mt-4">
                    <div className="flex items-center space-x-2 mb-3">
                      <CheckCircle className="h-4 w-4 text-success" />
                      <h4 className="text-sm font-medium text-text-darkest">Uploaded Files ({uploadedImages.length})</h4>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                      {uploadedImages.map((image, index) => (
                        <div key={index} className="relative group">
                          <div className="aspect-square bg-bg-light border border-border-light rounded-lg overflow-hidden">
                            {image.name.match(/\.(jpg|jpeg|png|gif)$/i) ? (
                              <img 
                                src={image.url} 
                                alt={image.name}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center">
                                <FileText className="h-8 w-8 text-text-medium" />
                              </div>
                            )}
                          </div>
                          <p className="text-xs text-text-medium mt-1 truncate">{image.name}</p>
                          <button
                            type="button"
                            onClick={() => setUploadedImages(prev => prev.filter((_, i) => i !== index))}
                            className="absolute -top-2 -right-2 bg-error text-text-light rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                            aria-label={`Remove ${image.name}`}
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="demoUrl" className="block text-sm font-medium text-text-darkest mb-2">
                    Demo URL (Optional)
                  </label>
                  <div className="relative">
                    <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-text-medium" />
                    <input
                      id="demoUrl"
                      type="url"
                      value={formData.demoUrl}
                      onChange={(e) => setFormData(prev => ({ ...prev, demoUrl: e.target.value }))}
                      className="w-full pl-10 pr-3 py-3 border border-border-medium rounded-lg focus:ring-2 focus:ring-primary-action focus:border-primary-action transition-colors"
                      placeholder="https://demo.yourproduct.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="documentationUrl" className="block text-sm font-medium text-text-darkest mb-2">
                    Documentation URL (Optional)
                  </label>
                  <div className="relative">
                    <FileText className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-text-medium" />
                    <input
                      id="documentationUrl"
                      type="url"
                      value={formData.documentationUrl}
                      onChange={(e) => setFormData(prev => ({ ...prev, documentationUrl: e.target.value }))}
                      className="w-full pl-10 pr-3 py-3 border border-border-medium rounded-lg focus:ring-2 focus:ring-primary-action focus:border-primary-action transition-colors"
                      placeholder="https://docs.yourproduct.com"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Support Information */}
          <div className="bg-bg-white rounded-lg shadow-sm border border-border-light p-6">
            <h2 className="text-xl font-semibold text-text-darkest mb-6">Support Information</h2>
            
            <div>
              <label htmlFor="supportEmail" className="block text-sm font-medium text-text-darkest mb-2">
                Support Email
              </label>
              <input
                id="supportEmail"
                type="email"
                value={formData.supportEmail}
                onChange={(e) => setFormData(prev => ({ ...prev, supportEmail: e.target.value }))}
                className="w-full px-3 py-3 border border-border-medium rounded-lg focus:ring-2 focus:ring-primary-action focus:border-primary-action transition-colors"
                placeholder="support@yourcompany.com"
              />
              <p className="text-text-medium text-sm mt-1">Customers will use this email for product support</p>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-end">
            <button
              type="button"
              onClick={() => onNavigate('dashboard')}
              className="px-6 py-3 border border-border-medium text-text-dark rounded-lg hover:bg-bg-light transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-primary-action text-text-light px-6 py-3 rounded-lg font-medium hover:bg-primary-action-dark transition-colors btn-animate disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-text-light"></div>
                  <span>Adding Product...</span>
                </>
              ) : (
                <>
                  <Save className="h-4 w-4" />
                  <span>Add Product</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProductPage;