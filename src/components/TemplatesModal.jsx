import { templates } from '../utils/templates';
import { VscClose } from 'react-icons/vsc';

export default function TemplatesModal({ onSelect, onClose }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content templates-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>📚 Code Templates</h2>
          <button className="modal-close" onClick={onClose}>
            <VscClose />
          </button>
        </div>
        <div className="modal-body">
          <div className="templates-grid">
            {templates.map((template, idx) => (
              <div
                key={idx}
                className="template-card"
                onClick={() => {
                  onSelect(template);
                  onClose();
                }}
              >
                <div className="template-icon">{template.icon}</div>
                <div className="template-name">{template.name}</div>
                <div className="template-preview">
                  <code>{template.code.split('\n').slice(0, 3).join('\n')}</code>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
