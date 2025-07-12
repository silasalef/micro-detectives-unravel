import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ChevronRight, ChevronLeft, Play, Users, Shield, Zap, Key, Factory, Lightbulb, Trophy, Star } from 'lucide-react';
import StorySlide from '@/components/StorySlide';
import InteractiveQuestion from '@/components/InteractiveQuestion';
import CharacterCard from '@/components/CharacterCard';
import MechanismDemo from '@/components/MechanismDemo';
import GameScore from '@/components/GameScore';
import CharacterInteraction from '@/components/CharacterInteraction';

const Index = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [gameScore, setGameScore] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [showCharacter, setShowCharacter] = useState(false);
  const [questionAnswered, setQuestionAnswered] = useState(false);

  const slides = [
    {
      id: 'intro',
      title: '🔬 Bem-vindos, Exploradores da Saúde!',
      content: 'Hoje vamos embarcar em uma aventura microscópica dentro do corpo humano. Preparem-se para descobrir como os antibióticos são verdadeiros detetives que encontram e combatem os vilões invisíveis! Vocês ganharão pontos por participar - vamos ver quem será o melhor detetive molecular!',
      type: 'intro',
      icon: <Play className="w-8 h-8" />
    },
    {
      id: 'characters',
      title: '🎭 Conheçam Nossos Personagens',
      content: 'Em nossa história, cada personagem tem um papel especial na grande cidade chamada Corpo Humano...',
      type: 'characters',
      icon: <Users className="w-8 h-8" />
    },
    {
      id: 'city-tour',
      title: '🏙️ Tour pela Cidade Corpo Humano',
      content: 'Imaginem uma cidade movimentada onde bilhões de habitantes (nossas células) trabalham juntos harmoniosamente. Cada cidadão tem sua função: alguns são construtores (células ósseas), outros são mensageiros (neurônios), e alguns são guardas (células imunes).',
      type: 'story',
      icon: <Factory className="w-8 h-8" />
    },
    {
      id: 'question1',
      title: '🤔 Desafio 1: Situação de Emergência!',
      content: 'ALERTA! Vilões bacterianos invadiram nossa cidade! Como prefeito da Cidade Corpo Humano, qual seria sua PRIMEIRA ação?',
      type: 'question',
      icon: <Lightbulb className="w-8 h-8" />,
      options: [
        'Chamar reforços do sistema imunológico imediatamente',
        'Usar antibióticos específicos contra os invasores',
        'Evacuar todos os cidadãos para área segura',
        'Tentar negociar com os invasores'
      ],
      correctAnswer: 0,
      explanations: [
        '🎉 EXCELENTE! O sistema imunológico é nossa primeira linha de defesa, como a polícia da cidade!',
        '⚠️ Boa ideia, mas antibióticos são como forças especiais - usamos quando a situação está mais grave!',
        '❌ Impossível evacuar bilhões de células! Precisamos enfrentar o problema.',
        '❌ Bactérias patogênicas não negociam - elas só querem causar danos!'
      ]
    },
    {
      id: 'immune-system',
      title: '🛡️ Os Primeiros Heróis: Sistema Imunológico',
      content: 'Antes dos antibióticos entrarem em ação, nossos heróis naturais já estão trabalhando! Os glóbulos brancos são como a polícia da cidade, patrulhando e combatendo invasores. Mas às vezes precisam de reforços especiais...',
      type: 'story',
      icon: <Shield className="w-8 h-8" />
    },
    {
      id: 'question2',
      title: '🧠 Desafio 2: O Mistério da Seletividade',
      content: 'Aqui está o grande mistério: Por que os antibióticos atacam apenas as bactérias e não nossas células?',
      type: 'question',
      icon: <Key className="w-8 h-8" />,
      options: [
        'Porque são programados por computador para isso',
        'Porque bactérias têm estruturas únicas que nossas células não têm',
        'Por pura sorte - é coincidência',
        'Porque são muito pequenos para afetar nossas células'
      ],
      correctAnswer: 1,
      explanations: [
        '❌ Antibióticos são moléculas químicas, não programas de computador!',
        '🎉 PERFEITO! Toxicidade seletiva - o segredo está nas diferenças estruturais!',
        '❌ Definitivamente não é sorte! É ciência pura e planejamento molecular!',
        '❌ O tamanho não importa aqui - é sobre reconhecimento molecular específico!'
      ]
    },
    {
      id: 'selectivity-secret',
      title: '🔍 O Segredo da Toxicidade Seletiva',
      content: 'Imagine que as bactérias usam uniformes especiais (parede celular com peptidoglicano) que nossos cidadãos nunca usam. Os antibióticos são como guardas super treinados que só reconhecem esses uniformes específicos!',
      type: 'explanation',
      icon: <Shield className="w-8 h-8" />
    },
    {
      id: 'key-lock-analogy',
      title: '🔑 A Analogia das Chaves Moleculares',
      content: 'Cada antibiótico é como uma chave especial que só abre fechaduras bacterianas. As fechaduras são proteínas ou estruturas que só existem nas bactérias - nossas células têm fechaduras completamente diferentes!',
      type: 'analogy',
      icon: <Key className="w-8 h-8" />
    },
    {
      id: 'question3',
      title: '⚔️ Desafio 3: Escolha Sua Arma!',
      content: 'Você descobriu bactérias com paredes celulares muito resistentes. Qual "arma molecular" seria mais eficaz?',
      type: 'question',
      icon: <Zap className="w-8 h-8" />,
      options: [
        'Antibiótico "Quebra-Armaduras" (β-lactâmicos)',
        'Antibiótico "Sabotador de Fábricas" (Tetraciclina)',
        'Antibiótico "Corta-Energia" (Sulfa)',
        'Qualquer um serve igual'
      ],
      correctAnswer: 0,
      explanations: [
        '🎉 ESTRATEGISTA BRILHANTE! β-lactâmicos destroem especificamente paredes celulares!',
        '⚠️ Boa opção, mas tetraciclinas funcionam melhor contra ribossomos, não paredes!',
        '⚠️ Sulfas bloqueiam metabolismo, mas não são específicas para paredes resistentes!',
        '❌ Cada antibiótico tem seu alvo específico - precisão é fundamental!'
      ]
    },
    {
      id: 'mechanisms',
      title: '⚡ Arsenal dos Superpoderes Antimicrobianos',
      content: 'Cada classe de antibiótico tem seu superpoder único, desenvolvido para atacar pontos fracos específicos das bactérias...',
      type: 'mechanisms',
      icon: <Zap className="w-8 h-8" />
    },
    {
      id: 'bacterial-structures',
      title: '🦠 Anatomia do Inimigo',
      content: 'Para entender como os antibióticos funcionam, precisamos conhecer nosso alvo. Bactérias têm estruturas únicas: parede celular rígida, ribossomos 70S, DNA circular livre no citoplasma, e sistemas metabólicos próprios.',
      type: 'story',
      icon: <Factory className="w-8 h-8" />
    },
    {
      id: 'question4',
      title: '🎯 Desafio 4: Reconhecimento Molecular',
      content: 'Um antibiótico precisa distinguir entre um ribossomo bacteriano (70S) e um humano (80S). Como ele faz isso?',
      type: 'question',
      icon: <Lightbulb className="w-8 h-8" />,
      options: [
        'Conta o número de proteínas em cada ribossomo',
        'Reconhece a forma tridimensional específica das subunidades',
        'Mede o tamanho exato usando régua molecular',
        'Pergunta para o ribossomo qual tipo ele é'
      ],
      correctAnswer: 1,
      explanations: [
        '❌ Não é questão de quantidade - é sobre estrutura específica!',
        '🎉 EXATO! Reconhecimento por complementaridade molecular - como chave e fechadura!',
        '❌ Não existe "régua molecular" - é reconhecimento químico específico!',
        '😄 Moléculas não falam! É pura química e física molecular!'
      ]
    },
    {
      id: 'resistance-intro',
      title: '⚠️ Quando os Vilões Ficam Espertos',
      content: 'Às vezes, alguns vilões bacterianos conseguem desenvolver truques para enganar nossos heróis antibióticos. Eles podem criar novos disfarces, mudar suas fechaduras, ou até mesmo criar máquinas que expulsam os antibióticos!',
      type: 'resistance',
      icon: <Factory className="w-8 h-8" />
    },
    {
      id: 'question5',
      title: '🛡️ Desafio Final: Combatendo a Resistência',
      content: 'As bactérias desenvolveram resistência e agora têm "bombas de efluxo" que expulsam antibióticos. Qual a melhor estratégia?',
      type: 'question',
      icon: <Trophy className="w-8 h-8" />,
      options: [
        'Usar doses muito maiores do mesmo antibiótico',
        'Combinar antibióticos com inibidores de bomba de efluxo',
        'Desistir e deixar a infecção continuar',
        'Usar antibióticos mais antigos que são mais fracos'
      ],
      correctAnswer: 1,
      explanations: [
        '❌ Doses maiores podem ser tóxicas e as bombas continuam funcionando!',
        '🎉 ESTRATÉGIA GENIAL! Combinações inteligentes superam mecanismos de resistência!',
        '❌ NUNCA desistir! A ciência sempre encontra soluções!',
        '❌ Antibióticos antigos podem ter mais efeitos colaterais e menos eficácia!'
      ]
    },
    {
      id: 'future-tech',
      title: '🚀 O Futuro da Medicina Antimicrobiana',
      content: 'Cientistas estão desenvolvendo novas armas: nanopartículas direcionadas, inteligência artificial para descobrir novos antibióticos, e terapias personalizadas baseadas no DNA das bactérias!',
      type: 'story',
      icon: <Star className="w-8 h-8" />
    },
    {
      id: 'conclusion',
      title: '🏆 Missão Cumprida: Detetives Moleculares!',
      content: 'Parabéns, detetives! Vocês descobriram como os antibióticos "sabem" onde agir através da toxicidade seletiva, reconhecimento molecular e complementaridade estrutural. Lembrem-se: usar antibióticos corretamente é essencial para manter nossos heróis eficazes!',
      type: 'conclusion',
      icon: <Trophy className="w-8 h-8" />
    }
  ];

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
      setQuestionAnswered(false); // Reset para próxima pergunta
      setShowCharacter(true);
      setTimeout(() => setShowCharacter(false), 3000);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
      setQuestionAnswered(false); // Reset para pergunta anterior
    }
  };

  const handleResponse = (response: string, isCorrect: boolean) => {
    setQuestionAnswered(true);
    setTotalQuestions(prev => prev + 1);
    if (isCorrect) {
      setCorrectAnswers(prev => prev + 1);
      setGameScore(prev => prev + 100);
    } else {
      setGameScore(prev => prev + 25); // Pontos por participação
    }
  };

  const currentSlideData = slides[currentSlide];
  const isQuestionSlide = currentSlideData.type === 'question';
  const canAdvance = !isQuestionSlide || questionAnswered;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-purple-200 p-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            🔬 Detetives Moleculares: Como Antibióticos Sabem Onde Agir?
          </h1>
          <div className="flex items-center gap-4">
            <GameScore score={gameScore} correct={correctAnswers} total={totalQuestions} />
            <div className="text-sm text-gray-600">
              Slide {currentSlide + 1} de {slides.length}
            </div>
          </div>
        </div>
      </div>

      {/* Character Interaction */}
      {showCharacter && (
        <CharacterInteraction 
          message="Excelente! Vamos continuar nossa aventura!"
          onClose={() => setShowCharacter(false)}
        />
      )}

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
            {(currentSlideData.type === 'intro' || currentSlideData.type === 'story' || currentSlideData.type === 'explanation') && (
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
                    title="🏙️ Cidade Corpo Humano"
                    description="Uma metrópole com 37 trilhões de habitantes (células) trabalhando em harmonia perfeita"
                    color="from-green-400 to-green-600"
                    details="Bairros especializados: Cérebro (centro de comando), Coração (bombeamento), Fígado (processamento)"
                  />
                  <CharacterCard
                    title="👾 Invasores Bacterianos"
                    description="Vilões microscópicos com armaduras especiais (parede celular) que nossa cidade não possui"
                    color="from-red-400 to-red-600"
                    details="Equipamentos únicos: ribossomos 70S, DNA circular, sistemas metabólicos próprios"
                  />
                  <CharacterCard
                    title="🦸 Super Antibióticos"
                    description="Heróis com superpoderes específicos: cada um especializado em derrotar tipos diferentes de vilões"
                    color="from-blue-400 to-blue-600"
                    details="Poderes: Quebra-armaduras, Sabotadores, Desativadores de energia, Bloqueadores de comunicação"
                  />
                </div>
              </div>
            )}

            {currentSlideData.type === 'question' && (
              <InteractiveQuestion
                question={currentSlideData.content}
                options={currentSlideData.options || []}
                correctAnswer={currentSlideData.correctAnswer}
                explanations={currentSlideData.explanations || []}
                onResponse={handleResponse}
              />
            )}

            {currentSlideData.type === 'analogy' && (
              <div className="space-y-8">
                <StorySlide content={currentSlideData.content} animation="slideUp" />
                <div className="bg-gradient-to-r from-yellow-100 to-orange-100 p-6 rounded-2xl border-2 border-yellow-300">
                  <div className="flex items-center gap-4 text-lg mb-4">
                    <Key className="w-12 h-12 text-yellow-600" />
                    <span className="text-2xl">🔒</span>
                    <div className="text-gray-700">
                      <strong>Chave Antibiótica</strong> + <strong>Fechadura Bacteriana</strong> = <strong>Vitória!</strong>
                    </div>
                  </div>
                  <div className="text-sm text-gray-600 bg-white/50 p-4 rounded-xl">
                    <strong>Exemplo prático:</strong> A penicilina (chave) reconhece especificamente as proteínas PBP (fechadura) 
                    na parede bacteriana. Nossas células não têm PBPs, então ficam seguras!
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
                    subtitle="(β-lactâmicos: Penicilinas, Cefalosporinas)"
                    description="Destroem a parede celular bacteriana inibindo enzimas PBP. Como demolir a muralha de um castelo!"
                    color="from-red-400 to-red-600"
                    details="Alvo: Peptidoglicano - estrutura única das bactérias"
                  />
                  <MechanismDemo
                    title="🏭 Sabotador de Fábricas"
                    subtitle="(Aminoglicosídeos, Tetraciclinas)"
                    description="Atacam ribossomos 70S bacterianos, impedindo produção de proteínas essenciais"
                    color="from-blue-400 to-blue-600"
                    details="Alvo: Subunidades 30S e 50S - diferentes dos ribossomos humanos 80S"
                  />
                  <MechanismDemo
                    title="⚡ Corta-Energia"
                    subtitle="(Sulfas, Trimetoprim)"
                    description="Bloqueiam síntese de ácido fólico - combustível que bactérias devem produzir internamente"
                    color="from-yellow-400 to-yellow-600"
                    details="Alvo: Via do folato - humanos obtêm folato da dieta"
                  />
                  <MechanismDemo
                    title="🧬 Quebra-Máquinas"
                    subtitle="(Quinolonas, Fluoroquinolonas)"
                    description="Danificam topoisomerases bacterianas, enzimas que controlam replicação do DNA"
                    color="from-purple-400 to-purple-600"
                    details="Alvo: DNA girases - versões bacterianas são estruturalmente diferentes"
                  />
                </div>
              </div>
            )}

            {currentSlideData.type === 'resistance' && (
              <div className="space-y-6">
                <StorySlide content={currentSlideData.content} animation="slideUp" />
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-gradient-to-r from-orange-100 to-red-100 p-6 rounded-2xl border-2 border-orange-300">
                    <h3 className="text-xl font-bold text-red-700 mb-4">⚠️ Mecanismos de Resistência</h3>
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex items-center gap-2">
                        <span className="text-red-500">🛡️</span>
                        <strong>β-lactamases:</strong> Enzimas que destroem antibióticos
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-red-500">🚪</span>
                        <strong>Alteração de alvos:</strong> Mudança nas "fechaduras"
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-red-500">⚡</span>
                        <strong>Bombas de efluxo:</strong> Expulsam antibióticos
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-red-500">🚫</span>
                        <strong>Permeabilidade:</strong> Impedem entrada de antibióticos
                      </li>
                    </ul>
                  </div>
                  <div className="bg-gradient-to-r from-green-100 to-blue-100 p-6 rounded-2xl border-2 border-green-300">
                    <h3 className="text-xl font-bold text-green-700 mb-4">🧬 Soluções Científicas</h3>
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex items-center gap-2">
                        <span className="text-green-500">🔬</span>
                        <strong>Novos alvos:</strong> Proteínas essenciais únicas
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-green-500">🤖</span>
                        <strong>IA na pesquisa:</strong> Descoberta acelerada
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-green-500">💊</span>
                        <strong>Combinações:</strong> Antibiótico + inibidor
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-green-500">🎯</span>
                        <strong>Uso racional:</strong> Prescrição precisa
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {currentSlideData.type === 'conclusion' && (
              <div className="space-y-8">
                <StorySlide content={currentSlideData.content} animation="fadeIn" />
                <div className="bg-gradient-to-r from-green-100 to-blue-100 p-6 rounded-2xl border-2 border-green-300">
                  <div className="text-center">
                    <h3 className="text-2xl font-bold text-green-700 mb-4">🎯 Descobertas dos Detetives Moleculares</h3>
                    <div className="grid md:grid-cols-2 gap-4 text-left">
                      <div className="space-y-2">
                        <p className="flex items-center gap-2">
                          <span className="text-green-500">🔬</span>
                          <strong>Toxicidade Seletiva:</strong> Atacam só bactérias
                        </p>
                        <p className="flex items-center gap-2">
                          <span className="text-green-500">🔑</span>
                          <strong>Reconhecimento Molecular:</strong> Chaves específicas
                        </p>
                        <p className="flex items-center gap-2">
                          <span className="text-green-500">🎯</span>
                          <strong>Alvos Únicos:</strong> Estruturas só bacterianas
                        </p>
                      </div>
                      <div className="space-y-2">
                        <p className="flex items-center gap-2">
                          <span className="text-green-500">⚡</span>
                          <strong>Mecanismos Diversos:</strong> Cada classe tem poder
                        </p>
                        <p className="flex items-center gap-2">
                          <span className="text-green-500">🛡️</span>
                          <strong>Combate à Resistência:</strong> Ciência em evolução
                        </p>
                        <p className="flex items-center gap-2">
                          <span className="text-green-500">🚀</span>
                          <strong>Futuro Promissor:</strong> IA e nanotecnologia
                        </p>
                      </div>
                    </div>
                    <div className="mt-6 p-4 bg-white/70 rounded-xl">
                      <p className="text-lg font-semibold text-purple-700">
                        🏆 Vocês são agora Detetives Moleculares Certificados! 
                        Usem esse conhecimento para promover o uso responsável de antibióticos!
                      </p>
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
                    : index < currentSlide
                    ? 'bg-green-400'
                    : 'bg-gray-300'
                }`}
              />
            ))}
          </div>

          <div className="flex items-center gap-4">
            {isQuestionSlide && !questionAnswered && (
              <div className="text-sm text-orange-600 font-medium bg-orange-100 px-3 py-1 rounded-full">
                📝 Responda a pergunta para continuar
              </div>
            )}
            <Button
              onClick={nextSlide}
              disabled={currentSlide === slides.length - 1 || !canAdvance}
              size="lg"
              className={`flex items-center gap-2 transition-all duration-300 ${
                canAdvance 
                  ? 'bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600' 
                  : 'bg-gray-400 cursor-not-allowed'
              }`}
            >
              {currentSlide === slides.length - 1 ? 'Finalizar' : 'Próximo'}
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
