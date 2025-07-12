
import React from 'react';

interface StorySlideProps {
  content: string;
  animation?: 'fadeIn' | 'slideUp' | 'slideRight';
}

const StorySlide: React.FC<StorySlideProps> = ({ content, animation = 'fadeIn' }) => {
  const animationClass = {
    fadeIn: 'animate-fade-in',
    slideUp: 'animate-slide-up',
    slideRight: 'animate-slide-right'
  }[animation];

  return (
    <div className={`${animationClass} space-y-6`}>
      <div className="text-xl leading-relaxed text-gray-700 bg-gradient-to-r from-blue-50 to-purple-50 p-8 rounded-2xl border-2 border-blue-200">
        <p className="text-center font-medium">{content}</p>
      </div>
      
      <div className="flex justify-center">
        <div className="relative">
          <div className="w-32 h-32 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full flex items-center justify-center text-white text-6xl animate-pulse">
            🔬
          </div>
          <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center text-xl animate-bounce">
            ✨
          </div>
        </div>
      </div>
    </div>
  );
};

export default StorySlide;
