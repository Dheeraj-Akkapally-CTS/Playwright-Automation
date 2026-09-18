import { test as baseTest, expect, Page } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { HomePage } from '../pages/HomePage';
import { EmployeePage } from '../pages/EmployeePage';
 
//custom test fixtures
type TestFixtures = {
  loginPage: LoginPage;
  loggedInPage: Page;
  homePage: HomePage;
  employeePage: EmployeePage;
  testData: {
    username: string;
    password: string;
    employeeName: string;
  };
  testLogger: void;
};
type WorkerFixtures = {
  workerId: string;
};
 
//extend fixture
const test = baseTest.extend<TestFixtures, WorkerFixtures>({testData: async ({}, use) => {
    await use({
      username: 'Admin',
      password: 'admin123',
      employeeName: 'Joy Smith',
    });
  },

  //login page fixture
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },
 
  // logged in page fixture
  loggedInPage: async ( { page, loginPage, testData },use) => {
    await loginPage.goto();
    await loginPage.login(testData.username,testData.password);
    await expect(page).toHaveURL(/dashboard/);
    await use(page);
  },
 
  //home page fixture
  homePage: async ({ loggedInPage }, use) => {
    const homePage = new HomePage(loggedInPage);
    await expect(homePage.dashboardHeading).toBeVisible();
    await use(homePage);
  },
 
  //emp page fixture
  employeePage: async ({ loggedInPage, homePage },use) => {
    await homePage.openPIM();
    await expect(loggedInPage).toHaveURL(/pim/);
    const employeePage = new EmployeePage(loggedInPage);
    await use(employeePage);
  },

  //runs once for each worker
  workerId: [async ({}, use, workerInfo) => {
      const id =`Worker-${workerInfo.workerIndex}`;
      console.log(`Starting ${id}`);
      await use(id);
      console.log(`Cleaning up ${id}`);
    },
    { scope: 'worker' }
  ],

  //runs automatically for every test
  testLogger: [async ({}, use, testInfo) => {
      console.log(`Starting test: ${testInfo.title}`);
      await use();
      console.log(`Finished test: ${testInfo.title}`);
    },
    { auto: true }
  ],
});

test('Use custom test data fixture',async ({ testData }) => {
    console.log('Username:',testData.username);
    console.log('Employee:',testData.employeeName);
    expect(testData.username).toBe('Admin');
  }
);

test('Use LoginPage fixture',async ({loginPage,page,testData}) => {
    await loginPage.goto();
    await loginPage.login(testData.username,testData.password);
    await expect(page).toHaveURL(/dashboard/);
  }
);

test('Use logged-in page fixture',async ({ loggedInPage }) => {
    await expect(loggedInPage).toHaveURL(/dashboard/);
  }
);

test('Use HomePage fixture',async ({ homePage }) => {
    await expect(homePage.dashboardHeading).toBeVisible();
  }
);
 
test('Search employee using EmployeePage fixture',async ({employeePage,testData}) => {
    await employeePage.searchEmployee(testData.employeeName);
    await expect(employeePage.employeeTable).toContainText(testData.employeeName);
  }
);

test('Use Playwright built-in fixtures',async ({page,context,browser}) => {
    console.log('Page URL:',page.url());
    console.log('Browser:',browser.browserType().name());
    const pages = context.pages();
    expect(pages.length).toBeGreaterThanOrEqual(1);
  }
);
 
test('Use worker scoped fixture',async ({ workerId }) => {
    console.log('Running test on:',workerId);
    expect(workerId).toContain('Worker-');
  }
);
 
test('Automatic fixture example',async ({ page }) => {
    await page.goto('https://opensource-demo.orangehrmlive.com/');
    await expect(page).toHaveTitle(/OrangeHRM/);
  }
);