"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.scrapeProfile = void 0;
const selenium_webdriver_1 = require("selenium-webdriver");
async function scrapeProfile(url) {
    if (!process.env.LINKEDIN_USERNAME || !process.env.LINKEDIN_PASSWORD) {
        throw new Error("Couldn't Scrap the linkedin profile, Please provide your LinkedIn username and password in the .env file");
    }
    const host = 'localhost';
    let driver;
    let curTitle;
    try {
        driver = await new selenium_webdriver_1.Builder()
            .forBrowser('chrome')
            .usingServer(`http://${host}:4444/wd/hub`)
            .build();
        await driver.get('https://www.linkedin.com/login');
        await driver.manage().setTimeouts({ implicit: 5000 });
        const emailInput = await driver.findElement(selenium_webdriver_1.By.id('username'));
        const passwordInput = await driver.findElement(selenium_webdriver_1.By.id('password'));
        await emailInput.sendKeys(`${process.env.LINKEDIN_USERNAME}`);
        await passwordInput.sendKeys(`${process.env.LINKEDIN_PASSWORD}`, selenium_webdriver_1.Key.RETURN);
        await driver.manage().setTimeouts({ implicit: 5000 });
        curTitle = await driver.getTitle();
        console.log('afterSignin: ', curTitle);
        await driver.get(url);
        await driver.manage().setTimeouts({ implicit: 5000 });
        curTitle = await driver.getTitle();
        console.log('after going to profile: ', curTitle);
        const photoSection = await driver.findElement(selenium_webdriver_1.By.css('.pv-top-card--photo'));
        const avatar = await photoSection
            .findElement(selenium_webdriver_1.By.css('img'))
            .getAttribute('src');
        const name = curTitle.split(' | ')[0];
        console.log('name:', name);
        console.log('avatar:', avatar);
        return { name, avatar };
    }
    catch (e) {
        console.error(e);
    }
    finally {
        await driver.quit();
    }
}
exports.scrapeProfile = scrapeProfile;
//# sourceMappingURL=scraper.js.map