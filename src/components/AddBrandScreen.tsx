import { useState, useRef } from 'react'
import { ArrowLeft, Upload, Shield, Globe, Building, FileText, CheckCircle, Search } from 'lucide-react'
import React from 'react'

interface AddBrandScreenProps {
  onBack: () => void
  onStartScan: (data: BrandData) => void
  demoDataFilled?: boolean
}

interface BrandData {
  brandName: string
  primaryDomain: string
  category: string
  logo?: File
}

const AddBrandScreen = ({ onBack, onStartScan, demoDataFilled = false }: AddBrandScreenProps) => {
  const [formData, setFormData] = useState<BrandData>({
    brandName: '',
    primaryDomain: '',
    category: ''
  })
  const [logoFile, setLogoFile] = useState<File | null>(null)
  const [logoPreview, setLogoPreview] = useState<string>('')
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Demo data for testing
  const demoFormData: BrandData = {
    brandName: 'Casino Royale',
    primaryDomain: 'casinoroyale.com',
    category: 'online-casino'
  }

  // Auto-fill with demo data when enabled
  React.useEffect(() => {
    if (demoDataFilled) {
      setFormData(demoFormData)
      setErrors({})
    }
  }, [demoDataFilled])

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setLogoFile(file)
      setFormData(prev => ({ ...prev, logo: file }))
      
      // Create preview URL
      const reader = new FileReader()
      reader.onload = (e) => {
        setLogoPreview(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.brandName.trim()) {
      newErrors.brandName = 'Brand name is required'
    }

    if (!formData.primaryDomain.trim()) {
      newErrors.primaryDomain = 'Primary domain is required'
    } else if (!/^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9]\.[a-zA-Z]{2,}$/.test(formData.primaryDomain)) {
      newErrors.primaryDomain = 'Please enter a valid domain (e.g., example.com)'
    }

    if (!formData.category) {
      newErrors.category = 'Please select a category'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      onStartScan(formData)
    }, 2000)
  }

  const removeLogo = () => {
    setLogoFile(null)
    setLogoPreview('')
    setFormData(prev => ({ ...prev, logo: undefined }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            <button
              onClick={onBack}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors mr-6"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back</span>
            </button>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">iGTD</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Add Your Brand for Free Scan
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Enter your brand details to start a comprehensive scan for phishing domains and brand protection threats.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Brand Name */}
            <div>
              <label htmlFor="brandName" className="block text-sm font-medium text-gray-700 mb-2">
                Brand Name *
              </label>
              <input
                type="text"
                id="brandName"
                value={formData.brandName}
                onChange={(e) => handleInputChange('brandName', e.target.value)}
                className={`input-field ${errors.brandName ? 'border-red-500 focus:ring-red-500' : ''}`}
                placeholder="Enter your brand name"
              />
              {errors.brandName && <p className="text-red-500 text-sm mt-1">{errors.brandName}</p>}
            </div>

            {/* Primary Domain */}
            <div>
              <label htmlFor="primaryDomain" className="block text-sm font-medium text-gray-700 mb-2">
                Primary Domain *
              </label>
              <input
                type="text"
                id="primaryDomain"
                value={formData.primaryDomain}
                onChange={(e) => handleInputChange('primaryDomain', e.target.value)}
                className={`input-field ${errors.primaryDomain ? 'border-red-500 focus:ring-red-500' : ''}`}
                placeholder="example.com"
              />
              {errors.primaryDomain && <p className="text-red-500 text-sm mt-1">{errors.primaryDomain}</p>}
              <p className="text-sm text-gray-500 mt-1">
                Enter your main domain without http:// or www
              </p>
            </div>

            {/* Category */}
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                Category *
              </label>
              <select
                id="category"
                value={formData.category}
                onChange={(e) => handleInputChange('category', e.target.value)}
                className={`input-field ${errors.category ? 'border-red-500 focus:ring-red-500' : ''}`}
              >
                <option value="">Select your category</option>
                <option value="casino">Casino</option>
                <option value="sportsbook">Sportsbook</option>
                <option value="affiliate">Affiliate</option>
              </select>
              {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category}</p>}
            </div>

            {/* Logo Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Brand Logo (Optional)
              </label>
              <div className="space-y-4">
                {!logoPreview ? (
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-primary-300 transition-colors">
                    <input
                      type="file"
                      id="logo"
                      accept="image/*"
                      onChange={handleLogoChange}
                      className="hidden"
                    />
                    <label htmlFor="logo" className="cursor-pointer">
                      <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-600">
                        Click to upload your brand logo
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        PNG, JPG up to 5MB
                      </p>
                    </label>
                  </div>
                ) : (
                  <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                    <img
                      src={logoPreview}
                      alt="Brand logo preview"
                      className="w-16 h-16 object-contain rounded"
                    />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">
                        {logoFile?.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {(logoFile?.size || 0) / 1024 / 1024} MB
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={removeLogo}
                      className="text-red-500 hover:text-red-700 text-sm"
                    >
                      Remove
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-6">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full btn-primary text-lg py-4 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 disabled:transform-none disabled:shadow-none"
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Preparing Scan...</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center space-x-2">
                    <Search className="w-5 h-5" />
                    <span>Run Free Scan</span>
                  </div>
                )}
              </button>
            </div>
          </form>

          {/* Info Section */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="text-sm font-medium text-blue-900 mb-2">
                What happens during the scan?
              </h3>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Scans for phishing domains targeting your brand</li>
                <li>• Identifies lookalike domains and typosquatting</li>
                <li>• Checks for brand impersonation across the web</li>
                <li>• Provides detailed threat analysis report</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default AddBrandScreen 