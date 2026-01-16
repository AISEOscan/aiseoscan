AI SEO analysis platform that helps websites optimize for AI-powered search engines like ChatGPT, Claude, Perplexity, and Google's AI Overviews.
🔗 Live Site: aiseoscan.dev

What It Does
AISEOScan analyzes websites and generates comprehensive reports showing optimization opportunities specifically for AI citation and visibility. Users get actionable implementation code for every issue discovered.
Key Features

AI SEO Analysis: 25+ checks covering schema markup, content structure, FAQ optimization, and authority signals
Trust Signals Analysis: E-A-T factors, author authority, credentials, and business transparency
Free Preview: Users see overall score and limited issues before purchasing
Detailed Implementation Guides: Every issue includes copy-paste code examples (20-50+ lines)
PDF Reports: Professional PDF exports with 30-day implementation timelines
Agency Packages: Bulk credit packages for agencies and consultants

Pricing

Single Scan: $29 - Complete AI SEO analysis with full report
Starter Pack: $119 (5 scans) - 18% off per scan
Agency Pack: $199 (10 scans) - 31% off per scan
Pro Pack: $399 (25 scans) - 45% off per scan


Tech Stack

Framework: Next.js (React)
Styling: Tailwind CSS
Database: Supabase (PostgreSQL)
Payments: Stripe
PDF Generation: jsPDF
Deployment: Vercel


Project Structure
/src/
├── pages/
│   ├── index.js                    # Landing page
│   ├── report/[id].js              # Report display
│   ├── buy-credits.js              # Agency packages
│   └── api/
│       ├── scan.js                 # Initiates scan
│       ├── payment.js              # Single scan checkout
│       ├── payment-package.js      # Package checkout
│       ├── webhook.js              # Stripe webhook
│       └── report/[id]/download.js # PDF generation
│
├── scanners/
│   ├── seo.js                      # AI SEO scanner
│   ├── compliance.js               # Trust signals
│   └── index.js                    # Coordination
│
└── utils/
    ├── categorization.js           # Data processing
    ├── pdf-growth.js               # PDF generation
    └── report.js                   # Database ops

Environment Variables
bashNEXT_PUBLIC_BASE_URL=https://aiseoscan.dev
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_KEY=your_service_key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_your_key
STRIPE_SECRET_KEY=sk_live_your_key
STRIPE_WEBHOOK_SECRET=whsec_your_secret
REPORT_EXPIRY_HOURS=24

Database Schema
Reports Table
sql- id (text, primary key)
- public_id (text, unique)
- data (jsonb)
- created_at (timestamp)
- expires_at (timestamp)
- status (text)
- url (text)
Tokens Table
sql- id (bigserial, primary key)
- token (text, unique)
- credits (integer)
- purchased_amount (numeric)
- package_type (text)
- email (text)
- created_at (timestamp)

How It Works
Single Scan Flow

User enters URL → preliminary scan → free preview
User pays → Stripe checkout
Webhook marks report completed
Full report displays with PDF download

Agency Package Flow

User buys package → gets token
Webhook stores token with credits
User visits with ?token=SCAN-XXX
Scans use credits automatically


Stripe Integration
Products are created dynamically via price_data API. No manual product creation needed.
Webhook Setup:

URL: https://aiseoscan.dev/api/webhook
Event: checkout.session.completed

Discount Codes:

FREESCAN - Free scan
SAVE20 - 20% off


Local Development
bashnpm install
cp .env.example .env.local
npm run dev
Visit http://localhost:3000

Deployment
Connects to Vercel with auto-deploy from main branch.

Operating Costs

Vercel: Free tier
Supabase: Free tier
Domain: ~$15/year
Total: ~$15/year


License
Proprietary - All rights reserved



