import { useState } from 'react'
import { 
  ArrowLeft, 
  CreditCard, 
  Calendar, 
  Download, 
  Eye, 
  Edit, 
  Plus,
  CheckCircle,
  AlertTriangle,
  TrendingUp,
  Shield,
  FileText,
  CreditCard as CreditCardIcon,
  ChevronRight,
  Lock,
  RefreshCw
} from 'lucide-react'

interface AccountBillingScreenProps {
  onBack: () => void
  onUpgradePlan: () => void
}

interface Subscription {
  plan: 'basic' | 'pro' | 'enterprise' | 'premium'
  status: 'active' | 'cancelled' | 'past_due'
  nextBillingDate: string
  amount: number
  billingCycle: 'monthly' | 'annual'
  autoRenew: boolean
  usage: {
    domainsMonitored: number
    domainsLimit: number
    scansThisMonth: number
    scansLimit: number
    apiCalls: number
    apiLimit: number
  }
}

interface PaymentMethod {
  id: string
  type: 'card' | 'bank'
  last4: string
  brand: string
  expiryMonth: number
  expiryYear: number
  isDefault: boolean
  cardholderName: string
}

interface Invoice {
  id: string
  date: string
  amount: number
  status: 'paid' | 'pending' | 'failed'
  description: string
  invoiceNumber: string
  downloadUrl?: string
}

const AccountBillingScreen = ({ onBack, onUpgradePlan }: AccountBillingScreenProps) => {
  const [isEditingPayment, setIsEditingPayment] = useState(false)
  const [isAddingPayment, setIsAddingPayment] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  // Mock data
  const subscription: Subscription = {
    plan: 'enterprise',
    status: 'active',
    nextBillingDate: '2024-08-21',
    amount: 4000,
    billingCycle: 'monthly',
    autoRenew: true,
    usage: {
      domainsMonitored: 8,
      domainsLimit: 15,
      scansThisMonth: 45,
      scansLimit: 100,
      apiCalls: 1250,
      apiLimit: 5000
    }
  }

  const paymentMethods: PaymentMethod[] = [
    {
      id: '1',
      type: 'card',
      last4: '4242',
      brand: 'Visa',
      expiryMonth: 12,
      expiryYear: 2025,
      isDefault: true,
      cardholderName: 'John Doe'
    },
    {
      id: '2',
      type: 'card',
      last4: '5555',
      brand: 'Mastercard',
      expiryMonth: 8,
      expiryYear: 2026,
      isDefault: false,
      cardholderName: 'John Doe'
    }
  ]

  const invoices: Invoice[] = [
    {
      id: '1',
      date: '2024-07-21',
      amount: 4000,
      status: 'paid',
      description: 'Enterprise Plan - July 2024',
      invoiceNumber: 'INV-2024-001',
      downloadUrl: '/api/invoices/inv-2024-001.pdf'
    },
    {
      id: '2',
      date: '2024-06-21',
      amount: 4000,
      status: 'paid',
      description: 'Enterprise Plan - June 2024',
      invoiceNumber: 'INV-2024-002',
      downloadUrl: '/api/invoices/inv-2024-002.pdf'
    },
    {
      id: '3',
      date: '2024-05-21',
      amount: 4000,
      status: 'paid',
      description: 'Enterprise Plan - May 2024',
      invoiceNumber: 'INV-2024-003',
      downloadUrl: '/api/invoices/inv-2024-003.pdf'
    },
    {
      id: '4',
      date: '2024-04-21',
      amount: 2250,
      status: 'paid',
      description: 'Premium Plan - April 2024',
      invoiceNumber: 'INV-2024-004',
      downloadUrl: '/api/invoices/inv-2024-004.pdf'
    }
  ]

  const handleDownloadInvoice = (invoice: Invoice) => {
    // Simulate invoice download
    console.log('Downloading invoice:', invoice.invoiceNumber)
    const link = document.createElement('a')
    link.href = invoice.downloadUrl || '#'
    link.download = `${invoice.invoiceNumber}.pdf`
    link.click()
  }

  const handleViewInvoice = (invoice: Invoice) => {
    // Simulate invoice viewing
    console.log('Viewing invoice:', invoice.invoiceNumber)
    window.open(invoice.downloadUrl, '_blank')
  }

  const handleSetDefaultPayment = (paymentId: string) => {
    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
    }, 1000)
  }

  const handleRemovePayment = (paymentId: string) => {
    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
    }, 1000)
  }

  const getPlanColor = (plan: string) => {
    switch (plan) {
      case 'enterprise':
        return 'bg-purple-100 text-purple-800 border-purple-200'
      case 'premium':
        return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'pro':
        return 'bg-green-100 text-green-800 border-green-200'
      case 'basic':
        return 'bg-gray-100 text-gray-800 border-gray-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800 border-green-200'
      case 'cancelled':
        return 'bg-red-100 text-red-800 border-red-200'
      case 'past_due':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getInvoiceStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
        return 'bg-green-100 text-green-800 border-green-200'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'failed':
        return 'bg-red-100 text-red-800 border-red-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount)
  }

  const getUsagePercentage = (used: number, limit: number) => {
    return Math.round((used / limit) * 100)
  }

  const getUsageColor = (percentage: number) => {
    if (percentage >= 90) return 'text-red-600'
    if (percentage >= 75) return 'text-yellow-600'
    return 'text-green-600'
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
                onClick={onUpgradePlan}
                className="btn-primary"
              >
                <TrendingUp className="w-4 h-4 mr-2" />
                Upgrade Plan
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Account & Billing</h1>
          <p className="text-gray-600">
            Manage your subscription, payment methods, and billing history
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Subscription & Usage */}
          <div className="lg:col-span-2 space-y-8">
            {/* Current Subscription */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">Current Subscription</h2>
              </div>
              <div className="p-6">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <div className="flex items-center space-x-3 mb-2">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getPlanColor(subscription.plan)}`}>
                        {subscription.plan.charAt(0).toUpperCase() + subscription.plan.slice(1)} Plan
                      </span>
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(subscription.status)}`}>
                        {subscription.status.charAt(0).toUpperCase() + subscription.status.slice(1)}
                      </span>
                    </div>
                    <p className="text-2xl font-bold text-gray-900">
                      {formatCurrency(subscription.amount)}/{subscription.billingCycle === 'monthly' ? 'month' : 'year'}
                    </p>
                    <p className="text-sm text-gray-600 mt-1">
                      Next billing: {new Date(subscription.nextBillingDate).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">Auto-renewal</p>
                    <p className={`text-sm font-medium ${subscription.autoRenew ? 'text-green-600' : 'text-red-600'}`}>
                      {subscription.autoRenew ? 'Enabled' : 'Disabled'}
                    </p>
                  </div>
                </div>

                {/* Usage Stats */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900">Usage This Month</h3>
                  
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-700">Domains</span>
                        <span className={`text-sm font-medium ${getUsageColor(getUsagePercentage(subscription.usage.domainsMonitored, subscription.usage.domainsLimit))}`}>
                          {subscription.usage.domainsMonitored}/{subscription.usage.domainsLimit}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${getUsagePercentage(subscription.usage.domainsMonitored, subscription.usage.domainsLimit) >= 90 ? 'bg-red-500' : getUsagePercentage(subscription.usage.domainsMonitored, subscription.usage.domainsLimit) >= 75 ? 'bg-yellow-500' : 'bg-green-500'}`}
                          style={{ width: `${getUsagePercentage(subscription.usage.domainsMonitored, subscription.usage.domainsLimit)}%` }}
                        ></div>
                      </div>
                    </div>

                    <div className="p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-700">Scans</span>
                        <span className={`text-sm font-medium ${getUsageColor(getUsagePercentage(subscription.usage.scansThisMonth, subscription.usage.scansLimit))}`}>
                          {subscription.usage.scansThisMonth}/{subscription.usage.scansLimit}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${getUsagePercentage(subscription.usage.scansThisMonth, subscription.usage.scansLimit) >= 90 ? 'bg-red-500' : getUsagePercentage(subscription.usage.scansThisMonth, subscription.usage.scansLimit) >= 75 ? 'bg-yellow-500' : 'bg-green-500'}`}
                          style={{ width: `${getUsagePercentage(subscription.usage.scansThisMonth, subscription.usage.scansLimit)}%` }}
                        ></div>
                      </div>
                    </div>

                    <div className="p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-700">API Calls</span>
                        <span className={`text-sm font-medium ${getUsageColor(getUsagePercentage(subscription.usage.apiCalls, subscription.usage.apiLimit))}`}>
                          {subscription.usage.apiCalls.toLocaleString()}/{subscription.usage.apiLimit.toLocaleString()}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${getUsagePercentage(subscription.usage.apiCalls, subscription.usage.apiLimit) >= 90 ? 'bg-red-500' : getUsagePercentage(subscription.usage.apiCalls, subscription.usage.apiLimit) >= 75 ? 'bg-yellow-500' : 'bg-green-500'}`}
                          style={{ width: `${getUsagePercentage(subscription.usage.apiCalls, subscription.usage.apiLimit)}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Billing History */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">Billing History</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Invoice
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Amount
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {invoices.map((invoice) => (
                      <tr key={invoice.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <p className="text-sm font-medium text-gray-900">{invoice.invoiceNumber}</p>
                            <p className="text-sm text-gray-600">{invoice.description}</p>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="text-sm text-gray-900">
                            {new Date(invoice.date).toLocaleDateString()}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="text-sm font-medium text-gray-900">
                            {formatCurrency(invoice.amount)}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getInvoiceStatusColor(invoice.status)}`}>
                            {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => handleViewInvoice(invoice)}
                              className="text-sm text-primary-600 hover:text-primary-700 font-medium"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDownloadInvoice(invoice)}
                              className="text-sm text-gray-600 hover:text-gray-700"
                            >
                              <Download className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Right Column - Payment Methods */}
          <div className="space-y-8">
            {/* Payment Methods */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-gray-900">Payment Methods</h2>
                  <button
                    onClick={() => setIsAddingPayment(true)}
                    className="btn-primary flex items-center space-x-2"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add New</span>
                  </button>
                </div>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {paymentMethods.map((method) => (
                    <div key={method.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-6 bg-gray-100 rounded flex items-center justify-center">
                            <CreditCardIcon className="w-4 h-4 text-gray-600" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-900">
                              {method.brand} •••• {method.last4}
                            </p>
                            <p className="text-xs text-gray-600">
                              Expires {method.expiryMonth.toString().padStart(2, '0')}/{method.expiryYear}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          {method.isDefault && (
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              Default
                            </span>
                          )}
                          <button
                            onClick={() => setIsEditingPayment(true)}
                            className="text-gray-400 hover:text-gray-600"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                      
                      {!method.isDefault && (
                        <div className="mt-3 pt-3 border-t border-gray-100 flex items-center space-x-2">
                          <button
                            onClick={() => handleSetDefaultPayment(method.id)}
                            disabled={isLoading}
                            className="text-sm text-primary-600 hover:text-primary-700 font-medium"
                          >
                            Set as Default
                          </button>
                          <button
                            onClick={() => handleRemovePayment(method.id)}
                            disabled={isLoading}
                            className="text-sm text-red-600 hover:text-red-700 font-medium"
                          >
                            Remove
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Add Payment Method Form */}
                {isAddingPayment && (
                  <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Add Payment Method</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Card Number
                        </label>
                        <input
                          type="text"
                          placeholder="1234 5678 9012 3456"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Expiry Date
                          </label>
                          <input
                            type="text"
                            placeholder="MM/YY"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            CVC
                          </label>
                          <input
                            type="text"
                            placeholder="123"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Cardholder Name
                        </label>
                        <input
                          type="text"
                          placeholder="John Doe"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                        />
                      </div>
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id="default-payment"
                          className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                        />
                        <label htmlFor="default-payment" className="text-sm text-gray-700">
                          Set as default payment method
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Lock className="w-4 h-4 text-gray-400" />
                        <span className="text-xs text-gray-600">
                          Your payment information is encrypted and secure
                        </span>
                      </div>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => setIsAddingPayment(false)}
                          className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                          Cancel
                        </button>
                        <button className="flex-1 btn-primary">
                          Add Payment Method
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Account Security */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">Account Security</h2>
              </div>
              <div className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900">Two-Factor Authentication</p>
                    <p className="text-xs text-gray-600">Add an extra layer of security</p>
                  </div>
                  <button className="text-sm text-primary-600 hover:text-primary-700 font-medium">
                    Enable
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900">Login History</p>
                    <p className="text-xs text-gray-600">View recent login activity</p>
                  </div>
                  <button className="text-sm text-primary-600 hover:text-primary-700 font-medium">
                    View
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900">API Keys</p>
                    <p className="text-xs text-gray-600">Manage your API access</p>
                  </div>
                  <button className="text-sm text-primary-600 hover:text-primary-700 font-medium">
                    Manage
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default AccountBillingScreen 