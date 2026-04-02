import Editor from '@monaco-editor/react';
import TabBar from './TabBar';

export default function EditorPanel({
  tabs,
  activeTabId,
  onSwitchTab,
  onAddTab,
  onCloseTab,
  onRenameTab,
  onCodeChange,
  theme,
  fontSize,
  wordWrap,
  onEditorMount,
}) {
  const activeTab = tabs.find((t) => t.id === activeTabId) || tabs[0];

  return (
    <div className="editor-panel">
      <TabBar
        tabs={tabs}
        activeTabId={activeTabId}
        onSwitchTab={onSwitchTab}
        onAddTab={onAddTab}
        onCloseTab={onCloseTab}
        onRenameTab={onRenameTab}
      />
      <div className="editor-container">
        <Editor
          key={activeTab?.id}
          height="100%"
          language="javascript"
          theme={theme === 'dark' ? 'vs-dark' : 'vs-light'}
          value={activeTab?.code || ''}
          onChange={(value) => onCodeChange(activeTab?.id, value || '')}
          onMount={onEditorMount}
          options={{
            fontSize,
            wordWrap: wordWrap ? 'on' : 'off',
            minimap: { enabled: true },
            scrollBeyondLastLine: false,
            automaticLayout: true,
            tabSize: 2,
            fontFamily: "'JetBrains Mono', 'Fira Code', 'Cascadia Code', 'Consolas', monospace",
            fontLigatures: true,
            smoothScrolling: true,
            cursorBlinking: 'smooth',
            cursorSmoothCaretAnimation: 'on',
            renderWhitespace: 'selection',
            bracketPairColorization: { enabled: true },
            formatOnPaste: true,
            suggest: {
              showMethods: true,
              showFunctions: true,
              showConstructors: true,
              showFields: true,
              showVariables: true,
              showClasses: true,
              showStructs: true,
              showInterfaces: true,
              showModules: true,
              showProperties: true,
              showEvents: true,
              showOperators: true,
              showUnits: true,
              showValues: true,
              showConstants: true,
              showEnums: true,
              showEnumMembers: true,
              showKeywords: true,
              showWords: true,
              showColors: true,
              showFiles: true,
              showReferences: true,
              showFolders: true,
              showTypeParameters: true,
              showSnippets: true,
            },
            padding: { top: 12, bottom: 12 },
          }}
        />
      </div>
    </div>
  );
}
