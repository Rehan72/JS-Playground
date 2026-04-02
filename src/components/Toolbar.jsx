import {
  VscPlay,
  VscCode,
  VscClearAll,
  VscColorMode,
  VscFolderOpened,
  VscSave,
  VscLink,
  VscCopy,
  VscLibrary,
  VscZoomIn,
  VscZoomOut,
  VscWordWrap,
  VscRefresh,
  VscScreenFull,
  VscSplitHorizontal,
  VscSplitVertical,
  VscSettingsGear,
} from 'react-icons/vsc';

export default function Toolbar({
  onRun,
  onFormat,
  onClear,
  onToggleTheme,
  onImport,
  onExport,
  onShare,
  onCopy,
  onOpenTemplates,
  onOpenDSA,
  fontSize,
  onFontSizeChange,
  wordWrap,
  onToggleWordWrap,
  autoRun,
  onToggleAutoRun,
  theme,
  isRunning,
  onToggleFullscreen,
  isFullscreen,
  layout,
  onToggleLayout,
  onOpenSettings,
}) {
  return (
    <div className="toolbar">
      <div className="toolbar-left">
        <div className="toolbar-brand">
          <span className="brand-icon">⚡</span>
          <span className="brand-text">JS Playground</span>
        </div>

        <div className="toolbar-divider" />

        <button
          className={`toolbar-btn run-btn ${isRunning ? 'running' : ''}`}
          onClick={onRun}
          title="Run Code (Ctrl+Enter)"
          disabled={isRunning}
        >
          <VscPlay />
          <span>{isRunning ? 'Running...' : 'Run'}</span>
        </button>

        <button className="toolbar-btn" onClick={onFormat} title="Format Code (Ctrl+Shift+F)">
          <VscCode />
          <span>Format</span>
        </button>

        <button className="toolbar-btn" onClick={onClear} title="Clear Editor">
          <VscClearAll />
          <span>Clear</span>
        </button>

        <div className="toolbar-divider" />

        <button className="toolbar-btn" onClick={onOpenTemplates} title="Code Templates">
          <VscLibrary />
          <span>Templates</span>
        </button>

        <button className="toolbar-btn dsa-btn" onClick={onOpenDSA} title="DSA Challenges">
          <span className="dsa-btn-icon">🧠</span>
          <span>DSA</span>
        </button>
      </div>

      <div className="toolbar-right">
        <div className="toolbar-group">
          <label className="auto-run-toggle" title="Auto-run on code change">
            <input type="checkbox" checked={autoRun} onChange={onToggleAutoRun} />
            <span className="toggle-slider"></span>
            <span className="toggle-label">Auto</span>
          </label>
        </div>

        <div className="toolbar-divider" />

        <div className="toolbar-group font-controls">
          <button
            className="toolbar-btn icon-only"
            onClick={() => onFontSizeChange(-1)}
            title="Decrease Font Size"
          >
            <VscZoomOut />
          </button>
          <span className="font-size-display">{fontSize}px</span>
          <button
            className="toolbar-btn icon-only"
            onClick={() => onFontSizeChange(1)}
            title="Increase Font Size"
          >
            <VscZoomIn />
          </button>
        </div>

        <button
          className={`toolbar-btn icon-only ${wordWrap ? 'active' : ''}`}
          onClick={onToggleWordWrap}
          title="Toggle Word Wrap"
        >
          <VscWordWrap />
        </button>

        <div className="toolbar-divider" />

        <button className="toolbar-btn icon-only" onClick={onImport} title="Import File">
          <VscFolderOpened />
        </button>
        <button className="toolbar-btn icon-only" onClick={onExport} title="Export/Download File (Ctrl+S)">
          <VscSave />
        </button>
        <button className="toolbar-btn icon-only" onClick={onCopy} title="Copy Code">
          <VscCopy />
        </button>
        <button className="toolbar-btn icon-only" onClick={onShare} title="Share via URL">
          <VscLink />
        </button>

        <div className="toolbar-divider" />

        <button
          className="toolbar-btn icon-only"
          onClick={onToggleLayout}
          title={layout === 'horizontal' ? 'Vertical Layout' : 'Horizontal Layout'}
        >
          {layout === 'horizontal' ? <VscSplitVertical /> : <VscSplitHorizontal />}
        </button>

        <button
          className="toolbar-btn icon-only"
          onClick={onToggleFullscreen}
          title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
        >
          <VscScreenFull />
        </button>

        <button
          className="toolbar-btn icon-only"
          onClick={onToggleTheme}
          title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Theme`}
        >
          <VscColorMode />
        </button>

        <button
          className="toolbar-btn icon-only"
          onClick={onOpenSettings}
          title="Settings"
        >
          <VscSettingsGear />
        </button>
      </div>
    </div>
  );
}
