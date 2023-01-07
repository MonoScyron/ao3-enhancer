import { CATEGORY, RATING, WARNING } from "./enums";

/** Interface for a parsed work */
export interface WorkElement {
    /** Raw list element of work. Is null if work element refers to a meta element. */
    element: HTMLLIElement | null;
    href: string,
    title: string,
    authors: string[],
    recipients: string[] | null,
    fandoms: string[],
    warnings: WARNING[],
    tags: string[] | null,
    summary: string,
    series: string[] | null,
    rating: RATING,
    categories: CATEGORY[] | null,
    complete: boolean,
    language: string,
    wordCount: number,
    chapterCount: number,
    finalChapterCount: number | null,
    collections: number,
    comments: number,
    kudos: number,
    bookmarks: number,
    hits: number
};