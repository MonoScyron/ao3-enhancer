// Open option menu on browser action icon click
browser.browserAction.onClicked.addListener(openOptionMenu);

function openOptionMenu() {
    browser.tabs.create({
        url: "/src/options/options.html"
    });
}