import { WorkElement } from "../export/objects";

/**
 * Checks each work on page and hides them if necessary
 * @param works Works on page
 * @param document Document the works belong to
 */
export function hideWorks(works: WorkElement[], document: Document, settings: { [key: string]: any }) {
    works.forEach(w => {
        var reason = shouldHide(w, settings);
        if(reason != null)
            hideWork(w, reason, document);
    });
}

// * Private functions
/**
 * Checks if the given work should be hidden
 * @param work Work to check
 * @return Full reason why the work should be hidden, null if work shouldn't be hidden
 */
function shouldHide(work: WorkElement, settings: { [key: string]: any }): string | null {
    // ! When returning string, should be in form of `([Reason why work is hidden]: ${Value of reason})`
    if(!Number.isNaN(settings.hideByNumFandom) && work.fandoms.length > settings.hideByNumFandom) {
        return `(Too many fandoms: ${work.fandoms.length})`
    }

    return null;
}

/**
 * Hides a work
 * @param work Work to be hidden
 * @param reason Reason why work should be hidden (from shouldHide method)
 * @param document Document the work belongs to
 */
function hideWork(work: WorkElement, reason: string, document: Document): void {
    let workElement = work.element!;

    let cut = document.createElement('div');
    cut.className = 'cut display-on-show';
    cut.innerHTML = work.element!.innerHTML;

    let fold: HTMLElement = document.createElement("div");
    fold.innerHTML = `
    <p class="enhancer-fold">
    <span class="display-on-hide">This work is hidden.</span>
    <span class="display-on-show">This work was hidden.</span>
    <span class="reason-hidden"></span>
    <span class="actions">
        <a class="action">
            <svg class="display-on-show" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                stroke-width="1.5" stroke="currentColor" class="w-6 h-6" width="20">
                <path stroke-linecap="round" stroke-linejoin="round"
                    d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <svg class="display-on-hide" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                stroke-width="1.5" stroke="currentColor" class="w-6 h-6" width="20">
                <path stroke-linecap="round" stroke-linejoin="round"
                    d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
            </svg>
            <span class="display-on-show">Hide</span>
            <span class="display-on-hide">Unhide</span>
        </a>
    </span>
    </p>
    `;
    fold = fold.firstElementChild as HTMLElement;

    let reasonContainer = fold.querySelector('.reason-hidden')!;
    reasonContainer.innerHTML = reason;
    workElement.replaceChildren();
    workElement.classList.add('work-hidden');
    workElement.append(fold, cut);

    let actionBtn = workElement.querySelector('a.action') as HTMLElement;
    actionBtn?.addEventListener('click', () => {
        workElement.classList.toggle('work-hidden');
    });
}