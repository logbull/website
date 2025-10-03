import { Metadata } from 'next';
import { Layout } from 'nextra-theme-docs';
import { getPageMap } from 'nextra/page-map';

import 'nextra-theme-docs/style.css';

import { DocsNavbar } from '@/components/DocsNavbar';

export const metadata: Metadata = {
  title: 'Password Reset - Log Bull Documentation',
  description:
    'Learn how to reset admin or user passwords in Log Bull using Docker exec command. Simple password recovery for your self-hosted log collection system.',
  keywords: ['Log Bull password reset', 'admin password', 'password recovery', 'Docker command'],
  openGraph: {
    title: 'Password Reset - Log Bull Documentation',
    description:
      'Learn how to reset admin or user passwords in Log Bull using Docker exec command. Simple password recovery for your self-hosted log collection system.',
    type: 'article',
    url: 'https://logbull.com/password-reset',
  },
  twitter: {
    card: 'summary',
    title: 'Password Reset - Log Bull Documentation',
    description:
      'Learn how to reset admin or user passwords in Log Bull using Docker exec command. Simple password recovery for your self-hosted log collection system.',
  },
  alternates: {
    canonical: 'https://logbull.com/password-reset',
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
