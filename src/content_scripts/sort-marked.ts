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
    let filterNode: HTMLElement = document.createElement('div');
    filterNode.innerHTML = FILTER_HTML;
    filterNode = filterNode.firstElementChild as HTMLElement;

    let filterBtn: HTMLElement = document.createElement('div');
    filterBtn.innerHTML = FILTER_BTN_HTML;
    filterBtn = filterBtn.firstElementChild as HTMLElement;
    filterBtn.addEventListener('click', () => {
        filterNode.classList.toggle('narrow-hidden');
        document.getElementById("outer")?.classList.toggle("filtering");
    });

    let mainElement = document.getElementById("main");
    let userNav = mainElement?.querySelector('ul.navigation.actions');
    mainElement?.insertBefore(filterNode, mainElement.childNodes[25]);
    userNav?.insertBefore(filterBtn, userNav.childNodes[2]);
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