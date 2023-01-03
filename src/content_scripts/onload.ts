import { redirect, } from "../export/redirect";
import { DEFAULT_VALUES, STORAGE_KEYS, REDIRECT_URLS } from '../export/constants';
import { addKudosToHitRatios } from '../export/crawler';

// * Executed code start
console.log(`AO3Extension: Extension loaded!`);

browser.storage.local.get(STORAGE_KEYS).then((value) => {
    // If no settings values are in storage, set default setting values in storage
    if(Object.keys(value).length == 0) {
        browser.storage.local.set(DEFAULT_VALUES).then(() => onloadPromise(value));
    }
    else
        onloadPromise(value);
});
// * Executed code end

// * Functions
/**
 * Executed after all promises are fulfilled
 * @param value Local storage values of all saved settings
 */
function onloadPromise(value: { [key: string]: any }) {
    // Check if filter should be applied
    REDIRECT_URLS.forEach((url: string) => {
        if(window.location.href.match(url))
            redirect();
    });
    // Add kudos to hit ratio if on
    if(value.kudosHitRatio)
        addKudosToHitRatios(document);
}