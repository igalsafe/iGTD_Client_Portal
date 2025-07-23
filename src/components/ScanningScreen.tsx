import { useState, useEffect } from 'react'
import { Shield, Search, CheckCircle, AlertTriangle, Globe, Zap } from 'lucide-react'

interface ScanningScreenProps {
  brandData: {
    brandName: string
    primaryDomain: string
    category: string
  }
  onScanComplete: (results: ScanResults) => void
}

interface ScanResults {
  threatsFound: number
  domainsScanned: number
  scanTime: number
  threats: Threat[]
}

interface Threat {
  id: string
  domain: string
  type: 'phishing' | 'typosquatting' | 'impersonation'
  severity: 'high' | 'medium' | 'low'
  description: string
}

const ScanningScreen = ({ brandData, onScanComplete }: ScanningScreenProps) => {
  const [currentStep, setCurrentStep] = useState(0)
  const [progress, setProgress] = useState(0)
  const [isComplete, setIsComplete] = useState(false)

  const scanSteps = [
    {
      title: 'Initializing Scan',
      description: 'Setting up brand protection analysis',
      icon: Shield
    },
    {
      title: 'Domain Discovery',
      description: 'Searching for related domains',
      icon: Globe
    },
    {
      title: 'Threat Analysis',
      description: 'Analyzing potential threats',
      icon: Search
    },
    {
      title: 'Risk Assessment',
      description: 'Evaluating threat severity',
      icon: AlertTriangle
    },
    {
      title: 'Report Generation',
      description: 'Compiling comprehensive results',
      icon: CheckCircle
    }
  ]

  useEffect(() => {
    const simulateScan = () => {
      const totalSteps = scanSteps.length
      const totalDuration = 10000 // 10 seconds total
      const stepDuration = totalDuration / totalSteps
      const updateInterval = 100 // Update every 100ms for smooth animation
      const progressPerUpdate = (100 / totalDuration) * updateInterval

      let currentProgress = 0
      let currentStepIndex = 0
      let startTime = Date.now()

      const interval = setInterval(() => {
        const elapsed = Date.now() - startTime
        currentProgress = Math.min((elapsed / totalDuration) * 100, 100)
        
        // Update progress smoothly
        setProgress(currentProgress)

        // Update current step based on progress
        const newStepIndex = Math.min(
          Math.floor((currentProgress / 100) * totalSteps),
          totalSteps - 1
        )
        
        if (newStepIndex !== currentStepIndex) {
          currentStepIndex = newStepIndex
          setCurrentStep(currentStepIndex)
        }

        // Complete scan
        if (currentProgress >= 100) {
          clearInterval(interval)
          setIsComplete(true)
          
          // Simulate results
          setTimeout(() => {
            const baseDomain = brandData.primaryDomain.replace('.com', '').replace('.net', '').replace('.org', '')
            const mockResults: ScanResults = {
              threatsFound: Math.floor(Math.random() * 5) + 3,
              domainsScanned: Math.floor(Math.random() * 50) + 20,
              scanTime: Math.floor(Math.random() * 30) + 15,
              threats: [
                {
                  id: '1',
                  domain: `${baseDomain}bet.com`,
                  type: 'typosquatting',
                  severity: 'high',
                  description: 'Lookalike domain targeting your brand with gambling content',
                  registrationDate: '2024-01-15',
                  lastSeen: '2024-07-20',
                  riskScore: 85
                },
                {
                  id: '2',
                  domain: `${baseDomain}-login.com`,
                  type: 'phishing',
                  severity: 'high',
                  description: 'Phishing site impersonating your login page',
                  registrationDate: '2024-03-22',
                  lastSeen: '2024-07-21',
                  riskScore: 92
                },
                {
                  id: '3',
                  domain: `${baseDomain}casino.net`,
                  type: 'impersonation',
                  severity: 'medium',
                  description: 'Brand impersonation with similar design and content',
                  registrationDate: '2024-02-10',
                  lastSeen: '2024-07-19',
                  riskScore: 67
                },
                {
                  id: '4',
                  domain: `${baseDomain}online.co`,
                  type: 'typosquatting',
                  severity: 'medium',
                  description: 'Typosquatting domain with similar branding',
                  registrationDate: '2024-04-05',
                  lastSeen: '2024-07-18',
                  riskScore: 58
                },
                {
                  id: '5',
                  domain: `${baseDomain}play.com`,
                  type: 'phishing',
                  severity: 'low',
                  description: 'Suspicious domain with potential phishing content',
                  registrationDate: '2024-05-12',
                  lastSeen: '2024-07-17',
                  riskScore: 42
                }
              ]
            }
            onScanComplete(mockResults)
          }, 2000)
        }
      }, updateInterval)

      return () => clearInterval(interval)
    }

    simulateScan()
  }, [brandData, onScanComplete])

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center px-4">
      <div className="max-w-2xl w-full">
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
          {/* Header */}
          <div className="mb-8">
            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-primary-600" />
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
              Scanning {brandData.brandName}
            </h1>
            <p className="text-gray-600">
              Analyzing your brand for potential threats and phishing domains
            </p>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
              <div 
                className="bg-primary-600 h-3 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <p className="text-sm text-gray-600">
              {Math.round(progress)}% Complete
            </p>
          </div>

          {/* Current Step */}
          <div className="mb-8">
            {scanSteps.map((step, index) => {
              const Icon = step.icon
              const isActive = index === currentStep
              const isCompleted = index < currentStep
              
              return (
                <div 
                  key={index}
                  className={`flex items-center space-x-4 p-4 rounded-lg mb-3 transition-all duration-300 ${
                    isActive 
                      ? 'bg-primary-50 border border-primary-200' 
                      : isCompleted 
                        ? 'bg-green-50 border border-green-200'
                        : 'bg-gray-50 border border-gray-200'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    isActive 
                      ? 'bg-primary-600' 
                      : isCompleted 
                        ? 'bg-green-600'
                        : 'bg-gray-400'
                  }`}>
                    {isCompleted ? (
                      <CheckCircle className="w-5 h-5 text-white" />
                    ) : (
                      <Icon className="w-5 h-5 text-white" />
                    )}
                  </div>
                  <div className="flex-1 text-left">
                    <h3 className={`font-medium ${
                      isActive ? 'text-primary-900' : isCompleted ? 'text-green-900' : 'text-gray-700'
                    }`}>
                      {step.title}
                    </h3>
                    <p className={`text-sm ${
                      isActive ? 'text-primary-700' : isCompleted ? 'text-green-700' : 'text-gray-500'
                    }`}>
                      {step.description}
                    </p>
                  </div>
                  {isActive && (
                    <div className="w-5 h-5 border-2 border-primary-600 border-t-transparent rounded-full animate-spin"></div>
                  )}
                </div>
              )
            })}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary-600">
                {Math.floor(progress / 20)}
              </div>
              <div className="text-sm text-gray-600">Steps Completed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                {Math.floor(progress * 0.5)}
              </div>
              <div className="text-sm text-gray-600">Domains Found</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {Math.floor(progress * 0.3)}
              </div>
              <div className="text-sm text-gray-600">Threats Analyzed</div>
            </div>
          </div>

          {/* Completion Message */}
          {isComplete && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span className="font-medium text-green-900">Scan Complete!</span>
              </div>
              <p className="text-sm text-green-700">
                Generating your comprehensive brand protection report...
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ScanningScreen 