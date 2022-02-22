import {netPresets} from "../data/net_conditions"
const now = new Date()
const MAXSTUDENTS = driver.config.maxInstances || 10
const DURATION    = driver.config.duration || 30*60*1000
const RAMP        = driver.config.ramp || 15000 // time between each student should join (milliseconds)
const SPEAKERINTERVAL = driver.config.speakerinterval || 5*60*1000
const FIXEDURL = driver.config.fixedUrl || null
const SCREENSHOTPATH = driver.config.screenShotPath ||  ''
const ACTIONINTERVAL = 1*60*1000
const INTERVAL_MIC = driver.config.interval_mic || 1*60*100

//var dateFormat = require('dateformat');

const [EXCELLENT_BW] = netPresets;
const BW_GUEST = driver.config.bwGuest || []

class SharedData {
    get MAXSTUDENTS() { return MAXSTUDENTS }
    get DURATION() { return DURATION }
    get RAMP() { return RAMP }
    get SPEAKERINTERVAL() { return SPEAKERINTERVAL }
    get FIXEDURL() { return FIXEDURL }
    get SCREENSHOTPATH() { return SCREENSHOTPATH }
    get INTERVAL_MIC() { return INTERVAL_MIC}

    initTestID() {
        const testID = 'T' +now;
        console.warn("testID: " + testID)

        browser.sharedStore.set('testID', testID)
    }

    joinAsDirector(sessionId) {
        const director = {
            sessionId: sessionId,
            name     : 'instructor',
            //email    : `luisernesto.toledo+pinst1@gmail.com`,
            email    : `jorge.gutierrez@bunsan.io`,
            //email    : `luis.toledo@bunsan.io`,
            //password : 'pass1234',
            password : 'Al3x@nd3r',
            //password : 'pass0987',
            state    : '',
            other    : {}
        }

        browser.sharedStore.set('director', director)
        return director
    }

    join(sessionId) {
        let index = 0

        while(index++ <= MAXSTUDENTS) {
            const p = browser.sharedStore.get('player'+ index)
            if (p == undefined) {
                browser.sharedStore.set('player' + index, sessionId)
                const d = { sessionId: sessionId, index: index }
                return this.savePlayer(d)
            }
        }
        return {}
    }



    getPlayerList() {
        let list = []
        for (let index = 1; index < MAXSTUDENTS; index++) {
            list.push(browser.sharedStore.get('player'+index))
        }
        return list
    }

    getPlayer(sessionId) {
        return browser.sharedStore.get(sessionId)
    }

    savePlayer(data) {
        if (data.sessionId==undefined || data.index==undefined) { 
            return 'ERROR: needs sessionId and index'
        }

        const player = {
            index    : data.index,
            sessionId: data.sessionId,
            name     : 'student'+data.index,
            email    : data.email     || `luisernesto.toledo+pstudent${data.index}@gmail.com`,
            password : data.password  || 'pass1234',
            state    : data.state     || '',
            other    : data.misc      || {}
        }
        browser.sharedStore.set(data.sessionId, player)
        return player
    }

    joinAsGuest(sessionId) {
        let index = 0

        while(index++ <= MAXSTUDENTS) {
            const p = browser.sharedStore.get('guest'+ index)
            if (p == undefined) {
                browser.sharedStore.set('guest' + index, sessionId)
                const d = { sessionId: sessionId, index: index }
                return this.saveGuest(d)
            }
        }
        return {}
    }

    getGuestList() {
        let list = []
        for (let index = 1; index <= MAXSTUDENTS; index++) {
            list.push(browser.sharedStore.get('guest'+index))
        }
        return list
    }

    getGuest(sessionId) {
        return browser.sharedStore.get(sessionId)
    }

    saveGuest(data) {
        if (data.sessionId==undefined || data.index==undefined) { 
            return 'ERROR: needs sessionId and index'
        }

        const guest = {
            index    : data.index,
            sessionId: data.sessionId,
            name     : 'guest_'+data.index,
            email    : data.email     || `test_guest_A_${data.index}@bunsan.io`,
            password : data.password  || 'pass1234',
            state    : data.state     || '',
            other    : data.misc      || {},
            network_conditions: this.getNetCondition(data.index) || EXCELLENT_BW,
            is_active_mic: false
        }
        browser.sharedStore.set(data.sessionId, guest)
        return guest
    }

    set url(url) {
        browser.sharedStore.set('url', url)
    }
    get url() {
        // returns fixedurl only when there is no previous stored url
        const storedUrl = browser.sharedStore.get('url')
        return (FIXEDURL && !storedUrl) ? FIXEDURL : storedUrl
    }

    get speaker() {
        return browser.sharedStore.get('speaker')
    }

    set speaker(sessionId) {
        browser.sharedStore.set('speaker', sessionId)
    }

    saveScreenshot(note) {
        const rnd  = Math.random().toString().substring(2, 7)
        const ts   = new Date();
        const name = browser.sharedStore.get('testID') + '-' + ts + '-' + note + '-' +rnd + '.png'
        browser.saveScreenshot(SCREENSHOTPATH + name)
    }

    getNetCondition(index){
        
            let data_bw= BW_GUEST.find(guest => guest.id === index) || {}
            console.debug(data_bw)
            return netPresets.find(bw => bw.quality === data_bw.quality)
        
        
    }
}

export default SharedData