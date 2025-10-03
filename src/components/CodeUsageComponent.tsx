'use client';

import { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism';

type Language = 'Python' | 'Go' | 'Java' | 'PHP' | 'JavaScript' | 'Ruby';

type Integration = {
  label: string;
  code: string;
  language: string;
};

type LanguageConfig = {
  installation: string;
  installCommand: string;
  integrations: Integration[];
};

const languageConfigs: Record<Language, LanguageConfig> = {
  Python: {
    installation: 'pip install logbull',
    installCommand: 'bash',
    integrations: [
      {
        label: 'LogBull Standalone',
        language: 'python',
        code: `from logbull import LogBullLogger

# Initialize logger
logger = LogBullLogger(
    project_id="YOUR_PROJECT_ID",
    host="http://your-logbull-server:4005",
    api_key="YOUR_API_KEY"  # optional
)

# Log messages (printed to console AND sent to LogBull)
logger.info("User logged in successfully", fields={
    "user_id": "12345",
    "username": "john_doe",
    "ip": "192.168.1.100"
})

# With context
session_logger = logger.with_context({
    "session_id": "sess_abc123",
    "user_id": "user_456"
})

session_logger.info("Processing request", fields={
    "action": "purchase"
})`,
      },
      {
        label: 'logging',
        language: 'python',
        code: `import logging
from logbull import LogBullHandler

# Setup standard Python logger with LogBull handler
logger = logging.getLogger(__name__)
logger.setLevel(logging.INFO)

logbull_handler = LogBullHandler(
    project_id="YOUR_PROJECT_ID",
    host="http://YOUR_LOGBULL_SERVER:4005",
    api_key="YOUR_API_KEY"  # optional
)
logger.addHandler(logbull_handler)

# Use standard logging - logs automatically sent to LogBull
logger.info("Execution completed", extra={
    "bot_id": "bot_123",
    "status": "success"
})

logger.error("Database error", extra={
    "query": "SELECT * FROM users",
    "error": "Connection timeout"
})`,
      },
      {
        label: 'Loguru',
        language: 'python',
        code: `from loguru import logger
from logbull import LoguruSink

# Add LogBull as a Loguru sink
logger.add(
    LoguruSink(
        project_id="YOUR_PROJECT_ID",
        host="http://YOUR_LOGBULL_SERVER:4005",
        api_key="YOUR_API_KEY"  # optional
    ),
    level="INFO",
    format="{time} | {level} | {message}",
    serialize=True
)

# Use Loguru as usual - logs automatically sent to LogBull
logger.info("User action", 
    user_id=12345, 
    action="login", 
    ip="192.168.1.100"
)

# Bind context for multiple logs
bound_logger = logger.bind(
    request_id="req_789", 
    session_id="sess_456"
)
bound_logger.info("Request started")
bound_logger.info("Request completed", duration_ms=250)`,
      },
      {
        label: 'Structlog',
        language: 'python',
        code: `import structlog
from logbull import StructlogProcessor

# Configure structlog with LogBull processor
structlog.configure(
    processors=[
        structlog.contextvars.merge_contextvars,
        structlog.processors.TimeStamper(fmt="iso"),
        structlog.processors.add_log_level,
        StructlogProcessor(
            project_id="YOUR_PROJECT_ID",
            host="http://YOUR_LOGBULL_SERVER:4005",
            api_key="YOUR_API_KEY"  # optional
        ),
        structlog.processors.JSONRenderer(),
    ],
    wrapper_class=structlog.make_filtering_bound_logger(20),
    logger_factory=structlog.WriteLoggerFactory(),
    cache_logger_on_first_use=True,
)

logger = structlog.get_logger()

# Use structlog - logs processed and sent to LogBull
logger.info("API request",
    method="POST",
    path="/api/users",
    status_code=201,
    response_time_ms=45
)`,
      },
    ],
  },
  Go: {
    installation: 'go get github.com/logbull/logbull-go',
    installCommand: 'bash',
    integrations: [
      {
        label: 'LogBull Standalone',
        language: 'go',
        code: `package main

import "github.com/logbull/logbull-go/logbull"

func main() {
    logger, err := logbull.NewLogger(logbull.Config{
        ProjectID: "YOUR_PROJECT_ID",
        Host:      "http://localhost:4005",
        APIKey:    "your-api-key", // optional
        LogLevel:  logbull.INFO,
    })
    if err != nil {
        panic(err)
    }
    defer logger.Shutdown()

    logger.Info("User logged in successfully", map[string]any{
        "user_id":  "12345",
        "username": "john_doe",
        "ip":       "192.168.1.100",
    })

    // With context
    sessionLogger := logger.WithContext(map[string]any{
        "session_id": "sess_abc123",
        "user_id":    "user_456",
    })

    sessionLogger.Info("Processing user request", map[string]any{
        "action": "purchase",
        "amount": 99.99,
    })
}`,
      },
      {
        label: 'slog',
        language: 'go',
        code: `package main

import (
    "log/slog"
    "github.com/logbull/logbull-go/logbull"
)

func main() {
    handler, err := logbull.NewSlogHandler(logbull.Config{
        ProjectID: "YOUR_PROJECT_ID",
        Host:      "http://YOUR_LOGBULL_SERVER:4005",
        APIKey:    "YOUR_API_KEY",
    })
    if err != nil {
        panic(err)
    }
    defer handler.Shutdown()

    logger := slog.New(handler)

    logger.Info("User action",
        slog.String("user_id", "12345"),
        slog.Int("action_id", 42),
    )

    logger.Info("Request processed",
        slog.Group("request",
            slog.String("method", "POST"),
            slog.String("path", "/api/users"),
            slog.Int("status", 201),
        ),
    )
}`,
      },
      {
        label: 'Zap',
        language: 'go',
        code: `package main

import (
    "go.uber.org/zap"
    "github.com/logbull/logbull-go/logbull"
)

func main() {
    core, err := logbull.NewZapCore(logbull.Config{
        ProjectID: "YOUR_PROJECT_ID",
        Host:      "http://YOUR_LOGBULL_SERVER:4005",
        APIKey:    "YOUR_API_KEY",
        LogLevel:  logbull.INFO,
    })
    if err != nil {
        panic(err)
    }
    defer core.Shutdown()

    logger := zap.New(core)

    logger.Info("User action",
        zap.String("user_id", "12345"),
        zap.Int("action_id", 42),
    )

    logger.Error("Processing failed",
        zap.String("component", "payment"),
        zap.String("error", "connection timeout"),
    )

    logger.Sync()
}`,
      },
      {
        label: 'Logrus',
        language: 'go',
        code: `package main

import (
    "github.com/sirupsen/logrus"
    "github.com/logbull/logbull-go/logbull"
)

func main() {
    hook, err := logbull.NewLogrusHook(logbull.Config{
        ProjectID: "YOUR_PROJECT_ID",
        Host:      "http://YOUR_LOGBULL_SERVER:4005",
        APIKey:    "YOUR_API_KEY",
        LogLevel:  logbull.INFO,
    })
    if err != nil {
        panic(err)
    }
    defer hook.Shutdown()

    logrus.AddHook(hook)

    logrus.WithFields(logrus.Fields{
        "user_id": "12345",
        "action":  "login",
    }).Info("User action")

    logrus.WithFields(logrus.Fields{
        "order_id": "ord_123",
        "amount":   99.99,
    }).Error("Payment failed")
}`,
      },
    ],
  },
  Java: {
    installation: 'Coming soon',
    installCommand: 'text',
    integrations: [
      {
        label: 'Coming Soon',
        language: 'text',
        code: 'Java integration is coming soon!\n\nStay tuned for updates.',
      },
    ],
  },
  PHP: {
    installation: 'Coming soon',
    installCommand: 'text',
    integrations: [
      {
        label: 'Coming Soon',
        language: 'text',
        code: 'PHP integration is coming soon!\n\nStay tuned for updates.',
      },
    ],
  },
  JavaScript: {
    installation: 'Coming soon',
    installCommand: 'text',
    integrations: [
      {
        label: 'Coming Soon',
        language: 'text',
        code: 'JavaScript integration is coming soon!\n\nStay tuned for updates.',
      },
    ],
  },
  Ruby: {
    installation: 'Coming soon',
    installCommand: 'text',
    integrations: [
      {
        label: 'Coming Soon',
        language: 'text',
        code: 'Ruby integration is coming soon!\n\nStay tuned for updates.',
      },
    ],
  },
};

const languages: Language[] = ['Python', 'Go', 'Java', 'PHP', 'JavaScript', 'Ruby'];

export function CodeUsageComponent() {
  const [selectedLanguage, setSelectedLanguage] = useState<Language>('Python');
  const [selectedIntegration, setSelectedIntegration] = useState(0);
  const [copied, setCopied] = useState(false);

  const currentConfig = languageConfigs[selectedLanguage];
  const currentIntegration = currentConfig.integrations[selectedIntegration];

  const handleLanguageChange = (language: Language) => {
    setSelectedLanguage(language);
    setSelectedIntegration(0); // Reset to first tab
    setCopied(false);
  };

  const handleIntegrationChange = (index: number) => {
    setSelectedIntegration(index);
    setCopied(false);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(currentIntegration.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="mx-auto max-w-[900px]">
      {/* First row: Languages */}
      <div className="mb-4 flex flex-wrap gap-2">
        {languages.map((lang) => (
          <button
            key={lang}
            onClick={() => handleLanguageChange(lang)}
            className={`cursor-pointer rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
              selectedLanguage === lang
                ? 'bg-emerald-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {lang}
          </button>
        ))}
      </div>

      {/* Installation section */}
      <div className="mb-4 overflow-hidden rounded-lg bg-gray-50 p-4">
        <div className="mb-2 text-sm font-semibold text-gray-700">Installation</div>
        <div className="relative overflow-auto rounded-md bg-[#2d2d2d] p-4">
          <SyntaxHighlighter
            language={currentConfig.installCommand}
            style={tomorrow}
            customStyle={{
              margin: 0,
              padding: 0,
              background: 'transparent',
              fontSize: '0.875rem',
            }}
            showLineNumbers={false}
          >
            {currentConfig.installation}
          </SyntaxHighlighter>
        </div>
      </div>

      {/* Second row: Integrations */}
      <div className="mb-4 flex flex-wrap gap-2">
        {currentConfig.integrations.map((integration, index) => (
          <button
            key={index}
            onClick={() => handleIntegrationChange(index)}
            className={`cursor-pointer rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
              selectedIntegration === index
                ? 'bg-emerald-100 text-emerald-700 ring-2 ring-emerald-600'
                : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
            }`}
          >
            {integration.label}
          </button>
        ))}
      </div>

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
            language={currentIntegration.language}
            style={tomorrow}
            customStyle={{
              margin: 0,
              padding: 0,
              background: 'transparent',
            }}
            showLineNumbers={false}
          >
            {currentIntegration.code}
          </SyntaxHighlighter>
        </div>
      </div>
    </div>
  );
}
