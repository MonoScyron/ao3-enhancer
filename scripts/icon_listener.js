browser.Action.onClicked.addListener(function(tab) {
    browser.tabs.create({
        url: browser.runtime.getURL("/menu/menu.html")
    });
});