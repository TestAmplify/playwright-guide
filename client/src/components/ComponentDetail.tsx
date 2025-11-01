import { PlaywrightComponent } from '@/data/playwrightData';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, Code2 } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

interface ComponentDetailProps {
  component: PlaywrightComponent;
}

const categoryColors = {
  core: 'bg-primary/10 text-primary border-primary/20',
  structure: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20',
  utilities: 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20',
  reporting: 'bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/20',
  ci: 'bg-pink-500/10 text-pink-600 dark:text-pink-400 border-pink-500/20',
};

export default function ComponentDetail({ component }: ComponentDetailProps) {
  const [showCode, setShowCode] = useState(false);

  return (
    <Card className="border-2">
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <CardTitle className="text-2xl mb-2">{component.title}</CardTitle>
            <CardDescription className="text-base">
              {component.description}
            </CardDescription>
          </div>
          <Badge 
            variant="outline" 
            className={categoryColors[component.category]}
          >
            {component.category}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Key Features */}
        <div>
          <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-primary" />
            Key Features
          </h3>
          <ul className="space-y-2">
            {component.details.map((detail, index) => (
              <li key={index} className="flex items-start gap-2 text-sm">
                <span className="text-primary mt-1">•</span>
                <span className="flex-1">{detail}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Code Example */}
        {component.codeExample && (
          <div>
            <Button
              variant="outline"
              onClick={() => setShowCode(!showCode)}
              className="mb-3 w-full sm:w-auto"
            >
              <Code2 className="w-4 h-4 mr-2" />
              {showCode ? 'Hide' : 'Show'} Code Example
            </Button>
            
            {showCode && (
              <div className="relative">
                <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-xs sm:text-sm border">
                  <code className="font-mono">{component.codeExample}</code>
                </pre>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
