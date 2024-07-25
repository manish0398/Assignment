import { test, expect } from '@playwright/test';

test.describe('Login page test cases', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://demo.haroldwaste.com/authentication');
  })

  test('Verify that initially email and password fields are empty', async ({page}) => {
    await expect(page.locator('[data-test-id="input-email"]').getByRole('textbox')).toBeEmpty();
    await expect(page.locator('[data-test-id="input-password"]').getByRole('textbox')).toBeEmpty();
  })

  test('Verify that if valid email and password are provided and Login button is clicked then user is able to login into the page', async ({page}) => {
    await page.locator('[data-test-id="input-email"]').getByRole('textbox').fill('qa@julesai.com');
    await page.locator('[data-test-id="input-password"]').getByRole('textbox').fill('QaJULES2023!');
    await page.locator('[data-test-id="signin"]').click();
    await expect(page.locator('//*[@id="root"]/div/div[2]/form/div/div')).not.toBeVisible();
  })

  test('Verify the presence of a toggle button show/hide password to the user', async ({page}) => {
    await expect(page.locator('//*[@id="root"]/div/div[2]/form/div/div/div[2]/div[2]/div/div/button')).toBeVisible();
  })

  test('Verify that if a user login to the homepage using wrong email or password, a message appears alerting the user', async ({page}) => {
    await page.locator('[data-test-id="input-email"]').getByRole('textbox').fill('qa@julesai.com');
    await page.locator('[data-test-id="input-password"]').getByRole('textbox').fill('QaJULES!');
    await page.locator('[data-test-id="signin"]').click();
    await page.waitForTimeout(1500);
    expect(page.locator('[data-test-id="toaster-message"]')).toBe('Your email and/or password are incorrects');
  })

  test('Verify that validation is there if email and password fields are not provided and Login Button is clicked', async ({ page }) => {
    await page.locator('[data-test-id="signin"]').click();
    await page.waitForTimeout(1000);
    expect(page.getByText('Required').first()).toBeVisible();
    expect(page.getByText('Required').nth(1)).toBeVisible();
  })

  test('Verify that if invalid email id is provided then a validation appears', async ({page}) => {
    await page.locator('[data-test-id="input-email"]').getByRole('textbox').fill('invalidEmail');
    await page.locator('[data-test-id="input-password"]').getByRole('textbox').click();
    expect(page.getByText('Email not valid')).toBeVisible();
  })

  test('Verify that if password is too short then a validation appears', async ({page}) => {
    await page.locator('[data-test-id="input-password"]').getByRole('textbox').fill('pass');
    await page.locator('[data-test-id="input-email"]').getByRole('textbox').click();
    expect(page.getByText('Password too short')).toBeVisible();
  })
})