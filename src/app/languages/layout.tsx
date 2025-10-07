import { Metadata } from 'next';
import { Layout } from 'nextra-theme-docs';
import { getPageMap } from 'nextra/page-map';

import 'nextra-theme-docs/style.css';

import { DocsNavbar } from '@/components/DocsNavbar';

export const metadata: Metadata = {
  title: 'Language Integration - Log Bull Documentation',
  description:
    'Log Bull language integrations for Python, Go, Java, JavaScript/TypeScript, cURL/HTTP API, and more. Learn how to integrate Log Bull with your application using popular logging libraries.',
  keywords: [
    'Log Bull Python',
    'Log Bull Go',
    'Log Bull Java',
    'Log Bull JavaScript',
    'Log Bull TypeScript',
    'Log Bull cURL',
    'Log Bull HTTP API',
    'logging integration',
    'Python logging',
    'Go logging',
    'Java logging',
    'JavaScript logging',
    'TypeScript logging',
    'cURL logging',
    'HTTP logging',
    'Winston',
    'Pino',
    'structured logging',
    'log collection',
    'REST API logging',
  ],
  openGraph: {
    title: 'Language Integration - Log Bull Documentation',
    description:
      'Log Bull language integrations for Python, Go, Java, JavaScript/TypeScript, cURL/HTTP API, and more. Learn how to integrate Log Bull with your application using popular logging libraries.',
    type: 'article',
    url: 'https://logbull.com/languages',
  },
  twitter: {
    card: 'summary',
    title: 'Language Integration - Log Bull Documentation',
    description:
      'Log Bull language integrations for Python, Go, Java, JavaScript/TypeScript, cURL/HTTP API, and more. Learn how to integrate Log Bull with your application using popular logging libraries.',
  },
  alternates: {
    canonical: 'https://logbull.com/languages',
  },
};

export default async function DocsLayout({ children }: { children: React.ReactNode }) {
  const pageMap = await getPageMap();
  return (
    <>
      <DocsNavbar />
      <Layout pageMap={pageMap} darkMode={false}>
        {children}
      </Layout>
    </>
  );
}
