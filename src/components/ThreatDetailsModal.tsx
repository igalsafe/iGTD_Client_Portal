import { X, AlertTriangle, Shield, Globe, Calendar, BarChart3, ExternalLink } from 'lucide-react'

interface ThreatDetailsModalProps {
  threat: Threat | null
  isOpen: boolean
  onClose: () => void
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

const ThreatDetailsModal = ({ threat, isOpen, onClose }: ThreatDetailsModalProps) => {
  if (!isOpen || !threat) return null

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

  const getRiskLevel = (score?: number) => {
    if (!score) return 'Unknown'
    if (score >= 80) return 'Critical'
    if (score >= 60) return 'High'
    if (score >= 40) return 'Medium'
    if (score >= 20) return 'Low'
    return 'Minimal'
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content max-w-2xl" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-red-600" />
            </div>
            <h2 className="text-xl font-bold text-gray-900">Threat Details</h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Domain Info */}
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-semibold text-gray-900">{threat.domain}</h3>
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getSeverityColor(threat.severity)}`}>
              <AlertTriangle className="w-3 h-3 mr-1" />
              <span className="capitalize">{threat.severity}</span>
            </span>
          </div>
          <p className="text-sm text-gray-600">{threat.description}</p>
        </div>

        {/* Threat Details */}
        <div className="space-y-6">
          {/* Basic Information */}
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-3">Threat Information</h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center space-x-2">
                <Shield className="w-4 h-4 text-gray-400" />
                <div>
                  <p className="text-xs text-gray-500">Type</p>
                  <p className="text-sm font-medium text-gray-900">{getThreatTypeLabel(threat.type)}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <BarChart3 className="w-4 h-4 text-gray-400" />
                <div>
                  <p className="text-xs text-gray-500">Risk Score</p>
                  <p className="text-sm font-medium text-gray-900">
                    {threat.riskScore ? `${threat.riskScore}/100 (${getRiskLevel(threat.riskScore)})` : 'Not available'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Domain Information */}
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-3">Domain Information</h4>
            <div className="grid grid-cols-2 gap-4">
              {threat.registrationDate && (
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <div>
                    <p className="text-xs text-gray-500">Registration Date</p>
                    <p className="text-sm font-medium text-gray-900">{threat.registrationDate}</p>
                  </div>
                </div>
              )}
              {threat.lastSeen && (
                <div className="flex items-center space-x-2">
                  <Globe className="w-4 h-4 text-gray-400" />
                  <div>
                    <p className="text-xs text-gray-500">Last Seen</p>
                    <p className="text-sm font-medium text-gray-900">{threat.lastSeen}</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Risk Assessment */}
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-3">Risk Assessment</h4>
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5" />
                <div>
                  <h5 className="text-sm font-medium text-red-900 mb-1">High Risk Threat</h5>
                  <p className="text-sm text-red-800">
                    This domain poses a significant risk to your brand. It appears to be actively targeting your customers 
                    and should be addressed immediately.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Recommended Actions */}
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-3">Recommended Actions</h4>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Report to Domain Registrar</p>
                  <p className="text-xs text-gray-600">Submit a complaint to the domain registrar for trademark violation</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Monitor Activity</p>
                  <p className="text-xs text-gray-600">Track the domain's activity and visitor traffic</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Legal Action</p>
                  <p className="text-xs text-gray-600">Consider legal proceedings for trademark infringement</p>
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-200">
            <button
              onClick={() => window.open(`https://${threat.domain}`, '_blank')}
              className="flex items-center space-x-2 text-primary-600 hover:text-primary-700 font-medium"
            >
              <ExternalLink className="w-4 h-4" />
              <span>Visit Domain</span>
            </button>
            
            <div className="flex items-center space-x-3">
              <button
                onClick={onClose}
                className="text-gray-600 hover:text-gray-700 font-medium"
              >
                Close
              </button>
              <button
                onClick={() => {
                  // Handle report action
                  console.log('Report threat:', threat.id)
                }}
                className="btn-primary"
              >
                Report Threat
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ThreatDetailsModal 