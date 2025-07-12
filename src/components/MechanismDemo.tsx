
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface MechanismDemoProps {
  title: string;
  subtitle: string;
  description: string;
  color: string;
}

const MechanismDemo: React.FC<MechanismDemoProps> = ({ 
  title, 
  subtitle, 
  description, 
  color 
}) => {
  return (
    <Card className="group hover:scale-105 transition-all duration-300 border-2 hover:shadow-xl">
      <CardContent className="p-6">
        <div className={`w-full h-24 bg-gradient-to-r ${color} rounded-2xl mb-4 flex items-center justify-center text-white text-3xl group-hover:animate-bounce`}>
          {title.split(' ')[0]}
        </div>
        <h3 className="text-lg font-bold mb-1 text-center">{title}</h3>
        <p className="text-sm text-purple-600 font-medium text-center mb-3">{subtitle}</p>
        <p className="text-gray-600 text-sm text-center leading-relaxed">{description}</p>
      </CardContent>
    </Card>
  );
};

export default MechanismDemo;
