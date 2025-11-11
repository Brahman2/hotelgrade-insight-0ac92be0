import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, MapPin, Star, Image, ThumbsUp, Calendar, DollarSign, Wifi, TrendingUp, Phone, Mail } from "lucide-react";
import { useEffect, useState } from "react";

const Analyze = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const formData = location.state as { hotelName: string; city: string; state: string };
  const [progress, setProgress] = useState(0);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    if (!formData) {
      navigate("/");
      return;
    }

    // Simulate analysis progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setShowResults(true), 300);
          return 100;
        }
        return prev + 10;
      });
    }, 200);

    return () => clearInterval(interval);
  }, [formData, navigate]);

  if (!formData) return null;

  const categories = [
    { name: "Photo Quality & Quantity", score: 72, icon: Image, color: "text-orange-500" },
    { name: "Review Score", score: 88, icon: Star, color: "text-yellow-500" },
    { name: "Number of Reviews", score: 65, icon: ThumbsUp, color: "text-blue-500" },
    { name: "Response Rate", score: 45, icon: Mail, color: "text-purple-500" },
    { name: "Recent Activity", score: 80, icon: Calendar, color: "text-green-500" },
    { name: "Pricing Competitiveness", score: 58, icon: DollarSign, color: "text-teal-500" },
    { name: "Amenities Listed", score: 70, icon: Wifi, color: "text-indigo-500" },
    { name: "Search Visibility", score: 62, icon: TrendingUp, color: "text-pink-500" },
    { name: "Booking Ease", score: 75, icon: Phone, color: "text-cyan-500" },
    { name: "Location Information", score: 90, icon: MapPin, color: "text-red-500" },
  ];

  const overallGrade = "B+";
  const overallScore = Math.round(categories.reduce((acc, cat) => acc + cat.score, 0) / categories.length);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      {/* Header */}
      <header className="border-b border-border bg-background/95 backdrop-blur-sm">
        <div className="container mx-auto px-4 h-16 flex items-center">
          <Button variant="ghost" onClick={() => navigate("/")} className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12 max-w-5xl">
        {!showResults ? (
          <div className="max-w-2xl mx-auto text-center space-y-8 animate-fade-in">
            <div className="space-y-4">
              <h1 className="text-3xl md:text-4xl font-bold text-foreground">
                Analyzing {formData.hotelName}
              </h1>
              <p className="text-lg text-muted-foreground">
                {formData.city}, {formData.state}
              </p>
            </div>

            <div className="space-y-4">
              <Progress value={progress} className="h-3" />
              <p className="text-sm text-muted-foreground">
                {progress < 30 && "Scanning nearby competitors..."}
                {progress >= 30 && progress < 60 && "Analyzing digital presence..."}
                {progress >= 60 && progress < 90 && "Comparing with industry benchmarks..."}
                {progress >= 90 && "Generating your report..."}
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-8 animate-fade-in">
            {/* Overall Score Card */}
            <Card className="border-2 border-primary/20 shadow-lg">
              <CardHeader className="text-center pb-4">
                <CardTitle className="text-2xl md:text-3xl">
                  {formData.hotelName}
                </CardTitle>
                <p className="text-muted-foreground">
                  {formData.city}, {formData.state}
                </p>
              </CardHeader>
              <CardContent className="text-center space-y-6">
                <div className="w-40 h-40 mx-auto bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center shadow-xl">
                  <span className="text-6xl font-bold text-white">{overallGrade}</span>
                </div>
                <div className="space-y-2">
                  <p className="text-xl font-semibold text-foreground">
                    Overall Score: {overallScore}/100
                  </p>
                  <p className="text-lg text-muted-foreground">
                    Ranks #3 out of 12 nearby hotels
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Category Breakdown */}
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-6">Category Breakdown</h2>
              <div className="grid gap-4">
                {categories.map((category, index) => (
                  <Card key={index} className="animate-slide-up" style={{ animationDelay: `${index * 0.05}s` }}>
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4 mb-3">
                        <div className={`w-10 h-10 rounded-lg bg-muted/50 flex items-center justify-center ${category.color}`}>
                          <category.icon className="h-5 w-5" />
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-center mb-2">
                            <h3 className="font-semibold text-foreground">{category.name}</h3>
                            <span className="text-lg font-bold text-foreground">{category.score}%</span>
                          </div>
                          <Progress value={category.score} className="h-2" />
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground ml-14">
                        {category.score >= 80 && "Excellent performance in this category"}
                        {category.score >= 60 && category.score < 80 && "Good, but room for improvement"}
                        {category.score < 60 && "Significant opportunity to improve here"}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* CTA Card */}
            <Card className="bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20">
              <CardContent className="p-8 text-center space-y-4">
                <h3 className="text-2xl font-bold text-foreground">
                  Want Detailed Recommendations?
                </h3>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Get a comprehensive action plan with specific steps to improve each category and outrank your competitors.
                </p>
                <Button size="lg" className="bg-primary hover:bg-primary/90">
                  Get Full Report
                </Button>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default Analyze;
