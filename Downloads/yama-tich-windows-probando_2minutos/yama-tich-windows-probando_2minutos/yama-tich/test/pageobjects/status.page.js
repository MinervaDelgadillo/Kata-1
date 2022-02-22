export default class StatusToast {

    get current() {
        return $('[role=status]')
        // TODO return structure
        // from last toast
        // {type: error|success|info|alert, text: text, closeEl: el}
    }
    get currentMessage() {
        $('[role=status]').waitForExist()
        return $('[role=status]').getText()
    }

    get all() {
        // TODO return structure
        // {length:0, 
        //    [ {type: e|s|i|a, text: t, closeEl: el}] }
        return {
            length: $('[role=status]').length,
            children: $('[role=status]').children()
        }
    }

    // TODO not tested
    updated() {
        const c = $('[role=status]').children().length
        browser.waitUntil( () => {
            return $('[role=status]').children().length != c
        }, 5000, 'no new toast status')

        return current()
    }

    get error() {
        return $('.toast_error')
    }
    get errorMessage() {
        this.error.waitForExist({timeoutMsg:'no toast error exists'})
        return $('.toast_error').getText()
    }

    get successMessage() {
        this.success.waitForExist()
        return $('.toast_success').getText()
    }
    get success() {
        return $('.toast_success')
    }

    closeToast() {
        $('.toast__action_close').click()
    }

    get pageContent() {
        const b = $('body')
        return b.getText()
    }
}
