// import SD from '../../data/shared.data.js'
import SharedData  from '../../data/shared.data.js'
let SD = new SharedData()

describe('An student', () => {

    it('find its id on the shared storage', () => {
      let myself = SD.join(browser.sessionId)
      console.warn("i am " + myself)
    })

    it('find its id back', () => {
      console.warn("i am "+SD.getPlayer(browser.sessionId).index)
    })

    it('should be able to track all players', () => {
        console.warn(SD.getPlayerList())
    })
})