
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ChevronRight, ChevronLeft, Play, Users, Shield, Zap, Key, Factory, Lightbulb } from 'lucide-react';
import StorySlide from '@/components/StorySlide';
import InteractiveQuestion from '@/components/InteractiveQuestion';
import CharacterCard from '@/components/CharacterCard';
import MechanismDemo from '@/components/MechanismDemo';

const Index = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [audienceResponses, setAudienceResponses] = useState<string[]>([]);

  const slides = [
    {
      id: 'intro',
      title: '🔬 Bem-vindos, Exploradores da Saúde!',
      content: 'Hoje vamos embarcar em uma aventura microscópica dentro do corpo humano. Preparem-se para descobrir como os antibióticos são verdadeiros detetives que encontram e combatem os vilões invisíveis!',
      type: 'intro',
      icon: <Play className="w-8 h-8" />
    },
    {
      id: 'characters',
      title: '🎭 Conheçam Nossos Personagens',
      content: 'Em nossa história, cada personagem tem um papel especial...',
      type: 'characters',
      icon: <Users className="w-8 h-8" />
    },
    {
      id: 'question1',
      title: '🤔 Pergunta para Vocês!',
      content: 'Imaginem que vocês são prefeitos da Cidade Corpo Humano. O que fariam se vilões começassem a causar confusão na cidade?',
      type: 'question',
      icon: <Lightbulb className="w-8 h-8" />,
      options: [
        'Chamar a polícia (sistema imunológico)',
        'Usar armas especiais (antibióticos)',
        'Evacuar a cidade (descanso)',
        'Negociar com os vilões'
      ]
    },
    {
      id: 'secret',
      title: '🔍 O Segredo dos Antibióticos',
      content: 'Os antibióticos são como agentes secretos super especializados! Eles têm um superpoder incrível: conseguem distinguir entre cidadãos bons (nossas células) e vilões (bactérias).',
      type: 'explanation',
      icon: <Shield className="w-8 h-8" />
    },
    {
      id: 'analogy',
      title: '🔑 A Analogia das Chaves e Fechaduras',
      content: 'Imaginem que as bactérias usam armaduras especiais que só elas têm. Os antibióticos são como chaves mágicas que só abrem as "portas" dessas armaduras!',
      type: 'analogy',
      icon: <Key className="w-8 h-8" />
    },
    {
      id: 'mechanisms',
      title: '⚡ Os Superpoderes dos Antibióticos',
      content: 'Cada tipo de antibiótico tem um superpoder diferente para combater os vilões...',
      type: 'mechanisms',
      icon: <Zap className="w-8 h-8" />
    },
    {
      id: 'question2',
      title: '🧠 Desafio Mental!',
      content: 'Por que os antibióticos não atacam nossas células boas?',
      type: 'question',
      icon: <Lightbulb className="w-8 h-8" />,
      options: [
        'Porque nossas células não têm "armadura"',
        'Porque são muito pequenos',
        'Porque são programados assim',
        'Por sorte!'
      ]
    },
    {
      id: 'resistance',
      title: '🎭 Quando os Vilões Ficam Espertos',
      content: 'Às vezes, os vilões aprendem truques novos e criam disfarces para enganar nossos heróis antibióticos...',
      type: 'resistance',
      icon: <Factory className="w-8 h-8" />
    },
    {
      id: 'conclusion',
      title: '🏆 A Moral da História',
      content: 'Os antibióticos são heróis incríveis, mas precisam da nossa ajuda! Usar antibióticos corretamente é como dar as melhores ferramentas para nossos agentes secretos.',
      type: 'conclusion',
      icon: <Shield className="w-8 h-8" />
    }
  ];

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const handleResponse = (response: string) => {
    setAudienceResponses([...audienceResponses, response]);
  };

  const currentSlideData = slides[currentSlide];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-purple-200 p-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Como o Antibiótico Sabe Onde Agir? 🦠💊
          </h1>
          <div className="text-sm text-gray-600">
            Slide {currentSlide + 1} de {slides.length}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto p-6">
        <Card className="min-h-[600px] bg-white/90 backdrop-blur-sm border-2 border-purple-200 shadow-2xl">
          <CardContent className="p-8">
            <div className="flex items-center gap-4 mb-8">
              <div className="p-3 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full text-white">
                {currentSlideData.icon}
              </div>
              <h2 className="text-3xl font-bold text-gray-800">
                {currentSlideData.title}
              </h2>
            </div>

            {/* Slide Content */}
            {currentSlideData.type === 'intro' && (
              <StorySlide 
                content={currentSlideData.content}
                animation="fadeIn"
              />
            )}

            {currentSlideData.type === 'characters' && (
              <div className="space-y-6">
                <p className="text-lg text-gray-700 mb-8">{currentSlideData.content}</p>
                <div className="grid md:grid-cols-3 gap-6">
                  <CharacterCard
                    title="🏙️ Corpo Humano"
                    description="Uma grande cidade cheia de habitantes trabalhadores (nossas células)"
                    color="from-green-400 to-green-600"
                  />
                  <CharacterCard
                    title="👾 Bactérias"
                    description="Vilões invasores que causam problemas e confusão na cidade"
                    color="from-red-400 to-red-600"
                  />
                  <CharacterCard
                    title="🦸 Antibióticos"
                    description="Heróis com superpoderes especiais para combater apenas os vilões"
                    color="from-blue-400 to-blue-600"
                  />
                </div>
              </div>
            )}

            {currentSlideData.type === 'question' && (
              <InteractiveQuestion
                question={currentSlideData.content}
                options={currentSlideData.options || []}
                onResponse={handleResponse}
              />
            )}

            {currentSlideData.type === 'explanation' && (
              <StorySlide 
                content={currentSlideData.content}
                animation="slideUp"
              />
            )}

            {currentSlideData.type === 'analogy' && (
              <div className="space-y-8">
                <StorySlide content={currentSlideData.content} animation="slideUp" />
                <div className="bg-gradient-to-r from-yellow-100 to-orange-100 p-6 rounded-2xl border-2 border-yellow-300">
                  <div className="flex items-center gap-4 text-lg">
                    <Key className="w-12 h-12 text-yellow-600" />
                    <span className="text-2xl">🔒</span>
                    <div className="text-gray-700">
                      <strong>Chave Antibiótica</strong> + <strong>Fechadura Bacteriana</strong> = <strong>Vitória!</strong>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {currentSlideData.type === 'mechanisms' && (
              <div className="space-y-6">
                <p className="text-lg text-gray-700 mb-8">{currentSlideData.content}</p>
                <div className="grid md:grid-cols-2 gap-6">
                  <MechanismDemo
                    title="🔨 Quebra-Armaduras"
                    subtitle="(Penicilina)"
                    description="Destrói a armadura protetora das bactérias, fazendo-as explodir!"
                    color="from-red-400 to-red-600"
                  />
                  <MechanismDemo
                    title="🏭 Sabotador de Fábricas"
                    subtitle="(Tetraciclina)"
                    description="Impede que as bactérias fabriquem suas peças essenciais"
                    color="from-blue-400 to-blue-600"
                  />
                  <MechanismDemo
                    title="⚡ Corta-Energia"
                    subtitle="(Sulfa)"
                    description="Bloqueia o combustível que as bactérias precisam para viver"
                    color="from-yellow-400 to-yellow-600"
                  />
                  <MechanismDemo
                    title="🔧 Quebra-Máquinas"
                    subtitle="(Quinolonas)"
                    description="Danifica as máquinas de copiar DNA das bactérias"
                    color="from-purple-400 to-purple-600"
                  />
                </div>
              </div>
            )}

            {currentSlideData.type === 'resistance' && (
              <div className="space-y-6">
                <StorySlide content={currentSlideData.content} animation="slideUp" />
                <div className="bg-gradient-to-r from-orange-100 to-red-100 p-6 rounded-2xl border-2 border-orange-300">
                  <div className="text-center">
                    <h3 className="text-xl font-bold text-red-700 mb-4">⚠️ Desafio Atual</h3>
                    <p className="text-gray-700 mb-4">
                      Alguns vilões criaram disfarces tão bons que nossos heróis não conseguem mais reconhecê-los!
                    </p>
                    <div className="text-lg font-semibold text-red-600">
                      Como podemos ajudar nossos heróis a vencer? 🤔
                    </div>
                  </div>
                </div>
              </div>
            )}

            {currentSlideData.type === 'conclusion' && (
              <div className="space-y-8">
                <StorySlide content={currentSlideData.content} animation="fadeIn" />
                <div className="bg-gradient-to-r from-green-100 to-blue-100 p-6 rounded-2xl border-2 border-green-300">
                  <div className="text-center">
                    <h3 className="text-2xl font-bold text-green-700 mb-4">🎯 Lições Aprendidas</h3>
                    <div className="grid md:grid-cols-2 gap-4 text-left">
                      <div className="space-y-2">
                        <p className="flex items-center gap-2">
                          <span className="text-green-500">✅</span>
                          Usar antibióticos apenas quando prescritos
                        </p>
                        <p className="flex items-center gap-2">
                          <span className="text-green-500">✅</span>
                          Completar todo o tratamento
                        </p>
                      </div>
                      <div className="space-y-2">
                        <p className="flex items-center gap-2">
                          <span className="text-green-500">✅</span>
                          Não compartilhar antibióticos
                        </p>
                        <p className="flex items-center gap-2">
                          <span className="text-green-500">✅</span>
                          Ajudar nossos heróis microscópicos!
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between items-center mt-8">
          <Button
            onClick={prevSlide}
            disabled={currentSlide === 0}
            variant="outline"
            size="lg"
            className="flex items-center gap-2"
          >
            <ChevronLeft className="w-5 h-5" />
            Anterior
          </Button>

          <div className="flex gap-2">
            {slides.map((_, index) => (
              <div
                key={index}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide
                    ? 'bg-purple-500 scale-125'
                    : 'bg-gray-300'
                }`}
              />
            ))}
          </div>

          <Button
            onClick={nextSlide}
            disabled={currentSlide === slides.length - 1}
            size="lg"
            className="flex items-center gap-2 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
          >
            Próximo
            <ChevronRight className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;
