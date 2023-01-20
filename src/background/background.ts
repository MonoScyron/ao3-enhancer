import { INSERT_MARKED_CSS, REDIRECT_URLS, SETTINGS_CHANGED, STORAGE_KEYS } from "../export/constants";
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

// * Runtime onMessage communication
browser.runtime.onMessage.addListener((message: string) => {
    // Synch settings on settings change
    if(message == SETTINGS_CHANGED) {
        // Get settings from storage
        browser.storage.local.get(STORAGE_KEYS).then((value) => {
            settings = value;
        });
    }
    // Insert css for marked for later page
    else if(message == INSERT_MARKED_CSS) {
        browser.tabs.query({
            url: "https://archiveofourown.org/users/*/readings?show=to-read"
        }).then((tabs) => {
            tabs.forEach(t => {
                // TODO: Fix this insert CSS (Issue is injection of files specifically, injecting CSS rules directly works fine)
                browser.scripting.insertCSS({
                    target: {
                        tabId: t.id!
                    },
                    files: ["../css/marked-for-later.css"]
                }).catch((e) => console.log(e))
            });
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
    if(url != null)
        return {
            redirectUrl: url
        };
    else
        return {};
}

/**
 * Opens option menu for extension
 */
function openOptionMenu(): void {
    browser.tabs.create({
        url: "/build/options/options.html"
    });
}
