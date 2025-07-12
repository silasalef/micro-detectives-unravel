
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface CharacterCardProps {
  title: string;
  description: string;
  color: string;
}

const CharacterCard: React.FC<CharacterCardProps> = ({ title, description, color }) => {
  return (
    <Card className="group hover:scale-105 transition-all duration-300 border-2 hover:shadow-xl">
      <CardContent className="p-6">
        <div className={`w-full h-32 bg-gradient-to-r ${color} rounded-2xl mb-4 flex items-center justify-center text-white text-4xl group-hover:animate-pulse`}>
          {title.split(' ')[0]}
        </div>
        <h3 className="text-xl font-bold mb-2 text-center">{title}</h3>
        <p className="text-gray-600 text-center leading-relaxed">{description}</p>
      </CardContent>
    </Card>
  );
};

export default CharacterCard;
