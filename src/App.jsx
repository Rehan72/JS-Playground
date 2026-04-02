import { useState, useCallback, useRef, useEffect } from 'react';
import Split from 'react-split';
import { js_beautify } from 'js-beautify';
import Toolbar from './components/Toolbar';
import EditorPanel from './components/EditorPanel';
import ConsolePanel from './components/ConsolePanel';
import TemplatesModal from './components/TemplatesModal';
import SettingsModal from './components/SettingsModal';
import DSAModal from './components/DSAModal';
import { executeCode } from './utils/executor';
import { encodeShareURL, decodeShareURL } from './utils/shareCode';
import { saveTabs, loadTabs, saveSettings, loadSettings, saveActiveTab, loadActiveTab } from './utils/storage';

const DEFAULT_CODE = `// Welcome to JS Playground! ⚡
// Write your JavaScript code here and press Ctrl+Enter to run

console.log("Hello, World! 🌍");
console.log("This is JS Playground - your personal JavaScript sandbox");

// Try some examples:
const greeting = "Happy coding!";
console.log(greeting);

// Explore the Templates menu for more examples!
`;

let tabCounter = 1;

function createTab(name, code) {
  return {
    id: `tab-${Date.now()}-${tabCounter++}`,
    name: name || `untitled-${tabCounter}.js`,
    code: code || '',
  };
}

export default function App() {
  // Try to load shared code from URL first, then localStorage
  const [tabs, setTabs] = useState(() => {
    const shared = decodeShareURL();
    if (shared && shared.length > 0) return shared;
    const saved = loadTabs();
    if (saved && saved.length > 0) return saved;
    return [createTab('main.js', DEFAULT_CODE)];
  });

  const [activeTabId, setActiveTabId] = useState(() => {
    const saved = loadActiveTab();
    if (saved && tabs.find(t => t.id === saved)) return saved;
    return tabs[0]?.id;
  });

  const [settings, setSettings] = useState(() => {
    const saved = loadSettings();
    return {
      theme: 'dark',
      fontSize: 14,
      wordWrap: false,
      autoRun: false,
      autoRunDelay: 1000,
      layout: 'horizontal',
      minimap: true,
      tabSize: 2,
      ...saved,
    };
  });

  const [logs, setLogs] = useState([]);
  const [executionTime, setExecutionTime] = useState(null);
  const [executionError, setExecutionError] = useState(null);
  const [isRunning, setIsRunning] = useState(false);
  const [history, setHistory] = useState([]);
  const [showTemplates, setShowTemplates] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showDSA, setShowDSA] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [toast, setToast] = useState(null);

  const editorRef = useRef(null);
  const autoRunTimer = useRef(null);
  const fileInputRef = useRef(null);

  // Persist to localStorage
  useEffect(() => { saveTabs(tabs); }, [tabs]);
  useEffect(() => { saveActiveTab(activeTabId); }, [activeTabId]);
  useEffect(() => { saveSettings(settings); }, [settings]);

  // Apply theme to document
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', settings.theme);
  }, [settings.theme]);

  // Show toast notification
  const showToast = useCallback((message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  }, []);

  // Tab management
  const addTab = useCallback((name, code) => {
    const tab = createTab(name, code);
    setTabs(prev => [...prev, tab]);
    setActiveTabId(tab.id);
  }, []);

  const closeTab = useCallback((id) => {
    setTabs(prev => {
      if (prev.length <= 1) return prev;
      const idx = prev.findIndex(t => t.id === id);
      const next = prev.filter(t => t.id !== id);
      if (id === activeTabId) {
        setActiveTabId(next[Math.min(idx, next.length - 1)].id);
      }
      return next;
    });
  }, [activeTabId]);

  const renameTab = useCallback((id, name) => {
    setTabs(prev => prev.map(t => t.id === id ? { ...t, name } : t));
  }, []);

  const updateCode = useCallback((id, code) => {
    setTabs(prev => prev.map(t => t.id === id ? { ...t, code } : t));

    // Auto-run with debounce
    if (settings.autoRun) {
      clearTimeout(autoRunTimer.current);
      autoRunTimer.current = setTimeout(() => {
        const tab = tabs.find(t => t.id === id);
        if (tab) runCode(code);
      }, settings.autoRunDelay);
    }
  }, [settings.autoRun, settings.autoRunDelay, tabs]);

  // Code execution
  const runCode = useCallback(async (codeOverride) => {
    const activeTab = tabs.find(t => t.id === activeTabId);
    const code = (typeof codeOverride === 'string' ? codeOverride : activeTab?.code) || '';
    if (!code.trim()) {
      showToast('Nothing to run!', 'warning');
      return;
    }

    setIsRunning(true);
    setExecutionError(null);

    // Save current to history if there are existing logs
    if (logs.length > 0 || executionError) {
      setHistory(prev => [
        { logs: [...logs], executionTime, error: executionError, timestamp: Date.now() },
        ...prev.slice(0, 19),
      ]);
    }

    try {
      const result = await executeCode(code);
      setLogs(result.logs);
      setExecutionTime(result.executionTime);
      setExecutionError(result.error);
    } catch (err) {
      setExecutionError(err.toString());
    } finally {
      setIsRunning(false);
    }
  }, [tabs, activeTabId, logs, executionTime, executionError, showToast]);

  // Format code
  const formatCode = useCallback(() => {
    const activeTab = tabs.find(t => t.id === activeTabId);
    if (!activeTab) return;
    try {
      const formatted = js_beautify(activeTab.code, {
        indent_size: settings.tabSize,
        space_in_empty_paren: true,
        e4x: true,
      });
      setTabs(prev => prev.map(t => t.id === activeTabId ? { ...t, code: formatted } : t));
      showToast('Code formatted ✨');
    } catch {
      showToast('Format failed', 'error');
    }
  }, [tabs, activeTabId, settings.tabSize, showToast]);

  // Clear editor
  const clearEditor = useCallback(() => {
    setTabs(prev => prev.map(t => t.id === activeTabId ? { ...t, code: '' } : t));
  }, [activeTabId]);

  // Import file
  const importFile = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const handleFileImport = useCallback((e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      addTab(file.name, ev.target.result);
      showToast(`Imported ${file.name}`);
    };
    reader.readAsText(file);
    e.target.value = '';
  }, [addTab, showToast]);

  // Export/download file
  const exportFile = useCallback(() => {
    const activeTab = tabs.find(t => t.id === activeTabId);
    if (!activeTab) return;
    const blob = new Blob([activeTab.code], { type: 'text/javascript' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = activeTab.name.endsWith('.js') ? activeTab.name : `${activeTab.name}.js`;
    a.click();
    URL.revokeObjectURL(url);
    showToast(`Downloaded ${a.download} 📥`);
  }, [tabs, activeTabId, showToast]);

  // Share via URL
  const shareCode = useCallback(() => {
    const url = encodeShareURL(tabs);
    if (url) {
      navigator.clipboard.writeText(url).then(() => {
        showToast('Share URL copied to clipboard! 🔗');
      }).catch(() => {
        prompt('Share URL:', url);
      });
    }
  }, [tabs, showToast]);

  // Copy code
  const copyCode = useCallback(() => {
    const activeTab = tabs.find(t => t.id === activeTabId);
    if (!activeTab) return;
    navigator.clipboard.writeText(activeTab.code).then(() => {
      showToast('Code copied to clipboard! 📋');
    }).catch(() => {
      showToast('Copy failed', 'error');
    });
  }, [tabs, activeTabId, showToast]);

  // Toggle fullscreen
  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  }, []);

  // Update settings helper
  const updateSettings = useCallback((updates) => {
    setSettings(prev => ({ ...prev, ...updates }));
  }, []);

  // Template selection
  const handleTemplateSelect = useCallback((template) => {
    addTab(`${template.name.toLowerCase().replace(/\s+/g, '-')}.js`, template.code);
    showToast(`Loaded "${template.name}" template 📚`);
  }, [addTab, showToast]);

  // DSA question selection
  const handleDSASelect = useCallback((question) => {
    const header = `// 🧠 DSA Challenge: ${question.title} (${question.difficulty})\n// ${question.description.split('\n')[0]}\n\n`;
    addTab(`dsa-${question.id}.js`, header + question.starterCode);
    showToast(`Loaded "${question.title}" challenge 🧠`);
  }, [addTab, showToast]);

  // Drag & drop file import
  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    const file = e.dataTransfer.files[0];
    if (file && (file.name.endsWith('.js') || file.name.endsWith('.txt') || file.name.endsWith('.json') || file.name.endsWith('.ts'))) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        addTab(file.name, ev.target.result);
        showToast(`Imported ${file.name} via drag & drop`);
      };
      reader.readAsText(file);
    }
  }, [addTab, showToast]);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Ctrl+Enter - Run
      if (e.ctrlKey && e.key === 'Enter') {
        e.preventDefault();
        runCode();
      }
      // Ctrl+S - Save/Download
      if (e.ctrlKey && e.key === 's') {
        e.preventDefault();
        exportFile();
      }
      // Ctrl+N - New tab
      if (e.ctrlKey && e.key === 'n') {
        e.preventDefault();
        addTab();
      }
      // Ctrl+Shift+F - Format
      if (e.ctrlKey && e.shiftKey && e.key === 'F') {
        e.preventDefault();
        formatCode();
      }
      // Ctrl+Shift+C - Copy code
      if (e.ctrlKey && e.shiftKey && e.key === 'C') {
        e.preventDefault();
        copyCode();
      }
      // F11 - Fullscreen
      if (e.key === 'F11') {
        e.preventDefault();
        toggleFullscreen();
      }
      // Ctrl+W - Close tab
      if (e.ctrlKey && e.key === 'w') {
        e.preventDefault();
        closeTab(activeTabId);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [runCode, exportFile, addTab, formatCode, copyCode, toggleFullscreen, closeTab, activeTabId]);

  // Listen for fullscreen changes
  useEffect(() => {
    const handler = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', handler);
    return () => document.removeEventListener('fullscreenchange', handler);
  }, []);

  // Editor mount handler
  const handleEditorMount = useCallback((editor) => {
    editorRef.current = editor;
    editor.focus();
  }, []);

  return (
    <div
      className={`app ${settings.theme}`}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      <input
        ref={fileInputRef}
        type="file"
        accept=".js,.jsx,.ts,.tsx,.json,.txt,.mjs,.cjs"
        style={{ display: 'none' }}
        onChange={handleFileImport}
      />

      <Toolbar
        onRun={runCode}
        onFormat={formatCode}
        onClear={clearEditor}
        onToggleTheme={() => updateSettings({ theme: settings.theme === 'dark' ? 'light' : 'dark' })}
        onImport={importFile}
        onExport={exportFile}
        onShare={shareCode}
        onCopy={copyCode}
        onOpenTemplates={() => setShowTemplates(true)}
        onOpenDSA={() => setShowDSA(true)}
        fontSize={settings.fontSize}
        onFontSizeChange={(delta) => updateSettings({
          fontSize: Math.min(28, Math.max(10, settings.fontSize + delta))
        })}
        wordWrap={settings.wordWrap}
        onToggleWordWrap={() => updateSettings({ wordWrap: !settings.wordWrap })}
        autoRun={settings.autoRun}
        onToggleAutoRun={() => updateSettings({ autoRun: !settings.autoRun })}
        theme={settings.theme}
        isRunning={isRunning}
        onToggleFullscreen={toggleFullscreen}
        isFullscreen={isFullscreen}
        layout={settings.layout}
        onToggleLayout={() => updateSettings({
          layout: settings.layout === 'horizontal' ? 'vertical' : 'horizontal'
        })}
        onOpenSettings={() => setShowSettings(true)}
      />

      <div className="main-content">
        <Split
          className={`split-container ${settings.layout}`}
          direction={settings.layout === 'horizontal' ? 'horizontal' : 'vertical'}
          sizes={[55, 45]}
          minSize={200}
          gutterSize={6}
          gutterAlign="center"
          snapOffset={0}
        >
          <EditorPanel
            tabs={tabs}
            activeTabId={activeTabId}
            onSwitchTab={setActiveTabId}
            onAddTab={() => addTab()}
            onCloseTab={closeTab}
            onRenameTab={renameTab}
            onCodeChange={updateCode}
            theme={settings.theme}
            fontSize={settings.fontSize}
            wordWrap={settings.wordWrap}
            onEditorMount={handleEditorMount}
          />

          <ConsolePanel
            logs={logs}
            executionTime={executionTime}
            error={executionError}
            onClearConsole={() => { setLogs([]); setExecutionTime(null); setExecutionError(null); }}
            history={history}
          />
        </Split>
      </div>

      {showTemplates && (
        <TemplatesModal
          onSelect={handleTemplateSelect}
          onClose={() => setShowTemplates(false)}
        />
      )}

      {showDSA && (
        <DSAModal
          onSelect={handleDSASelect}
          onClose={() => setShowDSA(false)}
        />
      )}

      {showSettings && (
        <SettingsModal
          settings={settings}
          onUpdateSettings={updateSettings}
          onClose={() => setShowSettings(false)}
        />
      )}

      {toast && (
        <div className={`toast toast-${toast.type}`}>
          {toast.message}
        </div>
      )}
    </div>
  );
}
