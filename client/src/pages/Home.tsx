import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import FlowDiagram from '@/components/FlowDiagram';
import ComponentDetail from '@/components/ComponentDetail';
import { playwrightComponents } from '@/data/playwrightData';
import { ArrowRight, BookOpen, Code2, Zap } from 'lucide-react';
import { Link } from 'wouter';

export default function Home() {
  const [selectedComponentId, setSelectedComponentId] = useState<string | null>(null);

  const selectedComponent = selectedComponentId
    ? playwrightComponents.find(c => c.id === selectedComponentId)
    : null;

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="border-b">
        <div className="container py-16 md:py-24">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              Master Playwright Framework
            </h1>
            <p className="text-xl text-muted-foreground">
              A comprehensive, interactive guide to building robust, scalable test automation frameworks with Playwright, complete with data-driven testing, Page Object Model, Allure reporting, and CI/CD integration.
            </p>
            <div className="flex flex-wrap gap-4 justify-center pt-4">
              <Link href="/components">
                <Button size="lg" className="gap-2">
                  <BookOpen className="w-5 h-5" />
                  Explore Components
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link href="/implementation">
                <Button size="lg" variant="outline" className="gap-2">
                  <Code2 className="w-5 h-5" />
                  Implementation Guide
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="border-b bg-muted/30">
        <div className="container py-16">
          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="w-5 h-5 text-primary" />
                  Interactive Learning
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Click through the flow diagram to explore each component in detail. Learn how different parts of the framework connect and work together.
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Code2 className="w-5 h-5 text-primary" />
                  Real Code Examples
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Every component includes production-ready code examples you can copy and adapt for your own projects. No theory-only content.
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-primary" />
                  Complete Framework
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Learn the complete architecture from test specs and page objects to CI/CD pipelines and reporting. Everything you need in one place.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Interactive Flow Diagram */}
      <section className="py-16">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Framework Architecture
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Click on any component in the diagram below to see detailed information, key features, and code examples.
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            <Card className="p-6">
              <FlowDiagram
                onNodeClick={setSelectedComponentId}
                selectedComponentId={selectedComponentId}
              />
            </Card>
          </div>

          {/* Selected Component Detail */}
          {selectedComponent && (
            <div className="max-w-4xl mx-auto mt-8">
              <ComponentDetail component={selectedComponent} />
            </div>
          )}

          {!selectedComponent && (
            <div className="max-w-2xl mx-auto mt-8">
              <Card className="bg-muted/50">
                <CardContent className="py-8 text-center">
                  <p className="text-muted-foreground">
                    👆 Click on any component in the diagram above to view detailed information
                  </p>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t bg-muted/30">
        <div className="container py-16">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2 className="text-3xl font-bold">
              Ready to Build Your Framework?
            </h2>
            <p className="text-lg text-muted-foreground">
              Explore all 17 components in detail, follow the step-by-step implementation guide, and learn best practices for production-ready test automation.
            </p>
            <div className="flex flex-wrap gap-4 justify-center pt-4">
              <Link href="/components">
                <Button size="lg" variant="outline">
                  View All Components
                </Button>
              </Link>
              <Link href="/best-practices">
                <Button size="lg" variant="outline">
                  Best Practices
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
