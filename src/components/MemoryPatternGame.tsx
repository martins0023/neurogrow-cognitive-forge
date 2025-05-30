
import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Brain, Play, RotateCcw, Trophy, Timer } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface GameState {
  pattern: number[];
  playerPattern: number[];
  currentStep: number;
  level: number;
  score: number;
  isPlaying: boolean;
  isShowingPattern: boolean;
  gameStatus: 'waiting' | 'showing' | 'input' | 'correct' | 'wrong' | 'complete';
}

const MemoryPatternGame = () => {
  const { toast } = useToast();
  const [gameState, setGameState] = useState<GameState>({
    pattern: [],
    playerPattern: [],
    currentStep: 0,
    level: 1,
    score: 0,
    isPlaying: false,
    isShowingPattern: false,
    gameStatus: 'waiting'
  });

  const [timeLeft, setTimeLeft] = useState(0);
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('easy');

  const colors = [
    { id: 0, bg: 'bg-red-500', active: 'bg-red-300', name: 'Red' },
    { id: 1, bg: 'bg-blue-500', active: 'bg-blue-300', name: 'Blue' },
    { id: 2, bg: 'bg-green-500', active: 'bg-green-300', name: 'Green' },
    { id: 3, bg: 'bg-yellow-500', active: 'bg-yellow-300', name: 'Yellow' },
    { id: 4, bg: 'bg-purple-500', active: 'bg-purple-300', name: 'Purple' },
    { id: 5, bg: 'bg-orange-500', active: 'bg-orange-300', name: 'Orange' },
  ];

  const getDifficultySettings = () => {
    switch (difficulty) {
      case 'easy': return { gridSize: 4, timePerStep: 1000, startLength: 3 };
      case 'medium': return { gridSize: 6, timePerStep: 800, startLength: 4 };
      case 'hard': return { gridSize: 6, timePerStep: 600, startLength: 5 };
    }
  };

  const generatePattern = useCallback(() => {
    const settings = getDifficultySettings();
    const patternLength = settings.startLength + gameState.level - 1;
    const pattern = Array.from({ length: patternLength }, () => 
      Math.floor(Math.random() * settings.gridSize)
    );
    return pattern;
  }, [gameState.level, difficulty]);

  const startGame = () => {
    const pattern = generatePattern();
    setGameState(prev => ({
      ...prev,
      pattern,
      playerPattern: [],
      currentStep: 0,
      isPlaying: true,
      isShowingPattern: true,
      gameStatus: 'showing'
    }));
    showPattern(pattern);
  };

  const showPattern = (pattern: number[]) => {
    const settings = getDifficultySettings();
    let step = 0;
    
    const showNext = () => {
      if (step < pattern.length) {
        setGameState(prev => ({ ...prev, currentStep: step }));
        setTimeout(() => {
          setGameState(prev => ({ ...prev, currentStep: -1 }));
          step++;
          setTimeout(showNext, 200);
        }, settings.timePerStep);
      } else {
        setGameState(prev => ({
          ...prev,
          isShowingPattern: false,
          gameStatus: 'input',
          currentStep: 0
        }));
        setTimeLeft(pattern.length * 2 + 5); // Time limit based on pattern length
      }
    };
    
    setTimeout(showNext, 500);
  };

  const handleTileClick = (tileId: number) => {
    if (gameState.gameStatus !== 'input') return;

    const newPlayerPattern = [...gameState.playerPattern, tileId];
    const isCorrect = newPlayerPattern[gameState.currentStep] === gameState.pattern[gameState.currentStep];

    if (!isCorrect) {
      setGameState(prev => ({
        ...prev,
        gameStatus: 'wrong',
        isPlaying: false
      }));
      toast({
        title: "Oops!",
        description: "Incorrect pattern. Try again!",
        variant: "destructive"
      });
      return;
    }

    if (newPlayerPattern.length === gameState.pattern.length) {
      // Level complete
      const newScore = gameState.score + (gameState.level * 10) + Math.max(0, timeLeft);
      setGameState(prev => ({
        ...prev,
        score: newScore,
        level: prev.level + 1,
        gameStatus: 'correct'
      }));
      
      toast({
        title: "Excellent!",
        description: `Level ${gameState.level} completed! Moving to level ${gameState.level + 1}`,
      });

      setTimeout(() => {
        if (gameState.level >= 10) {
          setGameState(prev => ({ ...prev, gameStatus: 'complete' }));
          toast({
            title: "Congratulations!",
            description: "You've completed all levels! Amazing cognitive performance!",
          });
        } else {
          startGame();
        }
      }, 1500);
    } else {
      setGameState(prev => ({
        ...prev,
        playerPattern: newPlayerPattern,
        currentStep: prev.currentStep + 1
      }));
    }
  };

  const resetGame = () => {
    setGameState({
      pattern: [],
      playerPattern: [],
      currentStep: 0,
      level: 1,
      score: 0,
      isPlaying: false,
      isShowingPattern: false,
      gameStatus: 'waiting'
    });
    setTimeLeft(0);
  };

  // Timer effect
  useEffect(() => {
    if (timeLeft > 0 && gameState.gameStatus === 'input') {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && gameState.gameStatus === 'input') {
      setGameState(prev => ({
        ...prev,
        gameStatus: 'wrong',
        isPlaying: false
      }));
      toast({
        title: "Time's up!",
        description: "You ran out of time. Try again!",
        variant: "destructive"
      });
    }
  }, [timeLeft, gameState.gameStatus, toast]);

  const settings = getDifficultySettings();
  const gridCols = settings.gridSize === 4 ? 'grid-cols-2' : 'grid-cols-3';

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Game Header */}
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center gap-2 text-2xl">
            <Brain className="h-6 w-6 text-primary" />
            Memory Pattern Challenge
          </CardTitle>
          <CardDescription>
            Watch the pattern, then repeat it back. Each level gets progressively harder!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{gameState.level}</div>
              <div className="text-sm text-gray-600">Level</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-600">{gameState.score}</div>
              <div className="text-sm text-gray-600">Score</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{gameState.pattern.length}</div>
              <div className="text-sm text-gray-600">Pattern Length</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{timeLeft}s</div>
              <div className="text-sm text-gray-600">Time Left</div>
            </div>
          </div>

          {/* Difficulty Selector */}
          <div className="flex justify-center gap-2 mb-6">
            {(['easy', 'medium', 'hard'] as const).map((level) => (
              <Button
                key={level}
                variant={difficulty === level ? "default" : "outline"}
                size="sm"
                onClick={() => setDifficulty(level)}
                disabled={gameState.isPlaying}
                className="capitalize"
              >
                {level}
              </Button>
            ))}
          </div>

          {/* Game Status */}
          <div className="text-center mb-6">
            {gameState.gameStatus === 'waiting' && (
              <Badge variant="outline" className="text-lg px-4 py-2">
                Ready to start?
              </Badge>
            )}
            {gameState.gameStatus === 'showing' && (
              <Badge className="text-lg px-4 py-2 bg-primary">
                Watch the pattern...
              </Badge>
            )}
            {gameState.gameStatus === 'input' && (
              <Badge variant="secondary" className="text-lg px-4 py-2">
                Your turn! Repeat the pattern
              </Badge>
            )}
            {gameState.gameStatus === 'correct' && (
              <Badge className="text-lg px-4 py-2 bg-green-500">
                Correct! Well done!
              </Badge>
            )}
            {gameState.gameStatus === 'wrong' && (
              <Badge variant="destructive" className="text-lg px-4 py-2">
                Try again!
              </Badge>
            )}
            {gameState.gameStatus === 'complete' && (
              <Badge className="text-lg px-4 py-2 bg-gradient-to-r from-yellow-400 to-orange-500">
                <Trophy className="mr-2 h-4 w-4" />
                Game Complete!
              </Badge>
            )}
          </div>

          {/* Progress Bar */}
          {gameState.isPlaying && gameState.gameStatus === 'input' && (
            <div className="mb-6">
              <Progress 
                value={(gameState.playerPattern.length / gameState.pattern.length) * 100} 
                className="h-3"
              />
              <div className="flex justify-between text-sm text-gray-600 mt-1">
                <span>Progress: {gameState.playerPattern.length}/{gameState.pattern.length}</span>
                <span className="flex items-center gap-1">
                  <Timer className="h-3 w-3" />
                  {timeLeft}s
                </span>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Game Grid */}
      <Card>
        <CardContent className="p-8">
          <div className={`grid ${gridCols} gap-4 max-w-md mx-auto`}>
            {colors.slice(0, settings.gridSize).map((color, index) => (
              <button
                key={index}
                className={`
                  aspect-square rounded-lg border-4 transition-all duration-200 transform
                  ${gameState.isShowingPattern && gameState.currentStep === index
                    ? `${color.active} border-white scale-110 shadow-lg`
                    : `${color.bg} border-gray-300 hover:scale-105`
                  }
                  ${gameState.gameStatus === 'input' ? 'hover:shadow-md cursor-pointer' : ''}
                  ${gameState.gameStatus !== 'input' && !gameState.isShowingPattern ? 'opacity-70' : ''}
                `}
                onClick={() => handleTileClick(index)}
                disabled={gameState.gameStatus !== 'input'}
                aria-label={`${color.name} tile`}
              />
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Game Controls */}
      <div className="flex justify-center gap-4">
        {!gameState.isPlaying ? (
          <Button 
            onClick={startGame} 
            size="lg" 
            className="bg-primary hover:bg-primary/90"
          >
            <Play className="mr-2 h-4 w-4" />
            {gameState.gameStatus === 'waiting' ? 'Start Game' : 'Next Level'}
          </Button>
        ) : null}
        
        <Button 
          onClick={resetGame} 
          variant="outline" 
          size="lg"
        >
          <RotateCcw className="mr-2 h-4 w-4" />
          Reset
        </Button>
      </div>
    </div>
  );
};

export default MemoryPatternGame;
