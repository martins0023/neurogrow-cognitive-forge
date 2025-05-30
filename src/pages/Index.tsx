
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Brain, Zap, Target, TrendingUp, Trophy, Users } from "lucide-react";
import CognitiveDashboard from "@/components/CognitiveDashboard";
import MemoryPatternGame from "@/components/MemoryPatternGame";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [activeTab, setActiveTab] = useState("home");
  const { toast } = useToast();

  const handleStartTraining = () => {
    setActiveTab("exercises");
    toast({
      title: "Welcome to NeuroGrow!",
      description: "Let's start your cognitive training journey.",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Navigation */}
      <nav className="px-4 py-6 lg:px-8">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center space-x-2">
            <Brain className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold text-primary">NeuroGrow</span>
          </div>
          <div className="hidden md:flex space-x-8">
            <Button variant="ghost" onClick={() => setActiveTab("home")}>Home</Button>
            <Button variant="ghost" onClick={() => setActiveTab("dashboard")}>Dashboard</Button>
            <Button variant="ghost" onClick={() => setActiveTab("exercises")}>Exercises</Button>
          </div>
          <Button className="bg-primary hover:bg-primary/90">Get Started</Button>
        </div>
      </nav>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsContent value="home">
          {/* Hero Section */}
          <section className="px-4 py-12 lg:py-20 lg:px-8">
            <div className="max-w-7xl mx-auto text-center">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
                Personalized <span className="text-primary">Cognitive</span><br />
                Workouts Powered by <span className="text-yellow-400">AI</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-4xl mx-auto">
                Sharpen focus, enhance memory, and boost problem-solving with adaptive brain-training 
                exercises tailored to your unique cognitive profile.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button 
                  size="lg" 
                  className="bg-primary hover:bg-primary/90 text-white px-8 py-4 text-lg"
                  onClick={handleStartTraining}
                >
                  <Zap className="mr-2 h-5 w-5" />
                  Start Training
                </Button>
                <Button variant="outline" size="lg" className="px-8 py-4 text-lg">
                  Watch Demo
                </Button>
              </div>
            </div>
          </section>

          {/* Features Section */}
          <section className="px-4 py-16 lg:px-8 bg-white">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
                Why Choose NeuroGrow?
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <Card className="border-2 hover:border-primary/50 transition-colors duration-300">
                  <CardHeader>
                    <Target className="h-12 w-12 text-primary mb-4" />
                    <CardTitle>Dynamic Difficulty</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">
                      AI algorithms adjust exercise difficulty in real-time, keeping you in the optimal learning zone.
                    </CardDescription>
                  </CardContent>
                </Card>

                <Card className="border-2 hover:border-primary/50 transition-colors duration-300">
                  <CardHeader>
                    <TrendingUp className="h-12 w-12 text-yellow-500 mb-4" />
                    <CardTitle>Cognitive Insights</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">
                      Track your progress across memory, attention, and processing speed with detailed analytics.
                    </CardDescription>
                  </CardContent>
                </Card>

                <Card className="border-2 hover:border-primary/50 transition-colors duration-300">
                  <CardHeader>
                    <Users className="h-12 w-12 text-green-500 mb-4" />
                    <CardTitle>Social Challenges</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">
                      Compete with friends in cognitive duels and climb the leaderboards.
                    </CardDescription>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>

          {/* Stats Section */}
          <section className="px-4 py-16 lg:px-8 bg-gradient-to-r from-primary/10 to-yellow-100">
            <div className="max-w-7xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-12">
                Join Thousands Enhancing Their Minds
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                <div className="space-y-2">
                  <div className="text-4xl md:text-5xl font-bold text-primary">50K+</div>
                  <div className="text-gray-600">Active Users</div>
                </div>
                <div className="space-y-2">
                  <div className="text-4xl md:text-5xl font-bold text-yellow-500">15M+</div>
                  <div className="text-gray-600">Exercises Completed</div>
                </div>
                <div className="space-y-2">
                  <div className="text-4xl md:text-5xl font-bold text-green-500">92%</div>
                  <div className="text-gray-600">Improvement Rate</div>
                </div>
                <div className="space-y-2">
                  <div className="text-4xl md:text-5xl font-bold text-purple-500">4.8★</div>
                  <div className="text-gray-600">User Rating</div>
                </div>
              </div>
            </div>
          </section>
        </TabsContent>

        <TabsContent value="dashboard">
          <CognitiveDashboard />
        </TabsContent>

        <TabsContent value="exercises">
          <div className="px-4 py-8 lg:px-8 max-w-7xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">Brain Training Exercises</h1>
              <p className="text-xl text-gray-600">Challenge yourself with adaptive cognitive workouts</p>
            </div>
            <MemoryPatternGame />
          </div>
        </TabsContent>

        {/* Mobile Navigation */}
        <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
          <TabsList className="grid w-full grid-cols-3 h-16">
            <TabsTrigger value="home" className="flex flex-col items-center justify-center space-y-1">
              <Brain className="h-5 w-5" />
              <span className="text-xs">Home</span>
            </TabsTrigger>
            <TabsTrigger value="dashboard" className="flex flex-col items-center justify-center space-y-1">
              <TrendingUp className="h-5 w-5" />
              <span className="text-xs">Dashboard</span>
            </TabsTrigger>
            <TabsTrigger value="exercises" className="flex flex-col items-center justify-center space-y-1">
              <Trophy className="h-5 w-5" />
              <span className="text-xs">Exercises</span>
            </TabsTrigger>
          </TabsList>
        </div>
      </Tabs>
    </div>
  );
};

export default Index;
