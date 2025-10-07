import { Metadata } from 'next';
import { Layout } from 'nextra-theme-docs';
import { getPageMap } from 'nextra/page-map';

import 'nextra-theme-docs/style.css';

import { DocsNavbar } from '@/components/DocsNavbar';

export const metadata: Metadata = {
  title: 'Settings and Configuration - Log Bull Documentation',
  description:
    'Configure Log Bull user roles, project settings, security policies, rate limiting, and data retention. Learn how to manage access control and optimize your log collection system.',
  keywords: [
    'Log Bull settings',
    'log configuration',
    'user roles',
    'security policies',
    'rate limiting',
    'data retention',
    'access control',
    'project settings',
    'API key management',
    'log management configuration',
  ],
  openGraph: {
    title: 'Settings and Configuration - Log Bull Documentation',
    description:
      'Configure Log Bull user roles, project settings, security policies, rate limiting, and data retention. Learn how to manage access control and optimize your log collection system.',
    type: 'article',
    url: 'https://logbull.com/settings',
  },
  twitter: {
    card: 'summary',
    title: 'Settings and Configuration - Log Bull Documentation',
    description:
      'Configure Log Bull user roles, project settings, security policies, rate limiting, and data retention. Learn how to manage access control and optimize your log collection system.',
  },
  alternates: {
    canonical: 'https://logbull.com/settings',
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
