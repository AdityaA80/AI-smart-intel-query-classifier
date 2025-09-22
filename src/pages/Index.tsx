import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import QueryClassifier from "@/components/QueryClassifier";
import Analytics from "@/components/Analytics";
import PromptEnhancer from "@/components/PromptEnhancer";
import AchievementStats from "@/components/AchievementStats";
import ThemeToggle from "@/components/ThemeToggle";
import { QueryAnalyticsProvider } from "@/components/QueryAnalyticsProvider";
import { Brain, BarChart3, Wand2 } from "lucide-react";

const Index = () => {
  return (
    <QueryAnalyticsProvider>
      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="bg-tech-gradient-subtle border-b border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Brain className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-foreground">AI Query Classifier</h1>
                  <p className="text-muted-foreground">Intelligent customer support categorization</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <ThemeToggle />
              </div>
            </div>
          </div>
        </header>

        {/* Achievement Stats */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <AchievementStats />
        </section>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Tabs defaultValue="classifier" className="space-y-6">
            <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-3 bg-secondary">
              <TabsTrigger value="classifier" className="flex items-center gap-2">
                <Brain className="h-4 w-4" />
                Classifier
              </TabsTrigger>
              <TabsTrigger value="enhancer" className="flex items-center gap-2">
                <Wand2 className="h-4 w-4" />
                Enhancer
              </TabsTrigger>
              <TabsTrigger value="analytics" className="flex items-center gap-2">
                <BarChart3 className="h-4 w-4" />
                Analytics
              </TabsTrigger>
            </TabsList>

            <TabsContent value="classifier" className="space-y-6">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-primary mb-2">
                  Smart Query Classification
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Our AI-powered system automatically categorizes customer queries and provides 
                  intelligent response suggestions to streamline your support workflow.
                </p>
              </div>
              <QueryClassifier />
            </TabsContent>

            <TabsContent value="enhancer" className="space-y-6">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-primary mb-2">
                  AI Prompt Enhancement
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Transform basic customer queries into detailed, actionable support requests 
                  with context analysis and response templates.
                </p>
              </div>
              <PromptEnhancer />
            </TabsContent>

            <TabsContent value="analytics" className="space-y-6">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-primary mb-2">
                  Performance Analytics
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Track classification accuracy, response times, and query trends to 
                  optimize your customer support operations.
                </p>
              </div>
              <Analytics />
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </QueryAnalyticsProvider>
  );
};

export default Index;