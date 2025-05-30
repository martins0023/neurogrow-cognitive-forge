
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Brain, Clock, Target, Zap, TrendingUp, Calendar } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from "recharts";

const CognitiveDashboard = () => {
  // Mock data for demonstration
  const performanceData = [
    { date: "Mon", memory: 75, attention: 82, processing: 68 },
    { date: "Tue", memory: 78, attention: 85, processing: 72 },
    { date: "Wed", memory: 82, attention: 88, processing: 75 },
    { date: "Thu", memory: 85, attention: 90, processing: 78 },
    { date: "Fri", memory: 88, attention: 92, processing: 82 },
    { date: "Sat", memory: 91, attention: 94, processing: 85 },
    { date: "Sun", memory: 93, attention: 96, processing: 88 },
  ];

  const cognitiveProfile = [
    { skill: "Working Memory", score: 85, max: 100 },
    { skill: "Attention", score: 92, max: 100 },
    { skill: "Processing Speed", score: 78, max: 100 },
    { skill: "Problem Solving", score: 88, max: 100 },
    { skill: "Pattern Recognition", score: 82, max: 100 },
    { skill: "Spatial Reasoning", score: 75, max: 100 },
  ];

  const todaysStats = {
    exercisesCompleted: 12,
    timeSpent: 45,
    streakDays: 7,
    improvement: 15
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Cognitive Profile Dashboard</h1>
          <p className="text-lg text-gray-600">Track your mental fitness and cognitive growth</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          <Card className="glass-effect border-primary/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Exercises Today</CardTitle>
              <Target className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{todaysStats.exercisesCompleted}</div>
              <p className="text-xs text-muted-foreground">+3 from yesterday</p>
            </CardContent>
          </Card>

          <Card className="glass-effect border-yellow-400/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Time Spent</CardTitle>
              <Clock className="h-4 w-4 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">{todaysStats.timeSpent}m</div>
              <p className="text-xs text-muted-foreground">Perfect focus time</p>
            </CardContent>
          </Card>

          <Card className="glass-effect border-green-400/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Current Streak</CardTitle>
              <Calendar className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{todaysStats.streakDays} days</div>
              <p className="text-xs text-muted-foreground">Keep it up!</p>
            </CardContent>
          </Card>

          <Card className="glass-effect border-purple-400/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Improvement</CardTitle>
              <TrendingUp className="h-4 w-4 text-purple-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">+{todaysStats.improvement}%</div>
              <p className="text-xs text-muted-foreground">This week</p>
            </CardContent>
          </Card>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Performance Trend */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                Weekly Performance Trend
              </CardTitle>
              <CardDescription>Your cognitive performance over the last 7 days</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis domain={[0, 100]} />
                  <Tooltip />
                  <Line type="monotone" dataKey="memory" stroke="#3F51B5" strokeWidth={3} name="Memory" />
                  <Line type="monotone" dataKey="attention" stroke="#FFEB3B" strokeWidth={3} name="Attention" />
                  <Line type="monotone" dataKey="processing" stroke="#4CAF50" strokeWidth={3} name="Processing" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Cognitive Profile Radar */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5 text-primary" />
                Cognitive Profile
              </CardTitle>
              <CardDescription>Your strengths across different cognitive domains</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <RadarChart data={cognitiveProfile}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="skill" className="text-xs" />
                  <PolarRadiusAxis domain={[0, 100]} tick={false} />
                  <Radar
                    name="Score"
                    dataKey="score"
                    stroke="#3F51B5"
                    fill="#3F51B5"
                    fillOpacity={0.3}
                    strokeWidth={2}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Skills Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-yellow-500" />
              Skill Breakdown
            </CardTitle>
            <CardDescription>Detailed analysis of your cognitive abilities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {cognitiveProfile.map((skill, index) => (
                <div key={index} className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{skill.skill}</span>
                    <Badge variant={skill.score >= 85 ? "default" : skill.score >= 70 ? "secondary" : "outline"}>
                      {skill.score >= 85 ? "Excellent" : skill.score >= 70 ? "Good" : "Improving"}
                    </Badge>
                  </div>
                  <Progress value={skill.score} className="h-3" />
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>Current: {skill.score}%</span>
                    <span>Target: 95%</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* AI Insights */}
        <Card className="bg-gradient-to-r from-primary/5 to-yellow-400/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5 text-primary" />
              AI-Powered Insights
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <h4 className="font-semibold text-primary">💡 Today's Recommendation</h4>
                <p className="text-sm text-gray-600">
                  Focus on spatial reasoning exercises. Your processing speed is improving, making this the perfect time to challenge spatial skills.
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold text-yellow-600">🎯 Next Milestone</h4>
                <p className="text-sm text-gray-600">
                  You're 7 points away from achieving "Expert" level in working memory. Keep practicing memory sequence exercises!
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CognitiveDashboard;
