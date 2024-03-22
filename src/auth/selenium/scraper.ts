import { Builder, By, Key, WebDriver } from 'selenium-webdriver';

type ProfileData = {
  name: string;
  avatar: string;
};

export async function scrapeProfile(url: string): Promise<ProfileData> {
  if (!process.env.LINKEDIN_USERNAME || !process.env.LINKEDIN_PASSWORD) {
    throw new Error(
      "Couldn't Scrap the linkedin profile, Please provide your LinkedIn username and password in the .env file",
    );
  }

  // const host = 'selenium-hub';
  const host = 'localhost';
  let driver: WebDriver;
  let curTitle: string;
  try {
    driver = await new Builder()
      .forBrowser('chrome')
      .usingServer(`http://${host}:4444/wd/hub`)
      .build();

    // Login to LinkedIn
    await driver.get('https://www.linkedin.com/login');
    await driver.manage().setTimeouts({ implicit: 5000 });
    const emailInput = await driver.findElement(By.id('username'));
    const passwordInput = await driver.findElement(By.id('password'));

    await emailInput.sendKeys(`${process.env.LINKEDIN_USERNAME}`); // Add your LinkedIn email Address
    await passwordInput.sendKeys(
      `${process.env.LINKEDIN_PASSWORD}`,
      Key.RETURN,
    ); // Add your LinkedIn Password
    await driver.manage().setTimeouts({ implicit: 5000 });

    curTitle = await driver.getTitle();
    console.log('afterSignin: ', curTitle);

    await driver.get(url);

    await driver.manage().setTimeouts({ implicit: 5000 });
    curTitle = await driver.getTitle();
    console.log('after going to profile: ', curTitle);
    const photoSection = await driver.findElement(
      By.css('.pv-top-card--photo'),
    );
    const avatar = await photoSection
      .findElement(By.css('img'))
      .getAttribute('src');

    const name = curTitle.split(' | ')[0];
    console.log('name:', name);
    console.log('avatar:', avatar);
    return { name, avatar };
  } catch (e) {
    console.error(e);
  } finally {
    await driver.quit();
  }
}
