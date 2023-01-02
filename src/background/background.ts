// Open option menu on browser action icon click
browser.browserAction.onClicked.addListener(openOptionMenu);

function openOptionMenu() {
    console.log("AO3Extension: Open option menu...");
    browser.tabs.create({
        url: "/src/options/options.html"
    });
}
