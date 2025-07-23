import { Shield, Search, BarChart3, Settings, LogOut } from 'lucide-react'

interface DashboardProps {
  email: string
  onLogout: () => void
  onStartScan: () => void
  scanResults?: {
    threatsFound: number
    domainsScanned: number
    scanTime: number
    threats: any[]
  } | null
}

const Dashboard = ({ email, onLogout, onStartScan, scanResults }: DashboardProps) => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">iGTD Dashboard</span>
            </div>
            
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">{email}</span>
              <button
                onClick={onLogout}
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Welcome to iGTD Brand Protection
          </h1>
          <p className="text-gray-600">
            Your email has been verified successfully. You can now start protecting your iGaming brand.
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
              <Search className="w-6 h-6 text-primary-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Start Brand Scan</h3>
            <p className="text-gray-600 mb-4">
              Scan for phishing domains targeting your brand
            </p>
            <button 
              onClick={onStartScan}
              className="btn-primary w-full"
            >
              Start Scan
            </button>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <BarChart3 className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">View Reports</h3>
            <p className="text-gray-600 mb-4">
              Check your brand protection analytics
            </p>
            <button className="btn-secondary w-full">
              View Reports
            </button>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mb-4">
              <Settings className="w-6 h-6 text-gray-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Settings</h3>
            <p className="text-gray-600 mb-4">
              Configure your brand protection preferences
            </p>
            <button className="btn-secondary w-full">
              Settings
            </button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Brand Protection Overview</h2>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary-600">
                {scanResults?.threatsFound || 0}
              </div>
              <div className="text-sm text-gray-600">Active Threats</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {scanResults?.domainsScanned || 0}
              </div>
              <div className="text-sm text-gray-600">Domains Monitored</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                {scanResults ? 1 : 0}
              </div>
              <div className="text-sm text-gray-600">Scans Completed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">
                {scanResults ? 'Protected' : 'Ready'}
              </div>
              <div className="text-sm text-gray-600">Protection Status</div>
            </div>
          </div>
          
          {/* Scan Results Summary */}
          {scanResults && (
            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h3 className="text-sm font-medium text-blue-900 mb-2">
                Latest Scan Results
              </h3>
              <div className="text-sm text-blue-800">
                <p>• Found {scanResults.threatsFound} potential threats</p>
                <p>• Scanned {scanResults.domainsScanned} domains in {scanResults.scanTime} seconds</p>
                <p>• Scan completed successfully</p>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

export default Dashboard 