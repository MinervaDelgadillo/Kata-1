const assert = require('assert');
describe('selenium testing', () => {

    it('test mic', () => {
        browser.url('https://editor.p5js.org/luistoledo/present/aZopb1qG5')
        $('#defaultCanvas0').click()
        // browser.debug()
        browser.pause(5000)
        browser.saveScreenshot('screenshot-audio.png')

        console.warn('first data:'+ browser.sharedStore.get('key') )
        browser.sharedStore.set('key', 'first')
    })

    it('test webcam', () => {
        console.warn('first data:'+ browser.sharedStore.get('key') )
        browser.url('https://p5js.org/examples/dom-video-capture.html')
        browser.debug()
        browser.pause(10000)
        browser.saveScreenshot('screenshot-webcam.png')
    })
    
})


// describe('selenium testing continuation', () => {

//   it ('test sharedstore', () => {
//     browser.url('https://editor.p5js.org/luistoledo/present/aZopb1qG5')
//     $('#defaultCanvas0').click()
//     console.warn(browser.sessionId)
//     console.warn('first data:'+ browser.sharedStore.get('key') )
//     browser.debug()
//   })

// })



// describe('Shared store service', () => {
//     it('should get from shared store', () => {
//         const caps = browser.sharedStore.get(browser.sessionId)
        
//         expect(caps.browserName).toEqual(browser.capabilities.browserName)
//     })

//     it('should allow various types of values', () => {
//         browser.sharedStore.set('boolean', true)
//         browser.sharedStore.set('number', 123)
//         browser.sharedStore.set('string', 'foobar')
//         browser.sharedStore.set('null', null)

//         expect(browser.sharedStore.get('boolean')).toEqual(true)
//         expect(browser.sharedStore.get('number')).toEqual(123)
//         expect(browser.sharedStore.get('string')).toEqual('foobar')
//         expect(browser.sharedStore.get('null')).toEqual(null)
//     })
// })

