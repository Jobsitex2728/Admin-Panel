// components/ForgotPasswordModal.tsx
import React, { useState } from 'react';
import { Mail, CheckCircle, Lock, KeyRound, Eye, EyeOff } from 'lucide-react';
import { set } from 'date-fns';

interface ForgotPasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialEmail?: string;
}

type Step = 'email' | 'otp' | 'newPassword';

const ForgotPasswordModal: React.FC<ForgotPasswordModalProps> = ({ 
  isOpen, 
  onClose, 
  initialEmail = '' 
}) => {
  const [currentStep, setCurrentStep] = useState<Step>('email');
  
//   const {
//     email,
//     setEmail,
//     otp,
//     setOtp,
//     newPassword,
//     setNewPassword,
//     confirmPassword,
//     setConfirmPassword,
//     loading,
//     error,
//     handleSendOtp,
//     handleVerifyOtp,
//     handleResetPassword
//   } = useForgotPassword({ onClose, setCurrentStep, initialEmail });

  const {
    email,
    setEmail,
    otp,
    setOtp,
    newPassword,
    setNewPassword,
    confirmPassword,
    setConfirmPassword,
    loading,
    error,
    handleSendOtp,
    handleVerifyOtp,
    handleResetPassword
  } = {
    email: initialEmail,
    setEmail: (val: string) => {},
    otp: ['', '', '', '', '', ''],
    setOtp: ( ) => { },
    newPassword: '',
    setNewPassword: () => {},
    confirmPassword: '',
    setConfirmPassword: () => {},
    loading: false,
    error: '',
    handleSendOtp: async () => { setCurrentStep('otp');},
    handleVerifyOtp: async () => { setCurrentStep('newPassword'); },
    handleResetPassword: async () => { onClose(); }
  }

  if (!isOpen) return null;

  const renderStep = () => {
    switch (currentStep) {
      case 'email':
        return <EmailStep 
          email={email}
          setEmail={setEmail}
          onSubmit={handleSendOtp}
          loading={loading}
          onClose={onClose}
        />;
      
      case 'otp':
        return <OtpStep 
          email={email}
          otp={otp}
          setOtp={setOtp}
          onSubmit={handleVerifyOtp}
          onBack={() => setCurrentStep('email')}
          onResend={handleSendOtp}
          loading={loading}
        />;
      
      case 'newPassword':
        return <NewPasswordStep 
          newPassword={newPassword}
          setNewPassword={setNewPassword}
          confirmPassword={confirmPassword}
          setConfirmPassword={setConfirmPassword}
          onSubmit={handleResetPassword}
          onBack={() => setCurrentStep('otp')}
          loading={loading}
        />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-gray-900 rounded-2xl p-6 w-full max-w-md">
        {/* Progress Indicator */}
        <div className="flex items-center justify-center mb-6">
          <div className="flex items-center">
            <StepDot step="email" currentStep={currentStep} icon={Mail} />
            <StepLine active={currentStep !== 'email'} />
            <StepDot step="otp" currentStep={currentStep} icon={KeyRound} />
            <StepLine active={currentStep === 'newPassword'} />
            <StepDot step="newPassword" currentStep={currentStep} icon={Lock} />
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-4 bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-2 rounded-lg text-sm">
            {error}
          </div>
        )}

        {/* Step Content */}
        {renderStep()}
      </div>
    </div>
  );
};

// Step Indicator Components
const StepDot: React.FC<{ step: Step; currentStep: Step; icon: any }> = ({ step, currentStep, icon: Icon }) => {
  const isActive = currentStep === step;
  const isCompleted = 
    (step === 'email' && (currentStep === 'otp' || currentStep === 'newPassword')) ||
    (step === 'otp' && currentStep === 'newPassword');

  return (
    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
      isActive ? 'bg-blue-600' : 
      isCompleted ? 'bg-green-600' : 'bg-white/20'
    }`}>
      <Icon className="w-4 h-4 text-white" />
    </div>
  );
};

const StepLine: React.FC<{ active: boolean }> = ({ active }) => (
  <div className={`w-12 h-1 ${active ? 'bg-green-600' : 'bg-white/20'}`} />
);







export default ForgotPasswordModal;