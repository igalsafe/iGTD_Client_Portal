import { Search, Shield, Zap } from 'lucide-react'

interface HeroProps {
  onStartScan: () => void
  onTestEmailVerification?: () => void
}

const Hero = ({ onStartScan, onTestEmailVerification }: HeroProps) => {
  return (
    <section className="relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-50 to-blue-50">
        <div className="absolute inset-0 opacity-10 bg-primary-200"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="text-center">
          {/* Main Title */}
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Protect Your{' '}
            <span className="text-primary-600">iGaming Brand</span>
            <br />
            Detect & Remove Phishing Domains
          </h1>

          {/* Subheading */}
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Free scan for one brand – see real threats in{' '}
            <span className="font-semibold text-primary-600">60 seconds</span>.
          </p>

          {/* CTA Button */}
          <div className="mb-12">
            <button 
              onClick={onStartScan}
              className="btn-primary text-lg px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
            >
              <Search className="w-5 h-5 inline mr-2" />
              Start Free Scan
            </button>
            
            {/* Test Email Verification Button (for development) */}
            {onTestEmailVerification && (
              <div className="mt-4">
                <button 
                  onClick={onTestEmailVerification}
                  className="text-sm text-gray-500 hover:text-gray-700 underline"
                >
                  Test Email Verification Screen
                </button>
              </div>
            )}
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto mt-16">
            <div className="text-center">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Zap className="w-6 h-6 text-primary-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Lightning Fast</h3>
              <p className="text-gray-600">Get results in under 60 seconds with our advanced scanning technology</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Shield className="w-6 h-6 text-primary-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Comprehensive Protection</h3>
              <p className="text-gray-600">Detect and remove phishing domains targeting your brand</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Search className="w-6 h-6 text-primary-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Real-time Monitoring</h3>
              <p className="text-gray-600">Continuous monitoring to catch new threats as they emerge</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero 