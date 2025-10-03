import { Metadata } from 'next';

import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://logbull.com'),
  title: {
    default: 'Log Bull - Simple Log Collection and View System',
    template: '%s | Log Bull',
  },
  description:
    'Free and open source log collection system. Self-hosted, zero-config, supports multiple languages (Python, Go, Java, Ruby, Rust, PHP, Node.js, C#). Simpler than ELK or Loki.',
  keywords: [
    'log collection',
    'log management',
    'logging system',
    'self-hosted logging',
    'Docker logging',
    'open source logging',
    'ELK alternative',
    'Loki alternative',
    'Python logging',
    'Go logging',
    'structured logging',
    'log aggregation',
    'DevOps logging',
  ],
  authors: [{ name: 'Log Bull' }],
  creator: 'Log Bull',
  publisher: 'Log Bull',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://logbull.com',
    siteName: 'Log Bull',
    title: 'Log Bull - Simple Log Collection and View System',
    description:
      'Free and open source log collection system. Self-hosted, zero-config, supports multiple languages (Python, Go, Java, Ruby, Rust, PHP, Node.js, C#). Simpler than ELK or Loki.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Log Bull - Simple Log Collection and View System',
    description:
      'Free and open source log collection system. Self-hosted, zero-config, supports multiple languages (Python, Go, Java, Ruby, Rust, PHP, Node.js, C#). Simpler than ELK or Loki.',
  },
  alternates: {
    canonical: 'https://logbull.com',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Google Fonts - Jost */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Jost:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        {/* Google Analytics */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-8PVVDTQMW0"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-8PVVDTQMW0');
            `,
          }}
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
