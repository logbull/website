'use client';

import { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism';

type Language = 'Python' | 'Go' | 'Java' | 'PHP' | 'JavaScript' | 'Ruby' | 'cURL' | 'C#' | 'Rust';

type Integration = {
  label: string;
  code: string | ((installMethod: number) => string);
  language: string;
  configuration?: string;
};

type InstallationMethod = {
  label: string;
  command: string | ((integrationIndex: number) => string);
  language: string;
};

type LanguageConfig = {
  installation: string | InstallationMethod[];
  installCommand: string;
  integrations: Integration[];
};

const languageConfigs: Record<Language, LanguageConfig> = {
  Python: {
    installation: [
      {
        label: 'pip',
        language: 'bash',
        command: 'pip install logbull',
      },
      {
        label: 'uv',
        language: 'bash',
        command: 'uv add logbull',
      },
      {
        label: 'poetry',
        language: 'bash',
        command: 'poetry add logbull',
      },
    ],
    installCommand: 'bash',
    integrations: [
      {
        label: 'LogBull',
        language: 'python',
        code: `import time
from logbull import LogBullLogger

# Initialize logger
logger = LogBullLogger(
    host="http://LOGBULL_HOST_PLACEHOLDER",
    project_id="LOGBULL_PROJECT_ID_PLACEHOLDER",
    api_key="LOGBULL_API_KEY_PLACEHOLDER"  # optional, if you need it
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
})

# Ensure all logs are sent before exiting
logger.flush()
time.sleep(5)`,
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
    host="http://LOGBULL_HOST_PLACEHOLDER",
    project_id="LOGBULL_PROJECT_ID_PLACEHOLDER",
    api_key="LOGBULL_API_KEY_PLACEHOLDER"  # optional, if you need it
)
logger.addHandler(logbull_handler)

# Use standard logging - logs automatically sent to LogBull
logger.info("Execution log: %s", execution_log.text, extra={"bot_id": bot_id})
logger.warning("Rate limit approaching", extra={
    "current_requests": 950,
    "limit": 1000
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
        host="http://LOGBULL_HOST_PLACEHOLDER",
        project_id="LOGBULL_PROJECT_ID_PLACEHOLDER",
        api_key="LOGBULL_API_KEY_PLACEHOLDER"  # optional, if you need it
    ),
    level="INFO",
    format="{time} | {level} | {message}",
    serialize=True  # Captures structured data
)

# Use Loguru as usual - logs automatically sent to LogBull
logger.info("User action", user_id=12345, action="login", ip="192.168.1.100")
logger.error("Payment failed", order_id="ord_123", amount=99.99, currency="USD")

# Bind context for multiple logs
bound_logger = logger.bind(request_id="req_789", session_id="sess_456")
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
            host="http://LOGBULL_HOST_PLACEHOLDER",
            project_id="LOGBULL_PROJECT_ID_PLACEHOLDER",
            api_key="LOGBULL_API_KEY_PLACEHOLDER"  # optional, if you need it
        ),
        structlog.processors.JSONRenderer(), # make sure it is the last processor
    ],
    wrapper_class=structlog.make_filtering_bound_logger(20),  # INFO level
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
)

# With bound context
logger = logger.bind(correlation_id="corr_123", user_id="user_789")
logger.info("Processing payment", amount=150.00, currency="EUR")
logger.error("Payment gateway error",
    error_code="GATEWAY_TIMEOUT",
    retry_count=3
)`,
      },
    ],
  },
  Go: {
    installation: 'go get github.com/logbull/logbull-go',
    installCommand: 'bash',
    integrations: [
      {
        label: 'LogBull',
        language: 'go',
        code: `package main

import (
    "github.com/logbull/logbull-go/logbull"
)

func main() {
    logger, err := logbull.NewLogger(logbull.Config{
        Host:      "http://LOGBULL_HOST_PLACEHOLDER",
        ProjectID: "LOGBULL_PROJECT_ID_PLACEHOLDER",
        APIKey:    "LOGBULL_API_KEY_PLACEHOLDER", // optional
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

    // Ensure all logs are sent before exiting
    logger.Flush()
    time.Sleep(5 * time.Second)
}`,
      },
      {
        label: 'slog',
        language: 'go',
        code: `package main

import (
    "log/slog"
    "time"

    "github.com/logbull/logbull-go/logbull"
)

func main() {
    handler, err := logbull.NewSlogHandler(logbull.Config{
        Host:      "http://LOGBULL_HOST_PLACEHOLDER",
        ProjectID: "LOGBULL_PROJECT_ID_PLACEHOLDER",
        APIKey:    "LOGBULL_API_KEY_PLACEHOLDER",
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

    handler.Flush()
    time.Sleep(2 * time.Second) // wait for logs to be sent
}`,
      },
      {
        label: 'Zap',
        language: 'go',
        code: `package main

import (
    "time"

    "go.uber.org/zap"

    "github.com/logbull/logbull-go/logbull"
)

func main() {
    core, err := logbull.NewZapCore(logbull.Config{
        Host:      "http://LOGBULL_HOST_PLACEHOLDER",
        ProjectID: "LOGBULL_PROJECT_ID_PLACEHOLDER",
        APIKey:    "LOGBULL_API_KEY_PLACEHOLDER",
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
    time.Sleep(2 * time.Second) // wait for logs to be sent
}`,
      },
      {
        label: 'Logrus',
        language: 'go',
        code: `package main

import (
    "time"

    "github.com/sirupsen/logrus"

    "github.com/logbull/logbull-go/logbull"
)

func main() {
    hook, err := logbull.NewLogrusHook(logbull.Config{
        Host:      "http://LOGBULL_HOST_PLACEHOLDER",
        ProjectID: "LOGBULL_PROJECT_ID_PLACEHOLDER",
        APIKey:    "LOGBULL_API_KEY_PLACEHOLDER",
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

    hook.Flush()
    time.Sleep(2 * time.Second) // wait for logs to be sent
}`,
      },
    ],
  },
  Java: {
    installation: [
      {
        label: 'Maven',
        language: 'xml',
        command: (integrationIndex: number) => {
          // Spring Boot needs both dependencies
          if (integrationIndex === 0) {
            return `<dependency>
    <groupId>com.logbull</groupId>
    <artifactId>logbull</artifactId>
    <version>RELEASE</version>
</dependency>

<dependency>
    <groupId>com.logbull</groupId>
    <artifactId>logbull-spring-boot-starter</artifactId>
    <version>RELEASE</version>
</dependency>`;
          }
          // Logback and LogBull only need core
          return `<dependency>
    <groupId>com.logbull</groupId>
    <artifactId>logbull</artifactId>
    <version>RELEASE</version>
</dependency>`;
        },
      },
      {
        label: 'Gradle',
        language: 'groovy',
        command: (integrationIndex: number) => {
          // Spring Boot needs both dependencies
          if (integrationIndex === 0) {
            return `implementation 'com.logbull:logbull:+'
implementation 'com.logbull:logbull-spring-boot-starter:+'`;
          }
          // Logback and LogBull only need core
          return `implementation 'com.logbull:logbull:+'`;
        },
      },
    ],
    installCommand: 'xml',
    integrations: [
      {
        label: 'Spring Boot',
        language: 'java',
        configuration: `# application.yml
logbull:
  enabled: true
  project-id: LOGBULL_PROJECT_ID_PLACEHOLDER
  host: http://LOGBULL_HOST_PLACEHOLDER
  api-key: LOGBULL_API_KEY_PLACEHOLDER
  log-level: INFO

# application.properties
logbull.enabled=true
logbull.project-id=LOGBULL_PROJECT_ID_PLACEHOLDER
logbull.host=http://LOGBULL_HOST_PLACEHOLDER
logbull.api-key=LOGBULL_API_KEY_PLACEHOLDER
logbull.log-level=INFO`,
        code: `import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

@Service
public class PaymentService {
    private static final Logger logger = LoggerFactory.getLogger(PaymentService.class);

    public void processPayment(String orderId, double amount) {
        // Logs automatically sent to LogBull
        logger.info("Processing payment for order: {}, amount: {}", orderId, amount);
    }
}`,
      },
      {
        label: 'Logback + SLF4J',
        language: 'xml',
        configuration: `<!-- logback.xml -->
<?xml version="1.0" encoding="UTF-8"?>
<configuration>
    <appender name="CONSOLE" class="ch.qos.logback.core.ConsoleAppender">
        <encoder>
            <pattern>%d{HH:mm:ss.SSS} [%thread] %-5level %logger{36} - %msg%n</pattern>
        </encoder>
    </appender>

    <appender name="LOGBULL" class="com.logbull.slf4j.LogBullLogbackAppender">
        <projectId>LOGBULL_PROJECT_ID_PLACEHOLDER</projectId>
        <host>http://LOGBULL_HOST_PLACEHOLDER</host>
        <apiKey>LOGBULL_API_KEY_PLACEHOLDER</apiKey>
        <logLevel>INFO</logLevel>
    </appender>

    <root level="INFO">
        <appender-ref ref="CONSOLE" />
        <appender-ref ref="LOGBULL" />
    </root>
</configuration>`,
        code: `import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.slf4j.MDC;

public class LogbackExample {
    private static final Logger logger = LoggerFactory.getLogger(LogbackExample.class);

    public static void main(String[] args) {
        logger.info("Application started");

        // Using MDC for context
        MDC.put("session_id", "sess_abc123");
        MDC.put("user_id", "user_456");

        try {
            logger.info("Processing user request");
        } finally {
            MDC.clear();
        }
    }
}`,
      },
      {
        label: 'LogBull',
        language: 'java',
        code: `import com.logbull.LogBullLogger;
import com.logbull.core.LogLevel;

import java.util.Map;

public class Application {
    public static void main(String[] args) {
        LogBullLogger logger = LogBullLogger.builder()
            .host("http://LOGBULL_HOST_PLACEHOLDER")
            .projectId("LOGBULL_PROJECT_ID_PLACEHOLDER")
            .apiKey("LOGBULL_API_KEY_PLACEHOLDER")  // optional
            .logLevel(LogLevel.INFO)
            .build();

        try {
            logger.info("User logged in successfully", Map.of(
                "user_id", "12345",
                "username", "john_doe",
                "ip", "192.168.1.100"
            ));

            // With context
            LogBullLogger sessionLogger = logger.withContext(Map.of(
                "session_id", "sess_abc123",
                "user_id", "user_456"
            ));

            sessionLogger.info("Processing request", Map.of(
                "action", "purchase"
            ));

            // Ensure all logs are sent before exiting
            logger.flush();
            Thread.sleep(5000);
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        } finally {
            logger.shutdown();
        }
    }
}`,
      },
    ],
  },
  PHP: {
    installation: 'composer require logbull/logbull',
    installCommand: 'bash',
    integrations: [
      {
        label: 'LogBull',
        language: 'php',
        code: `<?php

use LogBull\\Core\\LogBullLogger;

$logger = new LogBullLogger(
    projectId: 'LOGBULL_PROJECT_ID_PLACEHOLDER',
    host: 'http://LOGBULL_HOST_PLACEHOLDER',
    apiKey: 'LOGBULL_API_KEY_PLACEHOLDER' // optional
);

$logger->info('User logged in successfully', [
    'user_id' => '12345',
    'username' => 'john_doe',
    'ip' => '192.168.1.100'
]);

// Ensure all logs are sent before exiting
$logger->flush();
sleep(2);`,
      },
      {
        label: 'Monolog',
        language: 'php',
        code: `<?php

use Monolog\\Logger;
use Monolog\\Level;
use LogBull\\Handlers\\MonologHandler;

$handler = new MonologHandler(
    projectId: 'LOGBULL_PROJECT_ID_PLACEHOLDER',
    host: 'http://LOGBULL_HOST_PLACEHOLDER',
    apiKey: 'LOGBULL_API_KEY_PLACEHOLDER', // optional
    level: Level::Info
);

$logger = new Logger('app');
$logger->pushHandler($handler);

$logger->info('User action', [
    'user_id' => '12345',
    'action' => 'login',
    'ip' => '192.168.1.100'
]);

// Ensure all logs are sent before exiting
$handler->flush();
sleep(2);`,
      },
      {
        label: 'PSR-3',
        language: 'php',
        code: `<?php

use LogBull\\Handlers\\PSR3Logger;
use LogBull\\Core\\Types;

$logger = new PSR3Logger(
    projectId: 'LOGBULL_PROJECT_ID_PLACEHOLDER',
    host: 'http://LOGBULL_HOST_PLACEHOLDER',
    apiKey: 'LOGBULL_API_KEY_PLACEHOLDER', // optional
    logLevel: Types::INFO
);

$logger->info('API request', [
    'method' => 'POST',
    'path' => '/api/users',
    'status_code' => 201
]);

// Ensure all logs are sent before exiting
$logger->flush();
sleep(2);`,
      },
      {
        label: 'Laravel',
        language: 'php',
        configuration: `// config/logging.php
'channels' => [
    'logbull' => [
        'driver' => 'custom',
        'via' => \\LogBull\\Handlers\\LaravelHandler::class,
        'project_id' => env('LOGBULL_PROJECT_ID_PLACEHOLDER'),
        'host' => env('LOGBULL_HOST_PLACEHOLDER'),
        'api_key' => env('LOGBULL_API_KEY_PLACEHOLDER'), // optional
        'level' => env('LOG_LEVEL', 'info'),
    ],
],

// .env
LOGBULL_PROJECT_ID=LOGBULL_PROJECT_ID_PLACEHOLDER
LOGBULL_HOST=http://LOGBULL_HOST_PLACEHOLDER
LOGBULL_API_KEY=LOGBULL_API_KEY_PLACEHOLDER`,
        code: `<?php

use Illuminate\\Support\\Facades\\Log;

// Use the logbull channel
Log::channel('logbull')->info('User logged in', [
    'user_id' => auth()->id(),
    'ip' => request()->ip()
]);

// Or set as default channel in .env: LOG_CHANNEL=logbull
Log::info('Order created', [
    'order_id' => $order->id,
    'total' => $order->total
]);`,
      },
    ],
  },
  JavaScript: {
    installation: [
      {
        label: 'npm',
        language: 'bash',
        command: 'npm install logbull',
      },
      {
        label: 'pnpm',
        language: 'bash',
        command: 'pnpm add logbull',
      },
      {
        label: 'yarn',
        language: 'bash',
        command: 'yarn add logbull',
      },
      {
        label: 'bun',
        language: 'bash',
        command: 'bun add logbull',
      },
    ],
    installCommand: 'bash',
    integrations: [
      {
        label: 'LogBull',
        language: 'typescript',
        code: `import { LogBullLogger, LogLevel } from "logbull";

// Initialize logger
const logger = new LogBullLogger({
  host: "http://LOGBULL_HOST_PLACEHOLDER",
  projectId: "LOGBULL_PROJECT_ID_PLACEHOLDER",
  apiKey: "LOGBULL_API_KEY_PLACEHOLDER", // optional
  logLevel: LogLevel.INFO,
});

// Basic logging
logger.info("User logged in successfully", {
  user_id: "12345",
  username: "john_doe",
  ip: "192.168.1.100",
});

logger.error("Database connection failed", {
  database: "users_db",
  error_code: 500,
});

// Context management
const sessionLogger = logger.withContext({
  session_id: "sess_abc123",
  user_id: "user_456",
});

sessionLogger.info("Processing request", {
  action: "purchase",
});

// Ensure all logs are sent before exiting
logger.flush();
await new Promise(resolve => setTimeout(resolve, 5000));`,
      },
      {
        label: 'Winston',
        language: 'typescript',
        code: `import winston from "winston";
import { LogBullTransport } from "logbull";

// Create Winston logger with LogBull transport
const logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  transports: [
    new winston.transports.Console(),
    new LogBullTransport({
      host: "http://LOGBULL_HOST_PLACEHOLDER",
      projectId: "LOGBULL_PROJECT_ID_PLACEHOLDER",
      apiKey: "LOGBULL_API_KEY_PLACEHOLDER", // optional
    }),
  ],
});

// Use standard Winston logging
logger.info("User action", {
  user_id: "12345",
  action: "login",
  ip: "192.168.1.100",
});

logger.error("Payment failed", {
  order_id: "ord_123",
  amount: 99.99,
  currency: "USD",
});

// Winston child logger (context)
const requestLogger = logger.child({
  request_id: "req_789",
  session_id: "sess_456",
});

requestLogger.info("Request started");
requestLogger.info("Request completed", { duration_ms: 250 });

// Ensure all logs are sent before exiting
logger.flush();
await new Promise(resolve => setTimeout(resolve, 5000));`,
      },
      {
        label: 'Pino',
        language: 'typescript',
        code: `import pino from "pino";
import { createPinoTransport } from "logbull";

// Create Pino logger with LogBull transport
const transport = createPinoTransport({
  host: "http://LOGBULL_HOST_PLACEHOLDER",
  projectId: "LOGBULL_PROJECT_ID_PLACEHOLDER",
  apiKey: "LOGBULL_API_KEY_PLACEHOLDER", // optional
});

const logger = pino({ level: "info" }, transport);

// Use standard Pino logging
logger.info(
  {
    user_id: "12345",
    action: "login",
    ip: "192.168.1.100",
  },
  "User action"
);

logger.error(
  {
    order_id: "ord_123",
    amount: 99.99,
    currency: "USD",
  },
  "Payment failed"
);

// Pino child logger (context)
const requestLogger = logger.child({
  request_id: "req_789",
  session_id: "sess_456",
});

requestLogger.info("Request started");
requestLogger.info({ duration_ms: 250 }, "Request completed");

// Ensure all logs are sent before exiting
logger.flush();
await new Promise(resolve => setTimeout(resolve, 5000));`,
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
  'C#': {
    installation: 'dotnet add package LogBull',
    installCommand: 'bash',
    integrations: [
      {
        label: 'LogBull',
        language: 'csharp',
        code: `using LogBull;
using LogBull.Core;

var logger = LogBullLogger.CreateBuilder()
    .WithProjectId("LOGBULL_PROJECT_ID_PLACEHOLDER")
    .WithHost("http://LOGBULL_HOST_PLACEHOLDER")
    .WithApiKey("LOGBULL_API_KEY_PLACEHOLDER") // optional
    .WithLogLevel(LogLevel.INFO)
    .Build();

logger.Info("User logged in successfully", new Dictionary<string, object>
{
    { "user_id", "12345" },
    { "username", "john_doe" },
    { "ip", "192.168.1.100" }
});

// Context management
var sessionLogger = logger.WithContext(new Dictionary<string, object>
{
    { "session_id", "sess_abc123" },
    { "user_id", "user_456" }
});

sessionLogger.Info("Processing request", new Dictionary<string, object>
{
    { "action", "purchase" }
});

// Ensure all logs are sent before exiting
logger.Flush();
await Task.Delay(2000);
logger.Dispose();`,
      },
      {
        label: 'Microsoft.Extensions.Logging',
        language: 'csharp',
        code: `using Microsoft.Extensions.Logging;
using LogBull.Core;
using LogBull.Extensions;

var loggerFactory = LoggerFactory.Create(builder =>
{
    builder.AddLogBull(configBuilder =>
    {
        configBuilder
            .WithProjectId("LOGBULL_PROJECT_ID_PLACEHOLDER")
            .WithHost("http://LOGBULL_HOST_PLACEHOLDER")
            .WithApiKey("LOGBULL_API_KEY_PLACEHOLDER")
            .WithLogLevel(LogLevel.INFO);
    });
});

var logger = loggerFactory.CreateLogger<MyClass>();

logger.LogInformation("User action: {UserId} performed {Action}", "12345", "login");

logger.LogError("Payment failed: Order {OrderId}, Amount {Amount}", "ord_123", 99.99);`,
      },
      {
        label: 'Serilog',
        language: 'csharp',
        code: `using Serilog;
using LogBull.Core;
using LogBull.Serilog;

var config = Config.CreateBuilder()
    .WithProjectId("LOGBULL_PROJECT_ID_PLACEHOLDER")
    .WithHost("http://LOGBULL_HOST_PLACEHOLDER")
    .WithApiKey("LOGBULL_API_KEY_PLACEHOLDER")
    .WithLogLevel(LogLevel.INFO)
    .Build();

Log.Logger = new LoggerConfiguration()
    .WriteTo.Sink(new LogBullSink(config))
    .CreateLogger();

Log.Information("User {UserId} performed action {Action}", "12345", "login");

Log.Error("Payment failed for order {OrderId} with amount {Amount} {Currency}",
    "ord_123", 99.99, "USD");

// Structured logging with properties
Log.Information("Request processed {@Request}",
    new { Method = "POST", Path = "/api/users", StatusCode = 201 });

// Don't forget to flush on application shutdown
Log.CloseAndFlush();`,
      },
    ],
  },
  Rust: {
    installation: 'Coming soon',
    installCommand: 'text',
    integrations: [
      {
        label: 'Coming Soon',
        language: 'text',
        code: 'Rust integration is coming soon!\n\nStay tuned for updates.',
      },
    ],
  },
  cURL: {
    installation: '',
    installCommand: 'bash',
    integrations: [
      {
        label: 'Basic',
        language: 'bash',
        code: `curl -X POST "http://LOGBULL_HOST_PLACEHOLDER/api/v1/logs/receiving/LOGBULL_PROJECT_ID_PLACEHOLDER" \\
  -H "Content-Type: application/json" \\
  -H "X-API-Key: LOGBULL_API_KEY_PLACEHOLDER" \\
  -d '{
    "logs": [
      {
        "level": "INFO",
        "message": "User logged in successfully",
        "fields": {
          "user_id": "12345",
          "username": "john_doe",
          "ip": "192.168.1.100"
        }
      }
    ]
  }'`,
      },
      {
        label: 'Multiple logs',
        language: 'bash',
        code: `curl -X POST "http://LOGBULL_HOST_PLACEHOLDER/api/v1/logs/receiving/LOGBULL_PROJECT_ID_PLACEHOLDER" \\
  -H "Content-Type: application/json" \\
  -H "X-API-Key: LOGBULL_API_KEY_PLACEHOLDER" \\
  -d '{
    "logs": [
      {
        "level": "INFO",
        "message": "Request received",
        "fields": {
          "path": "/api/users",
          "method": "POST"
        }
      },
      {
        "level": "INFO",
        "message": "Database query executed",
        "fields": {
          "query": "INSERT INTO users",
          "duration_ms": 45
        }
      },
      {
        "level": "INFO",
        "message": "Request completed",
        "fields": {
          "status_code": 201,
          "duration_ms": 120
        }
      }
    ]
  }'`,
      },
    ],
  },
};

const languages: Language[] = [
  'cURL',
  'Python',
  'Go',
  'Java',
  'JavaScript',
  'C#',
  'PHP',
  'Ruby',
  'Rust',
];

const copyToClipboard = async (text: string): Promise<boolean> => {
  // Try modern clipboard API first
  if (navigator.clipboard && navigator.clipboard.writeText) {
    try {
      await navigator.clipboard?.writeText(text);
      return true;
    } catch (error) {
      console.warn('Modern clipboard API failed, trying fallback:', error);
    }
  }

  // Fallback to legacy method
  try {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.left = '-999999px';
    textarea.style.top = '-999999px';
    document.body.appendChild(textarea);
    textarea.focus();
    textarea.select();

    const successful = document.execCommand('copy');
    document.body.removeChild(textarea);

    if (successful) {
      return true;
    } else {
      throw new Error('execCommand failed');
    }
  } catch (error) {
    console.error('Failed to copy to clipboard:', error);
    return false;
  }
};

interface Props {
  logbullHost?: string;
  logbullProjectId?: string;
  logbullApiKey?: string;
  isLogBullApiKeyRequired?: boolean;
}

export function CodeUsageComponent({
  logbullHost = 'http://LOGBULL_HOST',
  logbullProjectId = 'LOGBULL_PROJECT_ID',
  logbullApiKey = 'LOGBULL_API_KEY',
  isLogBullApiKeyRequired = false,
}: Props) {
  const [selectedLanguage, setSelectedLanguage] = useState<Language>('Python');
  const [selectedIntegration, setSelectedIntegration] = useState(0);
  const [selectedInstallMethod, setSelectedInstallMethod] = useState(0);
  const [copiedInstallation, setCopiedInstallation] = useState(false);
  const [copiedConfiguration, setCopiedConfiguration] = useState(false);
  const [copiedUsage, setCopiedUsage] = useState(false);

  const currentConfig = languageConfigs[selectedLanguage];
  const currentIntegration = currentConfig.integrations[selectedIntegration];
  const hasMultipleInstallMethods = Array.isArray(currentConfig.installation);
  const hasConfiguration = currentIntegration.configuration !== undefined;

  // Helper function to remove API key lines from code
  const removeApiKeyLines = (code: string): string => {
    const lines = code.split('\n');
    const filteredLines = lines.filter((line) => {
      const lowerLine = line.toLowerCase();
      return !(
        lowerLine.includes('api_key') ||
        lowerLine.includes('apikey') ||
        lowerLine.includes('api-key')
      );
    });
    return filteredLines.join('\n');
  };

  // Helper function to replace placeholders
  const replacePlaceholders = (text: string): string => {
    let result = text
      .replace(/http:\/\/LOGBULL_HOST_PLACEHOLDER/g, logbullHost)
      .replace(/LOGBULL_PROJECT_ID_PLACEHOLDER/g, logbullProjectId);

    if (isLogBullApiKeyRequired) {
      result = result.replace(/LOGBULL_API_KEY_PLACEHOLDER/g, logbullApiKey);
    }

    return result;
  };

  // Get the actual code (either string or result of function)
  const getRawCode = () => {
    return typeof currentIntegration.code === 'function'
      ? currentIntegration.code(selectedInstallMethod)
      : currentIntegration.code;
  };

  const currentCode = (() => {
    let code = getRawCode();
    code = replacePlaceholders(code);
    if (!isLogBullApiKeyRequired) {
      code = removeApiKeyLines(code);
    }
    return code;
  })();

  // Get the installation command
  const getInstallationCommand = () => {
    let command: string;
    if (hasMultipleInstallMethods) {
      const method = (currentConfig.installation as InstallationMethod[])[selectedInstallMethod];
      command =
        typeof method.command === 'function' ? method.command(selectedIntegration) : method.command;
    } else {
      command = currentConfig.installation as string;
    }
    return replacePlaceholders(command);
  };

  // Get configuration with placeholders replaced
  const getConfiguration = () => {
    if (!currentIntegration.configuration) return '';
    let config = replacePlaceholders(currentIntegration.configuration);
    if (!isLogBullApiKeyRequired) {
      config = removeApiKeyLines(config);
    }
    return config;
  };

  const handleLanguageChange = (language: Language) => {
    setSelectedLanguage(language);
    setSelectedIntegration(0); // Reset to first tab
    setSelectedInstallMethod(0); // Reset to first installation method
    setCopiedInstallation(false);
    setCopiedConfiguration(false);
    setCopiedUsage(false);
  };

  const handleIntegrationChange = (index: number) => {
    setSelectedIntegration(index);
    setCopiedInstallation(false);
    setCopiedConfiguration(false);
    setCopiedUsage(false);
  };

  const handleInstallMethodChange = (index: number) => {
    setSelectedInstallMethod(index);
    setCopiedInstallation(false);
    setCopiedConfiguration(false);
    setCopiedUsage(false);
  };

  const handleCopyInstallation = async () => {
    const success = await copyToClipboard(getInstallationCommand());
    if (success) {
      setCopiedInstallation(true);
      setTimeout(() => setCopiedInstallation(false), 2000);
    }
  };

  const handleCopyConfiguration = async () => {
    const success = await copyToClipboard(getConfiguration());
    if (success) {
      setCopiedConfiguration(true);
      setTimeout(() => setCopiedConfiguration(false), 2000);
    }
  };

  const handleCopyUsage = async () => {
    const success = await copyToClipboard(currentCode);
    if (success) {
      setCopiedUsage(true);
      setTimeout(() => setCopiedUsage(false), 2000);
    }
  };

  return (
    <div className="mx-auto">
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

      {/* Third row: Installation Methods (only if multiple methods exist) */}
      {hasMultipleInstallMethods && (
        <div className="mb-4 flex flex-wrap gap-2">
          {(currentConfig.installation as InstallationMethod[]).map((method, index) => (
            <button
              key={index}
              onClick={() => handleInstallMethodChange(index)}
              className={`cursor-pointer rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                selectedInstallMethod === index
                  ? 'bg-blue-100 text-blue-700 ring-2 ring-blue-600'
                  : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
              }`}
            >
              {method.label}
            </button>
          ))}
        </div>
      )}

      {/* Installation section */}
      {getInstallationCommand() && (
        <div className="mb-4 overflow-hidden rounded-lg bg-gray-50 p-4">
          <div className="mb-2 text-sm font-semibold text-gray-700">Installation</div>
          <div className="relative overflow-auto rounded-lg bg-[#2d2d2d] shadow-lg">
            {/* Copy button */}
            <button
              onClick={handleCopyInstallation}
              className="absolute right-4 top-4 z-10 cursor-pointer rounded-md bg-gray-700 px-3 py-1.5 text-sm font-medium text-white transition-colors hover:bg-gray-600"
            >
              {copiedInstallation ? (
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
                language={
                  hasMultipleInstallMethods
                    ? (currentConfig.installation as InstallationMethod[])[selectedInstallMethod]
                        .language
                    : currentConfig.installCommand
                }
                style={tomorrow}
                customStyle={{
                  margin: 0,
                  padding: 0,
                  background: 'transparent',
                }}
                showLineNumbers={false}
              >
                {getInstallationCommand()}
              </SyntaxHighlighter>
            </div>
          </div>
        </div>
      )}

      {/* Configuration section (only if configuration exists) */}
      {hasConfiguration && (
        <div className="mb-4 overflow-hidden rounded-lg bg-gray-50 p-4">
          <div className="mb-2 text-sm font-semibold text-gray-700">Configuration</div>
          <div className="relative overflow-auto rounded-lg bg-[#2d2d2d] shadow-lg">
            {/* Copy button */}
            <button
              onClick={handleCopyConfiguration}
              className="absolute right-4 top-4 z-10 cursor-pointer rounded-md bg-gray-700 px-3 py-1.5 text-sm font-medium text-white transition-colors hover:bg-gray-600"
            >
              {copiedConfiguration ? (
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
                {getConfiguration()}
              </SyntaxHighlighter>
            </div>
          </div>
        </div>
      )}

      {/* Usage section */}
      <div className="mb-4 overflow-hidden rounded-lg bg-gray-50 p-4">
        <div className="mb-2 text-sm font-semibold text-gray-700">Usage</div>
        <div className="relative overflow-auto rounded-lg bg-[#2d2d2d] shadow-lg">
          {/* Copy button */}
          <button
            onClick={handleCopyUsage}
            className="absolute right-4 top-4 z-10 cursor-pointer rounded-md bg-gray-700 px-3 py-1.5 text-sm font-medium text-white transition-colors hover:bg-gray-600"
          >
            {copiedUsage ? (
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
              {currentCode}
            </SyntaxHighlighter>
          </div>
        </div>
      </div>
    </div>
  );
}
