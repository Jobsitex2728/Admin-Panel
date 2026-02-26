import { useNavigate } from 'react-router-dom';
import { Home, ArrowLeft, AlertTriangle } from 'lucide-react';

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-linear-to-b from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full text-center">
        {/* Animated 404 Graphic */}
        <div className="relative mb-8">
          <div className="text-[12rem] font-bold text-gray-800 leading-none select-none">
            4<span className="text-green-600 animate-pulse">0</span>4
          </div>
          
          {/* Floating elements */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64">
            <div className="absolute inset-0 animate-ping opacity-20">
              <div className="w-full h-full rounded-full bg-green-400"></div>
            </div>
            <AlertTriangle className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-green-600" size={32} />
          </div>
        </div>

        {/* Error Message */}
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          Page Not Found
        </h1>
        
        <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
          Oops! The page you're looking for seems to have wandered off. 
          Let's get you back on track.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors w-full sm:w-auto justify-center"
          >
            <ArrowLeft size={18} />
            <span>Go Back</span>
          </button>

          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors w-full sm:w-auto justify-center"
          >
            <Home size={18} />
            <span>Back to Dashboard</span>
          </button>
        </div>
      </div>
    </div>
  );
}