import { useState, useEffect } from 'react'
import { 
  ArrowLeft, 
  Download, 
  FileText, 
  BarChart3, 
  Calendar,
  ChevronDown,
  Filter,
  Search,
  CheckCircle,
  Clock,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  Eye,
  ExternalLink,
  RefreshCw
} from 'lucide-react'

interface ReportsScreenProps {
  onBack: () => void
}

interface ThreatData {
  date: string
  threats: number
  takedowns: number
  resolved: number
}

interface TakedownAction {
  id: string
  domain: string
  brand: string
  threatType: 'phishing' | 'typosquatting' | 'impersonation'
  severity: 'high' | 'medium' | 'low'
  status: 'pending' | 'in_progress' | 'completed' | 'failed'
  submittedDate: string
  completedDate?: string
  provider: string
  estimatedCompletion?: string
}

interface Brand {
  id: string
  name: string
  domain: string
}

const ReportsScreen = ({ onBack }: ReportsScreenProps) => {
  const [selectedBrand, setSelectedBrand] = useState<string>('all')
  const [dateRange, setDateRange] = useState('30d') // 7d, 30d, 90d, custom
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [isGeneratingReport, setIsGeneratingReport] = useState(false)
  const [selectedTakedowns, setSelectedTakedowns] = useState<string[]>([])

  // Mock data
  const brands: Brand[] = [
    { id: 'brand1', name: 'Casino Royale', domain: 'casinoroyale.com' },
    { id: 'brand2', name: 'Lucky Stars', domain: 'luckystars.net' },
    { id: 'brand3', name: 'Golden Palace', domain: 'goldenpalace.org' },
    { id: 'all', name: 'All Brands', domain: '' }
  ]

  const threatData: ThreatData[] = [
    { date: '2024-07-15', threats: 12, takedowns: 8, resolved: 6 },
    { date: '2024-07-16', threats: 15, takedowns: 10, resolved: 7 },
    { date: '2024-07-17', threats: 8, takedowns: 6, resolved: 5 },
    { date: '2024-07-18', threats: 20, takedowns: 15, resolved: 12 },
    { date: '2024-07-19', threats: 14, takedowns: 11, resolved: 9 },
    { date: '2024-07-20', threats: 18, takedowns: 13, resolved: 10 },
    { date: '2024-07-21', threats: 22, takedowns: 16, resolved: 14 }
  ]

  const takedownActions: TakedownAction[] = [
    {
      id: '1',
      domain: 'casinoroyale-bet.com',
      brand: 'Casino Royale',
      threatType: 'typosquatting',
      severity: 'high',
      status: 'completed',
      submittedDate: '2024-07-18',
      completedDate: '2024-07-20',
      provider: 'Cloudflare'
    },
    {
      id: '2',
      domain: 'casinoroyale-login.com',
      brand: 'Casino Royale',
      threatType: 'phishing',
      severity: 'high',
      status: 'in_progress',
      submittedDate: '2024-07-19',
      provider: 'GoDaddy',
      estimatedCompletion: '2024-07-25'
    },
    {
      id: '3',
      domain: 'luckystars-casino.net',
      brand: 'Lucky Stars',
      threatType: 'impersonation',
      severity: 'medium',
      status: 'completed',
      submittedDate: '2024-07-16',
      completedDate: '2024-07-18',
      provider: 'Namecheap'
    },
    {
      id: '4',
      domain: 'casinoroyale-online.co',
      brand: 'Casino Royale',
      threatType: 'typosquatting',
      severity: 'medium',
      status: 'pending',
      submittedDate: '2024-07-21',
      provider: 'Google Domains'
    },
    {
      id: '5',
      domain: 'goldenpalace-play.com',
      brand: 'Golden Palace',
      threatType: 'phishing',
      severity: 'low',
      status: 'failed',
      submittedDate: '2024-07-17',
      provider: 'HostGator'
    }
  ]

  // Calculate summary stats
  const totalThreats = threatData.reduce((sum, day) => sum + day.threats, 0)
  const totalTakedowns = threatData.reduce((sum, day) => sum + day.takedowns, 0)
  const totalResolved = threatData.reduce((sum, day) => sum + day.resolved, 0)
  const successRate = totalTakedowns > 0 ? Math.round((totalResolved / totalTakedowns) * 100) : 0

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800 border-green-200'
      case 'in_progress':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'pending':
        return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'failed':
        return 'bg-red-100 text-red-800 border-red-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4" />
      case 'in_progress':
        return <Clock className="w-4 h-4" />
      case 'pending':
        return <AlertTriangle className="w-4 h-4" />
      case 'failed':
        return <AlertTriangle className="w-4 h-4" />
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

  const handleGenerateReport = async (format: 'pdf' | 'csv') => {
    setIsGeneratingReport(true)
    try {
      // Simulate report generation
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Create and download file
      const content = `Report generated on ${new Date().toLocaleDateString()}\nTotal Threats: ${totalThreats}\nTotal Takedowns: ${totalTakedowns}\nSuccess Rate: ${successRate}%`
      const blob = new Blob([content], { type: format === 'pdf' ? 'application/pdf' : 'text/csv' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `brand-protection-report-${new Date().toISOString().split('T')[0]}.${format}`
      a.click()
      URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Error generating report:', error)
    } finally {
      setIsGeneratingReport(false)
    }
  }

  const handleSelectAllTakedowns = () => {
    if (selectedTakedowns.length === takedownActions.length) {
      setSelectedTakedowns([])
    } else {
      setSelectedTakedowns(takedownActions.map(t => t.id))
    }
  }

  const handleSelectTakedown = (id: string) => {
    if (selectedTakedowns.includes(id)) {
      setSelectedTakedowns(prev => prev.filter(t => t !== id))
    } else {
      setSelectedTakedowns(prev => [...prev, id])
    }
  }

  // Simple bar chart component
  const BarChart = ({ data }: { data: ThreatData[] }) => {
    const maxValue = Math.max(...data.map(d => Math.max(d.threats, d.takedowns, d.resolved)))
    
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">Threat Activity Over Time</h3>
          <div className="flex items-center space-x-4 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded"></div>
              <span>Threats</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-yellow-500 rounded"></div>
              <span>Takedowns</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded"></div>
              <span>Resolved</span>
            </div>
          </div>
        </div>
        
        <div className="h-64 flex items-end space-x-2">
          {data.map((day, index) => (
            <div key={index} className="flex-1 flex flex-col items-center space-y-1">
              <div className="w-full flex flex-col space-y-1">
                <div 
                  className="bg-red-500 rounded-t"
                  style={{ height: `${(day.threats / maxValue) * 200}px` }}
                ></div>
                <div 
                  className="bg-yellow-500"
                  style={{ height: `${(day.takedowns / maxValue) * 200}px` }}
                ></div>
                <div 
                  className="bg-green-500 rounded-b"
                  style={{ height: `${(day.resolved / maxValue) * 200}px` }}
                ></div>
              </div>
              <span className="text-xs text-gray-600 transform -rotate-45 origin-left">
                {new Date(day.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
              </span>
            </div>
          ))}
        </div>
      </div>
    )
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
              <button
                onClick={() => handleGenerateReport('pdf')}
                disabled={isGeneratingReport}
                className="btn-primary flex items-center space-x-2"
              >
                {isGeneratingReport ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Generating...</span>
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4" />
                    <span>Download Report</span>
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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Reports & Analytics</h1>
          <p className="text-gray-600">
            Monitor threat activity and takedown performance across your brands
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Brand Selection */}
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Brand
              </label>
              <select
                value={selectedBrand}
                onChange={(e) => setSelectedBrand(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              >
                {brands.map(brand => (
                  <option key={brand.id} value={brand.id}>
                    {brand.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Date Range */}
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Date Range
              </label>
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="7d">Last 7 days</option>
                <option value="30d">Last 30 days</option>
                <option value="90d">Last 90 days</option>
                <option value="custom">Custom range</option>
              </select>
            </div>

            {/* Custom Date Range */}
            {dateRange === 'custom' && (
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Custom Range
                </label>
                <div className="flex space-x-2">
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                  <span className="flex items-center text-gray-500">to</span>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Threats</p>
                <p className="text-3xl font-bold text-red-600">{totalThreats}</p>
              </div>
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-red-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <TrendingUp className="w-4 h-4 text-red-600 mr-1" />
              <span className="text-red-600">+15% from last period</span>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Takedowns</p>
                <p className="text-3xl font-bold text-yellow-600">{totalTakedowns}</p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <span className="text-gray-600">Average 3-5 days</span>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Success Rate</p>
                <p className="text-3xl font-bold text-green-600">{successRate}%</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <TrendingUp className="w-4 h-4 text-green-600 mr-1" />
              <span className="text-green-600">+5% from last period</span>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Resolved</p>
                <p className="text-3xl font-bold text-blue-600">{totalResolved}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <span className="text-gray-600">Successfully removed</span>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Threat Activity Chart */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <BarChart data={threatData} />
          </div>

          {/* Export Options */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Export Options</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center space-x-3">
                  <FileText className="w-8 h-8 text-red-500" />
                  <div>
                    <h4 className="font-medium text-gray-900">PDF Report</h4>
                    <p className="text-sm text-gray-600">Comprehensive report with charts and analysis</p>
                  </div>
                </div>
                <button
                  onClick={() => handleGenerateReport('pdf')}
                  disabled={isGeneratingReport}
                  className="btn-primary"
                >
                  Download PDF
                </button>
              </div>

              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center space-x-3">
                  <BarChart3 className="w-8 h-8 text-blue-500" />
                  <div>
                    <h4 className="font-medium text-gray-900">CSV Data</h4>
                    <p className="text-sm text-gray-600">Raw data for further analysis</p>
                  </div>
                </div>
                <button
                  onClick={() => handleGenerateReport('csv')}
                  disabled={isGeneratingReport}
                  className="btn-primary"
                >
                  Download CSV
                </button>
              </div>

              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Eye className="w-8 h-8 text-green-500" />
                  <div>
                    <h4 className="font-medium text-gray-900">Executive Summary</h4>
                    <p className="text-sm text-gray-600">High-level overview for stakeholders</p>
                  </div>
                </div>
                <button
                  onClick={() => handleGenerateReport('pdf')}
                  disabled={isGeneratingReport}
                  className="btn-primary"
                >
                  Generate
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Takedown Actions Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mt-8">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">Takedown Actions</h2>
              <div className="flex items-center space-x-2">
                <button
                  onClick={handleSelectAllTakedowns}
                  className="text-sm text-primary-600 hover:text-primary-700 font-medium"
                >
                  {selectedTakedowns.length === takedownActions.length ? 'Deselect All' : 'Select All'}
                </button>
                {selectedTakedowns.length > 0 && (
                  <button
                    onClick={() => handleGenerateReport('csv')}
                    className="btn-primary text-sm"
                  >
                    Export Selected ({selectedTakedowns.length})
                  </button>
                )}
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <input
                      type="checkbox"
                      checked={selectedTakedowns.length === takedownActions.length}
                      onChange={handleSelectAllTakedowns}
                      className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                    />
                  </th>
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
                    Provider
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Submitted
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {takedownActions.map((action) => (
                  <tr key={action.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input
                        type="checkbox"
                        checked={selectedTakedowns.includes(action.id)}
                        onChange={() => handleSelectTakedown(action.id)}
                        className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <span className="text-sm font-medium text-gray-900">{action.domain}</span>
                        <button className="ml-2 text-gray-400 hover:text-gray-600">
                          <ExternalLink className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-gray-900">{action.brand}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-gray-900 capitalize">{action.threatType}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`text-sm font-medium ${getSeverityColor(action.severity)}`}>
                        {action.severity}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(action.status)}`}>
                        {getStatusIcon(action.status)}
                        <span className="ml-1 capitalize">
                          {action.status.replace('_', ' ')}
                        </span>
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-gray-900">{action.provider}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-gray-900">{action.submittedDate}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button className="text-sm text-primary-600 hover:text-primary-700 font-medium">
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  )
}

export default ReportsScreen 