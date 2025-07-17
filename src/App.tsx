import React, { useState } from 'react';
import { Container, TextField, Button, Box, CircularProgress, Typography, Paper, Grid } from '@mui/material';
import MetaTagsAnalyzer from './components/MetaTagsAnalyzer';
import SocialPreviews from './components/SocialPreviews';
import GooglePreview from './components/GooglePreview';
import { fetchWebsite } from './services/fetchWebsite';
import { parseMetaTags } from './services/metaTagsParser';
import { analyzeMetaTags, SEOAnalysisResult } from './services/seoAnalyzer';

const App: React.FC = () => {
    const [url, setUrl] = useState('');
    const [loading, setLoading] = useState(false);
    const [metaTags, setMetaTags] = useState<Record<string, string> | null>(null);
    const [seoAnalysis, setSeoAnalysis] = useState<SEOAnalysisResult | null>(null);
    const [error, setError] = useState<string | null>(null);

    const theme = {
        primary: '#1976d2',
        background: '#f5f5f5',
    };

    const formatUrl = (input: string): string => {
        // Remove any existing protocol and www
        let cleanUrl = input.replace(/^(https?:\/\/)?(www\.)?/, '');
        // Remove any trailing slashes
        cleanUrl = cleanUrl.replace(/\/$/, '');
        // Add https://www. prefix
        return `https://www.${cleanUrl}`;
    };

    const validateUrl = (url: string): boolean => {
        try {
            new URL(url);
            return true;
        } catch {
            return false;
        }
    };

    const handleAnalyze = async () => {
        if (!url) {
            setError('Please enter a URL');
            return;
        }

        const formattedUrl = formatUrl(url);
        if (!validateUrl(formattedUrl)) {
            setError('Please enter a valid domain name');
            return;
        }
        
        setLoading(true);
        setError(null);
        setMetaTags(null);
        setSeoAnalysis(null);

        try {
            const html = await fetchWebsite(url);
            if (!html) {
                throw new Error('Unable to fetch website content');
            }
            
            const tags = parseMetaTags(html);
            if (Object.keys(tags).length === 0) {
                throw new Error('No meta tags found on the website');
            }
            
            setMetaTags(tags);
            const analysis = analyzeMetaTags(tags);
            setSeoAnalysis(analysis);
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'An error occurred while analyzing the website';
            setError(errorMessage);
            console.error('Analysis error:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box sx={{ bgcolor: theme.background, minHeight: '100vh', py: 4 }}>
            <Container maxWidth="lg">
                <Box sx={{ mb: 6, textAlign: 'center' }}>
                    <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 'bold', color: theme.primary }}>
                        SEO Analyzer
                    </Typography>
                    <Typography variant="h6" sx={{ color: 'text.secondary', mb: 4 }}>
                        Analyze your website's SEO performance and preview how it appears on search engines and social media
                    </Typography>
                    <Paper sx={{ p: 3, maxWidth: '800px', mx: 'auto' }}>
                        <Box sx={{ display: 'flex', gap: 2 }}>
                            <TextField
                                fullWidth
                                label="Enter website URL"
                                value={url}
                                onChange={(e) => {
                                    const input = e.target.value;
                                    // Only format if there's actual input
                                    if (input.trim()) {
                                        setUrl(formatUrl(input));
                                    } else {
                                        setUrl('');
                                    }
                                }}
                                placeholder="example.com"
                                disabled={loading}
                                error={!!error}
                                helperText={error || "Just enter the domain name, we'll add https://www. for you"}
                                variant="outlined"
                                sx={{ bgcolor: 'white' }}
                            />
                            <Button
                                variant="contained"
                                onClick={handleAnalyze}
                                disabled={loading || !url}
                                sx={{ 
                                    minWidth: '120px',
                                    height: '56px',
                                    textTransform: 'none',
                                    fontSize: '16px'
                                }}
                            >
                                {loading ? <CircularProgress size={24} color="inherit" /> : 'Analyze'}
                            </Button>
                        </Box>
                    </Paper>
                </Box>

                {metaTags && seoAnalysis && (
                    <Box sx={{ mt: 4 }}>
                        <Grid container spacing={3}>
                            <Grid item xs={12} md={6}>
                                <Paper sx={{ p: 3, height: '100%' }}>
                                    <Typography variant="h6" gutterBottom>Google Search Result Preview</Typography>
                                    <GooglePreview
                                        title={metaTags['title'] || ''}
                                        description={metaTags['description'] || ''}
                                        url={url}
                                        image={metaTags['og:image'] || ''}
                                    />
                                </Paper>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Paper sx={{ p: 3, height: '100%' }}>
                                    <Typography variant="h6" gutterBottom>Social Media Preview</Typography>
                                    <SocialPreviews
                                        title={metaTags['og:title'] || metaTags['title'] || ''}
                                        description={metaTags['og:description'] || metaTags['description'] || ''}
                                        image={metaTags['og:image'] || ''}
                                        url={url}
                                    />
                                </Paper>
                            </Grid>
                            <Grid item xs={12}>
                                <MetaTagsAnalyzer
                                    metaTags={metaTags}
                                    seoAnalysis={seoAnalysis}
                                />
                            </Grid>
                        </Grid>
                    </Box>
                )}
            </Container>
        </Box>
    );
};

export default App;