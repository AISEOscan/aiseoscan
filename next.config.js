/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // Increase serverless function timeout for scans
  serverRuntimeConfig: {
    // Will only be available on the server side
    FUNCTION_TIMEOUT: 30 // seconds
  },
  // Correct API configuration
  experimental: {
    serverComponentsExternalPackages: [],
  },
  async headers() {
    return [
      // Apply these headers to all routes
      {
        source: '/(.*)',
        headers: [
          // Prevents MIME type sniffing
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          // Prevents clickjacking
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          // Enables browser XSS protections
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          // Controls how much referrer information is included
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          // Enforces HTTPS (enabled with max-age: 1 year)
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains',
          },
          // Implementation of a basic Content Security Policy
          // Should be customized based on site requirements
        {
  key: 'Content-Security-Policy',
  value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.jsdelivr.net https://*.stripe.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' https://*.stripe.com; frame-src 'self' https://*.stripe.com https://www.youtube.com https://youtube.com; object-src 'none'; base-uri 'self';",
},
          // Disable Feature Policy / Permissions Policy
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
          },
        ],
      },
      // Keep existing API route headers for backward compatibility
      {
        source: '/api/(.*)',
        headers: [
          {
            key: 'x-content-type-options',
            value: 'nosniff',
          },
        ],
      },
    ]
  },
}

module.exports = nextConfig