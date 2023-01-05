
import { WARNING, WorkElement, CATEGORY, categoryToEnum, ratingToEnum, warningToEnum } from '../export/constants';

/**
 * Get list of works from page as an array of WorkElement objects
 * @param document Document of AO3 page
 * @returns Array of works from page as WorkElement objects
 */
export function constructWorkList(document: Document): WorkElement[] {
    let workList: WorkElement[] = [];
    if(document.URL.split('/')[3] == "works") {
        workList = [constructWorkElementMeta(document)]
    }
    else {
        let rawWorks = constructRawWorkList(document);
        for(var i = 0; i < rawWorks.length; i++) {
            workList.push(constuctWorkElement(rawWorks[i]));
        }
    }
    return workList;
}

/**
 * Get the current work's meta as an HTMLElement
 * @param document Document of AO3 work page
 * @returns Current work
 */
function constructWorkElementMeta(document: Document): WorkElement {
    let ret: WorkElement;
    let workMeta = document.querySelector(".work.meta.group")!;
    let preface = document.querySelector(".preface.group")!;

    // Author list
    let aList: string[] = [];
    preface.querySelectorAll("a[rel='author']").forEach((e) => {
        aList.push(e.innerHTML);
    });
    // Gift list
    let gList: string[] | null = [];
    preface.querySelectorAll("a[href$='/gifts']").forEach((e) => {
        gList?.push(e.innerHTML);
    });
    if(gList.length == 0)
        gList = null;
    // Fandom list
    let fList: string[] = [];
    workMeta.querySelector('dd.fandom')?.querySelectorAll('.tag').forEach((e) => {
        fList.push(e.innerHTML);
    });

    // Tag list
    let tList: string[] = [];
    workMeta.querySelectorAll('dd.relationship.tags, dd.character.tags, dd.freeform.tags')!.forEach((e) => {
        (e as HTMLElement).innerText.split(', ').forEach((t) => tList.push(t));
    });
    // Warning list
    let wList: WARNING[] = [];
    workMeta.querySelectorAll('dd.warning').forEach((e) => {
        wList.push(warningToEnum(e.querySelector('.tag')!.innerHTML));
    });

    // Series list
    let sList: string[] | null = [];
    workMeta.querySelector('dd.series')?.querySelectorAll('.position a').forEach((e) => {
        sList!.push(e.innerHTML);
    });
    if(sList.length == 0)
        sList = null;

    let stats = workMeta.querySelector('dd.stats')!;
    // Chapters
    let chapters = (stats.querySelector('dd.chapters') as HTMLElement).innerText.split('/');

    // Categories list
    let cList: CATEGORY[] | null = [];
    workMeta.querySelectorAll('dd.category .tag').forEach(e => {
        cList!.push(categoryToEnum(e.innerHTML));
    });
    if(cList.length == 0)
        cList = null;


    ret = {
        href: document.URL.split("/chapter")[0],
        title: (preface.querySelector(".title")! as HTMLElement).innerText,
        authors: aList,
        recipients: gList,
        fandoms: fList,
        warnings: wList,
        tags: tList,
        summary: (preface.querySelector(".summary .userstuff")! as HTMLElement).innerText,
        series: sList,
        rating: ratingToEnum((workMeta.querySelector("dd.rating")! as HTMLElement).innerText),
        categories: cList,
        complete: stats.querySelector(".status") != null && stats.querySelector(".status")!.innerHTML.indexOf("Completed") >= 0,
        language: (workMeta.querySelector('dd.language') as HTMLElement).innerText,
        wordCount: parseInt(stats.querySelector('dd.words')?.innerHTML!),
        chapterCount: parseInt(chapters[0]),
        finalChapterCount: chapters[1] == '?' ? null : parseInt(chapters[1]),
        collections: workMeta.querySelector('dd.collections') == null ? 0
            : workMeta.querySelector('dd.collections')!.querySelectorAll('a').length,
        comments: stats.querySelector('dd.comments') == null ? 0
            : parseInt((stats.querySelector('dd.comments') as HTMLElement).innerText),
        kudos: stats.querySelector('dd.kudos') == null ? 0
            : parseInt((stats.querySelector('dd.kudos') as HTMLElement).innerText),
        bookmarks: stats.querySelector('dd.bookmarks') == null ? 0
            : parseInt((stats.querySelector('dd.bookmarks') as HTMLElement).innerText),
        hits: parseInt(stats.querySelector('dd.hits')?.innerHTML!)
    }
    return ret;
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

    let stats = work.querySelector('.stats:not(dt)')!;
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
        href: `https://archiveofourown.org${work.querySelector(".heading")?.firstElementChild?.getAttribute("href")!}`,
        title: work.querySelector(".heading")?.firstElementChild?.innerHTML!,
        authors: aList,
        recipients: gList,
        fandoms: fList,
        warnings: wList,
        tags: tList,
        summary: (work.querySelector('.summary')! as HTMLElement).innerText,
        series: sList,
        rating: ratingToEnum(work.querySelector('span.rating')?.getAttribute('title')!),
        categories: cList,
        complete: work.querySelector('span.iswip')?.getAttribute('title') == 'Complete Work',
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
    return ret;
}

/**
 * Get list of works from page as an array of HTMLElements
 * @param document Document of AO3 page
 * @returns List of works from page
 */
function constructRawWorkList(document: Document): HTMLElement[] {
    let ret: HTMLElement[] = [];
    document.querySelectorAll('.index.group').forEach((e) => {
        e.querySelectorAll('.group[role="article"]').forEach((w) => {
            ret.push(w as HTMLElement);
        });
    });
    return ret;
}