
import React from 'react';
import { Trophy, Star, Target, Zap, Crown } from 'lucide-react';

interface GameScoreProps {
  score: number;
  correct: number;
  total: number;
}

const GameScore: React.FC<GameScoreProps> = ({ score, correct, total }) => {
  const accuracy = total > 0 ? Math.round((correct / total) * 100) : 0;

  const getScoreColor = () => {
    if (score >= 400) return 'from-yellow-400 via-yellow-500 to-orange-500';
    if (score >= 300) return 'from-green-400 via-green-500 to-emerald-500';
    if (score >= 200) return 'from-blue-400 via-blue-500 to-cyan-500';
    return 'from-purple-400 via-purple-500 to-pink-500';
  };

  const getTitle = () => {
    if (score >= 400) return 'Detetive Molecular Master! 🏆';
    if (score >= 300) return 'Especialista em Antibióticos! 🌟';
    if (score >= 200) return 'Investigador Avançado! 🔍';
    return 'Explorador da Ciência! 🔬';
  };

  const getIcon = () => {
    if (score >= 400) return Crown;
    if (score >= 300) return Trophy;
    if (score >= 200) return Zap;
    return Star;
  };

  const ScoreIcon = getIcon();

  return (
    <div className="flex items-center gap-3 bg-white/95 backdrop-blur-sm rounded-xl p-3 border-2 border-purple-300 shadow-lg relative overflow-hidden">
      {/* Efeito de brilho de fundo sutil */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent opacity-50"></div>
      
      <div className={`p-2 bg-gradient-to-r ${getScoreColor()} rounded-lg text-white relative z-10 shadow-md`}>
        <ScoreIcon className="w-5 h-5" />
      </div>
      
      <div className="text-sm relative z-10">
        <div className="font-bold text-gray-800 flex items-center gap-2">
          <Star className="w-4 h-4 text-yellow-500" />
          <span className="drop-shadow-sm">{score} pts</span>
        </div>
        <div className="text-xs text-gray-600 flex items-center gap-1">
          <Target className="w-3 h-3" />
          <span>{correct}/{total} ({accuracy}%)</span>
        </div>
      </div>
      
      <div className="text-xs font-medium text-purple-700 max-w-32 leading-tight relative z-10 drop-shadow-sm">
        {getTitle()}
      </div>

      {/* Partículas de celebração sutis para pontuações altas */}
      {score >= 300 && (
        <>
          <div className="absolute top-1 right-1 w-1 h-1 bg-yellow-400 rounded-full opacity-60"></div>
          <div className="absolute bottom-1 left-1 w-1 h-1 bg-green-400 rounded-full opacity-60"></div>
        </>
      )}
    </div>
  );
};

export default GameScore;
