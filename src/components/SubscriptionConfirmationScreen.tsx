import { useState } from 'react'
import { CheckCircle, Shield, CreditCard, ArrowRight, ArrowLeft, Download, Mail } from 'lucide-react'

interface SubscriptionConfirmationScreenProps {
  plan: Plan
  onBack: () => void
  onGoToDashboard: () => void
}

interface Plan {
  id: string
  name: string
  price: number
  annualPrice: number
  description: string
  features: string[]
  brandsSupported: number
  domainsMonitored: number
  hasApiAccess: boolean
  isPopular?: boolean
  isEnterprise?: boolean
}

const SubscriptionConfirmationScreen = ({ 
  plan, 
  onBack, 
  onGoToDashboard 
}: SubscriptionConfirmationScreenProps) => {
  const [currentStep, setCurrentStep] = useState<'payment' | 'success'>('payment')
  const [isProcessing, setIsProcessing] = useState(false)

  const handlePaymentSubmit = () => {
    setIsProcessing(true)
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false)
      setCurrentStep('success')
    }, 3000)
  }

  if (currentStep === 'success') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center h-16">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                  <Shield className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-gray-900">iGTD</span>
              </div>
            </div>
          </div>
        </header>

        {/* Success Content */}
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            {/* Success Icon */}
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>

            {/* Success Message */}
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Welcome to iGTD!
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Your {plan.name} plan has been activated successfully. Your brand protection is now active and monitoring has begun.
            </p>

            {/* Plan Details */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Your Plan Details</h2>
              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div>
                  <div className="text-2xl font-bold text-primary-600">{plan.name}</div>
                  <div className="text-sm text-gray-600">Plan</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-blue-600">
                    {plan.brandsSupported === -1 ? 'Unlimited' : plan.brandsSupported}
                  </div>
                  <div className="text-sm text-gray-600">Brands Protected</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-600">
                    {plan.domainsMonitored === -1 ? 'Unlimited' : plan.domainsMonitored.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-600">Domains Monitored</div>
                </div>
              </div>
            </div>

            {/* Next Steps */}
            <div className="bg-gradient-to-r from-primary-50 to-blue-50 rounded-2xl p-8 mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">What's Next?</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Shield className="w-6 h-6 text-primary-600" />
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">Add Your Brands</h4>
                  <p className="text-sm text-gray-600">Start by adding your first brand for protection</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Mail className="w-6 h-6 text-blue-600" />
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">Check Your Email</h4>
                  <p className="text-sm text-gray-600">We've sent you a welcome email with setup instructions</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Download className="w-6 h-6 text-green-600" />
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">Download Resources</h4>
                  <p className="text-sm text-gray-600">Access our setup guides and API documentation</p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <button
                onClick={onGoToDashboard}
                className="btn-primary text-lg px-8 py-4 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
              >
                <Shield className="w-5 h-5 inline mr-2" />
                Go to Dashboard
              </button>
              
              <button
                onClick={() => window.open('mailto:support@igtd.com', '_blank')}
                className="text-primary-600 hover:text-primary-700 font-medium py-2 px-4 rounded-lg border border-primary-200 hover:border-primary-300 transition-colors"
              >
                Contact Support
              </button>
            </div>
          </div>
        </main>
      </div>
    )
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
              <span>Back to Plans</span>
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

      {/* Payment Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Payment Form */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">Complete Your Subscription</h1>
            
            {/* Plan Summary */}
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-gray-900">{plan.name} Plan</span>
                <span className="text-lg font-bold text-gray-900">${plan.price.toLocaleString()}/month</span>
              </div>
              <p className="text-sm text-gray-600">{plan.description}</p>
            </div>

            {/* Payment Form */}
            <form className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Card Number
                </label>
                <input
                  type="text"
                  placeholder="1234 5678 9012 3456"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Expiry Date
                  </label>
                  <input
                    type="text"
                    placeholder="MM/YY"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    CVC
                  </label>
                  <input
                    type="text"
                    placeholder="123"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Cardholder Name
                </label>
                <input
                  type="text"
                  placeholder="John Doe"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Billing Address
                </label>
                <input
                  type="text"
                  placeholder="123 Main St, City, State 12345"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>

              <button
                type="button"
                onClick={handlePaymentSubmit}
                disabled={isProcessing}
                className="w-full btn-primary text-lg py-4 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isProcessing ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Processing...
                  </div>
                ) : (
                  <>
                    <CreditCard className="w-5 h-5 inline mr-2" />
                    Complete Payment
                  </>
                )}
              </button>
            </form>

            {/* Security Notice */}
            <div className="mt-6 p-4 bg-green-50 rounded-lg">
              <div className="flex items-start space-x-3">
                <Shield className="w-5 h-5 text-green-600 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-green-900">Secure Payment</p>
                  <p className="text-sm text-green-700">
                    Your payment information is encrypted and secure. We use industry-standard SSL encryption.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Order Summary</h2>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">{plan.name} Plan</span>
                  <span className="font-medium text-gray-900">${plan.price.toLocaleString()}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Setup Fee</span>
                  <span className="font-medium text-gray-900">$0</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Tax</span>
                  <span className="font-medium text-gray-900">$0</span>
                </div>
                
                <div className="border-t border-gray-200 pt-4">
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-semibold text-gray-900">Total</span>
                    <span className="text-lg font-bold text-gray-900">${plan.price.toLocaleString()}</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">Billed monthly</p>
                </div>
              </div>
            </div>

            {/* Plan Features */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">What's Included</h3>
              <ul className="space-y-3">
                {plan.features.slice(0, 6).map((feature, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-600">{feature}</span>
                  </li>
                ))}
                {plan.features.length > 6 && (
                  <li className="text-sm text-primary-600 font-medium">
                    +{plan.features.length - 6} more features
                  </li>
                )}
              </ul>
            </div>

            {/* Money Back Guarantee */}
            <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-6">
              <div className="text-center">
                <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-3" />
                <h4 className="font-semibold text-gray-900 mb-2">30-Day Money Back Guarantee</h4>
                <p className="text-sm text-gray-600">
                  Not satisfied? Get a full refund within 30 days. No questions asked.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default SubscriptionConfirmationScreen 