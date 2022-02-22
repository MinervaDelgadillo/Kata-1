export default class LoginPage {

    get name() { return $('form input[name=name]') }

    get email() { return $('form input[name=email]') }
    
    get submitBtn() { return $('form button[type="submit"]') }

    open() {
        browser.url(SD.url)
    }

    submit() {
        this.submitBtn.click()
    }
}