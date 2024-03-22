"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.scrapeProfile = void 0;
const selenium_webdriver_1 = require("selenium-webdriver");
async function scrapeProfile(url) {
    if (!process.env.LINKEDIN_USERNAME || !process.env.LINKEDIN_PASSWORD) {
        throw new Error("Couldn't Scrap the linkedin profile, Please provide your LinkedIn username and password in the .env file");
    }
    console.log('Starting Scraping LinkedIn Profile Session...');
    const host = 'localhost';
    let driver;
    let curTitle;
    try {
        driver = await new selenium_webdriver_1.Builder()
            .forBrowser('chrome')
            .usingServer(`http://${host}:4444/wd/hub`)
            .build();
        console.log('Going To Login Page...');
        await driver.get('https://www.linkedin.com/login');
        await driver.manage().setTimeouts({ implicit: 5000 });
        console.log('Done');
        curTitle = await driver.getTitle();
        console.log('Current Page Title:', curTitle);
        console.log('Entering Credentials To Login...');
        const emailInput = await driver.findElement(selenium_webdriver_1.By.id('username'));
        const passwordInput = await driver.findElement(selenium_webdriver_1.By.id('password'));
        await emailInput.sendKeys(`${process.env.LINKEDIN_USERNAME}`);
        await passwordInput.sendKeys(`${process.env.LINKEDIN_PASSWORD}`, selenium_webdriver_1.Key.RETURN);
        await driver.manage().setTimeouts({ implicit: 5000 });
        console.log('Done');
        curTitle = await driver.getTitle();
        console.log('Current Page Title:', curTitle);
        console.log('Going to profile Page...');
        await driver.get(url);
        await driver.manage().setTimeouts({ implicit: 5000 });
        console.log('Done');
        curTitle = await driver.getTitle();
        console.log('Current Page Title:', curTitle);
        console.log('Scraping Profile Data...');
        const photoSection = await driver.findElement(selenium_webdriver_1.By.css('.pv-top-card--photo'));
        const name = curTitle.split(' | ')[0];
        const avatar = await photoSection
            .findElement(selenium_webdriver_1.By.css('img'))
            .getAttribute('src');
        console.log('Done');
        console.log('Profile name:', name);
        console.log('Profile Personal image link:', avatar);
        console.log('Ending Scraping LinkedIn Profile Session Successfully...');
        return { name, avatar };
    }
    catch (e) {
        console.log('End Scraping LinkedIn Profile Session With Error...');
        console.error('error in scraping linkedin profile:', e);
        console.log('Make sure that:');
        console.log('1- The linkedin profile is valid And public');
        console.log("2- The linkedin Account doesn't require a sceurity verification after login");
        console.log('3- The Remote Docker Selenium Server is running on the host machine correctly');
    }
    finally {
        await driver?.quit();
    }
}
exports.scrapeProfile = scrapeProfile;
//# sourceMappingURL=scraper.js.map