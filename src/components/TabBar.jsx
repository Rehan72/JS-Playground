import { useState, useRef } from 'react';
import { VscClose, VscAdd } from 'react-icons/vsc';

export default function TabBar({ tabs, activeTabId, onSwitchTab, onAddTab, onCloseTab, onRenameTab }) {
  const [editingId, setEditingId] = useState(null);
  const [editValue, setEditValue] = useState('');
  const inputRef = useRef(null);

  const startRename = (tab, e) => {
    e.stopPropagation();
    setEditingId(tab.id);
    setEditValue(tab.name);
    setTimeout(() => inputRef.current?.focus(), 50);
  };

  const commitRename = () => {
    if (editValue.trim()) {
      onRenameTab(editingId, editValue.trim());
    }
    setEditingId(null);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') commitRename();
    if (e.key === 'Escape') setEditingId(null);
  };

  return (
    <div className="tab-bar">
      <div className="tab-list">
        {tabs.map((tab) => (
          <div
            key={tab.id}
            className={`tab ${tab.id === activeTabId ? 'active' : ''}`}
            onClick={() => onSwitchTab(tab.id)}
            onDoubleClick={(e) => startRename(tab, e)}
            title="Double-click to rename"
          >
            {editingId === tab.id ? (
              <input
                ref={inputRef}
                className="tab-rename-input"
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
                onBlur={commitRename}
                onKeyDown={handleKeyDown}
                onClick={(e) => e.stopPropagation()}
              />
            ) : (
              <span className="tab-name">{tab.name}</span>
            )}
            {tabs.length > 1 && (
              <button
                className="tab-close"
                onClick={(e) => {
                  e.stopPropagation();
                  onCloseTab(tab.id);
                }}
                title="Close tab"
              >
                <VscClose />
              </button>
            )}
          </div>
        ))}
      </div>
      <button className="tab-add" onClick={onAddTab} title="New file (Ctrl+N)">
        <VscAdd />
      </button>
    </div>
  );
}
