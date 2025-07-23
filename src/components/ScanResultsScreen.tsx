import { useState } from 'react'
import { Shield, AlertTriangle, Eye, ArrowLeft, Crown, Zap } from 'lucide-react'

interface ScanResultsScreenProps {
  scanResults: {
    threatsFound: number
    domainsScanned: number
    scanTime: number
    threats: Threat[]
  }
  onBack: () => void
  onRunAnotherScan: () => void
  onSubscribe: () => void
  onViewDetails: (threat: Threat) => void
}

interface Threat {
  id: string
  domain: string
  type: 'phishing' | 'typosquatting' | 'impersonation'
  severity: 'high' | 'medium' | 'low'
  description: string
  registrationDate?: string
  lastSeen?: string
  riskScore?: number
}

const ScanResultsScreen = ({ 
  scanResults, 
  onBack, 
  onRunAnotherScan, 
  onSubscribe,
  onViewDetails 
}: ScanResultsScreenProps) => {
  const [selectedThreat, setSelectedThreat] = useState<Threat | null>(null)

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high':
        return 'bg-red-100 text-red-800 border-red-200'
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'low':
        return 'bg-green-100 text-green-800 border-green-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'high':
        return <AlertTriangle className="w-4 h-4" />
      case 'medium':
        return <AlertTriangle className="w-4 h-4" />
      case 'low':
        return <Shield className="w-4 h-4" />
      default:
        return <Shield className="w-4 h-4" />
    }
  }

  const getThreatTypeLabel = (type: string) => {
    switch (type) {
      case 'phishing':
        return 'Phishing Site'
      case 'typosquatting':
        return 'Typosquatting'
      case 'impersonation':
        return 'Brand Impersonation'
      default:
        return 'Suspicious Domain'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            <button
              onClick={onBack}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors mr-6"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Dashboard</span>
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
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Results Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            We found {scanResults.threatsFound} suspicious domains similar to your brand
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-6">
            Our scan detected potential threats targeting your brand. Review the details below and consider upgrading to our premium plan for comprehensive protection.
          </p>
          
          {/* Early CTA - Right after the main message */}
          <div className="bg-gradient-to-r from-red-50 to-orange-50 border border-red-200 rounded-xl p-6 mb-6">
            <div className="flex flex-col sm:flex-row items-center justify-between">
              <div className="text-left mb-4 sm:mb-0">
                <h3 className="text-lg font-semibold text-red-900 mb-2">
                  🚨 Immediate Action Required
                </h3>
                <p className="text-red-700">
                  {scanResults.threatsFound} threats detected - protect your brand now before it's too late
                </p>
              </div>
              <button
                onClick={onSubscribe}
                className="btn-primary px-6 py-3 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 whitespace-nowrap"
              >
                <Shield className="w-4 h-4 inline mr-2" />
                Protect My Brand Now
              </button>
            </div>
          </div>
        </div>

        {/* Scan Summary */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="grid md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-2xl font-bold text-red-600">{scanResults.threatsFound}</div>
              <div className="text-sm text-gray-600">Threats Found</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-600">{scanResults.domainsScanned}</div>
              <div className="text-sm text-gray-600">Domains Scanned</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-600">{scanResults.scanTime}s</div>
              <div className="text-sm text-gray-600">Scan Duration</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-600">
                {Math.round((scanResults.threatsFound / scanResults.domainsScanned) * 100)}%
              </div>
              <div className="text-sm text-gray-600">Threat Rate</div>
            </div>
          </div>
          
          {/* CTA after scan summary */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="flex flex-col sm:flex-row items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  Don't wait until it's too late
                </h3>
                <p className="text-gray-600 text-sm">
                  These threats could be actively targeting your customers right now
                </p>
              </div>
              <button
                onClick={onSubscribe}
                className="mt-4 sm:mt-0 bg-gradient-to-r from-primary-600 to-primary-700 text-white px-6 py-3 rounded-lg font-semibold hover:from-primary-700 hover:to-primary-800 transition-all duration-200 shadow-md hover:shadow-lg"
              >
                <Zap className="w-4 h-4 inline mr-2" />
                Get Premium Protection
              </button>
            </div>
          </div>
        </div>

        {/* Domain Results */}
        <div className="space-y-6 mb-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">Detected Threats</h2>
            
            {/* CTA in the threats section header */}
            <div className="mt-4 sm:mt-0 flex items-center space-x-3">
              <span className="text-sm text-gray-500">
                {scanResults.threatsFound} threats found
              </span>
              <button
                onClick={onSubscribe}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm hover:shadow-md"
              >
                <AlertTriangle className="w-4 h-4 inline mr-1" />
                Stop These Threats
              </button>
            </div>
          </div>
          
          {scanResults.threats.map((threat) => (
            <div key={threat.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-3">
                    <h3 className="text-lg font-semibold text-gray-900">{threat.domain}</h3>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getSeverityColor(threat.severity)}`}>
                      {getSeverityIcon(threat.severity)}
                      <span className="ml-1 capitalize">{threat.severity}</span>
                    </span>
                  </div>
                  
                  <div className="space-y-2">
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Type:</span> {getThreatTypeLabel(threat.type)}
                    </p>
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Description:</span> {threat.description}
                    </p>
                    {threat.registrationDate && (
                      <p className="text-sm text-gray-600">
                        <span className="font-medium">Registered:</span> {threat.registrationDate}
                      </p>
                    )}
                    {threat.riskScore && (
                      <p className="text-sm text-gray-600">
                        <span className="font-medium">Risk Score:</span> {threat.riskScore}/100
                      </p>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 ml-6">
                  <button
                    onClick={() => onViewDetails(threat)}
                    className="flex items-center space-x-2 text-primary-600 hover:text-primary-700 font-medium py-2 px-4 rounded-lg border border-primary-200 hover:border-primary-300 transition-colors"
                  >
                    <Eye className="w-4 h-4" />
                    <span>View Details</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
          
          {/* CTA after threats list */}
          <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-xl p-6">
            <div className="flex flex-col sm:flex-row items-center justify-between">
              <div className="text-left mb-4 sm:mb-0">
                <h3 className="text-lg font-semibold text-yellow-900 mb-2">
                  ⚡ Ready to take action?
                </h3>
                <p className="text-yellow-800">
                  Upgrade now to get automated takedown of these threats and continuous monitoring
                </p>
              </div>
              <button
                onClick={onSubscribe}
                className="bg-yellow-600 hover:bg-yellow-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors shadow-md hover:shadow-lg"
              >
                <Crown className="w-4 h-4 inline mr-2" />
                Upgrade to Premium
              </button>
            </div>
          </div>
        </div>

        {/* Upgrade Section */}
        <div className="bg-gradient-to-r from-primary-50 to-blue-50 rounded-2xl p-8 mb-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Crown className="w-8 h-8 text-primary-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Get Complete Brand Protection
            </h2>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Upgrade to our premium plan for continuous monitoring, automated threat removal, and comprehensive brand protection across all digital channels.
            </p>
            
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="text-center">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Shield className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">24/7 Monitoring</h3>
                <p className="text-sm text-gray-600">Continuous threat detection and monitoring</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Zap className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Auto Removal</h3>
                <p className="text-sm text-gray-600">Automated takedown of malicious domains</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Eye className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Detailed Reports</h3>
                <p className="text-sm text-gray-600">Comprehensive analytics and insights</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <button
                onClick={onSubscribe}
                className="btn-primary text-lg px-8 py-4 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
              >
                <Crown className="w-5 h-5 inline mr-2" />
                See Plans & Subscribe
              </button>
              
              <button
                onClick={onRunAnotherScan}
                className="text-primary-600 hover:text-primary-700 font-medium py-2 px-4 rounded-lg border border-primary-200 hover:border-primary-300 transition-colors"
              >
                Run another Free Scan
              </button>
            </div>
          </div>
        </div>

        {/* Free vs Premium Comparison */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Free vs Premium Comparison</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="border border-gray-200 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-3">Free Plan</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-gray-400 rounded-full mr-2"></span>
                  1 free scan per month
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-gray-400 rounded-full mr-2"></span>
                  Basic threat detection
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-gray-400 rounded-full mr-2"></span>
                  Manual review required
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-gray-400 rounded-full mr-2"></span>
                  Limited support
                </li>
              </ul>
            </div>
            
            <div className="border border-primary-200 rounded-lg p-4 bg-primary-50">
              <h4 className="font-semibold text-gray-900 mb-3">Premium Plan</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-primary-600 rounded-full mr-2"></span>
                  Unlimited scans
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-primary-600 rounded-full mr-2"></span>
                  Advanced threat detection
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-primary-600 rounded-full mr-2"></span>
                  Automated takedown
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-primary-600 rounded-full mr-2"></span>
                  Priority support
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default ScanResultsScreen 