
import { WARNING, WorkElement, CATEGORY, categoryToEnum, ratingToEnum, warningToEnum } from '../export/constants';

/**
 * Get list of works from page as an array of WorkElement objects
 * @param document Document of AO3 page
 * @returns Array of works from page as WorkElement objects
 */
export function constructWorkList(document: Document): WorkElement[] {
    let rawWorks = constructRawWorkList(document);
    let workList: WorkElement[] = [];
    for(var i = 0; i < rawWorks.length; i++) {
        workList.push(constuctWorkElement(rawWorks[i] as HTMLElement));
    }
    return workList;
}

/**
 * Takes a raw work element and parses it into a WorkElement object
 * @param work Raw work element
 * @returns WorkElement object
 */
function constuctWorkElement(work: HTMLElement): WorkElement {
    let ret: WorkElement;

    // Author list
    let aList: string[] = [];
    work.querySelectorAll("a[rel='author']").forEach((e) => {
        aList.push(e.innerHTML);
    });
    // Gift list
    let gList: string[] | null = [];
    work.querySelectorAll("a[href$='/gifts']").forEach((e) => {
        gList?.push(e.innerHTML);
    });
    if(gList.length == 0)
        gList = null;
    // Fandom list
    let fList: string[] = [];
    work.querySelector('.fandoms')?.querySelectorAll('.tag').forEach((e) => {
        fList.push(e.innerHTML);
    });

    let tags = work.querySelector('.tags')!;

    // Warning list
    let wList: WARNING[] = [];
    tags.querySelectorAll('.warnings').forEach((e) => {
        wList.push(warningToEnum(e.querySelector('.tag')!.innerHTML));
    });
    // Tag list
    let tList: string[] | null = [];
    tags.querySelectorAll('li:not(.warnings)').forEach((e) => {
        tList!.push(e.querySelector('.tag')!.innerHTML);
    });
    if(tList.length == 0)
        tList = null;

    // Series list
    let sList: string[] | null = [];
    work.querySelector('.series')?.querySelectorAll('a').forEach((e) => {
        sList!.push(e.innerHTML);
    });
    if(sList.length == 0)
        sList = null;

    let stats = work.querySelector('.stats')!;
    // Chapters
    let chapters = (stats.querySelector('dd.chapters') as HTMLElement).innerText.split('/');

    // Categories list
    let cList: CATEGORY[] | null = [];
    work.querySelector('span.category')?.getAttribute('title')?.split(', ').forEach(e => {
        cList!.push(categoryToEnum(e));
    });
    if(cList.length == 0)
        cList = null;

    ret = {
        href: work.querySelector(".heading")?.firstElementChild?.getAttribute("href")!,
        title: work.querySelector(".heading")?.firstElementChild?.innerHTML!,
        authors: aList,
        recipients: gList,
        fandoms: fList,
        tags: {
            warnings: wList,
            tags: tList
        },
        summary: (work.querySelector('.summary')! as HTMLElement).innerText,
        series: sList,
        updateDate: work.querySelector('p.datetime')?.innerHTML!,
        rating: ratingToEnum(work.querySelector('span.rating')?.getAttribute('title')!),
        categories: cList,
        complete: work.querySelector('span.iswip')?.getAttribute('title') == 'Complete Work',
        stats: {
            language: stats.querySelector('dd.language')?.innerHTML!,
            wordCount: parseInt(stats.querySelector('dd.words')?.innerHTML!),
            chapterCount: parseInt(chapters[0]),
            finalChapterCount: chapters[1] == '?' ? null : parseInt(chapters[1]),
            collections: stats.querySelector('dd.collections') == null ? 0
                : parseInt((stats.querySelector('dd.collections') as HTMLElement).innerText),
            comments: stats.querySelector('dd.comments') == null ? 0
                : parseInt((stats.querySelector('dd.comments') as HTMLElement).innerText),
            kudos: stats.querySelector('dd.kudos') == null ? 0
                : parseInt((stats.querySelector('dd.kudos') as HTMLElement).innerText),
            bookmarks: stats.querySelector('dd.bookmarks') == null ? 0
                : parseInt((stats.querySelector('dd.bookmarks') as HTMLElement).innerText),
            hits: parseInt(stats.querySelector('dd.hits')?.innerHTML!)
        }
    }
    return ret;
}

/**
 * Get list of works from page as an HTMLCollection
 * @param document Document of AO3 page
 * @returns List of works from page
 */
function constructRawWorkList(document: Document): HTMLCollectionOf<Element> {
    let type = document.querySelector('.group')?.classList[0];
    if(document.URL.split('/')[3] == "works") {
        return document.getElementsByClassName("work meta group"); // meta
    }
    else if(type == "bookmark" || type == "work") {
        return document.getElementsByClassName(type + " blurb group");
    }
    else {
        return document.getElementsByClassName("work blurb group");
    }
}