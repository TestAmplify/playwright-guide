import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, Terminal } from 'lucide-react';

const implementationSteps = [
  {
    step: 1,
    title: 'Project Setup',
    description: 'Initialize your Playwright project with the proper structure',
    commands: [
      'npm init -y',
      'npm install -D @playwright/test',
      'npm install -D allure-playwright allure-commandline',
      'npx playwright install'
    ],
    tasks: [
      'Create project directory structure',
      'Initialize package.json',
      'Install Playwright and dependencies',
      'Install browser binaries'
    ]
  },
  {
    step: 2,
    title: 'Configure Playwright',
    description: 'Set up playwright.config.ts with browsers, reporters, and test settings',
    commands: [
      'npx playwright init'
    ],
    tasks: [
      'Create playwright.config.ts',
      'Configure test directory and output folders',
      'Set up multiple browser projects (Chromium, Firefox, WebKit)',
      'Configure Allure reporter',
      'Set base URL and global timeout',
      'Configure screenshot and video settings'
    ]
  },
  {
    step: 3,
    title: 'Create Folder Structure',
    description: 'Organize your framework with clear separation of concerns',
    commands: [],
    tasks: [
      'Create tests/ directory for test specifications',
      'Create pages/ directory for Page Object Models',
      'Create data/ directory for test data JSON files',
      'Create utils/ directory for helper functions',
      'Create fixtures/ directory for test fixtures',
      'Create config/env/ for environment configurations'
    ]
  },
  {
    step: 4,
    title: 'Implement Page Objects',
    description: 'Build reusable Page Object Models for your application pages',
    commands: [],
    tasks: [
      'Create a base page class with common methods',
      'Implement page classes for each application page',
      'Define locators as class properties',
      'Create action methods for user interactions',
      'Add assertion methods for validations',
      'Export page objects for use in tests'
    ]
  },
  {
    step: 5,
    title: 'Create Test Data',
    description: 'Set up JSON files for data-driven testing',
    commands: [],
    tasks: [
      'Create users.json with test user data',
      'Create products.json or relevant domain data',
      'Create environments.json for different test environments',
      'Implement data helper utilities to load JSON',
      'Add data validation logic',
      'Support environment-specific data switching'
    ]
  },
  {
    step: 6,
    title: 'Build Utilities & Fixtures',
    description: 'Create reusable helpers and test fixtures',
    commands: [],
    tasks: [
      'Implement data-helper.ts for JSON loading',
      'Create common utilities for dates, random data, etc.',
      'Build custom fixtures for authentication',
      'Set up database cleanup fixtures',
      'Create API helper utilities',
      'Implement custom matchers if needed'
    ]
  },
  {
    step: 7,
    title: 'Write Test Specifications',
    description: 'Create your actual test files using page objects and data',
    commands: [],
    tasks: [
      'Import page objects and test data',
      'Use fixtures for setup and teardown',
      'Write test scenarios with descriptive names',
      'Implement assertions using expect()',
      'Add test tags for categorization (@smoke, @regression)',
      'Use beforeEach/afterEach hooks appropriately'
    ]
  },
  {
    step: 8,
    title: 'Configure Package Scripts',
    description: 'Add convenient npm scripts for running tests',
    commands: [],
    tasks: [
      'Add "test" script for running all tests',
      'Add "test:headed" for debugging',
      'Add "test:ui" for UI mode',
      'Add browser-specific scripts',
      'Add Allure report generation scripts',
      'Add environment-specific test scripts'
    ]
  },
  {
    step: 9,
    title: 'Set Up CI/CD Pipeline',
    description: 'Configure GitHub Actions for automated testing',
    commands: [],
    tasks: [
      'Create .github/workflows/playwright.yml',
      'Configure triggers (push, pull_request, schedule)',
      'Set up Node.js and dependency installation',
      'Install Playwright browsers in CI',
      'Run tests and generate reports',
      'Upload Allure reports as artifacts',
      'Optional: Set up test matrix for multiple browsers/OS'
    ]
  },
  {
    step: 10,
    title: 'Run & Validate',
    description: 'Execute tests and verify everything works',
    commands: [
      'npm test',
      'npm run allure:generate',
      'npm run allure:open'
    ],
    tasks: [
      'Run tests locally to verify setup',
      'Check that all tests pass',
      'Generate Allure report',
      'Review test results and screenshots',
      'Verify CI/CD pipeline execution',
      'Document any setup requirements in README'
    ]
  }
];

export default function Implementation() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="border-b">
        <div className="container py-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Implementation Guide
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl">
            Follow this step-by-step guide to build your complete Playwright test automation framework from scratch. Each step includes specific tasks and commands to execute.
          </p>
        </div>
      </section>

      {/* Implementation Steps */}
      <section className="py-12">
        <div className="container">
          <div className="max-w-4xl mx-auto space-y-8">
            {implementationSteps.map((item, index) => (
              <Card key={item.step} className="border-2">
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <Badge className="text-lg px-4 py-2 bg-primary">
                      Step {item.step}
                    </Badge>
                    <div className="flex-1">
                      <CardTitle className="text-2xl mb-2">{item.title}</CardTitle>
                      <CardDescription className="text-base">
                        {item.description}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Commands */}
                  {item.commands.length > 0 && (
                    <div>
                      <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
                        <Terminal className="w-4 h-4 text-primary" />
                        Commands to Run
                      </h4>
                      <div className="bg-muted p-4 rounded-lg space-y-2">
                        {item.commands.map((command, cmdIndex) => (
                          <div key={cmdIndex} className="font-mono text-sm">
                            <span className="text-primary">$</span> {command}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Tasks */}
                  <div>
                    <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary" />
                      Tasks to Complete
                    </h4>
                    <ul className="space-y-2">
                      {item.tasks.map((task, taskIndex) => (
                        <li key={taskIndex} className="flex items-start gap-2 text-sm">
                          <span className="text-primary mt-1">•</span>
                          <span className="flex-1">{task}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Completion Message */}
          <div className="max-w-4xl mx-auto mt-12">
            <Card className="bg-primary/5 border-primary/20">
              <CardContent className="py-8">
                <div className="text-center space-y-4">
                  <CheckCircle2 className="w-12 h-12 text-primary mx-auto" />
                  <h3 className="text-2xl font-bold">Framework Complete!</h3>
                  <p className="text-muted-foreground max-w-2xl mx-auto">
                    Once you've completed all steps, you'll have a production-ready Playwright test automation framework with data-driven testing, page objects, comprehensive reporting, and automated CI/CD pipelines.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
