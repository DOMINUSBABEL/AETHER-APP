import asyncio
from playwright.async_api import async_playwright

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page(viewport={"width": 1280, "height": 800})

        await page.goto('http://localhost:3000')

        # Bypass login
        await page.fill('#user-date', '1990-01-01')
        await page.fill('#partner-date', '1990-01-01')
        await page.click('button.bg-primary:last-of-type')

        # Wait for animation
        await page.wait_for_timeout(2000)

        # Tab to focus the zodiac selector
        await page.keyboard.press('Tab')
        await page.keyboard.press('Tab')
        await page.keyboard.press('Tab')
        await page.keyboard.press('Tab')

        await page.screenshot(path='screenshot.png')

        await browser.close()

asyncio.run(main())
