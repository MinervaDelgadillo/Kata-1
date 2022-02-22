// import SD from '../../data/shared.data.js'
import SharedData  from '../../data/shared.data.js'

describe('An student', () => {
    let instanceID
    let SD = new SharedData()

    it('find its id on the shared storage', () => {
      console.warn(">>>s "+SD.join(browser.sessionId).index)
      // console.warn(">>>r "+SD.RAMP)
      // browser.debug()

      console.warn('i am    '+browser.sessionId)
      // browser.url('https://google.com')
      
      for (let i=0; i<3; i++) {
        if (browser.sharedStore.get('d'+i)==undefined) {
          browser.sharedStore.set('d'+i, browser.sessionId)
          instanceID = i
          console.warn ('i am at '+ instanceID)
          // browser.debug()
          break
        }
      }
    })

    it('should be able to get back that Id', () => {
      console.warn('i am ' + instanceID + " have " + browser.sharedStore.get('d'+instanceID))
      for (let i=0; i<3; i++) {
        console.warn(i + " has " + browser.sharedStore.get('d'+i))
      }
    })
})