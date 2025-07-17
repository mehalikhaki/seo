import { parseMetaTags } from '../src/services/metaTagsParser';

describe('Meta Tags Parser', () => {
    it('should correctly parse meta tags from HTML', () => {
        const html = `
            <html>
                <head>
                    <meta name="description" content="This is a test description">
                    <meta property="og:title" content="Test Title">
                    <meta name="keywords" content="test, seo, analyzer">
                </head>
                <body></body>
            </html>
        `;

        const expectedMetaTags = {
            description: "This is a test description",
            ogTitle: "Test Title",
            keywords: "test, seo, analyzer"
        };

        const result = parseMetaTags(html);
        expect(result).toEqual(expectedMetaTags);
    });

    it('should return an empty object if no meta tags are present', () => {
        const html = `
            <html>
                <head></head>
                <body></body>
            </html>
        `;

        const result = parseMetaTags(html);
        expect(result).toEqual({});
    });
});