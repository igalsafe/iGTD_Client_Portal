import { useState } from 'react'
import { 
  Shield, 
  Bell, 
  ChevronDown, 
  AlertTriangle, 
  Clock, 
  CheckCircle, 
  ExternalLink, 
  FileText, 
  Search,
  Filter,
  MoreVertical,
  TrendingUp,
  TrendingDown,
  Eye,
  X
} from 'lucide-react'

interface MainDashboardProps {
  email: string
  onLogout: () => void
  onStartScan: () => void
  onBrandManagement: () => void
  onReports: () => void
  onAccountBilling: () => void
}

interface Brand {
  id: string
  name: string
  domain: string
  logo?: string
  isActive: boolean
}

interface ThreatActivity {
  id: string
  domain: string
  brand: string
  type: 'phishing' | 'typosquatting' | 'impersonation'
  severity: 'high' | 'medium' | 'low'
  status: 'detected' | 'in_progress' | 'resolved'
  detectedDate: string
  lastUpdated: string
  threatLevel: number
}

const MainDashboard = ({ email, onLogout, onStartScan, onBrandManagement, onReports, onAccountBilling }: MainDashboardProps) => {
  const [selectedBrand, setSelectedBrand] = useState<string>('all')
  const [showNotifications, setShowNotifications] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [showWelcomeBanner, setShowWelcomeBanner] = useState(true)

  // Mock data
  const brands: Brand[] = [
    { id: 'brand1', name: 'Casino Royale', domain: 'casinoroyale.com', isActive: true },
    { id: 'brand2', name: 'Lucky Stars', domain: 'luckystars.net', isActive: true },
    { id: 'brand3', name: 'Golden Palace', domain: 'goldenpalace.org', isActive: false },
    { id: 'all', name: 'All Brands', domain: '', isActive: true }
  ]

  const threatActivities: ThreatActivity[] = [
    {
      id: '1',
      domain: 'casinoroyale-bet.com',
      brand: 'Casino Royale',
      type: 'typosquatting',
      severity: 'high',
      status: 'detected',
      detectedDate: '2024-07-21',
      lastUpdated: '2024-07-21 14:30',
      threatLevel: 85
    },
    {
      id: '2',
      domain: 'casinoroyale-login.com',
      brand: 'Casino Royale',
      type: 'phishing',
      severity: 'high',
      status: 'in_progress',
      detectedDate: '2024-07-20',
      lastUpdated: '2024-07-21 10:15',
      threatLevel: 92
    },
    {
      id: '3',
      domain: 'luckystars-casino.net',
      brand: 'Lucky Stars',
      type: 'impersonation',
      severity: 'medium',
      status: 'resolved',
      detectedDate: '2024-07-18',
      lastUpdated: '2024-07-20 16:45',
      threatLevel: 67
    },
    {
      id: '4',
      domain: 'casinoroyale-online.co',
      brand: 'Casino Royale',
      type: 'typosquatting',
      severity: 'medium',
      status: 'in_progress',
      detectedDate: '2024-07-19',
      lastUpdated: '2024-07-21 09:20',
      threatLevel: 58
    },
    {
      id: '5',
      domain: 'goldenpalace-play.com',
      brand: 'Golden Palace',
      type: 'phishing',
      severity: 'low',
      status: 'detected',
      detectedDate: '2024-07-21',
      lastUpdated: '2024-07-21 11:30',
      threatLevel: 42
    }
  ]

  const notifications = [
    { id: '1', message: 'New threat detected: casinoroyale-bet.com', time: '2 hours ago', type: 'alert' },
    { id: '2', message: 'Takedown request submitted for casinoroyale-login.com', time: '4 hours ago', type: 'info' },
    { id: '3', message: 'Threat resolved: luckystars-casino.net', time: '1 day ago', type: 'success' }
  ]

  // Calculate summary stats
  const activeThreats = threatActivities.filter(t => t.status === 'detected').length
  const takedownsInProgress = threatActivities.filter(t => t.status === 'in_progress').length
  const resolvedThreats = threatActivities.filter(t => t.status === 'resolved').length

  // Filter activities based on search and status
  const filteredActivities = threatActivities.filter(activity => {
    const matchesSearch = activity.domain.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         activity.brand.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || activity.status === statusFilter
    const matchesBrand = selectedBrand === 'all' || activity.brand === brands.find(b => b.id === selectedBrand)?.name
    
    return matchesSearch && matchesStatus && matchesBrand
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'detected':
        return 'bg-red-100 text-red-800 border-red-200'
      case 'in_progress':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'resolved':
        return 'bg-green-100 text-green-800 border-green-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'detected':
        return <AlertTriangle className="w-4 h-4" />
      case 'in_progress':
        return <Clock className="w-4 h-4" />
      case 'resolved':
        return <CheckCircle className="w-4 h-4" />
      default:
        return <AlertTriangle className="w-4 h-4" />
    }
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high':
        return 'text-red-600'
      case 'medium':
        return 'text-yellow-600'
      case 'low':
        return 'text-green-600'
      default:
        return 'text-gray-600'
    }
  }

  const handleRequestTakedown = (threatId: string) => {
    console.log('Requesting takedown for threat:', threatId)
    // Handle takedown request
  }

  const handleViewReport = (threatId: string) => {
    console.log('Viewing detailed report for threat:', threatId)
    // Handle report viewing
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo and Brand Switcher */}
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                  <Shield className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-gray-900">iGTD</span>
              </div>

              {/* Brand Switcher */}
              <div className="relative">
                <button className="flex items-center space-x-2 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg transition-colors">
                  <span className="text-sm font-medium text-gray-900">
                    {brands.find(b => b.id === selectedBrand)?.name || 'All Brands'}
                  </span>
                  <ChevronDown className="w-4 h-4 text-gray-500" />
                </button>
                {/* Dropdown would go here */}
              </div>
            </div>

            {/* Right side - Notifications and User */}
            <div className="flex items-center space-x-4">
              {/* Notifications */}
              <div className="relative">
                <button
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="relative p-2 text-gray-600 hover:text-gray-900 transition-colors"
                >
                  <Bell className="w-5 h-5" />
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
                    3
                  </span>
                </button>

                {/* Notifications Dropdown */}
                {showNotifications && (
                  <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                    <div className="p-4 border-b border-gray-200">
                      <h3 className="text-lg font-semibold text-gray-900">Notifications</h3>
                    </div>
                    <div className="max-h-64 overflow-y-auto">
                      {notifications.map(notification => (
                        <div key={notification.id} className="p-4 border-b border-gray-100 hover:bg-gray-50">
                          <p className="text-sm text-gray-900 mb-1">{notification.message}</p>
                          <p className="text-xs text-gray-500">{notification.time}</p>
                        </div>
                      ))}
                    </div>
                    <div className="p-4 border-t border-gray-200">
                      <button className="text-sm text-primary-600 hover:text-primary-700 font-medium">
                        View All Notifications
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* User Menu */}
              <div className="flex items-center space-x-3">
                <div className="text-sm text-gray-700">
                  <span className="font-medium">{email}</span>
                </div>
                <button
                  onClick={onLogout}
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Welcome Banner */}
      {showWelcomeBanner && (
        <div className="bg-gradient-to-r from-primary-50 to-blue-50 border-b border-primary-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                  <Shield className="w-6 h-6 text-primary-600" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-primary-900">
                    Welcome to iGTD Brand Protection!
                  </h2>
                  <p className="text-primary-700">
                    Your subscription is now active. Start by adding your first brand to begin monitoring.
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <button
                  onClick={onStartScan}
                  className="bg-primary-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-primary-700 transition-colors"
                >
                  Add Your First Brand
                </button>
                <button
                  onClick={() => setShowWelcomeBanner(false)}
                  className="text-primary-600 hover:text-primary-700 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
          <p className="text-gray-600">
            Monitor and manage threats across your brands
          </p>
        </div>

        {/* Threat Summary Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Threats</p>
                <p className="text-3xl font-bold text-red-600">{activeThreats}</p>
              </div>
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-red-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <TrendingUp className="w-4 h-4 text-red-600 mr-1" />
              <span className="text-red-600">+2 from yesterday</span>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Takedowns In Progress</p>
                <p className="text-3xl font-bold text-yellow-600">{takedownsInProgress}</p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Clock className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <span className="text-gray-600">Average 3-5 days</span>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Resolved Threats</p>
                <p className="text-3xl font-bold text-green-600">{resolvedThreats}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <TrendingDown className="w-4 h-4 text-green-600 mr-1" />
              <span className="text-green-600">-1 from yesterday</span>
            </div>
          </div>
        </div>

        {/* Recent Activity Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">Recent Activity</h2>
              <button
                onClick={onStartScan}
                className="btn-primary"
              >
                <Shield className="w-4 h-4 mr-2" />
                New Scan
              </button>
            </div>
          </div>

          {/* Filters and Search */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search domains or brands..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                >
                  <option value="all">All Status</option>
                  <option value="detected">Detected</option>
                  <option value="in_progress">In Progress</option>
                  <option value="resolved">Resolved</option>
                </select>
                <button className="p-2 text-gray-600 hover:text-gray-900 transition-colors">
                  <Filter className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Activity Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Domain
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Brand
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Severity
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Detected
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredActivities.map((activity) => (
                  <tr key={activity.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <span className="text-sm font-medium text-gray-900">{activity.domain}</span>
                        <button className="ml-2 text-gray-400 hover:text-gray-600">
                          <ExternalLink className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-gray-900">{activity.brand}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-gray-900 capitalize">{activity.type}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`text-sm font-medium ${getSeverityColor(activity.severity)}`}>
                        {activity.severity}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(activity.status)}`}>
                        {getStatusIcon(activity.status)}
                        <span className="ml-1 capitalize">
                          {activity.status.replace('_', ' ')}
                        </span>
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-gray-900">{activity.detectedDate}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        {activity.status === 'detected' && (
                          <button
                            onClick={() => handleRequestTakedown(activity.id)}
                            className="text-sm text-primary-600 hover:text-primary-700 font-medium"
                          >
                            Request Takedown
                          </button>
                        )}
                        <button
                          onClick={() => handleViewReport(activity.id)}
                          className="text-sm text-gray-600 hover:text-gray-700 font-medium"
                        >
                          View Report
                        </button>
                        <button className="text-gray-400 hover:text-gray-600">
                          <MoreVertical className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Quick Actions */}
          <div className="p-6 border-t border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="flex flex-wrap gap-4">
              <button className="flex items-center space-x-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors">
                <FileText className="w-4 h-4" />
                <span>Generate Report</span>
              </button>
              <button className="flex items-center space-x-2 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors">
                <Eye className="w-4 h-4" />
                <span>View Analytics</span>
              </button>
              <button className="flex items-center space-x-2 border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">
                <Shield className="w-4 h-4" />
                <span>Settings</span>
              </button>
              <button
                onClick={onBrandManagement}
                className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Shield className="w-4 h-4" />
                <span>Brand Management</span>
              </button>
              <button
                onClick={onReports}
                className="flex items-center space-x-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
              >
                <FileText className="w-4 h-4" />
                <span>Reports</span>
              </button>
              <button
                onClick={onAccountBilling}
                className="flex items-center space-x-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
              >
                <Shield className="w-4 h-4" />
                <span>Account & Billing</span>
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default MainDashboard 