import { useState } from 'react'
import { Mail, RefreshCw, Edit, Key, CheckCircle } from 'lucide-react'

interface EmailVerificationProps {
  email?: string
  onResendEmail?: () => void
  onChangeEmail?: () => void
  onVerificationSuccess?: () => void
}

const EmailVerification = ({ 
  email = "user@example.com", 
  onResendEmail, 
  onChangeEmail,
  onVerificationSuccess
}: EmailVerificationProps) => {
  const [showCodeInput, setShowCodeInput] = useState(false)
  const [verificationCode, setVerificationCode] = useState('')
  const [isVerifying, setIsVerifying] = useState(false)
  const [isVerified, setIsVerified] = useState(false)
  const [error, setError] = useState('')

  const handleVerifyCode = async () => {
    if (!verificationCode.trim()) {
      setError('Please enter the verification code')
      return
    }

    if (verificationCode.length !== 6) {
      setError('Verification code must be 6 digits')
      return
    }

    if (!/^\d+$/.test(verificationCode)) {
      setError('Verification code must contain only numbers')
      return
    }

    setIsVerifying(true)
    setError('')

    // Simulate API call
    setTimeout(() => {
      // For demo purposes, accept any 6-digit code
      if (verificationCode.length === 6 && /^\d+$/.test(verificationCode)) {
        setIsVerified(true)
        setIsVerifying(false)
        // Show success for 2 seconds then proceed
        setTimeout(() => {
          onVerificationSuccess?.()
        }, 2000)
      } else {
        setError('Invalid verification code. Please check your email and try again.')
        setIsVerifying(false)
      }
    }, 1500)
  }

  const handleResendCode = () => {
    setVerificationCode('')
    setError('')
    onResendEmail?.()
  }

  if (isVerified) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center px-4">
        <div className="max-w-md w-full">
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Email Verified Successfully!
            </h1>
            <p className="text-gray-600 mb-8">
              Your email has been verified. Redirecting you to the dashboard...
            </p>
            <div className="animate-pulse">
              <div className="w-8 h-8 border-4 border-primary-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-white" />
              </div>
              <span className="ml-2 text-sm font-medium text-green-600">Registration</span>
            </div>
            <div className="w-8 h-1 bg-green-600"></div>
            <div className="flex items-center">
              <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center">
                <Mail className="w-5 h-5 text-white" />
              </div>
              <span className="ml-2 text-sm font-medium text-primary-600">Email Verification</span>
            </div>
            <div className="w-8 h-1 bg-gray-300"></div>
            <div className="flex items-center">
              <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                <span className="text-sm font-medium text-gray-500">3</span>
              </div>
              <span className="ml-2 text-sm font-medium text-gray-500">Setup</span>
            </div>
          </div>
          <p className="text-center text-sm text-gray-500">Step 2 of 4</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
          {/* Icon */}
          <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Mail className="w-8 h-8 text-primary-600" />
          </div>

          {/* Title */}
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            Check your inbox for the verification email
          </h1>

          {/* Subheading */}
          <p className="text-gray-600 mb-8 leading-relaxed">
            If you haven't received it, check your spam folder.
          </p>

          {/* Email Display */}
          <div className="bg-gray-50 rounded-lg p-4 mb-8">
            <p className="text-sm text-gray-500 mb-1">Verification email sent to:</p>
            <p className="font-medium text-gray-900">{email}</p>
          </div>

          {/* Verification Code Input */}
          {showCodeInput && (
            <div className="space-y-4">
              <div>
                <label htmlFor="verificationCode" className="block text-sm font-medium text-gray-700 mb-2">
                  Enter the 6-digit code from your email
                </label>
                <input
                  id="verificationCode"
                  type="text"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      handleVerifyCode()
                    }
                  }}
                  placeholder="123456"
                  maxLength={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-center text-lg font-mono"
                  autoFocus
                />
              </div>
              
              {error && (
                <div className="text-red-600 text-sm text-center">
                  {error}
                </div>
              )}
              
              <button
                onClick={handleVerifyCode}
                disabled={isVerifying}
                className="w-full bg-primary-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isVerifying ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Verifying...</span>
                  </div>
                ) : (
                  'Verify Email'
                )}
              </button>
            </div>
          )}

          {/* CTA Buttons */}
          <div className="space-y-4">
            {!showCodeInput && (
              <button
                onClick={() => setShowCodeInput(true)}
                className="w-full flex items-center justify-center space-x-2 text-primary-600 hover:text-primary-700 font-medium py-3 px-4 rounded-lg border border-primary-200 hover:border-primary-300 transition-colors duration-200"
              >
                <Key className="w-4 h-4" />
                <span>Verify by Code</span>
              </button>
            )}

            <button
              onClick={handleResendCode}
              className="w-full flex items-center justify-center space-x-2 text-primary-600 hover:text-primary-700 font-medium py-3 px-4 rounded-lg border border-primary-200 hover:border-primary-300 transition-colors duration-200"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Resend Email</span>
            </button>

            <button
              onClick={onChangeEmail}
              className="w-full flex items-center justify-center space-x-2 text-gray-600 hover:text-gray-700 font-medium py-3 px-4 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors duration-200"
            >
              <Edit className="w-4 h-4" />
              <span>Change Email Address</span>
            </button>
          </div>

          {/* Additional Info */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-500">
              Didn't receive the email? Check your spam folder or{' '}
              <button 
                onClick={handleResendCode}
                className="text-primary-600 hover:text-primary-700 underline"
              >
                try again
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EmailVerification 