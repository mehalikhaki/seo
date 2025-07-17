export const fetchWebsite = async (url: string): Promise<string> => {
    try {
        // Use a CORS proxy to avoid CORS issues
        const corsProxy = 'https://api.allorigins.win/raw?url=';
        const response = await fetch(corsProxy + encodeURIComponent(url));
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const html = await response.text();
        return html;
    } catch (error) {
        console.error('Error fetching the website:', error);
        throw error;
    }
};