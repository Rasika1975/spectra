import { useState, useEffect } from 'react';
import { Mail, Key, X, ArrowLeft } from 'lucide-react';
import { toast } from 'react-hot-toast';
import otpService from '../services/otpService';

const OTPVerification = ({ 
  contactInfo, // Can be email or phone
  method = 'email', // 'email' or 'phone'
  purpose,
  onVerificationComplete,
  onBack,
  autoSend = true 
}) => {
  const [otp, setOtp] = useState('');
  const [remainingTime, setRemainingTime] = useState(0);
  const [isResending, setIsResending] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  
  useEffect(() => {
    if (autoSend && contactInfo) {
      handleSendOTP();
    }
  }, [contactInfo, autoSend]);

  useEffect(() => {
    if (remainingTime > 0) {
      const timer = setInterval(() => {
        setRemainingTime(prev => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [remainingTime]);

  const handleSendOTP = async () => {
    try {
      setIsResending(true);
      await otpService.requestOTP(contactInfo, purpose, method);
      setRemainingTime(120); // 2 minutes countdown
      toast.success('OTP sent successfully');
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsResending(false);
    }
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    
    if (!otp) {
      toast.error('Please enter OTP');
      return;
    }

    try {
      setIsVerifying(true);
      const result = await otpService.verifyOTP(
        contactInfo,
        otp,
        purpose,
        method
      );
      toast.success('Verification successful');
      onVerificationComplete(result);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsVerifying(false);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-6">
      {/* Back Button */}
      {onBack && (
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-2 text-gray-400 hover:text-white"
        >
          <ArrowLeft className="w-4 h-4" /> Back
        </button>
      )}

      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">Enter Verification Code</h2>
        <p className="text-gray-400">
          Please enter the verification code sent to<br />
          <span className="text-violet-400">
            {method === 'email' ? contactInfo : `+${contactInfo}`}
          </span>
        </p>
      </div>

      <form onSubmit={handleVerifyOTP} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">
            Verification Code
          </label>
          <div className="relative">
            <Key className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
              maxLength={6}
              placeholder="Enter 6-digit code"
              className="w-full pl-10 pr-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-violet-500"
            />
          </div>
        </div>

        {/* Timer & Resend */}
        <div className="flex items-center justify-between text-sm">
          {remainingTime > 0 ? (
            <span className="text-gray-400">
              Resend code in {formatTime(remainingTime)}
            </span>
          ) : (
            <button
              type="button"
              onClick={handleSendOTP}
              disabled={isResending}
              className="text-violet-400 hover:text-violet-300 disabled:text-gray-500"
            >
              {isResending ? 'Sending...' : 'Resend Code'}
            </button>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={!otp || isVerifying || otp.length !== 6}
          className="w-full bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-lg py-3 font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:from-violet-700 hover:to-purple-700 transition-colors"
        >
          {isVerifying ? 'Verifying...' : 'Verify'}
        </button>
      </form>
    </div>
  );
};

export default OTPVerification;