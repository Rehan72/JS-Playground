import { VscClose } from 'react-icons/vsc';

export default function SettingsModal({ settings, onUpdateSettings, onClose }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content settings-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>⚙️ Settings</h2>
          <button className="modal-close" onClick={onClose}>
            <VscClose />
          </button>
        </div>
        <div className="modal-body">
          <div className="settings-group">
            <h3>Editor</h3>
            <div className="setting-item">
              <label>Font Size</label>
              <div className="setting-control">
                <input
                  type="range"
                  min="10"
                  max="28"
                  value={settings.fontSize}
                  onChange={(e) => onUpdateSettings({ fontSize: parseInt(e.target.value) })}
                />
                <span className="setting-value">{settings.fontSize}px</span>
              </div>
            </div>
            <div className="setting-item">
              <label>Tab Size</label>
              <div className="setting-control">
                <select
                  value={settings.tabSize || 2}
                  onChange={(e) => onUpdateSettings({ tabSize: parseInt(e.target.value) })}
                >
                  <option value={2}>2 spaces</option>
                  <option value={4}>4 spaces</option>
                  <option value={8}>8 spaces</option>
                </select>
              </div>
            </div>
            <div className="setting-item">
              <label>Word Wrap</label>
              <div className="setting-control">
                <label className="toggle">
                  <input
                    type="checkbox"
                    checked={settings.wordWrap}
                    onChange={() => onUpdateSettings({ wordWrap: !settings.wordWrap })}
                  />
                  <span className="toggle-slider"></span>
                </label>
              </div>
            </div>
            <div className="setting-item">
              <label>Minimap</label>
              <div className="setting-control">
                <label className="toggle">
                  <input
                    type="checkbox"
                    checked={settings.minimap !== false}
                    onChange={() => onUpdateSettings({ minimap: !(settings.minimap !== false) })}
                  />
                  <span className="toggle-slider"></span>
                </label>
              </div>
            </div>
          </div>

          <div className="settings-group">
            <h3>Execution</h3>
            <div className="setting-item">
              <label>Auto Run</label>
              <div className="setting-control">
                <label className="toggle">
                  <input
                    type="checkbox"
                    checked={settings.autoRun}
                    onChange={() => onUpdateSettings({ autoRun: !settings.autoRun })}
                  />
                  <span className="toggle-slider"></span>
                </label>
              </div>
            </div>
            <div className="setting-item">
              <label>Auto Run Delay</label>
              <div className="setting-control">
                <select
                  value={settings.autoRunDelay || 1000}
                  onChange={(e) => onUpdateSettings({ autoRunDelay: parseInt(e.target.value) })}
                >
                  <option value={500}>500ms</option>
                  <option value={1000}>1 second</option>
                  <option value={2000}>2 seconds</option>
                  <option value={3000}>3 seconds</option>
                </select>
              </div>
            </div>
          </div>

          <div className="settings-group">
            <h3>Appearance</h3>
            <div className="setting-item">
              <label>Theme</label>
              <div className="setting-control">
                <select
                  value={settings.theme}
                  onChange={(e) => onUpdateSettings({ theme: e.target.value })}
                >
                  <option value="dark">Dark</option>
                  <option value="light">Light</option>
                </select>
              </div>
            </div>
            <div className="setting-item">
              <label>Layout</label>
              <div className="setting-control">
                <select
                  value={settings.layout}
                  onChange={(e) => onUpdateSettings({ layout: e.target.value })}
                >
                  <option value="horizontal">Horizontal (Side by Side)</option>
                  <option value="vertical">Vertical (Stacked)</option>
                </select>
              </div>
            </div>
          </div>

          <div className="settings-group">
            <h3>Keyboard Shortcuts</h3>
            <div className="shortcuts-list">
              <div className="shortcut"><kbd>Ctrl</kbd>+<kbd>Enter</kbd><span>Run Code</span></div>
              <div className="shortcut"><kbd>Ctrl</kbd>+<kbd>S</kbd><span>Download File</span></div>
              <div className="shortcut"><kbd>Ctrl</kbd>+<kbd>N</kbd><span>New Tab</span></div>
              <div className="shortcut"><kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>F</kbd><span>Format Code</span></div>
              <div className="shortcut"><kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>C</kbd><span>Copy Code</span></div>
              <div className="shortcut"><kbd>F11</kbd><span>Fullscreen</span></div>
              <div className="shortcut"><kbd>Ctrl</kbd>+<kbd>W</kbd><span>Close Tab</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
