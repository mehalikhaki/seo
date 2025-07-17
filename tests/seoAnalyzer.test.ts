import { analyzeMetaTags } from '../src/services/seoAnalyzer';
import { MetaTags } from '../src/types/MetaTags';

describe('SEO Analyzer', () => {
    it('should provide feedback on meta tags according to best practices', () => {
        const metaTags: MetaTags = {
            title: 'Sample Title',
            description: 'Sample description for the website.',
            keywords: 'sample, keywords, seo',
            robots: 'index, follow',
            ogTitle: 'Sample Open Graph Title',
            ogDescription: 'Sample Open Graph Description',
            twitterTitle: 'Sample Twitter Title',
            twitterDescription: 'Sample Twitter Description',
        };

        const report = analyzeMetaTags(metaTags);

        expect(report).toHaveProperty('isTitleValid');
        expect(report).toHaveProperty('isDescriptionValid');
        expect(report).toHaveProperty('isKeywordsValid');
        expect(report).toHaveProperty('isRobotsValid');
        expect(report).toHaveProperty('ogTitleFeedback');
        expect(report).toHaveProperty('ogDescriptionFeedback');
        expect(report).toHaveProperty('twitterTitleFeedback');
        expect(report).toHaveProperty('twitterDescriptionFeedback');
    });
});