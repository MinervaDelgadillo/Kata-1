import LoginPage from '../../pageobjects/login.page.js'
import SharedData from '../../data/shared.data.js'
import { Browser, Builder, Capabilities, logging } from 'selenium-webdriver'

let SD = new SharedData()
let player
let url

describe('A student', () => {

  it('waits until the instructor creates the session and is her turn', () => {
    
    while (url == undefined || url == driver.config.fixedUrl) {
      browser.pause(2000)
      url = SD.url
    }

    // console.warn(">>>s "+SD.join(browser.sessionId).index)
    browser.pause(10 * Math.random() * 1000)
    player = SD.join(browser.sessionId)
    console.warn("STUDENT "+ player.name  + " ready to join")
    
    // wait before starting to work, based on the player index
    browser.pause(player.index * SD.RAMP)
  })
  
  it('should be able to login', () => {
    let loginPage = new LoginPage()
    loginPage.open()
    loginPage.email.setValue(player.email)
    browser.pause(100)
    loginPage.password.setValue(player.password)
    loginPage.submit()


    //$('.toast_success').waitForExist()
    //$('.toast_success').waitForExist({reverse:true})

    $('div.user__badge.container__flex').waitForExist()
  })  
  
  it('waits until the instructor creates the session', () => {
    browser.url(SD.url)
    browser.pause(2000)

    const aj = $('button=Accept and join')
    if (aj.isExisting()) { 
      console.debug('S> found accept and join and pressed')
      aj.click()
    }

    console.debug('S> wants join')
    $('button=Join').click()
    console.debug('S> pass join')

    console.debug('S> wait modal')
    $('.v--modal-overlay').waitForExist({reverse:true})
    console.debug('S> modal hides')

    console.debug('S> wants mic')
    $('button=Mic').waitForExist()
    console.debug('S> pass mic')

    console.warn("STUDENT "+ player.name  + " JOINED TO: " + url)
  })
  
  it ('should be able to interact', ()=> {
    // if (player.index==1) { browser.debug() }

    console.debug('S> want camera')
    $('button=Camera').click()
    console.debug('S> pass camera')

    console.debug('S> want video')
    $('button=Video').click()
    console.debug('S> pass video')

    const actualTime = new Date().getTime()

    while(new Date().getTime() - actualTime < SD.DURATION) {
      $('button=Mic').click()

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
      if ($('.icon_16_instructor_blue')==undefined) break

      browser.pause(SD.SPEAKERINTERVAL)
      SD.saveScreenshot(player.name+'_ping')
    }

    browser.pause(SD.RAMP * player.index)
    $('button=Hang up').click()
    $('button=Leave session').click()
  })
  
})
