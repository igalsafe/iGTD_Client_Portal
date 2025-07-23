import { useState, useRef } from 'react'
import { 
  ArrowLeft, 
  Edit, 
  Save, 
  Plus, 
  Trash2, 
  Copy, 
  Eye, 
  EyeOff, 
  Download,
  Upload,
  Shield,
  Bell,
  Globe,
  Settings,
  CheckCircle,
  AlertCircle,
  ExternalLink,
  Clock
} from 'lucide-react'
import React from 'react'

interface BrandManagementScreenProps {
  onBack: () => void
  onSave: (brandData: BrandData) => void
  demoDataFilled?: boolean
}

interface BrandData {
  id: string
  name: string
  logo?: File | string
  domains: Domain[]
  alertSettings: AlertSettings
  apiKey?: string
  plan: 'basic' | 'pro' | 'enterprise' | 'premium'
}

interface Domain {
  id: string
  domain: string
  status: 'active' | 'inactive' | 'pending'
  addedDate: string
  lastScan?: string
  threatCount?: number
}

interface AlertSettings {
  email: boolean
  webhook: boolean
  webhookUrl?: string
  slack: boolean
  slackWebhook?: string
  telegram: boolean
  telegramBotToken?: string
  telegramChatId?: string
  frequency: 'immediate' | 'hourly' | 'daily'
  severity: 'all' | 'high' | 'high_medium'
}

const BrandManagementScreen = ({ onBack, onSave, demoDataFilled = false }: BrandManagementScreenProps) => {
  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [showApiKey, setShowApiKey] = useState(false)
  const [newDomain, setNewDomain] = useState('')
  const [isAddingDomain, setIsAddingDomain] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Mock brand data
  const [brandData, setBrandData] = useState<BrandData>({
    id: 'brand1',
    name: 'Casino Royale',
    logo: '/api/logos/casino-royale.png',
    plan: 'enterprise',
    domains: [
      {
        id: '1',
        domain: 'casinoroyale.com',
        status: 'active',
        addedDate: '2024-01-15',
        lastScan: '2024-07-21 14:30',
        threatCount: 2
      },
      {
        id: '2',
        domain: 'casinoroyale.net',
        status: 'active',
        addedDate: '2024-02-20',
        lastScan: '2024-07-21 10:15',
        threatCount: 0
      },
      {
        id: '3',
        domain: 'casinoroyale.org',
        status: 'inactive',
        addedDate: '2024-03-10',
        lastScan: '2024-07-18 16:45',
        threatCount: 1
      }
    ],
    alertSettings: {
      email: true,
      webhook: false,
      webhookUrl: '',
      slack: true,
      slackWebhook: 'https://hooks.slack.com/services/T00000000/B00000000/XXXXXXXXXXXXXXXXXXXXXXXX',
      telegram: false,
      telegramBotToken: '',
      telegramChatId: '',
      frequency: 'immediate',
      severity: 'high'
    },
    apiKey: 'igtd_live_sk_test_51H7X8Y9Z0A1B2C3D4E5F6G7H8I9J0K1L2M3N4O5P6Q7R8S9T0U1V2W3X4Y5Z6'
  })

  // Demo data for testing
  const demoBrandData: BrandData = {
    ...brandData,
    name: 'Lucky Stars Casino',
    domains: [
      {
        id: '1',
        domain: 'luckystars.com',
        status: 'active',
        addedDate: '2024-01-15',
        lastScan: '2024-07-21 14:30',
        threatCount: 1
      },
      {
        id: '2',
        domain: 'luckystars.net',
        status: 'active',
        addedDate: '2024-02-20',
        lastScan: '2024-07-21 10:15',
        threatCount: 0
      }
    ],
    alertSettings: {
      email: true,
      webhook: true,
      webhookUrl: 'https://api.luckystars.com/webhooks/security',
      slack: false,
      slackWebhook: '',
      telegram: true,
      telegramBotToken: '1234567890:ABCdefGHIjklMNOpqrsTUVwxyz',
      telegramChatId: '-1001234567890',
      frequency: 'hourly',
      severity: 'high_medium'
    }
  }

  // Auto-fill with demo data when enabled
  React.useEffect(() => {
    if (demoDataFilled) {
      setBrandData(demoBrandData)
      setIsEditing(true)
    }
  }, [demoDataFilled])

  const handleSave = async () => {
    setIsSaving(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      onSave(brandData)
      setIsEditing(false)
    } catch (error) {
      console.error('Error saving brand data:', error)
    } finally {
      setIsSaving(false)
    }
  }

  const handleLogoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setBrandData(prev => ({ ...prev, logo: file }))
    }
  }

  const handleAddDomain = () => {
    if (newDomain.trim()) {
      const domain: Domain = {
        id: Date.now().toString(),
        domain: newDomain.trim(),
        status: 'pending',
        addedDate: new Date().toISOString().split('T')[0]
      }
      setBrandData(prev => ({
        ...prev,
        domains: [...prev.domains, domain]
      }))
      setNewDomain('')
      setIsAddingDomain(false)
    }
  }

  const handleRemoveDomain = (domainId: string) => {
    setBrandData(prev => ({
      ...prev,
      domains: prev.domains.filter(d => d.id !== domainId)
    }))
  }

  const handleToggleDomainStatus = (domainId: string) => {
    setBrandData(prev => ({
      ...prev,
      domains: prev.domains.map(d => 
        d.id === domainId 
          ? { ...d, status: d.status === 'active' ? 'inactive' : 'active' }
          : d
      )
    }))
  }

  const copyApiKey = () => {
    if (brandData.apiKey) {
      navigator.clipboard.writeText(brandData.apiKey)
    }
  }

  const regenerateApiKey = () => {
    const newKey = 'igtd_live_sk_test_' + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
    setBrandData(prev => ({ ...prev, apiKey: newKey }))
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800 border-green-200'
      case 'inactive':
        return 'bg-gray-100 text-gray-800 border-gray-200'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="w-4 h-4" />
      case 'inactive':
        return <AlertCircle className="w-4 h-4" />
      case 'pending':
        return <Clock className="w-4 h-4" />
      default:
        return <AlertCircle className="w-4 h-4" />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <button
                onClick={onBack}
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Back to Dashboard</span>
              </button>
            </div>
            <div className="flex items-center space-x-4">
              {isEditing && (
                <button
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Cancel
                </button>
              )}
              <button
                onClick={isEditing ? handleSave : () => setIsEditing(true)}
                disabled={isSaving}
                className="btn-primary flex items-center space-x-2"
              >
                {isSaving ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Saving...</span>
                  </>
                ) : (
                  <>
                    {isEditing ? <Save className="w-4 h-4" /> : <Edit className="w-4 h-4" />}
                    <span>{isEditing ? 'Save Changes' : 'Edit Brand'}</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Brand Management</h1>
          <p className="text-gray-600">
            Manage your brand settings, domains, and monitoring preferences
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Brand Info & Domains */}
          <div className="lg:col-span-2 space-y-8">
            {/* Brand Information */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">Brand Information</h2>
              </div>
              <div className="p-6">
                <div className="flex items-start space-x-6">
                  {/* Logo */}
                  <div className="flex-shrink-0">
                    <div className="w-24 h-24 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
                      {brandData.logo ? (
                        <img 
                          src={typeof brandData.logo === 'string' ? brandData.logo : URL.createObjectURL(brandData.logo)} 
                          alt={brandData.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <Shield className="w-12 h-12 text-gray-400" />
                      )}
                    </div>
                    {isEditing && (
                      <button
                        onClick={() => fileInputRef.current?.click()}
                        className="mt-2 text-sm text-primary-600 hover:text-primary-700 font-medium"
                      >
                        Change Logo
                      </button>
                    )}
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleLogoChange}
                      className="hidden"
                    />
                  </div>

                  {/* Brand Details */}
                  <div className="flex-1">
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Brand Name
                        </label>
                        {isEditing ? (
                          <input
                            type="text"
                            value={brandData.name}
                            onChange={(e) => setBrandData(prev => ({ ...prev, name: e.target.value }))}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                          />
                        ) : (
                          <p className="text-lg font-medium text-gray-900">{brandData.name}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Plan
                        </label>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
                          {brandData.plan.charAt(0).toUpperCase() + brandData.plan.slice(1)}
                        </span>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Brand ID
                        </label>
                        <p className="text-sm text-gray-600 font-mono">{brandData.id}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Domain Management */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-gray-900">Domain Management</h2>
                  {isEditing && (
                    <button
                      onClick={() => setIsAddingDomain(true)}
                      className="btn-primary flex items-center space-x-2"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add Domain</span>
                    </button>
                  )}
                </div>
              </div>

              <div className="p-6">
                {/* Add Domain Form */}
                {isAddingDomain && (
                  <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <input
                        type="text"
                        placeholder="Enter domain (e.g., example.com)"
                        value={newDomain}
                        onChange={(e) => setNewDomain(e.target.value)}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                        onKeyPress={(e) => e.key === 'Enter' && handleAddDomain()}
                      />
                      <button
                        onClick={handleAddDomain}
                        className="btn-primary"
                      >
                        Add
                      </button>
                      <button
                        onClick={() => {
                          setIsAddingDomain(false)
                          setNewDomain('')
                        }}
                        className="px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}

                {/* Domains List */}
                <div className="space-y-4">
                  {brandData.domains.map((domain) => (
                    <div key={domain.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                          <Globe className="w-5 h-5 text-gray-400" />
                          <span className="font-medium text-gray-900">{domain.domain}</span>
                          <button className="text-gray-400 hover:text-gray-600">
                            <ExternalLink className="w-4 h-4" />
                          </button>
                        </div>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(domain.status)}`}>
                          {getStatusIcon(domain.status)}
                          <span className="ml-1 capitalize">{domain.status}</span>
                        </span>
                        {domain.threatCount !== undefined && domain.threatCount > 0 && (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                            {domain.threatCount} threats
                          </span>
                        )}
                      </div>

                      <div className="flex items-center space-x-2">
                        {isEditing && (
                          <>
                            <button
                              onClick={() => handleToggleDomainStatus(domain.id)}
                              className={`px-3 py-1 text-xs font-medium rounded ${
                                domain.status === 'active'
                                  ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                  : 'bg-green-100 text-green-700 hover:bg-green-200'
                              }`}
                            >
                              {domain.status === 'active' ? 'Deactivate' : 'Activate'}
                            </button>
                            <button
                              onClick={() => handleRemoveDomain(domain.id)}
                              className="p-1 text-red-600 hover:text-red-700"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {brandData.domains.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    <Globe className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                    <p>No domains added yet</p>
                    {isEditing && (
                      <button
                        onClick={() => setIsAddingDomain(true)}
                        className="mt-2 text-primary-600 hover:text-primary-700 font-medium"
                      >
                        Add your first domain
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Settings */}
          <div className="space-y-8">
            {/* Alert Settings */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center space-x-2">
                  <Bell className="w-5 h-5 text-gray-600" />
                  <h2 className="text-xl font-semibold text-gray-900">Alert Settings</h2>
                </div>
              </div>
              <div className="p-6 space-y-6">
                {/* Email Alerts */}
                <div>
                  <label className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={brandData.alertSettings.email}
                      onChange={(e) => setBrandData(prev => ({
                        ...prev,
                        alertSettings: { ...prev.alertSettings, email: e.target.checked }
                      }))}
                      disabled={!isEditing}
                      className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                    />
                    <span className="text-sm font-medium text-gray-700">Email Alerts</span>
                  </label>
                </div>

                {/* Webhook Alerts */}
                <div>
                  <label className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={brandData.alertSettings.webhook}
                      onChange={(e) => setBrandData(prev => ({
                        ...prev,
                        alertSettings: { ...prev.alertSettings, webhook: e.target.checked }
                      }))}
                      disabled={!isEditing}
                      className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                    />
                    <span className="text-sm font-medium text-gray-700">Webhook Alerts</span>
                  </label>
                  {brandData.alertSettings.webhook && isEditing && (
                    <input
                      type="url"
                      placeholder="https://your-webhook-url.com"
                      value={brandData.alertSettings.webhookUrl || ''}
                      onChange={(e) => setBrandData(prev => ({
                        ...prev,
                        alertSettings: { ...prev.alertSettings, webhookUrl: e.target.value }
                      }))}
                      className="mt-2 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    />
                  )}
                </div>

                {/* Slack Alerts */}
                <div>
                  <label className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={brandData.alertSettings.slack}
                      onChange={(e) => setBrandData(prev => ({
                        ...prev,
                        alertSettings: { ...prev.alertSettings, slack: e.target.checked }
                      }))}
                      disabled={!isEditing}
                      className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                    />
                    <span className="text-sm font-medium text-gray-700">Slack Alerts</span>
                  </label>
                  {brandData.alertSettings.slack && isEditing && (
                    <input
                      type="url"
                      placeholder="https://hooks.slack.com/services/..."
                      value={brandData.alertSettings.slackWebhook || ''}
                      onChange={(e) => setBrandData(prev => ({
                        ...prev,
                        alertSettings: { ...prev.alertSettings, slackWebhook: e.target.value }
                      }))}
                      className="mt-2 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    />
                  )}
                </div>

                {/* Alert Frequency */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Alert Frequency
                  </label>
                  <select
                    value={brandData.alertSettings.frequency}
                    onChange={(e) => setBrandData(prev => ({
                      ...prev,
                      alertSettings: { ...prev.alertSettings, frequency: e.target.value as any }
                    }))}
                    disabled={!isEditing}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  >
                    <option value="immediate">Immediate</option>
                    <option value="hourly">Hourly</option>
                    <option value="daily">Daily</option>
                  </select>
                </div>

                {/* Alert Severity */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Alert Severity
                  </label>
                  <select
                    value={brandData.alertSettings.severity}
                    onChange={(e) => setBrandData(prev => ({
                      ...prev,
                      alertSettings: { ...prev.alertSettings, severity: e.target.value as any }
                    }))}
                    disabled={!isEditing}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  >
                    <option value="all">All Threats</option>
                    <option value="high">High Severity Only</option>
                    <option value="high_medium">High & Medium Severity</option>
                  </select>
                </div>
              </div>
            </div>

            {/* API Keys (Enterprise Only) */}
            {brandData.plan === 'enterprise' && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="p-6 border-b border-gray-200">
                  <div className="flex items-center space-x-2">
                    <Settings className="w-5 h-5 text-gray-600" />
                    <h2 className="text-xl font-semibold text-gray-900">API Keys</h2>
                  </div>
                </div>
                <div className="p-6 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      API Key
                    </label>
                    <div className="relative">
                      <input
                        type={showApiKey ? 'text' : 'password'}
                        value={brandData.apiKey || ''}
                        readOnly
                        className="w-full px-3 py-2 pr-20 border border-gray-300 rounded-lg bg-gray-50 font-mono text-sm"
                      />
                      <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center space-x-1">
                        <button
                          onClick={() => setShowApiKey(!showApiKey)}
                          className="p-1 text-gray-400 hover:text-gray-600"
                        >
                          {showApiKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                        <button
                          onClick={copyApiKey}
                          className="p-1 text-gray-400 hover:text-gray-600"
                        >
                          <Copy className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <button
                      onClick={regenerateApiKey}
                      disabled={!isEditing}
                      className="flex-1 px-3 py-2 text-sm font-medium text-red-600 border border-red-300 rounded-lg hover:bg-red-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Regenerate
                    </button>
                    <button
                      onClick={() => {
                        const blob = new Blob([brandData.apiKey || ''], { type: 'text/plain' })
                        const url = URL.createObjectURL(blob)
                        const a = document.createElement('a')
                        a.href = url
                        a.download = 'api-key.txt'
                        a.click()
                        URL.revokeObjectURL(url)
                      }}
                      className="px-3 py-2 text-sm font-medium text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
                    >
                      <Download className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="text-xs text-gray-500">
                    <p>Keep your API key secure. It provides full access to your account.</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}

export default BrandManagementScreen 