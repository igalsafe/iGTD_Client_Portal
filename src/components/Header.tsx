import { Shield, LogIn } from 'lucide-react'

interface HeaderProps {
  onSignUp: () => void
}

const Header = ({ onSignUp }: HeaderProps) => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">iGTD</span>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-gray-600 hover:text-gray-900 transition-colors">
              Features
            </a>
            <a href="#pricing" className="text-gray-600 hover:text-gray-900 transition-colors">
              Pricing
            </a>
            <a href="#about" className="text-gray-600 hover:text-gray-900 transition-colors">
              About
            </a>
          </nav>

          {/* Auth Buttons */}
          <div className="flex items-center space-x-4">
            <button className="btn-secondary flex items-center space-x-2">
              <LogIn className="w-4 h-4" />
              <span>Login</span>
            </button>
            <button 
              onClick={onSignUp}
              className="btn-primary"
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header 