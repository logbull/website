import { Metadata } from 'next';
import Script from 'next/script';

import { CodeUsageComponent } from '@/components/CodeUsageComponent';
import { InstallationComponent } from '@/components/InstallationComponent';

export const metadata: Metadata = {
  title: 'Log Bull - simple log collection and view system',
  description:
    'Log Bull is a simple log collection and view system. Self hosted, zero-config, support of languages (Python, Go, Java, Ruby, Rust, etc.). Simple alternative to ELK and Loki',
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
    'Java logging',
    'structured logging',
    'log aggregation',
    'DevOps logging',
    'log viewer',
  ],
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    url: 'https://logbull.com',
    title: 'Log Bull - simple log collection and view system',
    description:
      'Free and open source log collection system. Self-hosted, zero-config, supports multiple languages (Python, Go, Java, Ruby, Rust, PHP, Node.js, C#). Simpler than ELK or Loki.',
    siteName: 'Log Bull',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Log Bull - simple log collection and view system',
    description:
      'Free and open source log collection system. Self-hosted, zero-config, supports multiple languages (Python, Go, Java, Ruby, Rust, PHP, Node.js, C#). Simpler than ELK or Loki.',
  },
  applicationName: 'Log Bull',
  appleWebApp: {
    title: 'Log Bull',
    capable: true,
  },
  alternates: {
    canonical: 'https://logbull.com',
  },
  other: {
    'google-site-verification': '',
  },
};

export default function HomePage() {
  return (
    <>
      {/* Structured Data - SoftwareApplication */}
      <Script
        id="structured-data-software"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'SoftwareApplication',
            name: 'Log Bull',
            description:
              'Free and open source log collection system. Self-hosted, zero-config, supports multiple languages (Python, Go, Java, Ruby, Rust, PHP, Node.js, C#). Simpler than ELK or Loki.',
            url: 'https://logbull.com',
            applicationCategory: 'DeveloperApplication',
            operatingSystem: 'Linux, Windows, macOS',
            offers: {
              '@type': 'Offer',
              price: '0',
              priceCurrency: 'USD',
            },
            publisher: {
              '@type': 'Organization',
              name: 'Log Bull',
            },
            featureList: [
              'Simple log collection',
              'Zero-config setup',
              'Multi-language support (Python, Go, Java, Ruby, Rust, PHP, Node.js, C#)',
              'Self-hosted via Docker',
              'Open source and free',
              'Multiple project support',
              'User access management',
              'API keys and limits',
              'Audit logs',
              'Search and filter logs',
            ],
            softwareVersion: 'latest',
          }),
        }}
      />

      {/* Structured Data - Organization */}
      <Script
        id="structured-data-organization"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: 'Log Bull',
            url: 'https://logbull.com/',
            alternateName: ['logbull', 'LogBull'],
            sameAs: ['https://github.com/logbull/logbull', 'https://t.me/logbull_community'],
          }),
        }}
      />

      {/* Structured Data - WebSite */}
      <Script
        id="structured-data-website"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            name: 'Log Bull',
            alternateName: ['logbull', 'LogBull'],
            url: 'https://logbull.com/',
            description: 'Simple log collection and view system',
            publisher: { '@type': 'Organization', name: 'Log Bull' },
          }),
        }}
      />

      {/* Structured Data - FAQPage */}
      <Script
        id="structured-data-faq"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: [
              {
                '@type': 'Question',
                name: 'What is Log Bull and why should I use it instead of ELK or Loki?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Log Bull is an Apache 2.0 licensed, self-hosted log collection system designed for developers and small teams. Unlike ELK (Elasticsearch, Logstash, Kibana) or Loki which require complex configurations, significant resources (multiple services, heavy memory usage), and extensive setup time, Log Bull works out of the box with zero configuration and runs as a single lightweight Docker container. The system supports multiple programming languages (Python, Go, Java, Ruby, Rust, PHP, Node.js, C#) and can be installed with a single Docker command in under 2 minutes.',
                },
              },
              {
                '@type': 'Question',
                name: 'How do I install Log Bull in the quickest way?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'The fastest method is running the one-line automated installation script which automatically installs Docker (if needed), pulls the image, sets up the container, and configures automatic startup on system reboot. The entire process takes less than 2 minutes. Alternatively, you can use a simple docker run command or Docker Compose for more control over the setup.',
                },
              },
              {
                '@type': 'Question',
                name: 'What programming languages and frameworks does Log Bull support?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: "The system supports virtually any language that can send HTTP requests. Officially documented languages include Python (with standard logging), Go (with structured logging), Java (Log4j, Logback, SLF4J), Node.js (Winston, Bunyan), C#/.NET (Serilog, NLog), PHP (Monolog), and Ruby. You don't need to change your existing logging code — just add it as an additional handler to your current logger.",
                },
              },
              {
                '@type': 'Question',
                name: 'Where do my logs get stored and how much space will they use?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'All logs are stored locally on your server in the mounted volume (typically ./logbull-data directory). The project is designed for developers and small teams, not for enterprises with terabytes of logs. Storage usage depends on your log volume, but it includes configurable retention policies and limits to help manage disk space effectively while keeping your most important logs accessible.',
                },
              },
              {
                '@type': 'Question',
                name: 'Can I use Log Bull for multiple projects and applications?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Yes! The system supports multiple projects out of the box. Install once and use it for all your applications. Each project gets its own isolated log space with separate project IDs and API keys. You can control access to each project individually, allowing you to organize logs by microservices, environments (dev, staging, production), or any other structure that fits your workflow.',
                },
              },
              {
                '@type': 'Question',
                name: "Does Log Bull compromise my application's security?",
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'No. The system is completely self-hosted on your own infrastructure — no data ever leaves your servers. All logs, credentials, and configurations stay under your control. The entire project is open source (Apache 2.0 license), so you or your security team can audit every line of code. Plus, it includes built-in features like API keys, domain restrictions, and user access management to secure your logging infrastructure.',
                },
              },
            ],
          }),
        }}
      />
      {/* ======================== NAVBAR ======================== */}
      <nav className="fixed top-0 z-50 flex h-[60px] w-full justify-center bg-white sm:h-[70px] md:h-[80px]">
        <div className="flex min-w-0 grow items-center border-b border-gray-200 px-10">
          <img
            src="logo.svg"
            loading="eager"
            alt="Log Bull logo"
            width="35"
            height="35"
            className="flex-shrink-0 sm:h-[40px] sm:w-[40px] md:h-[50px] md:w-[50px]"
          />

          <div className="ml-2 select-none text-lg font-bold sm:ml-3 sm:text-xl md:ml-4 md:text-2xl">
            Log Bull
          </div>

          <div className="ml-auto mr-4 hidden gap-3 sm:mr-6 md:mr-10 lg:flex lg:gap-5">
            <a className="hover:opacity-70" href="/installation/">
              Docs
            </a>
            <a className="hover:opacity-70" href="#guide">
              Features
            </a>
            <a className="hover:opacity-70" href="#features">
              Usage in code
            </a>
            <a className="hover:opacity-70" href="#installation">
              Installation
            </a>
            <a className="hover:opacity-70" href="https://t.me/logbull_community" target="_blank">
              Community
            </a>
          </div>

          <a
            className="ml-auto lg:ml-0"
            href="https://github.com/logbull/logbull"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="flex items-center rounded-lg border border-gray-200 bg-[#f5f7f9] px-2 py-1 hover:bg-gray-100 md:px-4 md:py-2">
              <img
                src="/github.svg"
                className="mr-1 h-4 w-4 sm:mr-2 md:mr-3"
                alt="GitHub icon"
                width="16"
                height="16"
                loading="eager"
              />
              <span className="text-sm sm:text-base">
                Star on GitHub
                <span className="hidden sm:inline">, it&apos;s really important ❤️</span>
              </span>
            </div>
          </a>
        </div>
      </nav>

      <div className="h-[60px] sm:h-[70px] md:h-[80px]" />
      {/* ======================== NAVBAR ======================== */}

      {/* ======================== MAIN CONTENT ======================== */}
      <div className="px-6 py-12 md:py-16 lg:py-24">
        <div className="mx-auto max-w-[340px] sm:max-w-[600px] md:max-w-[1200px]">
          <main>
            <div className="space-y-6 sm:space-y-8">
              <h1 className="mx-auto max-w-[340px] text-center text-2xl font-bold leading-[1.2] sm:max-w-[800px] sm:text-4xl md:text-5xl">
                Log Bull is a simple zero-config log collection system{' '}
                <span className="underline decoration-emerald-600">for developers</span>
              </h1>

              <p className="mx-auto max-w-[300px] text-center text-lg sm:max-w-[600px] sm:text-xl">
                Simple alternative to ELK and Loki. Self-hosted. Open source
              </p>

              <div className="mx-auto flex max-w-[600px] flex-col items-center justify-center gap-2 px-4 sm:flex-row sm:gap-4">
                <a
                  href="#features"
                  className="w-full cursor-pointer rounded-lg border-2 border-emerald-600 bg-emerald-600 px-4 py-2 text-center text-sm font-semibold text-white transition-colors hover:border-emerald-700 hover:bg-emerald-700 sm:w-auto sm:px-6 sm:py-3 sm:text-base"
                >
                  How to use in code?
                </a>

                <a
                  href="#installation"
                  className="w-full cursor-pointer rounded-lg border-2 border-emerald-600 bg-white px-4 py-2 text-center text-sm font-semibold transition-colors hover:border-emerald-700 hover:bg-emerald-50 sm:w-auto sm:px-6 sm:py-3 sm:text-base"
                >
                  How to install Log Bull?
                </a>
              </div>
            </div>
          </main>

          <div className="mt-12">
            <div className="mx-auto max-w-[1440px]">
              <img
                src="/logbull.svg"
                alt="Log Bull screenshot"
                className="h-auto w-full"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
      {/* ======================== MAIN CONTENT ======================== */}

      <div className="bg-gradient-to-b from-white to-gray-50 py-12 sm:py-16 md:py-20">
        <div className="mx-auto max-w-[340px] rounded-lg border border-emerald-600 bg-gradient-to-br p-5 shadow-lg sm:max-w-[600px] md:p-6">
          <div className="space-y-3 text-sm leading-relaxed md:text-base">
            <p className="font-medium">
              I got bored of the complexity of logging systems. So I created the most simple
              solution I could for myself (I use it in production a lot):{' '}
              <span className="underline decoration-emerald-600 decoration-2">
                just write a couple of lines of code — and see logs
              </span>
              .
            </p>

            <p>
              <b>Log Bull only collects logs without tons of features.</b> Just the bare essentials
              to make it work. No huge UI, no dashboards, no metrics, no lists of settings, no hours
              of installation.
            </p>

            <p>
              By the way, the project is based on OpenSearch and written in Go. If you like what
              I&apos;ve created — please star it on GitHub ⭐. It&apos;s really will help me.
            </p>

            <div className="mt-4 flex items-center gap-3 border-t border-emerald-200 pt-3">
              <img
                src="/rostislav.png"
                alt="Rostislav Dugin"
                loading="lazy"
                className="h-12 w-12 flex-shrink-0 rounded-full object-cover"
              />

              <div>
                <a
                  href="https://rostislav-dugin.com"
                  target="_blank"
                  className="font-semibold text-emerald-600 transition-colors hover:text-emerald-700"
                >
                  Rostislav Dugin
                </a>
                <p className="text-sm text-gray-600">Developer of Log Bull</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ======================== FEATURES ======================== */}
      <div id="guide" className="bg-gray-50 px-4 py-12 sm:px-6 sm:py-16 md:py-20 lg:py-28">
        <div className="mx-auto max-w-[340px] sm:max-w-[600px] md:max-w-[1200px]">
          <div className="mb-12 text-center">
            <h2 className="mx-auto max-w-[600px] text-2xl font-bold leading-[1.2] sm:text-4xl md:text-5xl">
              Everything you need for easy{' '}
              <span className="underline decoration-emerald-600">log management</span>
            </h2>
            <p className="mt-4 text-base text-gray-600 sm:text-lg md:text-xl">
              Built for developers who value simplicity and efficiency
            </p>
          </div>

          <div className="mt-10 grid gap-6 sm:mt-20 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
            {/* Feature 1 */}
            <div className="rounded-xl bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-100">
                <svg
                  className="h-6 w-6 text-emerald-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <h3 className="mb-2 text-xl font-semibold">Logs Collection</h3>
              <p className="text-gray-600">
                Send logs to the system and view them: search by text, by fields and within time
                ranges
              </p>
            </div>

            {/* Feature 2 */}
            <div className="rounded-xl bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-100">
                <svg
                  className="h-6 w-6 text-emerald-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h3 className="mb-2 text-xl font-semibold">Simplicity</h3>
              <p className="text-gray-600">
                Log Bull is not for enterprise. It&apos;s for developers and small teams without TBs
                of logs
              </p>
            </div>

            {/* Feature 3 */}
            <div className="rounded-xl bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-100">
                <svg
                  className="h-6 w-6 text-emerald-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                  />
                </svg>
              </div>
              <h3 className="mb-2 text-xl font-semibold">Code First</h3>
              <p className="text-gray-600">
                Multiple language support: we&apos;re for developers instead of trying to support
                &quot;everything&quot;
              </p>
            </div>

            {/* Feature 4 */}
            <div className="rounded-xl bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-100">
                <svg
                  className="h-6 w-6 text-emerald-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                  />
                </svg>
              </div>
              <h3 className="mb-2 text-xl font-semibold">Easy Deployment</h3>
              <p className="text-gray-600">
                You don&apos;t need to configure anything. Just run &quot;up&quot; in Docker - and
                that&apos;s it
              </p>
            </div>

            {/* Feature 5 */}
            <div className="rounded-xl bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-100">
                <svg
                  className="h-6 w-6 text-emerald-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                  />
                </svg>
              </div>
              <h3 className="mb-2 text-xl font-semibold">Multiple Projects</h3>
              <p className="text-gray-600">
                Install Log Bull once, and use it for all your projects
              </p>
            </div>

            {/* Feature 6 */}
            <div className="rounded-xl bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-100">
                <svg
                  className="h-6 w-6 text-emerald-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              </div>
              <h3 className="mb-2 text-xl font-semibold">Access Management</h3>
              <p className="text-gray-600">
                Add users to Log Bull and control their access to projects (PMs, developers, DevOps,
                etc.)
              </p>
            </div>

            {/* Feature 7 */}
            <div className="rounded-xl bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-100">
                <svg
                  className="h-6 w-6 text-emerald-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <h3 className="mb-2 text-xl font-semibold">Audit Logs</h3>
              <p className="text-gray-600">
                When anybody changes settings in a project - the audit log is saved
              </p>
            </div>

            {/* Feature 8 */}
            <div className="rounded-xl bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-100">
                <svg
                  className="h-6 w-6 text-emerald-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
                  />
                </svg>
              </div>
              <h3 className="mb-2 text-xl font-semibold">API Keys & Limits</h3>
              <p className="text-gray-600">
                Control the amount of logs, allowed domains, and instances. You decide who sends
                logs to you!
              </p>
            </div>

            {/* Feature 9 */}
            <div className="rounded-xl bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-100">
                <svg
                  className="h-6 w-6 text-emerald-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                  />
                </svg>
              </div>
              <h3 className="mb-2 text-xl font-semibold">Open Source</h3>
              <p className="text-gray-600">
                Log Bull is open source and free to use. You can host it yourself completely free
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* ======================== FEATURES ======================== */}

      {/* ======================== HOW TO USE IN CODE ======================== */}
      <div id="features" className="">
        <div className="mx-auto max-w-[340px] border-b-2 border-emerald-600 px-4 py-12 sm:max-w-[600px] sm:px-6 sm:py-16 md:max-w-[1200px] md:py-20 lg:py-28">
          <div className="mb-12 text-center">
            <h2 className="mx-auto max-w-[600px] text-2xl font-bold leading-[1.2] sm:text-4xl md:text-5xl">
              How to use in code?
            </h2>

            <p className="mx-auto mt-4 max-w-[800px] text-base text-gray-600 sm:text-lg md:text-xl">
              Python, Golang, Java, JavaScript, PHP, Ruby and other languages supported as well as
              popular libraries (so you don&apos;t have to migrate your code)
            </p>
          </div>

          <CodeUsageComponent />

          <div className="mx-auto mt-12 max-w-[900px]">
            <p className="mb-4 text-lg text-gray-600">
              For more languages examples, please check out:
            </p>
            <ul className="space-y-2 text-lg">
              <li className="flex items-center">
                <span className="mr-3 text-emerald-600">•</span>
                <a
                  href="/languages/python/"
                  className="text-emerald-600 underline decoration-emerald-600 underline-offset-2 transition-colors hover:text-emerald-700"
                >
                  Python
                </a>
              </li>
              <li className="flex items-center">
                <span className="mr-3 text-emerald-600">•</span>
                <a
                  href="/languages/go/"
                  className="text-emerald-600 underline decoration-emerald-600 underline-offset-2 transition-colors hover:text-emerald-700"
                >
                  Golang
                </a>
              </li>
              <li className="flex items-center">
                <span className="mr-3 text-gray-400">•</span>
                <span className="text-gray-400">Other coming soon...</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      {/* ======================== HOW TO USE IN CODE ======================== */}

      {/* ======================== INSTALLATION ======================== */}
      <div id="installation" className="px-4 py-12 sm:px-6 sm:py-16 md:py-20 lg:py-28">
        <div className="mx-auto max-w-[340px] sm:max-w-[600px] md:max-w-[1200px]">
          <div className="mb-12 text-center">
            <h2 className="mx-auto max-w-[600px] text-2xl font-bold leading-[1.2] sm:text-4xl md:text-5xl">
              How to install Log Bull?
            </h2>

            <p className="mx-auto mt-4 max-w-[800px] text-base text-gray-600 sm:text-lg md:text-xl">
              Log Bull can be installed in three ways: automated script (recommended), simple Docker
              run, or Docker Compose setup.
            </p>
          </div>

          <InstallationComponent />
        </div>
      </div>
      {/* ======================== INSTALLATION ======================== */}

      {/* ======================== FAQ ======================== */}
      <div id="faq" className="bg-emerald-50 px-4 py-12 sm:px-6 sm:py-16 md:py-20 lg:py-28">
        <div className="mx-auto max-w-[340px] sm:max-w-[600px] md:max-w-[1200px]">
          <div className="mb-10 md:mb-20">
            <h2 className="text-2xl font-bold sm:text-4xl md:text-5xl">
              Frequently Asked Questions
            </h2>
            <p className="mt-5 max-w-[800px] text-base sm:text-lg md:text-xl">
              Our goal is to make log collection as simple as possible for developers and small
              teams. The UI makes it easy to view, search, and filter logs without complex
              configurations or enterprise overhead.
            </p>
          </div>

          <div className="mt-15">
            <div className="flex flex-wrap">
              <div className="mb-8 w-full pr-0 lg:w-1/2 lg:pr-10">
                <h3 className="mb-3 max-w-[500px] text-lg font-bold md:text-xl">
                  1. What is Log Bull and why should I use it instead of ELK or Loki?
                </h3>

                <p className="max-w-[500px] text-base md:text-lg">
                  Log Bull is an Apache 2.0 licensed, self-hosted log collection system designed for
                  developers and small teams. Unlike ELK (Elasticsearch, Logstash, Kibana) or Loki
                  which require complex configurations, significant resources (multiple services,
                  heavy memory usage), and extensive setup time, Log Bull works out of the box with
                  zero configuration and runs as a single lightweight Docker container. The system
                  supports multiple programming languages (Python, Go, Java, Ruby, Rust, PHP,
                  Node.js, C#) and can be installed with a single Docker command in under 2 minutes.
                </p>
              </div>

              <div className="mb-8 w-full pr-0 lg:w-1/2 lg:pr-10">
                <h3 className="mb-3 max-w-[500px] text-lg font-bold md:text-xl">
                  2. How do I install Log Bull in the quickest way?
                </h3>

                <p className="max-w-[500px] text-base md:text-lg">
                  The fastest method is running the one-line automated installation script which
                  automatically installs Docker (if needed), pulls the image, sets up the container,
                  and configures automatic startup on system reboot. The entire process takes less
                  than 2 minutes. Alternatively, you can use a simple docker run command or Docker
                  Compose for more control over the setup.
                </p>
              </div>

              <div className="mb-8 w-full pr-0 lg:w-1/2 lg:pr-10">
                <h3 className="mb-3 max-w-[500px] text-lg font-bold md:text-xl">
                  3. What programming languages and frameworks does Log Bull support?
                </h3>

                <p className="max-w-[500px] text-base md:text-lg">
                  The system supports virtually any language that can send HTTP requests. Officially
                  documented languages include Python (with standard logging), Go (with structured
                  logging), Java (Log4j, Logback, SLF4J), Node.js (Winston, Bunyan), C#/.NET
                  (Serilog, NLog), PHP (Monolog), and Ruby. You don&apos;t need to change your
                  existing logging code — just add it as an additional handler to your current
                  logger.
                </p>
              </div>

              <div className="mb-8 w-full pr-0 lg:w-1/2 lg:pr-10">
                <h3 className="mb-3 max-w-[500px] text-lg font-bold md:text-xl">
                  4. Where do my logs get stored and how much space will they use?
                </h3>

                <p className="max-w-[500px] text-base md:text-lg">
                  All logs are stored locally on your server in the mounted volume (typically
                  ./logbull-data directory). The project is designed for developers and small teams,
                  not for enterprises with terabytes of logs. Storage usage depends on your log
                  volume, but it includes configurable retention policies and limits to help manage
                  disk space effectively while keeping your most important logs accessible.
                </p>
              </div>

              <div className="mb-8 w-full pr-0 lg:w-1/2 lg:pr-10">
                <h3 className="mb-3 max-w-[500px] text-lg font-bold md:text-xl">
                  5. Can I use Log Bull for multiple projects and applications?
                </h3>

                <p className="max-w-[500px] text-base md:text-lg">
                  Yes! The system supports multiple projects out of the box. Install once and use it
                  for all your applications. Each project gets its own isolated log space with
                  separate project IDs and API keys. You can control access to each project
                  individually, allowing you to organize logs by microservices, environments (dev,
                  staging, production), or any other structure that fits your workflow.
                </p>
              </div>

              <div className="mb-8 w-full pr-0 lg:w-1/2 lg:pr-10">
                <h3 className="mb-3 max-w-[500px] text-lg font-bold md:text-xl">
                  6. Does Log Bull compromise my application&apos;s security?
                </h3>

                <p className="max-w-[500px] text-base md:text-lg">
                  No. The system is completely self-hosted on your own infrastructure — no data ever
                  leaves your servers. All logs, credentials, and configurations stay under your
                  control. The entire project is open source (Apache 2.0 license), so you or your
                  security team can audit every line of code. Plus, it includes built-in features
                  like API keys, domain restrictions, and user access management to secure your
                  logging infrastructure.
                </p>
              </div>

              <div className="mb-8 w-full pr-0 lg:w-1/2 lg:pr-10">
                <h3 className="mb-3 max-w-[500px] text-lg font-bold md:text-xl">
                  7. How do I send my first log to Log Bull?
                </h3>

                <p className="max-w-[500px] text-base md:text-lg">
                  After installation, log in to the dashboard at http://localhost:4005, create a new
                  project, and copy the generated project ID. Then, in your application code, add it
                  as a logging handler by configuring your existing logger (Python logging, Go
                  logrus, etc.) to send logs to the endpoint with the project ID. Most integrations
                  require just 3-5 lines of code, and your logs will immediately start appearing in
                  the dashboard with full search and filter capabilities.
                </p>
              </div>

              <div className="mb-8 w-full pr-0 lg:w-1/2 lg:pr-10">
                <h3 className="mb-3 max-w-[500px] text-lg font-bold md:text-xl">
                  8. How does team access and user management work?
                </h3>

                <p className="max-w-[500px] text-base md:text-lg">
                  The system includes built-in multi-user support with access management. You can
                  add team members (developers, DevOps, project managers) and control their access
                  to specific projects. Each user action is tracked in audit logs, showing who
                  changed what and when. You can also set API keys with specific limits, restrict
                  allowed domains, and control the number of instances that can send logs to prevent
                  unauthorized access.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* ======================== FAQ ======================== */}

      {/* ======================== FOOTER ======================== */}
      <div id="footer" className="flex justify-center bg-emerald-600 py-[50px] md:py-[50px]">
        <div className="w-[320px] max-w-[320px] sm:w-[640px] sm:max-w-[640px] lg:w-[1200px] lg:max-w-[1200px]">
          <div className="flex flex-col items-center space-y-4">
            <div className="flex flex-wrap justify-center gap-6 text-white">
              <a href="/installation/" className="transition-colors hover:text-emerald-200">
                Docs
              </a>

              <a
                href="https://github.com/logbull/logbull"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-emerald-200"
              >
                GitHub
              </a>

              <a
                href="https://t.me/logbull_community"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-emerald-200"
              >
                Community
              </a>

              <a
                href="https://postgresus.com"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-emerald-200"
              >
                Postgresus
              </a>
            </div>
            <p className="text-center text-sm text-white">
              &copy; 2025 Log Bull. All rights reserved.
            </p>
          </div>
        </div>
      </div>
      {/* ======================== FOOTER ======================== */}
    </>
  );
}
