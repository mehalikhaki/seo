function createDOM(html: string): Document {
    const parser = new DOMParser();
    return parser.parseFromString(html, 'text/html');
}

export function parseMetaTags(html: string): Record<string, string> {
    const metaTags: Record<string, string> = {};
    const doc = createDOM(html);

    // Get title
    const titleElement = doc.querySelector('title');
    if (titleElement) {
        metaTags['title'] = titleElement.textContent || '';
    }

    // Get meta tags
    doc.querySelectorAll('meta').forEach((meta) => {
        const name = meta.getAttribute('name');
        const property = meta.getAttribute('property');
        const content = meta.getAttribute('content') || '';

        if (name) {
            metaTags[name] = content;
        }
        if (property) {
            metaTags[property] = content;
        }
    });

    // Get description from meta description
    const descriptionMeta = doc.querySelector('meta[name="description"]');
    if (descriptionMeta) {
        metaTags['description'] = descriptionMeta.getAttribute('content') || '';
    }

    // Get canonical link
    const canonicalLink = doc.querySelector('link[rel="canonical"]');
    if (canonicalLink) {
        metaTags['canonical'] = canonicalLink.getAttribute('href') || '';
    }

    // Handle charset
    const charsetMeta = doc.querySelector('meta[charset]');
    if (charsetMeta) {
        metaTags['charset'] = charsetMeta.getAttribute('charset') || '';
    }

    // Get viewport
    const viewportMeta = doc.querySelector('meta[name="viewport"]');
    if (viewportMeta) {
        metaTags['viewport'] = viewportMeta.getAttribute('content') || '';
    }

    // Get robots
    const robotsMeta = doc.querySelector('meta[name="robots"]');
    if (robotsMeta) {
        metaTags['robots'] = robotsMeta.getAttribute('content') || '';
    }

    return metaTags;
}