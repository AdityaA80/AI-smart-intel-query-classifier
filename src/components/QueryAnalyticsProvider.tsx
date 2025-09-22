import { createContext, useContext, useState, ReactNode } from "react";

interface QueryHistory {
  id: string;
  query: string;
  category: string;
  confidence: number;
  timestamp: Date;
}

interface AnalyticsData {
  totalQueries: number;
  avgAccuracy: number;
  responseTime: number;
  weeklyGrowth: number;
  categoryData: Array<{ name: string; value: number; color: string }>;
  dailyData: Array<{ day: string; queries: number; resolved: number }>;
}

interface QueryAnalyticsContextType {
  queries: QueryHistory[];
  addQuery: (query: QueryHistory) => void;
  getAnalyticsData: () => AnalyticsData;
}

const QueryAnalyticsContext = createContext<QueryAnalyticsContextType | undefined>(undefined);

export const useQueryAnalytics = () => {
  const context = useContext(QueryAnalyticsContext);
  if (!context) {
    throw new Error("useQueryAnalytics must be used within QueryAnalyticsProvider");
  }
  return context;
};

const CATEGORY_COLORS = {
  billing: "hsl(45 93% 58%)",
  technical: "hsl(0 84% 60%)",
  general: "hsl(262 80% 50%)",
  complaint: "hsl(355 70% 54%)",
};

export const QueryAnalyticsProvider = ({ children }: { children: ReactNode }) => {
  const [queries, setQueries] = useState<QueryHistory[]>([]);

  const addQuery = (query: QueryHistory) => {
    setQueries(prev => [query, ...prev]);
  };

  const getAnalyticsData = (): AnalyticsData => {
    if (queries.length === 0) {
      return {
        totalQueries: 0,
        avgAccuracy: 0,
        responseTime: 0,
        weeklyGrowth: 0,
        categoryData: [
          { name: "No data yet", value: 100, color: "hsl(240 5% 64.9%)" }
        ],
        dailyData: []
      };
    }

    // Calculate category distribution
    const categoryCount = queries.reduce((acc, query) => {
      acc[query.category] = (acc[query.category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const total = queries.length;
    const categoryData = Object.entries(categoryCount).map(([category, count]) => ({
      name: category.charAt(0).toUpperCase() + category.slice(1),
      value: Math.round((count / total) * 100),
      color: CATEGORY_COLORS[category as keyof typeof CATEGORY_COLORS] || "hsl(240 5% 64.9%)"
    }));

    // Calculate daily data for the last 7 days
    const now = new Date();
    const dailyData = [];
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    
    for (let i = 6; i >= 0; i--) {
      const date = new Date(now);
      date.setDate(date.getDate() - i);
      const dayName = days[date.getDay()];
      
      const dayQueries = queries.filter(q => {
        const qDate = new Date(q.timestamp);
        return qDate.toDateString() === date.toDateString();
      });
      
      dailyData.push({
        day: dayName,
        queries: dayQueries.length,
        resolved: Math.floor(dayQueries.length * 0.92) // 92% resolution rate
      });
    }

    const avgAccuracy = queries.reduce((sum, q) => sum + q.confidence, 0) / queries.length;

    return {
      totalQueries: total,
      avgAccuracy: avgAccuracy * 100,
      responseTime: 1.3,
      weeklyGrowth: 23,
      categoryData,
      dailyData
    };
  };

  return (
    <QueryAnalyticsContext.Provider value={{ queries, addQuery, getAnalyticsData }}>
      {children}
    </QueryAnalyticsContext.Provider>
  );
};