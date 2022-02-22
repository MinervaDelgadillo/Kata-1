const assert = require('assert');

const SignupPage = require('../pageobjects/signup.page.js')
const Status = require('../pageobjects/status.js')
const HomePage = require('../pageobjects/home.page.js')

const EmailData = require('../data/email.data.js')
let testingEmail = {}

describe('A new user who wants to register', () => {

    beforeAll (async function() {
        testingEmail = new EmailData()
        await testingEmail.init()        
        console.warn('fakemail: ' + testingEmail.email)
        console.warn('ssid    : ' + testingEmail.sid)
    })

    it('should be able to request an account', () => {
        let signupPage = new SignupPage()
        
        signupPage.open()

        signupPage.email.setValue(testingEmail.email)
        signupPage.name.setValue(testingEmail.name)
        signupPage.newPassword.setValue(testingEmail.password)
        signupPage.confirmPassword.setValue(testingEmail.password)

        signupPage.submit()
        browser.pause(3000)

        let status = new Status()
        expect(status.success).toBeDisplayed()
        expect(status.currentMessage).toContain('registered successfully')
        expect(status.pageContent).toContain('Go check your email')
    })

    it('should receive a verification email', function () {
        browser.waitUntil(async () => {
            testingEmail.checkInbox()
            const expected = testingEmail.searchFor('tich@bunsan.io', 'Almost done! We need to verify your email')
            return expected.length > 0
        },
        180000, //max wait
        'timeout expecting for verification email more than two minutes',
        20000) //interval

        const expected = testingEmail.searchFor('tich@bunsan.io', 'Almost done! We need to verify your email')
        console.log(expected)
        const verificationMail = testingEmail.fetch(expected[0].mail_id)
        console.log(testingEmail.currentMail)


        // const tichMails = inbox.filter( mail => mail.mail_from === 'tich@bunsan.io' )
        // const verificationMail = tichMails.filter( mail => mail.mail_subject === 'Almost done! We need to verify your email')
        // expect(testingEmail.inboxText).toContain('Tich')
    })

    // it ('', async function () {
    //     const expected = testingEmail.searchFor('tich@bunsan.io', 'Almost done! We need to verify your email')
    //     console.log(expected)
    //     const verificationMail = testingEmail.fetch(expected[0].mail_id)
    //     console.log(testingEmail.currentMail)

    // })

})
