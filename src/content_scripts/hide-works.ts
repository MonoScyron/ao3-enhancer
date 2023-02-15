import { WorkElement } from "../export/objects";

/**
 * Checks each work on page and hides them if necessary
 * @param works Works on page
 * @param document Document the works belong to
 * @param settings Settings of extension
 */
export function hideWorks(works: WorkElement[], document: Document, settings: { [key: string]: any }) {
    let parser = new DOMParser();
    works.forEach(w => {
        let reason = shouldHide(w, settings);
        if(reason != null)
            hideWork(w, reason, document, parser);
    });
}

// * Private functions
/**
 * Checks if the given work should be hidden
 * @param work Work to check
 * @param settings Settings of extension
 * @return Full reason why the work should be hidden, null if work shouldn't be hidden
 */
function shouldHide(work: WorkElement, settings: { [key: string]: any }): string | null {
    // ! When returning string, should be in form of `([Reason why work is hidden]: ${Value of reason})`

    // Hide by num fandoms
    if(!Number.isNaN(settings.hideByNumFandom) && work.fandoms.length > settings.hideByNumFandom) {
        return `(Too many fandoms: ${work.fandoms.length})`
    }
    // Hide by ratio
    else if(work.hits == 0) {
        return `(Ratio too small: 0 hits)`
    }
    else if(work.kudos == 0 || work.kudos / work.hits < settings.hideByRatio / 100.0) {
        return `(Ratio too small: ${Math.round((work.kudos / work.hits) * 1000) / 10}%)`
    }
    return null;
}

/**
 * Hides a work
 * @param work Work to be hidden
 * @param reason Reason why work should be hidden (from shouldHide method)
 * @param document Document the work belongs to
 * @param parser DOMParser to safely parse the work HTML
 */
function hideWork(work: WorkElement, reason: string, document: Document, parser: DOMParser): void {
    let workElement = work.element!;

    let cut = document.createElement('div');
    cut.className = 'cut display-on-show';
    let workNodes = parser.parseFromString(work.element!.innerHTML, 'text/html').body.childNodes;
    workNodes.forEach(element => {
        cut.append(element);
    });

    let fold: HTMLElement = document.createElement("div");
    fold.innerHTML = `
    <p class="enhancer-fold">
    <span class="display-on-hide">Work is hidden.</span>
    <span class="display-on-show">Work was hidden.</span>
    <span class="reason-hidden"></span>
    <span class="actions">
        <a class="action">
            <span class="display-on-show">Hide</span>
            <span class="display-on-hide">Unhide</span>
        </a>
    </span>
    </p>
    `;
    fold = fold.firstElementChild as HTMLElement;

    let reasonContainer = fold.querySelector('.reason-hidden') as HTMLElement;
    reasonContainer.innerText = reason;
    workElement.replaceChildren();
    workElement.classList.add('work-hidden');
    workElement.append(fold, cut);

    let actionBtn = workElement.querySelector('a.action') as HTMLElement;
    actionBtn?.addEventListener('click', () => {
        workElement.classList.toggle('work-hidden');
    });
}