import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Lightbulb, AlertTriangle, CheckCircle2, XCircle } from 'lucide-react';

const bestPractices = [
  {
    category: 'Test Organization',
    icon: Lightbulb,
    practices: [
      {
        title: 'Use Page Object Model',
        description: 'Encapsulate page-specific locators and actions in dedicated classes to improve maintainability and reduce duplication.',
        good: 'const loginPage = new LoginPage(page); await loginPage.login(email, password);',
        bad: 'await page.fill("#email", email); await page.fill("#password", password); await page.click("button");'
      },
      {
        title: 'Keep Tests Independent',
        description: 'Each test should be able to run independently without relying on the state from previous tests.',
        good: 'Use beforeEach() to set up fresh state for each test',
        bad: 'Relying on test execution order or shared state between tests'
      },
      {
        title: 'Use Descriptive Test Names',
        description: 'Test names should clearly describe what is being tested and the expected outcome.',
        good: 'test("should display error message when login fails with invalid credentials")',
        bad: 'test("test1")'
      }
    ]
  },
  {
    category: 'Locator Strategies',
    icon: Lightbulb,
    practices: [
      {
        title: 'Prefer User-Facing Attributes',
        description: 'Use locators that users can see and understand, like text content, labels, and ARIA roles.',
        good: 'page.getByRole("button", { name: "Submit" })',
        bad: 'page.locator("#btn-123-xyz")'
      },
      {
        title: 'Use data-testid for Dynamic Content',
        description: 'For elements that change frequently or lack semantic meaning, use data-testid attributes.',
        good: 'page.getByTestId("user-profile-menu")',
        bad: 'page.locator("div > div > div:nth-child(3) > span")'
      },
      {
        title: 'Avoid Brittle Selectors',
        description: 'Avoid selectors that depend on DOM structure or implementation details that may change.',
        good: 'page.getByLabel("Email address")',
        bad: 'page.locator("body > div:nth-child(2) > form > input:first-child")'
      }
    ]
  },
  {
    category: 'Data Management',
    icon: Lightbulb,
    practices: [
      {
        title: 'Externalize Test Data',
        description: 'Store test data in JSON files or environment configs, not hardcoded in tests.',
        good: 'const user = DataHelper.getUser("validUser"); await loginPage.login(user.email, user.password);',
        bad: 'await loginPage.login("test@example.com", "password123");'
      },
      {
        title: 'Use Fixtures for Setup',
        description: 'Leverage Playwright fixtures for reusable setup and teardown logic.',
        good: 'test.use({ authenticatedPage }); test("dashboard test", async ({ authenticatedPage }) => {...})',
        bad: 'Repeating login code in every test that needs authentication'
      },
      {
        title: 'Environment-Specific Configs',
        description: 'Maintain separate configurations for different environments (dev, qa, staging, prod).',
        good: 'const env = getEnvironment(process.env.TEST_ENV); baseURL: env.baseUrl',
        bad: 'Hardcoding URLs and credentials in playwright.config.ts'
      }
    ]
  },
  {
    category: 'Assertions & Waits',
    icon: Lightbulb,
    practices: [
      {
        title: 'Use Auto-Waiting Assertions',
        description: 'Playwright\'s expect() automatically waits for conditions to be met.',
        good: 'await expect(page.locator(".success")).toBeVisible();',
        bad: 'await page.waitForTimeout(5000); const isVisible = await page.locator(".success").isVisible();'
      },
      {
        title: 'Avoid Hard Waits',
        description: 'Never use waitForTimeout() except for debugging. Use smart waits instead.',
        good: 'await page.waitForLoadState("networkidle"); await expect(element).toBeVisible();',
        bad: 'await page.waitForTimeout(3000);'
      },
      {
        title: 'Assert on Multiple Conditions',
        description: 'Make your tests more robust by checking multiple aspects of the expected state.',
        good: 'await expect(successMessage).toBeVisible(); await expect(successMessage).toHaveText("Login successful");',
        bad: 'await expect(successMessage).toBeVisible(); // Only checking visibility'
      }
    ]
  },
  {
    category: 'Performance & Reliability',
    icon: Lightbulb,
    practices: [
      {
        title: 'Run Tests in Parallel',
        description: 'Configure Playwright to run tests in parallel for faster execution.',
        good: 'fullyParallel: true in playwright.config.ts',
        bad: 'Running all tests sequentially'
      },
      {
        title: 'Use Retries Wisely',
        description: 'Configure retries for CI environments to handle flaky network conditions.',
        good: 'retries: process.env.CI ? 2 : 0',
        bad: 'retries: 5 // Masking real test failures'
      },
      {
        title: 'Capture Artifacts on Failure',
        description: 'Automatically capture screenshots, videos, and traces when tests fail.',
        good: 'screenshot: "only-on-failure", video: "retain-on-failure", trace: "on-first-retry"',
        bad: 'No artifact capture configuration'
      }
    ]
  },
  {
    category: 'CI/CD Integration',
    icon: Lightbulb,
    practices: [
      {
        title: 'Use GitHub Actions Matrix',
        description: 'Test across multiple browsers and operating systems using matrix strategy.',
        good: 'strategy: { matrix: { browser: [chromium, firefox, webkit] } }',
        bad: 'Only testing on a single browser in CI'
      },
      {
        title: 'Upload Test Reports',
        description: 'Always upload test reports and artifacts for debugging failed CI runs.',
        good: 'actions/upload-artifact@v3 with allure-report and test-results',
        bad: 'No artifact upload, making CI failures hard to debug'
      },
      {
        title: 'Run on Schedule',
        description: 'Set up scheduled runs (e.g., nightly) to catch issues early.',
        good: 'on: { schedule: [{ cron: "0 2 * * *" }] }',
        bad: 'Only running tests on push/PR'
      }
    ]
  },
  {
    category: 'Code Quality',
    icon: Lightbulb,
    practices: [
      {
        title: 'Use TypeScript',
        description: 'TypeScript provides type safety and better IDE support for your test code.',
        good: 'Write tests in .ts files with proper type annotations',
        bad: 'Using JavaScript without type checking'
      },
      {
        title: 'Follow Naming Conventions',
        description: 'Use consistent naming for files, classes, and methods across your framework.',
        good: 'LoginPage.ts, login.spec.ts, users.json',
        bad: 'Inconsistent naming: loginPg.ts, Login_Test.spec.ts, user_data.JSON'
      },
      {
        title: 'Document Your Framework',
        description: 'Maintain a comprehensive README with setup instructions and usage examples.',
        good: 'Detailed README with prerequisites, installation, running tests, and troubleshooting',
        bad: 'No documentation, new team members struggle to get started'
      }
    ]
  }
];

export default function BestPractices() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="border-b">
        <div className="container py-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Best Practices
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl">
            Follow these proven best practices to build maintainable, reliable, and scalable test automation frameworks. Learn what to do and what to avoid.
          </p>
        </div>
      </section>

      {/* Best Practices */}
      <section className="py-12">
        <div className="container">
          <div className="max-w-5xl mx-auto space-y-12">
            {bestPractices.map((section, sectionIndex) => (
              <div key={sectionIndex}>
                <div className="flex items-center gap-3 mb-6">
                  <section.icon className="w-6 h-6 text-primary" />
                  <h2 className="text-2xl font-bold">{section.category}</h2>
                </div>

                <div className="space-y-6">
                  {section.practices.map((practice, practiceIndex) => (
                    <Card key={practiceIndex}>
                      <CardHeader>
                        <CardTitle className="text-xl">{practice.title}</CardTitle>
                        <CardDescription className="text-base">
                          {practice.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {/* Good Example */}
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-green-600 dark:text-green-400" />
                            <span className="text-sm font-semibold text-green-600 dark:text-green-400">
                              Good Practice
                            </span>
                          </div>
                          <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3">
                            <code className="text-sm font-mono">{practice.good}</code>
                          </div>
                        </div>

                        {/* Bad Example */}
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <XCircle className="w-4 h-4 text-red-600 dark:text-red-400" />
                            <span className="text-sm font-semibold text-red-600 dark:text-red-400">
                              Avoid This
                            </span>
                          </div>
                          <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3">
                            <code className="text-sm font-mono">{practice.bad}</code>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Summary Card */}
          <div className="max-w-5xl mx-auto mt-12">
            <Card className="bg-primary/5 border-primary/20">
              <CardContent className="py-8">
                <div className="flex items-start gap-4">
                  <AlertTriangle className="w-8 h-8 text-primary flex-shrink-0 mt-1" />
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold">Remember</h3>
                    <p className="text-muted-foreground">
                      These best practices are learned from years of experience building and maintaining test automation frameworks. Following them will save you time, reduce flakiness, and make your tests more maintainable. Start with the basics and gradually adopt more advanced practices as your framework matures.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
