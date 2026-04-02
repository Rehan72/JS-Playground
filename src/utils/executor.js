/**
 * Sandboxed JavaScript code executor using Function constructor + console intercept.
 * Captures console output (log, warn, error, info, table, clear)
 * and measures execution time.
 */

export function executeCode(code, timeout = 10000) {
  return new Promise((resolve) => {
    const logs = [];
    const startTime = performance.now();
    let resolved = false;

    const addLog = (type, args) => {
      let content;
      if (type === 'table') {
        try {
          content = JSON.stringify(args[0], null, 2);
        } catch {
          content = String(args[0]);
        }
      } else {
        content = args
          .map((arg) => {
            if (arg instanceof Error) {
              return `${arg.name}: ${arg.message}`;
            }
            if (typeof arg === 'object' && arg !== null) {
              try {
                return JSON.stringify(arg, null, 2);
              } catch {
                return String(arg);
              }
            }
            return String(arg);
          })
          .join(' ');
      }
      logs.push({ type, content, timestamp: Date.now() });
    };

    const finalize = (error = null) => {
      if (resolved) return;
      resolved = true;
      clearTimeout(timer);
      const executionTime = performance.now() - startTime;
      resolve({ logs, executionTime, error });
    };

    // Timeout guard
    const timer = setTimeout(() => {
      finalize('⏰ Execution timed out (10s limit)');
    }, timeout);

    // Build a fake console
    const fakeConsole = {};
    ['log', 'warn', 'error', 'info', 'table', 'debug'].forEach((method) => {
      fakeConsole[method] = (...args) => addLog(method, args);
    });
    fakeConsole.clear = () => {
      logs.length = 0;
      logs.push({ type: 'info', content: 'Console was cleared', timestamp: Date.now() });
    };

    try {
      // Wrap in an async IIFE that provides our fake console and common globals
      const wrappedCode = `
        return (async function(console, setTimeout, setInterval, clearTimeout, clearInterval, fetch) {
          "use strict";
          try {
            ${code}
          } catch(e) {
            console.error(e instanceof Error ? e.stack || e.message : String(e));
          }
        })(fakeConsole, setTimeout, setInterval, clearTimeout, clearInterval, fetch);
      `;

      const fn = new Function('fakeConsole', 'setTimeout', 'setInterval', 'clearTimeout', 'clearInterval', 'fetch', wrappedCode);
      const result = fn(fakeConsole, setTimeout, setInterval, clearTimeout, clearInterval, fetch);

      // Handle async code
      if (result && typeof result.then === 'function') {
        result
          .then(() => {
            // Give a small window for trailing async operations
            setTimeout(() => finalize(), 200);
          })
          .catch((err) => {
            addLog('error', [err instanceof Error ? err.stack || err.message : String(err)]);
            finalize();
          });
      } else {
        // Synchronous code - finalize after a tiny delay (for any pending microtasks)
        setTimeout(() => finalize(), 50);
      }
    } catch (err) {
      addLog('error', [err instanceof Error ? err.stack || err.message : String(err)]);
      finalize(err.toString());
    }
  });
}
