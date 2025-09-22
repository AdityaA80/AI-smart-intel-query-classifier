import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Brain, Send, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useQueryAnalytics } from "./QueryAnalyticsProvider";

interface ClassificationResult {
  category: string;
  confidence: number;
  suggestedResponse: string;
}

interface QueryHistory {
  id: string;
  query: string;
  result: ClassificationResult;
  timestamp: Date;
}

const CATEGORIES = {
  billing: {
    name: "Billing",
    color: "category-billing",
    responses: [
      "For billing inquiries, please check your account dashboard or contact our billing department.",
      "I can help you with payment issues. Please verify your payment method in settings.",
      "Billing questions are best handled by our accounts team. I'll transfer you now."
    ]
  },
  technical: {
    name: "Technical Issue",
    color: "category-technical", 
    responses: [
      "I'll help you troubleshoot this technical issue. Let me gather some information first.",
      "This appears to be a technical problem. Our engineering team can assist you.",
      "For technical support, please try restarting the application first."
    ]
  },
  general: {
    name: "General Inquiry",
    color: "category-general",
    responses: [
      "Thank you for your inquiry. I'm happy to help with general questions.",
      "I can provide information about our services. What would you like to know?",
      "For general questions, please feel free to browse our FAQ section."
    ]
  },
  complaint: {
    name: "Complaint",
    color: "category-complaint",
    responses: [
      "I apologize for any inconvenience. Let me connect you with a supervisor.",
      "We take complaints seriously. I'll escalate this to our customer service manager.",
      "Thank you for your feedback. We'll investigate and follow up within 24 hours."
    ]
  }
};

// Simple rule-based classifier (in a real app, you'd use the HuggingFace model)
const classifyQuery = async (query: string): Promise<ClassificationResult> => {
  // Simulate AI processing delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  const lowerQuery = query.toLowerCase();
  
  if (lowerQuery.includes("bill") || lowerQuery.includes("payment") || lowerQuery.includes("charge") || lowerQuery.includes("invoice")) {
    return {
      category: "billing",
      confidence: 0.92,
      suggestedResponse: CATEGORIES.billing.responses[Math.floor(Math.random() * CATEGORIES.billing.responses.length)]
    };
  }
  
  if (lowerQuery.includes("error") || lowerQuery.includes("bug") || lowerQuery.includes("not work") || lowerQuery.includes("broken")) {
    return {
      category: "technical",
      confidence: 0.87,
      suggestedResponse: CATEGORIES.technical.responses[Math.floor(Math.random() * CATEGORIES.technical.responses.length)]
    };
  }
  
  if (lowerQuery.includes("angry") || lowerQuery.includes("terrible") || lowerQuery.includes("horrible") || lowerQuery.includes("complaint")) {
    return {
      category: "complaint",
      confidence: 0.89,
      suggestedResponse: CATEGORIES.complaint.responses[Math.floor(Math.random() * CATEGORIES.complaint.responses.length)]
    };
  }
  
  return {
    category: "general",
    confidence: 0.76,
    suggestedResponse: CATEGORIES.general.responses[Math.floor(Math.random() * CATEGORIES.general.responses.length)]
  };
};

const QueryClassifier = () => {
  const [query, setQuery] = useState("");
  const [isClassifying, setIsClassifying] = useState(false);
  const [result, setResult] = useState<ClassificationResult | null>(null);
  const [history, setHistory] = useState<QueryHistory[]>([]);
  const { toast } = useToast();
  const { addQuery } = useQueryAnalytics();

  const handleClassify = async () => {
    if (!query.trim()) {
      toast({
        title: "Please enter a query",
        description: "Enter a customer query to classify",
        variant: "destructive"
      });
      return;
    }

    setIsClassifying(true);
    try {
      const classification = await classifyQuery(query);
      setResult(classification);
      
      const historyEntry: QueryHistory = {
        id: Date.now().toString(),
        query,
        result: classification,
        timestamp: new Date()
      };
      
      setHistory(prev => [historyEntry, ...prev.slice(0, 9)]);
      
      // Add to analytics
      addQuery({
        id: historyEntry.id,
        query,
        category: classification.category,
        confidence: classification.confidence,
        timestamp: new Date()
      });
      
      toast({
        title: "Query classified successfully",
        description: `Categorized as: ${CATEGORIES[classification.category as keyof typeof CATEGORIES].name}`,
      });
    } catch (error) {
      toast({
        title: "Classification failed",
        description: "Please try again later",
        variant: "destructive"
      });
    } finally {
      setIsClassifying(false);
    }
  };

  const getCategoryStyle = (category: string) => {
    const categoryKey = category as keyof typeof CATEGORIES;
    const categoryConfig = CATEGORIES[categoryKey];
    return `bg-${categoryConfig.color} text-foreground`;
  };

  return (
    <div className="space-y-6">
      {/* Input Section */}
      <Card className="bg-tech-gradient-subtle border-border shadow-tech-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-primary">
            <Brain className="h-6 w-6" />
            AI Query Classifier
          </CardTitle>
          <CardDescription>
            Enter a customer query to classify it into categories and get suggested responses
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            placeholder="Enter a customer query here... (e.g., 'I have a problem with my bill', 'The app keeps crashing', etc.)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="min-h-[100px] resize-none bg-background border-border focus:ring-primary"
          />
          <Button 
            onClick={handleClassify}
            disabled={isClassifying || !query.trim()}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            {isClassifying ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Classifying...
              </>
            ) : (
              <>
                <Send className="h-4 w-4 mr-2" />
                Classify Query
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Results Section */}
      {result && (
        <Card className="bg-card border-border shadow-tech-card animate-fade-in">
          <CardHeader>
            <CardTitle className="text-primary">Classification Result</CardTitle>
            <CardDescription>AI analysis of your customer query</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Badge className={getCategoryStyle(result.category)}>
                  {CATEGORIES[result.category as keyof typeof CATEGORIES].name}
                </Badge>
                <span className="text-sm text-muted-foreground">
                  Confidence: {(result.confidence * 100).toFixed(1)}%
                </span>
              </div>
            </div>
            
            <div className="p-4 bg-secondary/50 rounded-lg border border-border">
              <h4 className="font-semibold text-foreground mb-2">Suggested Response:</h4>
              <p className="text-muted-foreground">{result.suggestedResponse}</p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* History Section */}
      {history.length > 0 && (
        <Card className="bg-card border-border shadow-tech-card">
          <CardHeader>
            <CardTitle className="text-primary">Recent Classifications</CardTitle>
            <CardDescription>History of processed queries</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {history.map((item) => (
                <div key={item.id} className="p-3 bg-secondary/30 rounded-lg border border-border">
                  <div className="flex items-center justify-between mb-2">
                    <Badge className={getCategoryStyle(item.result.category)}>
                      {CATEGORIES[item.result.category as keyof typeof CATEGORIES].name}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {item.timestamp.toLocaleTimeString()}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground truncate">{item.query}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default QueryClassifier;