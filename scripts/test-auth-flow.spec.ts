import { test, expect, chromium } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

// Use a random email for each run to avoid collision
const timestamp = Date.now();
const randomId = Math.floor(Math.random() * 10000);
const email = `test.user.${timestamp}.${randomId}@supergig.debug`;
const password = "Password123!";

test('Validation, Registration, and Login Flow', async () => {
  const browser = await chromium.launch({ channel: 'msedge', headless: true }); 
  const context = await browser.newContext();
  const page = await context.newPage();
  
  const logs: string[] = [];
  const log = (msg: string) => {
      console.log(msg);
      logs.push(msg);
  };

  page.on('console', msg => {
      if (msg.text().includes('[PERF]')) {
          log(`BROWSER_PERF: ${msg.text()}`);
      } else {
          // log(`BROWSER_LOG: ${msg.text()}`); // Optional: enable if needed
      }
  });

  page.on('pageerror', err => log(`BROWSER ERROR: ${err}`));

  log("Starting Auth Flow Test...");

  try {
      // 1. Navigate to Register Page
      await page.goto('http://localhost:3000/register');
      log("Navigated to Register Page");

      // 2. Test Mismatched Passwords
      await page.click('text=Job Seeker'); 
      await page.fill('input[type="email"]', email);
      await page.fill('input[id="password"]', password);
      await page.fill('input[id="confirmPassword"]', "Mismatch123!");
      await page.click('button:has-text("Sign Up")');

      // Verify Error Message
      const mismatchError = await page.locator('text=Passwords do not match');
      await expect(mismatchError).toBeVisible();
      log("PASSED: Mismatched password validation");

      // 3. Test Successful Registration
      log("Filling form for success...");
      await page.fill('input[id="confirmPassword"]', password);
      
      const signUpBtn = page.locator('button:has-text("Sign Up")');
      await expect(signUpBtn).toBeEnabled();
      log("Clicking Sign Up (2nd time)...");
      await signUpBtn.click();

      // Wait for redirect to /seeker or /jobs
      await page.waitForURL(/\/seeker/, { timeout: 60000 });
      log("PASSED: Successful registration and redirect to /seeker");
  } catch (e) {
      log(`TEST FAILED: ${e}`);
  } finally {
      const outputPath = path.resolve('d:\\Supergig\\perf_results.txt');
      fs.writeFileSync(outputPath, logs.join('\n'));
      log(`Logs written to ${outputPath}`);
      await browser.close();
  }
});
