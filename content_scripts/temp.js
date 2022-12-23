console.log("AO3Extension: Extension loaded!");

browser.browserAction.onClicked.addListener((tab) =>
    browser.tabs.create({
        url: "../options/options.html"
    })
);