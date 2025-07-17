# SEO Analyzer

SEO Analyzer is an interactive web application that fetches the HTML of any website and displays its SEO (meta) tags visually. The application provides feedback on the implementation of these tags according to best practices for SEO optimization. Additionally, it generates previews for Google search results and social media platforms based on the extracted meta tags.

## Features

- 🔍 Real-time HTML content fetching from any website
- 📊 Comprehensive meta tag analysis and visualization
- 🖼️ Live Google search result preview
- 📱 Social media appearance previews (OpenGraph)
- ⚡ Automatic URL formatting and validation
- 🚀 Instant feedback on SEO best practices
- 💡 Detailed recommendations for improvement

## Tech Stack

- React 18 with TypeScript
- Material-UI (MUI) for modern UI components
- Modern ES6+ JavaScript features
- Responsive design for all devices

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/mehalikhaki/seo.git
   ```

2. Navigate to the project directory:
   ```bash
   cd seo
   ```

3. Install the dependencies:
   ```bash
   npm install
   ```

## Usage

1. Start the development server:
   ```bash
   npm start
   ```

2. Open your browser and navigate to `http://localhost:3000`

3. Enter a website URL in the input field:
   - The URL will be automatically formatted (adding https://www. if needed)
   - Invalid URLs will be detected and reported

4. Click "Analyze" to start the SEO analysis

5. View the comprehensive results:
   - Google search result preview
   - Social media appearance previews
   - Detailed meta tag analysis
   - SEO recommendations and improvements

## Project Structure

```
src/
  ├── components/
  │   ├── GooglePreview.tsx     # Google search result preview
  │   ├── MetaTagsAnalyzer.tsx  # SEO analysis results
  │   └── SocialPreviews.tsx    # Social media previews
  ├── services/
  │   ├── fetchWebsite.ts       # Website content fetching
  │   ├── metaTagsParser.ts     # HTML meta tag parsing
  │   └── seoAnalyzer.ts        # SEO analysis logic
  └── types/
      ├── MetaTags.ts           # Meta tag type definitions
      └── SEOReport.ts          # SEO analysis report types
```

## Development

- Built using Create React App with TypeScript template
- Uses Material-UI for consistent and modern UI components
- Implements modern React patterns and hooks
- Follows TypeScript best practices for type safety

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Development Guidelines

- Write clean, maintainable, and typed code
- Follow the existing code style and conventions
- Add appropriate comments and documentation
- Test your changes thoroughly
- Update README.md with any necessary changes

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Built with [Create React App](https://github.com/facebook/create-react-app)
- UI components from [Material-UI](https://mui.com/)
- Thanks to all contributors who participate in this project