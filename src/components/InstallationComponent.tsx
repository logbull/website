'use client';

import { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism';

type InstallMethod = 'Automated Script' | 'Docker Run' | 'Docker Compose';

type ScriptVariant = {
  label: string;
  code: string;
};

type Installation = {
  label: string;
  code: string | ScriptVariant[];
  language: string;
  description?: string;
};

const installationMethods: Record<InstallMethod, Installation> = {
  'Automated Script': {
    label: '.sh script (recommended)',
    language: 'bash',
    description:
      'The installation script will install Docker with Docker Compose (if not already installed), set up LogBull, and configure automatic startup on system reboot. Linux only.',
    code: [
      {
        label: 'with sudo',
        code: `sudo apt-get install -y curl && \\
sudo curl -sSL https://raw.githubusercontent.com/logbull/logbull/main/install-logbull.sh \\
| sudo bash`,
      },
      {
        label: 'without sudo',
        code: `apt-get install -y curl && \\
curl -sSL https://raw.githubusercontent.com/logbull/logbull/main/install-logbull.sh \\
| bash`,
      },
    ],
  },
  'Docker Run': {
    label: 'Docker',
    language: 'bash',
    description:
      'The easiest way to run LogBull. This single command will start LogBull, store all data in ./logbull-data directory, and automatically restart on system reboot.',
    code: `docker run -d \\
  --name logbull \\
  -p 4005:4005 \\
  -v ./logbull-data:/logbull-data \\
  --restart unless-stopped \\
  --health-cmd="curl -f http://localhost:4005/api/v1/system/health || exit 1" \\
  --health-interval=5s \\
  --health-retries=30 \\
  logbull/logbull:latest`,
  },
  'Docker Compose': {
    label: 'Docker Compose',
    language: 'yaml',
    description:
      'Create a docker-compose.yml file with the following configuration, then run: docker compose up -d',
    code: `services:
  logbull:
    container_name: logbull
    image: logbull/logbull:latest
    ports:
      - "4005:4005"
    volumes:
      - ./logbull-data:/logbull-data
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:4005/api/v1/system/health"]
      interval: 5s
      timeout: 5s
      retries: 30`,
  },
};

const methods: InstallMethod[] = ['Automated Script', 'Docker Run', 'Docker Compose'];

export function InstallationComponent() {
  const [selectedMethod, setSelectedMethod] = useState<InstallMethod>('Automated Script');
  const [selectedVariant, setSelectedVariant] = useState(0);
  const [copied, setCopied] = useState(false);

  const currentInstallation = installationMethods[selectedMethod];
  const hasVariants = Array.isArray(currentInstallation.code);

  const handleMethodChange = (method: InstallMethod) => {
    setSelectedMethod(method);
    setSelectedVariant(0);
    setCopied(false);
  };

  const handleVariantChange = (index: number) => {
    setSelectedVariant(index);
    setCopied(false);
  };

  const getCurrentCode = () => {
    if (hasVariants) {
      return (currentInstallation.code as ScriptVariant[])[selectedVariant].code;
    }
    return currentInstallation.code as string;
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(getCurrentCode());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="mx-auto max-w-[900px]">
      {/* Installation methods tabs */}
      <div className="mb-4 flex flex-wrap gap-2">
        {methods.map((method) => (
          <button
            key={method}
            onClick={() => handleMethodChange(method)}
            className={`cursor-pointer rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
              selectedMethod === method
                ? 'bg-emerald-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {installationMethods[method].label}
          </button>
        ))}
      </div>

      {/* Script variants tabs (only for Automated Script) */}
      {hasVariants && (
        <div className="mb-4 flex flex-wrap gap-2">
          {(currentInstallation.code as ScriptVariant[]).map((variant, index) => (
            <button
              key={index}
              onClick={() => handleVariantChange(index)}
              className={`cursor-pointer rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                selectedVariant === index
                  ? 'bg-blue-100 text-blue-700 ring-2 ring-blue-600'
                  : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
              }`}
            >
              {variant.label}
            </button>
          ))}
        </div>
      )}

      {/* Description */}
      {currentInstallation.description && (
        <div className="mb-4 rounded-lg py-3">{currentInstallation.description}</div>
      )}

      {/* Code block */}
      <div className="relative overflow-auto rounded-lg bg-[#2d2d2d] shadow-lg">
        {/* Copy button */}
        <button
          onClick={handleCopy}
          className="absolute right-4 top-4 z-10 cursor-pointer rounded-md bg-gray-700 px-3 py-1.5 text-sm font-medium text-white transition-colors hover:bg-gray-600"
        >
          {copied ? (
            <span className="flex items-center gap-1">
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              Copied!
            </span>
          ) : (
            <span className="flex items-center gap-1">
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                />
              </svg>
              Copy
            </span>
          )}
        </button>

        {/* Syntax highlighted code */}
        <div className="m-0 rounded-lg p-6 pr-20 text-sm leading-6">
          <SyntaxHighlighter
            language={currentInstallation.language}
            style={tomorrow}
            customStyle={{
              margin: 0,
              padding: 0,
              background: 'transparent',
            }}
            showLineNumbers={false}
          >
            {getCurrentCode()}
          </SyntaxHighlighter>
        </div>
      </div>
    </div>
  );
}
