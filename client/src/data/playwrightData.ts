export interface PlaywrightComponent {
  id: string;
  title: string;
  shortTitle: string;
  description: string;
  details: string[];
  codeExample?: string;
  category: 'core' | 'structure' | 'utilities' | 'reporting' | 'ci';
}

export const playwrightComponents: PlaywrightComponent[] = [
  {
    id: 'config',
    title: 'Playwright Test Runner & Config',
    shortTitle: 'playwright.config.ts',
    description: 'Central configuration for browsers, baseURL, retries, timeouts, reporters, projects (chromium, firefox, webkit), and testDir.',
    details: [
      'Defines which browsers to test (Chromium, Firefox, WebKit)',
      'Sets base URL for all tests',
      'Configures retry logic and timeouts',
      'Specifies test directory and output folders',
      'Manages reporter configurations',
      'Handles parallel execution settings'
    ],
    category: 'core',
    codeExample: `import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [
    ['html'],
    ['allure-playwright']
  ],
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
});`
  },
  {
    id: 'tests',
    title: 'Test Specs',
    shortTitle: 'tests/*.spec.ts',
    description: 'Actual test files written in Playwright test syntax (test(), expect()). Call page objects, read JSON data, and assert UI behavior.',
    details: [
      'Contains test scenarios using test() and expect()',
      'Imports and uses page objects for clean test code',
      'Reads test data from JSON files',
      'Performs UI assertions and validations',
      'Organized by feature or user journey',
      'Supports test hooks (beforeEach, afterEach)'
    ],
    category: 'core',
    codeExample: `import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { testData } from '../data/users.json';

test.describe('Login Flow', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.navigate();
  });

  test('should login with valid credentials', async () => {
    await loginPage.login(
      testData.validUser.email,
      testData.validUser.password
    );
    await expect(loginPage.successMessage).toBeVisible();
  });

  test('should show error with invalid credentials', async () => {
    await loginPage.login('invalid@email.com', 'wrongpass');
    await expect(loginPage.errorMessage).toBeVisible();
  });
});`
  },
  {
    id: 'pages',
    title: 'Page Object Layer',
    shortTitle: 'pages/*.ts',
    description: 'One file per page/screen. Encapsulates locators and reusable actions (login, addToCart, checkout) to keep tests clean.',
    details: [
      'One class per page or component',
      'Encapsulates all locators for that page',
      'Provides reusable action methods',
      'Improves test maintainability',
      'Reduces code duplication',
      'Makes tests more readable'
    ],
    category: 'structure',
    codeExample: `import { Page, Locator } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;
  readonly successMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.emailInput = page.locator('#email');
    this.passwordInput = page.locator('#password');
    this.loginButton = page.locator('button[type="submit"]');
    this.errorMessage = page.locator('.error-message');
    this.successMessage = page.locator('.success-message');
  }

  async navigate() {
    await this.page.goto('/login');
  }

  async login(email: string, password: string) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
}`
  },
  {
    id: 'data',
    title: 'Test Data (JSON)',
    shortTitle: 'data/*.json',
    description: 'External test data files (users, products, env-specific data). Enables data-driven tests by looping over JSON objects.',
    details: [
      'Stores test data separately from test logic',
      'Supports multiple environments (dev, qa, prod)',
      'Enables data-driven testing',
      'Easy to update without changing code',
      'Can include users, products, configurations',
      'Supports test data versioning'
    ],
    category: 'structure',
    codeExample: `{
  "users": {
    "validUser": {
      "email": "test@example.com",
      "password": "SecurePass123!",
      "name": "Test User"
    },
    "adminUser": {
      "email": "admin@example.com",
      "password": "AdminPass456!",
      "role": "admin"
    }
  },
  "products": [
    {
      "id": "prod-001",
      "name": "Laptop",
      "price": 999.99
    },
    {
      "id": "prod-002",
      "name": "Mouse",
      "price": 29.99
    }
  ],
  "environments": {
    "dev": {
      "baseUrl": "http://localhost:3000",
      "apiUrl": "http://localhost:8080"
    },
    "qa": {
      "baseUrl": "https://qa.example.com",
      "apiUrl": "https://api-qa.example.com"
    }
  }
}`
  },
  {
    id: 'utils',
    title: 'Data Loader / Utility Layer',
    shortTitle: 'utils/data-helper.ts',
    description: 'Small helper that reads JSON, validates keys, and returns data to tests. Can switch data by environment or scenario.',
    details: [
      'Reads and parses JSON test data',
      'Validates data structure',
      'Provides type-safe data access',
      'Supports environment switching',
      'Handles data transformation',
      'Centralizes data loading logic'
    ],
    category: 'utilities',
    codeExample: `import * as fs from 'fs';
import * as path from 'path';

export class DataHelper {
  private static cache: Map<string, any> = new Map();

  static loadJSON<T>(filePath: string): T {
    if (this.cache.has(filePath)) {
      return this.cache.get(filePath);
    }

    const fullPath = path.join(__dirname, '../data', filePath);
    const rawData = fs.readFileSync(fullPath, 'utf-8');
    const data = JSON.parse(rawData);
    
    this.cache.set(filePath, data);
    return data;
  }

  static getUser(userType: string) {
    const data = this.loadJSON('users.json');
    return data.users[userType];
  }

  static getEnvironment(env: string = process.env.TEST_ENV || 'dev') {
    const data = this.loadJSON('environments.json');
    return data.environments[env];
  }
}`
  },
  {
    id: 'fixtures',
    title: 'Fixtures',
    shortTitle: 'fixtures/*.ts',
    description: 'Reusable setup/teardown (auth state, test user, API token, clean DB). Shared across tests so you don\'t repeat login/business setup.',
    details: [
      'Provides reusable test setup and teardown',
      'Manages authentication state',
      'Creates test users and data',
      'Handles database cleanup',
      'Shares context across tests',
      'Improves test isolation'
    ],
    category: 'utilities',
    codeExample: `import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

type MyFixtures = {
  authenticatedPage: Page;
  loginPage: LoginPage;
};

export const test = base.extend<MyFixtures>({
  authenticatedPage: async ({ page }, use) => {
    // Setup: Login before test
    const loginPage = new LoginPage(page);
    await loginPage.navigate();
    await loginPage.login('test@example.com', 'password');
    
    // Use the authenticated page
    await use(page);
    
    // Teardown: Logout after test
    await page.goto('/logout');
  },

  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },
});

export { expect } from '@playwright/test';`
  },
  {
    id: 'env-config',
    title: 'Environment / Config Manager',
    shortTitle: 'config/env/*.ts',
    description: 'Keeps URLs, credentials, and API keys for dev, qa, staging, prod. Test picks env via CLI arg or env variable.',
    details: [
      'Manages environment-specific configurations',
      'Stores URLs and API endpoints',
      'Handles credentials securely',
      'Supports multiple environments',
      'CLI-based environment selection',
      'Prevents hardcoded values in tests'
    ],
    category: 'utilities',
    codeExample: `export interface Environment {
  name: string;
  baseUrl: string;
  apiUrl: string;
  timeout: number;
}

const environments: Record<string, Environment> = {
  dev: {
    name: 'Development',
    baseUrl: 'http://localhost:3000',
    apiUrl: 'http://localhost:8080/api',
    timeout: 30000,
  },
  qa: {
    name: 'QA',
    baseUrl: 'https://qa.example.com',
    apiUrl: 'https://api-qa.example.com',
    timeout: 60000,
  },
  staging: {
    name: 'Staging',
    baseUrl: 'https://staging.example.com',
    apiUrl: 'https://api-staging.example.com',
    timeout: 60000,
  },
  prod: {
    name: 'Production',
    baseUrl: 'https://example.com',
    apiUrl: 'https://api.example.com',
    timeout: 90000,
  },
};

export function getEnvironment(): Environment {
  const env = process.env.TEST_ENV || 'dev';
  return environments[env] || environments.dev;
}`
  },
  {
    id: 'common-utils',
    title: 'Common Utilities',
    shortTitle: 'utils/*.ts',
    description: 'Helpers for dates, random data, file uploads, API calls, waits. Keeps specs short and readable.',
    details: [
      'Date and time utilities',
      'Random data generators',
      'File upload helpers',
      'API call wrappers',
      'Custom wait functions',
      'String manipulation tools'
    ],
    category: 'utilities',
    codeExample: `import { Page } from '@playwright/test';

export class TestUtils {
  static generateRandomEmail(): string {
    const timestamp = Date.now();
    return \`test.\${timestamp}@example.com\`;
  }

  static formatDate(date: Date): string {
    return date.toISOString().split('T')[0];
  }

  static async uploadFile(page: Page, selector: string, filePath: string) {
    const fileInput = page.locator(selector);
    await fileInput.setInputFiles(filePath);
  }

  static async waitForNetworkIdle(page: Page, timeout = 5000) {
    await page.waitForLoadState('networkidle', { timeout });
  }

  static generateRandomString(length: number): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }
}`
  },
  {
    id: 'custom-commands',
    title: 'Custom Commands / Expect Extensions',
    shortTitle: 'Custom Extensions',
    description: 'Extra assertions or wrappers around Playwright actions for your domain. Makes tests more readable for the team.',
    details: [
      'Domain-specific assertions',
      'Custom matchers for expect()',
      'Reusable command wrappers',
      'Improves test readability',
      'Encapsulates complex logic',
      'Team-specific helpers'
    ],
    category: 'utilities',
    codeExample: `import { expect } from '@playwright/test';

// Custom matcher example
expect.extend({
  async toHaveValidationError(locator, expectedMessage) {
    const errorElement = locator.locator('.error-message');
    const isVisible = await errorElement.isVisible();
    const actualMessage = isVisible ? await errorElement.textContent() : '';

    const pass = isVisible && actualMessage?.includes(expectedMessage);

    return {
      pass,
      message: () => 
        pass
          ? \`Expected not to have validation error "\${expectedMessage}"\`
          : \`Expected to have validation error "\${expectedMessage}", but got "\${actualMessage}"\`,
    };
  },
});

// Usage in tests:
// await expect(emailInput).toHaveValidationError('Invalid email format');`
  },
  {
    id: 'allure-integration',
    title: 'Allure Reporter Integration',
    shortTitle: 'Allure Reporter',
    description: 'Playwright config updated to use allure-playwright. Generates raw Allure results after test run. Adds steps, attachments, screenshots, and videos to reports.',
    details: [
      'Integrates with Playwright reporter system',
      'Generates detailed test reports',
      'Captures screenshots and videos',
      'Tracks test steps and duration',
      'Provides historical trends',
      'Supports attachments and logs'
    ],
    category: 'reporting',
    codeExample: `// In playwright.config.ts
import { defineConfig } from '@playwright/test';

export default defineConfig({
  reporter: [
    ['html'],
    ['allure-playwright', {
      detail: true,
      outputFolder: 'allure-results',
      suiteTitle: false,
    }]
  ],
  // ... other config
});

// In test file - adding steps
import { test } from '@playwright/test';
import { allure } from 'allure-playwright';

test('example with allure steps', async ({ page }) => {
  await allure.step('Navigate to login page', async () => {
    await page.goto('/login');
  });

  await allure.step('Enter credentials', async () => {
    await page.fill('#email', 'test@example.com');
    await page.fill('#password', 'password');
  });

  await allure.step('Submit form', async () => {
    await page.click('button[type="submit"]');
  });
});`
  },
  {
    id: 'artifacts',
    title: 'Screenshots & Video Artifacts',
    shortTitle: 'test-results/',
    description: 'Captured on failure or on demand. Attached to Allure so failures are easy to debug.',
    details: [
      'Automatic screenshot on failure',
      'Video recording of test execution',
      'Trace files for debugging',
      'Attached to test reports',
      'Configurable capture settings',
      'Helps with failure analysis'
    ],
    category: 'reporting',
    codeExample: `// In playwright.config.ts
export default defineConfig({
  use: {
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'on-first-retry',
  },
});

// Manual screenshot in test
test('example with manual screenshot', async ({ page }) => {
  await page.goto('/dashboard');
  
  // Take screenshot at specific point
  await page.screenshot({ 
    path: 'screenshots/dashboard.png',
    fullPage: true 
  });
  
  // Attach to report
  await test.info().attach('Dashboard View', {
    body: await page.screenshot(),
    contentType: 'image/png',
  });
});`
  },
  {
    id: 'allure-generate',
    title: 'Allure Report Generation Script',
    shortTitle: 'npm run allure:generate',
    description: 'Script to convert raw Allure results into a nice HTML report. Can be run locally or inside CI.',
    details: [
      'Converts raw results to HTML',
      'Generates interactive reports',
      'Can run locally or in CI',
      'Provides test history',
      'Shows trends and statistics',
      'Supports custom themes'
    ],
    category: 'reporting',
    codeExample: `// In package.json
{
  "scripts": {
    "test": "playwright test",
    "test:headed": "playwright test --headed",
    "allure:generate": "allure generate allure-results --clean -o allure-report",
    "allure:open": "allure open allure-report",
    "allure:serve": "allure serve allure-results"
  }
}

// Command line usage:
// 1. Run tests: npm test
// 2. Generate report: npm run allure:generate
// 3. Open report: npm run allure:open

// Or combine: npm test && npm run allure:serve`
  },
  {
    id: 'github-actions',
    title: 'GitHub Actions Workflow',
    shortTitle: '.github/workflows/',
    description: 'CI pipeline to: checkout code, install Node & deps, install Playwright browsers, run tests, generate Allure report, upload report as artifact. Runs on push, PR, or schedule.',
    details: [
      'Automated CI/CD pipeline',
      'Runs on push, PR, or schedule',
      'Installs dependencies automatically',
      'Executes tests in parallel',
      'Generates and uploads reports',
      'Supports multiple environments'
    ],
    category: 'ci',
    codeExample: `name: Playwright Tests

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]
  schedule:
    - cron: '0 2 * * *'  # Run daily at 2 AM

jobs:
  test:
    timeout-minutes: 60
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v3
    
    - uses: actions/setup-node@v3
      with:
        node-version: 18
        
    - name: Install dependencies
      run: npm ci
      
    - name: Install Playwright Browsers
      run: npx playwright install --with-deps
      
    - name: Run Playwright tests
      run: npm test
      
    - name: Generate Allure Report
      if: always()
      run: npm run allure:generate
      
    - name: Upload Allure Report
      if: always()
      uses: actions/upload-artifact@v3
      with:
        name: allure-report
        path: allure-report/
        retention-days: 30`
  },
  {
    id: 'ci-matrix',
    title: 'CI Test Matrix',
    shortTitle: 'Browser/OS Matrix',
    description: 'In GitHub Actions, define matrix to run on chromium/firefox/webkit or linux/windows. Ensures coverage across browsers.',
    details: [
      'Tests across multiple browsers',
      'Supports different operating systems',
      'Parallel execution',
      'Comprehensive coverage',
      'Identifies browser-specific issues',
      'Configurable combinations'
    ],
    category: 'ci',
    codeExample: `name: Playwright Tests - Matrix

on: [push, pull_request]

jobs:
  test:
    timeout-minutes: 60
    runs-on: \${{ matrix.os }}
    strategy:
      fail-fast: false
      matrix:
        os: [ubuntu-latest, windows-latest, macos-latest]
        browser: [chromium, firefox, webkit]
        exclude:
          # WebKit on Linux can be flaky
          - os: ubuntu-latest
            browser: webkit
    steps:
    - uses: actions/checkout@v3
    - uses: actions/setup-node@v3
      with:
        node-version: 18
    - name: Install dependencies
      run: npm ci
    - name: Install Playwright
      run: npx playwright install --with-deps \${{ matrix.browser }}
    - name: Run tests
      run: npx playwright test --project=\${{ matrix.browser }}`
  },
  {
    id: 'package-scripts',
    title: 'Package Scripts',
    shortTitle: 'package.json',
    description: 'Shortcuts like test, test:headed, test:smoke, allure:generate, allure:open. Standardizes how the team runs tests.',
    details: [
      'Standardized command shortcuts',
      'Team-wide consistency',
      'Easy to remember commands',
      'Supports different test modes',
      'Integrates with CI/CD',
      'Documented in README'
    ],
    category: 'structure',
    codeExample: `{
  "name": "playwright-framework",
  "version": "1.0.0",
  "scripts": {
    "test": "playwright test",
    "test:headed": "playwright test --headed",
    "test:debug": "playwright test --debug",
    "test:ui": "playwright test --ui",
    "test:smoke": "playwright test --grep @smoke",
    "test:regression": "playwright test --grep @regression",
    "test:chrome": "playwright test --project=chromium",
    "test:firefox": "playwright test --project=firefox",
    "test:webkit": "playwright test --project=webkit",
    "allure:generate": "allure generate allure-results --clean",
    "allure:open": "allure open allure-report",
    "allure:serve": "allure serve allure-results",
    "report": "playwright show-report"
  },
  "devDependencies": {
    "@playwright/test": "^1.40.0",
    "allure-playwright": "^2.10.0",
    "allure-commandline": "^2.25.0"
  }
}`
  },
  {
    id: 'folder-structure',
    title: 'Folder / Project Structure Convention',
    shortTitle: 'Project Structure',
    description: 'Clear separation: tests/, pages/, data/, utils/, fixtures/, reports/, .github/. Makes it easy for new QA/automation engineers to onboard.',
    details: [
      'Organized directory structure',
      'Clear separation of concerns',
      'Easy navigation',
      'Scalable architecture',
      'Supports team collaboration',
      'Follows best practices'
    ],
    category: 'structure',
    codeExample: `playwright-framework/
├── .github/
│   └── workflows/
│       └── playwright.yml
├── tests/
│   ├── auth/
│   │   ├── login.spec.ts
│   │   └── registration.spec.ts
│   ├── e2e/
│   │   ├── checkout.spec.ts
│   │   └── product-search.spec.ts
│   └── api/
│       └── users.spec.ts
├── pages/
│   ├── LoginPage.ts
│   ├── HomePage.ts
│   └── CheckoutPage.ts
├── data/
│   ├── users.json
│   ├── products.json
│   └── environments.json
├── utils/
│   ├── data-helper.ts
│   ├── test-utils.ts
│   └── api-client.ts
├── fixtures/
│   ├── auth.fixture.ts
│   └── test-data.fixture.ts
├── config/
│   └── env/
│       ├── dev.ts
│       ├── qa.ts
│       └── prod.ts
├── allure-results/
├── allure-report/
├── test-results/
├── playwright.config.ts
├── package.json
└── README.md`
  },
  {
    id: 'readme',
    title: 'README / Usage Doc',
    shortTitle: 'README.md',
    description: 'Explains how to run: local vs CI, how to add JSON data, how to view Allure. Critical for teams and students.',
    details: [
      'Project overview and setup',
      'Installation instructions',
      'How to run tests',
      'Environment configuration',
      'Contributing guidelines',
      'Troubleshooting tips'
    ],
    category: 'structure',
    codeExample: `# Playwright Test Framework

## Overview
Data-driven Playwright framework with Page Object Model, Allure reporting, and CI/CD integration.

## Prerequisites
- Node.js 18+
- npm or yarn

## Installation
\`\`\`bash
npm install
npx playwright install
\`\`\`

## Running Tests
\`\`\`bash
# Run all tests
npm test

# Run in headed mode
npm run test:headed

# Run specific browser
npm run test:chrome

# Run with UI mode
npm run test:ui
\`\`\`

## Environment Configuration
Set TEST_ENV environment variable:
\`\`\`bash
TEST_ENV=qa npm test
\`\`\`

## Viewing Reports
\`\`\`bash
# Generate and open Allure report
npm run allure:serve

# Or generate then open
npm run allure:generate
npm run allure:open
\`\`\`

## Project Structure
- \`tests/\` - Test specifications
- \`pages/\` - Page Object Models
- \`data/\` - Test data (JSON)
- \`utils/\` - Helper utilities
- \`fixtures/\` - Test fixtures

## Adding New Tests
1. Create page object in \`pages/\`
2. Add test data to \`data/\`
3. Write test spec in \`tests/\`
4. Run and verify

## CI/CD
Tests run automatically on push/PR via GitHub Actions.
View reports in Actions artifacts.`
  }
];

export const flowDiagramNodes = [
  { id: 'developer', label: 'Developer / QA', componentId: null, x: 50, y: 5 },
  { id: 'config', label: 'playwright.config.ts', componentId: 'config', x: 50, y: 15 },
  { id: 'tests', label: 'tests/*.spec.ts', componentId: 'tests', x: 20, y: 30 },
  { id: 'pages', label: 'pages/*.ts', componentId: 'pages', x: 50, y: 30 },
  { id: 'data', label: 'data/*.json', componentId: 'data', x: 80, y: 30 },
  { id: 'utils', label: 'utils/data-helper.ts', componentId: 'utils', x: 50, y: 42 },
  { id: 'fixtures', label: 'fixtures/*.ts', componentId: 'fixtures', x: 50, y: 52 },
  { id: 'runner', label: 'Playwright Runner', componentId: null, x: 50, y: 62 },
  { id: 'results', label: 'Test Execution Results', componentId: 'artifacts', x: 50, y: 72 },
  { id: 'allure-cli', label: 'Allure CLI', componentId: 'allure-generate', x: 50, y: 82 },
  { id: 'allure-report', label: 'Allure Report HTML', componentId: 'allure-integration', x: 50, y: 92 },
  { id: 'github', label: 'GitHub Actions CI/CD', componentId: 'github-actions', x: 50, y: 102 },
  { id: 'artifacts', label: 'CI Artifacts', componentId: null, x: 50, y: 112 }
];

export const flowDiagramEdges = [
  { from: 'developer', to: 'config' },
  { from: 'config', to: 'tests' },
  { from: 'config', to: 'pages' },
  { from: 'config', to: 'data' },
  { from: 'tests', to: 'utils' },
  { from: 'pages', to: 'utils' },
  { from: 'data', to: 'utils' },
  { from: 'utils', to: 'fixtures' },
  { from: 'fixtures', to: 'runner' },
  { from: 'runner', to: 'results' },
  { from: 'results', to: 'allure-cli' },
  { from: 'allure-cli', to: 'allure-report' },
  { from: 'allure-report', to: 'github' },
  { from: 'github', to: 'artifacts' }
];
