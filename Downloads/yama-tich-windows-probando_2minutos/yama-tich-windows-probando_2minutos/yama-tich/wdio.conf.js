const STUDENTS    = 0
const INSTRUCTORS = 0
const GUESTS 	  = 4
const DURATION    = 10*60*1000
const RAMP        = 1000 // time between each student should join (milliseconds)
const SPEAKERINTERVAL = 1*30*1000
const BASEURL     = 'https://qa.tich.academy'
const FIXEDURL    = 'https://qa.tich.academy/denso/a4114b7e-0c72-46e5-ab22-360ad8811ee6'
const INTERVAL_MIC = 2*60*100

//null //'https://app.tich.academy/denso/f482e29e-ee8f-4e73-add8-b669e595237e' // null or url

const DEBUG       = true //unused now
//const SELENIUMSERVER = 'localhost'

const SELENIUMSERVER   = '143.244.160.107'
//const SELENIUMSERVER = '192.168.87.13'
const SELENIUMPORT   = 4445
const USESELENIUM    = true
const SCREENSHOTPATH = 'screenshots/'
//const BROWSER_TIMEOUT = 120000
const CHROMEDRIVEARGS = {logFileName: 'wdio-chromedriver.log', outputDir: 'driver-logs', args: ['--verbose']}

const BW_GUEST = [{id:1, quality:"Random"}, {id:2, quality:"Bad"}]

exports.config = {
    maxInstances: STUDENTS + GUESTS + INSTRUCTORS,
    duration: DURATION,
    ramp: RAMP,
    speakerinterval: SPEAKERINTERVAL,
    fixedUrl: FIXEDURL,
    debug: DEBUG,
    screenShotPath: SCREENSHOTPATH,
    baseUrl: BASEURL,
    waitforTimeout: 360000,
    connectionRetryTimeout: 120000,
    connectionRetryCount: 3,
    bail: 0,
    bwGuest: BW_GUEST,
    interval_mic:INTERVAL_MIC,

    // Level of logging verbosity: trace | debug | info | warn | error | silent
    logLevel: 'debug',
    outputDir: 'logs',

    // selenium grid
    runner: 'local',
    hostname: SELENIUMSERVER,
    port: SELENIUMPORT,
    path: '/wd/hub',
    //services: USESELENIUM ? [['chromedriver', CHROMEDRIVEARGS],'shared-store'] :  ['chromedriver', 'shared-store'],
    services: USESELENIUM ? ['shared-store'] :  ['chromedriver', 'shared-store'],
    
    specs: [
        './test/specs/performance/*.js'
    ],
    exclude: [  ],

    featureFlags: {
        specFiltering: true
    },

    capabilities: [

      {
        maxInstances: INSTRUCTORS,
        browserName: 'chrome',
        'goog:chromeOptions': { 
          args: [
            //'headless','no-sandbox','disable-gpu','use-fake-device-for-media-stream', 'disable-infobars', 'disable-popup-blocking', 'disable-notifications'
          (USESELENIUM ? '--headless':'--incognito'),
          //'--incognito',
          '--no-sandbox',
          '--disable-gpu',
          //'--enable-media-stream', 
          //'--enable-usermedia-screen-capturing',
          //'--auto-select-desktop-capture-source=fake',
          '--use-fake-ui-for-media-stream',
          '--use-fake-device-for-media-stream',
          //'--use-file-for-fake-video-capture=mock_media/luis.mjpeg',
         //'--use-file-for-fake-audio-capture=mock_media/La_Cucaracha.wav',
         '--window-size=1280,800',
        ]},
        //specs: ['./test/specs/performance/instructor.spec.js' ]
        get specs() {
          let s = []
          const testspec = './test/specs/performance/instructor.spec.js'
          while(s.length<INSTRUCTORS){ s.push(testspec) }
          return s
        }
      },
      {
        maxInstances: STUDENTS,
        browserName: 'chrome',
        'goog:chromeOptions': { 
          args: [
          (USESELENIUM ? '--headless':'--incognito'),
          '--no-sandbox',
          '--disable-gpu',
          '--use-fake-ui-for-media-stream',
          '--use-fake-device-for-media-stream',
          //'--use-file-for-fake-video-capture=mock_media/luis.y4m',
          //'--use-file-for-fake-audio-capture=mock_media/La_Cucaracha.wav',
          '--window-size=1280,800',
          //'--use-first-display-as-internal'
        ]},
        get specs() {
          let s = []
          const testspec = './test/specs/performance/students.spec.js'
          while(s.length<STUDENTS){ s.push(testspec) }
          return s
        }
      },

      {
        maxInstances: GUESTS,
        browserName: 'chrome',
        'goog:chromeOptions': { 
          args: [
          (USESELENIUM ? 'headless':'incognito'),
          'no-sandbox',
          'disable-gpu',
          'use-fake-ui-for-media-stream',
          'use-fake-device-for-media-stream',
          '--use-file-for-fake-video-capture=/root/tich-nodo/mock_media/Adrian_HD.mjpeg',
          '--use-file-for-fake-audio-capture=/root/tich-nodo/mock_media/impala.wav',
          
          'window-size=1280,800',
          //'--start-maximized',
        ]},
        "goog:loggingPrefs": {   // <-- Add this
          browser: "ALL",},
        get specs() {
          let s = []
          const testspec = './test/specs/performance/students_guest.spec_CO.js'
          while(s.length<GUESTS){ s.push(testspec) }
          return s
        }
      }
    ],

    reporters: ['spec'],

    framework: 'jasmine',
    jasmineOpts: {
        defaultTimeoutInterval: DURATION + 3600000,
        //
        // The Jasmine framework allows interception of each assertion in order to log the state of the application
        // or website depending on the result. For example, it is pretty handy to take a screenshot every time
        // an assertion fails.
        helpers: [require.resolve('@babel/register')],
        
        expectationResultHandler: function(passed, assertion) {
            // do something
        }
    },
      
    // ===================
    // Test Configurations
    // ===================
    //
    // Set specific log levels per logger
    // loggers:
    // - webdriver, webdriverio
    // - @wdio/applitools-service, @wdio/browserstack-service, @wdio/devtools-service, @wdio/sauce-service
    // - @wdio/mocha-framework, @wdio/jasmine-framework
    // - @wdio/local-runner, @wdio/lambda-runner
    // - @wdio/sumologic-reporter
    // - @wdio/cli, @wdio/config, @wdio/sync, @wdio/utils
    // Level of logging verbosity: trace | debug | info | warn | error | silent
    // logLevels: {
    //     webdriver: 'info',
    //     '@wdio/applitools-service': 'info'
    // },
    //
    // If you only want to run your tests until a specific amount of tests have failed use
    // bail (default is 0 - don't bail, run all tests).
    //
    // Test runner services
    // Services take over a specific job you don't want to take care of. They enhance
    // your test setup with almost no effort. Unlike plugins, they don't add new
    // commands. Instead, they hook themselves up into the test process.
        
    // Framework you want to run your specs with.
    // The following are supported: Mocha, Jasmine, and Cucumber
    // see also: https://webdriver.io/docs/frameworks.html
    //
    // Make sure you have the wdio adapter package for the specific framework installed
    // before running any tests.


    //
    // The number of times to retry the entire specfile when it fails as a whole
    // specFileRetries: 1,
    //
    // Whether or not retried specfiles should be retried immediately or deferred to the end of the queue
    // specFileRetriesDeferred: false,
    //
    // Test reporter for stdout.
    // The only one supported by default is 'dot'
    // see also: https://webdriver.io/docs/dot-reporter.html
    
    //
    // =====
    // Hooks
    // =====
    // WebdriverIO provides several hooks you can use to interfere with the test process in order to enhance
    // it and to build services around it. You can either apply a single function or an array of
    // methods to it. If one of them returns with a promise, WebdriverIO will wait until that promise got
    // resolved to continue.
    /**
     * Gets executed once before all workers get launched.
     * @param {Object} config wdio configuration object
     * @param {Array.<Object>} capabilities list of capabilities details
     */
    // onPrepare: function (config, capabilities) {
    // },
    /**
     * Gets executed before a worker process is spawned and can be used to initialise specific service
     * for that worker as well as modify runtime environments in an async fashion.
     * @param  {String} cid      capability id (e.g 0-0)
     * @param  {[type]} caps     object containing capabilities for session that will be spawn in the worker
     * @param  {[type]} specs    specs to be run in the worker process
     * @param  {[type]} args     object that will be merged with the main configuration once worker is initialised
     * @param  {[type]} execArgv list of string arguments passed to the worker process
     */
    // onWorkerStart: function (cid, caps, specs, args, execArgv) {
    // },
    /**
     * Gets executed just before initialising the webdriver session and test framework. It allows you
     * to manipulate configurations depending on the capability or spec.
     * @param {Object} config wdio configuration object
     * @param {Array.<Object>} capabilities list of capabilities details
     * @param {Array.<String>} specs List of spec file paths that are to be run
     */
    // beforeSession: function (config, capabilities, specs) {
    // },
    /**
     * Gets executed before test execution begins. At this point you can access to all global
     * variables like `browser`. It is the perfect place to define custom commands.
     * @param {Array.<Object>} capabilities list of capabilities details
     * @param {Array.<String>} specs List of spec file paths that are to be run
     */
    // before: function (capabilities, specs) {
    // },
    /**
     * Runs before a WebdriverIO command gets executed.
     * @param {String} commandName hook command name
     * @param {Array} args arguments that command would receive
     */
    // beforeCommand: function (commandName, args) {
    // },
    /**
     * Hook that gets executed before the suite starts
     * @param {Object} suite suite details
     */
    // beforeSuite: function (suite) {
    // },
    /**
     * Function to be executed before a test (in Mocha/Jasmine) starts.
     */
    // beforeTest: function (test, context) {
    // },
    /**
     * Hook that gets executed _before_ a hook within the suite starts (e.g. runs before calling
     * beforeEach in Mocha)
     */
    // beforeHook: function (test, context) {
    // },
    /**
     * Hook that gets executed _after_ a hook within the suite starts (e.g. runs after calling
     * afterEach in Mocha)
     */
    afterHook: function (test, context, { error, result, duration, passed, retries }) {
      const filename = new Date().toJSON().replace(/:/g, '-') + '--' + Math.random().toString().substring(2,5)
      const filepath = SCREENSHOTPATH + filename + '.png'
      if (error){  
        browser.saveScreenshot(filepath)
        console.warn("Taking a screenshot at: " + filepath + " because: " + error + " on: " + context)
        return
      }  
    },
    /**
     * Function to be executed after a test (in Mocha/Jasmine).
     */
    afterTest: function(test, context, { error, result, duration, passed, retries }) {
      const filename = new Date().toJSON().replace(/:/g, '-') + '--' + Math.random().toString().substring(2,5)
      const filepath = SCREENSHOTPATH + filename + '.png'

      if (passed) {
        return
      }
      if (error){  
        browser.saveScreenshot(filepath)
        console.warn("Taking a screenshot at: " + filepath + " because: " + error + " on: " + context)
        return
      }

      browser.saveScreenshot(filepath)
      console.warn("Taking a screenshot at: " + filepath + " because: " + error + " on: " + context)
    },

    /**
     * Hook that gets executed after the suite has ended
     * @param {Object} suite suite details
     */
    afterSuite: function (suite) {

    },
    /**
     * Runs after a WebdriverIO command gets executed
     * @param {String} commandName hook command name
     * @param {Array} args arguments that command would receive
     * @param {Number} result 0 - command success, 1 - command error
     * @param {Object} error error object if any
     */
    // afterCommand: function (commandName, args, result, error) {
    // },
    /**
     * Gets executed after all tests are done. You still have access to all global variables from
     * the test.
     * @param {Number} result 0 - test pass, 1 - test fail
     * @param {Array.<Object>} capabilities list of capabilities details
     * @param {Array.<String>} specs List of spec file paths that ran
     */
    // after: function (result, capabilities, specs) {
    // },
    /**
     * Gets executed right after terminating the webdriver session.
     * @param {Object} config wdio configuration object
     * @param {Array.<Object>} capabilities list of capabilities details
     * @param {Array.<String>} specs List of spec file paths that ran
     */
    // afterSession: function (config, capabilities, specs) {
    // },
    /**
     * Gets executed after all workers got shut down and the process is about to exit. An error
     * thrown in the onComplete hook will result in the test run failing.
     * @param {Object} exitCode 0 - success, 1 - fail
     * @param {Object} config wdio configuration object
     * @param {Array.<Object>} capabilities list of capabilities details
     * @param {<Object>} results object containing test results
     */
    // onComplete: function(exitCode, config, capabilities, results) {
    // },
    /**
    * Gets executed when a refresh happens.
    * @param {String} oldSessionId session ID of the old session
    * @param {String} newSessionId session ID of the new session
    */
    //onReload: function(oldSessionId, newSessionId) {
    //}
}
