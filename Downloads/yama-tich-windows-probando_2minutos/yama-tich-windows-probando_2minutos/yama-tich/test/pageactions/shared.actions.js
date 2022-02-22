//import SharedData from '../../data/shared.data.js'
//let SD = new SharedData()

export default class SharedActions {

    get name() { return $('form input[name=name]') }

    get email() { return $('form input[name=email]') }
    
    get submitBtn() { return $('form button[type="submit"]') }

    open() {
        browser.url(SD.url)
    }

    submit() {
        this.submitBtn.click()
    }

    leave_session(name) {
        console.debug(name + '> leaving session')
        $('button=Hang up').click()
        $('button=Leave session').click()
        console.debug(name + '> pass leaving session')
    }

    refresh_guest(name, email) {
        console.debug(name + '> refreshing session')
        browser.refresh()
        $('form input[name=name]').setValue(name)
        browser.pause(100)
        $('form input[name=email]').setValue(email)
        $('form button[type="submit"]').click()
        $('.v--modal-overlay').waitForExist({reverse:true})
        console.debug(name + '> pass refreshing')
    }

    refresh_user(name) {
        console.debug(name + '> refreshing session')
        browser.refresh()
        $('button=Join').click()
        $('.v--modal-overlay').waitForExist({reverse:true})
        console.debug(name + '> pass refreshing')
    }

    reload_guest(name, email) {
        console.debug(name + '> reloading session')
        $('button=Reload session').click()
        $('form input[name=name]').setValue(name)
        browser.pause(100)
        $('form input[name=email]').setValue(email)
        $('form button[type="submit"]').click()
        $('.v--modal-overlay').waitForExist({reverse:true})
        console.debug(name + '> pass reloading')
    }

    reload_user(name) {
        console.debug(name + '> reloading session')
        $('button=Reload session').click()
        $('button=Join').click()
        $('.v--modal-overlay').waitForExist({reverse:true})
        console.debug(name + '> pass reloading')
    }

    want_camera(name) {
        console.debug(name + '> want camera')
        $('button=Camera').click()
        console.debug(name + '> got camera')
    }

    want_join(name) {
        console.debug(name + '> want join')
        $('button=Join').click()
        console.debug(name + '> got join')
    }

    want_mic(name) {
        console.debug(name + '> want mic')
        $('button=Mic').click()
        //browser.setTimeout({ 'implicit': driver.config.speakerinterval })
        //$('button=Mic').click()
        console.debug(name + '> got mic')
    }

    want_screen(name) {
        console.debug(name + '> want screen')
        $('button=Screen').click()
        console.debug(name + '> got screen')
    }

    want_video(name) {
        console.debug(name + '> want video')
        $('button=Video').click()
        console.debug(name + '> got video')
    }

}

/* 
  Popup conexion inestable
  #-bFy-MweM > div > a
  <a class="action ripple">Reload</a>

  */