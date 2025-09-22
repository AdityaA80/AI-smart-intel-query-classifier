import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Wand2, Copy, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const PromptEnhancer = () => {
  const [query, setQuery] = useState("");
  const [enhancedQuery, setEnhancedQuery] = useState("");
  const [isEnhancing, setIsEnhancing] = useState(false);
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const enhancePrompt = async () => {
    if (!query.trim()) {
      toast({
        title: "Empty Query",
        description: "Please enter a query to enhance.",
        variant: "destructive",
      });
      return;
    }

    setIsEnhancing(true);
    
    // Simulate AI enhancement
    setTimeout(() => {
      const enhancements = [
        `Enhanced Query: "${query}"`,
        "",
        "📋 Context Analysis:",
        "• Query Type: Customer Support",
        "• Urgency Level: Medium",
        "• Required Information: Account details, Issue description",
        "",
        "🎯 Suggested Improvements:",
        "• Add specific error codes or messages",
        "• Include timeline of when issue started",
        "• Mention previous troubleshooting steps",
        "",
        "💡 Recommended Response Template:",
        "Thank you for contacting support. To help resolve this efficiently, could you please provide:",
        "1. Your account ID or email",
        "2. Specific error message (if any)",
        "3. When did this issue first occur?",
        "",
        "⚡ Priority Score: 7/10",
        "🏷️ Auto-Tags: #customer-support #issue-resolution #follow-up-required"
      ].join("\n");
      
      setEnhancedQuery(enhancements);
      setIsEnhancing(false);
    }, 2000);
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(enhancedQuery);
      setCopied(true);
      toast({
        title: "Copied!",
        description: "Enhanced query copied to clipboard.",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast({
        title: "Copy Failed",
        description: "Could not copy to clipboard.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      <Card className="bg-card border-border">
        <CardHeader>
          <div className="flex items-center space-x-2">
            <Wand2 className="h-5 w-5 text-primary" />
            <CardTitle>AI Prompt Enhancer</CardTitle>
          </div>
          <CardDescription>
            Transform basic queries into detailed, actionable support requests
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Original Query</label>
            <Textarea
              placeholder="Enter a customer query to enhance... (e.g., 'My app is not working')"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="min-h-[100px] bg-background border-border text-foreground"
            />
          </div>
          
          <Button 
            onClick={enhancePrompt}
            disabled={isEnhancing || !query.trim()}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            {isEnhancing ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-foreground mr-2" />
                Enhancing...
              </>
            ) : (
              <>
                <Wand2 className="h-4 w-4 mr-2" />
                Enhance Query
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {enhancedQuery && (
        <Card className="bg-card border-border">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Enhanced Query Analysis</CardTitle>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={copyToClipboard}
                className="flex items-center gap-2"
              >
                {copied ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                {copied ? "Copied!" : "Copy"}
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <pre className="whitespace-pre-wrap text-sm text-foreground bg-muted p-4 rounded-lg border border-border">
              {enhancedQuery}
            </pre>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default PromptEnhancer;