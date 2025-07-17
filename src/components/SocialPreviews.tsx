import React from 'react';

interface SocialPreviewProps {
    title: string;
    description: string;
    image: string;
    url: string;
}

const SocialPreviews: React.FC<SocialPreviewProps> = ({ title, description, image, url }) => {
    const formatUrl = (url: string) => {
        try {
            const urlObj = new URL(url);
            return urlObj.hostname;
        } catch {
            return 'example.com';
        }
    };

    const formattedTitle = title || 'No title provided';
    const formattedDescription = description || 'No description provided';
    const formattedUrl = url ? formatUrl(url) : 'example.com';

    return (
        <div style={{ 
            maxWidth: '500px',
            borderRadius: '12px',
            overflow: 'hidden',
            backgroundColor: '#fff',
            boxShadow: '0 1px 6px rgba(32, 33, 36, 0.28)',
            fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Ubuntu, sans-serif'
        }}>
            {image ? (
                <div style={{
                    width: '100%',
                    height: '260px',
                    backgroundColor: '#f0f2f5',
                    backgroundImage: `url(${image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                }} />
            ) : (
                <div style={{
                    width: '100%',
                    height: '260px',
                    backgroundColor: '#f0f2f5',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#65676b'
                }}>
                    No image provided
                </div>
            )}
            <div style={{ padding: '12px 16px' }}>
                <div style={{ 
                    fontSize: '12px',
                    color: '#65676b',
                    textTransform: 'uppercase',
                    marginBottom: '4px'
                }}>
                    {formatUrl(url)}
                </div>
                <h4 style={{ 
                    margin: '0 0 8px 0',
                    fontSize: '16px',
                    fontWeight: '600',
                    color: '#050505',
                    lineHeight: '1.2'
                }}>
                    {title || 'No title provided'}
                </h4>
                <p style={{ 
                    margin: '0',
                    fontSize: '14px',
                    color: '#65676b',
                    lineHeight: '1.4',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden'
                }}>
                    {description || 'No description provided'}
                </p>
            </div>
        </div>
    );
};

export default SocialPreviews;