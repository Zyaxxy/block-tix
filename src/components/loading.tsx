
import { useEffect } from 'react';

const Loading = () => {
  // Inject the keyframes and custom classes we need
  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
  @keyframes spinner-rotate {
    0% {
      transform: rotateX(0deg) rotateY(0deg) rotateZ(0deg);
    }
    100% {
      transform: rotateX(360deg) rotateY(360deg) rotateZ(360deg);
    }
  }
  .animate-spinner {
    animation: spinner-rotate 6s linear infinite;
    will-change: transform;
  }
  .transform-preserve-3d {
    transform-style: preserve-3d;
    perspective: 800px;
  }
  .transform-face-1 {
    transform: rotateY(0deg) translateZ(22px);
  }
  .transform-face-2 {
    transform: rotateY(180deg) translateZ(22px);
  }
  .transform-face-3 {
    transform: rotateY(90deg) translateZ(22px);
  }
  .transform-face-4 {
    transform: rotateY(-90deg) translateZ(22px);
  }
  .transform-face-5 {
    transform: rotateX(90deg) translateZ(22px);
  }
  .transform-face-6 {
    transform: rotateX(-90deg) translateZ(22px);
  }
`;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Gaussian blur backdrop */}
      <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-md"></div>
      
      {/* Centered loading spinner with container */}
      <div className="relative z-10 flex flex-col items-center">
        <div className="w-16 h-16 animate-spinner transform-preserve-3d" style={{ transformOrigin: 'center center' }}>
          <div className="bg-purple-500/20 h-full w-full absolute border-2 border-purple-500 transform-face-1"></div>
          <div className="bg-purple-500/20 h-full w-full absolute border-2 border-purple-500 transform-face-2"></div>
          <div className="bg-purple-500/20 h-full w-full absolute border-2 border-purple-500 transform-face-3"></div>
          <div className="bg-purple-500/20 h-full w-full absolute border-2 border-purple-500 transform-face-4"></div>
          <div className="bg-purple-500/20 h-full w-full absolute border-2 border-purple-500 transform-face-5"></div>
          <div className="bg-purple-500/20 h-full w-full absolute border-2 border-purple-500 transform-face-6"></div>
        </div>
        <p className="mt-4 text-white font-medium">Loading...</p>
      </div>
    </div>
  );
};

export default Loading;