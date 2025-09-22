import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import { TrendingUp, MessageSquare, Target, Clock } from "lucide-react";

const Analytics = () => {
  // Mock data - in a real app, this would come from your backend
  const categoryData = [
    { name: "Technical Issues", value: 35, color: "hsl(0 84% 60%)" },
    { name: "Billing", value: 28, color: "hsl(45 93% 58%)" },
    { name: "General Inquiries", value: 25, color: "hsl(262 80% 50%)" },
    { name: "Complaints", value: 12, color: "hsl(355 70% 54%)" },
  ];

  const dailyData = [
    { day: "Mon", queries: 45, resolved: 42 },
    { day: "Tue", queries: 52, resolved: 48 },
    { day: "Wed", queries: 38, resolved: 36 },
    { day: "Thu", queries: 61, resolved: 58 },
    { day: "Fri", queries: 55, resolved: 52 },
    { day: "Sat", queries: 29, resolved: 27 },
    { day: "Sun", queries: 33, resolved: 31 },
  ];

  const stats = [
    {
      title: "Total Queries",
      value: "1,247",
      change: "+12%",
      icon: MessageSquare,
      color: "tech-primary"
    },
    {
      title: "Avg. Accuracy",
      value: "94.2%",
      change: "+2.1%",
      icon: Target,
      color: "tech-success"
    },
    {
      title: "Response Time",
      value: "1.3s",
      change: "-0.2s",
      icon: Clock,
      color: "tech-warning"
    },
    {
      title: "Weekly Growth",
      value: "+23%",
      change: "+5%",
      icon: TrendingUp,
      color: "tech-secondary"
    }
  ];

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
          <p className="text-foreground">{`${label}: ${payload[0].value}`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card key={index} className="bg-card border-border shadow-tech-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.title}</p>
                  <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                  <p className={`text-sm text-${stat.color}`}>{stat.change} from last week</p>
                </div>
                <div className={`p-3 rounded-full bg-${stat.color}/10`}>
                  <stat.icon className={`h-6 w-6 text-${stat.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Category Distribution */}
        <Card className="bg-card border-border shadow-tech-card">
          <CardHeader>
            <CardTitle className="text-primary">Query Categories</CardTitle>
            <CardDescription>Distribution of query types this week</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={120}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-4 space-y-2">
              {categoryData.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-sm text-muted-foreground">{item.name}</span>
                  </div>
                  <span className="text-sm font-medium text-foreground">{item.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Daily Performance */}
        <Card className="bg-card border-border shadow-tech-card">
          <CardHeader>
            <CardTitle className="text-primary">Daily Performance</CardTitle>
            <CardDescription>Queries received and resolved this week</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={dailyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px"
                  }}
                />
                <Legend />
                <Bar 
                  dataKey="queries" 
                  fill="hsl(var(--tech-primary))" 
                  radius={[4, 4, 0, 0]}
                  name="Queries Received"
                />
                <Bar 
                  dataKey="resolved" 
                  fill="hsl(var(--tech-success))" 
                  radius={[4, 4, 0, 0]}
                  name="Queries Resolved"
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Analytics;