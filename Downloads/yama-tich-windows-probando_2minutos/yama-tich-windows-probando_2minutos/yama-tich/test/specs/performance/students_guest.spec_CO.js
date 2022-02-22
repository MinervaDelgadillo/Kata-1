import LoginPage from "../../pageobjects/loginguest.page.js";
import SharedData from "../../data/shared.data.js";
import SharedActions from "../../pageactions/shared.actions.js";

let SD = new SharedData();
let SA = new SharedActions();
let guest;
let url;

describe("A guest", () => {
    //jasmine.DEFAULT_TIMEOUT_INTERVAL=10000000
    it("should be able to join", () => {
        // Start the browser in standby for user to join
        SD.initTestID()
        browser.pause(10 * Math.random() * 1000);
        // via static string preset
        guest = SD.joinAsGuest(browser.sessionId);
        console.warn("GUEST " + guest.name + " ready to join");
        //browser.throttle("Regular3G");

        // wait before starting to work, based on the player index
        browser.pause(guest.index * SD.RAMP);

        // Start User join session
        browser.url(SD.url);
        browser.pause(2000);
        browser.execute(() => localStorage.setItem("debug", "kamaji-client:*"));
        browser.refresh();
        console.debug(`${guest.name} > wants join with ${guest.network_conditions.download} Mbps`);
        let loginPage = new LoginPage();
        loginPage.name.setValue(guest.name);
        browser.pause(100);
        loginPage.email.setValue(guest.email);
        loginPage.submit();
       
        console.debug(guest.name + "> pass join");
        
        guest.index === 1  ?browser.pause(null) :  browser.pause((2*guest.index*60*1000)-120*1000 )
        SA.want_mic(guest.name); //enciende microfono
        SA.want_camera(guest.name); //transmite camara
        browser.pause(1*110*1000)
        SA.want_mic(guest.name); //apaga microfono
        SA.want_camera(guest.name); //apaga camara

        

       
    });

    const actualTime = new Date().getTime();

    it("ping session status", () => {
        // Revision de estatus de la sesion
        while (new Date().getTime() - actualTime < SD.DURATION) {
            if (new Date().getTime() - actualTime > SD.DURATION) {
                break;
            } //interrupcion por fin de duracion de la sesion
            else if ($("button=Reload session").isExisting() == false) {
                //validacion de popup de relogin
                console.debug(guest.name + " " + actualTime + " online");
                browser.pause(1 * 60 * 1000); //esta pausa ayuda a espaciar las consultas de la sesion, libera uso de procesador y generacion de logs.
               
            } else if ($("button=Reload session").isExisting() == true) {
                //validacion de popup de relogin
                SD.saveScreenshot(guest.name + "_reload"); // captura de pagina de relogin
                SA.reload_guest(guest.name, guest.email); //relogin de la cuenta
            } else {
                SD.saveScreenshot(guest.name + "_ping_warn"); // captura de pagina de relogin
            }
        }
    });

    it("should be able to leave", () => {
        SD.saveScreenshot(guest.name + "_leave"); //captura del fin de sesion
        SA.leave_session(guest.name); //accion de finalizar sesion
    });
});
