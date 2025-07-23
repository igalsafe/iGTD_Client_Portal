import { useState } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import RegistrationModal from './components/RegistrationModal'
import EmailVerification from './components/EmailVerification'
import MainDashboard from './components/MainDashboard'
import AddBrandScreen from './components/AddBrandScreen'
import ScanningScreen from './components/ScanningScreen'
import ScanResultsScreen from './components/ScanResultsScreen'
import ThreatDetailsModal from './components/ThreatDetailsModal'
import PlanSelectionScreen from './components/PlanSelectionScreen'
import PaymentKYCScreen from './components/PaymentKYCScreen'
import BrandManagementScreen from './components/BrandManagementScreen'
import ReportsScreen from './components/ReportsScreen'
import AccountBillingScreen from './components/AccountBillingScreen'
import DemoDataButton from './components/DemoDataButton'
import Toast from './components/Toast'

type AppView = 'landing' | 'emailVerification' | 'dashboard' | 'addBrand' | 'scanning' | 'scanResults' | 'planSelection' | 'paymentKYC' | 'brandManagement' | 'reports' | 'accountBilling'

interface ToastMessage {
  id: string
  message: string
  type: 'success' | 'error' | 'info'
}

interface BrandData {
  brandName: string
  primaryDomain: string
  category: string
  logo?: File
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
  registrationDate?: string
  lastSeen?: string
  riskScore?: number
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

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentView, setCurrentView] = useState<AppView>('landing')
  const [userEmail, setUserEmail] = useState('')
  const [brandData, setBrandData] = useState<BrandData | null>(null)
  const [scanResults, setScanResults] = useState<ScanResults | null>(null)
  const [selectedThreat, setSelectedThreat] = useState<Threat | null>(null)
  const [isThreatModalOpen, setIsThreatModalOpen] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null)
  const [toasts, setToasts] = useState<ToastMessage[]>([])
  const [demoDataFilled, setDemoDataFilled] = useState(false)

  const openModal = () => setIsModalOpen(true)
  const closeModal = () => setIsModalOpen(false)

  const addToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    const id = Date.now().toString()
    setToasts(prev => [...prev, { id, message, type }])
  }

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id))
  }

  const handleFillDemoData = () => {
    setDemoDataFilled(true)
    addToast('Demo data ready! Forms will be auto-filled.', 'info')
  }

  const handleRegistrationSuccess = (email: string) => {
    setUserEmail(email)
    setCurrentView('emailVerification')
    closeModal()
    addToast('Registration successful! Please check your email.', 'success')
  }

  const handleResendEmail = () => {
    console.log('Resending email to:', userEmail)
    addToast('Verification email sent!', 'success')
  }

  const handleChangeEmail = () => {
    setCurrentView('landing')
    openModal()
  }

  const handleVerificationSuccess = () => {
    setCurrentView('addBrand')
    addToast('Email verified successfully! Add your brand to start scanning.', 'success')
  }

  const handleLogout = () => {
    setCurrentView('landing')
    setUserEmail('')
    setBrandData(null)
    setScanResults(null)
    setSelectedThreat(null)
    setIsThreatModalOpen(false)
    setSelectedPlan(null)
    addToast('Logged out successfully.', 'info')
  }

  const handleTestEmailVerification = () => {
    setUserEmail('test@example.com')
    setCurrentView('emailVerification')
  }

  const handleStartScan = (data: BrandData) => {
    setBrandData(data)
    setCurrentView('scanning')
    addToast('Starting brand protection scan...', 'info')
  }

  const handleScanComplete = (results: ScanResults) => {
    setScanResults(results)
    setCurrentView('scanResults')
    addToast(`Scan complete! Found ${results.threatsFound} potential threats.`, 'success')
  }

  const handleBackToDashboard = () => {
    setCurrentView('dashboard')
  }

  const handleRunAnotherScan = () => {
    setCurrentView('addBrand')
  }

  const handleSubscribe = () => {
    setCurrentView('planSelection')
    addToast('Redirecting to plan selection...', 'info')
  }

  const handleViewThreatDetails = (threat: Threat) => {
    setSelectedThreat(threat)
    setIsThreatModalOpen(true)
  }

  const handleCloseThreatModal = () => {
    setIsThreatModalOpen(false)
    setSelectedThreat(null)
  }

  const handleSelectPlan = (plan: Plan) => {
    setSelectedPlan(plan)
    setCurrentView('paymentKYC')
    addToast(`Selected ${plan.name} plan. Completing payment & verification...`, 'success')
  }

  const handleBackToResults = () => {
    setCurrentView('scanResults')
  }

  const handleGoToDashboard = () => {
    setCurrentView('dashboard')
    addToast('Welcome to your dashboard! Your subscription is now active.', 'success')
  }

  const handleBrandManagement = () => {
    setCurrentView('brandManagement')
  }

  const handleBrandManagementSave = (brandData: any) => {
    addToast('Brand settings saved successfully!', 'success')
    setCurrentView('dashboard')
  }

  const handleReports = () => {
    setCurrentView('reports')
  }

  const handleAccountBilling = () => {
    setCurrentView('accountBilling')
  }

  const handleUpgradePlan = () => {
    setCurrentView('planSelection')
  }

  // Show account & billing screen
  if (currentView === 'accountBilling') {
    return (
      <>
        <AccountBillingScreen
          onBack={() => setCurrentView('dashboard')}
          onUpgradePlan={handleUpgradePlan}
        />
        <DemoDataButton onFillDemoData={handleFillDemoData} />
        {toasts.map(toast => (
          <Toast
            key={toast.id}
            message={toast.message}
            type={toast.type}
            onClose={() => removeToast(toast.id)}
          />
        ))}
      </>
    )
  }

  // Show reports screen
  if (currentView === 'reports') {
    return (
      <>
        <ReportsScreen
          onBack={() => setCurrentView('dashboard')}
        />
        <DemoDataButton onFillDemoData={handleFillDemoData} />
        {toasts.map(toast => (
          <Toast
            key={toast.id}
            message={toast.message}
            type={toast.type}
            onClose={() => removeToast(toast.id)}
          />
        ))}
      </>
    )
  }

  // Show brand management screen
  if (currentView === 'brandManagement') {
    return (
      <>
        <BrandManagementScreen
          onBack={() => setCurrentView('dashboard')}
          onSave={handleBrandManagementSave}
          demoDataFilled={demoDataFilled}
        />
        <DemoDataButton onFillDemoData={handleFillDemoData} />
        {toasts.map(toast => (
          <Toast
            key={toast.id}
            message={toast.message}
            type={toast.type}
            onClose={() => removeToast(toast.id)}
          />
        ))}
      </>
    )
  }

  // Show payment & KYC screen
  if (currentView === 'paymentKYC' && selectedPlan) {
    return (
      <>
        <PaymentKYCScreen
          plan={selectedPlan}
          onBack={() => setCurrentView('planSelection')}
          onComplete={handleGoToDashboard}
          demoDataFilled={demoDataFilled}
        />
        <DemoDataButton onFillDemoData={handleFillDemoData} />
        {toasts.map(toast => (
          <Toast
            key={toast.id}
            message={toast.message}
            type={toast.type}
            onClose={() => removeToast(toast.id)}
          />
        ))}
      </>
    )
  }

  // Show plan selection screen
  if (currentView === 'planSelection') {
    return (
      <>
        <PlanSelectionScreen
          onBack={handleBackToResults}
          onSelectPlan={handleSelectPlan}
        />
        <DemoDataButton onFillDemoData={handleFillDemoData} />
        {toasts.map(toast => (
          <Toast
            key={toast.id}
            message={toast.message}
            type={toast.type}
            onClose={() => removeToast(toast.id)}
          />
        ))}
      </>
    )
  }

  // Show scan results screen
  if (currentView === 'scanResults' && scanResults) {
    return (
      <>
        <ScanResultsScreen
          scanResults={scanResults}
          onBack={handleBackToDashboard}
          onRunAnotherScan={handleRunAnotherScan}
          onSubscribe={handleSubscribe}
          onViewDetails={handleViewThreatDetails}
        />
        <ThreatDetailsModal
          threat={selectedThreat}
          isOpen={isThreatModalOpen}
          onClose={handleCloseThreatModal}
        />
        <DemoDataButton onFillDemoData={handleFillDemoData} />
        {toasts.map(toast => (
          <Toast
            key={toast.id}
            message={toast.message}
            type={toast.type}
            onClose={() => removeToast(toast.id)}
          />
        ))}
      </>
    )
  }

  // Show scanning screen
  if (currentView === 'scanning' && brandData) {
    return (
      <>
        <ScanningScreen 
          brandData={brandData} 
          onScanComplete={handleScanComplete}
        />
        <DemoDataButton onFillDemoData={handleFillDemoData} />
        {toasts.map(toast => (
          <Toast
            key={toast.id}
            message={toast.message}
            type={toast.type}
            onClose={() => removeToast(toast.id)}
          />
        ))}
      </>
    )
  }

  // Show add brand screen
  if (currentView === 'addBrand') {
    return (
      <>
        <AddBrandScreen 
          onBack={() => setCurrentView('dashboard')}
          onStartScan={handleStartScan}
          demoDataFilled={demoDataFilled}
        />
        <DemoDataButton onFillDemoData={handleFillDemoData} />
        {toasts.map(toast => (
          <Toast
            key={toast.id}
            message={toast.message}
            type={toast.type}
            onClose={() => removeToast(toast.id)}
          />
        ))}
      </>
    )
  }

  // Show dashboard
  if (currentView === 'dashboard') {
    return (
      <>
        <MainDashboard 
          email={userEmail} 
          onLogout={handleLogout}
          onStartScan={() => setCurrentView('addBrand')}
          onBrandManagement={handleBrandManagement}
          onReports={handleReports}
          onAccountBilling={handleAccountBilling}
        />
        <DemoDataButton onFillDemoData={handleFillDemoData} />
        {toasts.map(toast => (
          <Toast
            key={toast.id}
            message={toast.message}
            type={toast.type}
            onClose={() => removeToast(toast.id)}
          />
        ))}
      </>
    )
  }

  // Show email verification screen
  if (currentView === 'emailVerification') {
    return (
      <>
        <EmailVerification
          email={userEmail}
          onResendEmail={handleResendEmail}
          onChangeEmail={handleChangeEmail}
          onVerificationSuccess={handleVerificationSuccess}
        />
        <DemoDataButton onFillDemoData={handleFillDemoData} />
        {toasts.map(toast => (
          <Toast
            key={toast.id}
            message={toast.message}
            type={toast.type}
            onClose={() => removeToast(toast.id)}
          />
        ))}
      </>
    )
  }

  // Show landing page
  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <Header onSignUp={openModal} />
        <Hero 
          onStartScan={openModal} 
          onTestEmailVerification={handleTestEmailVerification}
        />
        <RegistrationModal 
          isOpen={isModalOpen} 
          onClose={closeModal}
          onSuccess={handleRegistrationSuccess}
          demoDataFilled={demoDataFilled}
        />
      </div>
      <DemoDataButton onFillDemoData={handleFillDemoData} />
      {toasts.map(toast => (
        <Toast
          key={toast.id}
          message={toast.message}
          type={toast.type}
          onClose={() => removeToast(toast.id)}
        />
      ))}
    </>
  )
}

export default App 