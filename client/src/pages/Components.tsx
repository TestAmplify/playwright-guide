import { useState } from 'react';
import { playwrightComponents } from '@/data/playwrightData';
import ComponentDetail from '@/components/ComponentDetail';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search } from 'lucide-react';

const categories = ['all', 'core', 'structure', 'utilities', 'reporting', 'ci'] as const;

export default function Components() {
  const [selectedCategory, setSelectedCategory] = useState<typeof categories[number]>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedComponent, setExpandedComponent] = useState<string | null>(null);

  const filteredComponents = playwrightComponents.filter(component => {
    const matchesCategory = selectedCategory === 'all' || component.category === selectedCategory;
    const matchesSearch = searchQuery === '' || 
      component.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      component.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="border-b">
        <div className="container py-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Framework Components
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl">
            Explore all 17 components that make up a complete Playwright test automation framework. Each component includes detailed explanations, key features, and production-ready code examples.
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="border-b bg-muted/30">
        <div className="container py-6">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            {/* Category Filters */}
            <div className="flex flex-wrap gap-2">
              {categories.map(category => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className="capitalize"
                >
                  {category}
                  {category === 'all' && (
                    <Badge variant="secondary" className="ml-2">
                      {playwrightComponents.length}
                    </Badge>
                  )}
                </Button>
              ))}
            </div>

            {/* Search */}
            <div className="relative w-full md:w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search components..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Components List */}
      <section className="py-12">
        <div className="container">
          <div className="max-w-5xl mx-auto space-y-6">
            {filteredComponents.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-lg">
                  No components found matching your criteria.
                </p>
              </div>
            ) : (
              filteredComponents.map(component => (
                <div key={component.id}>
                  <ComponentDetail component={component} />
                </div>
              ))
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
