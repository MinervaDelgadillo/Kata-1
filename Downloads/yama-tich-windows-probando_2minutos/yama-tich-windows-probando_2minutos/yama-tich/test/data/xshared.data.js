const config = require ("./config.data.js")

module.exports = class SharedData {
    init() {
        for (var i = config.MAXSTUDENTS; i >= 0; i--) {
            browser.browser.sharedStore.set(`student${i}Browser`, undefined)
        }
        browser.sharedStore.set('url', undefined)
    }

    availableStudent(browserID) {
        let email = null
        for (var i = 1; i <= config.MAXSTUDENTS; i++) {
            if (this.getStudentBrowser(i) == undefined) {
                this.registerStudentBrowser(i, browserID)
                email = config.credentials.students.pre + i + config.credentials.students.post
                break
            }
        }
        return email.toString()
    }

    getStudentBrowser(index) {
        return browser.sharedStore.get(`student${index}Browser`)
        console.warn(`get s${index}: `+browser.sharedStore.get(`student${index}Browser`))
    }

    registerStudentBrowser(index, browserID) {
        return browser.sharedStore.set(`student${index}Browser`, browserID)
        console.warn(`set s${index}: `+browser.sharedStore.get(`student${index}Browser`))
    }

    set sessionUrl(url) {
        browser.sharedStore.set('url', url)
    }
    get sessionUrl() {
        browser.sharedStore.get('url')
    }

    get instructor() {
        const instructor =  {
            email: config.credentials.instructor.email,
            pass : config.credentials.commonPassword,
            browser: browser.sharedStore.get('instructorBrowser')
        }
        return instructor
    }

    registerInstructorBrowser(browserID) {
        browser.sharedStore.set('instructorBrowser', browserID)
    }
}

