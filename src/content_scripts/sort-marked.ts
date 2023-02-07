import { WorkElement } from '../export/objects';
import { FILTER_HTML, FILTER_BTN_HTML } from '../export/constants';

// TODO: Create interface object or enum to pass in sort values
export function addSideFilter(document: Document): void {
    let markedForLaterRef = document.createElement("link");
    markedForLaterRef.setAttribute("rel", "stylesheet");
    markedForLaterRef.setAttribute("type", "text/css");
    markedForLaterRef.setAttribute("href", `${browser.runtime.getURL('../build/css/marked-for-later.css')}`);
    document.head.appendChild(markedForLaterRef);

    // TODO: Side filter should call sortMarkedForLater() on submit w/ object/enum as param to pass sort values
    let sideFilter: HTMLElement = document.createElement('div');
    sideFilter.innerHTML = FILTER_HTML;
    sideFilter = sideFilter.firstElementChild as HTMLElement;
    var par = sideFilter.querySelector("dd.autocomplete.search")!;

    let filterBtn: HTMLElement = document.createElement('div');
    filterBtn.innerHTML = FILTER_BTN_HTML;
    filterBtn = filterBtn.firstElementChild as HTMLElement;
    filterBtn.addEventListener('click', () => {
        sideFilter.classList.toggle('narrow-hidden');
        document.getElementById("outer")?.classList.toggle("filtering");
    });

    let mainElement = document.getElementById("main");
    let userNav = mainElement?.querySelector('ul.navigation.actions');
    mainElement?.insertBefore(sideFilter, mainElement.childNodes[25]);
    userNav?.insertBefore(filterBtn, userNav.childNodes[2]);

    // Fix duplicating autocomplete fields on click (this is so jank)
    (par.querySelector("#work_search_other_tag_names_autocomplete") as HTMLElement).click();
    par.firstElementChild?.setAttribute("style", "display: none");
}

function sortMarkedForLater(workParent: HTMLOListElement, works: WorkElement[]): void {
    works.sort((a: WorkElement, b: WorkElement) => {
        // TODO: Sort logic here
        return 0;
    });
    workParent.replaceChildren();
    works.forEach((w: WorkElement) => {
        if(w.element != null)
            workParent.appendChild(w.element);
    });
}