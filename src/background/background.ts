// Open option menu on browser action icon click
browser.browserAction.onClicked.addListener(() =>
    browser.tabs.create({
        url: "../options/options.html"
    })
);