export interface MetaTags {
    title: string;
    description: string;
    keywords?: string[];
    author?: string;
    viewport?: string;
    robots?: string;
    [key: string]: string | string[] | undefined;
}