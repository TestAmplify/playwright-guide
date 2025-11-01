import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Search, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface QA {
  id: number;
  question: string;
  answer: string;
  category: 'architecture' | 'implementation' | 'best-practices' | 'advanced' | 'troubleshooting';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

const interviewQuestions: QA[] = [
  {
    id: 1,
    question: 'What is the Page Object Model (POM) pattern and why is it important in Playwright automation?',
    answer:
      'The Page Object Model is a design pattern that creates an object repository for web UI elements. In Playwright, POM separates test logic from page-specific code by encapsulating locators and actions in dedicated page classes. This improves maintainability because when UI changes, you only update the page object rather than every test. It also promotes code reusability, makes tests more readable, and reduces duplication. Each page class represents a page or component in your application, containing locators as properties and user actions as methods.',
    category: 'architecture',
    difficulty: 'beginner',
  },
  {
    id: 2,
    question: 'How do you structure a Playwright POM framework? Describe the folder organization.',
    answer:
      'A well-structured Playwright POM framework typically includes: tests/ for test specifications organized by feature, pages/ for Page Object classes (one per page/component), data/ for JSON test data files, utils/ for helper functions and data loaders, fixtures/ for reusable setup/teardown logic, config/ for environment-specific configurations, and reports/ for test execution results. The root contains playwright.config.ts for global configuration, package.json for dependencies and scripts, and .github/workflows/ for CI/CD pipelines. This separation ensures clear responsibilities and makes the framework scalable.',
    category: 'architecture',
    difficulty: 'beginner',
  },
  {
    id: 3,
    question: 'Explain how to implement a Page Object class in Playwright with TypeScript.',
    answer:
      'A Page Object class in Playwright TypeScript includes the Page object as a constructor parameter, locators defined as readonly Locator properties, and action methods that encapsulate user interactions. For example: export class LoginPage { readonly page: Page; readonly emailInput: Locator; constructor(page: Page) { this.page = page; this.emailInput = page.locator("#email"); } async login(email: string, password: string) { await this.emailInput.fill(email); await this.passwordInput.fill(password); await this.submitButton.click(); }}. This approach provides type safety, auto-completion, and clear separation of concerns.',
    category: 'implementation',
    difficulty: 'intermediate',
  },
  {
    id: 4,
    question: 'What are Playwright fixtures and how do they enhance a POM framework?',
    answer:
      'Playwright fixtures are a powerful mechanism for sharing setup and teardown logic across tests. They extend the base test object to provide pre-configured objects like authenticated pages, test data, or API clients. Fixtures automatically handle initialization before tests and cleanup after, ensuring test isolation. For example, you can create an authenticatedPage fixture that logs in once and shares the authenticated state across multiple tests, eliminating repetitive login code. Fixtures support dependency injection, lazy initialization, and can be composed together, making your test code cleaner and more maintainable.',
    category: 'implementation',
    difficulty: 'intermediate',
  },
  {
    id: 5,
    question: 'How do you implement data-driven testing in a Playwright POM framework?',
    answer:
      'Data-driven testing in Playwright POM involves storing test data in external JSON files and loading them dynamically in tests. Create a data/ folder with JSON files containing test scenarios, user credentials, or product data. Implement a DataHelper utility class with methods to read and parse JSON files. In your tests, load the data using the helper and iterate over test cases using test.describe() or array methods. For example: const users = DataHelper.loadJSON("users.json"); users.forEach(user => test(`login with ${user.role}`, async () => {...}));. This approach separates test logic from test data, making tests more maintainable and enabling easy addition of new test scenarios.',
    category: 'implementation',
    difficulty: 'intermediate',
  },
  {
    id: 6,
    question: 'What are the best practices for writing locators in a POM framework?',
    answer:
      "Best practices for locators include: 1) Prefer user-facing attributes like getByRole(), getByLabel(), and getByText() over CSS selectors, 2) Use data-testid attributes for elements without semantic meaning, 3) Avoid brittle selectors that depend on DOM structure (nth-child, complex CSS paths), 4) Store all locators as class properties in page objects, never hardcode them in tests, 5) Use descriptive variable names that reflect the element's purpose, 6) Leverage Playwright's auto-waiting capabilities instead of explicit waits, and 7) Create reusable locator methods for dynamic elements. These practices make tests resilient to UI changes and improve maintainability.",
    category: 'best-practices',
    difficulty: 'intermediate',
  },
  {
    id: 7,
    question: 'How do you handle multiple environments (dev, qa, staging, prod) in Playwright POM?',
    answer:
      'Handle multiple environments by creating a config/env/ directory with separate configuration files for each environment (dev.ts, qa.ts, staging.ts, prod.ts). Each file exports an Environment object containing baseURL, apiURL, timeout values, and other environment-specific settings. Create a getEnvironment() function that reads the TEST_ENV environment variable and returns the appropriate config. In playwright.config.ts, use this function to set the baseURL dynamically. Run tests with different environments using: TEST_ENV=qa npm test. This approach keeps environment-specific data separate, prevents hardcoding, and makes it easy to switch between environments.',
    category: 'implementation',
    difficulty: 'intermediate',
  },
  {
    id: 8,
    question: 'Explain how to integrate Allure reporting into a Playwright POM framework.',
    answer:
      'Integrate Allure by installing allure-playwright and allure-commandline packages. In playwright.config.ts, add allure-playwright to the reporter array with configuration options like outputFolder and detail level. In tests, use the allure object to add steps, attachments, and metadata: await allure.step("Login", async () => {...}). Configure package.json scripts for generating and viewing reports: "allure:generate" to create HTML reports and "allure:open" to view them. Allure automatically captures screenshots, videos, and traces on failure. In CI/CD, generate the report after test execution and upload it as an artifact. This provides rich, interactive test reports with historical trends and detailed failure analysis.',
    category: 'implementation',
    difficulty: 'advanced',
  },
  {
    id: 9,
    question: 'What is the difference between page.locator() and page.getByRole() in Playwright?',
    answer:
      'page.locator() accepts any CSS selector or XPath and is flexible but can create brittle tests if selectors depend on implementation details. page.getByRole() is a semantic locator that finds elements by their ARIA role and accessible name, making tests more resilient and aligned with how users interact with the application. getByRole() is preferred because it works even if CSS classes or IDs change, improves accessibility testing, and makes tests more readable. For example, page.getByRole("button", { name: "Submit" }) is more maintainable than page.locator("#btn-submit-123"). Use getByRole(), getByLabel(), and getByText() first, and fall back to locator() only when necessary.',
    category: 'best-practices',
    difficulty: 'intermediate',
  },
  {
    id: 10,
    question: 'How do you implement custom assertions in Playwright for domain-specific validations?',
    answer:
      "Implement custom assertions by extending Playwright's expect() using expect.extend(). Define custom matchers that encapsulate domain-specific validation logic. For example: expect.extend({ async toHaveValidationError(locator, expectedMessage) { const errorElement = locator.locator('.error'); const isVisible = await errorElement.isVisible(); const actualMessage = await errorElement.textContent(); return { pass: isVisible && actualMessage?.includes(expectedMessage), message: () => `Expected validation error \"${expectedMessage}\"` }; }}). Use in tests: await expect(emailInput).toHaveValidationError('Invalid email'). This makes tests more readable, encapsulates complex assertions, and provides better error messages.",
    category: 'advanced',
    difficulty: 'advanced',
  },
  {
    id: 11,
    question: 'How do you handle authentication and session management in a Playwright POM framework?',
    answer:
      'Handle authentication using Playwright fixtures that manage session state. Create an authentication fixture that performs login once and saves the storage state (cookies, localStorage) to a file. Reuse this state across tests to avoid repeated logins. Example: test.use({ storageState: "auth.json" }). For more complex scenarios, create a fixture that provides an authenticated page: export const test = base.extend({ authenticatedPage: async ({ page }, use) => { await loginPage.login(user, pass); await use(page); }}). This approach significantly speeds up test execution, maintains test isolation, and handles session expiration gracefully.',
    category: 'implementation',
    difficulty: 'advanced',
  },
  {
    id: 12,
    question: 'What strategies do you use to make Playwright tests less flaky in a POM framework?',
    answer:
      'Strategies to reduce flakiness include: 1) Use Playwright\'s built-in auto-waiting instead of explicit waits, 2) Leverage expect() assertions that automatically retry until conditions are met, 3) Use waitForLoadState("networkidle") or waitForLoadState("domcontentloaded") for dynamic content, 4) Avoid hard-coded timeouts (waitForTimeout), 5) Implement proper test isolation with beforeEach hooks, 6) Use fixtures for consistent setup/teardown, 7) Configure retries in playwright.config.ts for CI environments, 8) Capture screenshots and traces on failure for debugging, and 9) Use stable locators (getByRole, getByLabel) instead of brittle CSS selectors. These practices ensure tests are reliable and maintainable.',
    category: 'best-practices',
    difficulty: 'advanced',
  },
  {
    id: 13,
    question: 'How do you implement parallel test execution in Playwright POM framework?',
    answer:
      'Playwright supports parallel execution at multiple levels. Set fullyParallel: true in playwright.config.ts to run all tests in parallel. Configure workers to control parallelism: workers: process.env.CI ? 2 : undefined. Tests within the same file run sequentially by default, but you can enable parallel execution per file with test.describe.configure({ mode: "parallel" }). Ensure tests are independent and don\'t share state. Use test.beforeEach() for setup instead of test.beforeAll() to maintain isolation. For CI, use GitHub Actions matrix strategy to run tests across multiple browsers and OS simultaneously. Parallel execution significantly reduces overall test execution time.',
    category: 'implementation',
    difficulty: 'intermediate',
  },
  {
    id: 14,
    question: 'Explain how to implement API testing alongside UI testing in a Playwright POM framework.',
    answer:
      'Playwright provides a request context for API testing. Create an api/ folder with API client classes that use page.request or request.newContext(). Implement methods for each API endpoint with proper request/response handling. Use API calls in fixtures to set up test data or verify backend state after UI actions. For example: const response = await request.post("/api/users", { data: userData }); expect(response.status()).toBe(201). Combine API and UI testing by using API calls for setup/teardown (creating test data, cleaning up) and UI tests for user workflows. This hybrid approach is faster and more reliable than pure UI testing.',
    category: 'advanced',
    difficulty: 'advanced',
  },
  {
    id: 15,
    question: 'How do you implement a base page class in Playwright POM and what should it contain?',
    answer:
      'A base page class provides common functionality shared across all page objects. It should include: 1) Constructor accepting Page object, 2) Common navigation methods (goto, goBack, refresh), 3) Wait utilities (waitForElement, waitForNavigation), 4) Common assertions (verifyTitle, verifyURL), 5) Screenshot and logging helpers, 6) Cookie and localStorage management, and 7) Error handling methods. Example: export class BasePage { constructor(public page: Page) {} async navigate(url: string) { await this.page.goto(url); } async getTitle() { return await this.page.title(); }}. All specific page objects extend BasePage, inheriting common functionality while adding page-specific locators and actions.',
    category: 'architecture',
    difficulty: 'intermediate',
  },
  {
    id: 16,
    question: 'What is the role of playwright.config.ts in a POM framework and what are the key configurations?',
    answer:
      'playwright.config.ts is the central configuration file that defines framework behavior. Key configurations include: testDir (location of test files), use.baseURL (application URL), use.screenshot and use.video (artifact capture settings), use.trace (debugging traces), timeout and expect.timeout (global timeouts), retries (retry failed tests), workers (parallel execution), projects (browser configurations for chromium, firefox, webkit), reporter (HTML, Allure, JSON reporters), and webServer (auto-start dev server). This file enables environment-specific settings, browser configurations, and reporting options, making the framework flexible and maintainable across different execution contexts.',
    category: 'architecture',
    difficulty: 'intermediate',
  },
  {
    id: 17,
    question: 'How do you implement CI/CD for a Playwright POM framework using GitHub Actions?',
    answer:
      'Create .github/workflows/playwright.yml with a workflow that: 1) Triggers on push, pull_request, or schedule, 2) Sets up Node.js environment, 3) Installs dependencies with npm ci, 4) Installs Playwright browsers with npx playwright install --with-deps, 5) Runs tests with npm test, 6) Generates Allure report with npm run allure:generate, 7) Uploads test results and reports as artifacts using actions/upload-artifact, and 8) Optionally publishes reports to GitHub Pages. Use matrix strategy to test across multiple browsers and OS. Set environment variables for TEST_ENV to run against different environments. Configure retry logic and timeout values appropriate for CI. This ensures automated testing on every code change.',
    category: 'implementation',
    difficulty: 'advanced',
  },
  {
    id: 18,
    question: 'How do you handle dynamic elements and waits in Playwright POM framework?',
    answer:
      'Playwright has built-in auto-waiting for most actions, but for dynamic elements: 1) Use expect() assertions which automatically retry (await expect(element).toBeVisible()), 2) Use waitForSelector() with state option for specific conditions, 3) Use page.waitForLoadState() for page load events, 4) Use page.waitForResponse() or page.waitForRequest() for network events, 5) Implement custom wait methods in base page class for complex scenarios, 6) Use locator.waitFor() for element-specific waits, and 7) Avoid waitForTimeout() as it creates flaky tests. In page objects, encapsulate wait logic within action methods so tests remain clean. For example: async clickSubmit() { await this.submitButton.waitFor({ state: "visible" }); await this.submitButton.click(); }.',
    category: 'troubleshooting',
    difficulty: 'advanced',
  },
  {
    id: 19,
    question: 'What are the advantages of using TypeScript over JavaScript in Playwright POM framework?',
    answer:
      "TypeScript provides significant advantages: 1) Type safety catches errors at compile time rather than runtime, 2) Better IDE support with auto-completion and IntelliSense, 3) Explicit interfaces for page objects, test data, and configurations improve code documentation, 4) Refactoring is safer with type checking, 5) Easier to maintain large codebases with multiple contributors, 6) Better integration with Playwright's typed APIs, and 7) Enforces consistent patterns across the framework. For example, defining interfaces for test data ensures all tests use the correct data structure. TypeScript's static typing makes the framework more robust, maintainable, and developer-friendly.",
    category: 'best-practices',
    difficulty: 'beginner',
  },
  {
    id: 20,
    question: 'How do you debug failing tests in a Playwright POM framework?',
    answer:
      'Debugging strategies include: 1) Run tests in headed mode with --headed flag to see browser actions, 2) Use --debug flag to open Playwright Inspector for step-by-step debugging, 3) Use page.pause() to pause execution at specific points, 4) Enable trace: "on" in config to capture detailed execution traces, 5) View traces with npx playwright show-trace trace.zip, 6) Check screenshots and videos captured on failure in test-results/, 7) Use console.log() or test.info().attach() to log custom data, 8) Run single test with test.only() to isolate issues, 9) Use VS Code Playwright extension for integrated debugging, and 10) Review Allure reports for detailed failure analysis. These tools make identifying and fixing issues efficient.',
    category: 'troubleshooting',
    difficulty: 'intermediate',
  },
];

const categories = ['all', 'architecture', 'implementation', 'best-practices', 'advanced', 'troubleshooting'] as const;
const difficulties = ['all', 'beginner', 'intermediate', 'advanced'] as const;

const categoryColors = {
  architecture: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20',
  implementation: 'bg-primary/10 text-primary border-primary/20',
  'best-practices': 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20',
  advanced: 'bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/20',
  troubleshooting: 'bg-pink-500/10 text-pink-600 dark:text-pink-400 border-pink-500/20',
};

const difficultyColors = {
  beginner: 'bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20',
  intermediate: 'bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border-yellow-500/20',
  advanced: 'bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20',
};

// --- NEW: answer formatter ---
function renderAnswer(raw: string) {
  // detect code-ish parts
  const codeMarkers = ['export class', 'expect.extend', 'test.use', 'npx playwright', 'playwright.config.ts'];
  const hasCode = codeMarkers.some((m) => raw.includes(m));

  // split numbered items like "1) ...."
  const parts = raw.split(/(?=\s?\d+\))/g).map((p) => p.trim()).filter(Boolean);

  // if we got multiple parts, show them as bullets, keep first as intro
  if (parts.length > 1) {
    const [intro, ...rest] = parts;
    return (
      <div className="space-y-4">
        <p className="text-muted-foreground">{intro}</p>
        <ul className="list-disc pl-6 space-y-2">
          {rest.map((item, idx) => (
            <li key={idx} className="text-muted-foreground leading-relaxed">
              {item.replace(/^\d+\)\s?/, '')}
            </li>
          ))}
        </ul>
      </div>
    );
  }

  // single long paragraph but contains code
  if (hasCode) {
    // very light code extraction
    const codeMatch = raw.match(/(export .*|expect\.extend\(.*|test\.use\(.*|npx playwright .*|const .*= .*);?/s);
    const code = codeMatch ? codeMatch[0].trim() : null;
    const text = code ? raw.replace(code, '').trim() : raw;

    return (
      <div className="space-y-4">
        <p className="text-muted-foreground leading-relaxed">{text}</p>
        {code && (
          <pre className="bg-muted rounded-md p-4 text-sm overflow-auto border">
            <code>{code}</code>
          </pre>
        )}
      </div>
    );
  }

  // fallback
  return <p className="text-muted-foreground leading-relaxed whitespace-pre-line">{raw}</p>;
}

export default function Interview() {
  const [selectedCategory, setSelectedCategory] = useState<(typeof categories)[number]>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<(typeof difficulties)[number]>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedQuestions, setExpandedQuestions] = useState<Set<number>>(new Set());

  const toggleQuestion = (id: number) => {
    const newExpanded = new Set(expandedQuestions);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedQuestions(newExpanded);
  };

  const filteredQuestions = interviewQuestions.filter((qa) => {
    const matchesCategory = selectedCategory === 'all' || qa.category === selectedCategory;
    const matchesDifficulty = selectedDifficulty === 'all' || qa.difficulty === selectedDifficulty;
    const matchesSearch =
      searchQuery === '' ||
      qa.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      qa.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesDifficulty && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="border-b">
        <div className="container py-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Interview Questions</h1>
          <p className="text-lg text-muted-foreground max-w-3xl">
            Master your Playwright POM framework interview with these 20 comprehensive questions and detailed answers.
            Filter by category, difficulty level, or search for specific topics.
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="border-b bg-muted/30">
        <div className="container py-6 space-y-4">
          {/* Category Filters */}
          <div>
            <h3 className="text-sm font-semibold mb-2">Category</h3>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className="capitalize"
                >
                  {category.replace('-', ' ')}
                </Button>
              ))}
            </div>
          </div>

          {/* Difficulty Filters */}
          <div>
            <h3 className="text-sm font-semibold mb-2">Difficulty</h3>
            <div className="flex flex-wrap gap-2">
              {difficulties.map((difficulty) => (
                <Button
                  key={difficulty}
                  variant={selectedDifficulty === difficulty ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedDifficulty(difficulty)}
                  className="capitalize"
                >
                  {difficulty}
                </Button>
              ))}
            </div>
          </div>

          {/* Search */}
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search questions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
      </section>

      {/* Questions List */}
      <section className="py-12">
        <div className="container">
          <div className="max-w-4xl mx-auto space-y-4">
            {filteredQuestions.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-lg">No questions found matching your criteria.</p>
              </div>
            ) : (
              filteredQuestions.map((qa) => {
                const isExpanded = expandedQuestions.has(qa.id);
                return (
                  <Card key={qa.id} className="border-2 hover:border-primary/50 transition-colors">
                    <CardHeader>
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex flex-wrap gap-2 mb-3">
                            <Badge variant="outline" className={categoryColors[qa.category]}>
                              {qa.category.replace('-', ' ')}
                            </Badge>
                            <Badge variant="outline" className={difficultyColors[qa.difficulty]}>
                              {qa.difficulty}
                            </Badge>
                          </div>
                          <CardTitle className="text-lg md:text-xl mb-2">Q{qa.id}: {qa.question}</CardTitle>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => toggleQuestion(qa.id)}
                          className="flex-shrink-0"
                        >
                          {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                        </Button>
                      </div>
                    </CardHeader>
                    {isExpanded && (
                      <CardContent>
                        <CardDescription className="text-base leading-relaxed space-y-4">
                          {renderAnswer(qa.answer)}
                        </CardDescription>
                      </CardContent>
                    )}
                  </Card>
                );
              })
            )}
          </div>

          {/* Summary */}
          <div className="max-w-4xl mx-auto mt-8">
            <Card className="bg-primary/5 border-primary/20">
              <CardContent className="py-6">
                <p className="text-sm text-muted-foreground text-center">
                  Showing {filteredQuestions.length} of {interviewQuestions.length} questions
                  {(selectedCategory !== 'all' || selectedDifficulty !== 'all' || searchQuery) && ' (filtered)'}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}