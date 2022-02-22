import Status from '../../pageobjects/status.page.js'
import LoginPage from '../../pageobjects/login2.page.js'
import SharedData from '../../data/shared.data.js'
import SharedActions from '../../pageactions/shared.actions.js'

let SD = new SharedData()
let SA = new SharedActions()
let director

describe('An instructor', () => {
  //console.log(browser.capabilities)
  it('should be able to login', () => {
    SD.initTestID()
    director = SD.joinAsDirector(browser.sessionId)

    let loginPage = new LoginPage()
    loginPage.open()
    loginPage.email.setValue(director.email)
    loginPage.password.setValue(director.password)
    loginPage.submit()

    //$('.toast_success').waitForExist()
    //$('.toast_success').waitForExist({reverse:true})

    $('div.user__badge.container__flex').waitForExist()
  })


  it('should be able to create a course', ()=>{
    const name = new Date().toLocaleString()

    $('.create_course').click()
    let inputName = $('.input')
    inputName.addValue(name)
    $('button=Create').click()

    $('h3=New course details').waitForExist()

    console.warn('INSTRUCTOR CREATE A COURSE NAMED: '+ name)
  })

  it ('should be able to create a quick session', ()=>{
    const currentWindow = browser.getWindowHandles()[0]

    $('*=Go to course').click()
    browser.pause(5000)

    $('button=Quick session').click()
    browser.pause(2000)
    $('button=Quick session').waitForExist()

    const newWindow = browser.getWindowHandles()[1]
    browser.switchToWindow(newWindow)
    
    SD.url = browser.getUrl()
    console.warn("INSTRUCTOR CREATES A SESSION AT: "+SD.url)

    // console.debug('I> want accept and join')
    // const aj = $('button=Accept and join')
    // if (aj.isExisting()) aj.click()
    // console.debug('I> pass join')

    SA.want_join(director.name)

    console.debug('I> want done')
    $('button=Done').click()
    console.debug('I> pass done')

    console.debug('I> wait modal')
    $('.v--modal-overlay').waitForExist({reverse:true})
    console.debug('I> modal hides')

    SA.want_video(director.name)

    SA.want_camera(director.name)

    //SA.want_screen(director.name)

//    browser.saveScreenshot(driver.config.screenShotPath+'instructor-proof.png')
    SD.saveScreenshot('instructor-proof')
  })

  it ('should be able to interact', ()=> {
    const actualTime = new Date().getTime()

    while(new Date().getTime() - actualTime < SD.DURATION) {
      if ($('button=Reload session').isExisting() == true ){
        SA.reload_user(director.name)
      }
      SA.want_mic(director.name)
      browser.pause(SD.SPEAKERINTERVAL)
      //browser.pause(SD.ACTIONINTERVAL)

      SD.saveScreenshot('Instructor_ping')
    }

    SA.leave_session(director.name)
  })

})
