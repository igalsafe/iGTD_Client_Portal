import { useState } from 'react'
import { Zap, CheckCircle, X } from 'lucide-react'

interface DemoDataButtonProps {
  onFillDemoData: () => void
  isVisible?: boolean
}

const DemoDataButton = ({ onFillDemoData, isVisible = true }: DemoDataButtonProps) => {
  const [showSuccess, setShowSuccess] = useState(false)

  const handleClick = () => {
    onFillDemoData()
    setShowSuccess(true)
    setTimeout(() => setShowSuccess(false), 2000)
  }

  if (!isVisible) return null

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {showSuccess ? (
        <div className="flex items-center space-x-2 bg-green-500 text-white px-4 py-3 rounded-lg shadow-lg">
          <CheckCircle className="w-5 h-5" />
          <span className="font-medium">Demo data filled!</span>
        </div>
      ) : (
        <button
          onClick={handleClick}
          className="flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
          title="Fill form with demo data for testing"
        >
          <Zap className="w-5 h-5" />
          <span className="font-medium">Demo Data</span>
        </button>
      )}
    </div>
  )
}

export default DemoDataButton 