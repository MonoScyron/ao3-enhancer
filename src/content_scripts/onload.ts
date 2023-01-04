import { DEFAULT_VALUES, STORAGE_KEYS } from '../export/constants';
import { addKudosToHitRatios } from './crawler';

// * Executed code start
browser.storage.local.get(STORAGE_KEYS).then((value) => {
    // If no settings values are in storage, set default setting values in storage
    if(Object.keys(value).length == 0) {
        browser.storage.local.set(DEFAULT_VALUES).then(() => onloadPromise(DEFAULT_VALUES));
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
    // Add kudos to hit ratio if on
    if(value.kudosHitRatio)
        addKudosToHitRatios(document);
}