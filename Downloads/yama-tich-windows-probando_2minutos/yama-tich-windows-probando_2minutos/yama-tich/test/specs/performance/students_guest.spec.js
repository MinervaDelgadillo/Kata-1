import LoginPage from '../../pageobjects/loginguest.page.js'
import SharedData from '../../data/shared.data.js'
import SharedActions from '../../pageactions/shared.actions.js'
import { logging } from 'selenium-webdriver'
import { Options } from 'selenium-webdriver/chrome'

let SD = new SharedData()
let SA = new SharedActions()
let guest
let url 

var logPrefs = new logging.Preferences();
var options = new Options();
logPrefs.setLevel(logging.Type.BROWSER, logging.Level.ALL);
options.setLoggingPrefs(logPrefs);

/*
  driver.get(url)
  .then(() => driver.manage().logs().get(logging.Type.BROWSER))
  .then((logs) => {
    console.log(logs);
  })
*/

describe('A guest', () => {

  it('waits until the instructor creates the session and is her turn', () => {

    while (url == undefined) {
      browser.pause(2000)
      url = SD.url
      //browser.execute(localStorage.setItem('debug', 'kamaji-client:*'));
      //this.sessionStorage.setItem('debug', 'kamaji-client:*');

      /*
      driver.get(url)
      .then(() => driver.manage().logs().get(logging.Type.BROWSER))
      .then((logs) => {
        console.log(logs);
      })
*/
    }

    // console.warn(">>>s "+SD.join(browser.sessionId).index)
    browser.pause(10 * Math.random() * 1000)
    guest = SD.joinAsGuest(browser.sessionId)
    console.warn("GUEST "+ guest.name  + " ready to join")
    // wait before starting to work, based on the player index
    browser.pause(guest.index * SD.RAMP)
    
  })
  
  it('waits until the instructor creates the session', () => {
    browser.url(SD.url)  
    browser.pause(2000)
    browser.execute(() => localStorage.setItem('debug', 'kamaji-client:*'))
    browser.refresh()
    //const aj = $('button=Accept and join')
    //if (aj.isExisting()) { 
    //  console.debug('S> found accept and join and pressed')
    //  aj.click()
    //}
/*
    driver.executeScript(() => {
      localStorage.setItem('debug', 'kamaji-client:*')
    })
*/
    console.debug(guest.name + '> wants join')
    let loginPage = new LoginPage()
    loginPage.name.setValue(guest.name)
    browser.pause(100)
    loginPage.email.setValue(guest.email)
    loginPage.submit()
    console.debug(guest.name + '> pass join')

    console.debug(guest.name + '> wait modal')
    $('.v--modal-overlay').waitForExist({reverse:true})
    console.debug(guest.name + '> modal hides')

    console.debug(guest.name + '> waits mic')
    $('button=Mic').waitForExist()
    console.debug(guest.name + '> pass mic')

    console.warn("GUEST "+ guest.name  + " JOINED TO: " + url)

    //var log = manage().logs().get(logging.Type.BROWSER);
    //var logs = browser.getLogs('browser')
    
  })
  
  const actualTime = new Date().getTime()
  
  it ('should be able to interact A', ()=> {
    //if (guest.index%2 == 0){ SA.want_camera(guest.name) } //solo los pares
    //SA.want_camera(guest.name)
    //SA.want_video(guest.name)

    while(new Date().getTime() - actualTime < SD.DURATION) {
      if ($('button=Reload session').isExisting() == true ){
        SA.reload_guest(guest.name, guest.email)
      }
      //SA.want_mic(guest.name)

      // checks for inconsistency issues in the call
      // online members vs audio tags
      // const online  = parseInt( $('#members').getText().split('/')[0].trim() )
      // const audioTags  = $$('<audio>').length
      // expect(audioTags).toBe(online+1)

      // mic status on the menubar vs members list
      // const micMenu = $('button=Mic').$('.icon').getHTML().split('icon_24_mic_')[1].split(' ')[0]
      // const micList = $('.member_me').$('../div/i[3]').getHTML().split('icon_16_mic_')[1].split(' ')[0]
      // expect(micMenu).toBe(micList)
      
      //break
      if (new Date().getTime() - actualTime > (SD.DURATION/2)) break

      browser.pause(SD.SPEAKERINTERVAL)
      SD.saveScreenshot(guest.name+'_ping')
    }
  })

  /*it ('should be able to refresh', ()=> {
    if (guest.index < 15){
      SA.refresh_guest(guest.name, guest.email)
    }
  })*/
  
  it ('should be able to interact B', ()=> {
    //if ($('.icon_24_camera').isExisting() == true ) {SA.want_camera(guest.name)} // si la camara esta apagada
    //SA.want_video(guest.name)

    while(new Date().getTime() - actualTime < (SD.DURATION + actualTime)) {
      if ($('button=Reload session').isExisting() == true ){
        SA.reload_guest(guest.name, guest.email)
      }
      //SA.want_camera(guest.name)
      //SA.want_mic(guest.name)
      
      //break
      if ($('.icon_16_instructor_blue').isExisting() == false ) break

      browser.pause(SD.SPEAKERINTERVAL)
      SD.saveScreenshot(guest.name+'_ping')
    }
  })

  it ('should be able to leave', ()=> {
    browser.pause(SD.RAMP * guest.index)
    SA.leave_session(guest.name)
  })

})
