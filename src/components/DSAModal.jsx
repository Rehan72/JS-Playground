import { useState } from 'react';
import { VscClose, VscEye, VscEyeClosed } from 'react-icons/vsc';
import { dsaCategories, dsaQuestions } from '../utils/dsaQuestions';

const DIFFICULTY_COLORS = {
  Easy: { bg: '#3fb95018', color: '#3fb950', border: '#3fb95044' },
  Medium: { bg: '#d2992218', color: '#d29922', border: '#d2992244' },
  Hard: { bg: '#f8514918', color: '#f85149', border: '#f8514944' },
};

export default function DSAModal({ onSelect, onClose }) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [expandedQuestion, setExpandedQuestion] = useState(null);
  const [showSolution, setShowSolution] = useState({});

  const filtered = dsaQuestions.filter((q) => {
    if (selectedCategory !== 'all' && q.category !== selectedCategory) return false;
    if (selectedDifficulty !== 'all' && q.difficulty !== selectedDifficulty) return false;
    return true;
  });

  const toggleSolution = (id, e) => {
    e.stopPropagation();
    setShowSolution((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content dsa-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>🧠 DSA Challenges</h2>
          <button className="modal-close" onClick={onClose}><VscClose /></button>
        </div>

        <div className="dsa-filters">
          <div className="dsa-categories">
            <button
              className={`dsa-cat-btn ${selectedCategory === 'all' ? 'active' : ''}`}
              onClick={() => setSelectedCategory('all')}
            >
              All ({dsaQuestions.length})
            </button>
            {dsaCategories.map((cat) => {
              const count = dsaQuestions.filter((q) => q.category === cat.id).length;
              return (
                <button
                  key={cat.id}
                  className={`dsa-cat-btn ${selectedCategory === cat.id ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(cat.id)}
                >
                  {cat.icon} {cat.name} ({count})
                </button>
              );
            })}
          </div>
          <div className="dsa-difficulty-filter">
            {['all', 'Easy', 'Medium', 'Hard'].map((d) => (
              <button
                key={d}
                className={`diff-btn ${selectedDifficulty === d ? 'active' : ''} diff-${d.toLowerCase()}`}
                onClick={() => setSelectedDifficulty(d)}
              >
                {d === 'all' ? 'All Levels' : d}
              </button>
            ))}
          </div>
        </div>

        <div className="modal-body dsa-body">
          {filtered.length === 0 && (
            <div className="dsa-empty">No questions match the selected filters.</div>
          )}
          {filtered.map((q) => (
            <div key={q.id} className="dsa-question">
              <div
                className="dsa-question-header"
                onClick={() => setExpandedQuestion(expandedQuestion === q.id ? null : q.id)}
              >
                <div className="dsa-question-info">
                  <span className="dsa-question-title">{q.title}</span>
                  <span
                    className="dsa-difficulty-badge"
                    style={{
                      background: DIFFICULTY_COLORS[q.difficulty]?.bg,
                      color: DIFFICULTY_COLORS[q.difficulty]?.color,
                      border: `1px solid ${DIFFICULTY_COLORS[q.difficulty]?.border}`,
                    }}
                  >
                    {q.difficulty}
                  </span>
                  <span className="dsa-category-tag">
                    {dsaCategories.find((c) => c.id === q.category)?.icon}{' '}
                    {dsaCategories.find((c) => c.id === q.category)?.name}
                  </span>
                </div>
                <button
                  className="dsa-try-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelect(q);
                    onClose();
                  }}
                >
                  Try It →
                </button>
              </div>

              {expandedQuestion === q.id && (
                <div className="dsa-question-detail">
                  <div className="dsa-description">{q.description}</div>
                  <div className="dsa-examples">
                    <strong>Examples:</strong>
                    <pre>{q.examples}</pre>
                  </div>
                  <div className="dsa-actions">
                    <button
                      className="dsa-action-btn solve-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelect(q);
                        onClose();
                      }}
                    >
                      ✍️ Solve Challenge
                    </button>
                    <button
                      className="dsa-action-btn solution-btn"
                      onClick={(e) => toggleSolution(q.id, e)}
                    >
                      {showSolution[q.id] ? <><VscEyeClosed /> Hide Solution</> : <><VscEye /> Show Solution</>}
                    </button>
                  </div>
                  {showSolution[q.id] && (
                    <div className="dsa-solution">
                      <div className="solution-label">💡 Solution:</div>
                      <pre>{q.solution}</pre>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
