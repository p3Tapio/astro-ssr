import puppeteer from 'puppeteer';

setTimeout(async () => {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  try {
    const page = await browser.newPage();
    await page.goto('http://localhost:3000');

    const navItems = await page.evaluate(() => {
      const items = document.querySelectorAll('.nav__item');
      return Array.from(items).map((item) => item.innerText);
    });

    const requiredNavItems = ['Home', 'Register', 'Sign in'];
    const navIsEqual = requiredNavItems.every((item) =>
      navItems.includes(item)
    );

    if (!navIsEqual) {
      throw new Error('Required navigation items missing');
    }

    let header = await page.evaluate(() => {
      return document.querySelector('h1').innerText;
    });

    if (header !== 'Hello World') {
      throw new Error('Header is not correct');
    }

    await page.click('text=Register');

    header = await page.evaluate(() => {
      return document.querySelector('h1').innerText;
    });

    if (header !== 'Auth') {
      throw new Error('Navigation not working');
    }

    console.log('All good 👍');
  } catch (error) {
    console.error(`Test failed, ${error}`);
  } finally {
    await browser.close();
  }
}, 5000);
