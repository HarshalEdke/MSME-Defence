import { test, expect } from '@playwright/test'

const UNIQUE = () => 'DemoCo ' + Date.now()

test.beforeEach(async ({ page }) => {
  await page.goto('/')
  await page.evaluate(() => localStorage.clear())
  await page.reload()
})

test.describe('A. Supplier discovery', () => {
  test('search existing supplier', async ({ page }) => {
    await page.goto('/suppliers')
    await page.getByPlaceholder('Search suppliers by name or category...').fill('AeroForge')
    await expect(page.getByText('AeroForge Precision Pvt Ltd')).toBeVisible()
  })

  test('apply category filter', async ({ page }) => {
    await page.goto('/suppliers')
    const selects = page.locator('select')
    await selects.nth(0).selectOption('Electronics & Avionics')
    await expect(page.getByText('Bharat Electronics Subsystems')).toBeVisible()
    await expect(page.getByText('AeroForge Precision Pvt Ltd')).not.toBeVisible()
  })

  test('apply location filter', async ({ page }) => {
    await page.goto('/suppliers')
    const selects = page.locator('select')
    await selects.nth(1).selectOption('Bengaluru, Karnataka')
    await expect(page.getByText('AeroForge Precision Pvt Ltd')).toBeVisible()
  })

  test('apply status filter', async ({ page }) => {
    await page.goto('/suppliers')
    const selects = page.locator('select')
    await selects.nth(2).selectOption('Qualified')
    await expect(page.getByText('Shakti Fasteners Ltd')).toBeVisible()
  })

  test('apply capability filter', async ({ page }) => {
    await page.goto('/suppliers')
    const selects = page.locator('select')
    await selects.nth(3).selectOption('CNC Machining')
    await expect(page.getByText('AeroForge Precision Pvt Ltd')).toBeVisible()
  })

  test('apply certification filter', async ({ page }) => {
    await page.goto('/suppliers')
    const selects = page.locator('select')
    await selects.nth(4).selectOption('AS9100D')
    await expect(page.getByText('AeroForge Precision Pvt Ltd')).toBeVisible()
  })

  test('no-results state', async ({ page }) => {
    await page.goto('/suppliers')
    await page.getByPlaceholder('Search suppliers by name or category...').fill('zzzzzz-no-match')
    await expect(page.getByText('0 suppliers found')).toBeVisible()
  })

  test('open supplier card shows correct profile', async ({ page }) => {
    await page.goto('/suppliers')
    await page.getByRole('link', { name: 'View Profile' }).first().click()
    await expect(page.getByText('Performance Score')).toBeVisible()
  })
})
test.describe('B. Qualification and admin approval', () => {
  test('cannot advance with empty required fields', async ({ page }) => {
    await page.goto('/qualification')
    await page.getByRole('button', { name: /Next/ }).click()
    await expect(page.getByText('Required').first()).toBeVisible()
  })

  test('submit application, approve, persist, no duplicate', async ({ page }) => {
    const company = UNIQUE()
    await page.goto('/qualification')
    await page.getByLabel('Company Name').fill(company)
    await page.getByLabel('Contact Person').fill('Test Person')
    await page.getByLabel('Email').fill('test@example.com')
    await page.getByLabel('Phone').fill('9999999999')
    await page.getByRole('button', { name: /Next/ }).click()

    await page.getByLabel('MSME Registration Number').fill('MSME-TEST')
    await page.getByLabel('GST Number').fill('GST-TEST')
    await page.getByLabel('PAN Number').fill('PAN-TEST')
    await page.getByLabel('Registered Address').fill('Test City, India')
    await page.getByRole('button', { name: /Next/ }).click()

    await page.getByLabel('Manufacturing Capabilities (comma separated)').fill('CNC Machining')
    await page.getByRole('button', { name: /Next/ }).click()

    await page.getByLabel('Quality Certifications (comma separated)').fill('ISO 9001:2015')
    await page.getByRole('button', { name: /Next/ }).click()

    await page.getByLabel('Compliance Documents (list)').fill('Doc1')
    await page.getByRole('button', { name: /Next/ }).click()

    await page.getByLabel('I declare the information provided is accurate (demo declaration).').check()
    await page.getByRole('button', { name: /Submit Application/ }).click()
    await expect(page.getByText('Application Submitted')).toBeVisible()

    await page.goto('/admin')
    await page.getByRole('button', { name: new RegExp(company) }).click()
    await page.getByRole('button', { name: /Approve/ }).click()

    await page.goto('/suppliers')
    await page.getByPlaceholder('Search suppliers by name or category...').fill(company)
    await expect(page.locator('span', { hasText: 'Qualified' })).toBeVisible()

    await page.reload()
    await page.getByPlaceholder('Search suppliers by name or category...').fill(company)
    await expect(page.locator('span', { hasText: 'Qualified' })).toBeVisible()

    await expect(page.getByText(company)).toHaveCount(1)
  })
})

test.describe('C. Traceability', () => {
  test('valid component', async ({ page }) => {
    await page.goto('/traceability')
    await page.getByPlaceholder('Enter Component ID (e.g. COMP-AF-1042)').fill('COMP-AF-1042')
    await page.getByRole('button', { name: /Search/ }).click()
    await expect(page.getByText('Aircraft Bracket Assembly')).toBeVisible()
    await expect(page.getByText('Supplier Registration')).toBeVisible()
  })

  test('invalid component', async ({ page }) => {
    await page.goto('/traceability')
    await page.getByPlaceholder('Enter Component ID (e.g. COMP-AF-1042)').fill('COMP-NOPE')
    await page.getByRole('button', { name: /Search/ }).click()
    await expect(page.getByText('Component not found')).toBeVisible()
  })

  test('clear input keeps page usable', async ({ page }) => {
    await page.goto('/traceability')
    const input = page.getByPlaceholder('Enter Component ID (e.g. COMP-AF-1042)')
    await input.fill('COMP-AF-1042')
    await input.clear()
    await expect(input).toHaveValue('')
    await expect(page.getByRole('heading', { name: 'Component Traceability' })).toBeVisible()
  })
})

test.describe('D. Reset', () => {
  test('cancel reset keeps edit', async ({ page }) => {
    await page.goto('/admin')
    const firstSupplierBtn = page.locator('ul.space-y-2 button').first()
    await firstSupplierBtn.click()
    await page.getByRole('button', { name: 'Reject', exact: true }).click()
    await expect(page.getByText('Rejected').first()).toBeVisible()

    page.on('dialog', (d) => d.dismiss())
    await page.getByRole('button', { name: 'Reset Demo Data' }).click()
    await expect(page.getByText('Rejected').first()).toBeVisible()
  })

  test('accept reset restores seed data', async ({ page }) => {
    await page.goto('/admin')
    const firstSupplierBtn = page.locator('ul.space-y-2 button').first()
    await firstSupplierBtn.click()
    await page.getByRole('button', { name: 'Reject', exact: true }).click()

    page.on('dialog', (d) => d.accept())
    await page.getByRole('button', { name: 'Reset Demo Data' }).click()

    await page.goto('/suppliers')
    await page.getByPlaceholder('Search suppliers by name or category...').fill('AeroForge')
    await expect(page.locator('span', { hasText: 'Qualified' })).toBeVisible()

    await page.reload()
    await page.getByPlaceholder('Search suppliers by name or category...').fill('AeroForge')
    await expect(page.locator('span', { hasText: 'Qualified' })).toBeVisible()
  })
})

test.describe('E. Navigation and responsiveness', () => {
  test('all main routes load', async ({ page }) => {
    for (const path of ['/dashboard', '/suppliers', '/qualification', '/traceability', '/supply-chain', '/admin']) {
      await page.goto(path)
      await expect(page).toHaveURL(new RegExp(path.replace('/', '\\/')))
    }
  })

  test('mobile drawer', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 })
    await page.goto('/dashboard')
    const hamburger = page.locator('button.lg\\:hidden')
    await hamburger.click()
    await expect(page.locator('div.fixed.inset-0 a', { hasText: 'Supplier Discovery' })).toBeVisible()
  })
})

