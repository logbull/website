import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy - Log Bull',
  description: 'Privacy Policy for Log Bull - Learn how we collect, use, and protect your data',
  robots: 'index, follow',
};

export default function PrivacyPage() {
  return (
    <>
      {/* ======================== NAVBAR ======================== */}
      <nav className="fixed top-0 z-50 flex h-[60px] w-full justify-center bg-white sm:h-[70px] md:h-[80px]">
        <div className="flex min-w-0 grow items-center border-b border-gray-200 px-10">
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

          <a
            className="ml-auto"
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
        <div className="mx-auto max-w-[340px] sm:max-w-[600px] md:max-w-[900px]">
          <main className="prose prose-emerald max-w-none">
            <h1 className="text-3xl font-bold sm:text-4xl md:text-5xl">Privacy Policy</h1>

            <p className="text-lg text-gray-600">
              Last updated:{' '}
              {new Date().toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>

            <div className="mt-8 space-y-8">
              <section>
                <h2 className="text-2xl font-semibold">1. Introduction</h2>
                <p>
                  Welcome to Log Bull. This Privacy Policy explains how we collect, use, disclose,
                  and safeguard your information when you use our self-hosted log collection system
                  and related services. Please read this privacy policy carefully. If you do not
                  agree with the terms of this privacy policy, please do not access the application.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold">2. Information We Collect</h2>

                <h3 className="mt-4 text-xl font-semibold">2.1 Information from Google OAuth</h3>
                <p>
                  When you choose to sign in using Google OAuth, we collect the following
                  information from your Google account:
                </p>
                <ul className="list-disc space-y-2 pl-6">
                  <li>
                    <strong>Email address:</strong> Used for account identification and
                    communication
                  </li>
                  <li>
                    <strong>Name:</strong> Used to personalize your experience
                  </li>
                  <li>
                    <strong>Profile picture:</strong> Used to display your avatar in the application
                  </li>
                  <li>
                    <strong>Google user ID:</strong> Used to uniquely identify your account
                  </li>
                </ul>

                <h3 className="mt-4 text-xl font-semibold">2.2 Usage Data</h3>
                <p>
                  We automatically collect certain information when you use Log Bull, including:
                </p>
                <ul className="list-disc space-y-2 pl-6">
                  <li>Log data and error messages sent to the system</li>
                  <li>Project configurations and settings</li>
                  <li>API usage statistics</li>
                  <li>Audit logs of user actions within the system</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold">3. How We Use Your Information</h2>
                <p>We use the information we collect for the following purposes:</p>
                <ul className="list-disc space-y-2 pl-6">
                  <li>
                    <strong>Account Management:</strong> To create and manage your user account
                  </li>
                  <li>
                    <strong>Authentication:</strong> To verify your identity and provide secure
                    access
                  </li>
                  <li>
                    <strong>Service Delivery:</strong> To provide, operate, and maintain our log
                    collection services
                  </li>
                  <li>
                    <strong>Communication:</strong> To send you important updates about the service
                  </li>
                  <li>
                    <strong>Improvement:</strong> To analyze usage patterns and improve our services
                  </li>
                  <li>
                    <strong>Security:</strong> To monitor and prevent security incidents
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold">4. Data Storage and Security</h2>

                <h3 className="mt-4 text-xl font-semibold">4.1 Self-Hosted Nature</h3>
                <p>Log Bull is a self-hosted application. This means that:</p>
                <ul className="list-disc space-y-2 pl-6">
                  <li>All log data and application data are stored on your own infrastructure</li>
                  <li>You have complete control over where your data is stored</li>
                  <li>
                    No data is transmitted to external servers (except for OAuth authentication)
                  </li>
                  <li>
                    You are responsible for implementing appropriate security measures for your
                    installation
                  </li>
                </ul>

                <h3 className="mt-4 text-xl font-semibold">4.2 Security Measures</h3>
                <p>
                  We implement appropriate technical and organizational security measures to protect
                  your information, including:
                </p>
                <ul className="list-disc space-y-2 pl-6">
                  <li>Encryption of data in transit using HTTPS/TLS</li>
                  <li>Secure authentication mechanisms</li>
                  <li>Access controls and user permission management</li>
                  <li>Regular security updates and patches</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold">5. Google OAuth and Third-Party Services</h2>
                <p>When you use Google OAuth to sign in:</p>
                <ul className="list-disc space-y-2 pl-6">
                  <li>Your authentication is handled directly by Google</li>
                  <li>We only receive the information you authorize Google to share with us</li>
                  <li>We do not store your Google password</li>
                  <li>
                    Google&apos;s Privacy Policy also applies to your use of Google OAuth:{' '}
                    <a
                      href="https://policies.google.com/privacy"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-600 underline"
                    >
                      https://policies.google.com/privacy
                    </a>
                  </li>
                </ul>
                <p className="mt-4">
                  <strong>
                    Log Bull&apos;s use of information received from Google APIs adheres to the{' '}
                    <a
                      href="https://developers.google.com/terms/api-services-user-data-policy"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-600 underline"
                    >
                      Google API Services User Data Policy
                    </a>
                    , including the Limited Use requirements.
                  </strong>
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold">6. Data Sharing and Disclosure</h2>
                <p>
                  We do not sell, trade, or rent your personal information to third parties. We may
                  share your information only in the following circumstances:
                </p>
                <ul className="list-disc space-y-2 pl-6">
                  <li>
                    <strong>With Your Consent:</strong> When you explicitly authorize us to share
                    specific information
                  </li>
                  <li>
                    <strong>Legal Requirements:</strong> When required by law or to respond to legal
                    processes
                  </li>
                  <li>
                    <strong>Security and Protection:</strong> To protect our rights, privacy,
                    safety, or property
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold">7. Your Data Rights</h2>
                <p>You have the following rights regarding your personal information:</p>
                <ul className="list-disc space-y-2 pl-6">
                  <li>
                    <strong>Access:</strong> Request access to the personal information we hold
                    about you
                  </li>
                  <li>
                    <strong>Correction:</strong> Request correction of inaccurate or incomplete
                    information
                  </li>
                  <li>
                    <strong>Deletion:</strong> Request deletion of your personal information
                  </li>
                  <li>
                    <strong>Export:</strong> Request a copy of your data in a portable format
                  </li>
                  <li>
                    <strong>Revoke OAuth:</strong> Disconnect your Google account at any time
                    through your Google account settings
                  </li>
                </ul>
                <p className="mt-4">
                  Since Log Bull is self-hosted, you can also directly access and manage your data
                  through your own installation.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold">8. Data Retention</h2>
                <p>
                  We retain your personal information only for as long as necessary to fulfill the
                  purposes outlined in this Privacy Policy, unless a longer retention period is
                  required or permitted by law. Log retention policies can be configured within your
                  Log Bull installation.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold">9. Children&apos;s Privacy</h2>
                <p>
                  Log Bull is not intended for use by children under the age of 13. We do not
                  knowingly collect personal information from children under 13. If you believe we
                  have collected information from a child under 13, please contact us immediately.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold">10. International Data Transfers</h2>
                <p>
                  Since Log Bull is self-hosted, your data is stored on your own infrastructure in
                  your chosen location. When using Google OAuth, your authentication data may be
                  processed by Google&apos;s servers, which may be located in different countries.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold">11. Changes to This Privacy Policy</h2>
                <p>
                  We may update this Privacy Policy from time to time. We will notify you of any
                  changes by posting the new Privacy Policy on this page and updating the &quot;Last
                  updated&quot; date. You are advised to review this Privacy Policy periodically for
                  any changes.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold">12. Open Source</h2>
                <p>
                  Log Bull is open source software licensed under the Apache 2.0 License. You can
                  review the complete source code at{' '}
                  <a
                    href="https://github.com/logbull/logbull"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-emerald-600 underline"
                  >
                    https://github.com/logbull/logbull
                  </a>
                  . This transparency allows you to verify how your data is handled.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold">13. Contact Us</h2>
                <p>
                  If you have any questions about this Privacy Policy or our data practices, please
                  contact us:
                </p>
                <ul className="list-disc space-y-2 pl-6">
                  <li>
                    <strong>Website:</strong>{' '}
                    <a href="https://logbull.com" className="text-emerald-600 underline">
                      https://logbull.com
                    </a>
                  </li>
                  <li>
                    <strong>GitHub:</strong>{' '}
                    <a
                      href="https://github.com/logbull/logbull"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-600 underline"
                    >
                      https://github.com/logbull/logbull
                    </a>
                  </li>
                  <li>
                    <strong>Community:</strong>{' '}
                    <a
                      href="https://t.me/logbull_community"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-600 underline"
                    >
                      https://t.me/logbull_community
                    </a>
                  </li>
                  <li>
                    <strong>Developer:</strong>{' '}
                    <a
                      href="https://rostislav-dugin.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-600 underline"
                    >
                      https://rostislav-dugin.com
                    </a>
                  </li>
                </ul>
              </section>
            </div>
          </main>
        </div>
      </div>
      {/* ======================== MAIN CONTENT ======================== */}

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
                href="https://rostislav-dugin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-emerald-200"
              >
                Contact developer
              </a>

              <a href="/privacy/" className="transition-colors hover:text-emerald-200">
                Privacy Policy
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
