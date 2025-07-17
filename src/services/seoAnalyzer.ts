export interface SEOScore {
    score: number;
    label: string;
    color: string;
}

export interface SEOAnalysisResult {
    isValid: boolean;
    issues: string[];
    suggestions: string[];
    score: SEOScore;
    details: {
        title: {
            exists: boolean;
            length: number;
            isOptimal: boolean;
        };
        description: {
            exists: boolean;
            length: number;
            isOptimal: boolean;
        };
        socialTags: {
            hasOgTitle: boolean;
            hasOgDescription: boolean;
            hasOgImage: boolean;
            hasTwitterCard: boolean;
        };
        technicalSEO: {
            hasViewport: boolean;
            hasCharset: boolean;
            hasCanonical: boolean;
            hasRobots: boolean;
        };
    };
}

export function analyzeMetaTags(metaTags: Record<string, string>): SEOAnalysisResult {
    const issues: string[] = [];
    const suggestions: string[] = [];
    let scorePoints = 100;

    // Initialize details object
    const details = {
        title: {
            exists: false,
            length: 0,
            isOptimal: false
        },
        description: {
            exists: false,
            length: 0,
            isOptimal: false
        },
        socialTags: {
            hasOgTitle: false,
            hasOgDescription: false,
            hasOgImage: false,
            hasTwitterCard: false
        },
        technicalSEO: {
            hasViewport: false,
            hasCharset: false,
            hasCanonical: false,
            hasRobots: false
        }
    };

    // Check title
    if (!metaTags.title) {
        issues.push("Missing title tag");
        suggestions.push("Add a title tag to improve SEO");
        scorePoints -= 25;
    } else {
        details.title.exists = true;
        details.title.length = metaTags.title.length;
        if (metaTags.title.length < 10 || metaTags.title.length > 60) {
            issues.push("Title tag length is not optimal");
            suggestions.push("Ensure the title tag is between 10 and 60 characters");
            scorePoints -= 10;
        } else {
            details.title.isOptimal = true;
        }
    }

    // Check description
    if (!metaTags.description) {
        issues.push("Missing description tag");
        suggestions.push("Add a description tag to improve SEO");
        scorePoints -= 15;
    } else {
        details.description.exists = true;
        details.description.length = metaTags.description.length;
        if (metaTags.description.length < 50 || metaTags.description.length > 160) {
            issues.push("Description tag length is not optimal");
            suggestions.push("Ensure the description tag is between 50 and 160 characters");
            scorePoints -= 7;
        } else {
            details.description.isOptimal = true;
        }
    }

    // Check social tags
    if (!metaTags['og:title']) {
        issues.push("Missing Open Graph title");
        suggestions.push("Add og:title for better social media sharing");
        scorePoints -= 5;
    } else {
        details.socialTags.hasOgTitle = true;
    }

    if (!metaTags['og:description']) {
        issues.push("Missing Open Graph description");
        suggestions.push("Add og:description for better social media sharing");
        scorePoints -= 5;
    } else {
        details.socialTags.hasOgDescription = true;
    }

    if (!metaTags['og:image']) {
        issues.push("Missing Open Graph image");
        suggestions.push("Add og:image for better social media sharing");
        scorePoints -= 5;
    } else {
        details.socialTags.hasOgImage = true;
    }

    // Check technical SEO
    if (!metaTags.viewport) {
        issues.push("Missing viewport tag");
        suggestions.push("Add a viewport tag for better mobile responsiveness");
        scorePoints -= 10;
    } else {
        details.technicalSEO.hasViewport = true;
    }

    if (!metaTags.charset && !metaTags['content-type']) {
        issues.push("Missing charset declaration");
        suggestions.push("Add charset meta tag for proper character encoding");
        scorePoints -= 5;
    } else {
        details.technicalSEO.hasCharset = true;
    }

    if (!metaTags.canonical) {
        issues.push("Missing canonical tag");
        suggestions.push("Add canonical tag to prevent duplicate content issues");
        scorePoints -= 5;
    } else {
        details.technicalSEO.hasCanonical = true;
    }

    if (!metaTags.robots) {
        issues.push("Missing robots tag");
        suggestions.push("Consider adding robots meta tag for search engine crawling instructions");
        scorePoints -= 3;
    } else {
        details.technicalSEO.hasRobots = true;
    }

    // Calculate score label and color
    let scoreLabel: string;
    let scoreColor: string;

    if (scorePoints >= 90) {
        scoreLabel = 'Excellent';
        scoreColor = '#4caf50';
    } else if (scorePoints >= 70) {
        scoreLabel = 'Good';
        scoreColor = '#2196f3';
    } else if (scorePoints >= 50) {
        scoreLabel = 'Fair';
        scoreColor = '#ff9800';
    } else {
        scoreLabel = 'Poor';
        scoreColor = '#f44336';
    }

    return {
        isValid: issues.length === 0,
        issues,
        suggestions,
        score: {
            score: Math.max(0, scorePoints),
            label: scoreLabel,
            color: scoreColor
        },
        details
    };
}