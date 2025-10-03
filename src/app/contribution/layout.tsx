import { Metadata } from 'next';
import { Layout } from 'nextra-theme-docs';
import { getPageMap } from 'nextra/page-map';

import 'nextra-theme-docs/style.css';

import { DocsNavbar } from '@/components/DocsNavbar';

export const metadata: Metadata = {
  title: 'Contribution Guidelines - Log Bull',
  description:
    'Learn how to contribute to Log Bull project. Guidelines for contributing code, creating libraries, and following development standards.',
  keywords: [
    'Log Bull contribution',
    'open source contribution',
    'library development',
    'development guidelines',
    'Apache 2.0',
  ],
  openGraph: {
    title: 'Contribution Guidelines - Log Bull',
    description:
      'Learn how to contribute to Log Bull project. Guidelines for contributing code, creating libraries, and following development standards.',
    type: 'article',
    url: 'https://logbull.com/contribution',
  },
  twitter: {
    card: 'summary',
    title: 'Contribution Guidelines - Log Bull',
    description:
      'Learn how to contribute to Log Bull project. Guidelines for contributing code, creating libraries, and following development standards.',
  },
  alternates: {
    canonical: 'https://logbull.com/contribution',
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
