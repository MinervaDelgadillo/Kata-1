export default class LoginPage {

    get email() { return $('form input[type=email]') }
    
    get password() { return $('form input[type=password]') }
    
    get submitBtn() { return $('form button[type="submit"]') }

    get title() { return browser.getTitle() }

    get userLoggedBadge() { return $('.user__info_normal') }

    open() {
        browser.url('kosu#/login')
    }

    submit() {
        this.submitBtn.click()
    }
}