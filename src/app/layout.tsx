import { Metadata } from 'next';

import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://logbull.com'),
  title: {
    default: 'Log Bull - Simple Log Collection and View System',
    template: '%s | Log Bull',
  },
  description:
    'Self-hosted log collection system. Zero-config. Supports Python, Go, Java, JavaScript, C#, PHP and other languages. Simple alternative to ELK and Loki.',
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
      'Self-hosted log collection system. Zero-config. Supports Python, Go, Java, JavaScript, C#, PHP and other languages. Simple alternative to ELK and Loki.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Log Bull - Simple Log Collection and View System',
    description:
      'Self-hosted log collection system. Zero-config. Supports Python, Go, Java, JavaScript, C#, PHP and other languages. Simple alternative to ELK and Loki.',
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
