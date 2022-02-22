const assert = require('assert');

const LoginPage = require('../pageobjects/login.page.js')
const Status = require('../pageobjects/status.js')
const HomePage = require('../pageobjects/home.page.js')

const TESTDATA = require('../data/testing.data.js')

describe('A teacher who wants to start a session', () => {

    it('should load tich', () => {
        let loginPage = new LoginPage()
        
        loginPage.open()
        console.warn(browser.getUrl())
        
        expect(loginPage.title).toContain('Tich')
    })

 
    it('wont be able to login with the wrong credentials', () => {
        let loginPage = new LoginPage()

        loginPage.open()
        loginPage.email.setValue(TESTDATA.email)
        loginPage.password.setValue(TESTDATA.password+'000')
        loginPage.submit()

        let status = new Status()
        // console.warn(status.errorMessage)
        expect(status.error).toBeDisplayed()
        expect(status.currentMessage).toContain('invalid password')
        status.closeToast()
    })

    it('should be able to login', () => {
        let loginPage = new LoginPage()

        loginPage.open()
        loginPage.email.setValue(TESTDATA.email);
        loginPage.password.setValue(TESTDATA.password)
        loginPage.submit()

        let status = new Status()
        // console.warn(status.successMessage)
        expect(status.success).toBeDisplayed()
        expect(status.currentMessage).toContain('Welcome back to Tich')

        let home = new HomePage()
        home.userBadge.waitForExist()
        expect(home.currentUser).toContain(TESTDATA.email)
        // browser.saveScreenshot('a.png')
    })

})
