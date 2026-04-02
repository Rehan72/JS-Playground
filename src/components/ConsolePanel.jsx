import { useState } from 'react';
import { VscTrash, VscChevronDown, VscChevronRight, VscFilter } from 'react-icons/vsc';

const LOG_ICONS = {
  log: '›',
  info: 'ℹ',
  warn: '⚠',
  error: '✕',
  debug: '🔍',
  table: '▦',
};

const LOG_COLORS = {
  log: 'var(--console-log)',
  info: 'var(--console-info)',
  warn: 'var(--console-warn)',
  error: 'var(--console-error)',
  debug: 'var(--console-debug)',
  table: 'var(--console-info)',
};

export default function ConsolePanel({ logs, executionTime, onClearConsole, history, error }) {
  const [filter, setFilter] = useState('all');
  const [showHistory, setShowHistory] = useState(false);
  const [expandedHistoryIndex, setExpandedHistoryIndex] = useState(null);

  const filteredLogs = filter === 'all' ? logs : logs.filter((l) => l.type === filter);

  const logCounts = logs.reduce((acc, log) => {
    acc[log.type] = (acc[log.type] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="console-panel">
      <div className="console-header">
        <div className="console-title">
          <span className="console-title-text">Console</span>
          {executionTime !== null && (
            <span className="execution-time">
              ⚡ {executionTime < 1 ? '<1' : Math.round(executionTime)}ms
            </span>
          )}
        </div>

        <div className="console-controls">
          <div className="log-filters">
            <button
              className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
              onClick={() => setFilter('all')}
            >
              All {logs.length > 0 && <span className="badge">{logs.length}</span>}
            </button>
            {['error', 'warn', 'log', 'info'].map(
              (type) =>
                logCounts[type] > 0 && (
                  <button
                    key={type}
                    className={`filter-btn filter-${type} ${filter === type ? 'active' : ''}`}
                    onClick={() => setFilter(type)}
                  >
                    {type} <span className="badge">{logCounts[type]}</span>
                  </button>
                )
            )}
          </div>

          <button
            className={`console-btn ${showHistory ? 'active' : ''}`}
            onClick={() => setShowHistory(!showHistory)}
            title="Console History"
          >
            🕐 History {history.length > 0 && <span className="badge">{history.length}</span>}
          </button>

          <button className="console-btn clear-btn" onClick={onClearConsole} title="Clear Console">
            <VscTrash />
          </button>
        </div>
      </div>

      <div className="console-body">
        {showHistory && history.length > 0 && (
          <div className="console-history">
            <div className="history-title">Previous Runs</div>
            {history.map((run, idx) => (
              <div key={idx} className="history-item">
                <div
                  className="history-item-header"
                  onClick={() =>
                    setExpandedHistoryIndex(expandedHistoryIndex === idx ? null : idx)
                  }
                >
                  <span className="history-toggle">
                    {expandedHistoryIndex === idx ? <VscChevronDown /> : <VscChevronRight />}
                  </span>
                  <span className="history-time">
                    {new Date(run.timestamp).toLocaleTimeString()}
                  </span>
                  <span className="history-stats">
                    {run.logs.length} logs • {Math.round(run.executionTime)}ms
                    {run.error && ' • ❌ Error'}
                  </span>
                </div>
                {expandedHistoryIndex === idx && (
                  <div className="history-logs">
                    {run.error && <div className="log-entry log-error">❌ {run.error}</div>}
                    {run.logs.map((log, logIdx) => (
                      <div key={logIdx} className={`log-entry log-${log.type}`}>
                        <span className="log-icon">{LOG_ICONS[log.type]}</span>
                        <pre className="log-content">{log.content}</pre>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {error && (
          <div className="log-entry log-error error-banner">
            <span className="log-icon">❌</span>
            <pre className="log-content">{error}</pre>
          </div>
        )}

        {filteredLogs.length === 0 && !error && (
          <div className="console-empty">
            <div className="empty-icon">🖥️</div>
            <div className="empty-text">
              {logs.length === 0
                ? 'Run your code to see output here'
                : `No ${filter} messages`}
            </div>
            <div className="empty-hint">Press Ctrl+Enter to run</div>
          </div>
        )}

        {filteredLogs.map((log, idx) => (
          <div
            key={idx}
            className={`log-entry log-${log.type}`}
            style={{ '--log-color': LOG_COLORS[log.type] }}
          >
            <span className="log-icon">{LOG_ICONS[log.type]}</span>
            <pre className="log-content">{log.content}</pre>
            <span className="log-index">#{idx + 1}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
