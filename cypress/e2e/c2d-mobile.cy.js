/// <reference types="cypress" />

const taggingTest = {
    LandingPage: { page_name: "bireysel:vodafone faturali olun" },

    NumaraniTaşiFaturali: { page_name: "bireysel:c2d mobile:faturali tarifeler", journey_type: "numarani tasi", page_listing_category: "faturali tarifeler" },
    NumaraniTaşiFaturaliDetay: { page_name: "bireysel:c2d mobile:faturali tarifeler:detay", journey_type: "numarani tasi", page_listing_category: "faturali tarifeler", event_name: "prodView" },
    NumaraniTaşiFaturasiz: { page_name: "bireysel:c2d mobile:faturasiz paketler", journey_type: "numarani tasi", page_listing_category: "faturasiz paketler" },
    NumaraniTaşiFaturasizDetay: { page_name: "bireysel:c2d mobile:faturasiz paketler:detay", journey_type: "numarani tasi", page_listing_category: "faturasiz paketler", event_name: "prodView" },

    YeniHatAlFaturali: { page_name: "bireysel:c2d mobile:faturali tarifeler", journey_type: "yeni hat al", page_listing_category: "faturali tarifeler" },
    YeniHatAlFaturaliDetay: { page_name: "bireysel:c2d mobile:faturali tarifeler:detay", journey_type: "yeni hat al", page_listing_category: "faturali tarifeler", event_name: "prodView" },
    YeniHatAlFaturasiz: { page_name: "bireysel:c2d mobile:faturasiz paketler", journey_type: "yeni hat al", page_listing_category: "faturasiz paketler" },
    YeniHatAlFaturasizDetay: { page_name: "bireysel:c2d mobile:faturasiz paketler:detay", journey_type: "yeni hat al", page_listing_category: "faturasiz paketler", event_name: "prodView" }
};

describe('C2D Mobile', () => {
    beforeEach(() => {
        cy.viewport('iphone-xr');
        cy.clearAllCookies();
        cy.setCookie('OptanonConsent', "isGpcEnabled=0&datestamp=Wed+Jun+14+2023+19%3A06%3A02+GMT%2B0300+(GMT%2B03%3A00)&version=202304.1.0&browserGpcFlag=0&isIABGlobal=false&hosts=&consentId=241d1f2e-899b-4786-b6cc-b40765babf80&interactionCount=1&landingPath=NotLandingPage&groups=1%3A1%2C2%3A1%2C3%3A1%2C4%3A1&geolocation=TR%3B34&AwaitingReconsent=false");
        cy.setCookie("OptanonAlertBoxClosed", "2023-06-14T16:08:32.157Z");
        cy.visit('https://www.vodafone.com.tr/numara-tasima-yeni-hat/');
        cy.wait(500);
    })
    // Landing
    it('Landing Page', () => {
        WindowLastRequestControl("LandingPage");
    });
    // Numaranı Taşı
    it('Numaranı Taşı -> Faturali Tarifeler', () => {
        cy.get('.button--primary').contains("Numaranı Taşı").click();
        WindowLastRequestControl("NumaraniTaşiFaturali");
    });
    //
    it('Numaranı Taşı -> Faturali Tarifeler -> Detay', () => {
        cy.get('.button--primary').contains("Numaranı Taşı").click();
        cy.get('.detay').first().click();
        WindowLastRequestControl("NumaraniTaşiFaturaliDetay");
    });
    //
    it('Numaranı Taşı -> Faturasız Paketler', () => {
        cy.get('.button--primary').contains("Numaranı Taşı").click();
        cy.get('.item').contains("Faturasız Paketler").click();
        WindowLastRequestControl("NumaraniTaşiFaturasiz");
    });
    //
    it('Numaranı Taşı -> Faturasız Paketler -> Detay', () => {
        cy.get('.button--primary').contains("Numaranı Taşı").click();
        cy.get('.item').contains("Faturasız Paketler").click();
        cy.get('.detay').first().click();
        WindowLastRequestControl("NumaraniTaşiFaturasizDetay");
    });
    //
    it('Numaranı Taşı -> Faturasız Paketler -> Toggle', () => {
        cy.get('.button--primary').contains("Numaranı Taşı").click();
        cy.get('.item').contains("Faturasız Paketler").click();
        cy.get('.slider').click();
        WindowLastRequestControl("YeniHatAlFaturasiz");
    });
    // Yeni Hat Al
    it('Yeni Faturali Hat Al -> Faturali Tarifeler', () => {
        cy.get('.button--primary').contains("Yeni faturalı hat al").click();
        WindowLastRequestControl("YeniHatAlFaturali");
    });
    //
    it('Yeni Faturali Hat Al -> Faturali Tarifeler -> Detay', () => {
        cy.get('.button--primary').contains("Yeni faturalı hat al").click();
        cy.get('.detay').first().click();
        WindowLastRequestControl("YeniHatAlFaturaliDetay");
    });
    //
    it('Yeni Faturali Hat Al -> Faturasız Paketler', () => {
        cy.get('.button--primary').contains("Yeni faturalı hat al").click();
        cy.get('.item').contains("Faturasız Paketler").click();
        WindowLastRequestControl("YeniHatAlFaturasiz");
    });
    //
    it('Yeni Faturali Hat Al -> Faturasız Paketler - Detay', () => {
        cy.get('.button--primary').contains("Yeni faturalı hat al").click();
        cy.get('.item').contains("Faturasız Paketler").click();
        cy.get('.detay').first().click();
        WindowLastRequestControl("YeniHatAlFaturasizDetay");
    });
    //
    it('Yeni Faturali Hat Al -> Faturasız Paketler -> Toggle', () => {
        cy.get('.button--primary').contains("Yeni faturalı hat al").click();
        cy.get('.item').contains("Faturasız Paketler").click();
        cy.get('.slider').click();
        WindowLastRequestControl("NumaraniTaşiFaturasiz");
    });
    //
    function WindowLastRequestControl(testKey) {
        cy.window().then((win) => {
            const taggingTestObject = taggingTest[testKey];
            const taggingTestKeys = Object.keys(taggingTest[testKey]);
            //
            for (let index = 0; index < taggingTestKeys.length; index++) {
                console.log("TEST-->", win.lastTealiumRequest[taggingTestKeys[index]], " = ", taggingTestObject[taggingTestKeys[index]]);
                expect(taggingTestKeys[index] + "=" + win.lastTealiumRequest[taggingTestKeys[index]]).to.eq(taggingTestKeys[index] + "=" + taggingTestObject[taggingTestKeys[index]]);
            }
        });
    };
})
