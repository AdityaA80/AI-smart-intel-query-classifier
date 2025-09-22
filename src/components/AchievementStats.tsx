import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Brain, Database, BarChart3 } from "lucide-react";

const AchievementStats = () => {
  const achievements = [
    {
      icon: TrendingUp,
      title: "Performance Optimization",
      description: "Reduced average query response time by 38% through MongoDB indexing & API optimization",
      metric: "38% faster",
      color: "text-tech-success"
    },
    {
      icon: Brain,
      title: "AI Model Integration", 
      description: "Integrated a pre-trained BERT model to categorize queries into Billing, Technical, Complaint, and General",
      metric: "92% accuracy",
      color: "text-primary"
    },
    {
      icon: Database,
      title: "Analytics Dashboard",
      description: "Implemented query history tracking and analytics dashboard with Recharts",
      metric: "Real-time data",
      color: "text-tech-secondary"
    },
    {
      icon: BarChart3,
      title: "Smart Classification",
      description: "Advanced query processing with confidence scoring and auto-response suggestions",
      metric: "4 categories",
      color: "text-tech-warning"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {achievements.map((achievement, index) => {
        const IconComponent = achievement.icon;
        return (
          <Card key={index} className="bg-card border-border hover:shadow-tech-card transition-all duration-300">
            <CardContent className="p-4">
              <div className="flex items-start space-x-3">
                <div className={`p-2 rounded-lg bg-primary/10 ${achievement.color}`}>
                  <IconComponent className="h-5 w-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-sm font-semibold text-foreground truncate">
                      {achievement.title}
                    </h3>
                    <Badge variant="secondary" className="text-xs">
                      {achievement.metric}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {achievement.description}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default AchievementStats;