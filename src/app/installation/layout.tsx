import { Metadata } from 'next';
import { Layout } from 'nextra-theme-docs';
import { getPageMap } from 'nextra/page-map';

import 'nextra-theme-docs/style.css';

import { DocsNavbar } from '@/components/DocsNavbar';

export const metadata: Metadata = {
  title: 'Installation - Log Bull Documentation',
  description:
    'Learn how to install Log Bull using automated script, Docker run, or Docker Compose. Simple zero-config installation for your self-hosted log collection system.',
  keywords: [
    'Log Bull installation',
    'Docker installation',
    'log collection setup',
    'self-hosted logging',
    'Docker Compose',
    'log management installation',
  ],
  openGraph: {
    title: 'Installation - Log Bull Documentation',
    description:
      'Learn how to install Log Bull using automated script, Docker run, or Docker Compose. Simple zero-config installation for your self-hosted log collection system.',
    type: 'article',
    url: 'https://logbull.com/installation',
  },
  twitter: {
    card: 'summary',
    title: 'Installation - Log Bull Documentation',
    description:
      'Learn how to install Log Bull using automated script, Docker run, or Docker Compose. Simple zero-config installation for your self-hosted log collection system.',
  },
  alternates: {
    canonical: 'https://logbull.com/installation',
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
