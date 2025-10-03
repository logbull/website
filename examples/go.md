# LogBull Go

<div align="center">
<img src="assets/logo.svg" style="margin-bottom: 20px;" alt="Log Bull Logo" width="250"/>

[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)
[![Go Version](https://img.shields.io/badge/go-1.21+-blue.svg)](https://golang.org/dl/)

A Go library for sending logs to [LogBull](https://github.com/logbull/logbull) - a self-hosted log collection system.

</div>

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Quick Start](#quick-start)
- [Usage Examples](#usage-examples)
  - [1. Standalone LogBullLogger](#1-standalone-logbulllogger)
  - [2. Standard Library slog Integration](#2-standard-library-slog-integration)
  - [3. Uber-go Zap Integration](#3-uber-go-zap-integration)
  - [4. Sirupsen Logrus Integration](#4-sirupsen-logrus-integration)
- [Configuration Options](#configuration-options)
  - [Config Parameters](#config-parameters)
  - [Available Log Levels](#available-log-levels)
- [API Reference](#api-reference)
  - [LogBullLogger Methods](#logbulllogger-methods)
  - [Import Structure](#import-structure)
- [Error Handling](#error-handling)
- [Performance Considerations](#performance-considerations)
- [Thread Safety](#thread-safety)
- [Requirements](#requirements)
- [License](#license)
- [Contributing](#contributing)
- [LogBull Server](#logbull-server)

## Features

- **Multiple integration options**: Standalone logger, `slog` handler, `zap` core, and `logrus` hook
- **Context support**: Attach persistent context to logs (session_id, user_id, etc.)
- **Thread-safe**: All operations are safe for concurrent use

## Installation

```bash
go get github.com/logbull/logbull-go
```

## Quick Start

The fastest way to start using LogBull is with the standalone logger:

```go
package main

import (
    "github.com/logbull/logbull-go/logbull"
)

func main() {
    logger, err := logbull.NewLogger(logbull.Config{
        ProjectID: "12345678-1234-1234-1234-123456789012",
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
}
```

## Usage Examples

### 1. Standalone LogBullLogger

```go
package main

import (
    "time"

    "github.com/logbull/logbull-go/logbull"
)

func main() {
    logger, err := logbull.NewLogger(logbull.Config{
        ProjectID: "YOUR_PROJECT_ID",
        Host:      "http://YOUR_LOGBULL_SERVER:4005",
        APIKey:    "YOUR_API_KEY", // optional
        LogLevel:  logbull.INFO,
    })
    if err != nil {
        panic(err)
    }
    defer logger.Shutdown()

    logger.Info("Application started", nil)

    logger.Info("User logged in successfully", map[string]any{
        "user_id":  "12345",
        "username": "john_doe",
        "ip":       "192.168.1.100",
    })

    sessionLogger := logger.WithContext(map[string]any{
        "session_id": "sess_abc123",
        "user_id":    "user_456",
    })

    sessionLogger.Info("Processing user request", map[string]any{
        "action": "purchase",
        "amount": 99.99,
    })

    logger.Error("Database connection failed", map[string]any{
        "database":   "users_db",
        "error_code": 500,
    })

    logger.Flush()
    time.Sleep(2 * time.Second) // wait for logs to be sent
}
```

#### Context Management

```go
// Attach persistent context to all subsequent logs
sessionLogger := logger.WithContext(map[string]any{
    "session_id": "sess_abc123",
    "user_id":    "user_456",
    "request_id": "req_789",
})

// All logs from sessionLogger include the context automatically
sessionLogger.Info("User started checkout process", map[string]any{
    "cart_items":   3,
    "total_amount": 149.99,
})
// Output includes: session_id, user_id, request_id + cart_items, total_amount

sessionLogger.Error("Payment processing failed", map[string]any{
    "payment_method": "credit_card",
    "error_code":     "DECLINED",
})

// Context can be chained
transactionLogger := sessionLogger.WithContext(map[string]any{
    "transaction_id": "txn_xyz789",
    "merchant_id":    "merchant_123",
})

transactionLogger.Info("Transaction completed", map[string]any{
    "amount":   149.99,
    "currency": "USD",
})
// Includes all previous context + new transaction context
```

### 2. Standard Library slog Integration

```go
package main

import (
    "log/slog"
    "time"

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

    handler.Flush()
    time.Sleep(2 * time.Second) // wait for logs to be sent
}
```

### 3. Uber-go Zap Integration

```go
package main

import (
    "time"

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
    time.Sleep(2 * time.Second) // wait for logs to be sent
}
```

### 4. Sirupsen Logrus Integration

```go
package main

import (
    "time"

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

    hook.Flush()
    time.Sleep(2 * time.Second) // wait for logs to be sent
}
```

## Configuration Options

### Config Parameters

- `ProjectID` (required): Your LogBull project ID (UUID format)
- `Host` (required): LogBull server URL (e.g., `http://localhost:4005`)
- `APIKey` (optional): API key for authentication
- `LogLevel` (optional): Minimum log level to process (default: `INFO`)

### Available Log Levels

- `DEBUG`: Detailed information for debugging
- `INFO`: General information messages
- `WARNING`: Warning messages
- `ERROR`: Error messages
- `CRITICAL`: Critical error messages

## API Reference

### LogBullLogger Methods

- `Debug(message string, fields map[string]any)`: Log debug message
- `Info(message string, fields map[string]any)`: Log info message
- `Warning(message string, fields map[string]any)`: Log warning message
- `Error(message string, fields map[string]any)`: Log error message
- `Critical(message string, fields map[string]any)`: Log critical message
- `WithContext(context map[string]any) *LogBullLogger`: Create new logger with additional context
- `Flush()`: Immediately send all queued logs
- `Shutdown()`: Stop background processing and send remaining logs

### Import Structure

```go
// Main imports
import "github.com/logbull/logbull-go/logbull"

// Use the exported types and functions
logger, _ := logbull.NewLogger(logbull.Config{...})
handler, _ := logbull.NewSlogHandler(logbull.Config{...})
core, _ := logbull.NewZapCore(logbull.Config{...})
hook, _ := logbull.NewLogrusHook(logbull.Config{...})
```

## License

Apache 2.0 License