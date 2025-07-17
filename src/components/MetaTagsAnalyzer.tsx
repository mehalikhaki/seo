import React from 'react';
import { Box, Paper, Typography, Grid, CircularProgress } from '@mui/material';
import { SEOAnalysisResult } from '../services/seoAnalyzer';

interface MetaTagsAnalyzerProps {
    metaTags: Record<string, string>;
    seoAnalysis: SEOAnalysisResult;
}

const MetaTagsAnalyzer: React.FC<MetaTagsAnalyzerProps> = ({ metaTags, seoAnalysis }) => {
    return (
        <Box sx={{ mt: 4 }}>
            <Typography variant="h5" gutterBottom>SEO Analysis Results</Typography>
            
            <Grid container spacing={3}>
                {/* Score Card */}
                <Grid item xs={12} md={4}>
                    <Paper sx={{ 
                        p: 3, 
                        textAlign: 'center',
                        bgcolor: seoAnalysis.score.color + '10',
                        border: 1,
                        borderColor: seoAnalysis.score.color
                    }}>
                        <Box sx={{ position: 'relative', display: 'inline-flex' }}>
                            <CircularProgress
                                variant="determinate"
                                value={seoAnalysis.score.score}
                                size={120}
                                thickness={4}
                                sx={{ color: seoAnalysis.score.color }}
                            />
                            <Box sx={{
                                top: 0,
                                left: 0,
                                bottom: 0,
                                right: 0,
                                position: 'absolute',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}>
                                <Typography variant="h4" sx={{ color: seoAnalysis.score.color }}>
                                    {seoAnalysis.score.score}
                                </Typography>
                            </Box>
                        </Box>
                        <Typography variant="h6" sx={{ mt: 2, color: seoAnalysis.score.color }}>
                            {seoAnalysis.score.label}
                        </Typography>
                    </Paper>
                </Grid>

                {/* Issues and Suggestions */}
                <Grid item xs={12} md={8}>
                    <Paper sx={{ p: 3 }}>
                        <Typography variant="h6" gutterBottom>Analysis Summary</Typography>
                        
                        {seoAnalysis.issues.length > 0 && (
                            <Box sx={{ mb: 3 }}>
                                <Typography variant="subtitle1" color="error" gutterBottom>
                                    Issues Found ({seoAnalysis.issues.length}):
                                </Typography>
                                {seoAnalysis.issues.map((issue, index) => (
                                    <Typography key={index} variant="body2" color="error" sx={{ mb: 1 }}>
                                        • {issue}
                                    </Typography>
                                ))}
                            </Box>
                        )}

                        {seoAnalysis.suggestions.length > 0 && (
                            <Box>
                                <Typography variant="subtitle1" color="primary" gutterBottom>
                                    Recommendations ({seoAnalysis.suggestions.length}):
                                </Typography>
                                {seoAnalysis.suggestions.map((suggestion, index) => (
                                    <Typography key={index} variant="body2" sx={{ mb: 1 }}>
                                        • {suggestion}
                                    </Typography>
                                ))}
                            </Box>
                        )}
                    </Paper>
                </Grid>

                {/* Meta Tags Details */}
                <Grid item xs={12}>
                    <Paper sx={{ p: 3 }}>
                        <Typography variant="h6" gutterBottom>Meta Tags Details</Typography>
                        <Grid container spacing={2}>
                            {Object.entries(metaTags).map(([key, value]) => (
                                <Grid item xs={12} sm={6} md={4} key={key}>
                                    <Box sx={{ 
                                        p: 2, 
                                        borderRadius: 1,
                                        bgcolor: 'grey.50',
                                        height: '100%'
                                    }}>
                                        <Typography variant="subtitle2" color="primary" gutterBottom>
                                            {key}
                                        </Typography>
                                        <Typography variant="body2" sx={{ 
                                            wordBreak: 'break-word',
                                            opacity: value ? 1 : 0.5
                                        }}>
                                            {value || 'Not set'}
                                        </Typography>
                                    </Box>
                                </Grid>
                            ))}
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
};

export default MetaTagsAnalyzer;