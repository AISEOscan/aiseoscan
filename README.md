# SafeCheck - Security Scanner for Indie Hackers

SafeCheck is a simple, affordable security scanning tool designed specifically for indie hackers and small businesses. It provides comprehensive security analysis for websites with actionable fixes for common vulnerabilities.

## Features

- **SSL/TLS Check**: Verify certificate validity and configuration
- **Security Headers Check**: Scan for missing or misconfigured security headers
- **Exposed Sensitive Files**: Detect configuration files, backups, and other sensitive files
- **OWASP Vulnerabilities**: Basic scanning for common OWASP Top 10 vulnerabilities
- **Stripe Integration Check**: Identify common issues with Stripe implementations

## Getting Started

### Prerequisites

- Node.js 14+ and npm
- A Stripe account for payment processing

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/safecheck.git
cd safecheck
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file in the root directory with your configuration:
```
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_key
STRIPE_SECRET_KEY=sk_test_your_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret
NEXT_PUBLIC_BASE_URL=http://localhost:3000
REPORT_EXPIRY_HOURS=24
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment

### Deploying to Vercel

1. Push your code to a GitHub repository
2. Create a new project in Vercel linked to your repository
3. Configure environment variables in Vercel dashboard
4. Deploy

### Setting up Stripe Webhooks

1. In your Stripe dashboard, go to Developers > Webhooks
2. Add a new endpoint: `https://your-domain.com/api/webhook`
3. Select the event `checkout.session.completed`
4. Get the webhook secret and add it to your environment variables

## Project Structure

- `/pages`: Next.js pages and API routes
- `/components`: React components
- `/scanners`: Security scanning modules
- `/utils`: Utility functions for report generation, PDF creation, etc.
- `/public`: Static assets

## Development

### Adding New Scanners

1. Create a new scanner file in the `/scanners` directory
2. Implement the scanning logic
3. Add the scanner to the main orchestrator in `/scanners/index.js`

### Customizing Reports

- Modify the PDF generation in `/utils/pdf.js`
- Update the report page UI in `/pages/report/[id].js`

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- [Next.js](https://nextjs.org/)
- [Stripe](https://stripe.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [jsPDF](https://github.com/MrRio/jsPDF)