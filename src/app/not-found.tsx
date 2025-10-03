import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '404 - Page Not Found | Log Bull',
  description: 'The page you are looking for does not exist.',
};

export default function NotFound() {
  return (
    <>
      {/* ======================== NAVBAR ======================== */}
      <nav className="fixed top-0 z-50 flex h-[60px] w-full justify-center bg-white sm:h-[70px] md:h-[80px]">
        <div className="flex min-w-0 grow items-center border-b border-gray-200 px-10">
          <Link href="/" className="flex items-center">
            <img
              src="/logo.svg"
              loading="eager"
              alt="Log Bull logo"
              width="35"
              height="35"
              className="flex-shrink-0 sm:h-[40px] sm:w-[40px] md:h-[50px] md:w-[50px]"
            />
            <div className="ml-2 select-none text-lg font-bold sm:ml-3 sm:text-xl md:ml-4 md:text-2xl">
              Log Bull
            </div>
          </Link>

          <div className="ml-auto mr-4 hidden gap-3 sm:mr-6 md:mr-10 lg:flex lg:gap-5">
            <Link className="hover:opacity-70" href="/installation/">
              Docs
            </Link>
            <Link className="hover:opacity-70" href="/#guide">
              Features
            </Link>
            <Link className="hover:opacity-70" href="/#features">
              Usage in code
            </Link>
            <Link className="hover:opacity-70" href="/#installation">
              Installation
            </Link>
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
                Star on GitHub, it&apos;s really important ❤️
              </span>
            </div>
          </a>
        </div>
      </nav>

      <div className="h-[60px] sm:h-[70px] md:h-[80px]" />
      {/* ======================== NAVBAR ======================== */}

      {/* ======================== 404 CONTENT ======================== */}
      <div className="flex min-h-[calc(100vh-60px)] items-center justify-center px-4 py-12 sm:min-h-[calc(100vh-70px)] sm:px-6 sm:py-16 md:min-h-[calc(100vh-80px)] md:py-20">
        <div className="mx-auto max-w-[600px] text-center">
          <div className="mb-8">
            <h1 className="mb-4 text-8xl font-bold text-emerald-600 sm:text-9xl">404</h1>
            <h2 className="mb-4 text-2xl font-bold sm:text-3xl md:text-4xl">Page Not Found</h2>
            <p className="text-base text-gray-600 sm:text-lg md:text-xl">
              Oops! The page you&apos;re looking for doesn&apos;t exist or has been moved.
            </p>
          </div>

          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
            <Link
              href="/"
              className="w-full cursor-pointer rounded-lg border-2 border-emerald-600 bg-emerald-600 px-6 py-3 text-center text-base font-semibold text-white transition-colors hover:border-emerald-700 hover:bg-emerald-700 sm:w-auto"
            >
              Go to Homepage
            </Link>
            <Link
              href="/installation/"
              className="w-full cursor-pointer rounded-lg border-2 border-emerald-600 bg-white px-6 py-3 text-center text-base font-semibold transition-colors hover:border-emerald-700 hover:bg-emerald-50 sm:w-auto"
            >
              View Documentation
            </Link>
          </div>

          <div className="mt-12">
            <p className="mb-4 text-gray-600">You might find these helpful:</p>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/#features"
                  className="text-emerald-600 underline decoration-emerald-600 underline-offset-2 transition-colors hover:text-emerald-700"
                >
                  How to use Log Bull in your code
                </Link>
              </li>
              <li>
                <Link
                  href="/#installation"
                  className="text-emerald-600 underline decoration-emerald-600 underline-offset-2 transition-colors hover:text-emerald-700"
                >
                  Installation Guide
                </Link>
              </li>
              <li>
                <a
                  href="https://github.com/logbull/logbull"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-600 underline decoration-emerald-600 underline-offset-2 transition-colors hover:text-emerald-700"
                >
                  GitHub Repository
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      {/* ======================== 404 CONTENT ======================== */}
    </>
  );
}
