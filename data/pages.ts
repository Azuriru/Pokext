import pages from '../data/pages-sample.json';

export type Pages = typeof pages;
export type Page = Pages[number];
export type Pokemon = Page['pokemon'];
export type PageContent = Page['content'];
export type ContentItem = PageContent[number];

export { pages };