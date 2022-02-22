module.exports = class SignupPage {

    get email() { return $('form input[name=email]') }
    
    get name() { return $('form input[name=name]') }
    
    get newPassword() { return $('form input[name=new-password]') }

    get confirmPassword() { return $('form input[name=confirm-password]') }
    
    get submitBtn() { return $('form button[type="submit"]') }

    get title() { return browser.getTitle() }
    
    // get content() { return $('.container__flex_center') }

    get userLoggedBadge() { return $('.user__info_normal') }

    open() {
        browser.url('/kosu#/register')
    }

    submit() {
        this.submitBtn.click()
    }
}

