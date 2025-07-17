import React from 'react';

interface GooglePreviewProps {
    title: string;
    description: string;
    url: string;
    image: string;
}

const GooglePreview: React.FC<GooglePreviewProps> = ({ title, description, url, image }) => {
    const formatUrl = (url: string) => {
        try {
            const urlObj = new URL(url);
            const path = urlObj.pathname === '/' ? '' : urlObj.pathname;
            return urlObj.hostname + path;
        } catch {
            return url;
        }
    };

    const formattedTitle = title || 'No title provided';
    const formattedDescription = description || 'No description provided';
    const formattedUrl = url ? formatUrl(url) : 'example.com';

    return (
        <div style={{ 
            fontFamily: 'Arial, sans-serif',
            maxWidth: '600px',
            padding: '16px',
            borderRadius: '8px',
            backgroundColor: '#fff',
            boxShadow: '0 1px 6px rgba(32, 33, 36, 0.28)'
        }}>
            <div style={{ 
                fontSize: '14px',
                color: '#202124',
                marginBottom: '4px'
            }}>
                {formatUrl(url)}
            </div>
            <h3 style={{ 
                fontSize: '20px',
                margin: '0 0 4px 0',
                color: '#1a0dab',
                fontWeight: 'normal',
                cursor: 'pointer'
            }}>
                {title || 'No title provided'}
            </h3>
            <div style={{ 
                fontSize: '14px',
                lineHeight: '1.58',
                color: '#4d5156',
                marginTop: '8px'
            }}>
                {description || 'No description provided'}
            </div>
            {image && (
                <div style={{ marginTop: '12px' }}>
                    <img 
                        src={image} 
                        alt="Preview" 
                        style={{ 
                            maxWidth: '100%',
                            height: 'auto',
                            borderRadius: '4px'
                        }} 
                    />
                </div>
            )}
        </div>
    );
};

export default GooglePreview;