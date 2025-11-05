import { DEFAULT_VALUES, STORAGE_KEYS } from '../export/constants';
import { addKudosToHitRatios } from './ratio';
import { constructWorkList } from './works';
import { hideWorks } from './hide-works';

// * Executed code start
browser.storage.local.get(STORAGE_KEYS).then((value) => {
    // If no settings values are in storage, set default setting values in storage
    if (Object.keys(value).length == 0) {
        browser.storage.local.set(DEFAULT_VALUES).then(() => onloadPromise(DEFAULT_VALUES, document));
    }
    else
        onloadPromise(value, document);
});
// * Executed code end

// * Private functions
/**
 * Executed after all promises are fulfilled
 * @param value Local storage values of all saved settings
 * @param document Document of the current page
 */
function onloadPromise(value: { [key: string]: any }, document: Document): void {
    let works = constructWorkList(document);

    // Add kudos to hit ratio if enabled
    if (value.kudosHitRatio)
        addKudosToHitRatios(works);

    // Hide works if page not a work page
    if (document.URL.split('/')[3] != "works")
        hideWorks(works, document, value);
}