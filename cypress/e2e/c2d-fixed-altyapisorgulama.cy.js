/// <reference types="cypress" />

describe('C2D-Fixed-AltyapiSorgulama', () => {
    before(() => {
        cy.viewport('iphone-xr');
        cy.fixture('c2dfixed-altyapisorgulama.json').then((fixtureData) => { window.taggingTest = fixtureData; });
        cy.visit('https://www.vodafone.com.tr/altyapi-sorgulama');

    });
    /* beforeEach(() => {
         cy.viewport('iphone-xr');
         cy.clearAllCookies();
         cy.setCookie('OptanonConsent', "isGpcEnabled=0&datestamp=Wed+Jun+14+2023+19%3A06%3A02+GMT%2B0300+(GMT%2B03%3A00)&version=202304.1.0&browserGpcFlag=0&isIABGlobal=false&hosts=&consentId=241d1f2e-899b-4786-b6cc-b40765babf80&interactionCount=1&landingPath=NotLandingPage&groups=1%3A1%2C2%3A1%2C3%3A1%2C4%3A1&geolocation=TR%3B34&AwaitingReconsent=false");
         cy.setCookie("OptanonAlertBoxClosed", "2023-06-14T16:08:32.157Z");
         cy.visit('https://www.vodafone.com.tr/altyapi-sorgulama');
         cy.wait(250);
     })*/


    //CookieAccept

    // Landing
    context('c2d fixed all process', () => {
        it('Landing Page', () => {
            WindowLastRequestControl("LandingPage");
            cy.get('#onetrust-accept-btn-handler').click();
            cy.wait(1000);
            cy.get('#city').click();
            cy.wait(1000);
            cy.get('.hDNQyL').contains("İSTANBUL").click();
            cy.wait(1000);
            cy.get('#district').click();
            cy.wait(1000);
            cy.get('.hDNQyL').contains("ADALAR").click();
            cy.wait(1000);
            cy.get('#neighbourhood').click();
            cy.wait(1000);
            cy.get('.hDNQyL').contains("BURGAZADA").click();
            cy.wait(1000);
            cy.get('#street').click();
            cy.wait(1000);
            cy.get('.hDNQyL').contains("AYIŞIĞI SOKAK").click();
            cy.wait(1000);
            cy.get('#building').click();
            cy.wait(1000);
            cy.get('.hDNQyL').contains("1-A BLOK").click();
            cy.wait(1000);
            cy.get('#apartment').click();
            cy.wait(1000);
            cy.get('.hDNQyL').contains("5").click();
            cy.wait(1000);
            cy.get('.fCeDEU').click();
            cy.wait(10000);
            WindowLastRequestControl("TariffListing");
            cy.get('.dqfqpG').contains("Evde 16").click();
            cy.wait(1000);
            WindowLastRequestControl("TariffSelection");
            cy.get('.fCeDEU').eq(1).click();
            cy.wait(1000);
            WindowLastRequestControl("PersonalInformation");
        });



        function WindowLastRequestControl(testKey) {
            cy.wait(1000);
            cy.window().then((win) => {
                const taggingTestObject = taggingTest[testKey];
                const taggingTestKeys = Object.keys(taggingTest[testKey]);
                //
                for (let index = 0; index < taggingTestKeys.length; index++) {
                    console.log("TEST-->", win.lastTealiumRequest[taggingTestKeys[index]], " = ", taggingTestObject[taggingTestKeys[index]]);
                    if (taggingTestObject[taggingTestKeys[index]] === "SOMEVALUE") {
                        // Pass Control
                        expect(taggingTestKeys[index] + "=" + win.lastTealiumRequest[taggingTestKeys[index]]).to.not.eq(taggingTestKeys[index] + "=undefined");
                    } else {
                        // Exact Match
                        expect(taggingTestKeys[index] + "=" + win.lastTealiumRequest[taggingTestKeys[index]]).to.eq(taggingTestKeys[index] + "=" + taggingTestObject[taggingTestKeys[index]]);
                    }
                }
            });
        };
    })
})



        /* // TariffListing
         it('Landing Page -> TariffListing', () => {
             cy.get('.fCeDEU').click();
             cy.wait(10000);
             WindowLastRequestControl("TariffListing");
         });*/

        /* // TariffSelection
         it('TariffListing  ->TariffSelection', () => {
         cy.get('.dqfqpG').click(1);
         cy.wait(1000);
         WindowLastRequestControl("TariffSelection");
         });
 
 
         // PersonalInformation
         it('TariffSelection -> PersonalInformation', () => {
         cy.get('.fCeDEU').contains("Başvur").click();
         cy.wait(1000);
         WindowLastRequestControl("PersonalInformation");
         });
             
 */





