import { useState, useEffect } from 'react'
import { Check, Crown, Shield, Zap, Globe, ArrowLeft, Star } from 'lucide-react'

interface PlanSelectionScreenProps {
  onBack: () => void
  onSelectPlan: (plan: Plan) => void
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

const PlanSelectionScreen = ({ onBack, onSelectPlan }: PlanSelectionScreenProps) => {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly')

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const plans: Plan[] = [
    {
      id: 'starter',
      name: 'Starter',
      price: 600,
      annualPrice: 6000,
      description: 'Perfect for small businesses starting with brand protection',
      features: [
        'Up to 5 brands protected',
        '100 domains monitored',
        'Basic threat detection',
        'Email alerts',
        'Standard support',
        'Monthly reports'
      ],
      brandsSupported: 5,
      domainsMonitored: 100,
      hasApiAccess: false
    },
    {
      id: 'professional',
      name: 'Professional',
      price: 1200,
      annualPrice: 12000,
      description: 'Ideal for growing companies with multiple brands',
      features: [
        'Up to 15 brands protected',
        '500 domains monitored',
        'Advanced threat detection',
        'Priority email alerts',
        'Priority support',
        'Weekly reports',
        'API access',
        'Custom integrations'
      ],
      brandsSupported: 15,
      domainsMonitored: 500,
      hasApiAccess: true
    },
    {
      id: 'business',
      name: 'Business',
      price: 2250,
      annualPrice: 22500,
      description: 'Comprehensive protection for established businesses',
      features: [
        'Up to 50 brands protected',
        '2000 domains monitored',
        'AI-powered threat detection',
        'Real-time alerts',
        'Dedicated support',
        'Daily reports',
        'Full API access',
        'Custom integrations',
        'White-label options',
        'Advanced analytics'
      ],
      brandsSupported: 50,
      domainsMonitored: 2000,
      hasApiAccess: true,
      isPopular: true
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: 4000,
      annualPrice: 40000,
      description: 'Ultimate protection for large enterprises',
      features: [
        'Unlimited brands protected',
        'Unlimited domains monitored',
        'AI-powered threat detection',
        'Real-time alerts',
        '24/7 dedicated support',
        'Custom reporting',
        'Full API access',
        'Custom integrations',
        'White-label options',
        'Advanced analytics',
        'Custom SLA',
        'On-premise options'
      ],
      brandsSupported: -1, // Unlimited
      domainsMonitored: -1, // Unlimited
      hasApiAccess: true,
      isEnterprise: true
    }
  ]

  const getPrice = (plan: Plan) => {
    return billingCycle === 'annual' ? plan.annualPrice : plan.price
  }

  const getSavings = (plan: Plan) => {
    if (billingCycle === 'annual') {
      const monthlyTotal = plan.price * 12
      const savings = monthlyTotal - plan.annualPrice
      return savings
    }
    return 0
  }

  const handlePlanSelect = (planId: string) => {
    setSelectedPlan(planId)
    // Immediately proceed to next step when plan is selected
    const plan = plans.find(p => p.id === planId)
    if (plan) {
      onSelectPlan(plan)
    }
  }

  const handleSubscribe = () => {
    if (selectedPlan) {
      const plan = plans.find(p => p.id === selectedPlan)
      if (plan) {
        onSelectPlan(plan)
      }
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
              <span>Back to Results</span>
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
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Choose Your Plan
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Select the perfect plan for your brand protection needs. All plans include our core threat detection and monitoring features.
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center space-x-4 mb-8">
            <span className={`text-sm font-medium ${billingCycle === 'monthly' ? 'text-gray-900' : 'text-gray-500'}`}>
              Monthly
            </span>
            <button
              onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'annual' : 'monthly')}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                billingCycle === 'annual' ? 'bg-primary-600' : 'bg-gray-200'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  billingCycle === 'annual' ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
            <span className={`text-sm font-medium ${billingCycle === 'annual' ? 'text-gray-900' : 'text-gray-500'}`}>
              Annual
            </span>
            {billingCycle === 'annual' && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                Save up to 17%
              </span>
            )}
          </div>
        </div>

        {/* Plans Grid */}
        <div className="grid lg:grid-cols-4 gap-6 mb-12">
          {plans.map((plan) => {
            const price = getPrice(plan)
            const savings = getSavings(plan)
            const isSelected = selectedPlan === plan.id

            return (
              <div
                key={plan.id}
                className={`relative bg-white rounded-2xl shadow-sm border-2 transition-all duration-200 hover:shadow-lg ${
                  isSelected 
                    ? 'border-primary-500 shadow-lg transform scale-105' 
                    : 'border-gray-200 hover:border-gray-300'
                } ${plan.isPopular ? 'ring-2 ring-primary-200' : ''}`}
              >
                {/* Popular Badge */}
                {plan.isPopular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary-600 text-white">
                      <Star className="w-3 h-3 mr-1" />
                      Most Popular
                    </span>
                  </div>
                )}

                {/* Enterprise Badge */}
                {plan.isEnterprise && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-600 text-white">
                      <Crown className="w-3 h-3 mr-1" />
                      Enterprise
                    </span>
                  </div>
                )}

                <div className="p-6 flex flex-col h-full">
                  {/* Plan Header */}
                  <div className="text-center mb-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                    <p className="text-sm text-gray-600 mb-4">{plan.description}</p>
                    
                    {/* Pricing */}
                    <div className="mb-4">
                      <div className="flex items-baseline justify-center">
                        <span className="text-3xl font-bold text-gray-900">${price.toLocaleString()}</span>
                        <span className="text-gray-500 ml-1">
                          /{billingCycle === 'annual' ? 'year' : 'month'}
                        </span>
                      </div>
                      {savings > 0 && (
                        <p className="text-sm text-green-600 mt-1">
                          Save ${savings.toLocaleString()} annually
                        </p>
                      )}
                    </div>
                    
                    {/* Top CTA Button */}
                    <button
                      onClick={() => handlePlanSelect(plan.id)}
                      className={`w-full py-2 px-4 rounded-lg text-sm font-medium transition-all duration-200 mb-4 ${
                        isSelected
                          ? 'bg-primary-600 text-white hover:bg-primary-700 shadow-md'
                          : 'bg-primary-50 text-primary-700 hover:bg-primary-100 border border-primary-200 hover:border-primary-300'
                      }`}
                    >
                      {isSelected ? '✓ Selected' : 'Get Started'}
                    </button>
                  </div>

                  {/* Features */}
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Brands Supported:</span>
                      <span className="font-medium text-gray-900">
                        {plan.brandsSupported === -1 ? 'Unlimited' : plan.brandsSupported}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Domains Monitored:</span>
                      <span className="font-medium text-gray-900">
                        {plan.domainsMonitored === -1 ? 'Unlimited' : plan.domainsMonitored.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">API Access:</span>
                      <span className={`font-medium ${plan.hasApiAccess ? 'text-green-600' : 'text-gray-400'}`}>
                        {plan.hasApiAccess ? 'Yes' : 'No'}
                      </span>
                    </div>
                  </div>

                  {/* Feature List */}
                  <ul className="space-y-2 mb-6 flex-grow">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Select Button */}
                  <button
                    onClick={() => handlePlanSelect(plan.id)}
                    className={`w-full py-3 px-4 rounded-lg font-medium transition-all duration-200 mt-auto flex items-center justify-center space-x-2 ${
                      isSelected
                        ? 'bg-primary-600 text-white hover:bg-primary-700 shadow-lg'
                        : 'bg-gray-100 text-gray-700 hover:bg-primary-50 hover:text-primary-700 hover:border-2 hover:border-primary-200 hover:shadow-md'
                    }`}
                  >
                    {isSelected ? (
                      <>
                        <span>Selected ✓</span>
                      </>
                    ) : (
                      <>
                        <span>Choose This Plan</span>
                        <span className="text-xs opacity-75">→</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            )
          })}
        </div>

        {/* FAQ Section */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">Frequently Asked Questions</h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Can I change my plan later?</h4>
              <p className="text-gray-600 text-sm">
                Yes, you can upgrade or downgrade your plan at any time. Changes will be prorated based on your billing cycle.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">What payment methods do you accept?</h4>
              <p className="text-gray-600 text-sm">
                We accept all major credit cards, PayPal, and bank transfers for annual plans. All payments are processed securely.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Is there a free trial?</h4>
              <p className="text-gray-600 text-sm">
                Yes, we offer a 14-day free trial for all plans. No credit card required to start your trial.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">What if I need more features?</h4>
              <p className="text-gray-600 text-sm">
                Contact our sales team for custom enterprise solutions with additional features and dedicated support.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default PlanSelectionScreen 