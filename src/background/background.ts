import { REDIRECT_URLS, SETTINGS_CHANGED, STORAGE_KEYS } from "../export/constants";
import { getRedirectURL } from "./redirect";

// * Global variables
let settings: { [x: string]: any; };

// * Executed code start
// Set settings to be currently stored settings
browser.storage.local.get(STORAGE_KEYS).then((value) => {
    settings = value;
});
// * Executed code end

// * Listeners
// Open option menu on browser action icon click
browser.browserAction.onClicked.addListener(openOptionMenu);

// Redirect URLs to filter works
browser.webRequest.onBeforeRequest.addListener(
    redirect,
    {
        urls: REDIRECT_URLS,
        types: ['main_frame']
    },
    ['blocking']
);

// Synch settings on settings change
browser.runtime.onMessage.addListener((message: string) => {
    if (message == SETTINGS_CHANGED) {
        // Get settings from storage
        browser.storage.local.get(STORAGE_KEYS).then((value) => {
            settings = value;
        });
    }
});

// * Private functions
/**
 * Redirects url to filter excluded works
 * @param details Web request details
 * @returns Web request BlockingResponse object
 */
function redirect(details: browser.webRequest._OnBeforeRequestDetails): browser.webRequest.BlockingResponse {
    // console.log(`AO3Extension: details.url=${details.url}`); // DEBUGGING
    let url = getRedirectURL(details.url, settings);
    // console.log(`AO3Extension: url=${url}`); // DEBUGGING
    if (url != null)
        return {
            redirectUrl: url
        };
    else
        return {};
}

/**
 * Opens option menu for extension
 */
function openOptionMenu() {
    browser.tabs.create({
        url: "/build/options/options.html"
    });
}
